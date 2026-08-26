import { LEARN_TYPES, type LearnType } from "../routes";
import { parseFrontmatter } from "./frontmatter";

export interface ArticleFrontmatter {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: LearnType;
}
export const PROJECT_CATEGORIES = ["Web", "Mobile", "Design"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  imageHeight: string;
  imageSrc?: string;
  link?: string;
}
type ContentEntry<T> = { meta: T; content: string };

const modules = import.meta.glob("../../public/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const slugFromPath = (path: string) =>
  path.split("/").pop()?.replace(/\.md$/, "") ?? "";
const text = (value: unknown) => (typeof value === "string" ? value : "");

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
      return type && slug
        ? [
            {
              meta: {
                slug,
                title: text(data.title),
                date: text(data.date),
                description: text(data.description),
                type,
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
      const category = text(data.category);
      const slug = slugFromPath(path);
      if (!slug || !PROJECT_CATEGORIES.includes(category as ProjectCategory))
        return [];
      const imageSrc = text(data.imageSrc);
      const link = text(data.link);
      return [
        {
          meta: {
            slug,
            title: text(data.title),
            category: category as ProjectCategory,
            description: text(data.description),
            tags: Array.isArray(data.tags)
              ? data.tags.filter(
                  (tag): tag is string => typeof tag === "string",
                )
              : [],
            imageHeight: text(data.imageHeight) || "h-96",
            ...(imageSrc ? { imageSrc } : {}),
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
export const getProjects = () => projectEntries().map(({ meta }) => meta);
export const getProject = (slug: string) =>
  projectEntries().find((project) => project.meta.slug === slug);
