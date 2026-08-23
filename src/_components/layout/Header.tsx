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

export default function Header() {
  const [navOpen, setNavOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-background">
      <div className="max-w-7xl mx-auto px-2 py-5 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop expandable pill nav */}
        <div
          className={`hidden lg:flex items-center border-2 overflow-hidden transition-colors duration-500 ${
            navOpen ? "border-foreground" : ""
          }`}
        >
          {/* Sliding links track */}
          <div
            className="grid transition-[grid-template-columns] duration-500 ease-in-out"
            style={{ gridTemplateColumns: navOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden min-w-0 flex justify-end">
              <nav className="flex items-center whitespace-nowrap">
                {navLinks.map((link, i) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-foreground text-xl font-normal px-6 py-4 flex items-center gap-1 ${
                      i !== 0 ? "border-l border-foreground" : ""
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && <ArrowDownIcon size={16} />}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Toggle button (close icon lives here) */}
          <button
            className={`p-4 flex items-center justify-center cursor-pointer shrink-0 ${
              navOpen ? "border-l border-foreground" : ""
            }`}
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Toggle nav"
            aria-expanded={navOpen}
          >
            {navOpen ? <CloseIcon /> : <MenuIcon />}
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
        <div className="lg:hidden border-t border-gray-100 bg-white">
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
