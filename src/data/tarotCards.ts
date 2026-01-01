export interface TarotCard {
  id: number;
  name: string;
  arcana: "major" | "minor";
  keywords: string[];
  meaning: string;
  reversedMeaning: string;
  image: string;
}

// Public domain Rider-Waite tarot card images
// Source: https://www.sacred-texts.com/tarot/pkt/img/
const getCardImage = (id: number): string => {
  const paddedId = id.toString().padStart(2, "0");
  return `https://www.sacred-texts.com/tarot/pkt/img/ar${paddedId}.jpg`;
};

// Major Arcana - 22 cards
export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    arcana: "major",
    keywords: ["beginnings", "innocence", "spontaneity", "free spirit"],
    meaning: "New beginnings, innocence, spontaneity, a free spirit. Taking a leap of faith.",
    reversedMeaning: "Holding back, recklessness, risk-taking without thought.",
    image: getCardImage(0),
  },
  {
    id: 1,
    name: "The Magician",
    arcana: "major",
    keywords: ["manifestation", "power", "action", "resourcefulness"],
    meaning: "Manifestation, resourcefulness, power, inspired action. You have all you need.",
    reversedMeaning: "Manipulation, poor planning, untapped talents.",
    image: getCardImage(1),
  },
  {
    id: 2,
    name: "The High Priestess",
    arcana: "major",
    keywords: ["intuition", "mystery", "inner voice", "unconscious"],
    meaning: "Intuition, sacred knowledge, divine feminine, the subconscious mind.",
    reversedMeaning: "Secrets, disconnected from intuition, withdrawal.",
    image: getCardImage(2),
  },
  {
    id: 3,
    name: "The Empress",
    arcana: "major",
    keywords: ["abundance", "nurturing", "nature", "fertility"],
    meaning: "Femininity, beauty, nature, nurturing, abundance. Creative expression.",
    reversedMeaning: "Creative block, dependence on others, emptiness.",
    image: getCardImage(3),
  },
  {
    id: 4,
    name: "The Emperor",
    arcana: "major",
    keywords: ["authority", "structure", "father figure", "control"],
    meaning: "Authority, establishment, structure, a father figure. Leadership and stability.",
    reversedMeaning: "Domination, excessive control, lack of discipline.",
    image: getCardImage(4),
  },
  {
    id: 5,
    name: "The Hierophant",
    arcana: "major",
    keywords: ["tradition", "conformity", "beliefs", "institution"],
    meaning: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions.",
    reversedMeaning: "Personal beliefs, freedom, challenging the status quo.",
    image: getCardImage(5),
  },
  {
    id: 6,
    name: "The Lovers",
    arcana: "major",
    keywords: ["love", "harmony", "relationships", "choices"],
    meaning: "Love, harmony, relationships, values alignment, choices.",
    reversedMeaning: "Self-love, disharmony, imbalance, misalignment of values.",
    image: getCardImage(6),
  },
  {
    id: 7,
    name: "The Chariot",
    arcana: "major",
    keywords: ["willpower", "determination", "success", "control"],
    meaning: "Control, willpower, success, action, determination. Victory through focus.",
    reversedMeaning: "Self-discipline, opposition, lack of direction.",
    image: getCardImage(7),
  },
  {
    id: 8,
    name: "Strength",
    arcana: "major",
    keywords: ["courage", "patience", "influence", "compassion"],
    meaning: "Strength, courage, persuasion, influence, compassion. Inner power.",
    reversedMeaning: "Inner strength, self-doubt, low energy, raw emotion.",
    image: getCardImage(8),
  },
  {
    id: 9,
    name: "The Hermit",
    arcana: "major",
    keywords: ["soul-searching", "introspection", "solitude", "guidance"],
    meaning: "Soul-searching, introspection, being alone, inner guidance.",
    reversedMeaning: "Isolation, loneliness, withdrawal from society.",
    image: getCardImage(9),
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    arcana: "major",
    keywords: ["change", "cycles", "fate", "destiny"],
    meaning: "Good luck, karma, life cycles, destiny, a turning point.",
    reversedMeaning: "Bad luck, resistance to change, breaking cycles.",
    image: getCardImage(10),
  },
  {
    id: 11,
    name: "Justice",
    arcana: "major",
    keywords: ["fairness", "truth", "law", "cause and effect"],
    meaning: "Justice, fairness, truth, cause and effect, law.",
    reversedMeaning: "Unfairness, lack of accountability, dishonesty.",
    image: getCardImage(11),
  },
  {
    id: 12,
    name: "The Hanged Man",
    arcana: "major",
    keywords: ["surrender", "letting go", "new perspective", "pause"],
    meaning: "Pause, surrender, letting go, new perspectives. Sacrifice for greater good.",
    reversedMeaning: "Delays, resistance, stalling, indecision.",
    image: getCardImage(12),
  },
  {
    id: 13,
    name: "Death",
    arcana: "major",
    keywords: ["endings", "change", "transformation", "transition"],
    meaning: "Endings, change, transformation, transition. Not literal death.",
    reversedMeaning: "Resistance to change, personal transformation, inner purging.",
    image: getCardImage(13),
  },
  {
    id: 14,
    name: "Temperance",
    arcana: "major",
    keywords: ["balance", "moderation", "patience", "purpose"],
    meaning: "Balance, moderation, patience, purpose. Finding middle ground.",
    reversedMeaning: "Imbalance, excess, self-healing, re-alignment.",
    image: getCardImage(14),
  },
  {
    id: 15,
    name: "The Devil",
    arcana: "major",
    keywords: ["shadow self", "attachment", "addiction", "materialism"],
    meaning: "Shadow self, attachment, addiction, restriction, sexuality.",
    reversedMeaning: "Releasing limiting beliefs, exploring dark thoughts, detachment.",
    image: getCardImage(15),
  },
  {
    id: 16,
    name: "The Tower",
    arcana: "major",
    keywords: ["sudden change", "upheaval", "revelation", "awakening"],
    meaning: "Sudden change, upheaval, chaos, revelation, awakening.",
    reversedMeaning: "Personal transformation, fear of change, averting disaster.",
    image: getCardImage(16),
  },
  {
    id: 17,
    name: "The Star",
    arcana: "major",
    keywords: ["hope", "faith", "renewal", "spirituality"],
    meaning: "Hope, faith, purpose, renewal, spirituality. Healing and inspiration.",
    reversedMeaning: "Lack of faith, despair, self-trust, disconnection.",
    image: getCardImage(17),
  },
  {
    id: 18,
    name: "The Moon",
    arcana: "major",
    keywords: ["illusion", "fear", "anxiety", "subconscious"],
    meaning: "Illusion, fear, anxiety, subconscious, intuition.",
    reversedMeaning: "Release of fear, repressed emotion, inner confusion.",
    image: getCardImage(18),
  },
  {
    id: 19,
    name: "The Sun",
    arcana: "major",
    keywords: ["positivity", "success", "vitality", "joy"],
    meaning: "Positivity, fun, warmth, success, vitality. Joy and celebration.",
    reversedMeaning: "Inner child, feeling down, overly optimistic.",
    image: getCardImage(19),
  },
  {
    id: 20,
    name: "Judgement",
    arcana: "major",
    keywords: ["reflection", "reckoning", "awakening", "rebirth"],
    meaning: "Judgement, rebirth, inner calling, absolution.",
    reversedMeaning: "Self-doubt, inner critic, ignoring the call.",
    image: getCardImage(20),
  },
  {
    id: 21,
    name: "The World",
    arcana: "major",
    keywords: ["completion", "integration", "accomplishment", "travel"],
    meaning: "Completion, integration, accomplishment, travel. A cycle completed.",
    reversedMeaning: "Seeking personal closure, short-cuts, delays.",
    image: getCardImage(21),
  },
];

// Get a random card
export function getRandomCard(): TarotCard {
  const randomIndex = Math.floor(Math.random() * majorArcana.length);
  return majorArcana[randomIndex];
}

// Get multiple unique random cards
export function getRandomCards(count: number): TarotCard[] {
  const shuffled = [...majorArcana].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// All cards for export
export const allTarotCards = majorArcana;
