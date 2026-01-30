const { test, expect } = require('@playwright/test');

// Skip API tests in environments without internet access
test.describe('API Testing Examples', () => {
  test.skip(!process.env.RUN_API_TESTS, 'API tests require internet access');

  test('should make a GET request and verify response', async ({ request }) => {
    // Make a GET request to a public API
    const response = await request.get('https://api.github.com/repos/microsoft/playwright');
    
    // Verify the response status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    // Parse and verify JSON response
    const data = await response.json();
    expect(data.name).toBe('playwright');
    expect(data.owner.login).toBe('microsoft');
  });

  test('should verify response headers', async ({ request }) => {
    const response = await request.get('https://api.github.com/repos/microsoft/playwright');
    
    // Check response headers
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('should handle API response data', async ({ request }) => {
    const response = await request.get('https://api.github.com/users/github');
    
    expect(response.ok()).toBeTruthy();
    const userData = await response.json();
    
    // Verify user data structure
    expect(userData).toHaveProperty('login');
    expect(userData).toHaveProperty('id');
    expect(userData.login).toBe('github');
  });
});

// Note: To run API tests, set the environment variable: RUN_API_TESTS=true npm test
