const { test, expect } = require('@playwright/test');
const path = require('path');

const TEST_PAGE_URL = `file://${path.resolve(__dirname, '../test-pages/demo.html')}`;

test.describe('Element Interaction Tests', () => {
  test('should click on links and navigate', async ({ page }) => {
    // Navigate to test page
    await page.goto(TEST_PAGE_URL);
    
    // Click on "Link to Section 1"
    await page.locator('#link1').click();
    
    // Verify navigation occurred by checking the hash
    expect(page.url()).toContain('#section1');
  });

  test('should find and verify button visibility', async ({ page }) => {
    // Navigate to test page
    await page.goto(TEST_PAGE_URL);
    
    // Find visible buttons
    const clickButton = page.locator('#clickButton');
    await expect(clickButton).toBeVisible();
    await expect(clickButton).toHaveText('Click Me');
  });

  test('should check element text content', async ({ page }) => {
    // Navigate to test page
    await page.goto(TEST_PAGE_URL);
    
    // Check if specific text exists on the page
    await expect(page.locator('body')).toContainText('Playwright Test Demo Page');
    await expect(page.locator('p').first()).toContainText('simple test page');
  });

  test('should verify multiple elements', async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
    
    // Verify multiple buttons exist
    const buttons = page.locator('button');
    await expect(buttons).toHaveCount(3); // clickButton, toggleButton, and submit button
  });

  test('should toggle visibility of content', async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
    
    // Verify content is initially hidden
    const toggleContent = page.locator('#toggleContent');
    await expect(toggleContent).toHaveClass(/hidden/);
    
    // Click toggle button
    await page.locator('#toggleButton').click();
    
    // Verify content is now visible
    await expect(toggleContent).not.toHaveClass(/hidden/);
  });
});
