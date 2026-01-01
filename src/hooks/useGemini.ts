import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import type { TarotCard } from "@/data/tarotCards";
import type { ReadingTopic } from "@/components/TopicSelector";

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
    language: "en" | "id",
    topic: ReadingTopic
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
    language: "en" | "id",
    topic: ReadingTopic
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

    const topicContext: Record<ReadingTopic, { en: string; id: string }> = {
      love: {
        en: "This is a LOVE reading. Focus on relationships, romance, emotional connections, dating, marriage, heartbreak, soulmates, self-love, and matters of the heart.",
        id: "Ini adalah bacaan tentang CINTA. Fokus pada hubungan, romansa, koneksi emosional, kencan, pernikahan, patah hati, jodoh, cinta diri, dan urusan hati."
      },
      career: {
        en: "This is a CAREER reading. Focus on work, job opportunities, promotions, business ventures, professional growth, colleagues, workplace dynamics, financial success, and career decisions.",
        id: "Ini adalah bacaan tentang KARIR. Fokus pada pekerjaan, peluang kerja, promosi, bisnis, pertumbuhan profesional, rekan kerja, dinamika tempat kerja, kesuksesan finansial, dan keputusan karir."
      },
      life: {
        en: "This is a LIFE PATH reading. Focus on personal growth, life direction, major decisions, family, health, moving, travel, life changes, and overall life guidance.",
        id: "Ini adalah bacaan tentang JALAN HIDUP. Fokus pada pertumbuhan pribadi, arah hidup, keputusan besar, keluarga, kesehatan, pindah, perjalanan, perubahan hidup, dan panduan hidup secara keseluruhan."
      },
      spiritual: {
        en: "This is a SPIRITUAL reading. Focus on inner wisdom, soul purpose, spiritual awakening, intuition, karma, past lives, meditation, higher self, and divine guidance.",
        id: "Ini adalah bacaan tentang SPIRITUAL. Fokus pada kebijaksanaan batin, tujuan jiwa, kebangkitan spiritual, intuisi, karma, kehidupan lampau, meditasi, diri yang lebih tinggi, dan bimbingan ilahi."
      }
    };

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const prompt = `You are an empathetic tarot reader who gives deeply PERSONAL readings. You connect emotionally with the querent and speak directly to their situation.

${langInstruction}

${topicContext[topic][language]}

The querent's question: "${question}"

Cards drawn (Past-Present-Future):
1. PAST - ${cards[0].name}: ${cards[0].meaning}
2. PRESENT - ${cards[1].name}: ${cards[1].meaning}
3. FUTURE - ${cards[2].name}: ${cards[2].meaning}

CRITICAL INSTRUCTIONS FOR PERSONAL READINGS:
- This is specifically about ${topic.toUpperCase()} - every interpretation MUST relate to this topic
- Directly answer their specific question - don't give generic card meanings
- Use "you/kamu" frequently - speak TO them, not about cards
- Give SPECIFIC insights relevant to ${topic} (not generic life advice)
- Include actionable advice they can actually use for their ${topic} situation
- Be warm and supportive like a wise friend, not a textbook

Respond in JSON format:
- "past": What specifically happened in their past related to ${topic}? How did it shape their current ${topic} situation? (2-3 sentences, personal)
- "present": What are they experiencing NOW regarding ${topic}? What energy surrounds their ${topic} life? (2-3 sentences, personal)
- "future": What SPECIFIC ${topic}-related outcome or events await them? Give them something concrete about their ${topic} to look forward to or prepare for (2-3 sentences, personal)
- "synthesis": Weave everything together into personal ${topic} guidance. Start with addressing them directly. Give them a clear answer to their ${topic} question and actionable next steps. (4-5 sentences)

BAD example (too generic): "The Empress represents abundance and creativity in your past."
GOOD example (personal, career-focused): "You've invested years building your skills and proving yourself at work. That dedication hasn't gone unnoticed - it's created a solid foundation for the breakthrough that's coming."

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
