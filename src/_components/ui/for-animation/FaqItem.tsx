import { useRef } from "react";
import { ArrowDownIcon } from "../../icons";
import { gsap, useGSAP, prefersReducedMotion } from "../../../lib/gsap";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

/** Item FAQ : seul le pop de la carte + rotation flèche sont animés. La réponse apparaît sans animation. */
export default function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: FaqItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const answerId = `faq-answer-${index}`;
  const questionId = `faq-question-${index}`;

  useGSAP(
    () => {
      const card = cardRef.current;
      const icon = iconRef.current;
      if (!card || !icon) return;
      if (prefersReducedMotion()) {
        gsap.set(card, {
          backgroundColor: isOpen ? "#f4f4f0" : "#ffffff",
          boxShadow: isOpen ? "6px 6px 0 #000" : "0px 0px 0 #000",
          y: isOpen ? -4 : 0,
        });
        gsap.set(icon, { rotate: isOpen ? 180 : 0 });
        return;
      }
      gsap.to(card, {
        backgroundColor: isOpen ? "#f4f4f0" : "#ffffff",
        boxShadow: isOpen ? "6px 6px 0 #000" : "0px 0px 0 #000",
        y: isOpen ? -4 : 0,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(icon, {
        rotate: isOpen ? 180 : 0,
        duration: 0.45,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    },
    { dependencies: [isOpen], scope: cardRef },
  );

  return (
    <div ref={cardRef} className="border-2 border-foreground bg-background">
      <h3>
        <button
          type="button"
          id={questionId}
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-6 px-4 py-4 text-left text-xl font-medium text-foreground sm:px-6 sm:text-2xl"
        >
          <span>{question}</span>
          <span
            ref={iconRef}
            className="inline-flex shrink-0 will-change-transform"
          >
            <ArrowDownIcon size={18} aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        hidden={!isOpen}
        className="px-4 pb-6 sm:px-6"
      >
        <p className="max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
          {answer}
        </p>
      </div>
    </div>
  );
}
