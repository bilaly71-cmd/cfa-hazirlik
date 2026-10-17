import { Stack, router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { QuestionCard } from '@/components/question-card';
import { Bar, Button, Card, Chip, H, Row, Screen, T } from '@/components/ui';
import { questionById, questions, topicName, weights } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { allocate, buildMock, mockReport } from '@/lib/mock';
import { actions, getState, useStore, type MockInProgress } from '@/state/store';


export default function Mock() {
  const c = useColors();
  const prog = useStore((s) => s.mockInProgress);
  const mocks = useStore((s) => s.mocks);
  const [report, setReport] = useState<string | null>(null);

  if (report) return <Report id={report} onClose={() => setReport(null)} />;
  if (prog) return <Session prog={prog} onDone={(id) => setReport(id)} />;

  const target = allocate(weights, 180);
  const enough = questions.length >= 180;
  const start = (perSession = 90, sessions = 2) => {
    const seed = Date.now() % 2147483647;
    const m = buildMock(questions, weights, seed, perSession, sessions);
    actions.setMockInProgress({ seed, session: 0, ids: m.sessions.map((s) => s.map((q) => q.id)), answers: {}, startedAt: new Date().toISOString(), flagged: [] });
  };
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Mock sınav' }} />
      <Card>
        <T weight="700">Tam mock: 2 oturum × 90 soru</T>
        <T size={14} sub style={{ marginTop: 4 }}>
          Her oturum 2 sa 15 dk. Oturum içinde sorular arasında gezinebilir ve işaretleyebilirsin; 1. oturumu bitirince geri dönemezsin. Geri bildirim
          yok, Türkçe destek kapalı (sınav modu). Sonunda konu bazlı skor ve zayıf alan raporu.
        </T>
        <Row wrap style={{ marginTop: 8 }}>
          {weights.map((w) => (
            <Chip key={w.id} label={`${w.id} ${target[w.id]}`} />
          ))}
        </Row>
        {!enough ? (
          <T size={13} color={c.warn} style={{ marginTop: 8 }}>
            Havuzda {questions.length} doğrulanmış soru var; 180'den azsa mock kısa olur ve konu dağılımı eksik kalabilir.
          </T>
        ) : null}
        <Button style={{ marginTop: 12 }} title="Mock'u başlat" disabled={!questions.length} onPress={() => start()} />
        <Button style={{ marginTop: 8 }} kind="secondary" title="Mini mock: 30 soru, 45 dk" disabled={questions.length < 30} onPress={() => start(30, 1)} />
        <T size={12} sub style={{ marginTop: 4 }}>
          Mini mock tek oturum: aynı sınav kuralları, daha kısa. Tam mock'tan önce tempo denemek için ideal.
        </T>
      </Card>
      <H>Geçmiş</H>
      {!mocks.length ? <T sub>Henüz mock yok.</T> : null}
      {[...mocks].reverse().map((m) => (
        <Card key={m.id} onPress={() => setReport(m.id)}>
          <Row style={{ justifyContent: 'space-between' }}>
            <T>{m.at.slice(0, 10)}</T>
            <T weight="800" color={m.correct / m.total >= 0.7 ? c.good : c.warn}>
              %{Math.round((m.correct / m.total) * 100)} ({m.correct}/{m.total})
            </T>
          </Row>
        </Card>
      ))}
    </Screen>
  );
}

