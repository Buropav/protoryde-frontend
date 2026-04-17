import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test('should complete full onboarding successfully', async ({ page }) => {
    // 1. Splash Screen
    await page.goto('/');
    
    // Check if we are on splash (wait for a bit then check for Phone Verification or Splash elements)
    await expect(page).toHaveTitle(/ProtoRyde/);
    
    // Wait for the splash screen transition if it's automatic, 
    // or click "Get Started" if there was a button (there isn't in current code, it's automatic)
    // Current index.tsx has a 3.5s timeout for redirect.
    await expect(page.getByText('Phone Verification')).toBeVisible({ timeout: 10000 });

    // 2. Phone Verification
    await page.getByPlaceholder('000 000 0000').fill('9876543210');
    await page.getByText('Continue').click();

    // 3. OTP Verification
    await expect(page.getByText('Enter OTP')).toBeVisible({ timeout: 10000 });
    // Fill first OTP box using more robust method for React Native Web
    const otpInput = page.locator('input').first();
    await otpInput.click({ force: true });
    await page.keyboard.type('123456');
    await page.getByText('Verify & Next').click();

    // 4. KYC / Personal Details
    await expect(page.getByText('Set Up Your Account')).toBeVisible({ timeout: 10000 });
    await page.getByPlaceholder('e.g. John Doe').fill('Playwright Test User');
    await page.getByPlaceholder('Enter number').fill('9876543210');
    await page.getByPlaceholder('XXXX XXXX 1234').fill('1234');
    await page.getByText('Continue').click();

    // 5. Partner Profile Setup
    await expect(page.getByText('Tell us about your Delhivery partner profile.')).toBeVisible({ timeout: 10000 });
    await page.getByPlaceholder('yourname@upi').fill('test@upi');
    await page.getByText('Continue').click();

    // 6. Zone Selection
    await expect(page.getByText('Zone Selection')).toBeVisible({ timeout: 10000 });
    await page.getByText('HSR Layout').click();
    await page.getByText('Confirm Zone').click();

    // 7. Coverage Exclusions
    await expect(page.getByText('Coverage Exclusions')).toBeVisible({ timeout: 10000 });
    // Need to click all the expansion groups to enable the button (per app logic)
    const groups = ['Bodily & Vehicle Harms', 'Non-Weather Downtime', 'Third-Party App Bans', 'International Incidents'];
    for (const group of groups) {
        await page.getByText(group).click();
    }
    await page.getByText('I Understand and Accept').click();

    // 8. First Premium Payment
    await expect(page.getByText('First Premium Payment')).toBeVisible({ timeout: 10000 });
    await page.getByText(/Pay .* & Activate/).click();

    // 9. Dashboard (Mission Control)
    await expect(page.getByText('Mission Control')).toBeVisible({ timeout: 20000 });
  });
});
