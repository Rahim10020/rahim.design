import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../../../lib/gsap";
import { useLocale } from "../../../lib/i18n";
import { getUi } from "../../../locales/ui";

function saveDataEnabled(): boolean {
  try {
    return (
      "connection" in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true
    );
  } catch {
    return false;
  }
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const words = getUi(useLocale()).preloader.words;

  useGSAP(
    () => {
      if (sessionStorage.getItem("rd-preloader") === "1") {
        setDone(true);
        onDone();
        return;
      }
      if (prefersReducedMotion() || saveDataEnabled()) {
        setDone(true);
        onDone();
        return;
      }
      // Version courte (≤0.6s) : un seul mot, compteur rapide, sortie brève.
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("rd-preloader", "1");
          setDone(true);
          onDone();
        },
      });
      const firstWord = words[0];
      if (firstWord && wordRef.current) {
        wordRef.current.textContent = firstWord;
      }
      tl.fromTo(
        wordRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.2, ease: "power2.out" },
        0,
      );
      tl.to(
        counter,
        {
          v: 100,
          duration: 0.3,
          ease: "power2.inOut",
          onUpdate: () => {
            if (numRef.current)
              numRef.current.textContent = String(
                Math.round(counter.v),
              ).padStart(3, "0");
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${counter.v / 100})`;
          },
        },
        0,
      );
      tl.to(rootRef.current, {
        yPercent: -100,
        duration: 0.25,
        ease: "power4.inOut",
      });
    },
    { scope: rootRef },
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-primary-alt text-background"
      aria-hidden
    >
      <span
        ref={wordRef}
        className="text-4xl md:text-6xl font-medium tracking-tight min-h-[1.5em]"
      >
        Design
      </span>
      <span
        ref={numRef}
        className="mt-4 text-6xl md:text-8xl font-medium tabular-nums"
      >
        000
      </span>
      <div className="mt-8 h-1.5 w-48 overflow-hidden bg-white/20">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-primary"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
