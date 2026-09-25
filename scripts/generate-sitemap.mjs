/**
 * Sitemap + robots.txt generator (runs at build time).
 *
 * Why a script instead of a static file in public/?
 * Vite copies public/ files as-is, so `import.meta.env.VITE_SITE_URL` cannot
 * be interpolated there. This script reads VITE_SITE_URL from the environment
 * and writes public/sitemap.xml + public/robots.txt before `vite build`,
 * so dist/ always contains absolute production URLs.
 *
 * Production fallback: https://rahim.design (repo: Rahim10020/rahim.design).
 * Override locally with a .env file: VITE_SITE_URL=https://rahim.design
 *
 * Only includes valid routes:
 * - static pages: /, /about, /services, /projects, /learn
 * - one URL per existing markdown slug under src/content/projects and
 *   src/content/learn/{books,notes} (no invalid dynamic routes).
 *
 * Usage: node scripts/generate-sitemap.mjs  (wired into `pnpm build`)
 */

import { readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = (process.env.VITE_SITE_URL || "https://rahim.design").replace(
  /\/$/,
  "",
);

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

const STATIC_ROUTES = ["/", "/about", "/services", "/projects", "/learn"];

function slugsIn(dir) {
  try {
    return readdirSync(join(root, dir))
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

const projectSlugs = slugsIn("src/content/projects");
const articleSlugs = [
  ...slugsIn("src/content/learn/books"),
  ...slugsIn("src/content/learn/notes"),
];

const today = new Date().toISOString().slice(0, 10);
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const urls = [
  ...STATIC_ROUTES,
  ...projectSlugs.map((s) => `/projects/${s}`),
  ...articleSlugs.map((s) => `/learn/${s}`),
];

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (path) =>
        `  <url>\n    <loc>${esc(`${SITE_URL}${path}`)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(join(pub, "sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(pub, "robots.txt"), robots);

console.log(
  `SEO: wrote sitemap.xml (${urls.length} urls) + robots.txt with SITE_URL=${SITE_URL}`,
);
