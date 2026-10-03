import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "./frontmatter";

describe("parseFrontmatter", () => {
  it("retourne un contenu sans frontmatter tel quel", () => {
    const raw = "# Hello\nDu texte.";
    const { data, content } = parseFrontmatter(raw);
    expect(data).toEqual({});
    expect(content).toBe(raw);
  });

  it("parse les strings, nombres, booléens, null et tableaux", () => {
    const raw = `---
title: Focusly
order: 2
published: true
draft: false
gone: null
tags: [Web, "Mobile, avancé", 'Design']
---
Contenu.`;
    const { data, content } = parseFrontmatter(raw);
    expect(data.title).toBe("Focusly");
    expect(data.order).toBe(2);
    expect(data.published).toBe(true);
    expect(data.draft).toBe(false);
    expect(data.gone).toBeNull();
    expect(data.tags).toEqual(["Web", "Mobile, avancé", "Design"]);
    expect(content).toBe("Contenu.");
  });

  it("ignore les commentaires et les lignes vides", () => {
    const raw = `---
# commentaire global
title: Note # pas un commentaire dans unquoted? # coupe ici
---
Texte.`;
    const { data } = parseFrontmatter(raw);
    expect(data.title).toBe("Note");
  });

  it("rejette un délimiteur de fermeture manquant", () => {
    expect(() =>
      parseFrontmatter("---\ntitle: x\npas de fin"),
    ).toThrow(/missing closing ---/);
  });

  it("rejette une ligne sans séparateur et une clé dupliquée", () => {
    expect(() => parseFrontmatter("---\ntitle x\n---\n")).toThrow(
      /expected key: value/,
    );
    expect(() =>
      parseFrontmatter("---\ntitle: a\ntitle: b\n---\n"),
    ).toThrow(/duplicate key "title"/);
  });
});
