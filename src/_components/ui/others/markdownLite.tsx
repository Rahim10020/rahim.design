import type { ReactNode } from "react";
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

/** Premier média du source markdown (syntaxe `![]()` ou `<img src>`) : candidat LCP. */
function firstMediaSrc(source: string): string | undefined {
  const patterns = [
    /!\[[^\]]*\]\(\s*([^)\s]+)/,
    /<img[^>]+src=["']([^"']+)["']/i,
  ];
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
function MediaGrid({ cols, children }: { cols: string; children: ReactNode }) {
  return (
    <figure className="mx-auto m-12 max-w-3xl">
      <div
        className={`grid aspect-video w-full overflow-hidden rounded-xl bg-background-alt ring-1 ring-black/5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] ${cols}`}
      >
        {children}
      </div>
    </figure>
  );
}

function GridCell({ src, alt }: { src: string; alt: string }) {
  if (isVideo(src)) {
    return (
      <LazyVideo
        src={src}
        ariaLabel={alt || "Project demo video"}
        className="block h-full w-full bg-background-alt object-cover object-top"
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="block h-full w-full bg-background-alt object-cover object-top"
    />
  );
}

function HeroMedia({
  src,
  alt,
  heroSrc,
}: {
  src: string;
  alt: string;
  heroSrc?: string;
}) {
  const isHero = src === heroSrc;
  if (isVideo(src)) {
    return (
      <figure className="mx-auto m-12 max-w-3xl">
        <LazyVideo
          src={src}
          ariaLabel={alt || "Project demo video"}
          eager={isHero}
          className="aspect-video w-full rounded-xl bg-background-alt object-cover ring-1 ring-black/5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
        />
      </figure>
    );
  }
  if (isHero) {
    return (
      <figure className="mx-auto m-12 max-w-3xl">
        <img
          src={src}
          alt={alt}
          width={1280}
          height={720}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="aspect-video w-full rounded-xl bg-background-alt object-cover object-top ring-1 ring-black/5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
        />
      </figure>
    );
  }
  return (
    <figure className="mx-auto m-12 max-w-3xl">
      <img
        src={src}
        alt={alt}
        width={1280}
        height={720}
        loading="lazy"
        decoding="async"
        className="aspect-video w-full rounded-xl bg-background-alt object-cover object-top ring-1 ring-black/5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
      />
    </figure>
  );
}

// --- Inline parsing (bold, italic, code, links) ---

const INLINE_RE =
  /(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|_[^_]+_|\*[^*]+\*|`[^`]+`)/g;

function renderInline(
  text: string,
  heroSrc?: string,
  keyPrefix = "",
): ReactNode[] {
  const parts = text.split(INLINE_RE);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    // Image inline (normalement traitée au niveau bloc, fallback ici)
    const imgMatch = /^!\[([^\]]*)\]\(\s*([^)\s]+)\s*\)$/.exec(part);
    if (imgMatch) {
      return (
        <HeroMedia
          key={key}
          alt={imgMatch[1]}
          src={imgMatch[2]}
          heroSrc={heroSrc}
        />
      );
    }
    // Lien
    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <a
          key={key}
          href={href}
          className="underline underline-offset-4"
          {...(external(href)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {renderInline(label, heroSrc, `${key}-l`)}
        </a>
      );
    }
    // Bold
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={key} className="font-medium text-foreground-alt">
          {renderInline(part.slice(2, -2), heroSrc, key)}
        </strong>
      );
    }
    // Italic (_x_ ou *x*)
    if (/^_[^_]+_$/.test(part) || /^\*[^*]+\*$/.test(part)) {
      return <em key={key}>{renderInline(part.slice(1, -1), heroSrc, key)}</em>;
    }
    // Code inline
    if (/^`[^`]+`$/.test(part)) {
      return (
        <code
          key={key}
          className="rounded bg-background-alt px-1.5 py-0.5 font-mono text-base"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

// --- Block parsing ---

const SOLE_IMAGE_RE = /^!\[([^\]]*)\]\(\s*([^)\s]+)\s*\)\s*$/;
const IMG_TAG_RE = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
const IMG_ATTRS_RE = /src=["']([^"']+)["']|alt=["']([^"']*)["']/gi;

function parseGridCells(html: string): { src: string; alt: string }[] {
  const cells: { src: string; alt: string }[] = [];
  for (const tag of html.match(IMG_TAG_RE) ?? []) {
    let src = "";
    let alt = "";
    for (const attr of tag.match(IMG_ATTRS_RE) ?? []) {
      if (attr.startsWith("src=")) src = attr.slice(5, -1);
      else if (attr.startsWith("alt=")) alt = attr.slice(5, -1);
    }
    if (src) cells.push({ src, alt });
  }
  return cells;
}

function parseTableRow(line: string): string[] {
  let cells = line.trim();
  if (cells.startsWith("|")) cells = cells.slice(1);
  if (cells.endsWith("|")) cells = cells.slice(0, -1);
  return cells.split("|").map((c) => c.trim());
}

function isSeparatorRow(line: string): boolean {
  const cells = parseTableRow(line);
  return cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c));
}

