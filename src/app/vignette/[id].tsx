import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { BiText } from '@/components/bitext';
import { QuestionCard, type AnswerResult } from '@/components/question-card';
import { Button, Card, H, Screen, T } from '@/components/ui';
import { vignettes } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { gradeFromAnswer } from '@/lib/srs';
import { actions, getState } from '@/state/store';

export default function VignetteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = useColors();
  const v = vignettes.find((x) => x.id === id);
  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState(false);
  if (!v) return null;
  const q = v.questions[i];
  const onAnswered = (r: AnswerResult) => {
    setAnswered(true);
    const s = getState();
    actions.recordAttempt(
      { qid: q.id, topic: q.topic, los_id: q.los_id, correct: r.correct, seconds: r.seconds, at: new Date().toISOString(), trLevel: s.settings.trLevel, mode: 'vignette' },
      gradeFromAnswer(r.correct, r.seconds, 135),
      !r.correct,
    );
  };
  return (
    <Screen
      footer={
        answered && i + 1 < v.questions.length ? (
          <Button
            title="Sonraki soru →"
            onPress={() => {
              setAnswered(false);
              setI(i + 1);
            }}
          />
        ) : undefined
      }>
      <Stack.Screen options={{ title: `${v.module_id} · soru ${i + 1}/${v.questions.length}` }} />
      <T size={18} weight="800">
        {v.title_en}
      </T>
      <T color={c.tr}>{v.title_tr}</T>
      <Card style={{ marginTop: 10 }}>
        <BiText en={v.text_en} tr={v.text_tr} card={false} />
        {v.tables.map((t, k) => (
          <View key={k} style={{ marginTop: 10 }}>
            <T size={13} weight="700">
              {t.title_en} <T size={12} sub>{t.title_tr}</T>
            </T>
            <ScrollView horizontal>
              <View style={{ borderWidth: 1, borderColor: c.border, borderRadius: 8, marginTop: 4 }}>
                <View style={{ flexDirection: 'row', backgroundColor: c.cardAlt }}>
                  {t.headers.map((h, j) => (
                    <View key={j} style={{ width: 110, padding: 6 }}>
                      <T size={12} weight="700">
                        {h}
                      </T>
                    </View>
                  ))}
                </View>
                {t.rows.map((r, ri) => (
                  <View key={ri} style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: c.border }}>
                    {r.map((cell, j) => (
                      <View key={j} style={{ width: 110, padding: 6 }}>
                        <T size={12}>{cell}</T>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ))}
      </Card>
      <H>Soru</H>
      <QuestionCard key={q.id} q={q} onAnswered={onAnswered} timeLimit={undefined} />
    </Screen>
  );
}
