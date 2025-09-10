import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { smartLocator } from '../utils/selfHealingHelper';

export class LoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        super(page, 'https://shop.cheezit.com/');
        this.emailInput = page.getByRole('textbox', { name: 'Email Address *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async happyLogin() {
        await this.fillTextboxByName('Email *', "sumit.singh1@ltimindtree.com");
        await this.fillTextboxByName('Password *', "pass@123");
        await this.signInButton.click();
    }

    async login(email: string, password: string) {
        await this.fillTextboxByName('Email *', email);
        await this.fillTextboxByName('Password *', password);
        await this.signInButton.click();
    }


    async clickAcceptCookies() {
        await this.page.getByRole('button', { name: 'OK', exact: true }).click();
    }

    async navigateToMyAccount() {
        await this.page.getByRole('link', { name: 'Sign In / Sign Up / My Account' }).click();
    }

    async clickonSignIn() {
        await this.page.waitForTimeout(1000);
        await this.signInButton.click({force: true});
    }

}