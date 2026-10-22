import { gsap, prefersReducedMotion } from "../../../lib/gsap";

/**
 * Anime la révélation des cartes d'une liste filtrée.
 * Retourne le contexte GSAP pour pouvoir l'annuler au changement suivant.
 */
export function animateFilterReveal(container: HTMLElement) {
  if (prefersReducedMotion()) return null;

  const cards = sortByVisualPosition(
    Array.from(container.querySelectorAll<HTMLElement>(":scope > *")),
  );

  const curtains = cards.flatMap((card) =>
    Array.from(card.querySelectorAll<HTMLElement>("[data-filter-curtain]")),
  );
  const media = cards.flatMap((card) =>
    Array.from(card.querySelectorAll<HTMLElement>("img, video")),
  );
  const titles = cards.flatMap((card) =>
    Array.from(card.querySelectorAll<HTMLElement>("[data-filter-title]")),
  );

  if (curtains.length === 0) return null;

  // Plus court sur mobile pour garder un retour instantané.
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const stagger = isMobile ? 0.035 : 0.045;
  const curtainDuration = isMobile ? 0.45 : 0.5;

  return gsap.context(() => {
    gsap.set(curtains, {
      scaleY: 1,
      transformOrigin: "bottom center",
    });

    if (media.length > 0) {
      gsap.set(media, { scale: 1.04 });
    }

    if (titles.length > 0) {
      gsap.set(titles, { autoAlpha: 0, y: 10 });
    }

    const tl = gsap.timeline();

    tl.to(curtains, {
      scaleY: 0,
      duration: curtainDuration,
      ease: "power3.inOut",
      stagger,
      overwrite: "auto",
    });

    if (media.length > 0) {
      tl.to(
        media,
        {
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger,
          clearProps: "transform",
          overwrite: "auto",
        },
        0,
      );
    }

    if (titles.length > 0) {
      tl.to(
        titles,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          stagger,
          clearProps: "opacity,visibility,transform",
          overwrite: "auto",
        },
        0.15,
      );
    }
  }, container);
}

/** Ordonne les cartes de haut en bas puis de gauche à droite (masonry). */
function sortByVisualPosition(cards: HTMLElement[]) {
  return cards
    .map((card) => ({ card, rect: card.getBoundingClientRect() }))
    .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left)
    .map(({ card }) => card);
}
