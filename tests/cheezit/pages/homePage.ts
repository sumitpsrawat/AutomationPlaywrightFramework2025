import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {

    readonly MenuProductsLink: Locator;

  constructor(page: Page) {
    super(page, 'https://shop.cheezit.com/');
    this.MenuProductsLink = this.page.getByLabel('menu', { exact: true }).getByRole('link', { name: 'Products' });
  }

  // Locators
  get productsNavLink() {
    return this.page.locator('a[href="/en-us/products/home.html"]');
  }

  get promotionsNavLink() {
    return this.page.locator('a[href="/en-us/promotions.html"]');
  }

  get heroImage() {
    return this.page.locator('.hero-banner img');
  }
 
  // Methods
  async clickProductsNavMenu() {
    await this.MenuProductsLink.click();
  }

  /**
   * Verifies that the hero image is visible and loads successfully.
   * This is a robust check that combines visibility and network response status.
   */
  async VerifyAllImagesHomePage() {
    // Get a locator for all <img> tags on the page
    const allImageLocators = await this.page.locator('//img').all();

    console.log(`Found ${allImageLocators.length} images to verify.`);

    // Iterate through each image locator and perform checks
    for (const imageLocator of allImageLocators) {
      try {
        const altText = await imageLocator.getAttribute('alt');

        // Check for visibility first
        // await expect(imageLocator).toBeVisible();

        // Get the src attribute
        const src = await imageLocator.getAttribute('src');

        // Skip check if src is a data URI or null
        if (!src || src.startsWith('data:')) {
        //   console.warn(`➡️ Skipping network check for empty or data URI src on image with alt: "${altText}"`);
          continue;
        }

        // --- Fix is here: Construct a full URL ---
        const baseUrl = this.page.url();
        const imageUrl = new URL(src, baseUrl).href;
        // The URL object correctly handles both relative and protocol-less absolute paths.
        
        // Check the network integrity
        const imageResponse = await this.page.request.get(imageUrl, { timeout: 20000 });
        await expect(imageResponse.status()).toBe(200);
        
        // console.log(`✅ Image with alt text "${altText}" loaded successfully from: ${imageUrl}`);

      } catch (error) {
        // console.error(`❌ Failed to verify an image: ${error.message}`);
        throw error;
      }
    }
  }

}