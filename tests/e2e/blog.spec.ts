import { expect, test } from "@nuxt/test-utils/playwright";

import { expectNoHorizontalOverflow } from "./helpers";

test("lists posts and supports local search", async ({ goto, page }) => {
  await goto("/blog", { waitUntil: "hydration" });

  await expect(page.getByRole("heading", { level: 1, name: "文章" })).toBeVisible();
  await expect(page.getByRole("link", { name: "用 Nuxt 4 搭一个长期可维护的博客" })).toBeVisible();

  await page.getByPlaceholder("搜索标题、标签或摘要").fill("Markdown");

  await expect(page.getByRole("link", { name: "Markdown 样式预览" })).toBeVisible();
  await expect(page.getByRole("link", { name: "用 Nuxt 4 搭一个长期可维护的博客" })).toBeHidden();
});

test("opens a post from the blog list", async ({ goto, page }) => {
  await goto("/blog", { waitUntil: "hydration" });

  await page.getByRole("link", { name: "用 Nuxt 4 搭一个长期可维护的博客" }).click();

  await expect(page).toHaveURL(/\/blog\/2026\/nuxt-blog-architecture$/);
  await expect(
    page.getByRole("heading", { name: "用 Nuxt 4 搭一个长期可维护的博客" }),
  ).toBeVisible();
});

test("renders tag pages from public article tags", async ({ goto, page }) => {
  await goto("/tags/%E8%AE%BE%E8%AE%A1", { waitUntil: "hydration" });

  await expect(page.getByRole("heading", { level: 1, name: "设计" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Markdown 样式预览" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "产品笔记：少做解释，多做可感知的状态" }),
  ).toBeVisible();
});

test("keeps the blog listing within the viewport", async ({ goto, page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await goto("/blog", { waitUntil: "hydration" });

  await expectNoHorizontalOverflow(page);
});

test("groups the archive by year", async ({ goto, page }) => {
  await goto("/archive", { waitUntil: "hydration" });

  await expect(page.getByRole("heading", { level: 1, name: "归档" })).toBeVisible();
  await expect(page.getByText("2026", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /把博客当成个人知识系统的出口/ })).toBeVisible();
});
