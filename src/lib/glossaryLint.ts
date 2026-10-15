// Glossary lint: İngilizce metinde zorunlu bir terim geçiyorsa Türkçe karşılığında beklenen terimlerden biri olmalı.
import type { GlossaryEntry } from './schema';

export type LintIssue = { id: string; field: string; term: string; expected: string[] };

const trLower = (s: string) => s.toLocaleLowerCase('tr-TR');

function containsWord(hay: string, needle: string) {
  const re = new RegExp(`(^|[^a-z])${needle.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(s|es)?([^a-z]|$)`);
  return re.test(hay.toLowerCase());
}

/** Türkçe eklerle uyumlu kök araması: "durasyon" → "durasyonu", "durasyonun" eşleşir. */
function containsTr(hay: string, stem: string) {
  return trLower(hay).includes(trLower(stem));
}

export function lintPair(
  id: string,
  field: string,
  en: string | undefined,
  tr: string | undefined,
  glossary: GlossaryEntry[],
): LintIssue[] {
  if (!en || !tr) return [];
  const issues: LintIssue[] = [];
  for (const g of glossary) {
    if (!g.enforce) continue;
    if (containsWord(en, g.en) && !g.tr.some((t) => containsTr(tr, t))) {
      issues.push({ id, field, term: g.en, expected: g.tr });
    }
  }
  return issues;
}

type Pairable = Record<string, unknown>;

/** Bir nesnedeki tüm *_en / *_tr ve {en,tr} çiftlerini dolaşarak lint uygular. */
export function lintObject(id: string, obj: unknown, glossary: GlossaryEntry[], path = ''): LintIssue[] {
  if (!obj || typeof obj !== 'object') return [];
  if (Array.isArray(obj)) return obj.flatMap((x, i) => lintObject(id, x, glossary, `${path}[${i}]`));
  const o = obj as Pairable;
  const issues: LintIssue[] = [];
  if (typeof o.en === 'string' && typeof o.tr === 'string') issues.push(...lintPair(id, path || 'en/tr', o.en, o.tr, glossary));
  for (const k of Object.keys(o)) {
    if (k.endsWith('_en')) {
      const base = k.slice(0, -3);
      const tr = o[`${base}_tr`];
      if (typeof o[k] === 'string' && typeof tr === 'string') issues.push(...lintPair(id, `${path}.${base}`, o[k] as string, tr, glossary));
    }
    const v = o[k];
    if (v && typeof v === 'object') issues.push(...lintObject(id, v, glossary, `${path}.${k}`));
  }
  return issues;
}
