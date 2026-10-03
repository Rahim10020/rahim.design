import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SEO from "../SEO";
import Preloader from "../ui/for-animation/Preloader";
import PageTransition from "../ui/for-animation/PageTransition";
import { applyDetectedLocale } from "../../lib/locale";
import { LocaleContext } from "../../lib/i18n";
import { ScrollTrigger } from "../../lib/gsap";
import ScrollToTop from "./ScrollToTop";

export default function MainLayout() {
  const [locale] = useState(() => applyDetectedLocale());
  const [ready, setReady] = useState(
    () =>
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("rd-preloader") === "1",
  );
  const handlePreloaderDone = useCallback(() => {
    setReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);
  return (
    <LocaleContext.Provider value={locale}>
      <ScrollToTop />
      {!ready && <Preloader onDone={handlePreloaderDone} />}
      <PageTransition />
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
