import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test.describe('Cheezit - Home page images visible and intact', () => {
  test('Cheezit: Home page images visible and intact', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('https://www.cheezit.com/en-us/home.html');
    await homePage.clickAcceptCookies();
    await homePage.VerifyAllImagesHomePage();
  });
});