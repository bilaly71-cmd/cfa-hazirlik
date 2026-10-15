/* İçerik hattı: doğrulama, paketleme, n-gram telif taraması.
 *   npm run validate-content                 → tüm içerik (hata varsa çıkış kodu 1)
 *   npm run validate-content -- --file <yol> → tek dosya
 *   npm run build-content                    → doğrulanmış içeriği src/content/bundle/ altına yazar + metrikler
 *   npm run ngram-check                      → özgünlük taraması (referans parçacıkları + iç kopya)
 */
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

import { lintObject, type LintIssue } from '../src/lib/glossaryLint';
import {
  CalcGuide,
  EthicsCase,
  Formula,
  GlossaryEntry,
  Lesson,
  Question,
  QuestionPattern,
  Syllabus,
  VocabTerm,
} from '../src/lib/schema';

const ROOT = path.resolve(__dirname, '..');
const C = (...p: string[]) => path.join(ROOT, 'content', ...p);
const BUNDLE = path.join(ROOT, 'src', 'content', 'bundle');

type Problem = { file: string; id?: string; msg: string };
const errors: Problem[] = [];
const warnings: Problem[] = [];

const rel = (f: string) => path.relative(ROOT, f).replace(/\\/g, '/');
const readJson = (f: string) => JSON.parse(fs.readFileSync(f, 'utf8').replace(/^﻿/, ''));
const listJson = (dir: string): string[] =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
        const p = path.join(dir, d.name);
        return d.isDirectory() ? listJson(p) : d.name.endsWith('.json') ? [p] : [];
      })
    : [];

function parseArr<T>(schema: z.ZodType<T>, file: string, data: unknown): T[] {
  if (!Array.isArray(data)) {
    errors.push({ file: rel(file), msg: 'dizi bekleniyordu' });
    return [];
  }
  const out: T[] = [];
  data.forEach((x, i) => {
    const r = schema.safeParse(x);
    if (r.success) out.push(r.data);
    else
      errors.push({
        file: rel(file),
        id: (x as { id?: string })?.id ?? `#${i}`,
        msg: r.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join('; '),
      });
  });
  return out;
}

// --preview: doğrulanmamış içeriği de pakete alır (YALNIZCA yerel UI testi; commit edilmez)
const PREVIEW = process.argv.includes('--preview');
const isVerified = (x: { verified: unknown }) => PREVIEW || (typeof x.verified === 'object' && x.verified !== null);

