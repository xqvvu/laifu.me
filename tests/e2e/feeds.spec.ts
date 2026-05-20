import { expect, test } from "@nuxt/test-utils/playwright";

test("serves the RSS feed", async ({ request }) => {
  const response = await request.get("/rss.xml");
  const body = await response.text();

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("xml");
  expect(body).toContain("<rss");
  expect(body).toContain("laifu.me");
  expect(body.indexOf("工程工具链的边界感")).toBeLessThan(body.indexOf("Markdown 样式预览"));
  expect(body).toContain("<category>工程</category>");
});

test("serves the sitemap", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  const body = await response.text();

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("xml");
  expect(body).toContain("<urlset");
  expect(body).toContain("/blog/2026/nuxt-blog-architecture");
  expect(body).toContain("/tags/%E5%B7%A5%E7%A8%8B");
});
