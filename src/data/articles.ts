import { LEARN_TYPES } from "../routes";

export interface ArticleFrontmatter {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: (typeof LEARN_TYPES)[keyof typeof LEARN_TYPES];
}

export const articles: ArticleFrontmatter[] = [
  {
    slug: "premier-article",
    title: "Summary: Atomic Habits",
    date: "2026-07-10",
    description:
      "Key takeaways from James Clear's book on the small habits that change everything.",
    type: LEARN_TYPES.BOOKS,
  },
  {
    slug: "notes-systeme-design",
    title: "Notes: Systems Design Principles",
    date: "2026-08-02",
    description:
      "Reflections on the systems approach in design and its impact on solving complex problems.",
    type: LEARN_TYPES.NOTES,
  },
  {
    slug: "notes-typographie-web",
    title: "Notes: Web Typography",
    date: "2026-08-05",
    description:
      "Reading notes and best practices on typography usage in modern web interfaces.",
    type: LEARN_TYPES.NOTES,
  },
  {
    slug: "notes-couleur-accessibilite",
    title: "Notes: Color and Accessibility",
    date: "2026-08-08",
    description:
      "Notes on color contrast, color blindness, and guidelines for an accessible interface.",
    type: LEARN_TYPES.NOTES,
  },
  {
    slug: "notes-animation-ui",
    title: "Notes: UI Animation",
    date: "2026-08-12",
    description:
      "Notes on transitions, easings, and movement principles in user interfaces.",
    type: LEARN_TYPES.NOTES,
  },
  {
    slug: "resume-deep-work",
    title: "Summary: Deep Work",
    date: "2026-08-15",
    description:
      "Key concepts from Cal Newport's book on deep concentration and intellectual productivity.",
    type: LEARN_TYPES.BOOKS,
  },
  {
    slug: "resume-design-everyday",
    title: "Summary: The Design of Everyday Things",
    date: "2026-08-20",
    description:
      "Don Norman's fundamental principles on affordance, feedback, and everyday ergonomics.",
    type: LEARN_TYPES.BOOKS,
  },
];

export function getArticleBySlug(slug: string): ArticleFrontmatter | undefined {
  return articles.find((article) => article.slug === slug);
}
