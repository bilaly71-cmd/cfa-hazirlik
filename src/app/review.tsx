import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { FlipCard } from '@/components/bitext';
import { QuestionCard, type AnswerResult } from '@/components/question-card';
import { Button, Card, Empty, Row, Screen, T } from '@/components/ui';
import { questionById, vocabById } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { speakEn } from '@/lib/speech';
import { dueCards, gradeFromAnswer, type GradeName } from '@/lib/srs';
import { actions, getState } from '@/state/store';

/** Bugün tekrar edilecekler: FSRS'e göre vadesi gelen sorular ve kelimeler. */
export default function Review() {
  const c = useColors();
  const { only } = useLocalSearchParams<{ only?: 'q' | 'v' }>();
  const queue = useMemo(
    () =>
      dueCards(getState().srs, new Date(), only)
        .filter((k) => (k.key.startsWith('q:') ? questionById.has(k.key.slice(2)) : true))
        .slice(0, 50),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState(false);

  if (!queue.length || i >= queue.length) {
    return (
      <Screen>
        <Stack.Screen options={{ title: 'Tekrar' }} />
        <Empty text={queue.length ? `Bitti! ${queue.length} kart tekrar edildi. ✓` : 'Bugün tekrar edilecek kart yok. ✓'} />
        {queue.length ? (
          <T center sub style={{ marginBottom: 10 }}>
            Aralıklı tekrar böyle çalışır: bugün unutmaya yaklaşan kartları tazeledin. Şimdi 5 yeni soruyla devam edebilirsin.
          </T>
        ) : null}
        <Button kind="secondary" style={{ marginBottom: 8 }} title="5 yeni soru çöz" onPress={() => router.replace({ pathname: '/quiz', params: { mode: 'new', n: '5' } })} />
        <Button title="Kapat" onPress={() => router.back()} />
      </Screen>
    );
  }
  const card = queue[i];
  const next = () => {
    setAnswered(false);
    setI(i + 1);
  };
  const header = <Stack.Screen options={{ title: `Tekrar ${i + 1}/${queue.length}` }} />;

  if (card.key.startsWith('q:')) {
    const q = questionById.get(card.key.slice(2))!;
    const onAnswered = (r: AnswerResult) => {
      setAnswered(true);
      const s = getState();
      actions.recordAttempt(
        { qid: q.id, topic: q.topic, los_id: q.los_id, correct: r.correct, seconds: r.seconds, at: new Date().toISOString(), trLevel: s.settings.trLevel, mode: 'review' },
        gradeFromAnswer(r.correct, r.seconds),
        true,
      );
    };
    return (
      <Screen footer={answered ? <Button title="Sonraki →" onPress={next} /> : undefined}>
        {header}
        <QuestionCard key={q.id} q={q} onAnswered={onAnswered} />
      </Screen>
    );
  }

  const id = card.key.slice(2);
  const v = vocabById.get(id);
  const custom = getState().notebook[id]?.custom;
  const grade = (g: GradeName) => {
    actions.reviewCard(card.key, g);
    next();
  };
  return (
    <Screen
      footer={
        <Row>
          {(
            [
              ['again', 'Bilemedim', 'bad'],
              ['hard', 'Zor', 'secondary'],
              ['good', 'Bildim', 'primary'],
              ['easy', 'Kolay', 'good'],
            ] as const
          ).map(([g, label, kind]) => (
            <Button key={g} small style={{ flex: 1 }} kind={kind} title={label} onPress={() => grade(g)} />
          ))}
        </Row>
      }>
      {header}
      <T sub size={13} center style={{ marginBottom: 8 }}>
        Karta dokun → Türkçe tarafı. Sonra kendini puanla.
      </T>
      <FlipCard
        key={id}
        front={
          <View style={{ minHeight: 160, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <T size={28} weight="800" center>
              {v?.term_en ?? custom?.term_en ?? id}
            </T>
            {v ? (
              <T sub center>
                {v.pronunciation_tr} · /{v.ipa.replace(/^\/|\/$/g, '')}/
              </T>
            ) : null}
            {v ? (
              <T size={15} center>
                “{v.example_en}”
              </T>
            ) : null}
          </View>
        }
        back={
          <View style={{ minHeight: 160, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <T size={24} weight="700" color={c.tr} center>
              {v?.tr ?? custom?.tr ?? '—'}
            </T>
            {v ? (
              <T size={14} center>
                {v.definition_tr}
              </T>
            ) : null}
            {v ? (
              <T size={14} sub center>
                {v.example_tr}
              </T>
            ) : null}
          </View>
        }
      />
      <Card style={{ marginTop: 12 }} onPress={() => speakEn(v?.term_en ?? custom?.term_en ?? id)}>
        <T center>🔊 Dinle</T>
      </Card>
    </Screen>
  );
}
