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
    title: "Résumé : Atomic Habits",
    date: "2026-07-10",
    description:
      "Les points clés du livre de James Clear sur les petites habitudes qui changent tout.",
    type: LEARN_TYPES.BOOKS,
  },
  {
    slug: "notes-systeme-design",
    title: "Notes : Principes de design systémique",
    date: "2026-08-02",
    description:
      "Réflexions sur l'approche systémique en design et son impact sur la résolution de problèmes complexes.",
    type: LEARN_TYPES.NOTES,
  },
  {
    slug: "notes-typographie-web",
    title: "Notes : Typographie sur le web",
    date: "2026-08-05",
    description:
      "Notes de lecture et bonnes pratiques sur l'usage de la typographie dans les interfaces web modernes.",
    type: LEARN_TYPES.NOTES,
  },
  {
    slug: "notes-couleur-accessibilite",
    title: "Notes : Couleur et accessibilité",
    date: "2026-08-08",
    description:
      "Notes sur le contraste des couleurs, la daltonisme et les guidelines pour une interface accessible.",
    type: LEARN_TYPES.NOTES,
  },
  {
    slug: "notes-animation-ui",
    title: "Notes : Animation en UI",
    date: "2026-08-12",
    description:
      "Notes sur les transitions, les easings et les principes de mouvement dans les interfaces utilisateur.",
    type: LEARN_TYPES.NOTES,
  },
  {
    slug: "resume-deep-work",
    title: "Résumé : Deep Work",
    date: "2026-08-15",
    description:
      "Les concepts clés du livre de Cal Newport sur la concentration profonde et la productivité intellectuelle.",
    type: LEARN_TYPES.BOOKS,
  },
  {
    slug: "resume-design-everyday",
    title: "Résumé : The Design of Everyday Things",
    date: "2026-08-20",
    description:
      "Les principes fondamentaux de Don Norman sur l'affordance, le feedback et l'ergonomie du quotidien.",
    type: LEARN_TYPES.BOOKS,
  },
];

export function getArticleBySlug(slug: string): ArticleFrontmatter | undefined {
  return articles.find((article) => article.slug === slug);
}
