import { getLearnListPath, LEARN_TYPES, ROUTES, WHATSAPP_URL } from "./routes";

type AnchorNavItem = {
  label: string;
  kind: "anchor";
  href: string;
  children?: never;
};

type RouteNavItem = {
  label: string;
  kind: "route";
  to: string;
  children?: RouteNavItem[];
};

type ExternalNavItem = {
  label: string;
  kind: "external";
  href: string;
};

export type NavItem = AnchorNavItem | RouteNavItem | ExternalNavItem;

export const NAV_ITEMS: NavItem[] = [
  { label: "About", kind: "route", to: ROUTES.ABOUT },
  { label: "Services", kind: "route", to: ROUTES.SERVICES },
  { label: "Projects", kind: "route", to: ROUTES.PROJECTS.LIST },
  {
    label: "Learn",
    kind: "route",
    to: ROUTES.LEARN.LIST,
    children: [
      {
        label: "Books",
        kind: "route",
        to: getLearnListPath(LEARN_TYPES.BOOKS),
      },
      {
        label: "Notes",
        kind: "route",
        to: getLearnListPath(LEARN_TYPES.NOTES),
      },
    ],
  },
  { label: "Contact", kind: "external", href: WHATSAPP_URL },
];

export const DEFAULT_LEARN_LIST_PATH = ROUTES.LEARN.LIST;
