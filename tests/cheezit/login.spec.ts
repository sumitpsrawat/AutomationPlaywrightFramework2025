import { test, expect } from '@playwright/test';

test('Cheezeit: Simple Login', async ({ page, isMobile }) => {
  await page.goto('https://www.cheezit.com/en-us/home.html');
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  if (isMobile) { await page.getByRole('button', { name: 'hamburger menu' }).click(); }
  await page.getByRole('link', { name: 'Sign In / Sign Up / My Account' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('sumit.singh1@ltimindtree.com');
  await page.getByRole('textbox', { name: 'Password * Password' }).fill('pass@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByText('My Dashboard').click();
});