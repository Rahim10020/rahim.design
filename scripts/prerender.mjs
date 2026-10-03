/**
 * Pré-rendu statique FR (SSG léger pour SPA Vite).
 *
 * 1. Lit les routes depuis src/content/** (même source que generate-sitemap.mjs).
 * 2. Sert dist/ via `vite preview`, crawl chaque URL en ?prerender=1&lang=fr
 *    avec Playwright (Chrome système si dispo, sinon Chromium Playwright).
 * 3. Écrit dist/<route>/index.html avec le DOM final (contenu + SEO FR).
 *
 * Fallback gracieux : si aucun navigateur n'est disponible ou si le crawl
 * échoue, le script warn + exit 0 et dist/ reste la SPA inchangée.
 * Vercel sert les fichiers statiques avant le rewrite /(.*) -> /index.html,
 * donc chaque route pré-rendue gagne FCP/LCP/TTFB sans changer le routage.
 *
 * Usage: node scripts/prerender.mjs (wired into `pnpm build`)
 */

import { spawn } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = (
  process.env.VITE_SITE_URL || "https://rahim-dev-me.vercel.app"
).replace(/\/$/, "");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const PREVIEW_PORT = Number(process.env.PRERENDER_PORT || 4173);
const PREVIEW_ORIGIN = `http://127.0.0.1:${PREVIEW_PORT}`;

const STATIC_ROUTES = ["/", "/about", "/services", "/contact", "/projects", "/learn"];

function slugsIn(dir) {
  try {
    return readdirSync(join(root, dir))
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.fr\.md$/, "").replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

function uniq(values) {
  return [...new Set(values)];
}

const projectSlugs = uniq(slugsIn("src/content/projects"));
const articleSlugs = uniq([
  ...slugsIn("src/content/learn/books"),
  ...slugsIn("src/content/learn/notes"),
]);

const ROUTES = [
  ...STATIC_ROUTES,
  ...projectSlugs.map((s) => `/projects/${s}`),
  ...articleSlugs.map((s) => `/learn/${s}`),
];

function detailPattern(route) {
  return /^\/(projects|learn)\/[^/]+$/.test(route);
}

function outFile(route) {
  if (route === "/") return join(dist, "index.html");
  return join(dist, route.slice(1), "index.html");
}

async function waitForPreviewReady(timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${PREVIEW_ORIGIN}/`, { redirect: "follow" });
      // La SPA rewrite tout vers index.html : un 200 suffit comme signal ready
      if (res.ok) return;
    } catch {
      // serveur pas encore levé
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`vite preview not ready after ${timeoutMs}ms`);
}

async function launchBrowser() {
  const { chromium } = await import("@playwright/test");
  const attempts = [
    { channel: "chrome" }, // Chrome système (CI/dev), sans download navigateur
    { channel: "chromium" },
    {}, // Chromium embarqué Playwright (si installé)
  ];
  let lastError;
  for (const opts of attempts) {
    try {
      return await chromium.launch(opts);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error("no browser available");
}

async function prerender() {
  let browser;
  try {
    browser = await launchBrowser();
  } catch (err) {
    console.warn(
      `[prerender] skip: aucun navigateur dispo (${err?.message ?? err}). dist/ reste la SPA.`,
    );
    return { ok: 0, skipped: ROUTES.length };
  }

  const page = await browser.newPage();
  let ok = 0;
  let failed = 0;

  for (const route of ROUTES) {
    const url = `${PREVIEW_ORIGIN}${route}?prerender=1&lang=fr`;
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.locator("#main").waitFor({ timeout: 20000 });
      if (detailPattern(route)) {
        // Pages détail async : attend le contenu (ou le not-found), pas le squelette
        try {
          await page
            .locator('[data-ready="ready"], [data-ready="not-found"]')
            .waitFor({ timeout: 20000 });
        } catch {
          console.warn(
            `[prerender] ${route}: contenu async non prêt après 20s, snapshot quand même`,
          );
        }
      }
      // Laisse GSAP/paint se stabiliser avant le snapshot
      await page.waitForTimeout(400);
      // Force lang FR explicite (le crawl peut finir avant applyDetectedLocale)
      await page.evaluate(() => {
        document.documentElement.lang = "fr";
      });
      let html = await page.content();
      // SEO.tsx fallback sur window.location.origin pendant le crawl :
      // remplace l'origine preview par l'URL prod canonique.
      html = html.split(PREVIEW_ORIGIN).join(SITE_URL);
      // Sécurité : aucune trace du query de crawl dans le HTML servi
      html = html
        .split("?prerender=1&lang=fr")
        .join("")
        .split("?prerender=1")
        .join("");

      const file = outFile(route);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, html);
      ok += 1;
      console.log(`[prerender] ok ${route} -> ${file}`);
    } catch (err) {
      failed += 1;
      console.warn(`[prerender] fail ${route}: ${err?.message ?? err}`);
    }
  }

  await browser.close();
  return { ok, skipped: 0, failed };
}

async function main() {
  // Le rewrite SPA renvoie index.html pour toute route : le preview suffit.
  const preview = spawn(
    "npx",
    ["vite", "preview", "--port", String(PREVIEW_PORT), "--strictPort"],
    { cwd: root, stdio: "ignore", shell: process.platform === "win32" },
  );

  try {
    await waitForPreviewReady();
    const { ok, skipped, failed } = await prerender();
    if (failed) {
      console.warn(
        `[prerender] terminé avec ${failed} échec(s), ${ok} page(s) OK — les routes en échec restent en SPA.`,
      );
    } else if (skipped) {
      console.warn(`[prerender] skip (${skipped} routes), dist/ inchangé.`);
    } else {
      console.log(`[prerender] ${ok}/${ROUTES.length} pages pré-rendues (FR).`);
    }
  } catch (err) {
    console.warn(
      `[prerender] skip: ${err?.message ?? err}. dist/ reste la SPA.`,
    );
  } finally {
    preview.kill("SIGTERM");
  }
}

await main();
