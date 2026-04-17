import { test, expect } from '@playwright/test';

test.describe('Dashboard Navigation', () => {
  test.beforeAll(async ({ request }) => {
    // Bootstrap the real backend with a test rider
    const response = await request.post('http://localhost:8000/api/demo/bootstrap', {
      data: {
        rider_id: 'test_rider_1',
        name: 'Playwright Tester',
        zone: 'HSR Layout',
        upi_id: 'test@upi',
        exclusions_accepted: true
      }
    });
    expect(response.ok()).toBeTruthy();
  });

  test.beforeEach(async ({ page }) => {
    // Navigate and set the riderId in localStorage to simulate being logged in
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('protoryde_rider_id', 'test_rider_1');
      localStorage.setItem('protoryde_zone', 'HSR Layout');
    });
    await page.reload(); // Reload to pick up the state
    
    await expect(page.getByText('Mission Control')).toBeVisible({ timeout: 15000 });
  });

  test('should navigate between all tabs', async ({ page }) => {
    // 1. Home tab check
    await expect(page.getByText('Active Coverage')).toBeVisible();

    // 2. Go to Claims tab
    await page.getByRole('link', { name: 'Claims' }).click();
    await expect(page).toHaveURL(/.*claims/);
    await expect(page.getByText('Claims History')).toBeVisible();

    // 3. Go to Alerts tab
    await page.getByRole('link', { name: 'Alerts' }).click();
    await expect(page).toHaveURL(/.*alerts/);
    await expect(page.getByText('Weather Alerts')).toBeVisible();

    // 4. Go to Profile tab
    await page.getByRole('link', { name: 'Profile' }).click();
    await expect(page).toHaveURL(/.*profile/);
    await expect(page.getByText('Rider Profile')).toBeVisible();
  });

  test('should display profile details correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Profile' }).click();
    await expect(page.getByText('Partner ID')).toBeVisible();
    await expect(page.getByText('UPI ID')).toBeVisible();
  });
});
