import MarkdownLite from "./markdownLite";

export default function Markdown({ content }: { content: string }) {
  return <MarkdownLite content={content} />;
}
