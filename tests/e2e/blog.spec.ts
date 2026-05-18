import { expect, test } from "@nuxt/test-utils/playwright";

import { expectNoHorizontalOverflow } from "./helpers";

test("lists posts and supports local search", async ({ goto, page }) => {
  await goto("/blog", { waitUntil: "hydration" });

  await expect(page.getByRole("heading", { name: "文章" })).toBeVisible();
  await expect(page.getByRole("link", { name: "用 Nuxt 4 搭一个长期可维护的博客" })).toBeVisible();

  await page.getByPlaceholder("搜索标题、标签或摘要").fill("Markdown");

  await expect(page.getByRole("link", { name: "Markdown 样式预览" })).toBeVisible();
  await expect(page.getByRole("link", { name: "用 Nuxt 4 搭一个长期可维护的博客" })).toBeHidden();
});

test("opens a post from the blog list", async ({ goto, page }) => {
  await goto("/blog", { waitUntil: "hydration" });

  await page.getByRole("link", { name: "用 Nuxt 4 搭一个长期可维护的博客" }).click();

  await expect(page).toHaveURL(/\/blog\/2026-05-nuxt-blog-architecture$/);
  await expect(
    page.getByRole("heading", { name: "用 Nuxt 4 搭一个长期可维护的博客" }),
  ).toBeVisible();
});

test("keeps the blog listing within the viewport", async ({ goto, page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await goto("/blog", { waitUntil: "hydration" });

  await expectNoHorizontalOverflow(page);
});
