import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { TarotCard } from "@/data/tarotCards";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

interface UseGeminiReturn {
  generateReading: (question: string, cards: TarotCard[]) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export function useGemini(): UseGeminiReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReading = async (
    question: string,
    cards: TarotCard[]
  ): Promise<string> => {
    if (!API_KEY) {
      setError("API key not configured");
      return "The mystical connection is not established. Please configure your Gemini API key.";
    }

    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are a mystical tarot reader with deep wisdom and spiritual insight. You speak in an enchanting, mystical tone while being warm and supportive.

The querent has asked: "${question}"

Three cards have been drawn in a Past-Present-Future spread:

1. PAST - ${cards[0].name}: ${cards[0].meaning}
2. PRESENT - ${cards[1].name}: ${cards[1].meaning}
3. FUTURE - ${cards[2].name}: ${cards[2].meaning}

Provide a mystical tarot reading that:
- Addresses their question directly
- Interprets each card in relation to their position (past/present/future)
- Weaves the three cards together into a cohesive narrative
- Offers guidance and insight
- Uses mystical, enchanting language
- Keeps the response to about 200-250 words
- Does NOT use markdown formatting, bullet points, or headers - write in flowing prose

Begin the reading with a mystical opening phrase.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      return "The spirits are restless and cannot provide a clear reading at this moment. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  return { generateReading, isLoading, error };
}
