import { test, expect } from "@playwright/test";
import { promises as fs } from "fs"; // <-- poprawka

test.describe("Testing JPG to PNG converter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("button", { name: "JPG to PNG" }).click();
  });

  //   ------------------------

  test("Testing by JFIF file", async ({ page }) => {
    await page
      .getByRole("button", { name: "Choose File" })
      .setInputFiles("tests/assets/File_before_png_convert.jfif");
  });

  test("Testing by JPG file", async ({ page }) => {
    await page
      .getByRole("button", { name: "Choose File" })
      .setInputFiles("tests/assets/File_before_png_convert.jpg");
  });

  test("Testing by URL", async ({ page }) => {
    await page
      .getByLabel("URL")
      .fill(
        "https://image-api.backend360.intiaro.com//360/product_version/modular/EthanAllen/36173501/custom_config_id/64b60a7736f58d52e5d4a58c2952fd94/width/1024/height/512/angle/0/render_settings/frames_count:36,rotate_size_x:1024,rotate_size_y:512,shadow_enabled:true,tile_size_x:2048,tile_size_y:1024,zoom_size_x:2048,zoom_size_y:1024/?current_angle=0"
      );
  });

  //   -------------------------

  test.afterEach(async ({ page }) => {
    const [downloadPromise] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Download Png" }).click(),
    ]);

    await downloadPromise.saveAs("tmp/jfif_to_png.png");

    const data = await fs.readFile("tmp/jfif_to_png.png"); // <-- teraz działa

    const isPng = data
      .slice(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    expect(isPng).toBe(true);
  });
});
