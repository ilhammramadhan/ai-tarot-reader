import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TopicSelector, type ReadingTopic } from "./TopicSelector";

interface QuestionInputProps {
  onSubmit: (question: string, topic: ReadingTopic) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function QuestionInput({
  onSubmit,
  isLoading,
  disabled,
}: QuestionInputProps) {
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState<ReadingTopic | null>(null);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && topic && !isLoading && !disabled) {
      onSubmit(question.trim(), topic);
    }
  };

  const isValid = question.trim() && topic;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      {/* Topic Selector */}
      <TopicSelector
        selected={topic}
        onSelect={setTopic}
        disabled={isLoading || disabled}
      />

      {/* Question Input */}
      <div className="relative">
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t("input.placeholder")}
          disabled={isLoading || disabled}
          className="w-full h-12 px-4 bg-card/50 border-gold/30 text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:ring-gold/30 font-mystical text-lg"
        />
      </div>

      <Button
        type="submit"
        disabled={!isValid || isLoading || disabled}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg tracking-wide glow-gold-sm transition-all hover:glow-gold cursor-pointer disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {t("input.loading")}
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            {t("input.button")}
          </>
        )}
      </Button>
    </form>
  );
}
