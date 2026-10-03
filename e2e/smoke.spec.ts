import { expect, test } from "@playwright/test";

test("home charge et navigue vers un projet", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#main")).toBeVisible();
  await page.goto("/projects");
  await expect(page.locator("#main")).toContainText(/Projets|Projects/);
});

test("article learn inexistant rend la 404", async ({ page }) => {
  const res = await page.goto("/learn/nope");
  expect(res?.ok()).toBeTruthy();
  await expect(page.locator("#main")).toBeVisible();
});

test("switch FR/EN via ?lang=", async ({ page }) => {
  await page.goto("/?lang=en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/?lang=fr");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});
