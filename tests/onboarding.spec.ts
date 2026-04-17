import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test('should complete the full onboarding sequence', async ({ page }) => {
    // 1. Splash Screen
    await page.goto('/');
    
    // Wait for the splash screen to transition (approx 2s + animation delay)
    // It should redirect to phone-verification
    await expect(page).toHaveURL(/.*phone-verification/);
    await expect(page.getByText('Phone Verification')).toBeVisible();

    // 2. Phone Verification
    await page.getByPlaceholder('000 000 0000').fill('9876543210');
    await page.getByRole('button', { name: 'Continue' }).click();

    // 3. OTP Verification
    await expect(page).toHaveURL(/.*otp-verification/);
    await expect(page.getByText('Enter OTP')).toBeVisible();
    await page.getByRole('button', { name: 'Verify & Next' }).click();

    // 4. Personal Details (KYC)
    await expect(page).toHaveURL(/.*personal-details-kyc/);
    await expect(page.getByText('Set Up Your Account')).toBeVisible();
    
    // Fill KYC details
    await page.getByPlaceholder('e.g. John Doe').fill('Playwright Test User');
    await page.getByPlaceholder('XXXX XXXX 1234').fill('1234');
    await page.getByPlaceholder('DD / MM / YYYY').fill('01 / 01 / 1995');
    await page.getByRole('button', { name: 'Continue' }).click();

    // 5. Partner Profile Setup
    await expect(page).toHaveURL(/.*partner-profile-setup/);
    await expect(page.getByText('Partner Details')).toBeVisible();
    await page.getByPlaceholder('e.g. upi@bank or number@upi').fill('test@upi');
    await page.getByText('2-Wheeler (Petrol)').click();
    await page.getByRole('button', { name: 'Complete Profile' }).click();

    // 6. Zone Selection
    await expect(page).toHaveURL(/.*zone-selection/);
    await page.getByText('HSR Layout').click();
    await page.getByRole('button', { name: 'Confirm Zone' }).click();

    // 7. Coverage Exclusions
    await expect(page).toHaveURL(/.*coverage-exclusions/);
    await page.getByText('I understand and accept these exclusions').click();
    await page.getByRole('button', { name: 'Next' }).click();

    // 8. First Premium Payment
    await expect(page).toHaveURL(/.*first-premium-payment/);
    await expect(page.getByText('Total Premium')).toBeVisible();
    
    // Select standard and pay
    await page.getByText('Standard Plan').click();
    await page.getByRole('button', { name: 'Pay & Activate' }).click();

    // 9. Dashboard (Mission Control)
    await expect(page).toHaveURL(/\/$/); // Should be back at root but bootstrapped
    await expect(page.getByText('Mission Control')).toBeVisible();
    await expect(page.getByText('Protected')).toBeVisible();
  });
});
