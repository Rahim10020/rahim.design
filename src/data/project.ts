export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageHeight: string;
  imageSrc?: string;
}

export const projects: Project[] = [
  {
    slug: "lovance",
    title: "Lovance",
    category: "E-commerce",
    description:
      "Une boutique pensée pour transformer une vitrine éditoriale en parcours d'achat fluide.",
    tags: ["React", "TypeScript", "Tailwind"],
    imageHeight: "h-96",
  },
  {
    slug: "twocoderz",
    title: "Twocoderz",
    category: "SaaS Platform",
    description:
      "Une interface SaaS orientée conversion avec un cockpit produit simple à faire évoluer.",
    tags: ["Astro", "Tailwind", "CMS"],
    imageHeight: "h-64",
  },
  {
    slug: "ahoe",
    title: "Ahoe",
    category: "Mobile App",
    description:
      "Une expérience mobile centrée sur la lisibilité et les actions rapides.",
    tags: ["Next.js", "D3.js", "API"],
    imageHeight: "h-80",
  },
  {
    slug: "nova-studio",
    title: "Nova Studio",
    category: "Agency Website",
    description:
      "Un site vitrine structuré pour présenter une offre et ses preuves de façon nette.",
    tags: ["React", "Framer Motion", "Tailwind"],
    imageHeight: "h-72",
  },
  {
    slug: "pulse",
    title: "Pulse Analytics",
    category: "Dashboard",
    description:
      "Un tableau de bord qui hiérarchise les signaux clés sans surcharger l'écran.",
    tags: ["React", "Charts", "API"],
    imageHeight: "h-96",
  },
  {
    slug: "forma",
    title: "Forma",
    category: "Design System",
    description:
      "Un système de composants pensé pour normaliser les interfaces et accélérer les itérations.",
    tags: ["Design System", "Tokens", "Accessibility"],
    imageHeight: "h-64",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
