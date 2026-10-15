import { router } from 'expo-router';
import { useMemo, useState } from 'react';

import { Button, Card, Chip, H, Row, Screen, T } from '@/components/ui';
import { ethicsCases, patterns, questions, topics } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { wrongQuestionIds } from '@/lib/session';
import { useStore } from '@/state/store';

export default function Practice() {
  const c = useColors();
  const s = useStore((x) => x);
  const wrong = useMemo(() => wrongQuestionIds(s).length, [s]);
  const [topic, setTopic] = useState<string | undefined>();
  const [n, setN] = useState(10);
  const go = (mode: string, extra: Record<string, string> = {}) =>
    router.push({ pathname: '/quiz', params: { mode, n: String(n), ...(topic ? { topic } : {}), ...extra } });

  return (
    <Screen>
      <T sub size={14}>
        Havuz: {questions.length} doğrulanmış soru
      </T>
      <H>Konu filtresi</H>
      <Row wrap>
        <Chip label="Tümü" active={!topic} onPress={() => setTopic(undefined)} />
        {topics.map((t) => (
          <Chip key={t.id} label={t.id} active={topic === t.id} onPress={() => setTopic(t.id)} />
        ))}
      </Row>
      <H>Soru sayısı</H>
      <Row>
        {[5, 10, 20, 30].map((k) => (
          <Chip key={k} label={String(k)} active={n === k} onPress={() => setN(k)} />
        ))}
      </Row>

      <H>Modlar</H>
      <Card onPress={() => go('mixed')}>
        <T weight="700">🔀 Karışık sorular</T>
        <T size={13} sub>
          Önce hiç görmediğin, sonra yanlış yaptığın sorular gelir.
        </T>
      </Card>
      <Card onPress={() => go('timed')}>
        <T weight="700">⏱ Zamanlı mod</T>
        <T size={13} sub>
          Soru başına 90 saniye — sınav temposu.
        </T>
      </Card>
      <Card onPress={() => go('wrong', { topic: '' })}>
        <Row style={{ justifyContent: 'space-between' }}>
          <T weight="700">❌ Yalnızca yanlışlarım</T>
          <Chip label={String(wrong)} color={wrong ? c.bad : undefined} />
        </Row>
        <T size={13} sub>
          Son denemende yanlış yaptığın sorular.
        </T>
      </Card>
      <Card onPress={() => router.push('/study')}>
        <T weight="700">🎯 Konu / LOS bazlı</T>
        <T size={13} sub>
          Konular sekmesinden modül ve LOS seçerek çalış.
        </T>
      </Card>
      <Card onPress={() => router.push('/mock')}>
        <T weight="700">📝 Tam mock sınav</T>
        <T size={13} sub>
          2 oturum × 90 soru, oturum başına 2 sa 15 dk; sonunda konu bazlı skor ve zayıf alan raporu.
        </T>
      </Card>

      <H>İngilizce ve etik</H>
      <Card onPress={() => router.push('/patterns')}>
        <T weight="700">🧩 CFA soru kalıpları</T>
        <T size={13} sub>
          “least likely”, “closest to”, “NOT” … {patterns.length} kalıp ve alıştırma.
        </T>
      </Card>
      <Card onPress={() => router.push('/ethics')}>
        <T weight="700">⚖️ Etik vaka modülü</T>
        <T size={13} sub>
          Standards I–VII için özgün vakalar ({ethicsCases.length}).
        </T>
      </Card>
      <Button kind="secondary" style={{ marginTop: 6 }} icon="🚌" title="Otobüs modu (5 soru)" onPress={() => go('bus')} />
    </Screen>
  );
}
