import { expect, test } from "@nuxt/test-utils/playwright";

import { expectNoHorizontalOverflow } from "./helpers";

const articlePath = "/blog/2026-05-markdown-style-guide";

test("renders article content, toc, and markdown elements", async ({ goto, page }) => {
  await goto(articlePath, { waitUntil: "hydration" });

  await expect(page.getByRole("heading", { name: "Markdown 样式预览" })).toBeVisible();
  await expect(page.getByText("覆盖常见 Markdown 语法和 Nuxt Content MDC 组件")).toBeVisible();
  await expect(page.getByRole("link", { name: "文本样式" }).first()).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.locator("pre.shiki").first()).toBeVisible();
  await expect(page.getByText("相关文章")).toBeVisible();
});

test("keeps rich article content within the viewport", async ({ goto, page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await goto(articlePath, { waitUntil: "hydration" });

  await expectNoHorizontalOverflow(page);
});
