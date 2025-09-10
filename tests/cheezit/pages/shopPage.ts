import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { smartLocator } from '../utils/selfHealingHelper';

export class ShopPage extends BasePage {

  readonly firstProductLink: Locator;
  readonly addToCartBtn = ['#product-addtocart-button', 'button[title="Add to Cart"]'];
  private anySizeBtn = ['div[aria-label="Small"]', '[data-option-label="Small"]', 'div[aria-label="Large"]'];
  readonly cartMenuWrapper: Locator;

  constructor(page: Page) {
    super(page, 'https://shop.cheezit.com/');
    this.firstProductLink = page.locator('[id="0"]').getByRole('button', { name: 'Add to Cart' })
    // this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' });
    // this.sizeSmallBtn = page.getByRole('option', { name: 'Small' })
    this.cartMenuWrapper = page.locator("#minicart-content-wrapper");
  }

    async clickFirstProductAddToCart() {
        await this.firstProductLink.click();
    }

    async selectProductSize() {
        const selectSize = await smartLocator(this.page, this.anySizeBtn);
        await selectSize.click();
    }

    async clickAddToCart() {
        const addToCart = await smartLocator(this.page, this.addToCartBtn);
        await addToCart.click();
    }

    async verifyCartPage() {
        await expect(this.cartMenuWrapper).toBeVisible();
        // await expect(this.cartMenuWrapper.getByText('Your Cart')).toBeVisible();
    }

}