import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.poptarts.com/en_US/home.html');
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  await page.getByRole('link', { name: 'Cookie Preferences' }).click();
  
  await page.getByRole('heading', { name: 'Privacy Preference Center' }).click();
  await page.getByAltText('Company Logo').click();
  await page.getByRole('button', { name: 'Confirm My Choices' }).click();

  await page.waitForTimeout(2000); // Wait for the page to load after confirming choices
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Privacy Notice' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('heading', { name: 'Kellanova Consumer Privacy' }).click();
  expect(await page1.title()).toContain("Kellanova's Privacy Policy");

  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'US Privacy' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('heading', { name: 'Kellanova U.S. Consumer' }).click();

  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Terms of Use' }).click();
  const page3 = await page3Promise;
  await page3.getByRole('heading', { name: 'TERMS OF USE' }).click();

  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Your Privacy Choices' }).click();
  const page4 = await page4Promise;
  await page4.getByRole('heading', { name: 'Your U.S. Privacy Choices' }).locator('span').click();

  const page5Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Accessibility' }).click();
  const page5 = await page5Promise;
  await page5.getByRole('heading', { name: 'Kellanova Web Accessibility' }).click();
});