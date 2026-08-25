import { useState } from "react";
import AllProjectCard from "../../_components/ui/AllProjectCard";
import {
  getProjectCategories,
  getProjectsByFilter,
  type ProjectFilter,
} from "../../data/project";
import { getProjectPath } from "../../routes";

const filters: ReadonlyArray<{ label: string; value: ProjectFilter }> = [
  { label: "All", value: "all" },
  ...getProjectCategories().map((category) => ({
    label: category,
    value: category,
  })),
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const filteredProjects = getProjectsByFilter(activeFilter);

  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* Title */}
          <h1 className="text-foreground text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight mb-10">
            Projects.
          </h1>

          {/* Filters */}
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap gap-3 mb-14">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.value;

                return (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`
                  px-5 py-2.5 text-lg md:text-xl font-medium cursor-pointer border-2 border-foreground transition-colors
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
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 gap-6">
            {filteredProjects.map((project) => (
              <AllProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                category={project.category}
                imageSrc={project.imageSrc}
                href={getProjectPath(project.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
