import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "app.title": "Mystic Tarot",
    // Intro
    "intro.title": "Discover Your Path",
    "intro.description": "The ancient wisdom of the tarot awaits. Ask your question and let the cards reveal what lies in your past, present, and future.",
    // Input
    "input.placeholder": "What question weighs upon your heart?",
    "input.button": "Draw the Cards",
    "input.loading": "Consulting the spirits...",
    // Card positions
    "position.past": "Past",
    "position.present": "Present",
    "position.future": "Future",
    // Reading
    "reading.title": "Your Reading",
    "reading.copy": "Copy",
    "reading.copied": "Copied",
    "reading.new": "New Reading",
    "reading.loading": "The spirits are interpreting the cards...",
    "reading.past": "The Past",
    "reading.present": "The Present",
    "reading.future": "The Future",
    "reading.synthesis": "The Threads of Fate",
    // Card detail
    "card.keywords": "Keywords",
    "card.meaning": "Meaning",
    "card.reversed": "Reversed",
    // Footer
    "footer.text": "Built with React + shadcn/ui + Gemini AI",
  },
  id: {
    // Header
    "app.title": "Tarot Mistis",
    // Intro
    "intro.title": "Temukan Jalanmu",
    "intro.description": "Kebijaksanaan kuno tarot menunggumu. Ajukan pertanyaanmu dan biarkan kartu mengungkap apa yang ada di masa lalu, sekarang, dan masa depanmu.",
    // Input
    "input.placeholder": "Pertanyaan apa yang membebani hatimu?",
    "input.button": "Tarik Kartu",
    "input.loading": "Berkonsultasi dengan roh...",
    // Card positions
    "position.past": "Masa Lalu",
    "position.present": "Sekarang",
    "position.future": "Masa Depan",
    // Reading
    "reading.title": "Bacaan Tarotmu",
    "reading.copy": "Salin",
    "reading.copied": "Tersalin",
    "reading.new": "Bacaan Baru",
    "reading.loading": "Para roh sedang menafsirkan kartu...",
    "reading.past": "Masa Lalu",
    "reading.present": "Masa Kini",
    "reading.future": "Masa Depan",
    "reading.synthesis": "Benang Takdir",
    // Card detail
    "card.keywords": "Kata Kunci",
    "card.meaning": "Makna",
    "card.reversed": "Terbalik",
    // Footer
    "footer.text": "Dibuat dengan React + shadcn/ui + Gemini AI",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("tarot-language");
    return (saved as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("tarot-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
