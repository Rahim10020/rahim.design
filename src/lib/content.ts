import { LEARN_TYPES, type LearnType } from "../routes";
import type { SupportedLocale } from "./locale";
import { parseFrontmatter } from "./frontmatter";

export interface ArticleFrontmatter {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: LearnType;
  imageSrc?: string;
  images: string[];
}
export const PROJECT_CATEGORIES = ["Web", "Mobile", "Design"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export interface Project {
  slug: string;
  order: number;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  imageHeight: string;
  role: string;
  platform: string;
  year: string;
  imageSrc?: string;
  images: string[];
  link?: string;
}
type LocalizedEntry<T> = { meta: T; content: string; locale: SupportedLocale };

function requiredString(
  data: Record<string, unknown>,
  field: string,
  path: string,
): string {
  const value = data[field];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(
      `Invalid content in ${path}: "${field}" must be a non-empty string`,
    );
  }
  return value.trim();
}

function requiredNumber(
  data: Record<string, unknown>,
  field: string,
  path: string,
): number {
  const value = data[field];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(
      `Invalid content in ${path}: "${field}" must be a finite number`,
    );
  }
  return value;
}

function optionalString(
  data: Record<string, unknown>,
  field: string,
  path: string,
): string {
  const value = data[field];
  if (value === undefined) return "";
  if (typeof value !== "string") {
    throw new Error(`Invalid content in ${path}: "${field}" must be a string`);
  }
  return value.trim();
}

function stringArray(
  data: Record<string, unknown>,
  field: string,
  path: string,
): string[] {
  const value = data[field];
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(
      `Invalid content in ${path}: "${field}" must be an array of strings`,
    );
  }
  return value.map((item) => item.trim()).filter(Boolean);
}

