import { test, expect } from '@playwright/test';

test('Cheezit: You Cart page', async ({ page }) => {
  await page.goto('https://shop.cheezit.com/');
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  await page.locator('[id="0"]').getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByRole('option', { name: 'Small' }).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.locator('div').filter({ hasText: /^Your Cart$/ })).toBeVisible();
});