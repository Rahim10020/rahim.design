import { LEARN_TYPES } from "../routes";

export interface ArticleFrontmatter {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: (typeof LEARN_TYPES)[keyof typeof LEARN_TYPES];
}

export const articles: ArticleFrontmatter[] = [
  {
    slug: "premier-article",
    title: "Résumé : Atomic Habits",
    date: "2026-07-10",
    description:
      "Les points clés du livre de James Clear sur les petites habitudes qui changent tout.",
    type: LEARN_TYPES.BOOKS,
  },
];

export function getArticleBySlug(slug: string): ArticleFrontmatter | undefined {
  return articles.find((article) => article.slug === slug);
}
