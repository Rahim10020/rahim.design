import { Link, useSearchParams } from "react-router-dom";
import LearnCard from "../../_components/ui/LearnCard";
import {
  LEARN_TYPES,
  ROUTES,
  isLearnType,
  getLearnListPath,
  getLearnPath,
} from "../../routes";
import { articles } from "../../data/articles";

const FILTERS = [
  { label: "All", value: undefined },
  { label: "Books", value: LEARN_TYPES.BOOKS },
  { label: "Notes", value: LEARN_TYPES.NOTES },
] as const;

export default function LearnList() {
  const [searchParams] = useSearchParams();
  const selectedType = searchParams.get("type");
  const visibleArticles = isLearnType(selectedType)
    ? articles.filter((article) => article.type === selectedType)
    : articles;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-foreground/50">
            {ROUTES.LEARN.LIST}
          </p>
          <h1 className="mt-3 text-4xl font-medium">Learn</h1>
        </div>
        <Link to={ROUTES.HOME} className="underline underline-offset-4">
          Back home
        </Link>
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        {FILTERS.map((filter) => {
          const isActive =
            filter.value === selectedType || (!filter.value && !selectedType);
          return (
            <Link
              key={filter.label}
              to={
                filter.value
                  ? getLearnListPath(filter.value)
                  : ROUTES.LEARN.LIST
              }
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/15 hover:border-foreground/40"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      {visibleArticles.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2">
          {visibleArticles.map((article) => (
            <Link key={article.slug} to={getLearnPath(article.slug)}>
              <LearnCard
                title={article.title}
                description={article.description}
                imageAlt={article.title}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-foreground/60">No articles match this filter yet.</p>
      )}
    </div>
  );
}