function Session({ prog, onDone }: { prog: MockInProgress; onDone: (id: string) => void }) {
  const c = useColors();
  const ids = prog.ids[prog.session] ?? [];
  const [i, setI] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [grid, setGrid] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const sessionMin = Math.round(ids.length * 1.5);
  const leftSec = Math.max(0, sessionMin * 60 - Math.floor((now - new Date(prog.startedAt).getTime()) / 1000));
  const finishSession = () => {
    const p = getState().mockInProgress!;
    if (p.session + 1 < p.ids.length) {
      actions.setMockInProgress({ ...p, session: p.session + 1, startedAt: new Date().toISOString(), flagged: [] });
      setI(0);
      return;
    }
    const all = p.ids.flat();
    const items = all.map((id) => {
      const q = questionById.get(id)!;
      return { topic: q.topic, correct: p.answers[id] === q.answer };
    });
    const id = `mock-${Date.now()}`;
    const minutes = p.ids.reduce((a, l) => a + Math.round(l.length * 1.5), 0);
    actions.saveMock({
      id,
      at: new Date().toISOString(),
      seed: p.seed,
      total: items.length,
      correct: items.filter((x) => x.correct).length,
      byTopic: mockReport(items),
      minutes,
    });
    // istatistiklere de işle (SRS'e yanlışlar girer)
    for (const qid of all) {
      const q = questionById.get(qid)!;
      const ok = p.answers[qid] === q.answer;
      actions.recordAttempt(
        { qid, topic: q.topic, los_id: q.los_id, correct: ok, seconds: 90, at: new Date().toISOString(), trLevel: 0, mode: 'mock' },
        ok ? 'good' : 'again',
        !ok,
      );
    }
    onDone(id);
  };
  useEffect(() => {
    if (leftSec === 0) finishSession();
  }, [leftSec === 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const q = questionById.get(ids[i]);
  const answered = ids.filter((id) => prog.answers[id]).length;
  const warn = leftSec <= 300 ? c.bad : leftSec <= 900 ? c.warn : leftSec <= 1800 ? c.warn : undefined;
  const flagged = prog.flagged.includes(ids[i]);
  const hh = Math.floor(leftSec / 3600);
  const mm = Math.floor((leftSec % 3600) / 60);
  const ss = leftSec % 60;
  return (
    <Screen
      footer={
        <Row>
          <Button small kind="secondary" title="←" disabled={i === 0} onPress={() => setI(i - 1)} />
          <Button
            small
            kind={flagged ? 'bad' : 'secondary'}
            title={flagged ? '⚑ İşaretli' : '⚐ İşaretle'}
            onPress={() =>
              actions.setMockInProgress({ ...prog, flagged: flagged ? prog.flagged.filter((x) => x !== ids[i]) : [...prog.flagged, ids[i]] })
            }
          />
          <Button small kind="secondary" title="▦" onPress={() => setGrid(!grid)} />
          <Button small style={{ flex: 1 }} title={i + 1 < ids.length ? 'Sonraki →' : 'Oturumu bitir'} onPress={() => (i + 1 < ids.length ? setI(i + 1) : finishSession())} />
        </Row>
      }>
      <Stack.Screen options={{ title: `Mock · Oturum ${prog.session + 1}/${prog.ids.length}`, headerBackVisible: false }} />
      <Row style={{ justifyContent: 'space-between', marginBottom: 6 }}>
        <T weight="700">
          Soru {i + 1}/{ids.length}
        </T>
        <T weight="800" color={warn}>
          ⏱ {hh}:{String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}
        </T>
      </Row>
      {leftSec <= 1800 && leftSec > 0 ? (
        <T size={12} color={warn}>
          {leftSec <= 300 ? 'Son 5 dakika!' : leftSec <= 900 ? 'Son 15 dakika.' : 'Son 30 dakika.'} Boş soru bırakma — yanlış cevaba ceza yok.
        </T>
      ) : null}
      <Bar value={(answered / ids.length) * 100} height={5} />
      {grid ? (
        <Card style={{ marginTop: 8 }}>
          <Row wrap gap={6}>
            {ids.map((id, k) => (
              <Pressable
                key={id}
                onPress={() => {
                  setI(k);
                  setGrid(false);
                }}
                style={{
                  width: 34,
                  height: 30,
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: k === i ? 2 : 1,
                  borderColor: prog.flagged.includes(id) ? c.bad : k === i ? c.primary : c.border,
                  backgroundColor: prog.answers[id] ? c.cardAlt : 'transparent',
                }}>
                <T size={12}>{k + 1}</T>
              </Pressable>
            ))}
          </Row>
          <Button small style={{ marginTop: 8 }} kind="bad" title="Oturumu şimdi bitir" onPress={finishSession} />
        </Card>
      ) : null}
      <View style={{ marginTop: 10 }}>
        {q ? (
          <QuestionCard
            key={q.id}
            q={q}
            examMode
            selected={prog.answers[q.id] ?? null}
            onSelect={(k) => {
              const p = getState().mockInProgress!;
              actions.setMockInProgress({ ...p, answers: { ...p.answers, [q.id]: k } });
            }}
          />
        ) : null}
      </View>
      <Button kind="ghost" small style={{ marginTop: 20 }} title="Mock'u iptal et" onPress={() => actions.setMockInProgress(undefined)} />
    </Screen>
  );
}

function Report({ id, onClose }: { id: string; onClose: () => void }) {
  const c = useColors();
  const m = useStore((s) => s.mocks.find((x) => x.id === id));
  const rows = useMemo(() => [...(m?.byTopic ?? [])].sort((a, b) => a.pct - b.pct), [m]);
  if (!m) return null;
  const pct = Math.round((m.correct / m.total) * 100);
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Mock raporu' }} />
      <Card>
        <T size={32} weight="800" center color={pct >= 70 ? c.good : pct >= 60 ? c.warn : c.bad}>
          %{pct}
        </T>
        <T center sub>
          {m.correct}/{m.total} doğru · {m.at.slice(0, 10)}
        </T>
        <T size={12} sub center style={{ marginTop: 4 }}>
          Topluluk deneyimine göre mock'larda istikrarlı %70+ “yolunda” sayılır (resmi eşik değil; CFA geçme notunu yayımlamaz).
        </T>
      </Card>
      <H>Konu bazlı (zayıftan güçlüye)</H>
      {rows.map((r) => (
        <Card key={r.topic} style={{ paddingVertical: 10 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <T>{topicName(r.topic)}</T>
            <T weight="700" color={r.pct >= 70 ? c.good : r.pct >= 50 ? c.warn : c.bad}>
              %{r.pct} ({r.correct}/{r.total})
            </T>
          </Row>
          <Bar value={r.pct} color={r.pct >= 70 ? c.good : r.pct >= 50 ? c.warn : c.bad} height={5} />
        </Card>
      ))}
      <H>Şimdi ne çalışmalı?</H>
      {rows.filter((r) => r.pct < 70).length ? (
        rows
          .filter((r) => r.pct < 70)
          .slice(0, 3)
          .map((r) => (
            <Button
              key={r.topic}
              kind="secondary"
              style={{ marginBottom: 8 }}
              title={`${topicName(r.topic)} (%${r.pct}): 10 soru`}
              onPress={() => router.push({ pathname: '/quiz', params: { mode: 'topic', topic: r.topic, n: '10' } })}
            />
          ))
      ) : (
        <T>Belirgin zayıf alan yok. Yanlışlarını çözüp bir mock daha dene.</T>
      )}
      <Row style={{ marginTop: 12 }}>
        <Button style={{ flex: 1 }} kind="secondary" title="Yanlışları çöz" onPress={() => router.push({ pathname: '/quiz', params: { mode: 'wrong', n: '30' } })} />
        <Button style={{ flex: 1 }} title="Kapat" onPress={onClose} />
      </Row>
    </Screen>
  );
}
