import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import MarkdownLite from "./markdownLite";
import { getProject } from "../../../lib/content";

const render = (content: string) => renderToStaticMarkup(<MarkdownLite content={content} />);

describe("markdownLite", () => {
  it("rend les titres, paragraphes, gras et listes", () => {
    const html = render(
      "## The context\n\n**It all starts with a problem.**\n\n- **One platform.** Same language.\n- Second item.\n",
    );
    expect(html).toContain("<h2");
    expect(html).toContain("The context");
    expect(html).toContain("<strong");
    expect(html).toContain("<ul");
    expect(html).toContain("One platform.");
  });

  it("rend les listes ordonnées, citations et tables GFM", () => {
    const html = render(
      "1. Make it obvious.\n2. Make it attractive.\n\n> A quote\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n",
    );
    expect(html).toContain("<ol");
    expect(html).toContain("<blockquote");
    expect(html).toContain("<table");
    expect(html).toContain("<th");
    expect(html).toContain("<td");
  });

  it("rend les liens externes avec target blank et l'italique", () => {
    const html = render(
      "See [github](https://github.com/x) and _italic_ text.\n",
    );
    expect(html).toContain('target="_blank"');
    expect(html).toContain("<em>");
  });

  it("rend la grille media-grid raw HTML en MediaGrid", () => {
    const html = render(
      '<div class="media-grid cols-2">\n  <img class="grid-cell" src="/a.webp" alt="A" loading="lazy" />\n  <img class="grid-cell" src="/b.webp" alt="B" loading="lazy" />\n</div>\n',
    );
    expect(html).toContain("grid-cols-2");
    expect(html).toContain('src="/a.webp"');
    expect(html).toContain('src="/b.webp"');
  });

  it("met le premier média en eager/fetchPriority high (candidat LCP)", () => {
    const html = render(
      "![First](/first.webp)\n\nSome text.\n\n![Second](/second.webp)\n",
    );
    expect(html).toContain('src="/first.webp"');
    expect(html).toContain('fetchPriority="high"');
    expect(html).toContain('src="/second.webp"');
    expect(html).toContain('loading="lazy"');
  });

  it("rend chaque contenu réel sans crash (projets + articles)", async () => {
    const { getProjects, getLearnArticles, getLearnArticle } = await import(
      "../../../lib/content"
    );
    const bodies: string[] = [];
    for (const p of getProjects("fr")) {
      const entry = getProject(p.slug, "fr");
      if (entry) bodies.push(entry.content);
    }
    for (const a of getLearnArticles("fr")) {
      const entry = getLearnArticle(a.slug, "fr");
      if (entry) bodies.push(entry.content);
    }
    expect(bodies.length).toBeGreaterThan(10);
    for (const body of bodies) {
      const html = render(body);
      // chaque page détail produit un article non vide
      expect(html.length).toBeGreaterThan(200);
      expect(html).not.toContain("undefined");
    }
  });
});
