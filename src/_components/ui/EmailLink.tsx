import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CheckIcon, CopyIcon } from "../icons";

export type EmailLinkProps = {
  label: string;
  copyText?: string;
  copiedLabel?: string;
  resetDelayMs?: number;
  className?: string;
};

export default function EmailLink(props: EmailLinkProps) {
  const {
    label,
    copyText,
    copiedLabel = "Copied",
    resetDelayMs = 2000,
    className,
  } = props;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, resetDelayMs);

    return () => window.clearTimeout(timeoutId);
  }, [copied, resetDelayMs]);

  const copyToClipboard = async () => {
    const valueToCopy = copyText ?? label;
    if (!valueToCopy) {
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(valueToCopy);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = valueToCopy;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard();
      setCopied(true);
    } catch {
      // If copy fails, we simply avoid flipping to "Copied"
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={twMerge(
        "cursor-pointer hover:underline flex items-center gap-p2 bg-transparent p-0 border-0",
        className,
      )}
      aria-live="polite"
    >
      <span className="text-xl md:text-2xl lg:text-3xl font-medium text-black-80">
        {copied ? copiedLabel : label}
      </span>
      {copied ? (
        <CheckIcon className="text-black-80 w-8 h-8" />
      ) : (
        <CopyIcon className="text-black-80" />
      )}
    </button>
  );
}
