import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import { ArrowDownIcon, CloseIcon, MenuIcon } from "../icons";
import { NAV_ITEMS } from "../../navigation.ts";

export default function Header() {
  const [navOpen, setNavOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="max-w-350 mx-auto flex h-26 items-center justify-between px-2">
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
                  const linkClassName = `text-foreground hover:bg-primary text-xl font-normal px-6 py-4 flex items-center gap-1 ${
                    i !== 0 ? "border-l-2 border-foreground" : ""
                  } ${i === 4 ? "border-r-2 border-foreground" : ""}`;

                  if (link.kind === "route" && link.children) {
                    return (
                      <div key={link.label} className="group relative">
                        <Link to={link.to} className={linkClassName}>
                          {link.label}
                          <ArrowDownIcon
                            size={16}
                            strokeWidth={1.5}
                            className="transition-transform group-hover:rotate-180 ml-2 group-focus-within:rotate-180"
                          />
                        </Link>

                        <nav className="absolute left-0 top-full z-50 mt-1 hidden w-full border-2 border-foreground bg-background group-hover:block group-focus-within:block">
                          {link.children.map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              className="block px-6 py-3 text-xl text-foreground hover:bg-primary"
                            >
                              {item.label}
                            </Link>
                          ))}
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
                      >
                        {link.label}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className={linkClassName}
                    >
                      {link.label}
                    </a>
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
            {NAV_ITEMS.map((link) => (
              <div key={link.label} className="flex flex-col gap-2">
                {link.kind === "route" ? (
                  <Link
                    to={link.to}
                    className="text-[#1e1e1e] text-base font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-[#1e1e1e] text-base font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )}

                {link.kind === "route" && link.children && (
                  <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        className="text-sm text-[#1e1e1e]/80 py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
