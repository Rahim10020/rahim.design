import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="px-comfortable py-block lg:py-comfortable max-w-350 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-block">
          {/* Left - Copyright */}
          <div className="flex items-center gap-tight text-foreground text-xl order-2 lg:order-1">
            <span className="flex items-center gap-1.5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9.5" />
                <path d="M15.5 9.03A4.5 4.5 0 0 0 8.5 12a4.5 4.5 0 0 0 7 3.47" />
              </svg>
              26
            </span>
            <span>All Rights Reserved</span>
          </div>

          {/* Center - Name + Logo */}
          <div className="flex items-center gap-element order-1 lg:order-2">
            <span className="text-foreground text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-none">
              rahim
            </span>

            {/* Logo */}
            <Logo />
          </div>

          {/* Right - Tagline */}
          <div className="text-foreground text-xl order-3">Made w/ hate</div>
        </div>
      </div>
    </footer>
  );
}
