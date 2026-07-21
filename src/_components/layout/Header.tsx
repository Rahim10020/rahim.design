import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import { ROUTES } from "../../routes";

export default function Header() {
  const navLinks = [
    { to: ROUTES.ABOUT, label: "About" },
    { to: ROUTES.PROJECTS.LIST, label: "Projects" },
  ];

  // const rightNavLinks = [
  //   { to: ROUTES.LEARN.LIST, label: "Learn" },
  //   { to: ROUTES.CONTACT, label: "Contact" },
  // ];

  return (
    <header className="sticky ">
      <div className="">
        {/* Logo */}
        <Logo size={32} />

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-lg font-normal text-background"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </nav>

        {/* Right */}
        <div className=""></div>
      </div>
    </header>
  );
}
