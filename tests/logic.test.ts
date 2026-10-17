import { describe, expect, it } from 'vitest';

import { lintPair } from '../src/lib/glossaryLint';
import { allocate, buildMock, mockReport } from '../src/lib/mock';
import { Question } from '../src/lib/schema';
import { type Attempt, readinessScore, recommendTrLevel, smoothedAccuracy, streak, daysUntil, weakTopics } from '../src/lib/scoring';
import { dueCards, gradeFromAnswer, newCard, review } from '../src/lib/srs';
import { buildVocabIndex, lemmaCandidates, segment } from '../src/lib/tokenize';
import { toCsv, toJson } from '../src/lib/vocabExport';
import type { TopicId } from '../src/lib/schema';

const W = [
  { id: 'ETH', weight_min: 15, weight_max: 20 },
  { id: 'QM', weight_min: 6, weight_max: 9 },
  { id: 'ECO', weight_min: 6, weight_max: 9 },
  { id: 'FSA', weight_min: 11, weight_max: 14 },
  { id: 'CI', weight_min: 6, weight_max: 9 },
  { id: 'EQ', weight_min: 11, weight_max: 14 },
  { id: 'FI', weight_min: 11, weight_max: 14 },
  { id: 'DER', weight_min: 5, weight_max: 8 },
  { id: 'AI', weight_min: 7, weight_max: 10 },
  { id: 'PM', weight_min: 8, weight_max: 12 },
] as { id: TopicId; weight_min: number; weight_max: number }[];

describe('SRS (FSRS)', () => {
  const t0 = new Date('2026-01-01T10:00:00Z');
  it('yeni kart hemen vadeli', () => {
    const c = newCard('q:x', t0);
    expect(dueCards({ [c.key]: c }, t0)).toHaveLength(1);
  });
  it('good aralığı again aralığından uzun ve tekrarla büyür', () => {
    const c = newCard('q:x', t0);
    const again = review(c, 'again', t0);
    const good = review(c, 'good', t0);
    expect(new Date(good.due).getTime()).toBeGreaterThanOrEqual(new Date(again.due).getTime());
    let g = good;
    let prev = 0;
    for (let i = 0; i < 4; i++) {
      const now = new Date(g.due);
      g = review(g, 'good', now);
      const gap = new Date(g.due).getTime() - now.getTime();
      expect(gap).toBeGreaterThanOrEqual(prev);
      prev = gap;
    }
    expect(prev).toBeGreaterThan(24 * 3600 * 1000);
  });
  it('lapse sayısı again ile artar', () => {
    let c = newCard('v:yield', t0);
    for (let i = 0; i < 3; i++) c = review(c, 'good', new Date(c.due));
    const lapsed = review(c, 'again', new Date(c.due));
    expect(lapsed.lapses).toBe(c.lapses + 1);
  });
  it('cevaptan not', () => {
    expect(gradeFromAnswer(false, 10)).toBe('again');
    expect(gradeFromAnswer(true, 200)).toBe('hard');
    expect(gradeFromAnswer(true, 60)).toBe('good');
    expect(gradeFromAnswer(true, 10)).toBe('easy');
  });
});

const mk = (topic: TopicId, correct: boolean, seconds = 60, trLevel: 0 | 1 | 2 | 3 = 3): Attempt => ({
  qid: Math.random().toString(),
  topic,
  los_id: 'x',
  correct,
  seconds,
  at: '2026-01-01',
  trLevel,
});

describe('skor', () => {
  it('büzülmüş doğruluk az veride şansa yakın', () => {
    expect(smoothedAccuracy(2, 2)).toBeLessThan(0.5);
    expect(smoothedAccuracy(95, 100)).toBeGreaterThan(0.85);
    expect(smoothedAccuracy(0, 0)).toBeCloseTo(1 / 3);
  });
  it('hazırlık skoru ağırlıklı: etik başarısı quant başarısından çok etkiler', () => {
    const eth = Array.from({ length: 50 }, () => mk('ETH', true));
    const qm = Array.from({ length: 50 }, () => mk('QM', true));
    expect(readinessScore(eth, W)).toBeGreaterThan(readinessScore(qm, W));
    expect(readinessScore([], W)).toBeCloseTo(33.3, 0);
  });
  it('tüm konular %100 → skor 100e yaklaşır', () => {
    const all = W.flatMap((w) => Array.from({ length: 300 }, () => mk(w.id, true)));
    expect(readinessScore(all, W, 3000)).toBeGreaterThan(95);
  });
  it('zayıf konular önce ağırlığı yüksek ve doğruluğu düşük olanı verir', () => {
    const xs = [...Array.from({ length: 40 }, () => mk('ETH', false)), ...Array.from({ length: 40 }, () => mk('DER', false))];
    expect(weakTopics(xs, W, 1)[0].id).toBe('ETH');
  });
  it('TR seviye önerisi', () => {
    const good = Array.from({ length: 40 }, () => mk('FI', true, 60, 3));
    expect(recommendTrLevel(good, 3).suggest).toBe(2);
    const bad = Array.from({ length: 40 }, () => mk('FI', false, 60, 1));
    expect(recommendTrLevel(bad, 1).suggest).toBe(2);
    expect(recommendTrLevel(good.slice(0, 10), 3).suggest).toBeNull();
    const slow = Array.from({ length: 40 }, () => mk('FI', true, 150, 2));
    expect(recommendTrLevel(slow, 2).suggest).toBeNull();
  });
  it('gün sayacı ve seri', () => {
    expect(daysUntil('2026-02-01', new Date('2026-01-01T15:00:00'))).toBe(31);
    expect(streak(['2026-01-01', '2026-01-02', '2026-01-03'], '2026-01-03')).toBe(3);
    expect(streak(['2026-01-01', '2026-01-02'], '2026-01-03')).toBe(2);
    expect(streak(['2026-01-01'], '2026-01-03')).toBe(0);
  });
});

