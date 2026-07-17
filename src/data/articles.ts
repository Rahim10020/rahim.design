
export interface ArticleFrontmatter {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export const articles: ArticleFrontmatter[] = [
  {
    slug: 'premier-article',
    title: 'Résumé : Atomic Habits',
    date: '2026-07-10',
    description: 'Les points clés du livre de James Clear sur les petites habitudes qui changent tout.',
  },
];

export function getArticleBySlug(slug: string): ArticleFrontmatter | undefined {
  return articles.find(a => a.slug === slug);
}
