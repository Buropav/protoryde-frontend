import { test, expect } from '@playwright/test';

test.describe('Parametric Triggers', () => {
  test.beforeAll(async ({ request }) => {
    const riderId = 'test_parametric_rider_new';
    
    // 1. Bootstrap the rider
    await request.post('http://localhost:8000/api/demo/bootstrap', {
      data: {
        rider_id: riderId,
        name: 'Parametric Tester',
        zone: 'HSR Layout',
        upi_id: 'para@upi',
        exclusions_accepted: true
      }
    });

    // 2. Simulate a trigger event for this rider
    const triggerResponse = await request.post('http://localhost:8000/api/demo/simulate-trigger', {
      data: {
        rider_id: riderId,
        trigger_type: 'HEAVY_RAIN',
        zone: 'HSR Layout',
        trigger_value: 45.5 // Over the threshold
      }
    });
    expect(triggerResponse.ok()).toBeTruthy();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('protoryde_rider_id', 'test_parametric_rider_new');
      localStorage.setItem('protoryde_zone', 'HSR Layout');
    });
    await page.reload();
    await expect(page.getByText('Mission Control')).toBeVisible({ timeout: 15000 });
  });

  test('should display active trigger alert and navigate to check-in', async ({ page }) => {
    await expect(page.getByText('⚠️ Active Trigger Event')).toBeVisible({ timeout: 15000 });
    await page.getByText('Start Check-in').click();
    
    // Should be on active trigger screen
    await expect(page.getByText('Severe Weather Triggered')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Predicted Payout')).toBeVisible();
    await expect(page.getByText('₹250')).toBeVisible();
  });

  test('should navigate to weather radar from active trigger screen', async ({ page }) => {
    await page.getByText('Start Check-in').click();
    await page.getByText('View Weather Radar').click();
    await expect(page).toHaveURL(/.*weather-radar/);
  });
});
