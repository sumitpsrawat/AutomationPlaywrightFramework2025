import { test, expect } from '@playwright/test';

test('Cheezit: Product overview buttom', async ({ page }) => {
  await page.goto('https://shop.cheezit.com/');
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  await page.getByRole('button', { name: 'QuickView CHEEZ-IT® Pet' }).click();
  expect(await page.locator('iframe.product_quick_view_frame').contentFrame().locator('.page-title').textContent()).toContain('CHEEZ-IT® Pet');
  await page.locator('.action-close').nth(2).click();
});