import type { SupportedLocale } from "../lib/locale";

const contactFr = {
  pageTitle: "Commençons par ton projet.",
  pageEyebrow: "CONTACT",
  blueprint: {
    line1: "Tu ne veux pas",
    line2: "remplir le form ?",
    line3: "Dis bonjour sur WhatsApp.",
    cta: "Whatsapp",
  },
  form: {
    nameLabel: "Comment je t'appelle ?",
    namePlaceholder: "Ton nom",
    emailLabel: "Où puis-je te répondre ?",
    emailPlaceholder: "ton@email.com",
    typesLegend: "Qu'est-ce qu'on va construire ?",
    types: {
      webProduct: "Un produit web",
      improveExisting: "Améliorer un truc existant",
      landingPage: "Un site / landing page",
      unknownYet: "Je ne sais pas encore",
    },
    messageLabel: "Parle-moi un peu de ton projet.",
    messagePlaceholder:
      "Qu'est-ce que tu veux construire ? Quel problème veux-tu résoudre ? Où en es-tu aujourd'hui ?",
    submit: "Démarrer la conversation",
    sending: "Envoi...",
    success: "Message envoyé. Je te réponds rapidement.",
    error: "Une erreur est survenue. Réessaie ou écris-moi sur WhatsApp.",
    copied: "Copié",
  },
};

const contactEn = {
  pageTitle: "Let's start with your project.",
  pageEyebrow: "CONTACT",
  blueprint: {
    line1: "Don't want to",
    line2: "fill out the form?",
    line3: "Say hello on WhatsApp.",
    cta: "Whatsapp",
  },
  form: {
    nameLabel: "What should I call you?",
    namePlaceholder: "Your name",
    emailLabel: "Where can I answer you?",
    emailPlaceholder: "your@email.com",
    typesLegend: "What are we going to build?",
    types: {
      webProduct: "A web product",
      improveExisting: "Improve something existing",
      landingPage: "A site/landing page",
      unknownYet: "I do not know yet",
    },
    messageLabel: "Tell me a little about your project.",
    messagePlaceholder:
      "What are you trying to build ? What problem are you looking to solve ? Where are you now ?",
    submit: "Start conversation",
    sending: "Sending...",
    success: "Message sent. I'll answer you soon.",
    error: "Something went wrong. Try again or write me on WhatsApp.",
    copied: "Copied",
  },
};

export function getContact(locale: SupportedLocale = "fr") {
  return locale === "en" ? contactEn : contactFr;
}