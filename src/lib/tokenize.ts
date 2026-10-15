// Metni dokunulabilir kelimelere böler ve kelime defteri terimlerini (çok kelimeli dahil) eşler.

export type Segment =
  | { kind: 'sep'; text: string }
  | { kind: 'word'; text: string; vocabId?: string; marked?: boolean };

export type VocabIndex = { phrases: Map<string, string>; maxWords: number };

const WORD = /[A-Za-zÀ-ÿ]+(?:['’-][A-Za-zÀ-ÿ]+)*/g;

export function normalize(s: string) {
  return s.toLowerCase().replace(/’/g, "'").trim();
}

export function buildVocabIndex(terms: { id: string; term_en: string; forms?: string[] }[]): VocabIndex {
  const phrases = new Map<string, string>();
  let maxWords = 1;
  for (const t of terms) {
    for (const f of [t.term_en, ...(t.forms ?? [])]) {
      const key = normalize(f).replace(/\s+/g, ' ');
      if (!key) continue;
      if (!phrases.has(key)) phrases.set(key, t.id);
      maxWords = Math.max(maxWords, key.split(' ').length);
    }
  }
  return { phrases, maxWords: Math.min(maxWords, 6) };
}

/** Basit kök bulma: yields→yield, yielded→yield, companies→company, rising→rise. */
export function lemmaCandidates(w: string): string[] {
  const s = normalize(w);
  const out = [s];
  const add = (x: string) => x.length > 1 && !out.includes(x) && out.push(x);
  if (s.endsWith("'s")) add(s.slice(0, -2));
  if (s.endsWith('ies')) add(s.slice(0, -3) + 'y');
  if (s.endsWith('es')) add(s.slice(0, -2));
  if (s.endsWith('s') && !s.endsWith('ss')) add(s.slice(0, -1));
  if (s.endsWith('ied')) add(s.slice(0, -3) + 'y');
  if (s.endsWith('ed')) {
    add(s.slice(0, -2));
    add(s.slice(0, -1));
    if (/(.)\1ed$/.test(s)) add(s.slice(0, -3));
  }
  if (s.endsWith('ing')) {
    add(s.slice(0, -3));
    add(s.slice(0, -3) + 'e');
    if (/(.)\1ing$/.test(s)) add(s.slice(0, -4));
  }
  if (s.endsWith('ly')) add(s.slice(0, -2));
  return out;
}

export function lookupWord(index: VocabIndex, word: string): string | undefined {
  for (const c of lemmaCandidates(word)) {
    const id = index.phrases.get(c);
    if (id) return id;
  }
  return undefined;
}

/**
 * Metni segmentlere ayırır. `marked` listesindeki kimlikler (soru/derse özel işaretli kelimeler) vurgulanır.
 * Çok kelimeli terimler en uzun eşleşme ile tek segment olur.
 */
export function segment(text: string, index?: VocabIndex, marked?: Set<string>): Segment[] {
  const words: { text: string; start: number; end: number }[] = [];
  for (const m of text.matchAll(WORD)) words.push({ text: m[0], start: m.index!, end: m.index! + m[0].length });
  const out: Segment[] = [];
  let pos = 0;
  let i = 0;
  while (i < words.length) {
    const w = words[i];
    if (w.start > pos) out.push({ kind: 'sep', text: text.slice(pos, w.start) });
    let matched = false;
    if (index) {
      for (let n = Math.min(index.maxWords, words.length - i); n >= 2; n--) {
        const span = words.slice(i, i + n);
        // yalnızca boşlukla ayrılmış kelimeleri birleştir
        const gapsOk = span.every((s, k) => k === 0 || /^\s+$/.test(text.slice(span[k - 1].end, s.start)));
        if (!gapsOk) continue;
        const phrase = normalize(span.map((s) => s.text).join(' '));
        const id = index.phrases.get(phrase) ?? index.phrases.get(lemmaCandidates(phrase).find((c) => index.phrases.has(c)) ?? '');
        if (id) {
          const t = text.slice(span[0].start, span[n - 1].end);
          out.push({ kind: 'word', text: t, vocabId: id, marked: marked?.has(id) });
          pos = span[n - 1].end;
          i += n;
          matched = true;
          break;
        }
      }
    }
    if (matched) continue;
    const id = index ? lookupWord(index, w.text) : undefined;
    out.push({ kind: 'word', text: w.text, vocabId: id, marked: id ? marked?.has(id) : false });
    pos = w.end;
    i += 1;
  }
  if (pos < text.length) out.push({ kind: 'sep', text: text.slice(pos) });
  return out;
}
