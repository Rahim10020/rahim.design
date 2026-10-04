import { LiquidFills } from "./LiquidHover";
import { useLiquidTargets } from "./useLiquidTargets";

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
  // Remplissage liquide directionnel (même effet que la nav).
  // Pointeurs fins uniquement : aucun effet résiduel sur tactile.
  const targetRef = useLiquidTargets(disabled);

  const base =
    "relative inline-flex items-center justify-center overflow-hidden isolate whitespace-nowrap cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

  const variants = {
    primary:
      "bg-primary text-foreground border-2 border-foreground focus:ring-foreground-alt-a hover:text-background",
    secondary:
      "bg-foreground text-background border-2 border-foreground focus:ring-foreground hover:text-foreground",
  };

  const fillClassName = variant === "primary" ? "bg-foreground" : "bg-primary";

  return (
    <button
      ref={targetRef as never}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {!disabled && <LiquidFills fillClassName={fillClassName} />}
      <span className="relative z-10 inline-flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}
