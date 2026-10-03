import { useSyncExternalStore } from "react";

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

const subscribeToDesktopMediaQuery = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

const getDesktopMediaQuerySnapshot = () =>
  window.matchMedia(DESKTOP_MEDIA_QUERY).matches;

const getServerDesktopMediaQuerySnapshot = () => false;

export function useDesktop(): boolean {
  return useSyncExternalStore(
    subscribeToDesktopMediaQuery,
    getDesktopMediaQuerySnapshot,
    getServerDesktopMediaQuerySnapshot,
  );
}
