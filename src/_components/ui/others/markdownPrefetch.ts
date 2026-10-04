let prefetchPromise: Promise<unknown> | undefined;

/**
 * Précharge le chunk Markdown (328K) au survol/focus d'un lien vers une
 * page détail : le clic de navigation n'attend plus le parse du chunk (INP).
 */
export function prefetchMarkdown(): void {
  prefetchPromise ??= import("./MarkdownImpl");
}
