import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
    readonly page: Page;
    readonly MenuProductsLink: Locator;
    readonly productCategoriesLink: Locator;
    readonly productListLink: Locator; //start with index 2 , title attribute for title
    readonly productTitle: Locator;
    readonly productDetailTitle: Locator;

    constructor(page: Page) {
        super(page, 'https://shop.cheezit.com/');
        this.page = page;
        this.MenuProductsLink = page.locator("#menu a[href*='products.html']");
        this.productCategoriesLink = page.locator(".product-category span.button-cta");
        this.productListLink = page.locator("a.track"); //start with index 2 , title attribute for title
        this.productTitle = page.locator(".product-list-title");
        this.productDetailTitle = page.locator(".product-detail-overview h1");
    }

    getProductCategoriesButton(text: string) {
        return this.page.locator(`span.button-cta:has-text("${text}")`)
    }

    async clickProductsNavMenu() {
        await this.MenuProductsLink.hover({ force: true });
        await this.page.locator("#menu a[href*='products.html']").click();
    }

    async VerifyAllCrackersProductPage() {
        await Promise.all([
            this.page.getByRole('button', { name: 'Close Modal' }).click(),
            this.productCategoriesLink.nth(1).click()  // Click on "Crackers" category
        ])
        await this.page.waitForTimeout(2000);
        const productCount = await this.productListLink.count();
        // console.log(`Total products found: ${productCount}`);

        for (let i = 2; i < productCount; i++) {
            const productName = await this.productListLink.nth(i).getAttribute('title');
            // console.log(`Product ${i - 1}: ${productName}`);
            await this.productListLink.nth(i).click();
            const detailTitle = await this.productDetailTitle.textContent();
            if (detailTitle?.trim() === productName?.trim()) {
                // console.log(`✅ Product title matches: ${detailTitle}`);
            } else {
                // console.error(`❌ Title mismatch! List: ${productName}, Detail: ${detailTitle}`);
            }

            // Navigate back to the product listing page
            await this.page.goBack();
        }
    }

    async VerifyViewAllProducts(product: string) {
        await Promise.all([
            this.page.getByRole('button', { name: 'Close Modal' }).click(),
            this.productCategoriesLink.getByText(product).click()  // Click on "Crackers" category
        ])
        await this.page.waitForTimeout(2000);
        const productCount = await this.productListLink.count();
        // console.log(`Total products found: ${productCount}`);

        for (let i = 2; i < productCount; i++) {
            const productName = await this.productListLink.nth(i).getAttribute('title');
            // console.log(`Clicking on product: ${productName}`);
            await this.productListLink.nth(i).click();
            const detailTitle = await this.productDetailTitle.textContent();

            if (detailTitle?.trim() === productName?.trim()) {
                // console.log(`✅ Product title matches: ${detailTitle}`);
            } else {
                // console.error(`❌ Title mismatch! List: ${productName}, Detail: ${detailTitle}`);
            }

            // Navigate back to the product listing page
            await this.page.goBack();
        }
    }


};