import { expect, test } from "@nuxt/test-utils/playwright";

import { expectNoHorizontalOverflow, expectNoHydrationErrors } from "./helpers";

test("introduces the author and lists recent writing", async ({ goto, page }) => {
  await expectNoHydrationErrors(page, async () => {
    await goto("/", { waitUntil: "hydration" });
  });

  await expect(page.getByRole("heading", { level: 1, name: "laifu" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "最近写的" })).toBeVisible();

  // Recent posts render as links, not as cards.
  await expect(
    page.getByRole("link", { name: "用 Nuxt 4 搭一个长期可维护的博客" }).first(),
  ).toBeVisible();
});

test("navigates from the home page into the blog index", async ({ goto, page }) => {
  await goto("/", { waitUntil: "hydration" });

  await page.getByRole("link", { name: "全部文章 →" }).click();

  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.getByRole("heading", { level: 1, name: "文章" })).toBeVisible();
});

test("keeps the home page within the viewport on mobile", async ({ goto, page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await goto("/", { waitUntil: "hydration" });

  await expectNoHorizontalOverflow(page);
});

test("toggles color mode without app-shell hydration errors", async ({ goto, page }) => {
  await expectNoHydrationErrors(page, async () => {
    await goto("/", { waitUntil: "hydration" });
    await page.getByRole("button", { name: "切换主题" }).click();
  });

  await expect(page.locator("html")).toHaveClass(/dark|light/);
});

test("shows the dot-grid backdrop on the body", async ({ goto, page }) => {
  await goto("/", { waitUntil: "hydration" });

  const background = await page.evaluate(() => getComputedStyle(document.body).backgroundImage);

  expect(background).toContain("radial-gradient");
});
