import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SEO from "../SEO";
import { applyDetectedLocale } from "../../lib/locale";
import { LocaleContext } from "../../lib/i18n";
import { isPrerender } from "../../lib/prerender";
import { isMobileViewport } from "../../lib/device";
import { initVitals } from "../../lib/vitals";

// Overlays animés GSAP en lazy : le chunk gsap ne part que si l'overlay
// est réellement monté, jamais au chargement initial.
const Preloader = lazy(() => import("../ui/for-animation/Preloader"));
const PageTransition = lazy(
  () => import("../ui/for-animation/PageTransition"),
);

function MainFocus() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export default function MainLayout() {
  const [locale] = useState(() => applyDetectedLocale());
  // Pré-rendu : pas d'overlay bloquant, HTML final direct dans le snapshot
  const [prerender] = useState(() => isPrerender());
  const [ready, setReady] = useState(
    () =>
      prerender ||
      // Mobile : jamais d'overlay (le chunk GSAP du préloader ne charge même pas).
      isMobileViewport() ||
      (typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem("rd-preloader") === "1"),
  );
  // Parité hydratation : le premier render est identique au snapshot
  // pré-rendu (aucun overlay), les overlays ne montent qu'après paint.
  // rAF : async donc pas de render en cascade, et montage après le paint.
  const [painted, setPainted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setPainted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  // Mesure terrain temporaire (voir lib/vitals.ts).
  const { pathname } = useLocation();
  useEffect(() => {
    initVitals(pathname);
  }, [pathname]);
  const handlePreloaderDone = useCallback(() => {
    setReady(true);
    // Refresh différé : charge gsap à la demande, hors chemin critique.
    void import("../../lib/gsap").then(({ ScrollTrigger }) => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  }, []);
  return (
    <LocaleContext.Provider value={locale}>
      <ScrollRestoration />
      <MainFocus />
      <Suspense fallback={null}>
        {!ready && painted && <Preloader onDone={handlePreloaderDone} />}
        {!prerender && painted && <PageTransition />}
      </Suspense>
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      <div className="flex min-h-screen flex-col">
        <SEO />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LocaleContext.Provider>
  );
}
