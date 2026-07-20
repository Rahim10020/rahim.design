// const navLinks = [
//   { to: '/', label: 'Accueil' },
//   { to: '/about', label: 'About' },
//   { to: '/projects', label: 'Projets' },
//   { to: '/learn', label: 'Learn' },
//   { to: '/contact', label: 'Contact' },
// ];

export default function Header() {
  return (
    <header className="bg-primary">
      <div className="flex items-center justify-between py-8 px-6">
        <div>
          <h2>Rahim</h2>
        </div>
        <nav className="flex items-center justify-between gap-16">
          <li>
            <a href="#" className="text-lg font-medium text-foreground">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-lg font-medium text-foreground">
              Projects
            </a>
          </li>
          <li>
            <a href="#" className="text-lg font-medium text-foreground">
              Learn
            </a>
          </li>
          <li>
            <a href="#" className="text-lg font-medium text-foreground">
              Contact
            </a>
          </li>
        </nav>
      </div>
    </header>
  );
}
