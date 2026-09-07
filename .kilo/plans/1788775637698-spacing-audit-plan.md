# Plan d'audit et de correction des espacements

## 1. Contexte et structure du projet

Le site est un portfolio React + Tailwind CSS avec les sections HomePage suivantes :
- **HeroSection** (`src/_components/sections/HeroSection.tsx`)
- **AboutSection** (`src/_components/sections/AboutSection.tsx`)
- **ServicesSection** (`src/_components/sections/ServicesSection.tsx`)
- **ProjectsSection** (`src/_components/sections/ProjectsSection.tsx`)
- **StepsSection** (`src/_components/sections/StepsSection.tsx`)
- **ContactSection** (`src/_components/sections/ContactSection.tsx`)
- **Footer** (`src/_components/layout/Footer.tsx`)

Le design utilise principalement des classes utilitaires Tailwind (`gap-*`, `mb-*`, `mt-*`, `py-*`, `px-*`, `space-y-*`). Aucun token/spacing system dédié n'existe dans `tailwind.config.ts`.

---

## 2. Problèmes de spacing identifiés

### 2.1 Espacement vertical excessif en haut des sections (Hero, About, Contact)

**Fichiers concernés :**
- `HeroSection.tsx` ligne 8 : `py-12 mt-16` → 48px padding-top + 64px margin-top = **112px** d'espace avant le contenu.
- `AboutSection.tsx` ligne 7 : `py-12 mt-16` → même problème, **112px**.
- `ContactSection.tsx` ligne 19 : `pt-12 mt-16` → **112px**.

Ces sections ont déjà `min-h-[calc(100svh-104px)]` (presque plein écran). Ajouter 112px de marge/padding interne pousse le contenu trop bas et crée une impression de "vide" excessif en haut.

### 2.2 Écart titre → contenu trop important (Services, Projects, Steps)

**Fichiers concernés :**
- `ServicesSection.tsx` ligne 35 : `mb-16 lg:mb-20` → **64px / 80px**.
- `ProjectsSection.tsx` ligne 63 : `mb-14 lg:mb-20` → **56px / 80px**.
- `StepsSection.tsx` ligne 10 : `mb-16 lg:mb-20` → **64px / 80px**.

Pour un titre de section vers son contenu (cartes, grille, slider), les guidelines indiquent **24–40px** sur desktop. 64–80px est trop élevé et casse la hiérarchie visuelle.

### 2.3 Incohérence du padding horizontal entre sections

**Fichiers concernés :**
- Hero, About, Steps, Contact : `px-2` (**8px**).
- Services : `px-6` (**24px**).
- Projects (titre) : `px-6` (**24px**).

Cette incohérence donne une impression de déséquilibre entre les sections.

### 2.4 Absence d'espace explicite entre logo et titre (About)

**Fichier concerné :**
- `AboutSection.tsx` ligne 9 : `flex items-start justify-between` sans `gap-*`.

Le logo et "Behind the screen" sont en `justify-between` sans gap défini. Sur grand écran, l'écart devient excessif et dépendant de la largeur de viewport, ce qui est incohérent.

### 2.5 Footer trop comprimé

**Fichier concerné :**
- `Footer.tsx` ligne 6 : `py-4 lg:py-2` → **16px / 8px**.

Le footer est une section majeure ; 8–16px de padding est trop serré par rapport au reste du site.

### 2.6 Écart numéro → carte un peu large (StepCard)

**Fichier concerné :**
- `StepCard.tsx` ligne 21 : `gap-6` (**24px**) entre le numéro décoratif et la carte.

Le numéro est un élément décoratif. 24px est acceptable mais légèrement généreux ; 16px est suffisant pour un équilibre plus compact.

---

## 3. Valeurs de spacing retenues

| Usage | Valeur Tailwind | px |
|---|---|---|
| Micro spacing (éléments serrés) | `1` / `2` | 4 / 8 |
| Heading → texte court | `3` | 12 |
| Élément → CTA / élément standard | `4` | 16 |
| Image → titre / confortable | `6` | 24 |
| Titre section → contenu (desktop) | `8` / `10` | 32 / 40 |
| Entre blocs majeurs | `12` | 48 |
| Section heading → contenu (max) | `16` | 64 |

**Principe :** Privilégier des valeurs cohérentes et réutilisables. Pas de valeurs "exotiques" (ex: 37px, 53px).

---

## 4. Modifications proposées par fichier

### `src/_components/sections/HeroSection.tsx`
| Élément actuel | Remplacement | Raison |
|---|---|---|
| `py-12 mt-16` (ligne 8) | `py-8 mt-8` | Réduit l'espace haut de 112px → 64px. Le hero est déjà plein écran. |
| `gap-12` (ligne 10) | `gap-8` | Headline → texte : 48px → 32px (dans la fourchette 24–40px pour un hero). |

