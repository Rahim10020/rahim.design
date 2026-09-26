/**
 * Détection de langue automatique, sans UI.
 *
 * Contrainte : pas de switcher dans le header.
 * Ce module ne fait QUE détecter + appliquer `document.documentElement.lang`.
 * Il servira plus tard à initialiser le système de traduction (Fr/En).
 *
 * Ordre de priorité :
 * 1. `?lang=fr|en` dans l'URL (lien partageable, ex: /?lang=fr)
 * 2. `localStorage["rahim-locale"]` (choix/détection mémorisé)
 * 3. `navigator.languages[0] ?? navigator.language` (langue du navigateur)
 * 4. Fallback `en` (contenu actuel du site en anglais)
 */

export type SupportedLocale = "fr" | "en";

export const DEFAULT_LOCALE: SupportedLocale = "fr";
const STORAGE_KEY = "rahim-locale";

function normalizeLocale(value: string | null | undefined): SupportedLocale | null {
  if (!value) return null;
  const lower = value.toLowerCase();
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("en")) return "en";
  return null;
}

function readStoredLocale(): SupportedLocale | null {
  try {
    return normalizeLocale(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function readUrlLocale(): SupportedLocale | null {
  try {
    const param = new URLSearchParams(window.location.search).get("lang");
    return normalizeLocale(param);
  } catch {
    return null;
  }
}

function readBrowserLocale(): SupportedLocale | null {
  try {
    const candidates = Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];
    for (const candidate of candidates) {
      const locale = normalizeLocale(candidate);
      if (locale) return locale;
    }
    return null;
  } catch {
    return null;
  }
}

export function detectLocale(): SupportedLocale {
  // 1. URL explicite prioritaire (partageable, sans UI)
  const fromUrl = readUrlLocale();
  if (fromUrl) {
    persistLocale(fromUrl);
    return fromUrl;
  }

  // 2. Valeur déjà mémorisée
  const stored = readStoredLocale();
  if (stored) return stored;

  // 3. Langue du navigateur
  const fromBrowser = readBrowserLocale();
  const resolved = fromBrowser ?? DEFAULT_LOCALE;

  // 4. Mémorise pour les visites suivantes (évite de re-détecter à chaque fois)
  persistLocale(resolved);
  return resolved;
}

export function persistLocale(locale: SupportedLocale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // stockage indisponible (mode privé) : on ignore, la détection reste fonctionnelle
  }
}

/**
 * Applique la locale détectée au document.
 * À appeler une fois au montage (MainLayout).
 * Retourne la locale pour un futur système de traduction.
 */
export function applyDetectedLocale(): SupportedLocale {
  const locale = detectLocale();
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
  return locale;
}
