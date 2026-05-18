import { expect } from "@nuxt/test-utils/playwright";
import type { Page } from "@playwright/test";

export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

export async function expectNoHydrationErrors(page: Page, action: () => Promise<void>) {
  const messages: string[] = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      messages.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    messages.push(error.message);
  });

  await action();

  expect(messages.filter((message) => /hydration|mismatch|hydrated/i.test(message))).toEqual([]);
}
