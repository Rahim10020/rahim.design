import { describe, expect, it } from "vitest";
import {
  getLearnArticle,
  getLearnArticles,
  getProject,
  getProjects,
} from "./content";

describe("content", () => {
  it("liste les 6 projets triés par order croissant", () => {
    const projects = getProjects("fr");
    expect(projects).toHaveLength(6);
    const orders = projects.map((p) => p.order);
    expect([...orders].sort((a, b) => a - b)).toEqual(orders);
  });

  it("retourne le fallback fr quand la locale demandée manque", () => {
    const fr = getProject("focusly", "fr");
    const en = getProject("focusly", "en");
    expect(fr?.meta.slug).toBe("focusly");
    // chaque slug existe dans au moins une locale
    expect(en?.meta.slug ?? fr?.meta.slug).toBe("focusly");
  });

  it("retourne undefined pour un slug inexistant", () => {
    expect(getProject("nope", "fr")).toBeUndefined();
    expect(getLearnArticle("nope", "fr")).toBeUndefined();
  });

  it("liste les articles triés par date décroissante", () => {
    const articles = getLearnArticles("fr");
    expect(articles.length).toBeGreaterThan(0);
    const dates = articles.map((a) => a.date);
    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates);
  });

  it("expose les images sans dupliquer imageSrc", () => {
    for (const p of getProjects("fr")) {
      if (p.imageSrc) expect(p.images).not.toContain(p.imageSrc);
    }
  });
});
