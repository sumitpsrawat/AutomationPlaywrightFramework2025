import { Page, Locator } from "@playwright/test";

/**
 * Tries multiple selectors until one works.
 * Waits for each selector to be visible before returning.
 */
export async function smartLocator(
  page: Page,
  selectors: string[],
  timeout: number = 5000
): Promise<Locator> {
  for (const selector of selectors) {
    const element = page.locator(selector).first();
    try {
      await element.waitFor({ state: "visible", timeout });
      // console.log(`✅ Found element with selector: ${selector}`);
      return element;
    } catch {
      // console.log(`⚠️ Selector did not match: ${selector}`);
      // Try next selector
    }
  }
  throw new Error(`❌ None of the selectors worked: ${selectors.join(", ")}`);
}
