import { test, expect } from "@playwright/test";

test.describe("Testing Measurements Tab @measurements", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByTestId("measurements").first().click();
  });

  test("Testing full measurement", async ({ page }) => {
    await page.getByLabel("Full Measurements").fill("84 w x 45 d x 33 h");
    await page.getByText("Calculate").first().click();
    expect(await page.locator("#resultX").textContent()).toBe("213.360");
    expect(await page.locator("#resultY").textContent()).toBe("83.820");
    expect(await page.locator("#resultZ").textContent()).toBe("114.300");
  });

  test("Testing manual measurements", async ({ page }) => {
    await page.locator("#manual_measurements_label").click();
    await page.locator("#manualX").fill("55");
    await page.locator("#manualY").fill("33");
    await page.locator("#manualZ").fill("38");
    await page.getByText("Calculate").nth(1).click();
    expect(await page.locator("#resultX").textContent()).toBe("139.700");
    expect(await page.locator("#resultY").textContent()).toBe("83.820");
    expect(await page.locator("#resultZ").textContent()).toBe("96.520");
  });

  test("Testing Defaults measurements also with rotation", async ({ page }) => {
    await page.locator("#manual_measurements_label").click();
    await page.locator("#manualX").fill("55");
    await page.locator("#manualY").fill("33");
    await page.locator("#manualZ").fill("38");
    await page.getByText("Calculate").nth(1).click();
    expect(
      await page.locator("#no_rotation_kind_left_result").textContent()
    ).toBe("-69.85");
    expect(
      await page.locator("#no_rotation_kind_right_result").textContent()
    ).toBe("69.85");
    await page.locator("#rotation_switch").click();
    expect(await page.locator("#rotation_kind_left_first").textContent()).toBe(
      "-48.26"
    );
    expect(await page.locator("#rotation_kind_right_first").textContent()).toBe(
      "69.85"
    );
    expect(await page.locator("#rotation_kind_left_second").textContent()).toBe(
      "-69.85"
    );
    expect(
      await page.locator("#rotation_kind_right_second").textContent()
    ).toBe("-48.26");
  });
});
