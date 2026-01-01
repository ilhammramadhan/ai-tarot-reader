import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StructuredReading } from "@/hooks/useGemini";
import type { TarotCard } from "@/data/tarotCards";

interface ReadingResultProps {
  reading: StructuredReading;
  question: string;
  cards: TarotCard[];
  onNewReading: () => void;
}

export function ReadingResult({
  reading,
  question,
  cards,
  onNewReading,
}: ReadingResultProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = async () => {
    const textToCopy = `${t("input.placeholder")}: ${question}

${t("reading.past")} - ${cards[0].name}:
${reading.past}

${t("reading.present")} - ${cards[1].name}:
${reading.present}

${t("reading.future")} - ${cards[2].name}:
${reading.future}

${t("reading.synthesis")}:
${reading.synthesis}`;

    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardSections = [
    { key: "past", label: t("reading.past"), content: reading.past, card: cards[0] },
    { key: "present", label: t("reading.present"), content: reading.present, card: cards[1] },
    { key: "future", label: t("reading.future"), content: reading.future, card: cards[2] },
  ];

  return (
    <div className="w-full max-w-3xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl text-gold">{t("reading.title")}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="border-gold/30 hover:border-gold hover:bg-gold/10 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                {t("reading.copied")}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                {t("reading.copy")}
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNewReading}
            className="border-gold/30 hover:border-gold hover:bg-gold/10 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            {t("reading.new")}
          </Button>
        </div>
      </div>

      {/* Question */}
      <p className="text-sm text-muted-foreground font-mystical italic text-center">
        "{question}"
      </p>

      {/* Individual Card Readings */}
      <div className="grid gap-4 md:grid-cols-3">
        {cardSections.map(({ key, label, content, card }) => (
          content && (
            <Card key={key} className="glass-card border-gold/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm text-gold">{label}</h3>
                    <p className="text-xs text-muted-foreground">{card.name}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed font-mystical">
                  {content}
                </p>
              </CardContent>
            </Card>
          )
        ))}
      </div>

      {/* Synthesis */}
      {reading.synthesis && (
        <Card className="glass-card border-gold/30 bg-gradient-to-br from-gold/5 to-violet/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center glow-gold">
                <Sparkles className="w-5 h-5 text-gold animate-twinkle" />
              </div>
              <h3 className="font-heading text-lg text-gold">{t("reading.synthesis")}</h3>
            </div>
            <p className="text-foreground leading-relaxed font-mystical text-lg">
              {reading.synthesis}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
