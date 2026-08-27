import { useRef } from "react";
import { gspa, useGSAP } from "../../lib/gsap";

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
    "inline-flex items-center justify-center cursor-pointer font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-foreground border-2 border-foreground focus:ring-primary",
    secondary:
      "bg-foreground text-background border-2 border-foreground focus:ring-foreground",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
