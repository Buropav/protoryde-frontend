import { test, expect } from '@playwright/test';

test.describe('Parametric Triggers', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to a state where a trigger is active or accessible
    await page.goto('/trigger-flow/active-trigger');
  });

  test('should display active trigger details', async ({ page }) => {
    await expect(page.getByText('Severe Weather Triggered')).toBeVisible();
    await expect(page.getByText('Predicted Payout')).toBeVisible();
    await expect(page.getByText('₹250')).toBeVisible();
    await expect(page.getByText('Processing...')).toBeVisible();
  });

  test('should navigate to weather radar', async ({ page }) => {
    await page.getByRole('button', { name: 'View Weather Radar' }).click();
    await expect(page).toHaveURL(/.*weather-radar/);
  });
});
