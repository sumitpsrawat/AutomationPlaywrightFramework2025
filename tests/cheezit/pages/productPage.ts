import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {

    readonly MenuProductsLink = "#menu a[href*='products.html']";
    readonly productCategoriesLink = ".product-category"
    readonly productListLink = "a.track" //start with index 2 , title attribute for title
    readonly productTitle = ".product-list-title";
    readonly productDetailTitle = ".product-detail-overview h1";

    constructor(page: Page) {
        super(page, 'https://shop.cheezit.com/');
        // this.MenuProductsLink = this.page.locator("#menu a[href*='products.html']");
    }

    async clickProductsNavMenu() {
        await this.page.locator(this.MenuProductsLink).hover({force: true});
        await this.page.locator("#menu a[href*='products.html']").click();
    }

    async VerifyAllCrackersProductPage() {
        if (await this.page.locator('#simple-popup').getByRole('img').isVisible()) {
        await this.page.getByRole('button', { name: 'Close Modal' }).click();
        }
        await this.page.locator(this.productCategoriesLink).nth(1).click(); // Click on "Crackers" category
        if (await this.page.locator('#simple-popup').getByRole('img').isVisible()) {
        await this.page.getByRole('button', { name: 'Close Modal' }).click();
        }
        const productCount = await this.page.locator(this.productListLink).count();
        console.log(`Total products found: ${productCount}`);

        for (let i = 2; i < productCount; i++) {
            const productName = await this.page.locator(this.productListLink).nth(i).getAttribute('title');
            console.log(`Product ${i - 1}: ${productName}`);    
            const titleText = await this.page.locator(this.productTitle).nth(i - 2).textContent();
            if (titleText?.trim() === productName?.trim()) {
                console.log(`✅ Title matches: ${titleText}`);
            } else {
                console.error(`❌ Title mismatch! List: ${productName}, Displayed: ${titleText}`);
            }         
        }
    }   


    async ProductDetailVerify() {
        // await this.page.locator(".searchicon").click();
        // await this.page.waitForTimeout(2000);
        // await this.page.locator(".searchicon").click();
        //  await this.page.click("#open-modal");
        // await this.page.locator(this.productCategoriesLink).nth(1).click({trial: true});
        // if (await this.page.locator('#simple-popup').getByRole('img').isVisible()) {
        // await this.page.getByRole('button', { name: 'Close Modal' }).click();
        // }
        await Promise.all([
            this.page.getByRole('button', { name: 'Close Modal' }).click(),
            this.page.locator(this.productCategoriesLink).nth(1).click()  // Click on "Crackers" category
        ])
        // await this.page.locator(this.productCategoriesLink).nth(1).click();
        await this.page.waitForTimeout(2000);
        const productCount = await this.page.locator(this.productListLink).count();
        console.log(`Total products found: ${productCount}`);

        for (let i = 2; i < productCount; i++) {
            const productName = await this.page.locator(this.productListLink).nth(i).getAttribute('title');
            console.log(`Clicking on product: ${productName}`);
            await this.page.locator(this.productListLink).nth(i).click();
            const detailTitle = await this.page.locator(this.productDetailTitle).textContent();

            if (detailTitle?.trim() === productName?.trim()) {
                console.log(`✅ Product title matches: ${detailTitle}`);
            } else {
                console.error(`❌ Title mismatch! List: ${productName}, Detail: ${detailTitle}`);
            }

            // Navigate back to the product listing page
            await this.page.goBack();
        }
    }


};