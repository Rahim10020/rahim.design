# Plan — Inversion du comportement hover du Button

## Contexte

Le composant `src/_components/ui/Button.tsx` a actuellement :
- État par défaut : (0, 0)
- Hover (mouseEnter) → animé vers (-4, -4) via `lift`
- Leave (mouseLeave) → animé vers (0, 0) via `rest`
- Press (mouseDown) → (0, 0) — inchangé
- Release (mouseUp) → (-4, -4) — inchangé

L'utilisateur veut inverser : par défaut le bouton est en position levée (-4,-4), et au hover il descend en position repos (0,0).

## Décision sur press/release

press=(0,0) et release=(-4,-4) restent inchangés (confirmé par l'utilisateur). Cela donne :
- Default: (-4,-4)
- Hover: (0,0)
- Press: (0,0) — le bouton appuyé reste en repos
- Release: (-4,-4) — le bouton relâché retourne en position levée

Cela reste cohérent visuellement : relâcher le bouton le fait "relever".

## Changements à faire

### Fichier : `src/_components/ui/Button.tsx`

1. **Ajouter l'état initial levé au montage** — Dans le callback `useGSAP`, appeler `gsap.set(buttonRef.current, { x: -4, y: -4 })` pour positionner le bouton en (-4,-4) dès le premier rendu (évite le flash en (0,0)).

2. **Inverser les positions de `lift` et `rest`** :
   - `lift` (déclenché par mouseEnter) : animer vers **(0, 0)** au lieu de (-4, -4)
   - `rest` (déclenché par mouseLeave) : animer vers **(-4, -4)** au lieu de (0, 0)

3. **Renommer les fonctions** pour refléter la nouvelle sémantique :
   - `lift` → `settle` (le bouton se pose au repos au hover)
   - `rest` → `raise` (le bouton se relève en quittant)

4. **Les fonctions `press` et `release`** restent identiques (mêmes cibles et animations).

5. **Les handlers JSX** restent les mêmes (onMouseEnter → `settle`, onMouseLeave → `raise`, etc.), seules les définitions des fonctions changent.

### Aucun changement ailleurs
- Pas de modification layout (confirmé)
- Pas de test existant pour ce composant
- Pas d'impact sur les pages consommatrices (ContactSection, About, HeroSection, Services, projects)

## Vérification

- [ ] Le bouton s'affiche initialement décalé en haut-gauche (-4,-4) avec l'ombre visible en bas-droite
- [ ] Au survol, le bouton anime vers (0,0) — l'ombre disparaît derrière lui
- [ ] Au départ du survol, le bouton anime vers (-4,-4) — l'ombre réapparaît
- [ ] Le clic (mouseDown) remet le bouton en (0,0), le relâcher (mouseUp) le remet en (-4,-4)
- [ ] Le bouton disabled ignore tous les animations (conditions déjà existantes)
- [ ] Vérifier visuellement dans le navigateur qu'il n'y a pas de flash en (0,0) au montage
