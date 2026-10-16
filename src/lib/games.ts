// İngilizce oyunları: mevcut kelime verisinden (VocabTerm) soru üretir. Yeni içerik gerektirmez.
import { rng, shuffle } from './mock';
import type { VocabTerm } from './schema';

export type GameOption = { id: string; label: string };
export type GameQ = {
  kind: 'meaning' | 'cloze';
  id: string; // hedef kelime kimliği
  prompt: string;
  promptSub?: string;
  options: GameOption[];
  answerId: string;
  reveal: { en: string; tr: string; termTr: string };
  speak: string;
};

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Örnek cümlede hedef kelimeyi (çekimli biçimleriyle) ____ ile değiştirir; bulunamazsa null. */
export function blank(sentence: string, v: Pick<VocabTerm, 'term_en' | 'forms'>): string | null {
  const bases = [v.term_en, ...(v.forms ?? [])].filter(Boolean).sort((a, b) => b.length - a.length);
  for (const b of bases) {
    const re = new RegExp(`(^|[^A-Za-z])(${esc(b)}(?:s|es|d|ed|ing)?)(?![A-Za-z])`, 'i');
    if (re.test(sentence)) return sentence.replace(re, (_m, pre) => `${pre}_____`);
  }
  return null;
}

function distractors(target: VocabTerm, pool: VocabTerm[], n: number, rand: () => number, key: 'tr' | 'term_en') {
  const same = shuffle(
    pool.filter((p) => p.id !== target.id && p[key] !== target[key] && (p.pos === target.pos || p.topic === target.topic)),
    rand,
  );
  const rest = shuffle(
    pool.filter((p) => p.id !== target.id && p[key] !== target[key]),
    rand,
  );
  const out: VocabTerm[] = [];
  for (const c of [...same, ...rest]) {
    if (out.length >= n) break;
    if (out.some((o) => o[key] === c[key])) continue;
    out.push(c);
  }
  return out;
}

const shortTr = (s: string) => (s.length > 44 ? s.slice(0, 42).trimEnd() + '…' : s);

export function meaningQ(v: VocabTerm, all: VocabTerm[], rand: () => number): GameQ {
  const ds = distractors(v, all, 3, rand, 'tr');
  const options = shuffle([v, ...ds], rand).map((o) => ({ id: o.id, label: shortTr(o.tr) }));
  return {
    kind: 'meaning',
    id: v.id,
    prompt: v.term_en,
    promptSub: `${v.pronunciation_tr} · /${v.ipa.replace(/^\/|\/$/g, '')}/`,
    options,
    answerId: v.id,
    reveal: { en: v.example_en, tr: v.example_tr, termTr: v.tr },
    speak: v.term_en,
  };
}

export function clozeQ(v: VocabTerm, all: VocabTerm[], rand: () => number): GameQ | null {
  const sentence = blank(v.example_en, v);
  if (!sentence) return null;
  const ds = distractors(v, all, 3, rand, 'term_en');
  const options = shuffle([v, ...ds], rand).map((o) => ({ id: o.id, label: o.term_en }));
  return {
    kind: 'cloze',
    id: v.id,
    prompt: sentence,
    promptSub: v.example_tr,
    options,
    answerId: v.id,
    reveal: { en: v.example_en, tr: v.example_tr, termTr: `${v.term_en} = ${v.tr}` },
    speak: v.example_en,
  };
}

export type PoolInput = {
  vocab: VocabTerm[];
  notebookIds: string[];
  seenIds: string[]; // çözülen sorularda geçen kelimeler (önce yanlış yapılanlar)
};

/**
 * Oyun havuzu (hepsini kapsamaz): önce defterdeki kelimeler, sonra çözdüğün sorulardaki kelimeler,
 * sonra günlük anlamı farklı olan / A2-B1 kelimeler. Her seferinde karışık ve sınırlı sayıda.
 */
function poolOrdered(input: PoolInput, n: number, seed: number): VocabTerm[] {
  const rand = rng(seed);
  const byId = new Map(input.vocab.map((v) => [v.id, v]));
  const chosen: VocabTerm[] = [];
  const used = new Set<string>();
  const add = (ids: string[], limit: number) => {
    for (const id of shuffle(ids, rand)) {
      if (chosen.length >= limit) return;
      const v = byId.get(id);
      if (v && !used.has(id)) {
        used.add(id);
        chosen.push(v);
      }
    }
  };
  add(input.notebookIds, Math.ceil(n * 0.4));
  add(input.seenIds, Math.ceil(n * 0.8));
  const easy = input.vocab.filter((v) => v.everyday_meaning || v.cefr_level === 'A2' || v.cefr_level === 'B1').map((v) => v.id);
  add(easy, n);
  add(input.vocab.map((v) => v.id), n);
  return chosen.slice(0, n);
}

export function pickPool(input: PoolInput, n: number, seed: number): VocabTerm[] {
  return shuffle(poolOrdered(input, n, seed), rng(seed + 3));
}

export function buildRound(kind: 'meaning' | 'cloze', input: PoolInput, n: number, seed: number): GameQ[] {
  const rand = rng(seed + 7);
  const out: GameQ[] = [];
  for (const v of poolOrdered(input, n * 3, seed)) {
    if (out.length >= n) break;
    const q = kind === 'meaning' ? meaningQ(v, input.vocab, rand) : clozeQ(v, input.vocab, rand);
    if (q) out.push(q);
  }
  return shuffle(out, rand);
}

export type MatchBoard = { left: GameOption[]; right: GameOption[] };

export function buildMatch(input: PoolInput, pairs: number, seed: number): MatchBoard {
  const rand = rng(seed + 13);
  const vs: VocabTerm[] = [];
  for (const v of pickPool(input, pairs * 3, seed)) {
    if (vs.length >= pairs) break;
    if (vs.some((x) => x.tr === v.tr)) continue;
    vs.push(v);
  }
  return {
    left: shuffle(vs, rand).map((v) => ({ id: v.id, label: v.term_en })),
    right: shuffle(vs, rand).map((v) => ({ id: v.id, label: shortTr(v.tr) })),
  };
}
