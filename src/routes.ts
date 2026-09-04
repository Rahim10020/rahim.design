export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  PROJECTS: {
    LIST: "/projects",
    DETAIL: "/projects/:slug",
  },
  LEARN: {
    LIST: "/learn",
    ARTICLE: "/learn/:slug",
  },
} as const;

export const WHATSAPP_URL = "https://wa.me/PLACEHOLDER";

export const GITHUB_URL = "https://github.com/Rahim10020";
export const LINKEDIN_URL = "http://www.linkedin.com/in/rahim-ali-a6003226b";
export const INSTAGRAM_URL = "https://instagram.com/rahim.aldev";

export const LEARN_TYPES = {
  BOOKS: "books",
  NOTES: "notes",
} as const;

export type LearnType = (typeof LEARN_TYPES)[keyof typeof LEARN_TYPES];

export const isLearnType = (value: string | null): value is LearnType =>
  value === LEARN_TYPES.BOOKS || value === LEARN_TYPES.NOTES;

export const getProjectPath = (slug: string) => `/projects/${slug}`;
export const getLearnPath = (slug: string) => `/learn/${slug}`;
export const getAboutPath = () => ROUTES.ABOUT;
export const getServicesPath = () => ROUTES.SERVICES;

export const getLearnListPath = (type?: LearnType) =>
  type ? `/learn?type=${type}` : ROUTES.LEARN.LIST;
