import {
  getProjects as getProjectsFromContent,
  getProject as getProjectFromContent,
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "../lib/content";
import type { SupportedLocale } from "../lib/locale";

export { PROJECT_CATEGORIES, type Project, type ProjectCategory };
export type ProjectFilter = "all" | ProjectCategory;

export function getProjects(locale: SupportedLocale = "fr") {
  return getProjectsFromContent(locale);
}

export function getProjectsByFilter(
  filter: ProjectFilter,
  locale: SupportedLocale = "fr",
) {
  const projects = getProjectsFromContent(locale);
  if (filter === "all") {
    return projects;
  }

  return projects.filter((project) => project.category === filter);
}

export function getProjectBySlug(slug: string, locale: SupportedLocale = "fr") {
  return getProjectFromContent(slug, locale);
}

// Compatibilité : valeur par défaut FR pour les imports statiques restants
export const projects = getProjectsFromContent("fr");

export function getProjectCategories(): ProjectCategory[] {
  return [...PROJECT_CATEGORIES];
}
