import { useState } from "react";
import Logo from "../ui/Logo";
import { ArrowDownIcon, CloseIcon, MenuIcon } from "../icons";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Learn", href: "#learn", hasDropdown: true },
  { name: "Contact", href: "#contact" },
];

const learnLinks = [
  { name: "Books", href: "/learn?type=books" },
  { name: "Notes", href: "/learn?type=notes" },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="max-w-350 mx-auto flex h-26 items-center justify-between px-2">
        {/* Logo */}
        <Logo />

        {/* Desktop expandable pill nav */}
        <div
          className={`hidden lg:flex items-center border-2 overflow-visible transition-colors duration-500 ${
            navOpen ? "border-foreground" : ""
          }`}
        >
          {/* Sliding links track */}
          <div
            className="grid transition-[grid-template-columns] duration-500 ease-in-out"
            style={{ gridTemplateColumns: navOpen ? "1fr" : "0fr" }}
          >
            <div
              className={`${navOpen ? "overflow-visible" : "overflow-hidden"} flex min-w-0 justify-end`}
            >
              <nav className="flex items-center whitespace-nowrap">
                {navLinks.map((link, i) => {
                  const linkClassName = `text-foreground hover:bg-primary text-xl font-normal px-6 py-4 flex items-center gap-1 ${
                    i !== 0 ? "border-l-2 border-foreground" : ""
                  } ${i === 4 ? "border-r-2 border-foreground" : ""}`;

                  if (!link.hasDropdown) {
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        className={linkClassName}
                      >
                        {link.name}
                      </a>
                    );
                  }

                  return (
                    <div key={link.name} className="group relative">
                      <a href={link.href} className={linkClassName}>
                        {link.name}
                        <ArrowDownIcon
                          size={16}
                          strokeWidth={1.5}
                          className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                        />
                      </a>

                      <nav className="absolute left-0 top-full z-50 mt-1 hidden w-full border-2 border-foreground bg-background group-hover:block group-focus-within:block">
                        {learnLinks.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-6 py-3 text-xl text-foreground hover:bg-primary"
                          >
                            {item.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Toggle button (close icon lives here) */}
          <button
            className={`p-4 flex items-center justify-center cursor-pointer shrink-0`}
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

        {/* Mobile menu button (inchangé) */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu (inchangé) */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-full w-full border-t border-gray-100 bg-background shadow-sm lg:hidden">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#1e1e1e] text-base font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
