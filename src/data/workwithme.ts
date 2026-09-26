import type { SupportedLocale } from "../lib/locale";

export interface WorkWithMe {
  number: string;
  title: string;
  description: string;
}

const workwithmeFr: WorkWithMe[] = [
  {
    number: "01",
    title: "Comprendre avant de construire",
    description:
      "Je cherche d'abord à comprendre ton objectif, tes utilisateurs et le problème qu'on essaie de résoudre.",
  },
  {
    number: "02",
    title: "Garder les choses simples",
    description:
      "Je préfère une expérience claire avec peu de frictions à une interface pleine de fonctionnalités qui compliquent inutilement.",
  },
  {
    number: "03",
    title: "Faire attention aux détails",
    description:
      "Les petits détails comptent : espacements, états, responsive, interactions, transitions... C'est souvent là qu'une interface passe de correcte à vraiment agréable.",
  },
  {
    number: "04",
    title: "Te dire ce que je pense",
    description:
      "Si je vois une meilleure façon de faire, je te le dirai. L'objectif n'est pas juste d'exécuter une liste de demandes, mais de construire quelque chose qui marche vraiment.",
  },
];

const workwithmeEn: WorkWithMe[] = [
  {
    number: "01",
    title: "Understand before you build",
    description:
      "I first seek to understand your objective, your users and the problem we are trying to solve.",
  },
  {
    number: "02",
    title: "Keep things simple",
    description:
      "I prefer a clear experience with little friction to an interface full of features that complicate things unnecessarily.",
  },
  {
    number: "03",
    title: "Pay attention to details",
    description:
      "The little details count: spacing, states, responsive, interactions, transitions... This is often where an interface goes from decent to really nice.",
  },
  {
    number: "04",
    title: "Tell you what I think",
    description:
      "If I see a better way to do something, I'll tell you. The goal is not just to run a list of requests, but to build something that actually works.",
  },
];

export function getWorkWithMe(locale: SupportedLocale = "fr"): WorkWithMe[] {
  return locale === "en" ? workwithmeEn : workwithmeFr;
}

export const workwithmeData: WorkWithMe[] = workwithmeFr;
