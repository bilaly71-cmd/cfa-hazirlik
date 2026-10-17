import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BiText, FlipCard, TappableText } from './bitext';
import { MathView } from './math';
import { Button, Card, Chip, Row, T, spkChip } from './ui';
import { useWordPopup } from './word-popup';
import { patterns, topicName, vocabById } from '@/content';
import { Fonts } from '@/constants/theme';
import { useColors } from '@/hooks/use-theme';
import type { Question } from '@/lib/schema';
import { actions, useSettings } from '@/state/store';

export type AnswerResult = { choice: string | null; correct: boolean; seconds: number };

const DIFF = ['', 'Kolay', 'Orta', 'Zor'];

/** Tek soru: şık seçimi, kontrol, açıklama, çözüm adımları, hesap makinesi tuşları. */
export function QuestionCard({
  q,
  onAnswered,
  timeLimit,
  examMode,
  selected,
  onSelect,
}: {
  q: Question;
  onAnswered?: (r: AnswerResult) => void;
  timeLimit?: number; // saniye
  examMode?: boolean; // mock: geri bildirim yok
  selected?: string | null;
  onSelect?: (k: string) => void;
}) {
  const c = useColors();
  const { trLevel, quickAnswer } = useSettings();
  const [choice, setChoice] = useState<string | null>(selected ?? null);
  const [done, setDone] = useState(false);
  const [left, setLeft] = useState(timeLimit ?? 0);
  const start = useRef(Date.now());
  const level = examMode ? 0 : trLevel;

  useEffect(() => {
    setChoice(selected ?? null);
    setDone(false);
    start.current = Date.now();
    setLeft(timeLimit ?? 0);
  }, [q.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!timeLimit || done || examMode) return;
    const t = setInterval(() => {
      const l = timeLimit - Math.floor((Date.now() - start.current) / 1000);
      setLeft(l);
      if (l <= 0) submit(null);
    }, 500);
    return () => clearInterval(t);
  }); // her render'da yeniden kurulur; basit ve doğru

  function submit(k: string | null) {
    if (done) return;
    setDone(true);
    const seconds = Math.round((Date.now() - start.current) / 1000);
    if (!examMode) {
      try {
        // kısa dokunsal geri bildirim (Android web); desteklemeyen cihazlarda sessizce geçer
        (globalThis as { navigator?: { vibrate?: (p: number | number[]) => boolean } }).navigator?.vibrate?.(k === q.answer ? 15 : [40, 50, 40]);
      } catch {}
    }
    onAnswered?.({ choice: k, correct: k === q.answer, seconds });
  }

  const pick = (k: string) => {
    if (done) return;
    setChoice(k);
    onSelect?.(k);
    if (quickAnswer && !examMode) submit(k); // hızlı cevap: dokununca hemen kontrol
  };

  const spk = spkChip(q.spk_link?.status);
  return (
    <View>
      <Row wrap style={{ marginBottom: 8 }}>
        <Chip label={`${q.topic} · ${q.los_id}`} />
        <Chip label={DIFF[q.difficulty]} />
        {spk && !examMode ? <Chip label={spk.label} color={(c as Record<string, string>)[spk.key]} /> : null}
        {timeLimit && !examMode && !done ? <Chip label={`⏱ ${Math.max(0, left)} sn`} color={left <= 15 ? c.bad : undefined} /> : null}
      </Row>

      <BiText en={q.stem_en} tr={q.stem_tr} size={17} weight="600" marked={q.vocab_ids} levelOverride={level as 0 | 1 | 2 | 3} />

      <View style={{ marginTop: 12, gap: 8 }}>
        {q.options.map((o) => {
          const isChoice = choice === o.key;
          const isAns = o.key === q.answer;
          let border = isChoice ? c.primary : c.border;
          let bg = c.card;
          if (done && !examMode) {
            if (isAns) {
              border = c.good;
              bg = c.goodBg;
            } else if (isChoice) {
              border = c.bad;
              bg = c.badBg;
            }
          }
          return (
            <Pressable
              key={o.key}
              onPress={() => pick(o.key)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isChoice }}
              style={[styles.opt, { borderColor: border, backgroundColor: bg, borderWidth: isChoice || (done && isAns) ? 2 : 1 }]}>
              <View style={[styles.key, { borderColor: border, backgroundColor: isChoice ? c.primary : 'transparent' }]}>
                <T weight="700" color={isChoice ? c.primaryText : c.text}>
                  {o.key}
                </T>
              </View>
              <View style={{ flex: 1 }}>
                {level === 2 ? (
                  <FlipCard front={<TappableText text={o.en} marked={q.vocab_ids} />} back={<T color={c.tr}>{o.tr}</T>} />
                ) : (
                  <>
                    <TappableText text={o.en} marked={level >= 1 ? q.vocab_ids : undefined} tappable={level >= 1} />
                    {level === 3 ? (
                      <T size={14} color={c.tr}>
                        {o.tr}
                      </T>
                    ) : null}
                  </>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      {!examMode && !done ? (
        <Button title="Kontrol et" style={{ marginTop: 14 }} disabled={!choice} onPress={() => submit(choice)} />
      ) : null}

      {done && !examMode ? <Feedback q={q} choice={choice} /> : null}
    </View>
  );
}

function Feedback({ q, choice }: { q: Question; choice: string | null }) {
  const c = useColors();
  const open = useWordPopup();
  const correct = choice === q.answer;
  const [more, setMore] = useState(!correct); // doğruysa kısa özet, yanlışta tam çözüm açık
  const pats = (q.pattern_ids ?? []).map((id) => patterns.find((p) => p.id === id)).filter(Boolean);
  return (
    <View style={{ marginTop: 14 }}>
      <Card style={{ backgroundColor: correct ? c.goodBg : c.badBg, borderColor: correct ? c.good : c.bad }}>
        <T weight="700" color={correct ? c.good : c.bad}>
          {correct ? '✓ Doğru' : choice ? `✗ Yanlış — doğru cevap ${q.answer}` : `⏱ Süre doldu — doğru cevap ${q.answer}`}
        </T>
      </Card>

      {!correct ? <ReasonTag qid={q.id} /> : null}

      <T weight="700" style={{ marginTop: 6 }}>
        Açıklama
      </T>
      <BiText en={q.explanation_en} tr={q.explanation_tr} levelOverride={3} />

      {more ? (
        <>
      {q.solution_steps.length ? (
        <>
          <T weight="700" style={{ marginTop: 12 }}>
            Adım adım çözüm
          </T>
          {q.solution_steps.map((s, i) => (
            <Card key={i} style={{ marginTop: 6 }}>
              <T size={13} sub weight="700">
                Adım {i + 1}
              </T>
              <T>{s.en}</T>
              <T size={14} color={c.tr}>
                {s.tr}
              </T>
              {s.formula_latex ? <MathView latex={s.formula_latex} /> : null}
              {s.values ? (
                <Row wrap style={{ marginTop: 4 }}>
                  {Object.entries(s.values).map(([k, v]) => (
                    <Chip key={k} label={`${k} = ${v}`} />
                  ))}
                </Row>
              ) : null}
            </Card>
          ))}
        </>
      ) : null}

      {q.calculator ? (
        <Card style={{ marginTop: 8 }}>
          <T weight="700">🧮 {q.calculator.device}</T>
          <Row wrap style={{ marginTop: 6 }}>
            {q.calculator.keystrokes.map((k, i) => (
              <View key={i} style={[styles.kbd, { borderColor: c.border, backgroundColor: c.cardAlt }]}>
                <T size={13} style={{ fontFamily: Fonts.mono }}>
                  {k}
                </T>
              </View>
            ))}
          </Row>
          {q.calculator.note_tr ? (
            <T size={13} sub style={{ marginTop: 6 }}>
              {q.calculator.note_tr}
            </T>
          ) : null}
        </Card>
      ) : null}

      <T weight="700" style={{ marginTop: 12 }}>
        Çeldiriciler
      </T>
      {Object.entries(q.wrong_option_reasons).map(([k, r]) => (
        <Card key={k} style={{ marginTop: 6, borderColor: k === choice ? c.bad : c.border }}>
          <T weight="700">{k}</T>
          <T>{r.en}</T>
          <T size={14} color={c.tr}>
            {r.tr}
          </T>
        </Card>
      ))}

        </>
      ) : (
        <Button small kind="secondary" style={{ marginTop: 10 }} title="Adım adım çözümü ve çeldiricileri göster" onPress={() => setMore(true)} />
      )}

      {pats.length ? (
        <Card style={{ marginTop: 8, backgroundColor: c.warnBg }}>
          <T weight="700" color={c.warn}>
            Soru kalıbı
          </T>
          {pats.map((p) => (
            <T key={p!.id} size={14}>
              “{p!.pattern_en}” — {p!.meaning_tr}
            </T>
          ))}
        </Card>
      ) : null}

      {q.vocab_ids.length ? (
        <>
          <T weight="700" style={{ marginTop: 12 }}>
            Bu sorudaki kelimeler
          </T>
          <Row wrap style={{ marginTop: 6 }}>
            {q.vocab_ids.map((id) => {
              const v = vocabById.get(id);
              return <Chip key={id} label={v ? `${v.term_en} · ${v.tr}` : id} onPress={() => open(v?.term_en ?? id, v?.id)} />;
            })}
          </Row>
        </>
      ) : null}
      <T size={12} sub style={{ marginTop: 10 }}>
        {topicName(q.topic)} · {q.module_id}
      </T>
    </View>
  );
}

const REASONS = [
  ['know', 'Bilmiyordum'],
  ['rush', 'Acele ettim'],
  ['read', 'Yanlış okudum'],
  ['calc', 'Hesap hatası'],
] as const;

/** Yanlışın nedeni: tek dokunuşla etiketle; istatistikte dağılımı görünür. */
function ReasonTag({ qid }: { qid: string }) {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <View style={{ marginTop: 6 }}>
      <T size={13} sub>
        Neden yanlış yaptın?
      </T>
      <Row wrap style={{ marginTop: 4 }}>
        {REASONS.map(([k, label]) => (
          <Chip
            key={k}
            label={label}
            active={sel === k}
            onPress={() => {
              setSel(k);
              actions.tagAttempt(qid, k);
            }}
          />
        ))}
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  opt: { flexDirection: 'row', gap: 10, borderRadius: 12, padding: 12, alignItems: 'flex-start' },
  key: { width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  kbd: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
});
