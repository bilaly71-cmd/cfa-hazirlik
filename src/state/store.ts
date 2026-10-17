// Cihazda kalıcı uygulama durumu (AsyncStorage; web'de localStorage). Backend yok.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState as RNAppState, Platform } from 'react-native';
import { useSyncExternalStore } from 'react';

import { localDay, type Attempt, type TrLevel } from '@/lib/scoring';
import { newCard, review, srsKey, type GradeName, type StoredCard } from '@/lib/srs';
import type { TopicId } from '@/lib/schema';

export type Settings = {
  trLevel: TrLevel;
  fontScale: number; // 1 | 1.15 | 1.3
  theme: 'system' | 'light' | 'dark';
  examDate: string; // YYYY-MM-DD
  dailyGoal: number; // soru/gün
  ttsRate: number; // 0.5 - 1.2
  oneHand: boolean; // butonları alta topla
  installDismissed?: boolean; // 'ana ekrana ekle' ipucunu gizle
  quickAnswer?: boolean; // şıkka dokununca hemen cevapla (Kontrol et adımı yok)
  lastSuggestionDismissed?: string;
};

export type MockRecord = {
  id: string;
  at: string;
  seed: number;
  total: number;
  correct: number;
  byTopic: { topic: TopicId; total: number; correct: number; pct: number }[];
  minutes: number;
};

export type MockInProgress = {
  seed: number;
  session: number; // 0 | 1
  ids: string[][];
  answers: Record<string, string>;
  startedAt: string; // oturum başlangıcı
  flagged: string[];
};

export type AppState = {
  version: 1;
  settings: Settings;
  attempts: Attempt[];
  srs: Record<string, StoredCard>;
  notebook: Record<string, { addedAt: string; custom?: { term_en: string; tr: string; example_en?: string; example_tr?: string; topic?: string } }>;
  losRead: Record<string, string>; // los_id -> tarih
  studyDays: string[]; // YYYY-MM-DD
  mocks: MockRecord[];
  mockInProgress?: MockInProgress;
  patternDrills: Record<string, { correct: number; total: number }>;
};

const KEY = 'cfa-state-v1';

const defaultExamDate = () => {
  // Varsayılan: ~8 ay sonrası; kullanıcı ayarlardan değiştirir.
  const d = new Date();
  d.setMonth(d.getMonth() + 8);
  return d.toISOString().slice(0, 10);
};

export const initialState = (): AppState => ({
  version: 1,
  settings: { trLevel: 3, fontScale: 1, theme: 'system', examDate: defaultExamDate(), dailyGoal: 20, ttsRate: 0.85, oneHand: true },
  attempts: [],
  srs: {},
  notebook: {},
  losRead: {},
  studyDays: [],
  mocks: [],
  patternDrills: {},
});

let state: AppState = initialState();
let hydrated = false;
const listeners = new Set<() => void>();
let saveTimer: ReturnType<typeof setTimeout> | undefined;

function emit() {
  for (const l of listeners) l();
}

let dirty = false;

function flush() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = undefined;
  if (!dirty) return;
  dirty = false;
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    // web'de senkron yaz: sayfa kapanırken/yenilenirken veri kaybolmasın
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return;
    } catch {
      // kota dolarsa AsyncStorage'a düş
    }
  }
  AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
}

function persist() {
  dirty = true;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, 300);
}

if (Platform.OS === 'web' && typeof window !== 'undefined') {
  window.addEventListener('pagehide', flush);
  window.addEventListener('beforeunload', flush);
  document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && flush());
} else {
  RNAppState.addEventListener('change', (st) => st !== 'active' && flush());
}

export async function hydrate() {
  if (hydrated) return;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<AppState>;
      const base = initialState();
      state = { ...base, ...saved, settings: { ...base.settings, ...(saved.settings ?? {}) } };
    }
  } catch {
    // bozuk kayıt: varsayılanla devam
  }
  hydrated = true;
  emit();
}

export function exportJson() {
  return JSON.stringify(state);
}