describe('mock dağılımı', () => {
  it('180 soruyu tam dağıtır ve ağırlıkla orantılı', () => {
    const a = allocate(W, 180);
    expect(Object.values(a).reduce((s, n) => s + n, 0)).toBe(180);
    expect(a.ETH).toBeGreaterThan(a.DER);
    // her konu ağırlık aralığına yakın (±1 soru)
    for (const w of W) {
      expect(a[w.id]).toBeGreaterThanOrEqual(Math.floor((w.weight_min / 100) * 180) - 1);
      expect(a[w.id]).toBeLessThanOrEqual(Math.ceil((w.weight_max / 100) * 180) + 1);
    }
  });
  it('mock 2×90, tekrar yok, deterministik', () => {
    const pool = W.flatMap((w) => Array.from({ length: 40 }, (_, i) => ({ id: `${w.id}-${i}`, topic: w.id })));
    const m1 = buildMock(pool, W, 42);
    const m2 = buildMock(pool, W, 42);
    expect(m1.sessions.map((s) => s.length)).toEqual([90, 90]);
    const ids = m1.sessions.flat().map((q) => q.id);
    expect(new Set(ids).size).toBe(180);
    expect(m2.sessions.flat().map((q) => q.id)).toEqual(ids);
    expect(m1.shortBy).toBe(0);
  });
  it('havuz yetersizse diğer konulardan doldurur', () => {
    const pool = W.flatMap((w) => Array.from({ length: w.id === 'ETH' ? 5 : 30 }, (_, i) => ({ id: `${w.id}-${i}`, topic: w.id })));
    const m = buildMock(pool, W, 1);
    expect(m.sessions.flat()).toHaveLength(180);
  });
  it('rapor', () => {
    const r = mockReport([
      { topic: 'FI', correct: true },
      { topic: 'FI', correct: false },
    ]);
    expect(r[0]).toMatchObject({ topic: 'FI', total: 2, correct: 1, pct: 50 });
  });
});

describe('kelime eşleme', () => {
  const idx = buildVocabIndex([
    { id: 'yield', term_en: 'yield', forms: ['yields'] },
    { id: 'present-value', term_en: 'present value' },
    { id: 'company', term_en: 'company' },
    { id: 'yield-to-maturity', term_en: 'yield to maturity' },
  ]);
  it('çok kelimeli terim en uzun eşleşme', () => {
    const s = segment('The yield to maturity and present value.', idx, new Set(['present-value']));
    const words = s.filter((x) => x.kind === 'word');
    expect(words.map((w) => w.text)).toEqual(['The', 'yield to maturity', 'and', 'present value']);
    expect(words[1]).toMatchObject({ vocabId: 'yield-to-maturity' });
    expect(words[3]).toMatchObject({ vocabId: 'present-value', marked: true });
    expect(s.map((x) => x.text).join('')).toBe('The yield to maturity and present value.');
  });
  it('kök bulma', () => {
    expect(lemmaCandidates('companies')).toContain('company');
    expect(lemmaCandidates('rising')).toContain('rise');
    const s = segment('Companies issue bonds.', idx);
    expect(s[0]).toMatchObject({ vocabId: 'company' });
  });
});

describe('glossary lint', () => {
  const g = [{ en: 'duration', tr: ['durasyon'], enforce: true }];
  it('eksik karşılığı yakalar, ekli biçimi kabul eder', () => {
    expect(lintPair('x', 'f', 'Duration measures risk', 'Süre riski ölçer', g)).toHaveLength(1);
    expect(lintPair('x', 'f', 'Duration measures risk', 'Durasyonu riski ölçer', g)).toHaveLength(0);
    expect(lintPair('x', 'f', 'Price risk', 'Fiyat riski', g)).toHaveLength(0);
  });
});

describe('dışa aktarma', () => {
  const rows = [{ term_en: 'yield', tr: 'getiri, verim', example_en: 'The "yield" is 5%.', example_tr: 'Getiri %5.', topic: 'FI' }];
  it('CSV kaçış ve BOM', () => {
    const csv = toCsv(rows);
    expect(csv.startsWith('﻿term_en,tr,example_en,example_tr,topic\r\n')).toBe(true);
    expect(csv).toContain('"getiri, verim"');
    expect(csv).toContain('"The ""yield"" is 5%."');
  });
  it('JSON alanları', () => {
    expect(Object.keys(JSON.parse(toJson(rows))[0])).toEqual(['term_en', 'tr', 'example_en', 'example_tr', 'topic']);
  });
});

