import { describe, expect, it } from "vitest";
import type { NavItem } from "../../../navigation";
import { isAnchorSectionActive, isNavItemActive } from "./navActive";

const route: NavItem = { label: "About", kind: "route", to: "/about" };
const parent: NavItem = {
  label: "Learn",
  kind: "route",
  to: "/learn",
  children: [
    { label: "Books", kind: "route", to: "/learn?type=books" },
    { label: "Notes", kind: "route", to: "/learn?type=notes" },
  ],
};
const anchor: NavItem = { label: "Services", kind: "anchor", href: "#services" };
const external: NavItem = {
  label: "GitHub",
  kind: "external",
  href: "https://github.com",
};

describe("navActive", () => {
  it("active une route exacte et ses sous-pages", () => {
    expect(isNavItemActive(route, "/about", "")).toBe(true);
    expect(isNavItemActive(route, "/about/team", "")).toBe(true);
    expect(isNavItemActive(route, "/contact", "")).toBe(false);
  });

  it("active un parent si un enfant matche", () => {
    expect(isNavItemActive(parent, "/learn?type=books", "")).toBe(true);
    expect(isNavItemActive(parent, "/about", "")).toBe(false);
  });

  it("n'active jamais un lien externe", () => {
    expect(isNavItemActive(external, "/about", "")).toBe(false);
  });

  it("n'active une ancre que sur la home avec le bon hash", () => {
    expect(isAnchorSectionActive("#services", "/", "#services")).toBe(true);
    expect(isAnchorSectionActive("#services", "/", "#contact")).toBe(false);
    expect(isAnchorSectionActive("#services", "/about", "#services")).toBe(
      false,
    );
    expect(isNavItemActive(anchor, "/", "#services")).toBe(true);
    expect(isNavItemActive(anchor, "/about", "#services")).toBe(false);
  });
});
