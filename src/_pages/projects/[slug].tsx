import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../../data/project';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug || '');

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p>Projet non trouvé.</p>
        <Link to="/projects" className="mt-4 inline-block underline underline-offset-4">
          ← Retour aux projets
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Link to="/projects" className="text-sm underline underline-offset-4">
        ← Retour aux projets
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-4 text-lg text-foreground/70">{project.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-10 aspect-video w-full rounded bg-background-alt" />
    </div>
  );
}
