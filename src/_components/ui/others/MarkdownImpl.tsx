import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const external = (url: string) => /^https?:\/\//i.test(url);

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose mx-auto max-w-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="text-foreground mb-3 mt-8 text-4xl font-medium">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-3 mt-8 text-3xl font-medium text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-xl leading-relaxed text-foreground-alt">
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
          img: ({ src, alt }) => (
            <figure className="mx-auto mb-10 max-w-4xl">
              <img
                src={src}
                alt={alt ?? ""}
                className="aspect-video w-full object-cover"
              />
            </figure>
          ),
          ul: ({ children }) => (
            <ul className="my-5 list-disc pl-6 text-foreground-alt">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-5 list-decimal pl-6 text-foreground-alt">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="my-2 list-item text-xl leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-primary pl-5 text-xl italic text-foreground-alt">
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
            <pre className="my-6 overflow-x-auto rounded bg-foreground p-4 text-background">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
