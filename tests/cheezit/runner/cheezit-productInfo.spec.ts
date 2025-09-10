import { test } from '@playwright/test';
import { ProductPage } from '../pages/productPage';

test.describe('Cheezit - Verify the product is information displayed on product page', () => {
    test('Cheezit: Verify all snack crackers on product page', async ({ page, isMobile }) => {
        const productPage = new ProductPage(page);
        await productPage.navigateTo("https://www.cheezit.com/");
        await productPage.clickAcceptCookies();
        await productPage.clickonHamburgerMenu(isMobile);
        await productPage.clickProductsNavMenu();
        await productPage.VerifyViewAllProducts('extra');
    });

    test('Cheezit: Verify all crackers on product page', async ({ page, isMobile }) => {
        const productPage = new ProductPage(page);
        await productPage.navigateTo("https://www.cheezit.com/");
        await productPage.clickAcceptCookies();
        await productPage.clickonHamburgerMenu(isMobile);
        await productPage.clickProductsNavMenu();
        await productPage.VerifyAllCrackersProductPage();
    });

    test('Cheezit: Verify all snack mix on product page', async ({ page, isMobile }) => {
        const productPage = new ProductPage(page);
        await productPage.navigateTo("https://www.cheezit.com/");
        await productPage.clickAcceptCookies();
        await productPage.clickonHamburgerMenu(isMobile);
        await productPage.clickProductsNavMenu();
        await productPage.VerifyViewAllProducts('SNACK MIX');
    });

    test('Cheezit: Verify all DUOZ on product page', async ({ page, isMobile }) => {
        const productPage = new ProductPage(page);
        await productPage.navigateTo("https://www.cheezit.com/");
        await productPage.clickAcceptCookies();
        await productPage.clickonHamburgerMenu(isMobile);
        await productPage.clickProductsNavMenu();
        await productPage.VerifyViewAllProducts('DUOZ');
    });
});