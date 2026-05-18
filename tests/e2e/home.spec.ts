import { expect, test } from "@nuxt/test-utils/playwright";

import { expectNoHorizontalOverflow, expectNoHydrationErrors } from "./helpers";

test("renders the home page and navigates to the blog", async ({ goto, page }) => {
  await expectNoHydrationErrors(page, async () => {
    await goto("/", { waitUntil: "hydration" });
  });

  await expect(page.getByRole("heading", { name: "laifu.me" })).toBeVisible();
  await expect(page.getByRole("link", { name: "阅读文章" })).toBeVisible();

  await page.getByRole("link", { name: "阅读文章" }).click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.getByRole("heading", { name: "文章" })).toBeVisible();
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
