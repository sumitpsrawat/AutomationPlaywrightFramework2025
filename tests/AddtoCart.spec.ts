import { test, expect } from '@playwright/test';

test('Poptarts - Signin', async ({ page }) => {
  await page.goto('https://shop.poptarts.com/');
  await page.getByRole('button', { name: 'OK', exact: true }).click();
    await page.getByRole('link', { name: 'Home', exact: true }).click();
  await page.getByRole('listitem').filter({ hasText: 'Flavor Variety Socks Rating:' }).getByRole('button').click();
  await page.getByRole('link', { name: 'mycartitems minicart' }).click();
  await page.getByRole('link', { name: 'View and Edit Cart' }).click();
  await page.getByText('Flavor Variety Socks').click();
});