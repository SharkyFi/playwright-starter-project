const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

const TEST_PAGE_URL = pathToFileURL(path.resolve(__dirname, '../test-pages/demo.html')).href;

test.describe('Screenshot and Visual Tests', () => {
  test('should take a screenshot of a page', async ({ page }, testInfo) => {
    await page.goto(TEST_PAGE_URL);
    
    // Take a screenshot using testInfo for proper path handling
    await page.screenshot({ path: testInfo.outputPath('homepage-screenshot.png') });
  });

  test('should take a screenshot of a specific element', async ({ page }, testInfo) => {
    await page.goto(TEST_PAGE_URL);
    
    // Take a screenshot of just the header
    const header = page.locator('h1');
    await header.screenshot({ path: testInfo.outputPath('header-screenshot.png') });
  });

  test('should verify element state', async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
    
    // Check if elements are visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#clickButton')).toBeVisible();
    await expect(page.locator('#testForm')).toBeVisible();
  });

  test('should verify element attributes', async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
    
    // Check meaningful element attributes
    await expect(page.locator('#nameInput')).toHaveAttribute('type', 'text');
    await expect(page.locator('#nameInput')).toHaveAttribute('placeholder', 'Enter your name');
    await expect(page.locator('#emailInput')).toHaveAttribute('type', 'email');
    await expect(page.locator('#emailInput')).toHaveAttribute('placeholder', 'Enter your email');
  });
});
