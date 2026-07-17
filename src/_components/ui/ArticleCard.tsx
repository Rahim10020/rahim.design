import { Link } from 'react-router-dom';
import type { ArticleFrontmatter } from '../../data/articles';

interface ArticleCardProps {
  article: ArticleFrontmatter;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to={`/learn/${article.slug}`}
      className="group block rounded-lg border border-black/10 p-4 transition hover:border-black/30"
    >
      <h3 className="text-lg font-semibold group-hover:underline">{article.title}</h3>
      <time className="mt-1 block text-xs text-foreground/50">{article.date}</time>
      <p className="mt-2 text-sm text-foreground/70">{article.description}</p>
    </Link>
  );
}
