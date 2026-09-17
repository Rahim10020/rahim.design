import { LEARN_TYPES, type LearnType } from "../routes";
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
type ContentEntry<T> = { meta: T; content: string };

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
const slugFromPath = (path: string) =>
  path.split("/").pop()?.replace(/\.md$/, "") ?? "";

function typeFromPath(path: string): LearnType | undefined {
  const type = path.match(/\/learn\/([^/]+)\//)?.[1];
  return type === LEARN_TYPES.BOOKS || type === LEARN_TYPES.NOTES
    ? type
    : undefined;
}

function learnEntries(): ContentEntry<ArticleFrontmatter>[] {
  return Object.entries(modules)
    .filter(([path]) => path.includes("/content/learn/"))
    .flatMap(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      const type = typeFromPath(path);
      const slug = slugFromPath(path);
      const images = stringArray(data, "images", path);
      const imageSrc = optionalString(data, "imageSrc", path) || images[0];
      return type && slug
        ? [
            {
              meta: {
                slug,
                title: requiredString(data, "title", path),
                date: requiredString(data, "date", path),
                description: requiredString(data, "description", path),
                type,
                ...(imageSrc ? { imageSrc } : {}),
                images: images.filter((image) => image !== imageSrc),
              },
              content,
            },
          ]
        : [];
    });
}

function projectEntries(): ContentEntry<Project>[] {
  return Object.entries(modules)
    .filter(([path]) => path.includes("/content/projects/"))
    .flatMap(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      const category = requiredString(data, "category", path);
      const slug = slugFromPath(path);
      const order = requiredNumber(data, "order", path);
      if (!slug || !PROJECT_CATEGORIES.includes(category as ProjectCategory))
        throw new Error(`Invalid content in ${path}: unknown project category`);
      const imageSrc = optionalString(data, "imageSrc", path);
      const images = stringArray(data, "images", path);
      const link = optionalString(data, "link", path);
      return [
        {
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
            ...(imageSrc || images[0]
              ? { imageSrc: imageSrc || images[0] }
              : {}),
            images: images.filter((image) => image !== (imageSrc || images[0])),
            ...(link ? { link } : {}),
          },
          content,
        },
      ];
    });
}

export const getLearnArticles = () =>
  learnEntries()
    .map(({ meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
export const getLearnArticle = (slug: string) =>
  learnEntries().find((article) => article.meta.slug === slug);
export const getProjects = () =>
  projectEntries()
    .map(({ meta }) => meta)
    .sort((a, b) => a.order - b.order);
export const getProject = (slug: string) =>
  projectEntries().find((project) => project.meta.slug === slug);
