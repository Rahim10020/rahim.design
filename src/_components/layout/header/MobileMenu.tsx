import { Link } from "react-router-dom";
import type { RefObject } from "react";
import { CloseIcon } from "../../icons";
import type { NavItem } from "../../../navigation";
import { isNavItemActive } from "./navActive";

type MobileMenuProps = {
  items: NavItem[];
  pathname: string;
  hash: string;
  isHome: boolean;
  mobileMenuOpen: boolean;
  overlayRef: RefObject<HTMLDivElement | null>;
  itemsRef: RefObject<HTMLDivElement | null>;
  bottomCloseRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};

export default function MobileMenu({
  items,
  pathname,
  hash,
  isHome,
  mobileMenuOpen,
  overlayRef,
  itemsRef,
  bottomCloseRef,
  onClose,
}: MobileMenuProps) {
  return (
    <div
      ref={overlayRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      aria-hidden={!mobileMenuOpen}
      inert={!mobileMenuOpen}
      className="lg:hidden fixed left-0 top-20 z-40 flex h-[calc(100vh-5rem)] w-full flex-col bg-primary-alt"
      style={{ visibility: "hidden" }}
    >
      <nav
        ref={itemsRef}
        className="flex flex-1 flex-col items-center justify-center gap-8"
      >
        {items.map((link) => {
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
                onClick={onClose}
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
                onClick={onClose}
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
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              to={`/${link.href}`}
              className={itemClass}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        ref={bottomCloseRef}
        onClick={onClose}
        aria-label="Fermer le menu"
        className="mb-32 flex justify-center text-background"
      >
        <CloseIcon size={32} />
      </button>
    </div>
  );
}
