import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SEO from "../SEO";
import { applyDetectedLocale } from "../../lib/locale";
import { LocaleContext } from "../../lib/i18n";

export default function MainLayout() {
  const [locale] = useState(() => applyDetectedLocale());
  return (
    <LocaleContext.Provider value={locale}>
      <div className="flex min-h-screen flex-col">
        <SEO />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LocaleContext.Provider>
  );
}
