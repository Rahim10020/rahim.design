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

export const getProjectPath = (slug: string) => `/projects/${slug}`;
export const getLearnPath = (slug: string) => `/learn/${slug}`;
