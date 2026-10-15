// Aralıklı tekrar: FSRS (ts-fsrs). Kartlar JSON-güvenli biçimde (ISO tarih) saklanır.
import { createEmptyCard, fsrs, generatorParameters, Rating, type Card, type Grade } from 'ts-fsrs';

export type SrsKind = 'q' | 'v';
export type StoredCard = {
  key: string; // "q:<soruId>" | "v:<kelimeId>"
  due: string;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: number;
  last_review?: string;
};

const scheduler = fsrs(generatorParameters({ enable_fuzz: false, request_retention: 0.9 }));

export const Grades = { again: Rating.Again, hard: Rating.Hard, good: Rating.Good, easy: Rating.Easy } as const;
export type GradeName = keyof typeof Grades;

export function srsKey(kind: SrsKind, id: string) {
  return `${kind}:${id}`;
}

function toCard(s: StoredCard): Card {
  return {
    ...s,
    due: new Date(s.due),
    last_review: s.last_review ? new Date(s.last_review) : undefined,
  } as Card;
}

function fromCard(key: string, c: Card): StoredCard {
  return {
    key,
    due: c.due.toISOString(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    learning_steps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state,
    last_review: c.last_review ? c.last_review.toISOString() : undefined,
  };
}

export function newCard(key: string, now: Date = new Date()): StoredCard {
  return fromCard(key, createEmptyCard(now));
}

export function review(card: StoredCard, grade: GradeName, now: Date = new Date()): StoredCard {
  const rec = scheduler.next(toCard(card), now, Grades[grade] as Grade);
  return fromCard(card.key, rec.card);
}

/** Soru cevabından not türet: yanlış → again; doğru ama yavaş → hard; doğru → good; doğru ve çok hızlı → easy. */
export function gradeFromAnswer(correct: boolean, seconds: number, targetSeconds = 90): GradeName {
  if (!correct) return 'again';
  if (seconds > targetSeconds * 1.3) return 'hard';
  if (seconds < targetSeconds * 0.35) return 'easy';
  return 'good';
}

export function isDue(card: StoredCard, now: Date = new Date()) {
  return new Date(card.due).getTime() <= now.getTime();
}

export function dueCards(cards: Record<string, StoredCard>, now: Date = new Date(), kind?: SrsKind) {
  return Object.values(cards)
    .filter((c) => (kind ? c.key.startsWith(kind + ':') : true) && isDue(c, now))
    .sort((a, b) => a.due.localeCompare(b.due));
}

/** Bir sonraki tekrar aralığı için insan okunur Türkçe etiket. */
export function intervalLabelTr(card: StoredCard, now: Date = new Date()) {
  const ms = new Date(card.due).getTime() - now.getTime();
  if (ms <= 0) return 'şimdi';
  const min = Math.round(ms / 60000);
  if (min < 60) return `${min} dk`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} sa`;
  return `${Math.round(h / 24)} gün`;
}
