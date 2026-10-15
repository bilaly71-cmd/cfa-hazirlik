// Mock sınav dağılımı: konu ağırlık orta noktalarına göre en büyük kalan (Hamilton) yöntemi.
import type { TopicId } from './schema';
import type { TopicWeight } from './scoring';

export function allocate(weights: TopicWeight[], total: number): Record<TopicId, number> {
  const mids = weights.map((w) => ({ id: w.id, mid: (w.weight_min + w.weight_max) / 2 }));
  const sum = mids.reduce((s, m) => s + m.mid, 0);
  const raw = mids.map((m) => ({ id: m.id, exact: (m.mid / sum) * total }));
  const out = Object.fromEntries(raw.map((r) => [r.id, Math.floor(r.exact)])) as Record<TopicId, number>;
  let left = total - Object.values(out).reduce((s, n) => s + n, 0);
  const order = [...raw].sort((a, b) => b.exact - Math.floor(b.exact) - (a.exact - Math.floor(a.exact)));
  for (let i = 0; left > 0; i = (i + 1) % order.length, left--) out[order[i].id] += 1;
  return out;
}

/** Deterministik RNG (mulberry32) — aynı tohumla aynı mock. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(xs: T[], rand: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Q = { id: string; topic: TopicId };

/**
 * Havuzdan mock oluşturur. L1 formatı: 2 oturum × 90 soru.
 * Bir konuda yeterli soru yoksa eksik kısım diğer konulardan ağırlık sırasıyla doldurulur.
 * Etik soruları iki oturuma bölünür (gerçek sınav düzenine benzer).
 */
export function buildMock(pool: Q[], weights: TopicWeight[], seed: number, perSession = 90, sessions = 2) {
  const total = perSession * sessions;
  const target = allocate(weights, total);
  const rand = rng(seed);
  const byTopic = new Map<TopicId, Q[]>();
  for (const q of shuffle(pool, rand)) {
    const arr = byTopic.get(q.topic) ?? [];
    arr.push(q);
    byTopic.set(q.topic, arr);
  }
  const picked: Q[] = [];
  let deficit = 0;
  for (const w of weights) {
    const avail = byTopic.get(w.id) ?? [];
    const take = Math.min(target[w.id], avail.length);
    picked.push(...avail.splice(0, take));
    deficit += target[w.id] - take;
  }
  const rest = shuffle([...byTopic.values()].flat(), rand);
  picked.push(...rest.slice(0, deficit));
  const all = shuffle(picked, rand);
  const out: Q[][] = [];
  for (let s = 0; s < sessions; s++) out.push(all.slice(s * perSession, (s + 1) * perSession));
  return { sessions: out, target, shortBy: Math.max(0, total - all.length) };
}

export type MockTopicResult = { topic: TopicId; total: number; correct: number; pct: number };

export function mockReport(items: { topic: TopicId; correct: boolean }[]): MockTopicResult[] {
  const m = new Map<TopicId, MockTopicResult>();
  for (const it of items) {
    const r = m.get(it.topic) ?? { topic: it.topic, total: 0, correct: 0, pct: 0 };
    r.total += 1;
    r.correct += it.correct ? 1 : 0;
    m.set(it.topic, r);
  }
  return [...m.values()].map((r) => ({ ...r, pct: r.total ? Math.round((r.correct / r.total) * 100) : 0 }));
}
