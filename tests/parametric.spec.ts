import { expect, test } from '@playwright/test';

test.describe('Parametric Trigger Screens', () => {
  test('shows active trigger payout details', async ({ page }) => {
    await page.goto('/trigger-flow/active-trigger');

    await expect(page.getByText('Severe Weather Triggered')).toBeVisible();
    await expect(page.getByText('Payouts are actively processing.')).toBeVisible();
    await expect(page.getByText('Trigger Type')).toBeVisible();
    await expect(page.getByText('Rainfall > 15mm/hr')).toBeVisible();
    await expect(page.getByText('Predicted Payout')).toBeVisible();
    await expect(page.getByText('₹250')).toBeVisible();
    await expect(page.getByText('Processing...')).toBeVisible();
  });

  test('navigates to radar forecast and validates forecast slots', async ({ page }) => {
    await page.goto('/trigger-flow/active-trigger');
    await page.getByText('View Weather Radar').click();

    await expect(page).toHaveURL(/weather-radar/);
    await expect(page.getByText('Radar & Forecast')).toBeVisible();
    await expect(page.getByText("Tomorrow's Forecast")).toBeVisible();
    await expect(page.getByText('08:00 AM')).toBeVisible();
    await expect(page.getByText('02:00 PM')).toBeVisible();
    await expect(page.getByText('06:00 PM')).toBeVisible();
    await expect(page.getByText('85%')).toBeVisible();
  });
});
