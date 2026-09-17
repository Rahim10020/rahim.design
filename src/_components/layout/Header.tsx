import { useState, useRef, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import { ArrowDownIcon, CloseIcon, MenuIcon } from "../icons";
import { NAV_ITEMS, type NavItem } from "../../navigation.ts";
import { gsap, useGSAP } from "../../lib/gsap";

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

const subscribeToDesktopMediaQuery = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

const getDesktopMediaQuerySnapshot = () =>
  window.matchMedia(DESKTOP_MEDIA_QUERY).matches;

const getServerDesktopMediaQuerySnapshot = () => false;

const isNavItemActive = (item: NavItem, pathname: string, hash: string) => {
  if (item.kind === "route") {
    if (item.children) {
      return item.children.some(
        (child) => pathname === child.to || pathname.startsWith(`${child.to}/`),
      );
    }
    return pathname === item.to || pathname.startsWith(`${item.to}/`);
  }

  if (item.kind === "external") {
    return false;
  }

  const targetHash = item.href.replace(/^#/, "");
  return pathname === "/" && hash === `#${targetHash}`;
};

export default function Header() {
  const [navOpen, setNavOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopMediaQuery,
    getDesktopMediaQuerySnapshot,
    getServerDesktopMediaQuerySnapshot,
  );
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { pathname, hash } = location;

  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const bottomCloseRef = useRef<HTMLButtonElement>(null);

  const isAnchorSectionActive = (href: string) => {
    const sectionId = href.replace(/^#/, "");
    return pathname === "/" && hash === `#${sectionId}`;
  };

  /* ------------------------------------------------------------------
   *  Setup initial : overlay caché, items préparés pour l'animation
   * ------------------------------------------------------------------ */
  useGSAP(
    () => {
      gsap.set(overlayRef.current, {
        autoAlpha: 0,
        scaleY: 0,
        transformOrigin: "top center",
      });
      gsap.set(itemsRef.current?.children ?? [], {
        y: 40,
        autoAlpha: 0,
      });
      gsap.set(bottomCloseRef.current, {
        autoAlpha: 0,
        scale: 0.8,
      });
    },
    { scope: headerRef },
  );

  /* ------------------------------------------------------------------
   *  Réaction à l'ouverture / fermeture du menu mobile
   * ------------------------------------------------------------------ */
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const items = itemsRef.current?.children;
      const bottomClose = bottomCloseRef.current;
      if (!overlay || !items || !bottomClose) return;

      if (mobileMenuOpen) {
        // OUVERTURE
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(overlay, {
          autoAlpha: 1,
          scaleY: 1,
          duration: 0.4,
        })
          .to(
            items,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.08,
            },
            "-=0.2", // commence légèrement avant la fin de l'overlay
          )
          .to(
            bottomClose,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.3,
            },
            "-=0.15",
          );
      } else {
        // FERMETURE
        const tl = gsap.timeline({ defaults: { ease: "power2.in" } });

        tl.to(bottomClose, {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.2,
        })
          .to(
            items,
            {
              y: -20,
              autoAlpha: 0,
              duration: 0.25,
              stagger: { each: 0.05, from: "end" },
            },
            "-=0.1",
          )
          .to(
            overlay,
            {
              autoAlpha: 0,
              scaleY: 0,
              duration: 0.35,
              ease: "power3.inOut",
            },
            "-=0.1",
          );
      }
    },
    { dependencies: [mobileMenuOpen], scope: headerRef },
  );

  /* ------------------------------------------------------------------
   *  Fermer le menu mobile quand on change de route
   * ------------------------------------------------------------------ */
  useGSAP(
    () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    },
    { dependencies: [pathname, hash], scope: headerRef },
  );

  /* ------------------------------------------------------------------
   *  Bloquer le scroll body quand le menu mobile est ouvert
   * ------------------------------------------------------------------ */
  useGSAP(
    () => {
      document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    },
    { dependencies: [mobileMenuOpen], scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        mobileMenuOpen && !isDesktop ? "bg-primary" : "bg-background"
      }`}
    >
      <div className="max-w-350 mx-auto flex h-20 items-center justify-between px-page-x">
        <Logo size={isDesktop ? 64 : 48} />

        {/* ----- Titre mobile ----- */}
        <span className="lg:hidden text-2xl text-foreground">
          Designer/Coder
        </span>

        {/* ----- Nav desktop ----- */}
        <div
          className={`hidden lg:flex items-center border-2 overflow-visible transition-colors duration-500 ${
            navOpen ? "border-foreground" : ""
          }`}
        >
          <div
            className="grid transition-[grid-template-columns] duration-500 ease-in-out"
            style={{ gridTemplateColumns: navOpen ? "1fr" : "0fr" }}
          >
            <div
              className={`${navOpen ? "overflow-visible" : "overflow-hidden"} flex min-w-0 justify-end`}
            >
              <nav className="flex items-center whitespace-nowrap">
                {NAV_ITEMS.map((link, i) => {
                  const isActive = isNavItemActive(link, pathname, hash);
                  const linkClassName = `text-foreground hover:bg-primary text-xl font-normal px-6 py-4 flex items-center gap-1 transition-colors ${
                    i !== 0 ? "border-l-2 border-foreground" : ""
                  } ${i === 4 ? "border-r-2 border-foreground" : ""} ${
                    isActive ? "bg-primary" : ""
                  }`;

                  if (link.kind === "route" && link.children) {
                    return (
                      <div
                        key={link.label}
                        className="group relative"
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        onFocus={() => setOpenDropdown(link.label)}
                        onBlur={(event) => {
                          if (
                            !event.currentTarget.contains(event.relatedTarget)
                          ) {
                            setOpenDropdown(null);
                          }
                        }}
                      >
                        <Link
                          to={link.to}
                          className={linkClassName}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {link.label}
                          <ArrowDownIcon
                            size={16}
                            strokeWidth={1.5}
                            className={`ml-2 transition-transform ${
                              openDropdown === link.label ? "rotate-180" : ""
                            }`}
                          />
                        </Link>

                        <nav
                          className={`absolute left-0 top-full z-50 mt-1 w-full border-2 border-foreground bg-background ${
                            openDropdown === link.label ? "block" : "hidden"
                          }`}
                        >
                          {link.children.map((item) => {
                            const childIsActive =
                              pathname === item.to ||
                              pathname.startsWith(`${item.to}/`);

                            return (
                              <Link
                                key={item.label}
                                to={item.to}
                                className={`block px-6 py-3 text-xl text-foreground hover:bg-primary ${
                                  childIsActive ? "bg-primary" : ""
                                }`}
                                onClick={() => setOpenDropdown(null)}
                                aria-current={
                                  childIsActive ? "page" : undefined
                                }
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </nav>
                      </div>
                    );
                  }

                  if (link.kind === "external") {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClassName}
                      >
                        {link.label}
                      </a>
                    );
                  }

                  if (link.kind === "route") {
                    return (
                      <Link
                        key={link.label}
                        to={link.to}
                        className={linkClassName}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    );
                  }

                  return isHome ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`${linkClassName} ${
                        isAnchorSectionActive(link.href) ? "bg-primary" : ""
                      }`}
                      aria-current={
                        isAnchorSectionActive(link.href) ? "page" : undefined
                      }
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={`/${link.href}`}
                      className={`${linkClassName} ${
                        isAnchorSectionActive(link.href) ? "bg-primary" : ""
                      }`}
                      aria-current={
                        isAnchorSectionActive(link.href) ? "page" : undefined
                      }
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <button
            className="flex shrink-0 cursor-pointer items-center justify-center p-4"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Toggle nav"
            aria-expanded={navOpen}
          >
            {navOpen ? (
              <CloseIcon strokeWidth={1.5} />
            ) : (
              <MenuIcon strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* ----- Burger mobile ----- */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <CloseIcon strokeWidth={2} />
          ) : (
            <MenuIcon strokeWidth={2} />
          )}
        </button>
      </div>

      {/* ----- Overlay mobile ----- */}
      <div
        ref={overlayRef}
        className="lg:hidden fixed left-0 top-20 z-40 flex h-[calc(100vh-5rem)] w-full flex-col bg-primary-alt"
        style={{ visibility: "hidden" }}
      >
        <nav
          ref={itemsRef}
          className="flex flex-1 flex-col items-center justify-center gap-8"
        >
          {NAV_ITEMS.map((link) => {
            const isActive = isNavItemActive(link, pathname, hash);
            const itemClass = `text-4xl transition-colors ${
              isActive ? "text-primary" : "text-white hover:text-primary"
            }`;

            if (link.kind === "route") {
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={itemClass}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            }

            if (link.kind === "external") {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={itemClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            }

            return isHome ? (
              <a
                key={link.label}
                href={link.href}
                className={itemClass}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={`/${link.href}`}
                className={itemClass}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Croix du bas */}
        <button
          ref={bottomCloseRef}
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
          className="mb-10 flex justify-center text-background"
        >
          <CloseIcon strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
