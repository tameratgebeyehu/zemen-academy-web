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
