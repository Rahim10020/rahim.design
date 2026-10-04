import type { SupportedLocale } from "../lib/locale";

export const ui = {
  preloader: {
    words: [
      { fr: "Design", en: "Design" },
      { fr: "Code", en: "Code" },
      { fr: "Fun", en: "Fun" },
      { fr: "Bienvenue", en: "Welcome" },
    ],
  },
  nav: {
    about: { fr: "À propos", en: "About" },
    services: { fr: "Services", en: "Services" },
    projects: { fr: "Projets", en: "Projects" },
    learn: { fr: "Apprendre", en: "Learn" },
    books: { fr: "Livres", en: "Books" },
    notes: { fr: "Notes", en: "Notes" },
    contact: { fr: "Contact", en: "Contact" },
    headerMobileTitle: { fr: "Designer/Codeur", en: "Designer/Coder" },
  },
  hero: {
    headline: {
      fr: "Tu as une idée. Faisons-en quelque chose que les gens auront envie d'utiliser.",
      en: "You have an idea. Let's make it something people will want to use.",
    },
    highlightWord: { fr: "idée.", en: "idea." },
    sub: {
      fr: "Je suis Rahim ALI. Je conçois et je code des produits qui rendent le web simple, intuitif et vivant.",
      en: "I am Rahim ALI. I design and code products that make the web simple, intuitive, and alive.",
    },
    cta: { fr: "Alors, on construit quoi ?", en: "So what are we building?" },
  },
  aboutSection: {
    behind: { fr: "Derrière l'écran", en: "Behind the screen" },
    designer: { fr: "Designer,", en: "Designer," },
    coder: { fr: "Codeur💀", en: "Coder💀" },
    p1: {
      fr: "Je suis le genre de développeur qui remarque quand un bouton est décalé de 4 pixels.",
      en: "I'm the type of developer who notices when a button is misaligned by 4 pixels.",
    },
    p2: {
      fr: "Je travaille à l'intersection du design et du développement web, avec une obsession pour les interfaces épurées, les détails qui comptent et les expériences qui semblent naturelles.",
      en: "I work at the intersection of web design and development, with an obsession with clean interfaces, details that matter, and experiences that feel natural.",
    },
    p3: {
      fr: "Mon objectif est simple : construire des produits que tu seras fier de montrer et que tes utilisateurs aimeront utiliser.",
      en: "My goal is simple: build products that you will be proud to show off and that your users will enjoy using.",
    },
    knowMore: { fr: "Apprends à me connaître", en: "Know me more" },
  },
  servicesSection: {
    title: { fr: "Ce que je peux faire pour toi", en: "What I can do for you" },
    items: [
      {
        title: { fr: "Concevoir une interface", en: "Design an interface" },
        description: {
          fr: "Je transforme tes idées en interfaces claires, cohérentes et agréables à utiliser, pensées pour tes utilisateurs et ton objectif.",
          en: "I transform your ideas into clear, coherent and pleasant to use interfaces, designed for your users and your objective.",
        },
      },
      {
        title: { fr: "Construire le produit", en: "Build the product" },
        description: {
          fr: "Je développe des interfaces web rapides, responsives et fidèles au design, avec une attention particulière aux détails.",
          en: "I develop fast, responsive and design-friendly web interfaces, with particular attention to detail.",
        },
      },
      {
        title: { fr: "Améliorer l'existant", en: "Improve the existing" },
        description: {
          fr: "Je peux reprendre une interface existante, identifier les problèmes d'expérience, et lui rendre clarté, cohérence et caractère.",
          en: "I can take an existing interface, identify experience issues, and restore clarity, consistency, and character.",
        },
      },
    ],
  },
  projectsSection: {
    title: {
      fr: "Regardons ce que j'ai déjà construit",
      en: "Let's look at what I've already built",
    },
    seeAll: { fr: "Voir tous les projets", en: "See all projects" },
  },
  stepsSection: {
    title: {
      fr: "Voici comment on passera de ton idée à quelque chose de concret",
      en: "This is how we will move from your idea to something concrete",
    },
  },
  contactSection: {
    contactSectionTitle: {
      fr: "Alors, on construit quoi ?",
      en: "So What are we Building ?",
    },
    leftParagraph: {
      fr: "Pas besoin d'avoir toutes les réponses. Viens avec l'idée, on partira de là.",
      en: "No need to have all the answers. Come up with the idea, we'll start there.",
    },
    centerParagraph: {
      fr: "Développeur Web, concepteur UX/UI et freelance basé à Lomé/Togo.",
      en: "Web developer, UX/UI designer and freelancer based at Lome/Togo.",
    },
    cta: { fr: "Démarrer une conversation", en: "Start a Conversation" },
  },
  footer: {
    rights: { fr: "Tous droits réservés", en: "All Rights Reserved" },
    tagline: { fr: "Fait avec haine", en: "Made w/ hate" },
  },
  projectsPage: {
    title: { fr: "Projets.", en: "Projects." },
    filterAll: { fr: "Tous", en: "All" },
    cta: { fr: "Parlons de ton projet", en: "Let's talk about your project" },
  },
  learnPage: {
    title: { fr: "Apprendre.", en: "Learn." },
    filterAll: { fr: "Tous", en: "All" },
    filterBooks: { fr: "Livres", en: "Books" },
    filterNotes: { fr: "Notes", en: "Notes" },
  },
  projectDetail: {
    back: { fr: "Retour aux projets", en: "Back to projects" },
    recent: { fr: "Projet récent", en: "Recent Project" },
    next: { fr: "Projet suivant", en: "Next Project" },
    notFound: { fr: "Projet introuvable.", en: "Project not found." },
    readingProgress: { fr: "Progression de lecture", en: "Reading progress" },
  },
  learnDetail: {
    back: { fr: "Retour à Apprendre", en: "Back to learn" },
    notFound: { fr: "Article introuvable.", en: "Learn article not found." },
    readingProgress: { fr: "Progression de lecture", en: "Reading progress" },
  },
  notFoundPage: {
    title: { fr: "Page introuvable.", en: "Page not found." },
    description: {
      fr: "La page que tu cherches n'existe pas ou a été déplacée.",
      en: "The page you are looking for does not exist or has been moved.",
    },
    backHome: { fr: "Retour à l'accueil", en: "Back to home" },
    viewProjects: { fr: "Voir les projets", en: "View projects" },
  },
  seo: {
    defaultTitle: {
      fr: "Rahim ALI | Développeur Web & Designer UX/UI",
      en: "Rahim ALI | Web Developer & UX/UI Designer",
    },
    defaultDescription: {
      fr: "Rahim ALI est développeur web et designer UX/UI basé à Lomé, Togo. Il transforme les idées en produits numériques utiles.",
      en: "Rahim ALI is a web developer and UX/UI designer based in Lome, Togo, helping turn ideas into useful digital products.",
    },
    aboutTitle: { fr: "À propos | Rahim ALI", en: "About | Rahim ALI" },
    aboutDescription: {
      fr: "Découvre l'approche de Rahim ALI : design UX/UI, développement frontend et produits numériques.",
      en: "Discover Rahim ALI's approach to UX/UI design, frontend development, and digital products.",
    },
    servicesTitle: { fr: "Services | Rahim ALI", en: "Services | Rahim ALI" },
    servicesDescription: {
      fr: "Services design UX/UI, développement frontend et amélioration de produits par Rahim ALI.",
      en: "UX/UI design, frontend development, and product improvement services by Rahim ALI.",
    },
    contactTitle: { fr: "Contact | Rahim ALI", en: "Contact | Rahim ALI" },
    contactDescription: {
      fr: "Démarrons ton projet : contacte Rahim ALI pour design UX/UI et développement frontend.",
      en: "Let's start your project: contact Rahim ALI for UX/UI design and frontend development.",
    },
    projectsTitle: { fr: "Projets | Rahim ALI", en: "Projects | Rahim ALI" },
    projectsDescription: {
      fr: "Sélection de projets design UX/UI et développement frontend par Rahim ALI.",
      en: "Selected UX/UI design and frontend development projects by Rahim ALI.",
    },
    learnTitle: { fr: "Apprendre | Rahim ALI", en: "Learn | Rahim ALI" },
    learnDescription: {
      fr: "Livres, notes et idées sur le design, le développement et la création de meilleurs produits.",
      en: "Books, notes, and ideas about design, development, and building better products.",
    },
    notFoundTitle: {
      fr: "Page introuvable | Rahim ALI",
      en: "Page not found | Rahim ALI",
    },
    notFoundDescription: {
      fr: "La page que tu cherches n'existe pas.",
      en: "The page you are looking for does not exist.",
    },
  },
  common: {
    talkProject: {
      fr: "Parlons de ton projet",
      en: "Let's talk about your project",
    },
    seeProjects: { fr: "Voir mes projets", en: "See my projects" },
  },
} as const;

