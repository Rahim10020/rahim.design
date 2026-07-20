import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import { ROUTES } from "../../routes";

export default function Header() {
  const leftNavLinks = [
    { to: ROUTES.ABOUT, label: "About" },
    { to: ROUTES.PROJECTS.LIST, label: "Projects" },
  ];

  const rightNavLinks = [
    { to: ROUTES.LEARN.LIST, label: "Learn" },
    { to: ROUTES.CONTACT, label: "Contact" },
  ];

  return (
    <header className="bg-foreground flex items-center">
      <div className="flex items-center justify-between py-8 px-6">
        <Logo size={32} />
        <nav className="flex items-center justify-between gap-16">
          {leftNavLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-lg font-normal text-background"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {rightNavLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-lg font-normal text-background border-l border-background"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </nav>
      </div>
    </header>
  );
}
