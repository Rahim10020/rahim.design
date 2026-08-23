import { Link } from "react-router-dom";
import ProjectCard from "../../_components/ui/ProjectCard";
import { ROUTES, getProjectPath } from "../../routes";
import { projects } from "../../data/project";

export default function ProjectsList() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-foreground/50">
            {ROUTES.PROJECTS.LIST}
          </p>
          <h1 className="mt-3 text-4xl font-medium">Projects</h1>
        </div>
        <Link to={ROUTES.HOME} className="underline underline-offset-4">
          Back home
        </Link>
      </div>

      <div className="flex flex-wrap gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            category={project.category}
            href={getProjectPath(project.slug)}
            imageHeight={project.imageHeight}
            imageSrc={project.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
