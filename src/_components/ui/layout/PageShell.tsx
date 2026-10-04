import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  overflowHidden?: boolean;
}

/** Coquille commune des pages : section + conteneurs centrés. */
export default function PageShell({
  children,
  overflowHidden = false,
}: PageShellProps) {
  return (
    <section
      className={`w-full bg-background min-h-screen${overflowHidden ? " overflow-x-hidden" : ""}`}
    >
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-0 lg:mb-24">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </div>
    </section>
  );
}
