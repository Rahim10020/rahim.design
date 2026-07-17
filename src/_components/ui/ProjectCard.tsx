import { Link } from 'react-router-dom';
import type { Project } from '../../data/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block rounded-lg border border-black/10 p-4 transition hover:border-black/30"
    >
      <div className="aspect-video w-full rounded bg-background-alt" />
      <h3 className="mt-4 text-lg font-semibold group-hover:underline">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-foreground/70">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="rounded-full bg-foreground/5 px-2 py-0.5 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
