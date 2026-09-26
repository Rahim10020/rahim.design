import type { SupportedLocale } from "../lib/locale";

export interface KnowMe {
  number: string;
  title: string;
  description: string;
}

const knowmeFr: KnowMe[] = [
  {
    number: "01",
    title: "Je pose des questions",
    description:
      "Pas pour compliquer le projet. Pour comprendre ce qu'on cherche vraiment à résoudre.",
  },
  {
    number: "02",
    title: "Je fais attention aux détails",
    description:
      "Un espacement, une transition, un état vide ou un bouton peuvent sembler insignifiants. Ensemble, ils façonnent l'expérience.",
  },
  {
    number: "03",
    title: "Je préfère la clarté à la complexité",
    description:
      "Si quelque chose peut être simplifié sans perdre sa valeur, je regarderai généralement dans cette direction.",
  },
  {
    number: "04",
    title: "Je te parle franchement",
    description:
      "Si je pense qu'une idée peut être améliorée, je te le dirai. L'objectif n'est pas juste de produire ce que tu demandes, mais de construire quelque chose qui marche vraiment.",
  },
];

const knowmeEn: KnowMe[] = [
  {
    number: "01",
    title: "I ask questions",
    description:
      "Not to complicate the project. To understand what we are really trying to solve.",
  },
  {
    number: "02",
    title: "I pay attention to details",
    description:
      "A spacing, transition, empty state, or button may seem insignificant. Together they shape the experience.",
  },
  {
    number: "03",
    title: "I prefer clarity to complexity",
    description:
      "If something can be made simpler without losing its value, I will usually look in that direction.",
  },
  {
    number: "04",
    title: "I speak to you frankly",
    description:
      "If I think an idea can be improved, I'll tell you. The goal is not just to produce what you ask for, but to build something that actually works.",
  },
];

export function getKnowme(locale: SupportedLocale = "fr"): KnowMe[] {
  return locale === "en" ? knowmeEn : knowmeFr;
}

// Compatibilité FR par défaut
export const knowmeData: KnowMe[] = knowmeFr;
