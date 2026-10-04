/**
 * No-op conservé pour compatibilité (ProjectCard, pages learn) :
 * le renderer markdown est désormais léger et synchrone (~quelques Ko),
 * aucun chunk à précharger au survol.
 */
export function prefetchMarkdown(): void {}
