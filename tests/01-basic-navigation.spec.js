const { test, expect } = require('@playwright/test');
const path = require('path');

const TEST_PAGE_URL = `file://${path.resolve(__dirname, '../test-pages/demo.html')}`;

test.describe('Basic Navigation Tests', () => {
  test('should load a webpage and verify title', async ({ page }) => {
    // Navigate to a webpage
    await page.goto(TEST_PAGE_URL);
    
    // Verify the page title
    await expect(page).toHaveTitle('Playwright Test Demo Page');
  });

  test('should navigate to a URL and check heading', async ({ page }) => {
    // Navigate to test page
    await page.goto(TEST_PAGE_URL);
    
    // Find and verify the main heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Playwright Test Demo Page');
  });

  test('should verify page URL', async ({ page }) => {
    // Navigate to a page
    await page.goto(TEST_PAGE_URL);
    
    // Verify the URL contains the file path
    expect(page.url()).toContain('demo.html');
  });
});
