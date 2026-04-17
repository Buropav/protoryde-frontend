import { expect, test } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test('enforces validation on key onboarding steps', async ({ page }) => {
    await page.goto('/phone-verification');
    await page.getByText('Continue').last().click();
    await expect(page.getByText('Enter a valid 10-digit mobile number.')).toBeVisible();

    await page.goto('/otp-verification');
    await page.getByText('Verify & Next').click();
    await expect(page.getByText('Enter the 6-digit OTP.')).toBeVisible();

    await page.goto('/onboarding/personal-details-kyc');
    await page.getByText('Continue').last().click();
    await expect(page.getByText('Enter a valid 10-digit mobile number.')).toBeVisible();

    await page.goto('/onboarding/partner-profile-setup');
    await page.getByText('Continue').last().click();
    await expect(page.getByText('Enter a valid UPI ID (example: yourname@upi).')).toBeVisible();
  });

  test('walks through onboarding screens with detailed UI checks', async ({ page }) => {
    await page.goto('/phone-verification');
    await expect(page.getByText('Phone Verification')).toBeVisible();
    await expect(page.getByPlaceholder('000 000 0000')).toBeVisible();
    await page.getByPlaceholder('000 000 0000').fill('9876543210');
    await page.getByText('Continue').last().click();

    await expect(page.getByText('Enter OTP')).toBeVisible();
    const otpInputs = page.locator('input[maxlength="1"]');
    await expect(otpInputs).toHaveCount(6);
    for (let i = 0; i < 6; i += 1) {
      await otpInputs.nth(i).fill(String(i + 1));
    }
    await page.getByText('Verify & Next').click();

    await expect(page.getByText('Set Up Your Account')).toBeVisible();
    await page.getByPlaceholder('e.g. John Doe').fill('Playwright Rider');
    await page.getByPlaceholder('Enter number').fill('9876543210');
    await page.getByPlaceholder('XXXX XXXX 1234').fill('1234');
    await page.getByPlaceholder('DD / MM / YYYY').fill('01 / 01 / 1998');
    await page.getByText('Continue').last().click();

    await expect(page.getByText('Tell us about your Delhivery partner profile.')).toBeVisible();
    await expect(page.getByText('DEL-BLR-284719')).toBeVisible();
    await page.getByPlaceholder('yourname@upi').fill('playwright@upi');
    await page.getByText('Continue').last().click();

    await expect(page.getByText('Zone Selection')).toBeVisible();
    await expect(page.getByText('Confirm Zone')).toBeVisible();
    await page.getByText('Confirm Zone').click();

    await expect(page.getByText('Coverage Exclusions')).toBeVisible();
    const groups = [
      'Bodily & Vehicle Harms',
      'Non-Weather Downtime',
      'Third-Party App Bans',
      'International Incidents',
    ];
    for (const group of groups) {
      await page.getByText(group).click();
    }
    await page.getByText('I Understand and Accept').click();

    await expect(page.getByText('First Premium Payment')).toBeVisible();
    await expect(page.getByText('Total to Pay')).toBeVisible();
    await expect(page.getByText('₹49.00', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Base Premium')).toBeVisible();
    await expect(page.getByText('Taxes (18%)')).toBeVisible();
    await expect(page.getByText('Pay ₹49.00 & Activate')).toBeVisible();
  });
});
