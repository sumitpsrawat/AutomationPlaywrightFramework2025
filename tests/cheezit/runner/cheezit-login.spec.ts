import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Cheezit - Login Tests', () => {
  test('Cheezit: Simple Login', async ({ page, isMobile }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.cheezit.com/en-us/home.html');
    await loginPage.clickAcceptCookies();
    await loginPage.clickonHamburgerMenu(isMobile);
    await loginPage.navigateToMyAccount();
    await loginPage.happyLogin();
    await loginPage.expectTextVisible('My Dashboard');
  });

  test('Cheezit: Login with invalid email Credentials', async ({ page, isMobile }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.cheezit.com/en-us/home.html');
    await loginPage.clickAcceptCookies();
    await loginPage.clickonHamburgerMenu(isMobile);
    await loginPage.navigateToMyAccount();
    await loginPage.login('notaemail','pass@123');
    await loginPage.clickonSignIn();
    await loginPage.expectTextVisible('Please enter a valid email address');
  });

    test('Cheezit: Login with invalid password Credentials', async ({ page, isMobile }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.cheezit.com/en-us/home.html');
    await loginPage.clickAcceptCookies();
    await loginPage.clickonHamburgerMenu(isMobile);
    await loginPage.navigateToMyAccount();
    await loginPage.login('sumit@email.com','notapassword');
    await loginPage.expectTextVisible('The account sign-in was incorrect');
  });

});