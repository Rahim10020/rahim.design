import { useCallback, useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SEO from "../SEO";
import Preloader from "../ui/for-animation/Preloader";
import PageTransition from "../ui/for-animation/PageTransition";
import { applyDetectedLocale } from "../../lib/locale";
import { LocaleContext } from "../../lib/i18n";
import { isPrerender } from "../../lib/prerender";
import { ScrollTrigger } from "../../lib/gsap";

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
      (typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem("rd-preloader") === "1"),
  );
  const handlePreloaderDone = useCallback(() => {
    setReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);
  return (
    <LocaleContext.Provider value={locale}>
      <ScrollRestoration />
      <MainFocus />
      {!ready && <Preloader onDone={handlePreloaderDone} />}
      {!prerender && <PageTransition />}
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
