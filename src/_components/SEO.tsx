import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getArticleBySlug } from "../data/articles";
import { getProjectBySlug } from "../data/project";

const DEFAULT_TITLE = "Rahim ALI | Web Developer & UX/UI Designer";
const DEFAULT_DESCRIPTION =
  "Rahim ALI is a web developer and UX/UI designer based in Lome, Togo, helping turn ideas into useful digital products.";
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

function getMetadata(pathname: string): PageMetadata {
  if (pathname === "/about") {
    return {
      title: "About | Rahim ALI",
      description:
        "Discover Rahim ALI's approach to UX/UI design, frontend development, and digital products.",
    };
  }

  if (pathname === "/services") {
    return {
      title: "Services | Rahim ALI",
      description:
        "UX/UI design, frontend development, and product improvement services by Rahim ALI.",
    };
  }

  if (pathname === "/projects") {
    return {
      title: "Projects | Rahim ALI",
      description:
        "Selected UX/UI design and frontend development projects by Rahim ALI.",
    };
  }

  if (pathname === "/learn") {
    return {
      title: "Learn | Rahim ALI",
      description:
        "Books, notes, and ideas about design, development, and building better products.",
    };
  }

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const project = getProjectBySlug(projectMatch[1]);
    return {
      title: project ? `${project.title} | Rahim ALI` : DEFAULT_TITLE,
      description: project?.description ?? DEFAULT_DESCRIPTION,
    };
  }

  const articleMatch = pathname.match(/^\/learn\/([^/]+)$/);
  if (articleMatch) {
    const article = getArticleBySlug(articleMatch[1]);
    return {
      title: article ? `${article.title} | Rahim ALI` : DEFAULT_TITLE,
      description: article?.description ?? DEFAULT_DESCRIPTION,
    };
  }

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = getMetadata(pathname);
    const siteUrl = getSiteUrl();
    const canonicalUrl = siteUrl ? `${siteUrl}${pathname}` : undefined;
    const ogImageUrl = siteUrl ? `${siteUrl}${OG_IMAGE_PATH}` : undefined;

    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", "Rahim ALI");

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
    } else if (existingCanonical) {
      existingCanonical.remove();
    }
  }, [pathname]);

  return null;
}
