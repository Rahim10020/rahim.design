import { describe, expect, it } from "vitest";
import {
  LEARN_TYPES,
  ROUTES,
  getLearnListPath,
  getLearnPath,
  getProjectPath,
  isLearnType,
} from "./routes";

describe("routes", () => {
  it("construit les chemins projets et articles", () => {
    expect(getProjectPath("focusly")).toBe("/projects/focusly");
    expect(getLearnPath("atomic-habits")).toBe("/learn/atomic-habits");
  });

  it("construit la liste learn avec ou sans filtre", () => {
    expect(getLearnListPath()).toBe(ROUTES.LEARN.LIST);
    expect(getLearnListPath(LEARN_TYPES.BOOKS)).toBe("/learn?type=books");
    expect(getLearnListPath(LEARN_TYPES.NOTES)).toBe("/learn?type=notes");
  });

  it("valide les types learn", () => {
    expect(isLearnType("books")).toBe(true);
    expect(isLearnType("notes")).toBe(true);
    expect(isLearnType("videos")).toBe(false);
    expect(isLearnType(null)).toBe(false);
  });
});
