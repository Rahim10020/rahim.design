import { afterEach, describe, expect, it, vi } from "vitest";
import { detectLocale } from "./locale";

function stubEnv({
  url = "/",
  stored = null,
  languages = ["fr-FR"],
}: {
  url?: string;
  stored?: string | null;
  languages?: string[];
} = {}) {
  const store = new Map<string, string>();
  if (stored) store.set("rahim-locale", stored);
  vi.stubGlobal("window", { location: { search: new URLSearchParams(url.split("?")[1] ?? "").toString() ? `?${url.split("?")[1]}` : "" } });
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => {
      store.set(k, v);
    },
  });
  vi.stubGlobal("navigator", { languages, language: languages[0] });
  return store;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("detectLocale", () => {
  it("priorise ?lang= dans l'URL", () => {
    stubEnv({ url: "/?lang=en", stored: "fr", languages: ["fr-FR"] });
    expect(detectLocale()).toBe("en");
  });

  it("utilise le localStorage puis le navigateur", () => {
    stubEnv({ stored: "en", languages: ["fr-FR"] });
    expect(detectLocale()).toBe("en");

    stubEnv({ stored: null, languages: ["en-US"] });
    expect(detectLocale()).toBe("en");
  });

  it("retombe sur fr par défaut", () => {
    stubEnv({ stored: null, languages: ["de-DE"] });
    expect(detectLocale()).toBe("fr");
  });
});
