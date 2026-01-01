import { useState } from "react";
import { Header } from "@/components/Header";
import { QuestionInput } from "@/components/QuestionInput";
import { CardSpread } from "@/components/CardSpread";
import { ReadingResult } from "@/components/ReadingResult";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { getRandomCards, type TarotCard } from "@/data/tarotCards";
import { useGemini, type StructuredReading } from "@/hooks/useGemini";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";
import type { ReadingTopic } from "@/components/TopicSelector";

type AppState = "idle" | "drawing" | "revealing" | "loading" | "reading";

function App() {
  const [state, setState] = useState<AppState>("idle");
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [reading, setReading] = useState<StructuredReading | null>(null);
  const { generateReading, isLoading } = useGemini();
  const { t, language } = useLanguage();

  const handleSubmit = async (userQuestion: string, topic: ReadingTopic) => {
    setQuestion(userQuestion);
    setState("drawing");

    // Draw 3 random cards
    const drawnCards = getRandomCards(3);
    setCards(drawnCards);

    // Small delay before revealing
    setTimeout(() => {
      setState("revealing");
    }, 500);

    // Generate reading from Gemini
    const generatedReading = await generateReading(userQuestion, drawnCards, language, topic);
    setReading(generatedReading);

    // Wait for cards to reveal, then show loading briefly, then reading
    setTimeout(() => {
      if (generatedReading) {
        setState("reading");
      } else {
        setState("loading");
      }
    }, 2000);
  };

  const handleNewReading = () => {
    setState("idle");
    setQuestion("");
    setCards([]);
    setReading(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Mystical background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-background to-background" />
        {/* Stars */}
        <div className="absolute top-20 left-[10%] w-1 h-1 bg-gold/60 rounded-full animate-twinkle" />
        <div className="absolute top-40 left-[25%] w-1.5 h-1.5 bg-gold/40 rounded-full animate-twinkle delay-300" />
        <div className="absolute top-32 right-[20%] w-1 h-1 bg-gold/50 rounded-full animate-twinkle delay-500" />
        <div className="absolute top-60 right-[30%] w-1 h-1 bg-violet/40 rounded-full animate-twinkle delay-200" />
        <div className="absolute top-24 right-[15%] w-1.5 h-1.5 bg-gold/30 rounded-full animate-twinkle delay-400" />
        <div className="absolute top-52 left-[40%] w-1 h-1 bg-violet/50 rounded-full animate-twinkle delay-100" />
      </div>

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">
        {state === "idle" && (
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            {/* Intro */}
            <div className="text-center space-y-4 max-w-md">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center glow-gold">
                  <Sparkles className="w-10 h-10 text-gold" />
                </div>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl text-foreground">
                {t("intro.title")}
              </h2>
              <p className="text-muted-foreground font-mystical text-lg">
                {t("intro.description")}
              </p>
            </div>

            <QuestionInput
              onSubmit={handleSubmit}
              isLoading={isLoading}
              disabled={state !== "idle"}
            />
          </div>
        )}

        {(state === "drawing" || state === "revealing" || state === "loading" || state === "reading") && (
          <div className="flex flex-col items-center gap-8">
            <CardSpread
              cards={cards}
              isRevealed={state === "revealing" || state === "loading" || state === "reading"}
            />

            {state === "reading" && reading && (
              <ReadingResult
                reading={reading}
                question={question}
                cards={cards}
                onNewReading={handleNewReading}
              />
            )}

            {(state === "drawing" || state === "revealing" || state === "loading") && !reading && (
              <LoadingAnimation />
            )}

            {(state === "revealing" || state === "loading") && reading && !reading.synthesis && (
              <LoadingAnimation />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-muted-foreground">
          {t("footer.text")}
        </p>
      </footer>
    </div>
  );
}

export default App;
