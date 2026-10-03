interface SimpleListProps {
  items: string[];
}

/** Liste verticale simple (page About : designer, coder, hobbies). */
export default function SimpleList({ items }: SimpleListProps) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="text-foreground-alt-a text-xl">
          {item}
        </li>
      ))}
    </ul>
  );
}
