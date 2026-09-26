import { Link } from "react-router-dom";
import { ArrowLeftIcon, AsteriskIcon } from "../_components/icons";
import { ROUTES } from "../routes";
import { useLocale } from "../lib/i18n";
import { getUi } from "../locales/ui";

export default function NotFoundPage() {
  const t = getUi(useLocale()).notFoundPage;
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-center justify-center py-32 md:py-48">
        <div className="text-center">
          <p className="text-xl text-foreground-alt">404</p>
          <div className="mt-6 flex flex-col items-center gap-8">
            <AsteriskIcon size={54} />
            <h1 className="text-4xl text-foreground md:text-6xl">
              {t.title}
            </h1>
            <p className="max-w-md text-xl leading-relaxed text-foreground-alt">
              {t.description}
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-3 text-xl text-foreground underline underline-offset-4"
            >
              <ArrowLeftIcon size={16} />
              {t.backHome}
            </Link>
            <Link
              to={ROUTES.PROJECTS.LIST}
              className="flex items-center gap-3 text-xl text-foreground underline underline-offset-4"
            >
              {t.viewProjects}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
