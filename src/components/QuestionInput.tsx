import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2 } from "lucide-react";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const placeholders = [
  "What does the future hold for my career?",
  "Will I find love soon?",
  "What should I focus on right now?",
  "What is blocking my success?",
  "What message do the cards have for me?",
];

export function QuestionInput({
  onSubmit,
  isLoading,
  disabled,
}: QuestionInputProps) {
  const [question, setQuestion] = useState("");
  const [placeholder] = useState(
    () => placeholders[Math.floor(Math.random() * placeholders.length)]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading && !disabled) {
      onSubmit(question.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="text-center space-y-2">
        <h2 className="font-mystical text-xl sm:text-2xl text-muted-foreground italic">
          Ask the cards your question...
        </h2>
      </div>

      <div className="relative">
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading || disabled}
          className="w-full h-12 px-4 bg-card/50 border-gold/30 text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:ring-gold/30 font-mystical text-lg"
        />
      </div>

      <Button
        type="submit"
        disabled={!question.trim() || isLoading || disabled}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg tracking-wide glow-gold-sm transition-all hover:glow-gold cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Reading the cards...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Draw Cards
          </>
        )}
      </Button>
    </form>
  );
}
