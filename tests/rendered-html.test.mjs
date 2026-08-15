import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function fetchWorker(url) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${url}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(url, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function render(pathname) {
  return fetchWorker(`http://localhost${pathname}`);
}

const routes = [
  ["/", /Learn deeper/],
  ["/features", /Built around how students actually study/],
  ["/premium", /Complete access/],
  ["/about", /A clearer path for every serious student/],
  ["/help", /Answers without the runaround/],
  ["/download", /Your study plan, wherever you go/],
  ["/privacy", /Privacy, explained clearly/],
  ["/terms", /Fair rules for focused learning/],
  ["/account-deletion", /Request account deletion/],
];

for (const [pathname, expectedText] of routes) {
  test(`server-renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, expectedText);
    assert.doesNotMatch(html, /â€”|â€“|â€™|Â©|ï¿½/);
    assert.match(html, /<meta name="description"/);
  });
}

test("homepage actions resolve to real pages and section targets", async () => {
  const homeResponse = await render("/");
  const homeHtml = await homeResponse.text();
  const targets = [
    "/features",
    "/premium",
    "/features#practice-modes",
    "/features#offline-study",
    "/features#progress-tracking",
    "/features#curriculum-coverage",
    "/download#official-download",
    "/help",
    "/about",
    "/privacy",
    "/terms",
    "/account-deletion",
  ];

  for (const target of targets) {
    const [pathname, fragment] = target.split("#");
    const response = await render(pathname);
    assert.equal(response.status, 200, target);
    const html = await response.text();
    if (fragment) assert.ok(html.includes('id="' + fragment + '"'), target);
  }

  for (const target of targets.slice(1, 6)) assert.ok(homeHtml.includes('href="' + target + '"'), target);
  assert.doesNotMatch(homeHtml, /mastery points|Progress synced/);
  assert.match(homeHtml, /Content is organized for the grade and stream you select/);
});

test("shared mobile navigation and compact footer stay accessible", async () => {
  const response = await render("/account-deletion");
  const html = await response.text();

  assert.match(html, /class="menu-toggle" aria-label="Open navigation menu"/);
  assert.match(html, /class="footer-socials"/);
  assert.match(html, /aria-label="Zemen Academy on Telegram"/);
  assert.match(html, /aria-label="Zemen Academy on YouTube"/);
  assert.match(html, /aria-label="Zemen Academy on TikTok"/);
  assert.match(html, /aria-label="Zemen Academy on Instagram"/);
  assert.match(html, /aria-label="Email Zemen Academy"/);
  assert.match(html, /class="footer-socials">[\s\S]*?<svg/);
  assert.doesNotMatch(html, /[✈▶♪◎✉]/);
  assert.match(html, /class="shell footer-bottom"><span>© 2026 Zemen Academy\. Built for Ethiopian students\.<\/span><\/div>/);
});

test("publishes valid Android Digital Asset Links metadata", async () => {
  const raw = await readFile(new URL("../public/.well-known/assetlinks.json", import.meta.url), "utf8");
  const statements = JSON.parse(raw);
  assert.equal(statements.length, 1);
  assert.equal(statements[0].target.package_name, "com.zemenacademy.app");
  assert.ok(statements[0].relation.includes("delegate_permission/common.get_login_creds"));
});

test("publishes the IndexNow ownership key", async () => {
  const key = "7c3f9a2d8b1e4f60a5c7d9e2f4b6a810";
  assert.equal((await readFile(new URL(`../public/${key}.txt`, import.meta.url), "utf8")).trim(), key);
});

test("download logo uses the centered circular brand treatment", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.download-logo \{[^}]*place-items: center;[^}]*overflow: hidden;[^}]*border-radius: 50%;/);
  assert.match(css, /\.download-logo img \{[^}]*display: block;[^}]*object-fit: contain;[^}]*border-radius: 50%;/);
});

test("every indexable page publishes complete, unique SEO metadata", async () => {
  const titles = new Set();
  const descriptions = new Set();

  for (const [pathname] of routes) {
    const response = await render(pathname);
    const html = await response.text();
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const openGraphUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
    const expectedCanonical = `https://zemenacademy.com${pathname === "/" ? "" : pathname}`;

    assert.ok(title && title.length >= 20 && title.length <= 65, `${pathname} title`);
    assert.ok(description && description.length >= 70 && description.length <= 200, `${pathname} description`);
    assert.equal(canonical, expectedCanonical, `${pathname} canonical`);
    assert.equal(openGraphUrl, expectedCanonical, `${pathname} Open Graph URL`);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${pathname} H1 count`);
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/i, pathname);

    for (const json of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      assert.doesNotThrow(() => JSON.parse(json[1]), `${pathname} structured data`);
    }

    assert.ok(!titles.has(title), `${pathname} duplicate title`);
    assert.ok(!descriptions.has(description), `${pathname} duplicate description`);
    titles.add(title);
    descriptions.add(description);
  }
});

test("all internal page links resolve and section links have targets", async () => {
  const targets = new Set();

  for (const [pathname] of routes) {
    const html = await (await render(pathname)).text();
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      if (match[1].startsWith("/")) targets.add(match[1]);
    }
  }

  for (const target of targets) {
    const url = new URL(target, "https://zemenacademy.com");
    const response = await render(url.pathname);
    assert.equal(response.status, 200, target);
    if (url.hash) assert.ok((await response.text()).includes(`id="${url.hash.slice(1)}"`), target);
  }
});

test("robots and sitemap expose every canonical page", async () => {
  const robotsResponse = await render("/robots.txt");
  const robots = await robotsResponse.text();
  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \//i);
  assert.match(robots, /Sitemap: https:\/\/zemenacademy\.com\/sitemap\.xml/i);

  const sitemapResponse = await render("/sitemap.xml");
  const sitemap = await sitemapResponse.text();
  assert.equal(sitemapResponse.status, 200);
  for (const [pathname] of routes) {
    const canonical = `https://zemenacademy.com${pathname === "/" ? "" : pathname}`;
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), pathname);
  }
  assert.match(sitemap, /<lastmod>2026-08-09/);
});

test("duplicate public hosts permanently redirect to the canonical HTTPS domain", async () => {
  for (const url of ["http://zemenacademy.com/features?source=seo", "https://www.zemenacademy.com/features?source=seo"]) {
    const response = await fetchWorker(url);
    assert.equal(response.status, 308, url);
    assert.equal(response.headers.get("location"), "https://zemenacademy.com/features?source=seo", url);
  }
});