describe('içerik şeması', () => {
  const base = {
    id: 'FI-01-a-q01', level: 'L1', topic: 'FI', module_id: 'FI-01', los_id: 'FI-01-a', curriculum_year: 2026,
    type: 'mcq3', difficulty: 2, cognitive: 'apply', stem_en: 's', stem_tr: 's',
    options: [{ key: 'A', en: '1', tr: '1', value: 1 }, { key: 'B', en: '2', tr: '2', value: 2 }, { key: 'C', en: '3', tr: '3', value: 3 }],
    answer: 'B', explanation_en: 'e', explanation_tr: 'e',
    wrong_option_reasons: { A: { en: 'x', tr: 'x' }, C: { en: 'x', tr: 'x' } },
    numeric: { expr: '1+1' }, source_basis: 'original', verified: false,
  };
  it('geçerli soru', () => expect(Question.safeParse(base).success).toBe(true));
  it('eksik yanlış-şık gerekçesi reddedilir', () => {
    expect(Question.safeParse({ ...base, wrong_option_reasons: { A: { en: 'x', tr: 'x' } } }).success).toBe(false);
  });
  it('L1 mcq3 4 şıkla reddedilir', () => {
    expect(Question.safeParse({ ...base, options: [...base.options, { key: 'D', en: '4', tr: '4' }] }).success).toBe(false);
  });
  it('kopya kaynak tabanı reddedilir', () => expect(Question.safeParse({ ...base, source_basis: 'schweser' }).success).toBe(false));
});

import { blank, buildMatch, buildRound } from '../src/lib/games';
import type { VocabTerm } from '../src/lib/schema';

const mkV = (id: string, term: string, tr: string, ex: string, pos = 'noun'): VocabTerm => ({
  id, term_en: term, forms: [], pronunciation_tr: 'x', ipa: 'x', tr, definition_en_simple: 'd', definition_tr: 'd',
  example_en: ex, example_tr: 'ö', cefr_level: 'B1', topic: 'FI', pos, source_basis: 'original', verified: false,
});

describe('İngilizce oyunları', () => {
  it('boşluk çekimli biçimi de yakalar', () => {
    expect(blank('Bonds yield 5% a year.', { term_en: 'yield', forms: [] })).toBe('Bonds _____ 5% a year.');
    expect(blank('The company issued shares.', { term_en: 'issue', forms: [] })).toBe('The company _____ shares.');
    expect(blank('Nothing here', { term_en: 'yield', forms: [] })).toBeNull();
  });
  const vocab = Array.from({ length: 30 }, (_, i) =>
    mkV(`w${i}`, `word${i}`, `anlam${i}`, `This is word${i} in a sentence.`),
  );
  const input = { vocab, notebookIds: ['w1', 'w2'], seenIds: ['w3'] };
  it('anlam ve boşluk soruları: tek doğru, benzersiz şıklar', () => {
    for (const kind of ['meaning', 'cloze'] as const) {
      const qs = buildRound(kind, input, 10, 42);
      expect(qs).toHaveLength(10);
      for (const q of qs) {
        expect(q.options).toHaveLength(4);
        expect(new Set(q.options.map((o) => o.label)).size).toBe(4);
        expect(q.options.filter((o) => o.id === q.answerId)).toHaveLength(1);
      }
    }
  });
  it('havuz defter kelimelerini önceler ve tekrar etmez', () => {
    const qs = buildRound('meaning', input, 10, 1);
    expect(new Set(qs.map((q) => q.id)).size).toBe(10);
    expect(qs.map((q) => q.id)).toEqual(expect.arrayContaining(['w1', 'w2']));
  });
  it('eşleştirme tahtası', () => {
    const b = buildMatch(input, 5, 3);
    expect(b.left).toHaveLength(5);
    expect(new Set(b.left.map((x) => x.id))).toEqual(new Set(b.right.map((x) => x.id)));
  });
});

import { xpInfo } from '../src/lib/scoring';
describe('xpInfo', () => {
  it('boş durumda seviye 1', () => {
    const x = xpInfo([], 0, 0);
    expect(x.level).toBe(1);
    expect(x.xp).toBe(0);
    expect(x.pct).toBe(0);
  });
  it('puan arttıkça seviye artar, yüzde 0-100 arasında', () => {
    const many = Array.from({ length: 200 }, (_, i) => ({ correct: i % 2 === 0 }));
    const x = xpInfo(many, 10, 1);
    expect(x.level).toBeGreaterThan(2);
    expect(x.pct).toBeGreaterThanOrEqual(0);
    expect(x.pct).toBeLessThan(100);
    expect(x.toNext).toBeGreaterThan(0);
  });
});
