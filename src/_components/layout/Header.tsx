import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import { ROUTES } from "../../routes";

export default function Header() {
  const navLinks = [
    { to: ROUTES.ABOUT, label: "About" },
    { to: ROUTES.PROJECTS.LIST, label: "Projects" },
    { to: ROUTES.LEARN.LIST, label: "Learn" },
    { to: ROUTES.CONTACT, label: "Contact" },
  ];

  return (
    <header className="bg-primary">
      <div className="flex items-center justify-between py-8 px-6">
        <Link to={ROUTES.HOME}>
          <Logo />
        </Link>
        <nav className="flex items-center justify-between gap-16">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-lg font-medium text-foreground"
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
