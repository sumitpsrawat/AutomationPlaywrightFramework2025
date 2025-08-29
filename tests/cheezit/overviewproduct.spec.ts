import { test, expect } from '@playwright/test';

test('Cheezit: Product overview buttom', async ({ page }) => {
  await page.goto('https://shop.cheezit.com/');
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  await page.getByRole('button', { name: 'QuickView THE CHEEZY PANTS' }).click();
  await expect(page.locator('#modal-content-97 iframe').contentFrame().getByText('THE CHEEZY PANTS', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '' }).click();
});