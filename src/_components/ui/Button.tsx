interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) {
  const base =
    "relative z-10 inline-flex items-center justify-center whitespace-nowrap cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-foreground border-2 border-foreground focus:ring-foreground-alt-a",
    secondary:
      "bg-foreground text-background border-2 border-foreground focus:ring-foreground",
  };

  // Effet 3D "raised" en CSS pur (aucun JS/GSAP) :
  // repos relevé (-4px), hover/clic écrasé sur l'ombre. Le bouton reste
  // relevé quand disabled (pas d'interaction).
  const pressEffect = disabled
    ? ""
    : "translate-[-4px_-4px] transition-transform duration-200 ease-out hover:translate-[0px_0px] hover:duration-150 active:translate-[0px_0px] active:duration-75";

  return (
    <div className="relative inline-flex w-fit">
      {/* Ombre dure, sous le bouton */}
      <div
        aria-hidden
        className="absolute inset-0 bg-foreground pointer-events-none"
      />
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${pressEffect} ${className}`}
      >
        {children}
      </button>
    </div>
  );
}
