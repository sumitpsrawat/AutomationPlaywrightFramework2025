import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class MyAccountPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly accountInformationLink: Locator;
    readonly mobileNavbar: Locator;
    readonly accountInformationText: Locator;

    constructor(page: Page) {
        super(page, 'https://shop.cheezit.com/');
        this.emailInput = page.getByRole('textbox', { name: 'Email Address *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.accountInformationLink = page.getByRole('link', { name: 'Account Information' });
        this.accountInformationText = page.getByText('Edit Account Information');
        this.mobileNavbar = page.locator('.block-collapsible-nav-title');
    }

    async clickOnMyAccountLink(isMobile: boolean) {
        if (isMobile) { await this.mobileNavbar.click({ delay: 2000 }); }
        await this.accountInformationLink.click();
        // await expect(this.accountInformationText).toBeVisible();
    }
    

    async clickonAddressBook(isMobile: boolean) {
        if (isMobile) { await this.mobileNavbar.click({ delay: 2000 }); }
        await this.page.getByRole('link', { name: 'Address Book' }).click();
        // await expect(this.page.getByText('Add New Address')).toBeVisible();
    }

    async clickonMyOrders(isMobile: boolean) {
        if (isMobile) { await this.mobileNavbar.click({ delay: 2000 }); }
        await this.page.getByRole('link', { name: 'My Orders' }).click();
        // await expect(this.page.getByRole('heading', { name: 'My Orders' }).locator('span')).toBeVisible();
    }

    async clickonStoredPaymentMethods(isMobile: boolean) {
        if (isMobile) { await this.mobileNavbar.click({ delay: 2000 }); }
        await this.page.getByRole('link', { name: 'Stored Payment Methods' }).click();
        // await expect(this.page.getByRole('heading', { name: 'Stored Payment Methods' }).locator('span')).toBeVisible();
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

    async clickonHamburgerMenu(isMobile: boolean) {
        isMobile ? await this.page.getByRole('button', { name: 'hamburger menu' }).click() : null;
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