import type { SupportedLocale } from "../lib/locale";

const servicesFr = {
  eyebrow: "SERVICES",
  heroTitle: "Tu as quelque chose à construire.",
  heroSub:
    "Une idée, un produit, un site ou une expérience qui mérite d'être mieux pensée ? Je t'aide à passer de l'idée à quelque chose de clair, beau et vraiment utilisable — du design au développement.",
  ctaTalk: "Parlons de ton projet",
  ctaProjects: "Voir mes projets",
  designTitle: "Tu as une idée ?",
  designSub: "Je peux concevoir l'expérience.",
  designDesc:
    "On part de ton idée, même quand ce n'est encore qu'un croquis dans ta tête. Je transforme tes besoins en une expérience claire : structure, parcours, wireframes, interface et prototype.",
  whatICanDo: "Ce que je peux faire",
  designItems: [
    "Recherche UX & réflexion produit",
    "Parcours utilisateurs",
    "Wireframes",
    "UI Design",
    "Prototypage",
    "Design systems",
    "Responsive Design",
  ],
  buildTitle: "Tu as déjà le design ?",
  buildSub: "Je peux construire le produit.",
  buildDesc:
    "On part de ton design existant pour construire une interface fidèle, rapide et propre. Je transforme tes maquettes en un produit réel.",
  buildItems: [
    "Intégration des maquettes",
    "Développement frontend",
    "Interfaces responsives",
    "Interactions & animations",
    "Composants réutilisables",
    "Optimisation des performances",
  ],
  visibleTitle: "Tu as besoin d'être visible en ligne ?",
  visibleSub: "Je peux créer ton site.",
  visibleDescA:
    "Ton site ne doit pas juste être joli. Il doit expliquer ce que tu fais, inspirer confiance, et donner aux bonnes personnes une raison de te contacter.",
  visibleDescB:
    "Je conçois et développe des sites vitrines et des landing pages qui mettent en valeur ton activité tout en gardant l'expérience simple et intuitive.",
  visibleItems: ["Sites vitrines", "Landing pages", "Sites personnels"],
  improveTitle: "Tu as déjà quelque chose qui marche ?",
  improveSub: "Je peux l'améliorer.",
  improveDescA: "Tout n'a pas besoin d'être reconstruit de zéro.",
  improveDescB:
    "Je peux reprendre ton site ou produit existant, identifier ce qui crée des frictions et améliorer l'expérience, l'interface ou certains aspects techniques.",
  improveItems: [
    "Audit UX/UI",
    "Refonte d'interface",
    "Simplification des parcours",
    "Améliorations visuelles",
    "Optimisation frontend",
    "Correction des problèmes d'interface",
  ],
  togetherTitle: "Et concrètement, travailler ensemble ça ressemble à quoi ?",
  practiceTitle: "Tu veux voir à quoi ça ressemble en pratique ?",
  practiceSub:
    "Voici quelques projets où j'ai eu l'occasion de transformer une idée, un problème ou une interface en quelque chose de concret.",
  seeAll: "Voir tous les projets",
  faqTitle: "Questions Fréquentes",
  faq: [
    {
      question: "Je n'ai qu'une idée. C'est suffisant pour commencer ?",
      answer:
        "Oui. Tu n'as pas besoin d'avoir un cahier des charges parfait. Les premiers échanges servent justement à comprendre ce que tu veux construire et à déterminer ce dont le projet a vraiment besoin.",
    },
    {
      question:
        "J'ai déjà les maquettes. Tu peux juste t'occuper du développement ?",
      answer:
        "Oui. Si ton design est déjà prêt, je peux me concentrer sur l'intégration et le développement.",
    },
    {
      question: "Tu peux t'occuper du design et du développement ?",
      answer:
        "Oui. C'est l'une de mes principales façons de travailler : concevoir l'expérience, puis la transformer directement en produit.",
    },
    {
      question: "Tu ne travailles que sur des nouveaux projets ?",
      answer:
        "Non. Je peux aussi travailler sur un produit ou site existant pour améliorer son interface, son expérience ou certains aspects techniques.",
    },
    {
      question: "Comment commence une collaboration ?",
      answer:
        "Tu me racontes juste ce que tu essaies de construire. Pas besoin de préparer un document de 30 pages. On commence par une conversation.",
    },
  ],
};