### `src/_components/sections/AboutSection.tsx`
| Élément actuel | Remplacement | Raison |
|---|---|---|
| `py-12 mt-16` (ligne 7) | `py-8 mt-8` | Même logique que Hero : réduire l'espace haut excessif. |
| `justify-between` (ligne 9) | `justify-between gap-8` | Ajouter un gap explicite entre logo et titre pour éviter un écart trop grand et dépendant de la viewport. |
| `space-y-12` (ligne 7) | `space-y-8` | 48px → 32px entre les blocs majeurs de la section. |

### `src/_components/sections/ServicesSection.tsx`
| Élément actuel | Remplacement | Raison |
|---|---|---|
| `px-6` (ligne 33) | `px-2` | Harmoniser avec les autres sections (Hero, About, Steps, Contact). |
| `py-20 lg:py-28` (ligne 32) | `py-16 lg:py-20` | 80–112px → 64–80px. La section n'est pas forcément plein écran, donc on réduit légèrement. |
| `mb-16 lg:mb-20` (ligne 35) | `mb-10 lg:mb-12` | Titre → cartes : 64–80px → 40–48px. |

### `src/_components/sections/ProjectsSection.tsx`
| Élément actuel | Remplacement | Raison |
|---|---|---|
| `px-6` (ligne 61) | `px-2` | Harmoniser le padding horizontal. |
| `py-20 lg:py-28` (ligne 60) | `py-16 lg:py-20` | Même logique que Services. |
| `mb-14 lg:mb-20` (ligne 63) | `mb-10 lg:mb-12` | Titre → slider : 56–80px → 40–48px. |

### `src/_components/sections/StepsSection.tsx`
| Élément actuel | Remplacement | Raison |
|---|---|---|
| `py-20 lg:py-28` (ligne 6) | `py-16 lg:py-20` | Même logique. |
| `mb-16 lg:mb-20` (ligne 10) | `mb-10 lg:mb-12` | Titre → grille : 64–80px → 40–48px. |

### `src/_components/sections/ContactSection.tsx`
| Élément actuel | Remplacement | Raison |
|---|---|---|
| `pt-12 mt-16` (ligne 19) | `pt-8 mt-8` | Réduire l'espace haut excessif (112px → 64px). |
| `mb-16` (ligne 33) | `mb-12` | Espace entre ligne 3 et ligne 4 : 64px → 48px. |

### `src/_components/layout/Footer.tsx`
| Élément actuel | Remplacement | Raison |
|---|---|---|
| `py-4 lg:py-2` (ligne 6) | `py-8 lg:py-6` | Footer trop comprimé. 32px / 24px donne plus de respiration. |

### `src/_components/ui/cards/ProjectCard.tsx`
| Élément actuel | Remplacement | Raison |
|---|---|---|
| `mt-1` (ligne 51) | `mt-2` | Category sous le titre : 4px → 8px pour une meilleure lisibilité. |

### `src/_components/ui/cards/StepCard.tsx`
| Élément actuel | Remplacement | Raison |
|---|---|---|
| `gap-6` (ligne 21) | `gap-4` | Numéro décoratif → carte : 24px → 16px. Compact et équilibré. |

---

## 5. Espacements déjà corrects (à conserver)

- **Hero** : `gap-6` (24px) entre paragraphe et CTA → conforme au guideline 16–24px.
- **ServiceCard** : `mb-6` (24px) image→titre et `mb-3` (12px) titre→description → valeurs raisonnables pour une carte.
- **ProjectCard** : `mb-4` (16px) image→titre et `mb-3` (12px) titre→category → corrects.
- **StepsSection** : `gap-10 lg:gap-x-16 lg:gap-y-14` dans la grille → espacement cohérent entre StepCards.
- **ProjectsSection** : `gap-8 sm:gap-10` dans le slider et `px-12` → adaptés au contexte de défilement horizontal.
- **StepCard** : padding interne `p-6 sm:p-8` et espacements titre/description → bien équilibrés.
- **Header** : `h-20` et `px-2` → cohérents avec le reste.

---

## 6. Ordre d'exécution recommandé

1. Corriger les sections HomePage (`HeroSection`, `AboutSection`, `ServicesSection`, `ProjectsSection`, `StepsSection`, `ContactSection`).
2. Corriger le `Footer`.
3. Corriger les cartes (`ProjectCard`, `StepCard`).
4. Vérifier visuellement en desktop, tablet et mobile.
5. Vérifier qu'aucun espace n'est devenu excessif ou trop compact.

---

## 7. Validation

- Hero respire correctement (pas de vide excessif en haut).
- Headings pas collés à leurs descriptions.
- Distances texte/image cohérentes.
- Distances entre sections claires.
- Distances texte/CTA conformes.
- Responsive mobile : espacements horizontal et vertical adaptés.
- Aucune valeur de spacing "exotique" introduite.
