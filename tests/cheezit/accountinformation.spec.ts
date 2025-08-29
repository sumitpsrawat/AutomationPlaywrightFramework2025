import { test, expect } from '@playwright/test';

test('test', async ({ page, isMobile }) => {
  await page.goto('https://www.cheezit.com/en-us/home.html');
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  if (isMobile) { await page.getByRole('button', { name: 'hamburger menu' }).click(); }
  await page.getByRole('link', { name: 'Sign In / Sign Up / My Account' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('sumit.singh1@ltimindtree.com');
  await page.getByRole('textbox', { name: 'Password * Password' }).fill('pass@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('My Dashboard')).toBeVisible();
  
  if (isMobile) { await page.locator('.block-collapsible-nav-title').click({delay:2000}); }
  await page.getByRole('link', { name: 'Account Information' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
//   await page.goto('https://shop.cheezit.com/customer/account/');
  await expect(page.getByText('You saved the account')).toBeVisible();
});