export function getState() {
  return state;
}

export function setState(fn: (s: AppState) => AppState) {
  state = fn(state);
  emit();
  persist();
}

export function useStore<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => selector(state),
    () => selector(state),
  );
}

export const useSettings = () => useStore((s) => s.settings);
export const isHydrated = () => hydrated;

const today = () => localDay();

// ---- eylemler ----
export const actions = {
  updateSettings(p: Partial<Settings>) {
    setState((s) => ({ ...s, settings: { ...s.settings, ...p } }));
  },
  recordAttempt(a: Attempt, grade: GradeName, addToSrs: boolean) {
    setState((s) => {
      const key = srsKey('q', a.qid);
      const srs = { ...s.srs };
      const existing = srs[key];
      if (existing) srs[key] = review(existing, grade);
      else if (addToSrs) srs[key] = review(newCard(key), grade);
      const d = today();
      return {
        ...s,
        attempts: [...s.attempts, a].slice(-20000),
        srs,
        studyDays: s.studyDays.includes(d) ? s.studyDays : [...s.studyDays, d],
      };
    });
  },
  reviewCard(key: string, grade: GradeName) {
    setState((s) => {
      const card = s.srs[key] ?? newCard(key);
      const d = today();
      return {
        ...s,
        srs: { ...s.srs, [key]: review(card, grade) },
        studyDays: s.studyDays.includes(d) ? s.studyDays : [...s.studyDays, d],
      };
    });
  },
  addWord(id: string, custom?: AppState['notebook'][string]['custom']) {
    setState((s) => {
      if (s.notebook[id]) return s;
      const key = srsKey('v', id);
      return {
        ...s,
        notebook: { ...s.notebook, [id]: { addedAt: new Date().toISOString(), custom } },
        srs: s.srs[key] ? s.srs : { ...s.srs, [key]: newCard(key) },
      };
    });
  },
  removeWord(id: string) {
    setState((s) => {
      const notebook = { ...s.notebook };
      delete notebook[id];
      const srs = { ...s.srs };
      delete srs[srsKey('v', id)];
      return { ...s, notebook, srs };
    });
  },
  markLos(losId: string, read: boolean) {
    setState((s) => {
      const losRead = { ...s.losRead };
      if (read) losRead[losId] = today();
      else delete losRead[losId];
      return { ...s, losRead };
    });
  },
  setMockInProgress(m: MockInProgress | undefined) {
    setState((s) => ({ ...s, mockInProgress: m }));
  },
  saveMock(r: MockRecord) {
    setState((s) => ({ ...s, mocks: [...s.mocks, r], mockInProgress: undefined }));
  },
  recordDrill(patternId: string, correct: boolean) {
    setState((s) => {
      const p = s.patternDrills[patternId] ?? { correct: 0, total: 0 };
      return { ...s, patternDrills: { ...s.patternDrills, [patternId]: { correct: p.correct + (correct ? 1 : 0), total: p.total + 1 } } };
    });
  },
  tagAttempt(qid: string, reason: NonNullable<Attempt['reason']>) {
    setState((s) => {
      const i = [...s.attempts].reverse().findIndex((a) => a.qid === qid);
      if (i < 0) return s;
      const idx = s.attempts.length - 1 - i;
      const attempts = s.attempts.slice();
      attempts[idx] = { ...attempts[idx], reason };
      return { ...s, attempts };
    });
  },
  /** Yedekten yükle: geçerli bir v1 durum JSON'ı bekler; başarılıysa true. */
  importState(json: string) {
    try {
      const d = JSON.parse(json) as Partial<AppState>;
      if (d.version !== 1 || !Array.isArray(d.attempts) || typeof d.srs !== 'object' || typeof d.settings !== 'object') return false;
      setState(() => ({ ...initialState(), ...d, settings: { ...initialState().settings, ...d.settings } }) as AppState);
      flush();
      return true;
    } catch {
      return false;
    }
  },
  resetAll() {
    setState(() => initialState());
  },
};
