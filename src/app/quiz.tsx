import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { QuestionCard, type AnswerResult } from '@/components/question-card';
import { Bar, Button, Card, Empty, Row, Screen, T } from '@/components/ui';
import { questionById, topicName } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { localDay, streak } from '@/lib/scoring';
import { pickQuestions, type QuizMode } from '@/lib/session';
import { gradeFromAnswer } from '@/lib/srs';
import { actions, getState } from '@/state/store';

const TITLES: Record<string, string> = {
  topic: 'Konu çalışması',
  module: 'Modül soruları',
  los: 'LOS soruları',
  mixed: 'Karışık sorular',
  wrong: 'Yanlışlarım',
  timed: 'Zamanlı mod (90 sn)',
  bus: 'Otobüs modu (5 dk)',
  daily: 'Günün soruları',
  new: 'Yeni sorular',
  review: 'Tekrar (soru)',
  ids: 'Sorular',
};

export default function Quiz() {
  const c = useColors();
  const p = useLocalSearchParams<{ mode?: string; topic?: string; module?: string; los?: string; n?: string; ids?: string }>();
  const mode = (p.mode ?? 'mixed') as QuizMode | 'review' | 'ids';
  const list = useMemo(() => {
    if (p.ids) return p.ids.split(',').map((id) => questionById.get(id)!).filter(Boolean);
    return pickQuestions(getState(), mode as QuizMode, { topic: p.topic, module: p.module, los: p.los, n: p.n ? Number(p.n) : mode === 'bus' ? 5 : 10 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [results, setResults] = useState<(AnswerResult & { qid: string })[]>([]);
  const [answered, setAnswered] = useState(false);
  const timed = mode === 'timed' || mode === 'bus';

  if (!list.length) {
    return (
      <Screen>
        <Stack.Screen options={{ title: TITLES[mode] ?? 'Sorular' }} />
        <Empty text={mode === 'wrong' ? 'Yanlış yaptığın soru yok. 👏' : 'Bu seçim için henüz doğrulanmış soru yok.'} />
        <Button title="Geri" kind="secondary" onPress={() => router.back()} />
      </Screen>
    );
  }

  const finished = i >= list.length;
  if (finished) {
    const correct = results.filter((r) => r.correct).length;
    const avg = results.length ? Math.round(results.reduce((s, r) => s + r.seconds, 0) / results.length) : 0;
    const wrong = results.filter((r) => !r.correct).map((r) => r.qid);
    const st = getState();
    const todayDone = st.attempts.filter((a) => a.at.slice(0, 10) === localDay()).length;
    const total = st.attempts.length;
    const milestone = [50, 100, 250, 500, 1000, 1500, 2500].find((m) => total >= m && total - results.length < m);
    const streakNow = Math.max(streak(st.studyDays, localDay()), 1);
    return (
      <Screen>
        <Stack.Screen options={{ title: 'Sonuç' }} />
        <Card>
          <T size={28} weight="800" center>
            {correct} / {results.length}
          </T>
          <T center sub>
            %{results.length ? Math.round((correct / results.length) * 100) : 0} doğru · ortalama {avg} sn/soru
          </T>
          <View style={{ marginTop: 10 }}>
            <Bar value={results.length ? (correct / results.length) * 100 : 0} color={c.good} />
          </View>
        </Card>
        <Card style={{ backgroundColor: c.goodBg }}>
          <T weight="700">
            {correct === results.length && results.length ? 'Tam isabet! 🎯' : correct / Math.max(results.length, 1) >= 0.7 ? 'Güzel iş 👏' : 'Yanlışlar öğrenmenin parçası: onları şimdi gördün, sınavda artık tanıyacaksın. 💪'}
          </T>
          <T size={13} sub style={{ marginTop: 4 }}>
            {milestone ? `🏅 ${milestone} soruya ulaştın! ` : ''}Bugün toplam {todayDone} soru · seri 🔥 {streakNow} gün. Kısa tur da sayılır: bir tur daha 5 soru, 3 dakika.
          </T>
        </Card>
        {wrong.length ? (
          <T sub style={{ marginBottom: 8 }}>
            Yanlış yaptığın {wrong.length} soru aralıklı tekrar listene eklendi.
          </T>
        ) : null}
        <Row>
          {wrong.length ? (
            <Button style={{ flex: 1 }} kind="secondary" title="Yanlışları tekrar çöz" onPress={() => router.replace({ pathname: '/quiz', params: { mode: 'ids', ids: wrong.join(',') } })} />
          ) : null}
          <Button
            style={{ flex: 1 }}
            kind="secondary"
            title="Bir tur daha (5)"
            onPress={() => router.replace({ pathname: '/quiz', params: { mode: 'mixed', n: '5', ...(p.topic ? { topic: p.topic } : {}) } })}
          />
          <Button style={{ flex: 1 }} title="Bitti" onPress={() => router.back()} />
        </Row>
      </Screen>
    );
  }

  const q = list[i];
  let run = 0;
  for (let k = results.length - 1; k >= 0 && results[k].correct; k--) run++;
  const onAnswered = (r: AnswerResult) => {
    setAnswered(true);
    setResults((xs) => [...xs, { ...r, qid: q.id }]);
    const s = getState();
    actions.recordAttempt(
      { qid: q.id, topic: q.topic, los_id: q.los_id, correct: r.correct, seconds: r.seconds, at: new Date().toISOString(), trLevel: s.settings.trLevel, mode },
      gradeFromAnswer(r.correct, r.seconds),
      !r.correct, // yalnızca yanlışlar yeni SRS kartı açar; mevcut kartlar her cevapta güncellenir
    );
  };
  const next = () => {
    setAnswered(false);
    setI(i + 1);
  };

  return (
    <Screen footer={answered ? <Button title={i + 1 < list.length ? 'Sonraki soru →' : 'Sonucu gör'} onPress={next} /> : undefined}>
      <Stack.Screen options={{ title: `${TITLES[mode] ?? 'Sorular'} · ${i + 1}/${list.length}` }} />
      <View style={{ marginBottom: 10 }}>
        <Bar value={(i / list.length) * 100} height={5} />
        <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
          <T size={12} sub>
            {p.topic ? topicName(p.topic) : ' '}
          </T>
          {run >= 2 ? (
            <T size={12} weight="700" color={c.good}>
              🔥 {run} doğru üst üste
            </T>
          ) : null}
        </Row>
      </View>
      <QuestionCard key={q.id} q={q} onAnswered={onAnswered} timeLimit={timed ? 90 : undefined} />
    </Screen>
  );
}
