/**
 * Détection du mode pré-rendu (crawl Playwright `?prerender=1`).
 * Utilisé pour bypasser les animations bloquantes (Preloader, PageTransition)
 * et forcer la locale FR pendant la génération du HTML statique.
 */
export function isPrerender(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    if (params.has("prerender")) return true;
    return (
      (navigator as Navigator & { webdriver?: boolean }).webdriver === true
    );
  } catch {
    return false;
  }
}
