const { test, expect } = require('@playwright/test');
const path = require('path');

const TEST_PAGE_URL = `file://${path.resolve(__dirname, '../test-pages/demo.html')}`;

test.describe('Screenshot and Visual Tests', () => {
  test('should take a screenshot of a page', async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
    
    // Take a screenshot
    await page.screenshot({ path: 'test-results/homepage-screenshot.png' });
  });

  test('should take a screenshot of a specific element', async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
    
    // Take a screenshot of just the header
    const header = page.locator('h1');
    await header.screenshot({ path: 'test-results/header-screenshot.png' });
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
    
    // Check element attributes
    await expect(page.locator('#clickButton')).toHaveAttribute('id', 'clickButton');
    await expect(page.locator('#nameInput')).toHaveAttribute('type', 'text');
    await expect(page.locator('#emailInput')).toHaveAttribute('type', 'email');
  });
});
