// Skor hesapları: konu doğruluğu, ağırlıklı hazırlık skoru, Türkçe destek seviyesi önerisi.
import type { TopicId } from './schema';

export type Attempt = {
  qid: string;
  topic: TopicId;
  los_id: string;
  correct: boolean;
  seconds: number;
  at: string; // ISO
  trLevel: TrLevel;
  mode?: string;
  /** Yanlışın nedeni (kullanıcı etiketi): bilmiyordum / acele / okuma / hesap */
  reason?: 'know' | 'rush' | 'read' | 'calc';
};

export type TrLevel = 0 | 1 | 2 | 3;

export type TopicWeight = { id: TopicId; weight_min: number; weight_max: number };

export type TopicStat = { topic: TopicId; attempts: number; correct: number; accuracy: number; avgSeconds: number };

export function topicStats(attempts: Attempt[]): Record<string, TopicStat> {
  const out: Record<string, TopicStat> = {};
  for (const a of attempts) {
    const s = (out[a.topic] ??= { topic: a.topic, attempts: 0, correct: 0, accuracy: 0, avgSeconds: 0 });
    s.attempts += 1;
    s.correct += a.correct ? 1 : 0;
    s.avgSeconds += a.seconds;
  }
  for (const s of Object.values(out)) {
    s.accuracy = s.attempts ? s.correct / s.attempts : 0;
    s.avgSeconds = s.attempts ? s.avgSeconds / s.attempts : 0;
  }
  return out;
}

/**
 * Konu doğruluğunu az veride şansa (1/3) doğru büzer: (doğru + k·p0) / (deneme + k).
 * Böylece 2 soruda 2 doğru %100 hazırlık sayılmaz.
 */
export function smoothedAccuracy(correct: number, attempts: number, prior = 1 / 3, k = 10) {
  return (correct + k * prior) / (attempts + k);
}

/**
 * Tahmini hazırlık skoru (0-100): konu ağırlık orta noktalarıyla ağırlıklı, büzülmüş doğruluk.
 * Son `recent` deneme kullanılır (eski performans unutulur).
 */
export function readinessScore(attempts: Attempt[], weights: TopicWeight[], recent = 400) {
  const last = attempts.slice(-recent);
  const stats = topicStats(last);
  let wSum = 0;
  let acc = 0;
  for (const w of weights) {
    const mid = (w.weight_min + w.weight_max) / 2;
    const s = stats[w.id];
    acc += mid * smoothedAccuracy(s?.correct ?? 0, s?.attempts ?? 0);
    wSum += mid;
  }
  return wSum ? Math.round((acc / wSum) * 1000) / 10 : 0;
}

/** Ağırlıklı doğruluk ve çalışma eksiği birleşimi: en çok puan getirecek zayıf konular önce. */
export function weakTopics(attempts: Attempt[], weights: TopicWeight[], n = 3) {
  const stats = topicStats(attempts.slice(-400));
  return weights
    .map((w) => {
      const s = stats[w.id];
      const acc = smoothedAccuracy(s?.correct ?? 0, s?.attempts ?? 0);
      const mid = (w.weight_min + w.weight_max) / 2;
      return { id: w.id, gain: mid * (1 - acc), acc };
    })
    .sort((a, b) => b.gain - a.gain)
    .slice(0, n);
}

/**
 * Türkçe destek seviyesi önerisi. Hedef: sınava kadar 0'a inmek.
 * Mevcut seviyedeki son `window` cevapta doğruluk ≥ %75 ve ortalama süre ≤ 90 sn ise bir seviye düşürmeyi önerir.
 * Doğruluk < %45 ise bir seviye yükseltmeyi önerir.
 */
