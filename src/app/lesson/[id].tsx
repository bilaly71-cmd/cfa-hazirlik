import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { BiText } from '@/components/bitext';
import { MathView } from '@/components/math';
import { Button, Card, Chip, H, Row, Screen, T, spkChip } from '@/components/ui';
import { lessonByModule, moduleById, questionsByLos, questionsByModule } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { speakEn, stopSpeech } from '@/lib/speech';
import { actions, useStore } from '@/state/store';

const KIND_TR: Record<string, string> = {
  intuition: 'Sezgi',
  definition: 'Tanım',
  formula: 'Formül',
  example: 'Örnek',
  traps: 'Tuzaklar',
  turkey: 'Türkiye',
  text: '',
};

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = useColors();
  const m = moduleById.get(id);
  const lesson = lessonByModule.get(id);
  const losRead = useStore((s) => s.losRead);
  const [playing, setPlaying] = useState<number | null>(null);
  const seq = useRef(false);
  useEffect(() => () => {
    seq.current = false;
    stopSpeech();
  }, []);
  if (!m) return null;

  const playFrom = (i: number) => {
    if (!lesson || !seq.current || i >= lesson.sections.length) {
      seq.current = false;
      return setPlaying(null);
    }
    setPlaying(i);
    speakEn(lesson.sections[i].en, () => seq.current && playFrom(i + 1));
  };
  const stopAll = () => {
    seq.current = false;
    stopSpeech();
    setPlaying(null);
  };
  const spk = spkChip(lesson?.spk_link?.status);

  return (
    <Screen>
      <Stack.Screen options={{ title: m.id }} />
      <T size={20} weight="800">
        {lesson?.title_en ?? m.title_en}
      </T>
      <T color={c.tr}>{lesson?.title_tr ?? m.title_tr}</T>
      {spk ? (
        <Row style={{ marginTop: 6 }}>
          <Chip label={spk.label} color={(c as Record<string, string>)[spk.key]} />
          {lesson?.spk_link?.note_tr ? (
            <T size={12} sub style={{ flex: 1 }}>
              {lesson.spk_link.note_tr}
            </T>
          ) : null}
        </Row>
      ) : null}

      <H>Öğrenme hedefleri (LOS)</H>
      {m.los.map((l) => {
        const read = !!losRead[l.id];
        const qn = questionsByLos(l.id).length;
        return (
          <Card key={l.id} style={{ paddingVertical: 10 }}>
            <Row style={{ alignItems: 'flex-start' }}>
              <Pressable onPress={() => actions.markLos(l.id, !read)} hitSlop={8} accessibilityRole="checkbox" accessibilityState={{ checked: read }}>
                <T size={20}>{read ? '✅' : '⬜'}</T>
              </Pressable>
              <View style={{ flex: 1 }}>
                <T size={14}>{l.en}</T>
                <T size={13} color={c.tr}>
                  {l.tr}
                </T>
              </View>
              {qn ? <Button small kind="secondary" title={`${Math.min(qn, 3)} soru`} onPress={() => router.push({ pathname: '/quiz', params: { mode: 'los', los: l.id, n: '3' } })} /> : null}
            </Row>
          </Card>
        );
      })}

      {!lesson ? (
        <Card style={{ backgroundColor: c.warnBg }}>
          <T>Bu modülün anlatımı henüz doğrulanmadı.</T>
        </Card>
      ) : (
        <>
          <Row style={{ marginTop: 14 }}>
            <Button
              small
              kind={playing !== null ? 'bad' : 'secondary'}
              title={playing !== null ? '■ Durdur' : '🔊 Anlatımı dinle (EN)'}
              onPress={() => {
                if (playing !== null) stopAll();
                else {
                  seq.current = true;
                  playFrom(0);
                }
              }}
            />
          </Row>
          {lesson.sections.map((s, i) => (
            <View key={i} style={{ marginTop: 14 }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <T size={13} weight="700" color={c.primary}>
                  {KIND_TR[s.kind] ? `${KIND_TR[s.kind]} · ` : ''}
                  {s.heading_en ?? ''}
                </T>
                <Pressable onPress={() => {
                    if (playing === i) return stopAll();
                    seq.current = false;
                    setPlaying(i);
                    speakEn(s.en, () => setPlaying(null));
                  }} hitSlop={10}>
                  <T>{playing === i ? '■' : '🔊'}</T>
                </Pressable>
              </Row>
              {s.heading_tr ? (
                <T size={12} sub>
                  {s.heading_tr}
                </T>
              ) : null}
              <BiText en={s.en} tr={s.tr} marked={lesson.vocab_ids} />
              {s.formula_latex ? (
                <Card style={{ marginTop: 6 }}>
                  <MathView latex={s.formula_latex} />
                </Card>
              ) : null}
              {s.example ? (
                <Card style={{ marginTop: 6, backgroundColor: c.cardAlt }}>
                  <T size={12} weight="700" sub>
                    ÖRNEK
                  </T>
                  <BiText en={s.example.en} tr={s.example.tr} card={false} />
                  {s.example.formula_latex ? <MathView latex={s.example.formula_latex} /> : null}
                </Card>
              ) : null}
              {s.table ? (
                <ScrollView horizontal style={{ marginTop: 6 }} showsHorizontalScrollIndicator>
                  <View style={{ borderWidth: 1, borderColor: c.border, borderRadius: 8 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: c.cardAlt }}>
                      {s.table.headers.map((h, k) => (
                        <View key={k} style={{ width: 150, padding: 8 }}>
                          <T size={13} weight="700">
                            {h.en}
                          </T>
                          <T size={12} color={c.tr}>
                            {h.tr}
                          </T>
                        </View>
                      ))}
                    </View>
                    {s.table.rows.map((r, ri) => (
                      <View key={ri} style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: c.border }}>
                        {r.map((cell, k) => (
                          <View key={k} style={{ width: 150, padding: 8 }}>
                            <T size={13}>{cell}</T>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </ScrollView>
              ) : null}
            </View>
          ))}

          <H>Özet</H>
          <BiText en={lesson.summary_en} tr={lesson.summary_tr} />
          {lesson.common_traps_tr.length ? (
            <Card style={{ marginTop: 10, backgroundColor: c.warnBg }}>
              <T weight="700" color={c.warn}>
                Sık yapılan hatalar
              </T>
              {lesson.common_traps_tr.map((t, i) => (
                <T key={i} size={14}>
                  • {t}
                </T>
              ))}
            </Card>
          ) : null}
        </>
      )}

      <H>Kontrol</H>
      <Row>
        <Button
          style={{ flex: 1 }}
          title="Mini kontrol (3 soru)"
          disabled={!questionsByModule(m.id).length}
          onPress={() => router.push({ pathname: '/quiz', params: { mode: 'module', module: m.id, n: '3' } })}
        />
        <Button
          style={{ flex: 1 }}
          kind="secondary"
          title="Tüm modül soruları"
          disabled={!questionsByModule(m.id).length}
          onPress={() => router.push({ pathname: '/quiz', params: { mode: 'module', module: m.id, n: '100' } })}
        />
      </Row>
      <Button
        kind="ghost"
        style={{ marginTop: 8 }}
        title="Tüm LOS'ları okundu işaretle"
        onPress={() => m.los.forEach((l) => actions.markLos(l.id, true))}
      />
    </Screen>
  );
}
