import { test, expect } from '@playwright/test';

test('test', async ({ page }) => { 
  await page.goto('https://shop.cheezit.com/');
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  await page.getByRole('link', { name: 'My Account' }).click();
  await page.getByRole('textbox', { name: 'Email Address *' }).fill('sumit.singh1@ltimindtree.com');
  await page.getByRole('textbox', { name: 'Password *' }).fill('pass@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('My Account').hover();
  await page.getByText('My Account').click();
  await expect(page.getByText('My Dashboard')).toBeVisible();
});