function loadAll(onlyFile?: string) {
  const syllabi = ['L1', 'L2', 'L3']
    .map((l) => C('syllabus', `${l}.json`))
    .filter((f) => fs.existsSync(f))
    .map((f) => {
      const r = Syllabus.safeParse(readJson(f));
      if (!r.success) {
        errors.push({ file: rel(f), msg: r.error.issues.slice(0, 5).map((e) => `${e.path.join('.')}: ${e.message}`).join('; ') });
        return null;
      }
      return r.data;
    })
    .filter((x): x is Syllabus => !!x);

  const glossary = fs.existsSync(C('glossary', 'glossary.json'))
    ? parseArr(GlossaryEntry, C('glossary', 'glossary.json'), readJson(C('glossary', 'glossary.json')))
    : [];

  const lessons: Lesson[] = [];
  const questions: (Question & { _file: string })[] = [];
  const pkgFiles = ['L1', 'L2', 'L3'].flatMap((l) => listJson(C(l)));
  for (const f of pkgFiles) {
    if (onlyFile && path.resolve(onlyFile) !== path.resolve(f)) continue;
    let data: { module_id?: string; lesson?: unknown; questions?: unknown[] };
    try {
      data = readJson(f);
    } catch (e) {
      errors.push({ file: rel(f), msg: `JSON okunamadı: ${(e as Error).message}` });
      continue;
    }
    if (data.lesson) {
      const r = Lesson.safeParse(data.lesson);
      if (r.success) lessons.push(r.data);
      else errors.push({ file: rel(f), id: 'lesson', msg: r.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ') });
    }
    for (const q of parseArr(Question, f, data.questions ?? [])) questions.push({ ...q, _file: rel(f) });
  }

  const vocab: VocabTerm[] = [];
  const seenVocab = new Map<string, string>();
  for (const f of listJson(C('vocab'))) {
    if (onlyFile && path.resolve(onlyFile) !== path.resolve(f)) continue;
    for (const v of parseArr(VocabTerm, f, readJson(f))) {
      if (seenVocab.has(v.id)) {
        warnings.push({ file: rel(f), id: v.id, msg: `kelime tekrar tanımlı (ilki: ${seenVocab.get(v.id)}) — ilki kullanılır` });
        continue;
      }
      seenVocab.set(v.id, rel(f));
      vocab.push(v);
    }
  }
  const extra = <T>(schema: z.ZodType<T>, dir: string) =>
    listJson(C(dir)).flatMap((f) => (onlyFile && path.resolve(onlyFile) !== path.resolve(f) ? [] : parseArr(schema, f, readJson(f))));

  return {
    syllabi,
    glossary,
    lessons,
    questions,
    vocab,
    patterns: extra(QuestionPattern, 'patterns'),
    ethics: extra(EthicsCase, 'ethics_cases'),
    formulas: extra(Formula, 'formulas'),
    calc: extra(CalcGuide, 'calculator'),
  };
}

function crossChecks(d: ReturnType<typeof loadAll>, partial: boolean) {
  const losIds = new Set<string>();
  const modIds = new Set<string>();
  for (const s of d.syllabi) for (const t of s.topics) for (const m of t.modules) {
    modIds.add(m.id);
    for (const l of m.los) losIds.add(l.id);
  }
  const ids = new Map<string, string>();
  for (const q of d.questions) {
    if (ids.has(q.id)) errors.push({ file: q._file, id: q.id, msg: `soru kimliği tekrar (${ids.get(q.id)})` });
    ids.set(q.id, q._file);
    if (losIds.size && !losIds.has(q.los_id)) errors.push({ file: q._file, id: q.id, msg: `los_id müfredatta yok: ${q.los_id}` });
    if (modIds.size && !modIds.has(q.module_id)) errors.push({ file: q._file, id: q.id, msg: `module_id müfredatta yok: ${q.module_id}` });
    if (!q.los_id.startsWith(q.module_id)) errors.push({ file: q._file, id: q.id, msg: 'los_id module_id ile başlamıyor' });
    if (q.level === 'L1' && (q.vocab_ids.length < 3 || q.vocab_ids.length > 8))
      warnings.push({ file: q._file, id: q.id, msg: `vocab_ids sayısı ${q.vocab_ids.length} (3-8 beklenir)` });
  }
  for (const l of d.lessons) if (modIds.size && !modIds.has(l.module_id)) errors.push({ file: l.id, msg: `ders modülü müfredatta yok: ${l.module_id}` });

  if (!partial) {
    const vocabIds = new Set(d.vocab.map((v) => v.id));
    const missing = new Map<string, number>();
    for (const x of [...d.questions, ...d.lessons]) for (const v of x.vocab_ids) if (!vocabIds.has(v)) missing.set(v, (missing.get(v) ?? 0) + 1);
    if (missing.size)
      warnings.push({ file: 'vocab', msg: `tanımsız vocab_ids (${missing.size}): ${[...missing.keys()].slice(0, 40).join(', ')}${missing.size > 40 ? ' …' : ''}` });
  }

  // cevap dengesi (modül bazında)
  const byFile = new Map<string, Question[]>();
  for (const q of d.questions) byFile.set(q._file, [...(byFile.get(q._file) ?? []), q]);
  for (const [f, qs] of byFile) {
    if (qs.length < 6) continue;
    const cnt: Record<string, number> = {};
    for (const q of qs) cnt[q.answer] = (cnt[q.answer] ?? 0) + 1;
    for (const [k, n] of Object.entries(cnt))
      if (n / qs.length > 0.45) warnings.push({ file: f, msg: `cevap dengesizliği: ${k} = %${Math.round((n / qs.length) * 100)}` });
  }

  const lint: LintIssue[] = [];
  if (d.glossary.length) for (const x of [...d.questions, ...d.lessons, ...d.vocab]) lint.push(...lintObject(x.id, x, d.glossary));
  for (const l of lint.slice(0, 200))
    warnings.push({ file: 'glossary', id: l.id, msg: `${l.field}: "${l.term}" → TR'de ${l.expected.join(' / ')} bekleniyor` });
  return { losIds, lint };
}

function metrics(d: ReturnType<typeof loadAll>) {
  const L1 = d.syllabi.find((s) => s.level === 'L1');
  const rows: string[] = [];
  const perLos = new Map<string, number>();
  for (const q of d.questions) if (isVerified(q)) perLos.set(q.los_id, (perLos.get(q.los_id) ?? 0) + 1);
  let tq = 0, tv = 0, tlos = 0, tcov = 0, tles = 0, tmod = 0;
  for (const t of L1?.topics ?? []) {
    const qs = d.questions.filter((q) => q.topic === t.id && q.level === 'L1');
    const ver = qs.filter(isVerified).length;
    const los = t.modules.flatMap((m) => m.los);
    const covered = los.filter((l) => (perLos.get(l.id) ?? 0) >= 5).length;
    const les = d.lessons.filter((l) => l.topic === t.id && l.level === 'L1' && isVerified(l)).length;
    const words = d.vocab.filter((v) => v.topic === t.id).length;
    rows.push(`| ${t.id} | ${qs.length} | ${ver} | ${qs.length ? Math.round((ver / qs.length) * 100) : 0}% | ${covered}/${los.length} | ${les}/${t.modules.length} | ${words} |`);
    tq += qs.length; tv += ver; tlos += los.length; tcov += covered; tles += les; tmod += t.modules.length;
  }
  const vv = d.vocab.filter(isVerified).length;
  const table = [
    '| Konu | Soru | Doğrulanmış | Oran | LOS (≥5 soru) | Ders (doğr.) | Kelime |',
    '|---|---|---|---|---|---|---|',
    ...rows,
    `| **Toplam** | ${tq} | ${tv} | ${tq ? Math.round((tv / tq) * 100) : 0}% | ${tcov}/${tlos} | ${tles}/${tmod} | ${d.vocab.length} (doğr. ${vv}) |`,
  ].join('\n');
  return { table, tq, tv, vocab: d.vocab.length, vocabVerified: vv };
}

function writeBundle(d: ReturnType<typeof loadAll>) {
  fs.mkdirSync(BUNDLE, { recursive: true });
  const w = (name: string, data: unknown) => fs.writeFileSync(path.join(BUNDLE, name), JSON.stringify(data));
  const strip = <T extends { _file?: string }>(x: T) => {
    const { _file, ...rest } = x;
    return rest;
  };
  const qs = d.questions.filter(isVerified).map(strip);
  w('questions.json', qs);
  w('lessons.json', d.lessons.filter(isVerified));
  w('vocab.json', d.vocab.filter(isVerified));
  w('patterns.json', d.patterns.filter(isVerified));
  w('ethics.json', d.ethics.filter(isVerified));
  w('formulas.json', d.formulas.filter(isVerified));
  w('calc.json', d.calc.filter(isVerified));
  w('syllabus.json', d.syllabi);
  const spk = C('syllabus', 'spk_map.json');
  w('spk.json', fs.existsSync(spk) ? readJson(spk) : { topics: {} });
  const info = C('exam_info', 'info.json');
  w('examinfo.json', fs.existsSync(info) ? readJson(info) : null);
  w('meta.json', { built: new Date().toISOString().slice(0, 10), questions: qs.length });
}

function ngrams(text: string, n: number) {
  const toks = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + n <= toks.length; i++) out.add(toks.slice(i, i + n).join(' '));
  return out;
}

function ngramCheck(d: ReturnType<typeof loadAll>) {
  const N = 8;
  const refDir = C('_reference');
  const refs = fs.existsSync(refDir)
    ? fs.readdirSync(refDir).filter((f) => f.endsWith('.txt')).map((f) => ({ f, g: ngrams(fs.readFileSync(path.join(refDir, f), 'utf8'), N) }))
    : [];
  const texts = [
    ...d.questions.map((q) => ({ id: q.id, t: `${q.stem_en} ${q.explanation_en}` })),
    ...d.lessons.map((l) => ({ id: l.id, t: l.sections.map((s) => s.en).join(' ') })),
  ];
  const hits: string[] = [];
  for (const x of texts) {
    const g = ngrams(x.t, N);
    if (!g.size) continue;
    for (const r of refs) {
      let c = 0;
      for (const s of g) if (r.g.has(s)) c++;
      if (c / g.size > 0.15) hits.push(`${x.id} ↔ ${r.f}: %${Math.round((c / g.size) * 100)} ${N}-gram örtüşme`);
    }
  }
  // iç kopya: soru kökleri arasında yüksek örtüşme
  const stems = d.questions.map((q) => ({ id: q.id, g: ngrams(q.stem_en, 6) })).filter((s) => s.g.size >= 4);
  for (let i = 0; i < stems.length; i++)
    for (let j = i + 1; j < stems.length; j++) {
      let c = 0;
      for (const s of stems[i].g) if (stems[j].g.has(s)) c++;
      const r = c / Math.min(stems[i].g.size, stems[j].g.size);
      if (r > 0.8) hits.push(`iç kopya? ${stems[i].id} ↔ ${stems[j].id}: %${Math.round(r * 100)}`);
    }
  return { refs: refs.length, hits };
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0] ?? 'validate';
  const fi = args.indexOf('--file');
  const onlyFile = fi >= 0 ? args[fi + 1] : undefined;
  const d = loadAll(onlyFile);
  crossChecks(d, !!onlyFile);

  if (cmd === 'ngram') {
    const r = ngramCheck(d);
    console.log(`Referans dosyası: ${r.refs}, şüpheli: ${r.hits.length}`);
    for (const h of r.hits) console.log('  ' + h);
    fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true });
    fs.writeFileSync(path.join(ROOT, 'reports', 'ngram_report.md'), `# n-gram özgünlük taraması\n\nReferans: ${r.refs}\n\n${r.hits.map((h) => `- ${h}`).join('\n') || 'Şüpheli yok.'}\n`);
    process.exit(0);
  }

  for (const w of warnings.slice(0, 80)) console.log(`UYARI ${w.file}${w.id ? ` [${w.id}]` : ''}: ${w.msg}`);
  if (warnings.length > 80) console.log(`… ${warnings.length - 80} uyarı daha`);
  for (const e of errors) console.log(`HATA ${e.file}${e.id ? ` [${e.id}]` : ''}: ${e.msg}`);
  const m = metrics(d);
  console.log(`\nSorular: ${m.tq} (doğrulanmış ${m.tv}) · Ders: ${d.lessons.length} · Kelime: ${m.vocab} · Hata: ${errors.length} · Uyarı: ${warnings.length}`);

  if (cmd === 'build') {
    writeBundle(d);
    fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true });
    fs.writeFileSync(path.join(ROOT, 'reports', 'metrics.md'), `# İçerik metrikleri (${new Date().toISOString().slice(0, 10)})\n\n${m.table}\n`);
    console.log(m.table);
  }
  process.exit(errors.length ? 1 : 0);
}

main();
