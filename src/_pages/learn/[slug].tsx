import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getArticleBySlug } from "../../data/articles";
import { useEffect, useState } from "react";
import { ROUTES } from "../../routes";
import { ArrowLeftIcon, AsteriskIcon } from "../../_components/icons";

const modules = import.meta.glob("../../../../public/content/learn/*.md", {
  as: "raw",
});

export default function LearnArticle() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || "");
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
        <div className="flex items-center justify-center py-48">
          <div>
            <div className="flex flex-col items-center gap-12">
              <AsteriskIcon size={54} />
              <h4 className="text-foreground text-xl font-normal">
                Learn article not found.
              </h4>
            </div>
            <Link
              to={ROUTES.PROJECTS.LIST}
              className="mt-8 flex items-center gap-4 text-foreground text-xl underline underline-offset-4"
            >
              <ArrowLeftIcon size={16} />
              Back to learns
            </Link>
          </div>
        </div>
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
      <Link
        to={ROUTES.LEARN.LIST}
        className="text-sm underline underline-offset-4"
      >
        ← Retour aux articles
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">
        {article.title}
      </h1>
      <time className="mt-2 block text-sm text-foreground/50">
        {article.date}
      </time>
      <article className="prose prose-neutral mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
