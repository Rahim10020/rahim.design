import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getArticleBySlug } from "../data/articles";
import { getProjectBySlug } from "../data/project";
import { useLocale } from "../lib/i18n";
import { getUi } from "../locales/ui";
import type { SupportedLocale } from "../lib/locale";
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from "../routes";

const OG_IMAGE_PATH = "/images/og-image.png";
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";

/**
 * Production site URL comes from VITE_SITE_URL. In development (variable
 * absent), fall back to the current origin so og:image / og:url stay absolute.
 */
function getSiteUrl(): string | undefined {
  const fromEnv = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/$/, "");
  }
  return undefined;
}

type PageMetadata = {
  title: string;
  description: string;
};

function getMetadata(pathname: string, locale: SupportedLocale): PageMetadata {
  const t = getUi(locale).seo;
  if (pathname === "/") {
    return {
      title: t.defaultTitle,
      description: t.defaultDescription,
    };
  }

  if (pathname === "/about") {
    return {
      title: t.aboutTitle,
      description: t.aboutDescription,
    };
  }

  if (pathname === "/services") {
    return {
      title: t.servicesTitle,
      description: t.servicesDescription,
    };
  }

  if (pathname === "/contact") {
    return {
      title: t.contactTitle,
      description: t.contactDescription,
    };
  }

  if (pathname === "/projects") {
    return {
      title: t.projectsTitle,
      description: t.projectsDescription,
    };
  }

  if (pathname === "/learn") {
    return {
      title: t.learnTitle,
      description: t.learnDescription,
    };
  }

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const project = getProjectBySlug(projectMatch[1], locale);
    if (project) {
      return {
        title: `${project.meta.title} | Rahim ALI`,
        description: project.meta.description,
      };
    }
    // Slug projet inexistant -> vraie 404 globale
    return {
      title: t.notFoundTitle,
      description: t.notFoundDescription,
    };
  }

  const articleMatch = pathname.match(/^\/learn\/([^/]+)$/);
  if (articleMatch) {
    const article = getArticleBySlug(articleMatch[1], locale);
    if (article) {
      return {
        title: `${article.meta.title} | Rahim ALI`,
        description: article.meta.description,
      };
    }
    // Slug learn inexistant -> vraie 404 globale
    return {
      title: t.notFoundTitle,
      description: t.notFoundDescription,
    };
  }

  // Route inconnue -> 404 globale (route "*" du router)
  return {
    title: t.notFoundTitle,
    description: t.notFoundDescription,
  };
}

function setMetaTag(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setLinkTag(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.appendChild(element);
  }

  element.href = href;
}

function setJsonLd(id: string, data: Record<string, unknown>) {
  let element = document.head.querySelector<HTMLScriptElement>(
    `script[data-jsonld="${id}"]`,
  );

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.setAttribute("data-jsonld", id);
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

export default function SEO() {
  const { pathname } = useLocation();
  const locale = useLocale();

  useEffect(() => {
    const { title, description } = getMetadata(pathname, locale);
    const t = getUi(locale).seo;
    const isNotFound = title === t.notFoundTitle;
    const siteUrl = getSiteUrl();
    const canonicalUrl = siteUrl ? `${siteUrl}${pathname}` : undefined;
    const ogImageUrl = siteUrl ? `${siteUrl}${OG_IMAGE_PATH}` : undefined;

    document.title = title;
    setMetaTag("name", "description", description);
    // Évite d'indexer les 404 dans Google
    setMetaTag("name", "robots", isNotFound ? "noindex" : "index, follow");
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", "Rahim ALI");
    setMetaTag("property", "og:locale", locale === "fr" ? "fr_FR" : "en_US");
    setMetaTag(
      "property",
      "og:locale:alternate",
      locale === "fr" ? "en_US" : "fr_FR",
    );

    if (canonicalUrl) {
      setMetaTag("property", "og:url", canonicalUrl);
    }

    if (ogImageUrl) {
      setMetaTag("property", "og:image", ogImageUrl);
      setMetaTag("property", "og:image:width", OG_IMAGE_WIDTH);
      setMetaTag("property", "og:image:height", OG_IMAGE_HEIGHT);
      setMetaTag("property", "og:image:alt", title);
    }

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);

    if (ogImageUrl) {
      setMetaTag("name", "twitter:image", ogImageUrl);
      setMetaTag("name", "twitter:image:alt", title);
    }

    const existingCanonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (canonicalUrl) {
      const canonical = existingCanonical ?? document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = canonicalUrl;
      if (!existingCanonical) document.head.appendChild(canonical);

      // hreflang FR/EN + x-default (?lang=… car SPA sans routes localisées)
      setLinkTag("alternate", `${canonicalUrl}?lang=fr`, "fr");
      setLinkTag("alternate", `${canonicalUrl}?lang=en`, "en");
      setLinkTag("alternate", canonicalUrl, "x-default");
    } else if (existingCanonical) {
      existingCanonical.remove();
    }

    if (siteUrl) {
      setJsonLd("person", {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Rahim ALI",
        jobTitle: "Web Developer & UX/UI Designer",
        url: siteUrl,
        homeLocation: {
          "@type": "Place",
          name: "Lomé, Togo",
        },
        sameAs: [GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL],
      });
    }
  }, [pathname, locale]);

  return null;
}
