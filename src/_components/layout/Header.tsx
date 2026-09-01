import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import { ArrowDownIcon, CloseIcon, MenuIcon } from "../icons";
import { NAV_ITEMS, type NavItem } from "../../navigation.ts";

const isNavItemActive = (item: NavItem, pathname: string, hash: string) => {
  if (item.kind === "route") {
    if (item.children) {
      return item.children.some(
        (child) => pathname === child.to || pathname.startsWith(`${child.to}/`),
      );
    }

    return pathname === item.to || pathname.startsWith(`${item.to}/`);
  }

  const targetHash = item.href.replace(/^#/, "");

  return pathname === "/" && hash === `#${targetHash}`;
};

export default function Header() {
  const [navOpen, setNavOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAnchorSectionActive = (href: string) => {
    const sectionId = href.replace(/^#/, "");
    return pathname === "/" && hash === `#${sectionId}`;
  };
  const { pathname, hash } = location;

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="max-w-350 mx-auto flex h-20 items-center justify-between px-2">
        <Logo />

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
                      <div key={link.label} className="group relative">
                        <Link
                          to={link.to}
                          className={linkClassName}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {link.label}
                          <ArrowDownIcon
                            size={16}
                            strokeWidth={1.5}
                            className="transition-transform group-hover:rotate-180 ml-2 group-focus-within:rotate-180"
                          />
                        </Link>

                        <nav className="absolute left-0 top-full z-50 mt-1 hidden w-full border-2 border-foreground bg-background group-hover:block group-focus-within:block">
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

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute left-0 top-full w-full border-t border-gray-100 bg-background shadow-sm lg:hidden">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {NAV_ITEMS.map((link) => {
              const isActive = isNavItemActive(link, pathname, hash);

              return (
                <div key={link.label} className="flex flex-col gap-2">
                  {link.kind === "route" ? (
                    <Link
                      to={link.to}
                      className={`text-base font-medium py-2 ${
                        isActive ? "bg-primary px-2" : "text-[#1e1e1e]"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  ) : isHome ? (
                    <a
                      href={link.href}
                      className={`text-base font-medium py-2 ${
                        isAnchorSectionActive(link.href)
                          ? "bg-primary px-2"
                          : "text-[#1e1e1e]"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={
                        isAnchorSectionActive(link.href) ? "page" : undefined
                      }
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={`/${link.href}`}
                      className={`text-base font-medium py-2 ${
                        isAnchorSectionActive(link.href)
                          ? "bg-primary px-2"
                          : "text-[#1e1e1e]"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={
                        isAnchorSectionActive(link.href) ? "page" : undefined
                      }
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.kind === "route" && link.children && (
                    <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
                      {link.children.map((child) => {
                        const childIsActive =
                          pathname === child.to ||
                          pathname.startsWith(`${child.to}/`);

                        return (
                          <Link
                            key={child.label}
                            to={child.to}
                            className={`text-sm py-1 ${
                              childIsActive
                                ? "bg-primary px-2 text-[#1e1e1e]"
                                : "text-[#1e1e1e]/80"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                            aria-current={childIsActive ? "page" : undefined}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
