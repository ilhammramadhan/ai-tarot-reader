import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, RotateCcw } from "lucide-react";
import { useState } from "react";

interface ReadingResultProps {
  reading: string;
  question: string;
  onNewReading: () => void;
}

export function ReadingResult({
  reading,
  question,
  onNewReading,
}: ReadingResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `Question: ${question}\n\n${reading}`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl text-gold">Your Reading</h2>
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
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Copy
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
            New Reading
          </Button>
        </div>
      </div>

      <Card className="glass-card border-gold/20">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4 font-mystical italic">
            "{question}"
          </p>
          <div className="prose prose-invert max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap font-mystical text-lg">
              {reading}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
