import { Page, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly url: string = 'https://www.cheezit.com/';

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
    }

    async navigateTo(url: string = this.url) {
        if (this.page.isClosed()) {
            throw new Error('Cannot navigate: page is already closed.');
        }
        await this.page.goto(url, { waitUntil: 'load' });
    }

    async verifyUrl(expectedUrl: string) {
        await expect(this.page).toHaveURL(expectedUrl);
    }

    async verifyElementVisible(locator: string) {
        await expect(this.page.locator(locator)).toBeVisible();
    }

    async clickButtonByName(name: string) {
        await this.page.getByRole('button', { name, exact: true }).click();
    }

    async clickLinkByName(name: string) {
        await this.page.getByRole('link', { name }).click();
    }

    async fillTextboxByName(name: string, value: string) {
        await this.page.getByRole('textbox', { name }).fill(value);
    }

    async expectTextVisible(text: string) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async expectElementByRoleAndText(role: 'heading' | 'link' | 'button', text: string): Promise<void> {
        const locator = this.page.getByRole(role, { name: text });
        await expect(locator).toBeVisible();
    }

    async pressEnter() {
        await this.page.keyboard.press('Enter');
    }

    async clickAcceptCookies() {
        await this.page.getByRole('button', { name: 'OK', exact: true }).click();
    }

    async clickonHamburgerMenu(isMobile: boolean) {
        isMobile ? await this.page.getByRole('button', { name: 'hamburger menu' }).click() : null;
    }

    async navigateToHomePage() {
        await this.page.goto(this.url, { waitUntil: 'load' });
    }
}