export function recommendTrLevel(
  attempts: Attempt[],
  current: TrLevel,
  window = 40,
): { suggest: TrLevel | null; reason: string } {
  const atLevel = attempts.filter((a) => a.trLevel === current).slice(-window);
  if (atLevel.length < window) {
    return { suggest: null, reason: `Bu seviyede ${window - atLevel.length} soru daha çözünce öneri yapılacak.` };
  }
  const acc = atLevel.filter((a) => a.correct).length / atLevel.length;
  const avg = atLevel.reduce((s, a) => s + a.seconds, 0) / atLevel.length;
  const pct = Math.round(acc * 100);
  if (current > 0 && acc >= 0.75 && avg <= 90) {
    return {
      suggest: (current - 1) as TrLevel,
      reason: `Son ${window} soruda %${pct} doğru, ortalama ${Math.round(avg)} sn. Türkçe desteği bir kademe azaltmaya hazırsın.`,
    };
  }
  if (current < 3 && acc < 0.45) {
    return {
      suggest: (current + 1) as TrLevel,
      reason: `Son ${window} soruda %${pct} doğru. Bir süre daha fazla Türkçe destekle çalışmak faydalı olabilir.`,
    };
  }
  return { suggest: null, reason: `Son ${window} soruda %${pct} doğru, ortalama ${Math.round(avg)} sn. Bu seviyede devam.` };
}

/** Yerel takvim günü (YYYY-MM-DD); toISOString UTC verdiği için gece yarısı kaymasın. */
export function localDay(d: Date = new Date()) {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Tahmini okuma süresi (dk): A2-B1 okuyucu için ~110 kelime/dk; en az 1. */
export function readMinutes(words: number) {
  return Math.max(1, Math.round(words / 110));
}

export function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function daysUntil(dateIso: string, now: Date = new Date()) {
  const d = new Date(dateIso + (dateIso.length === 10 ? 'T00:00:00' : ''));
  const a = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const b = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((b - a) / 86400000);
}

/** Basit günlük plan: kalan güne ve kalan soru sayısına göre günlük soru + tekrar hedefi. */
export function dailyPlan(daysLeft: number, unansweredQuestions: number, dueReviews: number) {
  const days = Math.max(daysLeft - 14, 1); // son 2 hafta mock + tekrar için ayrılır
  const newPerDay = Math.min(Math.max(Math.ceil(unansweredQuestions / days), 10), 60);
  return { newQuestions: newPerDay, reviews: dueReviews, minutes: Math.round(newPerDay * 1.5 + dueReviews * 0.5) };
}

/** Ardışık çalışma günü (streak). days: 'YYYY-MM-DD' listesi. */
export function streak(days: string[], today: string) {
  const set = new Set(days);
  let n = 0;
  const d = new Date(today + 'T12:00:00Z');
  if (!set.has(today)) d.setUTCDate(d.getUTCDate() - 1); // bugün henüz çalışmadıysa dünden say
  while (set.has(d.toISOString().slice(0, 10))) {
    n += 1;
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return n;
}

const RANKS = ['Stajyer', 'Yardımcı Analist', 'Analist', 'Kıdemli Analist', 'Portföy Yöneticisi', 'Baş Analist', 'CFA Adayı Usta'];

/** Basit ilerleme puanı: doğru 10, yanlış 3 (denemek de sayılır), çalışılan gün 20, mock 100. */
export function xpInfo(attempts: { correct: boolean }[], studyDays: number, mocks: number) {
  const right = attempts.filter((a) => a.correct).length;
  const xp = right * 10 + (attempts.length - right) * 3 + studyDays * 20 + mocks * 100;
  const need = (lvl: number) => Math.round(120 * Math.pow(lvl, 1.6)); // lvl'e ulaşmak için toplam xp
  let level = 1;
  while (xp >= need(level + 1)) level += 1;
  const from = level === 1 ? 0 : need(level);
  const to = need(level + 1);
  return { xp, level, rank: RANKS[Math.min(Math.floor((level - 1) / 3), RANKS.length - 1)], pct: Math.round(((xp - from) / (to - from)) * 100), toNext: to - xp };
}
