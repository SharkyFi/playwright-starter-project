const { test, expect } = require('@playwright/test');
const path = require('path');

const TEST_PAGE_URL = `file://${path.resolve(__dirname, '../test-pages/demo.html')}`;

test.describe('Form and Input Tests', () => {
  test('should fill out a form', async ({ page }) => {
    // Navigate to test page
    await page.goto(TEST_PAGE_URL);
    
    // Fill out the form
    await page.locator('#nameInput').fill('John Doe');
    await page.locator('#emailInput').fill('john@example.com');
    await page.locator('#messageInput').fill('This is a test message');
    
    // Verify the inputs have the correct values
    await expect(page.locator('#nameInput')).toHaveValue('John Doe');
    await expect(page.locator('#emailInput')).toHaveValue('john@example.com');
    await expect(page.locator('#messageInput')).toHaveValue('This is a test message');
  });

  test('should submit a form and verify result', async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
    
    // Fill out the form
    await page.locator('#nameInput').fill('Jane Smith');
    await page.locator('#emailInput').fill('jane@example.com');
    await page.locator('#messageInput').fill('Hello World!');
    
    // Submit the form
    await page.locator('button[type="submit"]').click();
    
    // Verify the result is displayed
    const result = page.locator('#result');
    await expect(result).toBeVisible();
    await expect(result).toContainText('Form Submitted!');
    await expect(result).toContainText('Jane Smith');
    await expect(result).toContainText('jane@example.com');
  });

  test('should clear and refill input fields', async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
    
    // Fill input
    await page.locator('#nameInput').fill('First Name');
    await expect(page.locator('#nameInput')).toHaveValue('First Name');
    
    // Clear and refill
    await page.locator('#nameInput').clear();
    await page.locator('#nameInput').fill('New Name');
    await expect(page.locator('#nameInput')).toHaveValue('New Name');
  });
});
