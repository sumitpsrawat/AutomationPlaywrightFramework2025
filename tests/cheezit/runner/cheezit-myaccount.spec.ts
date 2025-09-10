import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { MyAccountPage } from '../pages/myAccountPage';

test.describe('Cheezit - My Account page Test Case', () => {
  test('Cheezit: My Account page validation', async ({ page, isMobile }) => {
    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);
    await loginPage.navigateTo('https://www.cheezit.com/en-us/home.html');
    await loginPage.clickAcceptCookies();
    await loginPage.clickonHamburgerMenu(isMobile);
    await loginPage.navigateToMyAccount();
    await loginPage.happyLogin();
    await loginPage.expectTextVisible('My Dashboard');

    await myAccountPage.clickOnMyAccountLink(isMobile);
    await myAccountPage.expectTextVisible('Edit Account Information');

    await myAccountPage.clickonAddressBook(isMobile);
    await myAccountPage.expectTextVisible('Add New Address');

    await myAccountPage.clickonMyOrders(isMobile);
    await myAccountPage.expectElementByRoleAndText('heading', 'My Orders');

    await myAccountPage.clickonStoredPaymentMethods(isMobile);
    await myAccountPage.expectElementByRoleAndText('heading', 'Stored Payment Methods');

  });
});