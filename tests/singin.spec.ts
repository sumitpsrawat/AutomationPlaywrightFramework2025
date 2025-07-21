import { test, expect } from '@playwright/test';

test('Poptarts - Signin', async ({ page }) => {
  await page.goto('https://shop.poptarts.com/');
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  await page.getByRole('link', { name: 'My account' }).click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  
  await page.getByRole('textbox', { name: 'Email *' }).fill('sumit.singh1@ltimindtree.com');
  await page.getByRole('textbox', { name: 'Password *' }).fill('pass@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  await page.getByRole('heading', { name: 'My Account' }).locator('span').click();
  await page.getByRole('link', { name: 'My account' }).click();
  await page.getByRole('link', { name: 'Sign Out' }).click();
  await page.getByText('You have signed out and will').click();
});