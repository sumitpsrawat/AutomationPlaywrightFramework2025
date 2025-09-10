import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class RecipesPage extends BasePage {
    readonly page: Page;
    readonly menuRecipesLink: Locator;
    readonly recipeTitleText: Locator;
    readonly recipeDetailTitle: Locator;
    readonly footerMenuLink: Locator;

    constructor(page: Page) {
        super(page, 'https://shop.cheezit.com/');
        this.page = page;
        this.menuRecipesLink = page.locator("#menu a[href*='recipes.html']");
        this.recipeTitleText = page.locator(".recipe-title"); //start with index 0 to 8
        this.recipeDetailTitle = page.locator(".recipe-detail-overview h1"); //header for recipe title in overview page
        this.footerMenuLink = page.locator(".footer-nav--main a[href*='recipes.html']");
    }

    async clickRecipesNavMenu() {
        await this.menuRecipesLink.click();
    }

    async clickFooterRecipesNavMenu() {
        await Promise.all([
            this.footerMenuLink.scrollIntoViewIfNeeded(),
            this.page.getByRole('button', { name: 'Close Modal' }).click(),
        ]);
    }

    async VerifyAllRecipes() {
        const recipeCount = await this.recipeTitleText.count();
        console.log(`Total recipes found: ${recipeCount}`);
        for (let i = 0; i < 9; i++) {
            const recipeName = await this.recipeTitleText.nth(i).textContent();
            console.log(`Recipe ${i + 1}: ${recipeName}`);
            await this.recipeTitleText.nth(i).click();
            const detailTitle = await this.recipeDetailTitle.textContent(); //header for recipe title in overview page
            if (detailTitle?.trim() === recipeName?.trim()) {
                // console.log(`✅ Recipe title matches: ${detailTitle}`);
            } else {
                // console.error(`❌ Title mismatch! List: ${recipeName}, Detail: ${detailTitle}`);
            }
            // Navigate back to the recipe listing page
            await this.page.goBack();
        }       
    }

}