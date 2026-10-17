import { Stack, router, useLocalSearchParams } from 'expo-router';

import { Button, Card, Chip, H, Row, Screen, T, spkChip } from '@/components/ui';
import { lessonByModule, questionsByModule, spkMap, topicById } from '@/content';
import { useColors } from '@/hooks/use-theme';
import type { TopicId } from '@/lib/schema';
import { readMinutes, wordCount } from '@/lib/scoring';
import { useStore } from '@/state/store';

export default function TopicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = useColors();
  const t = topicById.get(id as TopicId);
  const losRead = useStore((s) => s.losRead);
  if (!t) return null;
  const spk = spkMap[t.id];
  const chip = spkChip(spk?.status);
  return (
    <Screen>
      <Stack.Screen options={{ title: t.name_tr }} />
      <T size={13} sub>
        {t.name_en} · sınav ağırlığı %{t.weight_min}–{t.weight_max}
      </T>
      {spk ? (
        <Card style={{ marginTop: 10, backgroundColor: c.cardAlt }}>
          <Row>{chip ? <Chip label={chip.label} color={(c as Record<string, string>)[chip.key]} /> : null}</Row>
          {spk.duzey3_konu ? (
            <T size={13} sub style={{ marginTop: 4 }}>
              Düzey 3 karşılığı: {spk.duzey3_konu}
            </T>
          ) : null}
          {spk.note_tr ? <T size={14}>{spk.note_tr}</T> : null}
        </Card>
      ) : null}
      <Row style={{ marginTop: 10 }}>
        <Button style={{ flex: 1 }} title="Konudan 10 soru" onPress={() => router.push({ pathname: '/quiz', params: { mode: 'topic', topic: t.id } })} />
        <Button style={{ flex: 1 }} kind="secondary" title="Zamanlı" onPress={() => router.push({ pathname: '/quiz', params: { mode: 'timed', topic: t.id } })} />
      </Row>
      <H>Modüller</H>
      {t.modules.map((m) => {
        const lesson = lessonByModule.get(m.id);
        const qn = questionsByModule(m.id).length;
        const read = m.los.filter((l) => losRead[l.id]).length;
        return (
          <Card key={m.id} onPress={lesson || qn ? () => router.push({ pathname: '/lesson/[id]', params: { id: m.id } }) : undefined}>
            <T size={12} sub>
              {m.id}
            </T>
            <T weight="700">{m.title_tr}</T>
            <T size={13} sub>
              {m.title_en}
            </T>
            <Row wrap style={{ marginTop: 6 }}>
              <Chip label={lesson ? `📖 ~${readMinutes(lesson.sections.reduce((a, x) => a + wordCount(x.en), 0))} dk` : 'anlatım hazırlanıyor'} color={lesson ? c.good : undefined} />
              <Chip label={`${qn} soru`} />
              <Chip label={`LOS ${read}/${m.los.length}`} color={read === m.los.length && read ? c.good : undefined} />
            </Row>
          </Card>
        );
      })}
    </Screen>
  );
}
