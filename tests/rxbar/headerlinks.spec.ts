import { test, expect } from '@playwright/test';

test('test', async ({ page, isMobile }) => {
    await page.goto('https://shop.rxbar.com/');
    await page.getByRole('textbox', { name: 'Email Address Email Address' }).click();
    await page.getByRole('button', { name: 'close' }).click();
    await page.getByRole('button', { name: 'OK', exact: true }).click();

    async function clickMenuButton() {
        await page.waitForLoadState('load');
        if (isMobile) {
            await page.getByRole('button', { name: 'Menu button'}).click({force: true});
            // await expect(page.getByRole('button', { name: 'Close Menu' })).toBeVisible({timeout: 12000});
        }
    }
    await clickMenuButton();
    await page.getByLabel('menu', { exact: true }).getByRole('link', { name: 'All Protein Bars' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'Protein Bars' }).nth(1)).toBeVisible();

    await clickMenuButton();
    await page.getByLabel('menu', { exact: true }).getByRole('link', { name: 'Nut Butter & Oat' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'Nut Butter & Oat' }).nth(1)).toBeVisible();

    await clickMenuButton();
    await page.getByRole('link', { name: 'Minis' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'Minis' }).nth(1)).toBeVisible();

    await clickMenuButton();
    await page.getByRole('link', { name: 'Variety Packs' }).click();
    await expect(page.locator('#maincontent').getByRole('listitem').filter({ hasText: 'Variety Packs' })).toBeVisible();

    // await clickMenuButton();
    // await page.getByRole('link', { name: 'Real Talk' }).dblclick({force: true});
    // await expect(page.getByRole('heading', { name: 'Real Talk' })).toBeVisible();

    await clickMenuButton();
    await page.getByLabel('menu', { exact: true }).getByRole('link', { name: 'Subscription' }).click();
    await expect(page.getByRole('heading', { name: 'Subscription tiers' })).toBeVisible();
});