import { expect, test } from "@nuxt/test-utils/playwright";

test("serves the RSS feed", async ({ request }) => {
  const response = await request.get("/rss.xml");
  const body = await response.text();

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("xml");
  expect(body).toContain("<rss");
  expect(body).toContain("laifu.me");
});

test("serves the sitemap", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  const body = await response.text();

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("xml");
  expect(body).toContain("<urlset");
  expect(body).toContain("/blog/2026-05-nuxt-blog-architecture");
});
