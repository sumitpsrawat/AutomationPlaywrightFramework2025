import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';

test.describe('Cheezit - Verify the product is information displayed on product page', () => {
    test('Cheezit: Verify all snack crackers on product page', async ({ page, isMobile }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);

        await loginPage.navigateTo("https://www.cheezit.com/");
        await loginPage.clickAcceptCookies();
        await loginPage.clickonHamburgerMenu(isMobile);
        await productPage.clickProductsNavMenu();
        // await page.click("#open-modal");
       
        // await page.waitForTimeout(15000);
        if (await page.locator('#simple-popup').getByRole('img').isVisible()) {
        await page.getByRole('button', { name: 'Close Modal' }).click();
        }
        
        // await page.getByLabel('menu', { exact: true }).getByRole('link', { name: 'Products' }).click();
        // await loginPage.clickonHamburgerMenu(isMobile);
        // await productPage.clickProductsNavMenu();
        // await page.waitForTimeout(8000);
        // if (await page.locator('#simple-popup').getByRole('img').isVisible()) {
        // await page.locator('#simple-popup').getByRole('img').click();
        // await page.getByRole('button', { name: 'Close Modal' }).click();
        // }
        await productPage.ProductDetailVerify();
        // await productPage.VerifyAllCrackersProductPage();

        // await page.getByRole('link', { name: 'Original and White Cheddar' }).click();
        // await page.getByRole('link', { name: 'Cheez-It® Original Snack' }).click();
        // await page.getByRole('heading', { name: 'Cheez-It® Original Snack' }).click();
        // await page.locator('section').filter({ hasText: 'Nutrition Ingredients' }).click();
        // //navigate to back
        // await page.goto('https://www.cheezit.com/en-us/products/baked-snack-crackers.html');
        // await page.getByRole('link', { name: 'Cheez-It® White Cheddar Snack' }).click();
        // await page.getByRole('heading', { name: 'Cheez-It® White Cheddar Snack' }).click();
    });

});