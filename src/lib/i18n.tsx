import { createContext, useContext } from "react";
import type { SupportedLocale } from "./locale";
import { DEFAULT_LOCALE } from "./locale";

export const LocaleContext = createContext<SupportedLocale>(DEFAULT_LOCALE);

export function useLocale(): SupportedLocale {
  return useContext(LocaleContext);
}

export type LocalizedString = { fr: string; en: string };

export function resolveLocalized(
  value: LocalizedString | string,
  locale: SupportedLocale,
): string {
  if (typeof value === "string") return value;
  return value[locale] ?? value.fr;
}
