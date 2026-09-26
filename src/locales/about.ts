import type { SupportedLocale } from "../lib/locale";

const aboutFr = {
  title: "À propos.",
  introAlt:
    "Je suis développeur web, designer UX/UI et freelance basé à Lomé/Togo.",
  intro:
    "Au début, je voulais juste comprendre comment les choses fonctionnaient. Puis j'ai commencé à coder. Puis j'ai réalisé qu'écrire du code n'était qu'une partie du problème. Il fallait aussi comprendre ce que les gens allaient vraiment utiliser. C'est là que le design, l'UX et le développement ont commencé à se rejoindre pour moi. Aujourd'hui, j'adore pouvoir passer de l'idée à l'interface, puis de l'interface au produit réel.",
  designerTitle: "Partie Designer",
  designerItems: [
    "UX Design",
    "UI Design",
    "Design systems",
    "Rendre ça percutant",
  ],
  coderTitle: "Partie Codeur",
  coderItems: [
    "Développement Front-end",
    "React/Next js",
    "Tailwind css",
    "GSAP",
    "Typescript",
  ],
  bridge:
    "Je peux commencer dans Figma et finir dans mon éditeur de code sans avoir besoin de passer le relais à qui que ce soit. Ce double rôle me permet de penser l'expérience tout en gardant les contraintes techniques en tête. Résultat : moins d'allers-retours, des décisions plus cohérentes et une meilleure continuité entre ce qui a été imaginé et ce qui est vraiment construit.",
  statement:
    "Je ne veux pas juste construire des choses qui marchent. Je veux construire des choses qui ont du sens.",
  philosophy:
    "Pour moi, le design et le développement ne sont pas deux étapes complètement séparées. Une bonne interface doit être belle, mais surtout elle doit être compréhensible. Un bon produit doit fonctionner, mais il doit aussi donner envie de l'utiliser. C'est cette intersection entre réflexion, design et technologie qui m'intéresse.",
  expectTitle: "Ce que tu peux attendre de moi.",
  toolsTitle: "Les outils que j'utilise pour faire le travail.",
  toolsDesign: "Design",
  toolsFrontend: "Front-end",
  toolsBrainstorm: "Pour réfléchir et coder",
  toolsNote:
    "Je ne choisis pas une technologie parce qu'elle est à la mode. Je choisis l'outil qui correspond au problème.",
  hobbiesTitle: "Et quand je ne suis pas devant mon écran ?",
  hobbies: [
    "Je cours,",
    "Je joue au basket,",
    "J'expérimente de nouvelles idées,",
    "J'aime lire des livres,",
    "J'aime écouter de la musique",
    "Je suis probablement en train de démonter quelque chose que je devrais laisser tranquille 😅.",
  ],
  closingTitle:
    "Le code est ce que j'utilise pour construire. L'expérience est ce que j'essaie vraiment de créer.",
  closingSub:
    "Maintenant tu sais qui est derrière l'écran. Alors, tu essaies de construire quoi ?",
  cta: "Parlons de ton projet",
};

const aboutEn = {
  title: "About.",
  introAlt:
    "I am a web developer, UX/UI designer and freelancer based at Lome/Togo.",
  intro:
    "At first I just wanted to understand how things worked. Then I started coding. Then I realized that writing code was only part of the problem. We also had to understand what people were actually going to use. This is where design, UX and development started to come together for me. Today I love being able to move from idea to interface and then from interface to actual product.",
  designerTitle: "Part Designer",
  designerItems: ["UX Design", "UI Design", "Design systems", "Make it pop"],
  coderTitle: "Part Coder",
  coderItems: [
    "Front-end Development",
    "React/Next js",
    "Tailwind css",
    "GSAP",
    "Typescript",
  ],
  bridge:
    "I can start in Figma and end up in my code editor without needing to pass the baton to anyone else. This dual role allows me to think about the experience while keeping technical constraints in mind. The result: fewer back and forths, more coherent decisions and better continuity between what has been imagined and what is actually constructed.",
  statement:
    "I don't want to just build things that work. I want to build things that make sense.",
  philosophy:
    "For me, design and development are not two completely separate stages. A good interface should be beautiful, but above all it should be understandable. A good product should work, but it should also make you want to use it. It is this intersection between thinking, design and technology that interests me.",
  expectTitle: "Some things you can expect from me.",
  toolsTitle: "The tools I use to get the job done.",
  toolsDesign: "Design",
  toolsFrontend: "Front-end",
  toolsBrainstorm: "For brainstorming and code",
  toolsNote:
    "I don't choose a technology because it's fashionable. I choose the tool that corresponds to the problem.",
  hobbiesTitle: "And when I'm not in front of my screen?",
  hobbies: [
    "I run,",
    "I play basketball,",
    "I experiment with new ideas,",
    "I like to read books,",
    "I like to listen to music",
    "I'm probably taking apart something I should leave alone 😅.",
  ],
  closingTitle:
    "Code is what I use to build. Experience is what I'm really trying to create.",
  closingSub:
    "Now you know who is behind the screen. So what you're trying to build?",
  cta: "Let's talk about your project",
};

export function getAbout(locale: SupportedLocale = "fr") {
  return locale === "en" ? aboutEn : aboutFr;
}
