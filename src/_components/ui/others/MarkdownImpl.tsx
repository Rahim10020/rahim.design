import { useMemo } from "react";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import LazyVideo from "./LazyVideo";

const external = (url: string) => /^https?:\/\//i.test(url);
const isVideo = (src?: string) => !!src && /\.(webm|mp4)(\?.*)?$/i.test(src);

// Classes statiques pour que Tailwind les détecte au scan.
const COLS: Record<string, string> = {
  "cols-2": "grid-cols-2",
  "cols-3": "grid-cols-3",
  "cols-4": "grid-cols-4",
  "cols-5": "grid-cols-5",
};
const ROWS: Record<string, string> = {
  "rows-1": "grid-rows-1",
  "rows-2": "grid-rows-2",
};

/** Premier média du source markdown (syntaxe `![]()` ou `<img src>`) : candidat LCP. */
function firstMediaSrc(source: string): string | undefined {
  const patterns = [/!\[[^\]]*\]\(\s*([^)\s]+)/, /<img[^>]+src=["']([^"']+)["']/i];
  let best: { index: number; src: string } | undefined;
  for (const pattern of patterns) {
    const match = pattern.exec(source);
    const src = match?.[1];
    if (src && (!best || match.index < best.index)) {
      best = { index: match.index, src };
    }
  }
  return best?.src;
}

/** Grille 16:9 globale : même bloc que le placeholder (max-w-3xl, aspect-video). */
function MediaGrid({
  cols,
  rows,
  children,
}: {
  cols: string;
  rows?: string;
  children: ReactNode;
}) {
  return (
    <figure className="mx-auto m-12 max-w-3xl">
      <div
        className={`grid aspect-video w-full overflow-hidden rounded-xl ${cols} ${rows ?? ""}`}
      >
        {children}
      </div>
    </figure>
  );
}

export default function Markdown({ content }: { content: string }) {
  // Ce composant ne sert que les pages détail : le premier média du source
  // (image ou vidéo démo, hors galeries) est le candidat LCP → eager + priorité haute.
  // Comparaison par src (pure, sans mutation pendant le render).
  const heroSrc = useMemo(() => firstMediaSrc(content), [content]);
  return (
    <div className="prose mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          div: ({ className, children }) => {
            if (
              typeof className === "string" &&
              className.includes("media-grid")
            ) {
              const colsKey = className.match(/cols-\d+/)?.[0] ?? "cols-3";
              const rowsKey = className.match(/rows-\d+/)?.[0];
              return (
                <MediaGrid
                  cols={COLS[colsKey] ?? "grid-cols-3"}
                  rows={rowsKey ? ROWS[rowsKey] : undefined}
                >
                  {children}
                </MediaGrid>
              );
            }
            return <div className={className}>{children}</div>;
          },
          h2: ({ children }) => (
            <h2 className="text-foreground mx-auto mb-3 mt-8 max-w-xl text-4xl font-medium">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mx-auto mb-3 mt-8 max-w-xl text-3xl font-medium text-foreground">
              {children}
            </h3>
          ),
          p: ({ children, node }) =>
            node?.children.length === 1 &&
            node.children[0].type === "element" &&
            node.children[0].tagName === "img" ? (
              <>{children}</>
            ) : (
              <p className="mx-auto max-w-xl text-xl leading-relaxed text-foreground">
                {children}
              </p>
            ),
          a: ({ href = "", children }) => (
            <a
              href={href}
              className="underline underline-offset-4"
              {...(external(href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          ),
          img: ({ src, alt, className }) => {
            // Cellule de grille (HTML brut avec class="grid-cell") : sans <figure>, crop propre.
            if (
              typeof className === "string" &&
              className.includes("grid-cell")
            ) {
              return (
                <img
                  src={src}
                  alt={alt ?? ""}
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover object-top"
                />
              );
            }
            // Vidéo démo : même bloc 16:9 que le placeholder image.
            if (isVideo(src)) {
              return (
                <figure className="mx-auto m-12 max-w-3xl">
                  <LazyVideo
                    src={src ?? ""}
                    ariaLabel={alt ?? "Project demo video"}
                    eager={src != null && src === heroSrc}
                    className="aspect-video w-full rounded-xl object-cover"
                  />
                </figure>
              );
            }
            // Premier média hero (candidat LCP) : eager + priorité haute.
            // Galeries et médias suivants : lazy.
            if (src != null && src === heroSrc) {
              return (
                <figure className="mx-auto m-12 max-w-3xl">
                  <img
                    src={src}
                    alt={alt ?? ""}
                    width={1280}
                    height={720}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="aspect-video w-full rounded-xl object-cover object-top"
                  />
                </figure>
              );
            }
            return (
              <figure className="mx-auto m-12 max-w-3xl">
                <img
                  src={src}
                  alt={alt ?? ""}
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full rounded-xl object-cover object-top"
                />
              </figure>
            );
          },
          ul: ({ children }) => (
            <ul className="mx-auto my-5 max-w-xl list-disc pl-6 text-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mx-auto my-5 max-w-xl list-decimal pl-6 text-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="my-2 list-item text-xl leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mx-auto my-6 max-w-xl border-l-4 border-primary pl-5 text-xl italic text-foreground">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-background-alt px-1.5 py-0.5 font-mono text-base">
              {children}
            </code>
          ),
          strong: ({ children }) => (
            <strong className="font-medium text-foreground-alt">
              {children}
            </strong>
          ),
          pre: ({ children }) => (
            <pre className="mx-auto my-6 max-w-xl overflow-x-auto rounded bg-foreground p-4 text-background">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="mx-auto my-6 w-full max-w-xl overflow-x-auto">
              <table className="w-full border-collapse border border-foreground text-xl text-foreground">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b text-xls text-foreground-alt border-foreground">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-foreground last:border-0">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="border-r border-foreground px-4 py-2 text-left text-xl font-medium last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-r border-foreground text-base px-4 py-4 last:border-r-0">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
