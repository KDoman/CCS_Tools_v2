import { test, expect } from "@playwright/test";
import { imageSizeFromFile } from "image-size/fromFile";
import pixelmatch from "pixelmatch";
import sharp from "sharp";
import fs from "fs";

test.describe("Testing Icon and Thumbnail generator tab ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByTestId("icon_thumbnail").first().click();
  });

  test("Testing creator of icon and thumbnail through file", async ({
    page,
  }) => {
    const setImage = page.getByRole("button", { name: "Set Image" });
    const button128x128 = page.getByRole("button", {
      name: "Download 128x128",
    });
    const button512x512 = page.getByRole("button", {
      name: "Download 512x512",
    });

    await page
      .locator("#file_input")
      .setInputFiles("tests/assets/Test_chair.jpeg");

    await setImage.waitFor({ state: "visible" });

    await expect(button128x128).toBeDisabled();
    await expect(button512x512).toBeDisabled();

    await setImage.click();

    await expect(button128x128).toBeEnabled();
    await expect(button512x512).toBeEnabled();

    const [download128] = await Promise.all([
      page.waitForEvent("download"),
      button128x128.click(),
    ]);

    const [download512] = await Promise.all([
      page.waitForEvent("download"),
      button512x512.click(),
    ]);

    const actualPath128 = "tests/tmp/output-128.png";
    const actualPath512 = "tests/tmp/output-512.png";
    const expectedPath128 = "tests/assets/expect_128.png";
    const expectedPath512 = "tests/assets/expect_512.png";

    await download128.saveAs(actualPath128);
    await download512.saveAs(actualPath512);

    const size128 = await imageSizeFromFile(actualPath128);
    const size512 = await imageSizeFromFile(actualPath512);
    const expected128 = await imageSizeFromFile(expectedPath128);
    const expected512 = await imageSizeFromFile(expectedPath512);

    expect(size128.width).toBe(expected128.width);
    expect(size128.height).toBe(expected128.height);
    expect(size512.width).toBe(expected512.width);
    expect(size512.height).toBe(expected512.height);

    // PIXEL DIFF

    async function compareImagesWithSharp(path1, path2) {
      const img1 = sharp(path1).ensureAlpha().raw();
      const img2 = sharp(path2).ensureAlpha().raw();

      const { data: data1, info: info1 } = await img1.toBuffer({
        resolveWithObject: true,
      });
      const { data: data2, info: info2 } = await img2.toBuffer({
        resolveWithObject: true,
      });

      if (info1.width !== info2.width || info1.height !== info2.height) {
        throw new Error("Rozmiary obrazów są różne");
      }

      const diffPixels = pixelmatch(
        data1,
        data2,
        null,
        info1.width,
        info1.height,
        { threshold: 0.35 }
      );

      return diffPixels;
    }

    const diff128 = await compareImagesWithSharp(
      actualPath128,
      expectedPath128
    );
    const diff512 = await compareImagesWithSharp(
      actualPath512,
      expectedPath512
    );

    expect(diff128).toBe(0);
    expect(diff512).toBe(0);

    if (fs.existsSync(actualPath128)) fs.unlinkSync(actualPath128);
    if (fs.existsSync(actualPath512)) fs.unlinkSync(actualPath512);
  });
});
