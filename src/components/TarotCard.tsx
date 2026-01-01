import { useState, useEffect } from "react";
import type { TarotCard as TarotCardType } from "@/data/tarotCards";
import { Sparkles, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TarotCardProps {
  card: TarotCardType;
  position: "past" | "present" | "future";
  isRevealed: boolean;
  onReveal?: () => void;
  delay?: number;
}

const positionLabelsMap = {
  en: { past: "Past", present: "Present", future: "Future" },
  id: { past: "Masa Lalu", present: "Sekarang", future: "Masa Depan" },
};

export function TarotCard({
  card,
  position,
  isRevealed,
  delay = 0,
}: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const { language, t } = useLanguage();

  const positionLabels = positionLabelsMap[language];

  useEffect(() => {
    if (isRevealed && !isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, delay, isFlipped]);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = card.image;
    img.onload = () => setImageLoaded(true);
  }, [card.image]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Position Label */}
      <span className="text-sm font-heading text-gold uppercase tracking-widest">
        {positionLabels[position]}
      </span>

      {/* Card Container - Tarot card ratio is roughly 2:3.5 */}
      <div
        className="perspective w-[120px] h-[210px] sm:w-[150px] sm:h-[262px] cursor-pointer relative"
        onMouseEnter={() => isFlipped && setShowDetail(true)}
        onMouseLeave={() => setShowDetail(false)}
        onClick={() => isFlipped && setShowDetail(!showDetail)}
      >
        <div
          className={`card-flip relative w-full h-full ${
            isFlipped ? "flipped" : ""
          }`}
        >
          {/* Card Back (Face Down) */}
          <div className="card-front absolute inset-0 rounded-lg overflow-hidden shadow-xl">
            {/* Mystical card back design */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Outer circle */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-gold/40 rounded-full flex items-center justify-center">
                  {/* Inner pattern */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 border border-gold/30 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-gold animate-twinkle" />
                  </div>
                </div>
                {/* Corner sparkles */}
                <Sparkles className="absolute -top-4 -left-4 w-4 h-4 text-gold/40 animate-twinkle" />
                <Sparkles className="absolute -top-4 -right-4 w-4 h-4 text-gold/40 animate-twinkle delay-200" />
                <Sparkles className="absolute -bottom-4 -left-4 w-4 h-4 text-gold/40 animate-twinkle delay-300" />
                <Sparkles className="absolute -bottom-4 -right-4 w-4 h-4 text-gold/40 animate-twinkle delay-500" />
              </div>
            </div>
            {/* Decorative border */}
            <div className="absolute inset-2 border border-gold/30 rounded-md pointer-events-none" />
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-gold/50" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-gold/50" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-gold/50" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-gold/50" />
          </div>

          {/* Card Front (Face Up - Revealed) */}
          <div className="card-back absolute inset-0 rounded-lg overflow-hidden shadow-xl border-2 border-gold/30">
            {/* Card image */}
            {imageLoaded ? (
              <img
                src={card.image}
                alt={card.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] to-[#2d1b4e] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-gold animate-pulse" />
              </div>
            )}
            {/* Subtle overlay for consistency */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Card name at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6">
              <h3 className="text-xs sm:text-sm font-heading text-gold text-center leading-tight">
                {card.name}
              </h3>
            </div>
            {/* Info icon indicator */}
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
              <Info className="w-3 h-3 text-gold" />
            </div>
          </div>
        </div>

        {/* Card Detail Overlay */}
        {showDetail && isFlipped && (
          <div className="absolute inset-0 z-20 bg-black/95 rounded-lg p-3 flex flex-col justify-center animate-fade-in overflow-hidden">
            <h4 className="text-xs font-heading text-gold mb-2 text-center">
              {card.name}
            </h4>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-gold/70 uppercase tracking-wider mb-1">
                  {t("card.keywords")}
                </p>
                <p className="text-[10px] text-foreground/90 leading-relaxed">
                  {card.keywords.join(" • ")}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gold/70 uppercase tracking-wider mb-1">
                  {t("card.meaning")}
                </p>
                <p className="text-[10px] text-foreground/80 leading-relaxed line-clamp-4">
                  {card.meaning}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card name below (only when revealed) */}
      {isFlipped && (
        <div className="text-center animate-fade-in">
          <p className="text-xs text-muted-foreground font-mystical italic">
            {card.keywords.slice(0, 2).join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}
