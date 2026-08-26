import { getLearnArticles, type ArticleFrontmatter } from "../lib/content";

export type { ArticleFrontmatter };
export const articles = getLearnArticles();

export function getArticleBySlug(slug: string): ArticleFrontmatter | undefined {
  return articles.find((article) => article.slug === slug);
}
