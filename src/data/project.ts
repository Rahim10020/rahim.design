export const PROJECT_CATEGORIES = ["Web", "Mobile", "Design"] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectFilter = "all" | ProjectCategory;

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  imageHeight: string;
  imageSrc?: string;
}

export const projects: Project[] = [
  {
    slug: "lovance",
    title: "Lovance",
    category: "Web",
    description:
      "An e-commerce platform focused on clean product discovery and smooth checkout flow.",
    tags: ["React", "TypeScript", "Tailwind"],
    imageHeight: "h-96",
  },
  {
    slug: "twocoderz",
    title: "Twocoderz",
    category: "Web",
    description:
      "A SaaS dashboard designed for collaboration with a conversion-first structure.",
    tags: ["Astro", "Tailwind", "CMS"],
    imageHeight: "h-64",
  },
  {
    slug: "ahoe",
    title: "Ahoe",
    category: "Mobile",
    description:
      "A mobile-first brand experience focused on readability and quick actions.",
    tags: ["Next.js", "D3.js", "API"],
    imageHeight: "h-80",
  },
  {
    slug: "nova-studio",
    title: "Nova Studio",
    category: "Web",
    description:
      "An agency website with a strong visual identity and clear service storytelling.",
    tags: ["React", "Framer Motion", "Tailwind"],
    imageHeight: "h-72",
  },
  {
    slug: "pulse",
    title: "Pulse Analytics",
    category: "Web",
    description:
      "A data visualization interface that prioritizes key metrics without noise.",
    tags: ["React", "Charts", "API"],
    imageHeight: "h-96",
  },
  {
    slug: "forma",
    title: "Forma",
    category: "Design",
    description:
      "A design system and component library built for consistency and faster iteration.",
    tags: ["Design System", "Tokens", "Accessibility"],
    imageHeight: "h-64",
  },
  {
    slug: "kinetic",
    title: "Kinetic",
    category: "Design",
    description:
      "A portfolio website for a motion design studio with strong rhythm and narrative.",
    tags: ["React", "Motion", "Storytelling"],
    imageHeight: "h-80",
  },
  {
    slug: "harbor",
    title: "Harbor",
    category: "Design",
    description:
      "A fintech landing page with a sharp hierarchy and trust-focused messaging.",
    tags: ["React", "Fintech", "Conversion"],
    imageHeight: "h-72",
  },
  {
    slug: "atelier",
    title: "Atelier",
    category: "Web",
    description:
      "An editorial website for a creative collective with immersive reading flow.",
    tags: ["Editorial", "Typography", "Content"],
    imageHeight: "h-96",
  },
  {
    slug: "orbit",
    title: "Orbit",
    category: "Design",
    description:
      "A product marketing site with interactive storytelling sections.",
    tags: ["Marketing", "Interaction", "Product"],
    imageHeight: "h-64",
  },
];

export function getProjectCategories(): ProjectCategory[] {
  return [...PROJECT_CATEGORIES];
}

export function getProjectsByFilter(filter: ProjectFilter): Project[] {
  if (filter === "all") {
    return projects;
  }

  return projects.filter((project) => project.category === filter);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
