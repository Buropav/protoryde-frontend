import { expect, test } from "@playwright/test";

test.describe("Dashboard Routes", () => {
  test("renders claims and alerts screens", async ({ page }) => {
    await page.goto("/claims");
    await expect(page.getByText("Claims History")).toBeVisible();
    await expect(page.getByText("Total Paid Out")).toBeVisible();
    await expect(page.getByText("Recent Claims")).toBeVisible();

    await page.goto("/alerts");
    await expect(page.getByText("Notifications")).toBeVisible();
  });

  test("renders profile screen account sections", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.getByText("CURRENT TIER")).toBeVisible();
    await expect(page.getByText("Account")).toBeVisible();
    await expect(page.getByText("Policy Document & Definitions")).toBeVisible();
    await expect(page.getByText("Switch to Admin Mode")).toBeVisible();
    await expect(page.getByText("Log Out")).toBeVisible();
  });
});
