import type { ReactNode } from "react";

export default function SketchCard({ children }: { children: ReactNode }) {
  return (
    <div className="border-2 border-foreground bg-transparent rounded-none overflow-hidden">
      <div className="h-6 bg-primary border-b-2 border-foreground" />
      <div className="p-6 md:p-10">{children}</div>
    </div>
  );
}
