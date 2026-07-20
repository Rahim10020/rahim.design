export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PROJECTS: {
    LIST: '/projects',
    DETAIL: '/projects/:slug',
  },
  LEARN: {
    LIST: '/learn',
    ARTICLE: '/learn/:slug',
  },
} as const;

export const getProjectPath = (slug: string) => `/projects/${slug}`;
export const getLearnPath = (slug: string) => `/learn/${slug}`;
