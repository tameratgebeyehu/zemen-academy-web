const host = "zemenacademy.com";
const key = "7c3f9a2d8b1e4f60a5c7d9e2f4b6a810";
const paths = ["/", "/features", "/download", "/help", "/about", "/privacy", "/terms", "/account-deletion"];

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: paths.map((path) => `https://${host}${path}`),
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow submission failed with HTTP ${response.status}: ${await response.text()}`);
}

console.log(`IndexNow accepted ${paths.length} canonical URLs with HTTP ${response.status}.`);
