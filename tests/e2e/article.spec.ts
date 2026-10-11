import { expect, test } from "@nuxt/test-utils/playwright";

import { expectNoHorizontalOverflow } from "./helpers";

const articlePath = "/blog/2026/markdown-style-guide";

test("renders article content, toc, and markdown elements", async ({ goto, page }) => {
  await goto(articlePath, { waitUntil: "hydration" });

  await expect(page.getByRole("heading", { level: 1, name: "Markdown 样式预览" })).toBeVisible();
  await expect(page.getByText("覆盖常见 Markdown 语法和 Nuxt Content MDC 组件")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "目录" })).toBeVisible();
  await expect(page.getByRole("link", { name: "文本样式" }).first()).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.locator("pre.shiki").first()).toBeVisible();
  await expect(page.getByText("相关文章")).toBeVisible();
});

test("renders the custom MDC containers", async ({ goto, page }) => {
  await goto(articlePath, { waitUntil: "hydration" });

  // Callouts: note / tip / warning each render with their own tone.
  await expect(page.locator(".callout--note")).toBeVisible();
  await expect(page.locator(".callout--tip")).toBeVisible();
  await expect(page.locator(".callout--warning")).toBeVisible();

  // A card and a collapsible long-code block.
  await expect(page.locator(".prose-card")).toBeVisible();
  await expect(page.locator(".prose-code-collapse")).toBeVisible();

  // `::code-group` turns each fence's filename into a selectable tab.
  const group = page.locator(".laifu-code-group");
  await expect(group).toBeVisible();
  await expect(group.locator(".laifu-code-group__label")).toHaveCount(3);
  await expect(group.locator(".laifu-code-group__label").first()).toHaveText("pnpm");
  await expect(group.locator(".laifu-code-group__panel").first()).toBeVisible();
});

test("switches code-group tabs", async ({ goto, page }) => {
  await goto(articlePath, { waitUntil: "hydration" });

  const group = page.locator(".laifu-code-group").first();
  const panels = group.locator(".laifu-code-group__panel");

  await expect(panels.nth(0)).toBeVisible();
  await expect(panels.nth(1)).toBeHidden();

  await group.locator(".laifu-code-group__label").nth(1).click();

  await expect(panels.nth(1)).toBeVisible();
  await expect(panels.nth(0)).toBeHidden();
});

test("keeps rich article content within the viewport", async ({ goto, page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await goto(articlePath, { waitUntil: "hydration" });

  await expectNoHorizontalOverflow(page);
});
