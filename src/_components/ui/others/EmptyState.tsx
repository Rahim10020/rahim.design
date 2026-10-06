import { LiquidHoverButton } from "../LiquidHover";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * État vide sobre (listes filtrées sans résultat).
 * Centré comme la 404, annonce SR via role="status".
 */
export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mx-auto max-w-xl px-6 py-20 text-center ${className}`}
    >
      <h2 className="text-foreground text-2xl md:text-3xl font-medium">
        {title}
      </h2>
      <p className="text-foreground-alt-a mt-3 text-lg md:text-xl leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-8 flex justify-center">
          <LiquidHoverButton
            type="button"
            fillClassName="bg-primary-alt"
            onClick={onAction}
            className="px-6 py-2.5 text-lg font-medium cursor-pointer rounded-full border-2 border-foreground bg-transparent text-foreground hover:text-background transition-colors"
          >
            {actionLabel}
          </LiquidHoverButton>
        </div>
      )}
    </div>
  );
}
