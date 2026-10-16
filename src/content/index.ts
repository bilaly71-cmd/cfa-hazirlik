// Uygulamayla paketlenen (offline) içerik. `npm run build-content` yalnızca doğrulanmış öğeleri bundle/ altına yazar.
import calcJson from './bundle/calc.json';
import ethicsJson from './bundle/ethics.json';
import examInfoJson from './bundle/examinfo.json';
import formulasJson from './bundle/formulas.json';
import lessonsJson from './bundle/lessons.json';
import patternsJson from './bundle/patterns.json';
import questionsJson from './bundle/questions.json';
import spkJson from './bundle/spk.json';
import syllabusJson from './bundle/syllabus.json';
import vignettesJson from './bundle/vignettes.json';
import vocabJson from './bundle/vocab.json';

import type {
  CalcGuide,
  EthicsCase,
  Formula,
  Lesson,
  Question,
  QuestionPattern,
  Syllabus,
  SyllabusModule,
  SyllabusTopic,
  TopicId,
  VocabTerm,
  Vignette,
} from '@/lib/schema';
import { buildVocabIndex } from '@/lib/tokenize';

export const questions = questionsJson as unknown as Question[];
export type VignetteWithQuestions = Vignette & { questions: Question[] };
export const vignettes = vignettesJson as unknown as VignetteWithQuestions[];
export const lessons = lessonsJson as unknown as Lesson[];
export const vocab = vocabJson as unknown as VocabTerm[];
export const patterns = patternsJson as unknown as QuestionPattern[];
export const ethicsCases = ethicsJson as unknown as EthicsCase[];
export const formulas = formulasJson as unknown as Formula[];
export const calcGuides = calcJson as unknown as CalcGuide[];
export const syllabi = syllabusJson as unknown as Syllabus[];

export type SpkTopic = { status: 'known' | 'partial' | 'new'; duzey3_konu?: string; note_tr?: string };
export const spkMap = ((spkJson as { topics?: Record<string, SpkTopic> }).topics ?? {}) as Partial<Record<TopicId, SpkTopic>>;

export type ExamInfo = {
  last_verified: string;
  sections: { title: string; items: { label: string; value: string; source?: string; unverified?: boolean }[] }[];
  links: { title: string; url: string }[];
} | null;
export const examInfo = examInfoJson as unknown as ExamInfo;

export const L1 = syllabi.find((s) => s.level === 'L1');
export const topics = (L1?.topics ?? []) as (SyllabusTopic & { id: TopicId })[];
export const topicById = new Map(topics.map((t) => [t.id, t]));
export const moduleById = new Map<string, SyllabusModule & { topic: TopicId }>();
export const losById = new Map<string, { id: string; en: string; tr: string; calc: boolean; module_id: string; topic: TopicId }>();
for (const t of topics)
  for (const m of t.modules) {
    moduleById.set(m.id, { ...m, topic: t.id });
    for (const l of m.los) losById.set(l.id, { ...l, module_id: m.id, topic: t.id });
  }

export const weights = topics.map((t) => ({ id: t.id, weight_min: t.weight_min, weight_max: t.weight_max }));

export const questionById = new Map(questions.map((q) => [q.id, q]));
export const lessonByModule = new Map(lessons.map((l) => [l.module_id, l]));
export const vocabById = new Map(vocab.map((v) => [v.id, v]));
export const vocabIndex = buildVocabIndex(vocab);

export const questionsByTopic = (t: TopicId) => questions.filter((q) => q.topic === t);
export const questionsByModule = (m: string) => questions.filter((q) => q.module_id === m);
export const questionsByLos = (l: string) => questions.filter((q) => q.los_id === l);

export const topicName = (id: string) => topicById.get(id as TopicId)?.name_tr ?? id;
