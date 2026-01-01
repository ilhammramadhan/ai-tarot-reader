import { useState, useEffect } from "react";
import type { TarotCard as TarotCardType } from "@/data/tarotCards";
import { Sparkles } from "lucide-react";

interface TarotCardProps {
  card: TarotCardType;
  position: "past" | "present" | "future";
  isRevealed: boolean;
  onReveal?: () => void;
  delay?: number;
}

const positionLabels = {
  past: "Past",
  present: "Present",
  future: "Future",
};

export function TarotCard({
  card,
  position,
  isRevealed,
  delay = 0,
}: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isRevealed && !isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, delay, isFlipped]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Position Label */}
      <span className="text-sm font-heading text-gold uppercase tracking-widest">
        {positionLabels[position]}
      </span>

      {/* Card Container */}
      <div className="perspective w-32 h-48 sm:w-40 sm:h-60 cursor-pointer">
        <div
          className={`card-flip relative w-full h-full ${
            isFlipped ? "flipped" : ""
          }`}
        >
          {/* Card Back */}
          <div className="card-front absolute inset-0 rounded-xl glass-card glow-gold-sm flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-purple-900/30" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <Sparkles className="w-8 h-8 text-gold animate-twinkle" />
              <div className="w-12 h-12 border-2 border-gold/50 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border border-gold/30 rounded-full" />
              </div>
              <Sparkles className="w-6 h-6 text-gold/60 animate-twinkle delay-500" />
            </div>
            {/* Decorative corners */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold/40 rounded-tl" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold/40 rounded-tr" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold/40 rounded-bl" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold/40 rounded-br" />
          </div>

          {/* Card Front (Revealed) */}
          <div className="card-back absolute inset-0 rounded-xl glass-card glow-gold flex flex-col items-center justify-center p-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-purple-900/40" />
            <div className="relative z-10 flex flex-col items-center gap-2 text-center">
              <span className="text-3xl sm:text-4xl font-heading text-gold">
                {card.id}
              </span>
              <h3 className="text-sm sm:text-base font-heading text-foreground leading-tight">
                {card.name}
              </h3>
              <div className="flex flex-wrap justify-center gap-1 mt-1">
                {card.keywords.slice(0, 2).map((keyword) => (
                  <span
                    key={keyword}
                    className="text-[10px] sm:text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            {/* Decorative corners */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold/60 rounded-tl" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold/60 rounded-tr" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold/60 rounded-bl" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold/60 rounded-br" />
          </div>
        </div>
      </div>
    </div>
  );
}