export default function MarkdownLite({ content }: { content: string }) {
  const heroSrc = firstMediaSrc(content);
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Ligne vide : séparateur
    if (!trimmed) {
      i += 1;
      continue;
    }

    // Bloc HTML brut : media-grid (seule forme utilisée dans le contenu)
    if (trimmed.startsWith("<div")) {
      const chunk: string[] = [];
      while (i < lines.length && !lines[i].includes("</div>")) {
        chunk.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) {
        chunk.push(lines[i]); // ligne </div>
        i += 1;
      }
      const html = chunk.join("\n");
      const colsKey = html.match(/cols-\d+/)?.[0] ?? "cols-3";
      const cells = parseGridCells(html);
      blocks.push(
        <MediaGrid key={key++} cols={COLS[colsKey] ?? "grid-cols-3"}>
          {cells.map((cell) => (
            <GridCell key={cell.src} src={cell.src} alt={cell.alt} />
          ))}
        </MediaGrid>,
      );
      continue;
    }

    // Titres
    if (trimmed.startsWith("### ")) {
      blocks.push(
        <h3
          key={key++}
          className="mx-auto mb-3 mt-8 max-w-xl text-3xl font-medium text-foreground"
        >
          {renderInline(trimmed.slice(4), heroSrc, `h3-${key}`)}
        </h3>,
      );
      i += 1;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push(
        <h2
          key={key++}
          className="text-foreground mx-auto mb-3 mt-8 max-w-xl text-4xl font-medium"
        >
          {renderInline(trimmed.slice(3), heroSrc, `h2-${key}`)}
        </h2>,
      );
      i += 1;
      continue;
    }

    // Citation (peut s'étendre sur plusieurs lignes `>`)
    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push(
        <blockquote
          key={key++}
          className="mx-auto my-6 max-w-xl border-l-4 border-primary pl-5 text-xl italic text-foreground"
        >
          {quoteLines.map((q, qi) => (
            <span key={qi}>
              {renderInline(q, heroSrc, `q-${key}-${qi}`)}
              {qi < quoteLines.length - 1 && <br />}
            </span>
          ))}
        </blockquote>,
      );
      continue;
    }

    // Table GFM
    if (
      trimmed.startsWith("|") &&
      i + 1 < lines.length &&
      isSeparatorRow(lines[i + 1])
    ) {
      const header = parseTableRow(trimmed);
      i += 2; // saute header + séparateur
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(parseTableRow(lines[i].trim()));
        i += 1;
      }
      blocks.push(
        <div
          key={key++}
          className="mx-auto my-6 w-full max-w-xl overflow-x-auto"
        >
          <table className="w-full border-collapse border border-foreground text-xl text-foreground">
            <thead className="border-b text-xls text-foreground-alt border-foreground">
              <tr className="border-b border-foreground last:border-0">
                {header.map((cell, ci) => (
                  <th
                    key={ci}
                    className="border-r border-foreground px-4 py-2 text-left text-xl font-medium last:border-r-0"
                  >
                    {renderInline(cell, heroSrc, `th-${key}-${ci}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-foreground last:border-0"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-r border-foreground text-base px-4 py-4 last:border-r-0"
                    >
                      {renderInline(cell, heroSrc, `td-${key}-${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // Liste non ordonnée
    if (/^-\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^-\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^-\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ul
          key={key++}
          className="mx-auto my-5 max-w-xl list-disc pl-6 text-foreground"
        >
          {items.map((item, ii) => (
            <li key={ii} className="my-2 list-item text-xl leading-relaxed">
              {renderInline(item, heroSrc, `ul-${key}-${ii}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Liste ordonnée
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ol
          key={key++}
          className="mx-auto my-5 max-w-xl list-decimal pl-6 text-foreground"
        >
          {items.map((item, ii) => (
            <li key={ii} className="my-2 list-item text-xl leading-relaxed">
              {renderInline(item, heroSrc, `ol-${key}-${ii}`)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    // Image seule (ou vidéo) : média hero candidat LCP
    const soleImage = SOLE_IMAGE_RE.exec(trimmed);
    if (soleImage) {
      blocks.push(
        <HeroMedia
          key={key++}
          alt={soleImage[1]}
          src={soleImage[2]}
          heroSrc={heroSrc}
        />,
      );
      i += 1;
      continue;
    }

    // Paragraphe : regroupe les lignes consécutives
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("|") &&
      !/^-\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith("<div") &&
      !SOLE_IMAGE_RE.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i += 1;
    }
    const paraText = paraLines.join(" ");
    blocks.push(
      <p
        key={key++}
        className="mx-auto max-w-xl text-xl leading-relaxed text-foreground"
      >
        {renderInline(paraText, heroSrc, `p-${key}`)}
      </p>,
    );
  }

  return <div className="prose mx-auto">{blocks}</div>;
}
