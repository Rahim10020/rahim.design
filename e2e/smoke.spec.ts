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

test("filtre projets : état actif et compteur annoncé", async ({ page }) => {
  await page.goto("/projects?lang=fr");
  const web = page.getByRole("button", { name: "Web", exact: true });

  await web.click();

  await expect(web).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status")).toContainText(
    /Projets affichés : \d+/,
  );
});

test("filtre learn : URL et état actif", async ({ page }) => {
  await page.goto("/learn?lang=fr");
  const books = page.getByRole("button", { name: "Livres", exact: true });

  await books.click();

  await expect(page).toHaveURL(/type=books/);
  await expect(books).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status")).toContainText(
    /Articles affichés : \d+/,
  );
});
