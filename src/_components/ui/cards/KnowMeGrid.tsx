import KnowMeCard from "./KnowMeCard";

interface KnowMeGridItem {
  number: string;
  title: string;
  description: string;
}

interface KnowMeGridProps {
  items: KnowMeGridItem[];
}

/** Grille 2 colonnes de KnowMeCard (pages About / Services). */
export default function KnowMeGrid({ items }: KnowMeGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-16 lg:gap-y-14">
      {items.map((item) => (
        <KnowMeCard
          key={item.number}
          number={item.number}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}
