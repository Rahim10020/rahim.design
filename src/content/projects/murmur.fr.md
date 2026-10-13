---
title: "Murmur"
order: 4
category: "Mobile"
description: "Une application personnelle et hors ligne de capture vocale, qui garde vos idées en quelques secondes — et les fait revenir au bon moment."
tags: ["Mobile", "Vocal", "Productivité", "Flutter"]
imageHeight: "h-120"
role: "Design & Développement"
platform: "Mobile (Android)"
year: "2026"
link: "https://murmur-landing-three.vercel.app"
---

| RÔLE                   | PLATEFORME       | ANNÉE |
| ---------------------- | ---------------- | ----- |
| Design & Développement | Mobile (Android) | 2026  |

![Image du projet Murmur — à remplacer](/images/others/image_placeholder.svg)

## Le contexte

**Tout commence par un problème.**

Une idée arrive — sous la douche, en marchant, au milieu d'autre chose. Le temps d'ouvrir une application de notes et de trouver le bon dossier, elle s'est déjà effacée. Murmur est née d'une conviction : capturer une pensée doit prendre quelques secondes, et la garder doit être sans effort.

## Le défi

**Le défi : protéger l'idée avant toute chose.**

La plupart des outils de capture demandent d'organiser avant de sauvegarder — un titre, une catégorie, un projet. Murmur prend le parti inverse. Le vrai défi était de concevoir une expérience où sauvegarder une note vocale est instantané et fiable, tout en permettant de retrouver, revoir et agir sur ses idées plus tard — sans jamais transformer l'application en gestionnaire de tâches.

## L'approche

**Alors, comment résoudre ça ?**

Tout s'articule autour d'une boucle simple : murmurer une idée, la laisser se sauvegarder, et laisser Murmur la ramener au bon moment. Les rappels sont optionnels et privés, et une session hebdomadaire discrète refait surface quelques idées plus anciennes qu'on n'a pas revues depuis un moment. Pas de compte, pas de cloud, pas de transcription — votre voix reste sur votre téléphone.

## UX

**Avant de penser aux pixels, pensons au parcours.**

![UX de Murmur — à remplacer](/images/others/image_placeholder.svg)

Le parcours est volontairement court : ouvrir l'application, appuyer sur l'action principale, parler, arrêter, c'est fait. À partir de là, chaque idée peut être écoutée, renommée, dotée d'un statut, ou associée à un rappel. Rien n'est exigé avant que l'enregistrement soit en sécurité — l'organisation vient toujours après, jamais avant.

## Design d'interface

**Une fois la route tracée, on pouvait enfin parler de l'interface.**

![Design d'interface de Murmur — à remplacer](/images/others/image_placeholder.svg)

L'interface est calme et minimaliste, concentrée sur une seule chose à la fois. L'état d'enregistrement est toujours évident — on ne se demande jamais si sa voix est captée. Les thèmes système, clair et sombre sont tous pris en charge, et l'application est disponible en français comme en anglais.

## Décisions importantes

Quelques choix qui ont changé l'expérience.

- **Capturer d'abord, organiser ensuite.** Aucun titre, catégorie ou dossier n'est jamais exigé avant qu'une idée soit sauvegardée en sécurité.
- **Privé par défaut.** Pas de compte, pas de serveur, pas d'analytics — l'audio et les métadonnées restent dans le stockage privé de l'application, sur l'appareil.
- **Des rappels discrets.** Les notifications ne révèlent jamais le contenu d'une idée ; en toucher une ouvre la bonne idée, rien de plus.
- **Redécouvrir, pas recommander.** Une petite session hebdomadaire refait surface quelques idées anciennes de façon déterministe et compréhensible — pas d'IA, pas de boîte noire.

## Développement

**Le design était prêt. Il fallait maintenant le faire vivre.**

![Développement de Murmur — à remplacer](/images/others/image_placeholder.svg)

Murmur a été construite comme une application personnelle et hors ligne pour Android, avec la sécurité des données traitée comme une priorité de premier ordre. L'audio est écrit dans un répertoire privé avant toute sauvegarde de métadonnées, les rappels sont réconciliés avec le système au démarrage, et l'application inclut un système complet d'export et de restauration pour que les idées survivent à un téléphone perdu ou réinstallé.

Le projet est open source et disponible sur GitHub : [github.com/Rahim10020/murmur.app](https://github.com/Rahim10020/murmur.app)

La landing page est disponible à l'adresse : [murmur-landing-three.vercel.app](https://murmur-landing-three.vercel.app)

## Le résultat

**Et au final, voilà ce que ça donne.**

![Résultat de Murmur — à remplacer](/images/others/image_placeholder.svg)

Un outil discret et fiable qui fait bien une seule chose : garder vos idées en sécurité jusqu'à ce que vous soyez prêt à y revenir.

## Ce que j'ai appris

Construire Murmur m'a appris que la fiabilité est une décision de design, pas une réflexion après coup. Un seul enregistrement perdu suffirait à trahir toute la promesse de l'application, donc chaque choix — de la sauvegarde de l'audio à la réconciliation des rappels — devait prioriser la confiance plutôt que les fonctionnalités. Cela m'a aussi confirmé que les contraintes, comme refuser l'IA et le cloud, peuvent mener à un produit plus personnel, pas moins.
