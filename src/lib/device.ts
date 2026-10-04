/**
 * Détection appareil/réseau pour désactiver les animations coûteuses.
 * Même seuil (768px) partout : préloader, boucles GSAP.
 */

export function isMobileViewport(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches
    );
  } catch {
    return false;
  }
}

export function saveDataEnabled(): boolean {
  try {
    return (
      "connection" in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true
    );
  } catch {
    return false;
  }
}
