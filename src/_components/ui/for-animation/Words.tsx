interface WordsProps {
  text: string;
  highlight?: Record<string, string>;
}

export default function Words({ text, highlight = {} }: WordsProps) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <span key={i} className={highlight[word] ?? ""}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
