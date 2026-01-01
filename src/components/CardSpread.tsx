import { TarotCard } from "./TarotCard";
import type { TarotCard as TarotCardType } from "@/data/tarotCards";

interface CardSpreadProps {
  cards: TarotCardType[];
  isRevealed: boolean;
}

export function CardSpread({ cards, isRevealed }: CardSpreadProps) {
  const positions: ("past" | "present" | "future")[] = [
    "past",
    "present",
    "future",
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="font-mystical text-xl text-muted-foreground italic">
        The cards have been drawn...
      </h2>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
        {cards.map((card, index) => (
          <TarotCard
            key={card.id}
            card={card}
            position={positions[index]}
            isRevealed={isRevealed}
            delay={index * 400} // Staggered reveal
          />
        ))}
      </div>
    </div>
  );
}
