import { router } from 'expo-router';
import { useMemo } from 'react';

import { Bar, Card, Chip, Row, Screen, T, spkChip } from '@/components/ui';
import { questions, spkMap, topics } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { topicStats } from '@/lib/scoring';
import { useStore } from '@/state/store';

export default function Study() {
  const c = useColors();
  const attempts = useStore((s) => s.attempts);
  const losRead = useStore((s) => s.losRead);
  const stats = useMemo(() => topicStats(attempts), [attempts]);
  return (
    <Screen>
      <T sub size={14} style={{ marginBottom: 10 }}>
        CFA Level I · 2027 müfredatı · konu ağırlıkları sınavdaki payı gösterir.
      </T>
      {topics.map((t) => {
        const los = t.modules.flatMap((m) => m.los);
        const read = los.filter((l) => losRead[l.id]).length;
        const qn = questions.filter((q) => q.topic === t.id).length;
        const st = stats[t.id];
        const spk = spkChip(spkMap[t.id]?.status);
        return (
          <Card key={t.id} onPress={() => router.push({ pathname: '/topic/[id]', params: { id: t.id } })}>
            <Row style={{ justifyContent: 'space-between' }}>
              <T weight="700" style={{ flex: 1 }}>
                {t.name_tr}
              </T>
              <Chip label={`%${t.weight_min}–${t.weight_max}`} />
            </Row>
            <T size={13} sub>
              {t.name_en}
            </T>
            <Row wrap style={{ marginTop: 6 }}>
              {spk ? <Chip label={spk.label} color={(c as Record<string, string>)[spk.key]} /> : null}
              <Chip label={`${t.modules.length} modül`} />
              <Chip label={`${qn} soru`} />
              {st ? <Chip label={`%${Math.round(st.accuracy * 100)} doğru`} color={st.accuracy >= 0.7 ? c.good : c.warn} /> : null}
            </Row>
            <T size={12} sub style={{ marginTop: 8 }}>
              Okunan LOS: {read}/{los.length}
            </T>
            <Bar value={los.length ? (read / los.length) * 100 : 0} height={5} />
          </Card>
        );
      })}
    </Screen>
  );
}
