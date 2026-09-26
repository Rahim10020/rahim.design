import type { SupportedLocale } from "../lib/locale";

export interface Step {
  number: string;
  title: string;
  description: string;
  backgroundColor: string;
  textColor: "light" | "dark";
}

const stepsFr: Step[] = [
  {
    number: "01",
    title: "On commence par discuter",
    description:
      "Avant de penser aux couleurs, aux composants ou au code, je veux comprendre ce que tu essaies vraiment de construire.",
    backgroundColor: "#f4ed55",
    textColor: "dark",
  },
  {
    number: "02",
    title: "On met l'idée en ordre",
    description:
      "Je transforme les besoins, les contraintes et les idées en une expérience claire.",
    backgroundColor: "#1e1e1e",
    textColor: "light",
  },
  {
    number: "03",
    title: "On lui donne une forme",
    description:
      "Design, interactions, responsive, détails visuels : on construit quelque chose qui donne envie d'être utilisé.",
    backgroundColor: "#1982c4",
    textColor: "light",
  },
  {
    number: "04",
    title: "Je passe ensuite au code",
    description:
      "Je transforme le design en une interface propre, efficace et fidèle à l'intention de départ.",
    backgroundColor: "#f9c74f",
    textColor: "dark",
  },
];

const stepsEn: Step[] = [
  {
    number: "01",
    title: "We start by talking",
    description:
      "Before I think about colors, components, or code, I want to understand what you're actually trying to build.",
    backgroundColor: "#f4ed55",
    textColor: "dark",
  },
  {
    number: "02",
    title: "We put the idea in order",
    description:
      "I transform needs, constraints and ideas into a clear experience.",
    backgroundColor: "#1e1e1e",
    textColor: "light",
  },
  {
    number: "03",
    title: "We give it a shape",
    description:
      "Design, interactions, responsive, visual details: we build something that makes you want to be used.",
    backgroundColor: "#1982c4",
    textColor: "light",
  },
  {
    number: "04",
    title: "I then move on to the code",
    description:
      "I transform the design into a clean, efficient interface that is faithful to the initial intention.",
    backgroundColor: "#f9c74f",
    textColor: "dark",
  },
];

export function getSteps(locale: SupportedLocale = "fr"): Step[] {
  return locale === "en" ? stepsEn : stepsFr;
}

export const stepsData: Step[] = stepsFr;
