import { getLearnListPath, LEARN_TYPES, ROUTES } from "./routes";
import type { SupportedLocale } from "./lib/locale";
import { getUi } from "./locales/ui";

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
  { label: "Contact", kind: "route", to: ROUTES.CONTACT },
];

export const DEFAULT_LEARN_LIST_PATH = ROUTES.LEARN.LIST;

export function getNavItems(locale: SupportedLocale): NavItem[] {
  const t = getUi(locale).nav;
  return [
    { label: t.about, kind: "route", to: ROUTES.ABOUT },
    { label: t.services, kind: "route", to: ROUTES.SERVICES },
    { label: t.projects, kind: "route", to: ROUTES.PROJECTS.LIST },
    {
      label: t.learn,
      kind: "route",
      to: ROUTES.LEARN.LIST,
      children: [
        {
          label: t.books,
          kind: "route",
          to: getLearnListPath(LEARN_TYPES.BOOKS),
        },
        {
          label: t.notes,
          kind: "route",
          to: getLearnListPath(LEARN_TYPES.NOTES),
        },
      ],
    },
    { label: t.contact, kind: "route", to: ROUTES.CONTACT },
  ];
}
