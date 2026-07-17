export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    slug: 'projet-alpha',
    title: 'Projet Alpha',
    description: 'Une application web de suivi de productivité personnelle.',
    tags: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    slug: 'projet-beta',
    title: 'Projet Beta',
    description: 'Site vitrine pour une marque de mode éthique.',
    tags: ['Astro', 'Tailwind', 'CMS'],
  },
  {
    slug: 'projet-gamma',
    title: 'Projet Gamma',
    description: 'Dashboard interactif pour données financières.',
    tags: ['Next.js', 'D3.js', 'API'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
