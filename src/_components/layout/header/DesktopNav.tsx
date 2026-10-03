import { ArrowDownIcon, CloseIcon, MenuIcon } from "../../icons";
import { LiquidHoverAnchor, LiquidHoverLink } from "../../ui/LiquidHover";
import type { NavItem } from "../../../navigation";
import { isAnchorSectionActive, isNavItemActive } from "./navActive";

type DesktopNavProps = {
  items: NavItem[];
  pathname: string;
  hash: string;
  isHome: boolean;
  navOpen: boolean;
  onToggleNav: () => void;
  openDropdown: string | null;
  onDropdownChange: (label: string | null) => void;
  hideLabel: string;
  showLabel: string;
};

export default function DesktopNav({
  items,
  pathname,
  hash,
  isHome,
  navOpen,
  onToggleNav,
  openDropdown,
  onDropdownChange,
  hideLabel,
  showLabel,
}: DesktopNavProps) {
  return (
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
            {items.map((link, i) => {
              const isActive = isNavItemActive(link, pathname, hash);
              const linkClassName = `text-foreground text-xl font-normal px-6 py-4 ${
                i !== 0 ? "border-l-2 border-foreground" : ""
              } ${i === 4 ? "border-r-2 border-foreground" : ""} ${
                isActive ? "bg-primary" : "bg-transparent"
              }`;

              if (link.kind === "route" && link.children) {
                const dropdownOpen = openDropdown === link.label;
                return (
                  <div
                    key={link.label}
                    className="group relative"
                    onMouseEnter={() => onDropdownChange(link.label)}
                    onMouseLeave={() => onDropdownChange(null)}
                    onFocus={() => onDropdownChange(link.label)}
                    onBlur={(event) => {
                      if (
                        !event.currentTarget.contains(event.relatedTarget)
                      ) {
                        onDropdownChange(null);
                      }
                    }}
                  >
                    <LiquidHoverLink
                      to={link.to}
                      active={isActive}
                      className={linkClassName}
                      aria-current={isActive ? "page" : undefined}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                      onClick={() =>
                        onDropdownChange(dropdownOpen ? null : link.label)
                      }
                    >
                      {link.label}
                      <ArrowDownIcon
                        size={16}
                        strokeWidth={1.5}
                        className={`ml-2 transition-transform ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </LiquidHoverLink>

                    <nav
                      aria-label={`Sous-menu ${link.label}`}
                      className={`absolute left-0 top-full z-50 mt-1 w-full border-2 border-foreground bg-background ${
                        dropdownOpen ? "block" : "hidden"
                      }`}
                    >
                      {link.children.map((item) => {
                        const childIsActive =
                          pathname === item.to ||
                          pathname.startsWith(`${item.to}/`);

                        return (
                          <LiquidHoverLink
                            key={item.label}
                            to={item.to}
                            active={childIsActive}
                            className={`block px-6 py-3 text-xl text-foreground ${
                              childIsActive
                                ? "bg-primary"
                                : "bg-transparent"
                            }`}
                            onClick={() => onDropdownChange(null)}
                            aria-current={
                              childIsActive ? "page" : undefined
                            }
                          >
                            {item.label}
                          </LiquidHoverLink>
                        );
                      })}
                    </nav>
                  </div>
                );
              }

              if (link.kind === "external") {
                return (
                  <LiquidHoverAnchor
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    active={false}
                    className={linkClassName}
                  >
                    {link.label}
                  </LiquidHoverAnchor>
                );
              }

              if (link.kind === "route") {
                return (
                  <LiquidHoverLink
                    key={link.label}
                    to={link.to}
                    active={isActive}
                    className={linkClassName}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </LiquidHoverLink>
                );
              }

              return isHome ? (
                <LiquidHoverAnchor
                  key={link.label}
                  href={link.href}
                  active={isAnchorSectionActive(link.href, pathname, hash)}
                  className={`${linkClassName} ${
                    isAnchorSectionActive(link.href, pathname, hash)
                      ? "bg-primary"
                      : ""
                  }`}
                  aria-current={
                    isAnchorSectionActive(link.href, pathname, hash)
                      ? "page"
                      : undefined
                  }
                >
                  {link.label}
                </LiquidHoverAnchor>
              ) : (
                <LiquidHoverLink
                  key={link.label}
                  to={`/${link.href}`}
                  active={isAnchorSectionActive(link.href, pathname, hash)}
                  className={`${linkClassName} ${
                    isAnchorSectionActive(link.href, pathname, hash)
                      ? "bg-primary"
                      : ""
                  }`}
                  aria-current={
                    isAnchorSectionActive(link.href, pathname, hash)
                      ? "page"
                      : undefined
                  }
                >
                  {link.label}
                </LiquidHoverLink>
              );
            })}
          </nav>
        </div>
      </div>

      <button
        className="flex shrink-0 cursor-pointer items-center justify-center p-4"
        onClick={onToggleNav}
        aria-label={navOpen ? hideLabel : showLabel}
        aria-expanded={navOpen}
      >
        {navOpen ? (
          <CloseIcon strokeWidth={1.5} />
        ) : (
          <MenuIcon strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
