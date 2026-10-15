import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { BiText } from '@/components/bitext';
import { Button, Card, Chip, Empty, Row, Screen, T } from '@/components/ui';
import { patterns } from '@/content';
import { useColors } from '@/hooks/use-theme';
import type { QuestionPattern } from '@/lib/schema';
import { speakEn } from '@/lib/speech';
import { actions, useStore } from '@/state/store';

export default function Patterns() {
  const [open, setOpen] = useState<string | null>(null);
  const drills = useStore((s) => s.patternDrills);
  const p = patterns.find((x) => x.id === open);
  if (p) return <PatternDetail p={p} onBack={() => setOpen(null)} />;
  return (
    <Screen>
      <Stack.Screen options={{ title: 'CFA soru kalıpları' }} />
      <T size={14} sub style={{ marginBottom: 10 }}>
        Ana dili İngilizce olmayan adayların en sık hatası soruyu yanlış okumak. Her kalıbın tuzağını öğren, sonra alıştırma yap.
      </T>
      {!patterns.length ? <Empty text="Kalıplar henüz doğrulanmadı." /> : null}
      {patterns.map((x) => {
        const d = drills[x.id];
        return (
          <Card key={x.id} onPress={() => setOpen(x.id)}>
            <Row style={{ justifyContent: 'space-between' }}>
              <T weight="700">“{x.pattern_en}”</T>
              {d ? <Chip label={`${d.correct}/${d.total}`} /> : null}
            </Row>
            <T size={14} sub>
              {x.meaning_tr}
            </T>
          </Card>
        );
      })}
    </Screen>
  );
}

function PatternDetail({ p, onBack }: { p: QuestionPattern; onBack: () => void }) {
  const c = useColors();
  const [k, setK] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const d = p.drills[k];
  return (
    <Screen footer={<Button kind="secondary" title="← Kalıplar" onPress={onBack} />}>
      <Stack.Screen options={{ title: p.pattern_en }} />
      <Row style={{ justifyContent: 'space-between' }}>
        <T size={22} weight="800">
          “{p.pattern_en}”
        </T>
        <Pressable onPress={() => speakEn(p.pattern_en)} hitSlop={10}>
          <T size={20}>🔊</T>
        </Pressable>
      </Row>
      <T style={{ marginTop: 6 }}>{p.meaning_tr}</T>
      <Card style={{ marginTop: 10, backgroundColor: c.badBg }}>
        <T weight="700" color={c.bad}>
          Tuzak
        </T>
        <T size={14}>{p.trap_tr}</T>
      </Card>
      <Card style={{ backgroundColor: c.goodBg }}>
        <T weight="700" color={c.good}>
          Strateji
        </T>
        <T size={14}>{p.strategy_tr}</T>
      </Card>
      <T weight="700" style={{ marginTop: 8 }}>
        Örnekler
      </T>
      {p.examples.map((e, i) => (
        <BiText key={i} en={e.en} tr={e.tr} levelOverride={3} />
      ))}
      {d ? (
        <>
          <T weight="700" style={{ marginTop: 14 }}>
            Alıştırma {k + 1}/{p.drills.length}
          </T>
          <BiText en={d.stem_en} tr={d.stem_tr} />
          <View style={{ gap: 8, marginTop: 8 }}>
            {d.options.map((o, i) => {
              const done = pick !== null;
              const color = done ? (i === d.answer ? c.good : i === pick ? c.bad : c.border) : c.border;
              return (
                <Pressable
                  key={i}
                  disabled={done}
                  onPress={() => {
                    setPick(i);
                    actions.recordDrill(p.id, i === d.answer);
                  }}
                  style={{ borderWidth: 1.5, borderColor: color, borderRadius: 10, padding: 10, backgroundColor: c.card }}>
                  <T>{o.en}</T>
                  {done ? (
                    <T size={13} color={c.tr}>
                      {o.tr}
                    </T>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
          {pick !== null ? (
            <>
              <T size={14} style={{ marginTop: 8 }}>
                {d.explanation_tr}
              </T>
              <Button
                style={{ marginTop: 8 }}
                title={k + 1 < p.drills.length ? 'Sonraki alıştırma' : 'Baştan'}
                onPress={() => {
                  setPick(null);
                  setK((k + 1) % p.drills.length);
                }}
              />
            </>
          ) : null}
        </>
      ) : null}
    </Screen>
  );
}
