import { getLearnListPath, LEARN_TYPES, ROUTES, SECTION_IDS } from "./routes";

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

export type NavItem = AnchorNavItem | RouteNavItem;

export const NAV_ITEMS: NavItem[] = [
  { label: "About", kind: "anchor", href: `#${SECTION_IDS.ABOUT}` },
  { label: "Services", kind: "anchor", href: `#${SECTION_IDS.SERVICES}` },
  { label: "Projects", kind: "anchor", href: `#${SECTION_IDS.PROJECTS}` },
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
  { label: "Contact", kind: "anchor", href: `#${SECTION_IDS.CONTACT}` },
];

export const DEFAULT_LEARN_LIST_PATH = ROUTES.LEARN.LIST;
