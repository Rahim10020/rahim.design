import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SEO from "../SEO";
import { applyDetectedLocale } from "../../lib/locale";

export default function MainLayout() {
  useEffect(() => {
    applyDetectedLocale();
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <SEO />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
