import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import { CloseIcon, MenuIcon } from "../icons";
import { getNavItems } from "../../navigation";
import { useLocale } from "../../lib/i18n";
import { getUi } from "../../locales/ui";
import { useDesktop } from "./header/useDesktop";
import { useMobileMenuAnimation } from "./header/useMobileMenuAnimation";
import DesktopNav from "./header/DesktopNav";
import MobileMenu from "./header/MobileMenu";

export default function Header() {
  const locale = useLocale();
  const t = getUi(locale);
  const NAV_ITEMS = getNavItems(locale);
  const [navOpen, setNavOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDesktop = useDesktop();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { pathname, hash } = location;

  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const bottomCloseRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const firstLink = itemsRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        burgerRef.current?.focus();
      } else if (openDropdown) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen, openDropdown]);

  useMobileMenuAnimation({
    headerRef,
    overlayRef,
    itemsRef,
    bottomCloseRef,
    mobileMenuOpen,
    pathname,
    hash,
    onNavigate: () => setMobileMenuOpen(false),
  });

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        mobileMenuOpen && !isDesktop ? "bg-primary" : "bg-background"
      }`}
    >
      <div className="max-w-350 mx-auto flex h-20 items-center justify-between px-page-x">
        <Logo size={isDesktop ? 64 : 44} />

        <span className="lg:hidden text-2xl text-foreground">
          {t.nav.headerMobileTitle}
        </span>

        <DesktopNav
          items={NAV_ITEMS}
          pathname={pathname}
          hash={hash}
          isHome={isHome}
          navOpen={navOpen}
          onToggleNav={() => setNavOpen((v) => !v)}
          openDropdown={openDropdown}
          onDropdownChange={setOpenDropdown}
          hideLabel="Masquer la navigation"
          showLabel="Afficher la navigation"
        />

        <button
          ref={burgerRef}
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? (
            <CloseIcon strokeWidth={2} />
          ) : (
            <MenuIcon strokeWidth={2} />
          )}
        </button>
      </div>

      <MobileMenu
        items={NAV_ITEMS}
        pathname={pathname}
        hash={hash}
        isHome={isHome}
        mobileMenuOpen={mobileMenuOpen}
        overlayRef={overlayRef}
        itemsRef={itemsRef}
        bottomCloseRef={bottomCloseRef}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
