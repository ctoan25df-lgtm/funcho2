import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL ?? "http://localhost:3004";

async function get(path) {
  const response = await fetch(baseUrl + path, {
    headers: { accept: "text/html" },
  });
  const html = await response.text();
  return { response, html };
}

test("home renders bamdalin.com primary CTA and transparent relationship copy", async () => {
  const { response, html } = await get("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /펀초주소/);
  assert.match(html, /밤의달인 부산 목록/);
  assert.match(html, /bamdalin\.com\/board\/region\/busan/);
  assert.match(html, /utm_source=funcho2/);
  assert.match(html, /rel="noopener noreferrer sponsored"/);
  assert.match(html, /rel="canonical" href="https:\/\/funcho\.yuheungpick\.com"/);
  assert.doesNotMatch(html, /chatgpt\.site|brocpn/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("all editorial routes render a unique heading, canonical URL, and bamdalin CTA", async () => {
  const routes = [
    ["/", "밤의달인 부산 목록"],
    ["/address-ledger", "펀초주소 기록 원장"],
    ["/name-map", "비슷한 이름을 같은 운영자로 보지 않습니다"],
    ["/change-signals", "주소 변경은 하나의 문구보다 여러 신호로 확인합니다"],
    ["/editorial", "누가 기록했고, 어떻게 판단했는지 공개합니다"],
  ];

  for (const [path, heading] of routes) {
    const { response, html } = await get(path);
    assert.equal(response.status, 200, path);
    assert.match(html, new RegExp(heading), path);
    assert.match(html, /밤의달인 부산 목록/, path);
    assert.match(html, /utm_source=funcho2/, path);
    const canonicalPath = path === "/" ? "" : path;
    assert.match(
      html,
      new RegExp('rel="canonical" href="https://funcho\\.yuheungpick\\.com' + canonicalPath + '"'),
      path,
    );
  }
});

test("robots and sitemap expose the canonical host without trailing slash on home", async () => {
  const robots = await fetch(baseUrl + "/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/funcho\.yuheungpick\.com\/sitemap\.xml/);

  const sitemap = await fetch(baseUrl + "/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /<loc>https:\/\/funcho\.yuheungpick\.com<\/loc>/);
  assert.doesNotMatch(xml, /<loc>https:\/\/funcho\.yuheungpick\.com\/<\/loc>/);
  assert.match(xml, /https:\/\/funcho\.yuheungpick\.com\/address-ledger/);
  assert.match(xml, /https:\/\/funcho\.yuheungpick\.com\/editorial/);
});
