import { Link } from "react-router-dom";
import { ArrowLeftIcon, AsteriskIcon } from "../_components/icons";
import { ROUTES } from "../routes";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-center justify-center py-32 md:py-48">
        <div className="text-center">
          <p className="text-xl text-foreground-alt">404</p>
          <div className="mt-6 flex flex-col items-center gap-8">
            <AsteriskIcon size={54} />
            <h1 className="text-4xl text-foreground md:text-6xl">
              Page not found.
            </h1>
            <p className="max-w-md text-xl leading-relaxed text-foreground-alt">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-3 text-xl text-foreground underline underline-offset-4"
            >
              <ArrowLeftIcon size={16} />
              Back to home
            </Link>
            <Link
              to={ROUTES.PROJECTS.LIST}
              className="flex items-center gap-3 text-xl text-foreground underline underline-offset-4"
            >
              View projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
