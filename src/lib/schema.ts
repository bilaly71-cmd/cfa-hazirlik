// İçerik şemaları (zod). Hem uygulama hem `npm run validate-content` bunu kullanır.
// Bu dosya React Native'e bağımlı değildir; Node'da da çalışır.
import { z } from 'zod';

export const TopicId = z.enum(['QM', 'ECO', 'CI', 'FSA', 'EQ', 'FI', 'DER', 'AI', 'PM', 'ETH']);
export type TopicId = z.infer<typeof TopicId>;

export const Level = z.enum(['L1', 'L2', 'L3']);

const Bi = z.object({ en: z.string().min(1), tr: z.string().min(1) });
export type Bi = z.infer<typeof Bi>;

export const Verified = z.union([
  z.literal(false),
  z.object({ by: z.string().min(1), method: z.string().min(1), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }),
]);

export const SpkLink = z.object({
  status: z.enum(['known', 'partial', 'new']),
  note_tr: z.string().optional(),
});

export const Option = z.object({
  key: z.enum(['A', 'B', 'C', 'D']),
  en: z.string().min(1),
  tr: z.string().min(1),
  /** Sayısal şıklarda şıkkın sayısal değeri (verify_numeric.py kullanır). */
  value: z.number().optional(),
});

export const SolutionStep = z.object({
  en: z.string().min(1),
  tr: z.string().min(1),
  formula_latex: z.string().optional(),
  values: z.record(z.string(), z.union([z.number(), z.string()])).optional(),
});

export const Calculator = z.object({
  device: z.enum(['BA II Plus', 'HP 12C']),
  keystrokes: z.array(z.string()).min(1),
  note_tr: z.string().optional(),
});

export const Numeric = z.object({
  /** Python ifadesi; scripts/verify_numeric.py bunu hesaplar ve doğru şıkla karşılaştırır. */
  expr: z.string().min(1),
  unit: z.string().optional(),
  /** Göreli tolerans (varsayılan 0.005 = %0,5). */
  tol: z.number().positive().optional(),
});

export const Question = z
  .object({
    id: z.string().regex(/^[A-Za-z0-9.-]+$/),
    level: Level,
    topic: TopicId,
    module_id: z.string(),
    los_id: z.string(),
    curriculum_year: z.number().int(),
    type: z.enum(['mcq3', 'item_set', 'constructed_response']),
    difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    cognitive: z.enum(['recall', 'apply', 'analyze']),
    /** item_set için ortak vignette kimliği */
    set_id: z.string().optional(),
    stem_en: z.string().min(1),
    stem_tr: z.string().min(1),
    options: z.array(Option).min(3).max(4),
    answer: z.enum(['A', 'B', 'C', 'D']),
    explanation_en: z.string().min(1),
    explanation_tr: z.string().min(1),
    wrong_option_reasons: z.record(z.string(), Bi),
    solution_steps: z.array(SolutionStep).default([]),
    calculator: Calculator.optional(),
    numeric: Numeric.optional(),
    vocab_ids: z.array(z.string()).default([]),
    pattern_ids: z.array(z.string()).optional(),
    spk_link: SpkLink.optional(),
    source_basis: z.literal('original'),
    verified: Verified,
  })
  .superRefine((q, ctx) => {
    const keys = q.options.map((o) => o.key);
    if (new Set(keys).size !== keys.length) ctx.addIssue({ code: 'custom', message: 'şık anahtarları tekrar ediyor' });
    if (!keys.includes(q.answer)) ctx.addIssue({ code: 'custom', message: `cevap ${q.answer} şıklarda yok` });
    if (q.level === 'L1' && q.type === 'mcq3' && q.options.length !== 3)
      ctx.addIssue({ code: 'custom', message: 'L1 mcq3 tam 3 şık olmalı' });
    for (const k of keys) {
      if (k !== q.answer && !q.wrong_option_reasons[k])
        ctx.addIssue({ code: 'custom', message: `yanlış şık ${k} için gerekçe yok` });
    }
    if (q.wrong_option_reasons[q.answer])
      ctx.addIssue({ code: 'custom', message: 'doğru şık wrong_option_reasons içinde olmamalı' });
    if (q.numeric) {
      const opt = q.options.find((o) => o.key === q.answer);
      if (opt?.value === undefined)
        ctx.addIssue({ code: 'custom', message: 'numeric soruda doğru şıkkın value alanı olmalı' });
    }
  });
export type Question = z.infer<typeof Question>;

export const LessonSection = z.object({
  kind: z.enum(['intuition', 'definition', 'formula', 'example', 'traps', 'turkey', 'text']).default('text'),
  heading_en: z.string().optional(),
  heading_tr: z.string().optional(),
  en: z.string().min(1),
  tr: z.string().min(1),
  key_terms: z.array(z.string()).default([]),
  formula_latex: z.string().optional(),
  example: Bi.extend({ formula_latex: z.string().optional() }).optional(),
  table: z
    .object({
      headers: z.array(Bi),
      rows: z.array(z.array(z.string())),
    })
    .optional(),
});

