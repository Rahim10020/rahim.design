import { useState } from "react";
import AllProjectCard from "../../_components/ui/AllProjectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  category: "project" | "design";
  imageSrc?: string;
  href: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Lovance",
    description: "E-commerce platform focused on clean product discovery.",
    category: "project",
    href: "/projects/lovance",
  },
  {
    id: 2,
    title: "Twocoderz",
    description: "SaaS dashboard for developer collaboration.",
    category: "project",
    href: "/projects/twocoderz",
  },
  {
    id: 3,
    title: "Ahoe",
    description: "Mobile-first brand experience.",
    category: "design",
    href: "/projects/ahoe",
  },
  {
    id: 4,
    title: "Nova Studio",
    description: "Agency website with strong visual identity.",
    category: "project",
    href: "/projects/nova-studio",
  },
  {
    id: 5,
    title: "Pulse Analytics",
    description: "Data visualization and reporting interface.",
    category: "project",
    href: "/projects/pulse",
  },
  {
    id: 6,
    title: "Forma",
    description: "Design system and component library.",
    category: "design",
    href: "/projects/forma",
  },
  {
    id: 7,
    title: "Kinetic",
    description: "Portfolio for a motion design studio.",
    category: "design",
    href: "/projects/kinetic",
  },
  {
    id: 8,
    title: "Harbor",
    description: "Fintech landing page with clear hierarchy.",
    category: "project",
    href: "/projects/harbor",
  },
  {
    id: 9,
    title: "Atelier",
    description: "Editorial website for a creative collective.",
    category: "design",
    href: "/projects/atelier",
  },
  {
    id: 10,
    title: "Orbit",
    description: "Product marketing site with interactive sections.",
    category: "project",
    href: "/projects/orbit",
  },
];

type Filter = "all" | "project" | "design";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Projects", value: "project" },
    { label: "Designs", value: "design" },
  ];

  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24">
        {/* Title */}
        <h1 className="text-foreground text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight mb-10">
          Projects.
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-14">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`
                  px-5 py-2.5 text-sm font-medium cursor-pointer border-2 border-foreground transition-colors
                  ${
                    isActive
                      ? "bg-primary text-foreground"
                      : "bg-transparent text-foreground hover:bg-background"
                  }
                `}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 gap-6">
          {filteredProjects.map((project) => (
            <AllProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              category={project.category}
              imageSrc={project.imageSrc}
              href={project.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
