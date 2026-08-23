export const ROUTES = {
  HOME: "/",
  PROJECTS: {
    LIST: "/projects",
    DETAIL: "/projects/:slug",
  },
  LEARN: {
    LIST: "/learn",
    ARTICLE: "/learn/:slug",
  },
} as const;

export const SECTION_IDS = {
  ABOUT: "about",
  SERVICES: "services",
  PROJECTS: "projects",
  CONTACT: "contact",
} as const;

export const LEARN_TYPES = {
  BOOKS: "books",
  NOTES: "notes",
} as const;

export type LearnType = (typeof LEARN_TYPES)[keyof typeof LEARN_TYPES];

export const isLearnType = (value: string | null): value is LearnType =>
  value === LEARN_TYPES.BOOKS || value === LEARN_TYPES.NOTES;

export const getProjectPath = (slug: string) => `/projects/${slug}`;
export const getLearnPath = (slug: string) => `/learn/${slug}`;

export const getLearnListPath = (type?: LearnType) =>
  type ? `/learn?type=${type}` : ROUTES.LEARN.LIST;
