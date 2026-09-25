import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getArticleBySlug } from "../data/articles";
import { getProjectBySlug } from "../data/project";

const DEFAULT_TITLE = "Rahim ALI | Web Developer & UX/UI Designer";
const DEFAULT_DESCRIPTION =
  "Rahim ALI is a web developer and UX/UI designer based in Lome, Togo, helping turn ideas into useful digital products.";
const SITE_URL = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");

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
    const canonicalUrl = SITE_URL ? `${SITE_URL}${pathname}` : undefined;

    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", "Rahim ALI");
    setMetaTag("name", "twitter:card", "summary");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);

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
