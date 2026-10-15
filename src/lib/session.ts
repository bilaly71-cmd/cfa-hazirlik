// Soru oturumu seçimleri (mod → soru listesi).
import { questions, questionsByLos, questionsByModule, questionsByTopic } from '@/content';
import { rng, shuffle } from '@/lib/mock';
import { localDay } from '@/lib/scoring';
import type { Question, TopicId } from '@/lib/schema';
import type { AppState } from '@/state/store';

export type QuizMode = 'topic' | 'module' | 'los' | 'mixed' | 'wrong' | 'timed' | 'bus' | 'daily' | 'new';

export function lastResultByQuestion(s: AppState) {
  const m = new Map<string, boolean>();
  for (const a of s.attempts) m.set(a.qid, a.correct);
  return m;
}

export function wrongQuestionIds(s: AppState) {
  return [...lastResultByQuestion(s)].filter(([, ok]) => !ok).map(([id]) => id);
}

/** Günün sorusu: tarihe göre deterministik. */
export function questionOfDay(date = localDay()): Question | undefined {
  if (!questions.length) return undefined;
  const seed = [...date].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
  return questions[seed % questions.length];
}

export function pickQuestions(
  s: AppState,
  mode: QuizMode,
  opts: { topic?: string; module?: string; los?: string; n?: number; seed?: number },
): Question[] {
  const rand = rng(opts.seed ?? Date.now());
  const n = opts.n ?? 10;
  const seen = lastResultByQuestion(s);
  // Önce hiç görülmemiş, sonra yanlış, sonra doğru yapılmış sorular
  const prioritize = (qs: Question[]) => {
    const sh = shuffle(qs, rand);
    const rank = (q: Question) => (!seen.has(q.id) ? 0 : seen.get(q.id) === false ? 1 : 2);
    return sh.sort((a, b) => rank(a) - rank(b));
  };
  switch (mode) {
    case 'topic':
      return prioritize(questionsByTopic(opts.topic as TopicId)).slice(0, n);
    case 'module':
      return prioritize(questionsByModule(opts.module!)).slice(0, n);
    case 'los':
      return prioritize(questionsByLos(opts.los!)).slice(0, n);
    case 'wrong': {
      const ids = new Set(wrongQuestionIds(s));
      return shuffle(questions.filter((q) => ids.has(q.id)), rand).slice(0, n);
    }
    case 'new':
      return shuffle(questions.filter((q) => !seen.has(q.id)), rand).slice(0, n);
    case 'bus':
      return prioritize(questions).slice(0, Math.min(n, 5));
    case 'daily':
    case 'timed':
    case 'mixed':
    default:
      return prioritize(opts.topic ? questionsByTopic(opts.topic as TopicId) : questions).slice(0, n);
  }
}
