import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const base =
    "inline-flex items-center justify-center cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-foreground border-2 border-foreground focus:ring-primary",
    secondary:
      "bg-foreground text-background border-2 border-foreground focus:ring-foreground",
  };

  const { contextSafe } = useGSAP({ scope: wrapperRef });
  const lift = contextSafe((button: HTMLButtonElement) => {
    if (disabled) return;
    gsap.to(button, {
      x: -4,
      y: -4,
      duration: 0.18,
      ease: "power2.out",
    });
  });
  const rest = contextSafe((button: HTMLButtonElement) => {
    if (disabled) return;
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.18,
      ease: "power2.out",
    });
  });

  const press = contextSafe((button: HTMLButtonElement) => {
    if (disabled) return;
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.08,
      ease: "power1.out",
    });
  });

  const release = contextSafe((button: HTMLButtonElement) => {
    if (disabled) return;
    gsap.to(button, {
      x: -4,
      y: -4,
      duration: 0.12,
      ease: "power2.out",
    });
  });

  return (
    <div ref={wrapperRef} className="relative inline-block">
      {/* Ombre dure, sous le bouton */}
      <div
        aria-hidden
        className="absolute inset-0 bg-foreground pointer-events-none"
      />
      <button
        ref={buttonRef}
        type={type}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={(event) => lift(event.currentTarget)}
        onMouseLeave={(event) => rest(event.currentTarget)}
        onMouseDown={(event) => press(event.currentTarget)}
        onMouseUp={(event) => release(event.currentTarget)}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    </div>
  );
}