export const Lesson = z.object({
  id: z.string(),
  level: Level,
  topic: TopicId,
  module_id: z.string(),
  los_ids: z.array(z.string()).min(1),
  curriculum_year: z.number().int(),
  title_en: z.string().min(1),
  title_tr: z.string().min(1),
  sections: z.array(LessonSection).min(1),
  summary_en: z.string().min(1),
  summary_tr: z.string().min(1),
  common_traps_tr: z.array(z.string()).default([]),
  vocab_ids: z.array(z.string()).default([]),
  spk_link: SpkLink.optional(),
  source_basis: z.literal('original'),
  verified: Verified,
});
export type Lesson = z.infer<typeof Lesson>;

export const VocabTerm = z.object({
  id: z.string().regex(/^[a-z0-9_-]+$/),
  term_en: z.string().min(1),
  /** Eşleşme için çekimli biçimler: yields, yielded ... */
  forms: z.array(z.string()).default([]),
  pronunciation_tr: z.string().min(1),
  ipa: z.string().min(1),
  tr: z.string().min(1),
  definition_en_simple: z.string().min(1),
  definition_tr: z.string().min(1),
  example_en: z.string().min(1),
  example_tr: z.string().min(1),
  cefr_level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  topic: z.union([TopicId, z.literal('GEN')]),
  pos: z.string().optional(),
  everyday_meaning: z.string().optional(),
  source_basis: z.literal('original'),
  verified: Verified,
});
export type VocabTerm = z.infer<typeof VocabTerm>;

export const QuestionPattern = z.object({
  id: z.string(),
  pattern_en: z.string(),
  meaning_tr: z.string(),
  trap_tr: z.string(),
  strategy_tr: z.string(),
  examples: z.array(Bi).min(1),
  /** Kalıbı tanıma alıştırmaları */
  drills: z
    .array(
      z.object({
        stem_en: z.string(),
        stem_tr: z.string(),
        options: z.array(Bi).min(2),
        answer: z.number().int().nonnegative(),
        explanation_tr: z.string(),
      }),
    )
    .default([]),
  verified: Verified,
});
export type QuestionPattern = z.infer<typeof QuestionPattern>;

export const EthicsCase = z.object({
  id: z.string(),
  standard: z.string(), // ör. "I(A)"
  title_en: z.string(),
  title_tr: z.string(),
  scenario_en: z.string(),
  scenario_tr: z.string(),
  question_ids: z.array(z.string()).default([]),
  analysis_en: z.string(),
  analysis_tr: z.string(),
  takeaway_tr: z.string(),
  source_basis: z.literal('original'),
  verified: Verified,
});
export type EthicsCase = z.infer<typeof EthicsCase>;

export const Formula = z.object({
  id: z.string(),
  topic: TopicId,
  module_id: z.string().optional(),
  name_en: z.string(),
  name_tr: z.string(),
  latex: z.string(),
  vars_tr: z.string().optional(),
  note_tr: z.string().optional(),
  verified: Verified,
});
export type Formula = z.infer<typeof Formula>;

export const CalcGuide = z.object({
  id: z.string(),
  device: z.enum(['BA II Plus', 'HP 12C']),
  title_tr: z.string(),
  title_en: z.string(),
  when_tr: z.string(),
  steps: z.array(z.object({ keys: z.string(), display: z.string().optional(), note_tr: z.string() })),
  example_tr: z.string().optional(),
  pitfalls_tr: z.array(z.string()).default([]),
  verified: Verified,
});
export type CalcGuide = z.infer<typeof CalcGuide>;

export const GlossaryEntry = z.object({
  en: z.string(),
  tr: z.array(z.string()).min(1),
  /** true ise İngilizce metinde geçtiğinde Türkçe karşılıkta tr'lerden biri bulunmalı (lint). */
  enforce: z.boolean().default(false),
  note_tr: z.string().optional(),
});
export type GlossaryEntry = z.infer<typeof GlossaryEntry>;

export const Los = z.object({ id: z.string(), en: z.string(), tr: z.string(), calc: z.boolean().default(false) });
export const Module = z.object({ id: z.string(), title_en: z.string(), title_tr: z.string(), los: z.array(Los).default([]) });
export const Topic = z.object({
  /** L1/L2 konuları TopicId; L3 uzmanlık yolları PATH_* olabilir. */
  id: z.string(),
  pathway: z.boolean().optional(),
  name_en: z.string(),
  name_tr: z.string(),
  weight_min: z.number(),
  weight_max: z.number(),
  weight_verified: z.boolean().optional(),
  modules: z.array(Module),
});
export const Syllabus = z.object({
  level: Level,
  curriculum_year: z.number().int(),
  sources: z.array(z.object({ url: z.string(), accessed: z.string() })).default([]),
  notes_tr: z.string().optional(),
  topics: z.array(Topic),
});
export type Syllabus = z.infer<typeof Syllabus>;
export type SyllabusTopic = z.infer<typeof Topic>;
export type SyllabusModule = z.infer<typeof Module>;
