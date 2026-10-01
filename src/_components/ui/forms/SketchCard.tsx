import type { ReactNode } from "react";

export default function SketchCard({ children }: { children: ReactNode }) {
  return (
    <div className=" bg-transparent rounded-none overflow-hidden">
      <div className="h-5 bg-foreground border-b-2 border-foreground" />
      <div className="p-6 md:px-6 md:py-4">{children}</div>
    </div>
  );
}
