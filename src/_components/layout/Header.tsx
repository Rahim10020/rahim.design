// const navLinks = [
//   { to: '/', label: 'Accueil' },
//   { to: '/about', label: 'About' },
//   { to: '/projects', label: 'Projets' },
//   { to: '/learn', label: 'Learn' },
//   { to: '/contact', label: 'Contact' },
// ];

export default function Header() {
  return (
    <header className="py-8 px-6 bg-red-500">
      <div className="flex items-center justify-between">
        <div>
          <h2>Rahim</h2>
        </div>
        <nav className="flex items-center justify-between gap-8">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">Learn</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </nav>
      </div>
    </header>
  );
}