const modules = import.meta.glob("../content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Lazy : ne charge le body markdown qu'à la demande (pages détail).
// Les listes restent en eager (métas sync), seul le slug ouvert est
// importé dynamiquement pour éviter de parser les 36 fichiers sur un détail.
const lazyModules = import.meta.glob("../content/**/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

function findBestPath(
  isMatch: (path: string) => boolean,
  slug: string,
  locale: SupportedLocale,
): string | undefined {
  const matching = Object.keys(modules).filter(
    (path) => isMatch(path) && slugFromPath(path) === slug,
  );
  if (matching.length === 0) return undefined;
  return (
    matching.find((p) => localeFromPath(p) === locale) ??
    matching.find((p) => localeFromPath(p) === "fr") ??
    matching.find((p) => localeFromPath(p) === "en")
  );
}

function resolveImageFields(
  data: Record<string, unknown>,
  path: string,
): { imageSrc?: string; images: string[] } {
  const images = stringArray(data, "images", path);
  const imageSrc = optionalString(data, "imageSrc", path) || images[0];
  return {
    ...(imageSrc ? { imageSrc } : {}),
    images: images.filter((image) => image !== imageSrc),
  };
}

function pickLocalized<T extends { slug: string }>(
  all: LocalizedEntry<T>[],
  locale: SupportedLocale,
): LocalizedEntry<T>[] {
  // Regroupe par slug : locale demandée prioritaire, fallback fr puis en
  const bySlug = new Map<string, LocalizedEntry<T>[]>();
  for (const entry of all) {
    const list = bySlug.get(entry.meta.slug) ?? [];
    list.push(entry);
    bySlug.set(entry.meta.slug, list);
  }
  const resolved: LocalizedEntry<T>[] = [];
  for (const list of bySlug.values()) {
    const chosen =
      list.find((e) => e.locale === locale) ??
      list.find((e) => e.locale === "fr") ??
      list.find((e) => e.locale === "en");
    if (chosen) resolved.push(chosen);
  }
  return resolved;
}

function parseLearnFile(
  path: string,
  raw: string,
): {
  meta: ArticleFrontmatter;
  content: string;
  locale: SupportedLocale;
} | null {
  const { data, content } = parseFrontmatter(raw);
  const type = typeFromPath(path);
  const slug = slugFromPath(path);
  if (!type || !slug) return null;
  const { imageSrc, images } = resolveImageFields(data, path);
  return {
    meta: {
      slug,
      title: requiredString(data, "title", path),
      date: requiredString(data, "date", path),
      description: requiredString(data, "description", path),
      type,
      ...(imageSrc ? { imageSrc } : {}),
      images,
    },
    content,
    locale: localeFromPath(path),
  };
}

function parseProjectFile(
  path: string,
  raw: string,
): { meta: Project; content: string; locale: SupportedLocale } {
  const { data, content } = parseFrontmatter(raw);
  const category = requiredString(data, "category", path);
  const slug = slugFromPath(path);
  const order = requiredNumber(data, "order", path);
  if (!slug || !PROJECT_CATEGORIES.includes(category as ProjectCategory))
    throw new Error(`Invalid content in ${path}: unknown project category`);
  const { imageSrc, images } = resolveImageFields(data, path);
  const link = optionalString(data, "link", path);
  return {
    meta: {
      slug,
      order,
      title: requiredString(data, "title", path),
      category: category as ProjectCategory,
      description: requiredString(data, "description", path),
      tags: stringArray(data, "tags", path),
      imageHeight: optionalString(data, "imageHeight", path) || "h-96",
      role: optionalString(data, "role", path) || "À compléter",
      platform: optionalString(data, "platform", path) || "À compléter",
      year: optionalString(data, "year", path) || "À compléter",
      ...(imageSrc ? { imageSrc } : {}),
      images,
      ...(link ? { link } : {}),
    },
    content,
    locale: localeFromPath(path),
  };
}
function localeFromPath(path: string): SupportedLocale {
  return path.endsWith(".fr.md") ? "fr" : "en";
}
const slugFromPath = (path: string) =>
  path
    .split("/")
    .pop()
    ?.replace(/\.fr\.md$/, "")
    ?.replace(/\.md$/, "") ?? "";

function typeFromPath(path: string): LearnType | undefined {
  const type = path.match(/\/learn\/([^/]+)\//)?.[1];
  return type === LEARN_TYPES.BOOKS || type === LEARN_TYPES.NOTES
    ? type
    : undefined;
}

function learnEntries(
  locale: SupportedLocale,
): LocalizedEntry<ArticleFrontmatter>[] {
  const all = Object.entries(modules)
    .filter(([path]) => path.includes("/content/learn/"))
    .flatMap(([path, raw]) => {
      const entry = parseLearnFile(path, raw);
      return entry ? [entry] : [];
    });
  return pickLocalized(all, locale);
}

function projectEntries(locale: SupportedLocale): LocalizedEntry<Project>[] {
  const all = Object.entries(modules)
    .filter(([path]) => path.includes("/content/projects/"))
    .map(([path, raw]) => parseProjectFile(path, raw));
  return pickLocalized(all, locale);
}

export const getLearnArticles = (locale: SupportedLocale = "fr") =>
  learnEntries(locale)
    .map(({ meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
export const getLearnArticle = (slug: string, locale: SupportedLocale = "fr") =>
  learnEntries(locale).find((article) => article.meta.slug === slug);
export const getProjects = (locale: SupportedLocale = "fr") =>
  projectEntries(locale)
    .map(({ meta }) => meta)
    .sort((a, b) => a.order - b.order);
export const getProject = (slug: string, locale: SupportedLocale = "fr") =>
  projectEntries(locale).find((project) => project.meta.slug === slug);

// Versions async (lazy) pour les pages détail : un seul fichier importé.
export async function getLearnArticleAsync(
  slug: string,
  locale: SupportedLocale = "fr",
): Promise<LocalizedEntry<ArticleFrontmatter> | undefined> {
  const path = findBestPath((p) => p.includes("/content/learn/"), slug, locale);
  if (!path) return undefined;
  const loader = lazyModules[path];
  if (!loader) return getLearnArticle(slug, locale);
  const raw = await loader();
  return parseLearnFile(path, raw) ?? undefined;
}

export async function getProjectAsync(
  slug: string,
  locale: SupportedLocale = "fr",
): Promise<LocalizedEntry<Project> | undefined> {
  const path = findBestPath(
    (p) => p.includes("/content/projects/"),
    slug,
    locale,
  );
  if (!path) return undefined;
  const loader = lazyModules[path];
  if (!loader) return getProject(slug, locale);
  const raw = await loader();
  return parseProjectFile(path, raw);
}
