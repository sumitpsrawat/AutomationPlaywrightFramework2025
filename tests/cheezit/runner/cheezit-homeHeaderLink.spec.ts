import { test } from '@playwright/test';

import { HomePage } from '../pages/homePage';

test.describe('Cheezit - Home Page Navigation Header Link Validation', () => {
    test('Cheezit: Header Link and Text Validation', async ({ page, isMobile }) => {
        const homePage = new HomePage(page);
        await homePage.navigateTo('https://www.cheezit.com/');
        await homePage.clickAcceptCookies();

        await homePage.clickonHamburgerMenu(isMobile);
        await homePage.clickProductsNavMenu();
        await homePage.expectElementByRoleAndText('heading', 'PRODUCTS');

        await homePage.navigateToHomePage();
        await homePage.clickonHamburgerMenu(isMobile);
        await homePage.clickOurImpactNavMenu();
        await homePage.expectElementByRoleAndText('heading', 'Our Impact');

        await homePage.navigateToHomePage();
        await homePage.clickonHamburgerMenu(isMobile);
        await homePage.clickRecipesNavMenu();
        await homePage.expectElementByRoleAndText('heading', 'Recipes');

    });
});