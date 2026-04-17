import { APIRequestContext, expect, Page } from '@playwright/test';

export interface RiderSeed {
  riderId: string;
  name: string;
  zone: string;
  upiId: string;
}

export const riderIdFromPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '') || '0000000000';
  return `rider_${digits}`;
};

export const uniquePhone = (): string => {
  const now = Date.now().toString().slice(-7);
  const rand = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `9${now}${rand}`.slice(0, 10);
};

export const seedDemoRider = async (request: APIRequestContext, data: RiderSeed): Promise<void> => {
  const response = await request.post('http://localhost:8000/api/demo/bootstrap', {
    data: {
      rider_id: data.riderId,
      name: data.name,
      zone: data.zone,
      upi_id: data.upiId,
      exclusions_accepted: true,
    },
  });
  expect(response.ok()).toBeTruthy();
};

export const simulateTriggerEvent = async (
  request: APIRequestContext,
  riderId: string,
  zone: string,
): Promise<void> => {
  const response = await request.post('http://localhost:8000/api/demo/simulate-trigger', {
    data: {
      rider_id: riderId,
      trigger_type: 'HEAVY_RAIN',
      zone,
      trigger_value: 45.5,
    },
  });
  expect(response.ok()).toBeTruthy();
};

export const completeOnboarding = async (
  page: Page,
  opts: {
    phone: string;
    fullName: string;
    upiId: string;
    zone: string;
    aadhaarLast4?: string;
    dob?: string;
  },
): Promise<void> => {
  await page.goto('/');
  await expect(page.getByText('Phone Verification')).toBeVisible({ timeout: 60000 });
  await page.getByPlaceholder('000 000 0000').fill(opts.phone);
  await page.getByText('Continue').last().click();

  await expect(page.getByText('Enter OTP')).toBeVisible({ timeout: 10000 });
  const otpInputs = page.locator('input[maxlength="1"]');
  await expect(otpInputs).toHaveCount(6);
  const otp = '123456';
  for (let i = 0; i < 6; i += 1) {
    await otpInputs.nth(i).fill(otp[i]);
  }
  await page.getByText('Verify & Next').click();

  await expect(page.getByText('Set Up Your Account')).toBeVisible({ timeout: 10000 });
  await page.getByPlaceholder('e.g. John Doe').fill(opts.fullName);
  await page.getByPlaceholder('Enter number').fill(opts.phone);
  await page.getByPlaceholder('XXXX XXXX 1234').fill(opts.aadhaarLast4 ?? '1234');
  await page.getByPlaceholder('DD / MM / YYYY').fill(opts.dob ?? '01 / 01 / 1998');
  await page.getByText('Continue').last().click();

  await expect(page.getByText('Tell us about your Delhivery partner profile.')).toBeVisible({ timeout: 10000 });
  await page.getByPlaceholder('yourname@upi').fill(opts.upiId);
  await page.getByText('Continue').last().click();

  await expect(page.getByText('Zone Selection')).toBeVisible({ timeout: 10000 });
  await page.getByText('Confirm Zone').click();

  await expect(page.getByText('Coverage Exclusions')).toBeVisible({ timeout: 10000 });
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

  await expect(page.getByText('First Premium Payment')).toBeVisible({ timeout: 10000 });
  const dialogPromise = page
    .waitForEvent('dialog', { timeout: 8000 })
    .then(async (dialog) => {
      await dialog.accept();
    })
    .catch(() => {
      return undefined;
    });

  await page.getByText('Pay ₹49.00 & Activate').click();
  await dialogPromise;

  await expect(page.getByText('Mission Control')).toBeVisible({ timeout: 20000 });
};
