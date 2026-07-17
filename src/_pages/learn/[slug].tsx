import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug } from '../../data/articles';
import { useEffect, useState } from 'react';

const modules = import.meta.glob('../../../../public/content/learn/*.md', { as: 'raw' });

export default function LearnArticle() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || '');
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const loader = modules[`../../../../public/content/learn/${slug}.md`];
    if (loader) {
      loader().then(setContent);
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p>Article non trouvé.</p>
        <Link to="/learn" className="mt-4 inline-block underline underline-offset-4">
          ← Retour aux articles
        </Link>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link to="/learn" className="text-sm underline underline-offset-4">
        ← Retour aux articles
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">{article.title}</h1>
      <time className="mt-2 block text-sm text-foreground/50">{article.date}</time>
      <article className="prose prose-neutral mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
