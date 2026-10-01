import {
  getLearnArticles as getLearnArticlesFromContent,
  getLearnArticle as getLearnArticleFromContent,
  getLearnArticleAsync as getLearnArticleAsyncFromContent,
  type ArticleFrontmatter,
} from "../lib/content";
import type { SupportedLocale } from "../lib/locale";

export type { ArticleFrontmatter };

export function getArticles(locale: SupportedLocale = "fr") {
  return getLearnArticlesFromContent(locale);
}

export function getArticleBySlug(slug: string, locale: SupportedLocale = "fr") {
  return getLearnArticleFromContent(slug, locale);
}

export function getArticleBySlugAsync(
  slug: string,
  locale: SupportedLocale = "fr",
) {
  return getLearnArticleAsyncFromContent(slug, locale);
}

// Compatibilité FR par défaut
export const articles = getLearnArticlesFromContent("fr");
