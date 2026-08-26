import { useParams, Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import { getProjectBySlug } from "../../data/project";
import { AddIcon } from "../../_components/icons";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug || "");

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p>Project not found.</p>
        <Link
          to={ROUTES.PROJECTS.LIST}
          className="mt-4 inline-block underline underline-offset-4"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      {/* Detail header */}
      <div className="flex items-center justify-between mb-8">
        <a
          href="#"
          className="underline cursor-pointer text-foreground text-xl"
        >
          Close
        </a>
        {/* icons */}
        <div className="flex items-center justify-between gap-6">
          <AddIcon />
          <AddIcon />
        </div>
      </div>
      {/* Content */}
      <div></div>
    </div>
  );
}
