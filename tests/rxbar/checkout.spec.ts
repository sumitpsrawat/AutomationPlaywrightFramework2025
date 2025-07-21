import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://shop.rxbar.com/');
    await page.getByRole('textbox', { name: 'Email Address Email Address' }).click();
    await page.getByRole('button', { name: 'close' }).click();
    await page.getByRole('button', { name: 'OK', exact: true }).click();
    await page.locator('#maincontent').getByText('Vanilla Almond').click();
    await page.locator('.price').first().click();
    await page.getByTitle('Add to Cart').click();
    // await page.getByRole('button', { name: 'Checkout' }).click();
    // await page.goto('https://shop.rxbar.com/checkout/#shipping');
    // await page.getByText('Checkout', { exact: true }).click();
});