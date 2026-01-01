import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LoadingAnimation() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      {/* Crystal Ball Animation */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 w-24 h-24 rounded-full bg-gold/20 animate-ping" />

        {/* Crystal ball */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-violet/30 via-violet/10 to-transparent border-2 border-gold/40 flex items-center justify-center overflow-hidden">
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gold/20 to-transparent animate-pulse" />

          {/* Sparkle icon */}
          <Sparkles className="w-10 h-10 text-gold animate-twinkle relative z-10" />

          {/* Swirling mist effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-violet/20 via-transparent to-transparent animate-float" />
        </div>

        {/* Orbiting stars */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-gold rounded-full" />
          <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-gold/70 rounded-full" />
          <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-gold/50 rounded-full" />
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center space-y-2">
        <p className="text-muted-foreground font-mystical text-lg animate-pulse">
          {t("reading.loading")}
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-1">
          <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
