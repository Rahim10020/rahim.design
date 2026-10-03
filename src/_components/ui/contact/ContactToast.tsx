import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap, prefersReducedMotion } from "../../../lib/gsap";
import CheckIcon from "../../icons/CheckIcon";
import CloseIcon from "../../icons/CloseIcon";

interface ContactToastProps {
  tone: "success" | "error";
  title: string;
  message: string;
  dismissLabel: string;
  onClose: () => void;
  autoDismissMs?: number;
}

export default function ContactToast({
  tone,
  title,
  message,
  dismissLabel,
  onClose,
  autoDismissMs = 6000,
}: ContactToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const isSuccess = tone === "success";

  // Entrée animée (sauf reduced-motion)
  useEffect(() => {
    if (prefersReducedMotion() || !toastRef.current) return;
    gsap.fromTo(
      toastRef.current,
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.3, ease: "power3.out" },
    );
  }, []);

  // Auto-dismiss + fermeture au Escape
  useEffect(() => {
    const timer = window.setTimeout(onClose, autoDismissMs);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, autoDismissMs]);

  return createPortal(
    <div className="fixed inset-x-4 bottom-4 z-100 flex justify-center pointer-events-none sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end">
      <div ref={toastRef} className="relative w-full sm:w-auto sm:max-w-sm">
        <div
          aria-hidden
          className="absolute inset-0 bg-foreground translate-x-1 translate-y-1"
        />
        <div
          role={isSuccess ? "status" : "alert"}
          className="relative flex items-start gap-3 border-2 border-foreground bg-background px-4 py-3 pointer-events-auto"
        >
          <span
            aria-hidden
            className={`mt-0.5 inline-flex shrink-0 items-center justify-center border-2 border-foreground p-1 ${
              isSuccess ? "bg-accent-e" : "bg-accent"
            }`}
          >
            {isSuccess ? <CheckIcon size={16} /> : <CloseIcon size={14} />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-xl text-foreground leading-tight">
              {title}
            </p>
            <p className="text-sm text-foreground-alt-a leading-snug mt-0.5">
              {message}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={dismissLabel}
            className="shrink-0 p-1 hover:bg-background-alt focus-visible:outline-2 focus-visible:outline-foreground cursor-pointer"
          >
            <CloseIcon size={14} />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
