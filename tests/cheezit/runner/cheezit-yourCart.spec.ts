import { test } from '@playwright/test';
import { ShopPage } from '../pages/shopPage';

test.describe('Cheezit - Verify the Cart Detail Page on Shop page', () => {
    test('Cheezit: Verify Your cart detail on Shop cheezit page', async ({ page, isMobile }) => {
        const shopPage = new ShopPage(page);
        await shopPage.navigateTo("https://shop.cheezit.com/");
        await shopPage.clickAcceptCookies();
        await shopPage.clickFirstProductAddToCart();
        await shopPage.selectProductSize();
        await shopPage.clickAddToCart();
        await shopPage.verifyCartPage();
    });
});