const servicesEn = {
  eyebrow: "SERVICES",
  heroTitle: "You have something to build.",
  heroSub:
    "An idea, a product, a site or an experience that deserves to be better thought out? I help you move from the idea to something clear, beautiful and truly usable — from design to development.",
  ctaTalk: "Let's talk about your project",
  ctaProjects: "See my projects",
  designTitle: "Do you have an idea ?",
  designSub: "I can design the experience.",
  designDesc:
    "We start from your idea, even when it is still just a sketch in your head. I transform your needs into a clear experience: structure, route, wireframes, interface and prototype.",
  whatICanDo: "What i can do",
  designItems: [
    "UX research & product thinking",
    "User flows",
    "Wireframes",
    "UI Design",
    "Prototyping",
    "Design systems",
    "Responsive Design",
  ],
  buildTitle: "Already have the design ?",
  buildSub: "I can build the product.",
  buildDesc:
    "We start from your idea, even when it is still just a sketch in your head. I transform your needs into a clear experience: structure, route, wireframes, interface and prototype.",
  buildItems: [
    "Integration of models",
    "Frontend development",
    "Responsive interfaces Wireframes",
    "Interactions & animations",
    "Reusable components",
    "Performance optimization",
  ],
  visibleTitle: "Do you need to be visible online ?",
  visibleSub: "I can create your site.",
  visibleDescA:
    "Your site doesn't just have to look pretty. It should explain what you do, inspire confidence, and give the right people a reason to contact you.",
  visibleDescB:
    "I design and develop showcase sites and landing pages that highlight your activity while keeping the experience simple and intuitive.",
  visibleItems: ["Showcase sites", "Landing pages", "Personal sites"],
  improveTitle: "Already have something that works ?",
  improveSub: "I can improve it.",
  improveDescA: "Not everything needs to be rebuilt from scratch.",
  improveDescB:
    "I can take your existing site or product, identify what creates friction and improve the experience, interface or certain technical aspects.",
  improveItems: [
    "UX/UI Audit",
    "Interface redesign",
    "Simplification of routes",
    "Visual improvements",
    "Frontend optimization",
    "Fixed interface issues",
  ],
  togetherTitle: "And concretely, what does working together look like ?",
  practiceTitle: "Want to see what it looks like in practice?",
  practiceSub:
    "Here are some projects where I had the opportunity to transform an idea, a problem or an interface into something concrete.",
  seeAll: "See all projects",
  faqTitle: "Frequently Asked Question",
  faq: [
    {
      question: "I only have one idea. Is this enough to start with?",
      answer:
        "Yes. You don't need to have perfectly defined specifications. The first exchanges serve precisely to understand what you want to build and determine what the project really needs.",
    },
    {
      question:
        "I already have the models. Can you just take care of development?",
      answer:
        "Yes. If your design is already ready, I can focus on integrating and developing it.",
    },
    {
      question: "Can you take care of the design and development?",
      answer:
        "Yes. This is one of my main ways of working: designing the experience, then transforming it directly into a product.",
    },
    {
      question: "Do you only work on new projects?",
      answer:
        "No. I can also work on an existing product or site to improve its interface, its experience, or certain technical aspects.",
    },
    {
      question: "How does a collaboration begin?",
      answer:
        "You just tell me what you're trying to build. No need to prepare a 30-page document. We start with a conversation.",
    },
  ],
};

export function getServices(locale: SupportedLocale = "fr") {
  return locale === "en" ? servicesEn : servicesFr;
}
