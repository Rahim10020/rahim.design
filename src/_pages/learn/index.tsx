import { Link, useSearchParams } from "react-router-dom";
import LearnCard from "../../_components/ui/LearnCard";
import { articles } from "../../data/articles";
import {
  getLearnPath,
  isLearnType,
  LEARN_TYPES,
  type LearnType,
} from "../../routes";

type LearnFilter = "all" | LearnType;

const filters: ReadonlyArray<{ label: string; value: LearnFilter }> = [
  { label: "All", value: "all" },
  { label: "Books", value: LEARN_TYPES.BOOKS },
  { label: "Notes", value: LEARN_TYPES.NOTES },
];

export default function LearnPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedType = searchParams.get("type");
  const activeFilter = isLearnType(requestedType)
    ? requestedType
    : "all";
  const filteredArticles = articles.filter(
    (article) => activeFilter === "all" || article.type === activeFilter,
  );

  return (
    <section className="w-full min-h-screen bg-background">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="mb-10 text-foreground text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight">
            Learn
          </h1>

          <div className="flex items-center justify-center">
            <div className="flex flex-wrap gap-3 mb-14">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() =>
                      setSearchParams(
                        filter.value === "all" ? {} : { type: filter.value },
                      )
                    }
                    className={`
                      px-8 py-2.5 text-lg md:text-xl font-medium cursor-pointer border-2 border-foreground transition-colors
                      ${
                        isActive
                          ? "bg-primary text-foreground"
                          : "bg-transparent text-foreground hover:bg-background"
                      }
                    `}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <Link key={article.slug} to={getLearnPath(article.slug)}>
                <LearnCard
                  title={article.title}
                  description={article.description}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
