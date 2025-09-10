import { test } from '@playwright/test';
import { RecipesPage } from '../pages/recipesPage';

test.describe('Cheezit - Verify the recipes is information displayed on Recipes page', () => {
    test('Cheezit: Verify all recipes description on recipes page', async ({ page, isMobile }) => {
        const RecipePage = new RecipesPage(page);
        await RecipePage.navigateTo("https://www.cheezit.com/");
        await RecipePage.clickAcceptCookies();
        await RecipePage.clickonHamburgerMenu(isMobile);
        await RecipePage.clickRecipesNavMenu();
        await RecipePage.clickFooterRecipesNavMenu();
        await RecipePage.VerifyAllRecipes();
    });
});