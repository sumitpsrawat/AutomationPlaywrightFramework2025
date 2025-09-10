import { test, expect } from '@playwright/test';

test('Cheezit: Validate all social links on footer section', async ({ page }) => {
    await page.goto('https://www.cheezit.com/');
    await page.getByRole('button', { name: 'OK', exact: true }).click();

    //verify all social links in footer section and links are working
    let socialLinks = await page.locator('#sociallinks a').all();
    page.getByRole('button', { name: 'Close Modal' }).click();
    for (let i = 0; i < socialLinks.length; i++) {
        const link = socialLinks[i];
        const href = await link.getAttribute('href');
        const newPagePromise = page.context().waitForEvent('page');
        await link.click();
        const newPage = await newPagePromise;
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL(/cheezit/);
        await newPage.close();
    }

});