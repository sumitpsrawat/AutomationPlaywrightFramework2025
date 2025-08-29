import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';

test('Account Dashboard link validate', async ({ page, isMobile }) => {
  // await page.goto('https://www.cheezit.com/en-us/home.html');
  // await page.getByRole('button', { name: 'OK', exact: true }).click();
  // if (isMobile) { await page.getByRole('button', { name: 'hamburger menu' }).click(); }
  // await page.getByRole('link', { name: 'Sign In / Sign Up / My Account' }).click();
  // await page.getByRole('textbox', { name: 'Email *' }).fill('sumit.singh1@ltimindtree.com');
  // await page.getByRole('textbox', { name: 'Password * Password' }).fill('pass@123');
  // await page.getByRole('button', { name: 'Sign In' }).click();
  // await expect(page.getByText('My Dashboard')).toBeVisible();
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('https://www.cheezit.com/en-us/home.html');
  await loginPage.clickAcceptCookies();
  await loginPage.clickonHamburgerMenu(isMobile);
  await loginPage.navigateToMyAccount();
  await loginPage.happyLogin();
  await loginPage.expectTextVisible('My Dashboard');

  //div[@class='title block-collapsible-nav-title']
  if (isMobile) { await page.locator('.block-collapsible-nav-title').click({ delay: 2000 }); }
  await page.getByRole('link', { name: 'Account Information' }).click();
  await expect(page.getByText('Edit Account Information')).toBeVisible();

  if (isMobile) { await page.locator('.block-collapsible-nav-title').click({ delay: 2000 }); }
  await expect(page.getByRole('link', { name: 'Address Book' })).toBeVisible();
  await page.getByRole('link', { name: 'Address Book' }).click();
  await expect(page.getByText('Add New Address')).toBeVisible();

  if (isMobile) { await page.locator('.block-collapsible-nav-title').click({ delay: 2000 }); }
  await page.getByRole('link', { name: 'My Orders' }).click();
  await expect(page.getByRole('heading', { name: 'My Orders' }).locator('span')).toBeVisible();

  if (isMobile) { await page.locator('.block-collapsible-nav-title').click({ delay: 2000 }); }
  await page.getByRole('link', { name: 'Stored Payment Methods' }).click();
  await expect(page.getByRole('heading', { name: 'Stored Payment Methods' }).locator('span')).toBeVisible();
});