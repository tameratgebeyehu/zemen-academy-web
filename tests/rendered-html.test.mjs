import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const routes = [
  ["/", /Learn deeper/],
  ["/features", /Built around how students actually study/],
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
