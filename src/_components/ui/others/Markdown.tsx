import { lazy, Suspense } from "react";

const MarkdownImpl = lazy(() => import("./MarkdownImpl"));

export default function Markdown({ content }: { content: string }) {
  return (
    <Suspense fallback={<div className="prose mx-auto max-w-xl" />}>
      <MarkdownImpl content={content} />
    </Suspense>
  );
}
