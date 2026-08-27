import { Link, useParams } from "react-router-dom";
import Markdown from "../../_components/ui/others/Markdown";
import ContentImages from "../../_components/ui/others/ContentImages";
import {
  ArrowLeftIcon,
  AsteriskIcon,
  OpenLinkIcon,
} from "../../_components/icons";
import { getProject } from "../../lib/content";
import { ROUTES } from "../../routes";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug ?? "");
  if (!project) return <NotFound />;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="mx-auto mb-10 max-w-xl">
        <Link
          to={ROUTES.PROJECTS.LIST}
          className="mb-8 flex items-center gap-3 text-xl underline underline-offset-4"
        >
          <ArrowLeftIcon size={16} />
          Back to projects
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
            >
              <OpenLinkIcon />
            </a>
          )}
        </div>
        <p className="mt-4 text-xl leading-relaxed text-foreground-alt">
          {project.meta.description}
        </p>
      </header>
      <ContentImages
        primaryImage={project.meta.imageSrc}
        images={[]}
        alt={project.meta.title}
      />
      <Markdown content={project.content} />
      <ContentImages images={project.meta.images} alt={project.meta.title} />
    </article>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-center justify-center py-48">
        <div>
          <div className="flex flex-col items-center gap-12">
            <AsteriskIcon size={54} />
            <h4 className="text-xl font-normal text-foreground">
              Project not found.
            </h4>
          </div>
          <Link
            to={ROUTES.PROJECTS.LIST}
            className="mt-8 flex items-center gap-4 text-xl text-foreground underline underline-offset-4"
          >
            <ArrowLeftIcon size={16} />
            Back to projects
          </Link>
        </div>
      </div>
    </div>
  );
}
