import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import type { TarotCard } from "@/data/tarotCards";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface StructuredReading {
  past: string;
  present: string;
  future: string;
  synthesis: string;
}

interface UseGeminiReturn {
  generateReading: (
    question: string,
    cards: TarotCard[],
    language: "en" | "id"
  ) => Promise<StructuredReading | null>;
  isLoading: boolean;
  error: string | null;
}

const fallbackMessages = {
  en: {
    noApi: "The mystical connection is not established. Please configure your Gemini API key.",
    error: "The spirits are restless and cannot provide a clear reading at this moment. Please try again.",
  },
  id: {
    noApi: "Koneksi mistis belum terjalin. Silakan konfigurasi API key Gemini Anda.",
    error: "Para roh sedang gelisah dan tidak dapat memberikan bacaan yang jelas saat ini. Silakan coba lagi.",
  },
};

export function useGemini(): UseGeminiReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReading = async (
    question: string,
    cards: TarotCard[],
    language: "en" | "id"
  ): Promise<StructuredReading | null> => {
    if (!API_KEY) {
      setError("API key not configured");
      return {
        past: fallbackMessages[language].noApi,
        present: "",
        future: "",
        synthesis: "",
      };
    }

    setIsLoading(true);
    setError(null);

    const langInstruction = language === "id"
      ? "IMPORTANT: Respond entirely in Indonesian (Bahasa Indonesia). Use warm, personal Indonesian language with mystical touches."
      : "Respond in English with warm, personal language and mystical touches.";

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const prompt = `You are an empathetic tarot reader who gives deeply PERSONAL readings. You connect emotionally with the querent and speak directly to their situation.

${langInstruction}

The querent's question: "${question}"

Cards drawn (Past-Present-Future):
1. PAST - ${cards[0].name}: ${cards[0].meaning}
2. PRESENT - ${cards[1].name}: ${cards[1].meaning}
3. FUTURE - ${cards[2].name}: ${cards[2].meaning}

CRITICAL INSTRUCTIONS FOR PERSONAL READINGS:
- Directly answer their specific question - don't give generic card meanings
- Use "you/kamu" frequently - speak TO them, not about cards
- Give SPECIFIC insights relevant to their question (career, love, life events, etc.)
- Include actionable advice they can actually use
- Be warm and supportive like a wise friend, not a textbook

Respond in JSON format:
- "past": What specifically happened in their past related to their question? How did it shape them? (2-3 sentences, personal)
- "present": What are they experiencing NOW regarding their question? What energy surrounds them? (2-3 sentences, personal)
- "future": What SPECIFIC outcome or events await them? Give them something concrete to look forward to or prepare for (2-3 sentences, personal)
- "synthesis": Weave everything together into personal guidance. Start with addressing them directly. Give them a clear answer to their question and actionable next steps. (4-5 sentences)

BAD example (too generic): "The Empress represents abundance and creativity in your past."
GOOD example (personal): "You've been through a period of nurturing growth - perhaps caring for others or building something meaningful. This foundation of love and creativity you built is now ready to bloom."

Return ONLY valid JSON, no markdown:
{"past":"...","present":"...","future":"...","synthesis":"..."}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text || "";

      // Parse JSON response
      try {
        // Clean up response - remove markdown code blocks if present
        const cleanedText = text
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();

        const parsed = JSON.parse(cleanedText) as StructuredReading;
        return parsed;
      } catch {
        // If JSON parsing fails, return as synthesis only
        return {
          past: "",
          present: "",
          future: "",
          synthesis: text,
        };
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      return {
        past: fallbackMessages[language].error,
        present: "",
        future: "",
        synthesis: "",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { generateReading, isLoading, error };
}
