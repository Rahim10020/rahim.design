import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "../../_components/ui/others/Markdown";
import ReadingProgress from "../../_components/ui/others/ReadingProgress";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  AsteriskIcon,
  OpenLinkIcon,
} from "../../_components/icons";
import { getProjectAsync, getProjects } from "../../lib/content";
import type { Project } from "../../lib/content";
import { getProjectPath, ROUTES } from "../../routes";
import { useLocale } from "../../lib/i18n";
import { getUi } from "../../locales/ui";

type ProjectEntry = { meta: Project; content: string };

export default function ProjectDetail() {
  const locale = useLocale();
  const t = getUi(locale).projectDetail;
  const { slug } = useParams();
  const [project, setProject] = useState<ProjectEntry | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    getProjectAsync(slug ?? "", locale).then((entry) => {
      if (!cancelled) setProject(entry ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [slug, locale]);

  if (project === undefined || (project && project.meta.slug !== slug)) {
    return (
      <div
        className="mx-auto max-w-3xl px-6 py-20"
        aria-busy="true"
        data-ready="pending"
      >
        <p className="text-xl text-foreground-alt">…</p>
      </div>
    );
  }

  if (!project) return <NotFound />;
  const projects = getProjects(locale);
  const currentIndex = projects.findIndex(
    ({ slug: projectSlug }) => projectSlug === project.meta.slug,
  );
  const previousProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <article className="mx-auto max-w-3xl px-6 py-20" data-ready="ready">
      <ReadingProgress label={t.readingProgress} />
      <header className="mx-auto mb-10 max-w-xl">
        <Link
          to={ROUTES.PROJECTS.LIST}
          className="mb-8 flex items-center gap-3 text-xl underline underline-offset-4"
        >
          <ArrowLeftIcon size={16} />
          {t.back}
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="text-foreground text-4xl md:text-6xl">
            {project.meta.title}
          </h1>
          {project.meta.link && (
            <a
              href={project.meta.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.meta.title}`}
              className="group"
            >
              <OpenLinkIcon
                strokeWidth={1.5}
                className="text-foreground-alt-a group-hover:text-foreground transition-colors duration-200"
              />
            </a>
          )}
        </div>
        <p className="mt-4 text-xl leading-relaxed text-foreground-alt">
          {project.meta.description}
        </p>
      </header>
      <Markdown content={project.content} />
      <nav
        aria-label="Project navigation"
        className="mx-auto mt-16 flex max-w-3xl items-center justify-between gap-6 text-xl underline underline-offset-4"
      >
        {previousProject ? (
          <Link
            to={getProjectPath(previousProject.slug)}
            className="flex items-center gap-3 text-foreground hover:text-foreground-alt transition-colors duration-200"
          >
            <ArrowLeftIcon size={16} />
            {t.recent}
          </Link>
        ) : (
          <span />
        )}
        {nextProject && (
          <Link
            to={getProjectPath(nextProject.slug)}
            className="flex items-center gap-3 text-foreground hover:text-foreground-alt transition-colors duration-200"
          >
            {t.next}
            <ArrowRightIcon size={16} />
          </Link>
        )}
      </nav>
    </article>
  );
}

function NotFound() {
  const t = getUi(useLocale()).projectDetail;
  return (
    <div className="mx-auto max-w-6xl px-6 py-20" data-ready="not-found">
      <div className="flex items-center justify-center py-48">
        <div>
          <div className="flex flex-col items-center gap-12">
            <AsteriskIcon size={54} />
            <h4 className="text-xl font-normal text-foreground">
              {t.notFound}
            </h4>
          </div>
          <Link
            to={ROUTES.PROJECTS.LIST}
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
