import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://shop.rxbar.com/');
  await page.getByRole('button', { name: 'OK', exact: true }).click();
//   if(await page.getByLabel('Sign up to save 20% OFF').locator('div').filter({ hasText: 'FEELING HUNGRY? Sign up to' }).nth(1).isVisible()) {
// //   await expect(page.getByLabel('Sign up to save 20% OFF').locator('div').filter({ hasText: 'FEELING HUNGRY? Sign up to' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'close' }).click();
//   }
  await page.getByLabel('My Account').click();
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email Address *' }).click();
  await page.getByRole('textbox', { name: 'Email Address *' }).fill('sumit.singh1@ltimindtr');
  await page.getByRole('textbox', { name: 'Email Address *' }).fill('sumit.singh1@ltimindtree.com');
  await page.getByRole('textbox', { name: 'Email Address *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password *' }).fill('pass@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('listitem').filter({ hasText: /^My Account$/ }).hover();
  await page.locator('#header-account a').filter({ hasText: 'My Account' }).click();
});