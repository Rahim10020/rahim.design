import type { NavItem } from "../../../navigation";

export function isNavItemActive(
  item: NavItem,
  pathname: string,
  hash: string,
): boolean {
  if (item.kind === "route") {
    if (item.children) {
      return item.children.some(
        (child) => pathname === child.to || pathname.startsWith(`${child.to}/`),
      );
    }
    return pathname === item.to || pathname.startsWith(`${item.to}/`);
  }

  if (item.kind === "external") {
    return false;
  }

  const targetHash = item.href.replace(/^#/, "");
  return pathname === "/" && hash === `#${targetHash}`;
}

export function isAnchorSectionActive(
  href: string,
  pathname: string,
  hash: string,
): boolean {
  const sectionId = href.replace(/^#/, "");
  return pathname === "/" && hash === `#${sectionId}`;
}
