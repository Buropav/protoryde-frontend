import { test, expect } from '@playwright/test';

test.describe('Dashboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard (skipping onboarding for these tests if possible, 
    // or assuming bootstrapped state)
    await page.goto('/');
    // If it redirects to phone-verification, it means state isn't persisted.
    // For now, we'll assume we start at the root and wait for mission control.
    // In a real CI, we'd inject localStorage/state here.
    await expect(page.getByText('Mission Control')).toBeVisible({ timeout: 10000 });
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
