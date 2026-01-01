import { Heart, Briefcase, Sparkles, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export type ReadingTopic = "love" | "career" | "life" | "spiritual";

interface TopicSelectorProps {
  selected: ReadingTopic | null;
  onSelect: (topic: ReadingTopic) => void;
  disabled?: boolean;
}

const topics: { id: ReadingTopic; icon: typeof Heart; colorClass: string }[] = [
  { id: "love", icon: Heart, colorClass: "hover:border-pink-400 hover:bg-pink-400/10" },
  { id: "career", icon: Briefcase, colorClass: "hover:border-blue-400 hover:bg-blue-400/10" },
  { id: "life", icon: Compass, colorClass: "hover:border-green-400 hover:bg-green-400/10" },
  { id: "spiritual", icon: Sparkles, colorClass: "hover:border-violet-400 hover:bg-violet-400/10" },
];

const selectedColors: Record<ReadingTopic, string> = {
  love: "border-pink-400 bg-pink-400/20 text-pink-300",
  career: "border-blue-400 bg-blue-400/20 text-blue-300",
  life: "border-green-400 bg-green-400/20 text-green-300",
  spiritual: "border-violet-400 bg-violet-400/20 text-violet-300",
};

export function TopicSelector({ selected, onSelect, disabled }: TopicSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground text-center font-mystical">
        {t("topic.label")}
      </p>
      <div className="flex justify-center gap-2 flex-wrap">
        {topics.map(({ id, icon: Icon, colorClass }) => {
          const isSelected = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              disabled={disabled}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer
                ${isSelected
                  ? selectedColors[id]
                  : `border-gold/30 text-muted-foreground ${colorClass}`
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{t(`topic.${id}`)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
