import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "../../_components/ui/others/Markdown";
import ContentImages from "../../_components/ui/others/ContentImages";
import { ArrowLeftIcon, AsteriskIcon } from "../../_components/icons";
import { getLearnArticleAsync } from "../../lib/content";
import type { ArticleFrontmatter } from "../../lib/content";
import { ROUTES } from "../../routes";
import { useLocale } from "../../lib/i18n";
import { getUi } from "../../locales/ui";

type ArticleEntry = { meta: ArticleFrontmatter; content: string };

export default function LearnArticle() {
  const locale = useLocale();
  const t = getUi(locale).learnDetail;
  const { slug } = useParams();
  const [article, setArticle] = useState<ArticleEntry | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    getLearnArticleAsync(slug ?? "", locale).then((entry) => {
      if (!cancelled) setArticle(entry ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [slug, locale]);

  if (article === undefined || (article && article.meta.slug !== slug)) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20" aria-busy="true">
        <p className="text-xl text-foreground-alt">…</p>
      </div>
    );
  }

  if (!article) return <NotFound />;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="mx-auto mb-10 max-w-xl">
        <Link
          to={ROUTES.LEARN.LIST}
          className="mb-8 flex items-center gap-3 text-xl underline underline-offset-4"
        >
          <ArrowLeftIcon size={16} />
          {t.back}
        </Link>
        <h1 className="text-foreground text-4xl md:text-6xl">
          {article.meta.title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-foreground-alt">
          {article.meta.description}
        </p>
      </header>
      <ContentImages
        primaryImage={article.meta.imageSrc}
        images={[]}
        alt={article.meta.title}
      />
      <Markdown content={article.content} />
      <ContentImages images={article.meta.images} alt={article.meta.title} />
    </article>
  );
}

function NotFound() {
  const t = getUi(useLocale()).learnDetail;
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-center justify-center py-48">
        <div>
          <div className="flex flex-col items-center gap-12">
            <AsteriskIcon size={54} />
            <h4 className="text-xl font-normal text-foreground">
              {t.notFound}
            </h4>
          </div>
          <Link
            to={ROUTES.LEARN.LIST}
            className="mt-8 flex items-center gap-4 text-xl text-foreground underline underline-offset-4"
          >
            <ArrowLeftIcon size={16} />
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
