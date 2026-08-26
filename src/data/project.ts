import {
  getProjects,
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "../lib/content";

export { PROJECT_CATEGORIES, type Project, type ProjectCategory };
export type ProjectFilter = "all" | ProjectCategory;
export const projects = getProjects();

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