export function getUi(locale: SupportedLocale) {
  const pick = <T extends { fr: string; en: string }>(v: T): string =>
    v[locale];
  return {
    locale,
    preloader: {
      words: ui.preloader.words.map((word) => pick(word)),
    },
    nav: {
      about: pick(ui.nav.about),
      services: pick(ui.nav.services),
      projects: pick(ui.nav.projects),
      learn: pick(ui.nav.learn),
      books: pick(ui.nav.books),
      notes: pick(ui.nav.notes),
      contact: pick(ui.nav.contact),
      headerMobileTitle: pick(ui.nav.headerMobileTitle),
    },
    hero: {
      headline: pick(ui.hero.headline),
      highlightWord: pick(ui.hero.highlightWord),
      sub: pick(ui.hero.sub),
      cta: pick(ui.hero.cta),
    },
    aboutSection: {
      behind: pick(ui.aboutSection.behind),
      designer: pick(ui.aboutSection.designer),
      coder: pick(ui.aboutSection.coder),
      p1: pick(ui.aboutSection.p1),
      p2: pick(ui.aboutSection.p2),
      p3: pick(ui.aboutSection.p3),
      knowMore: pick(ui.aboutSection.knowMore),
    },
    servicesSection: {
      title: pick(ui.servicesSection.title),
      items: ui.servicesSection.items.map((s) => ({
        title: pick(s.title),
        description: pick(s.description),
      })),
    },
    projectsSection: {
      title: pick(ui.projectsSection.title),
      seeAll: pick(ui.projectsSection.seeAll),
    },
    stepsSection: { title: pick(ui.stepsSection.title) },
    contactSection: {
      contactSectionTitle: pick(ui.contactSection.contactSectionTitle),
      leftParagraph: pick(ui.contactSection.leftParagraph),
      centerParagraph: pick(ui.contactSection.centerParagraph),
      cta: pick(ui.contactSection.cta),
    },
    footer: {
      rights: pick(ui.footer.rights),
      tagline: pick(ui.footer.tagline),
    },
    projectsPage: {
      title: pick(ui.projectsPage.title),
      filterAll: pick(ui.projectsPage.filterAll),
      cta: pick(ui.projectsPage.cta),
    },
    learnPage: {
      title: pick(ui.learnPage.title),
      filterAll: pick(ui.learnPage.filterAll),
      filterBooks: pick(ui.learnPage.filterBooks),
      filterNotes: pick(ui.learnPage.filterNotes),
    },
    projectDetail: {
      back: pick(ui.projectDetail.back),
      recent: pick(ui.projectDetail.recent),
      next: pick(ui.projectDetail.next),
      notFound: pick(ui.projectDetail.notFound),
      readingProgress: pick(ui.projectDetail.readingProgress),
    },
    learnDetail: {
      back: pick(ui.learnDetail.back),
      notFound: pick(ui.learnDetail.notFound),
      readingProgress: pick(ui.learnDetail.readingProgress),
    },
    notFoundPage: {
      title: pick(ui.notFoundPage.title),
      description: pick(ui.notFoundPage.description),
      backHome: pick(ui.notFoundPage.backHome),
      viewProjects: pick(ui.notFoundPage.viewProjects),
    },
    seo: {
      defaultTitle: pick(ui.seo.defaultTitle),
      defaultDescription: pick(ui.seo.defaultDescription),
      aboutTitle: pick(ui.seo.aboutTitle),
      aboutDescription: pick(ui.seo.aboutDescription),
      servicesTitle: pick(ui.seo.servicesTitle),
      servicesDescription: pick(ui.seo.servicesDescription),
      contactTitle: pick(ui.seo.contactTitle),
      contactDescription: pick(ui.seo.contactDescription),
      projectsTitle: pick(ui.seo.projectsTitle),
      projectsDescription: pick(ui.seo.projectsDescription),
      learnTitle: pick(ui.seo.learnTitle),
      learnDescription: pick(ui.seo.learnDescription),
      notFoundTitle: pick(ui.seo.notFoundTitle),
      notFoundDescription: pick(ui.seo.notFoundDescription),
    },
    common: {
      talkProject: pick(ui.common.talkProject),
      seeProjects: pick(ui.common.seeProjects),
    },
  };
}
