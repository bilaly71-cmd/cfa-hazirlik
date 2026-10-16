import { Stack, router } from 'expo-router';
import { useState } from 'react';

import { Card, Chip, Empty, Row, Screen, T } from '@/components/ui';
import { topicName, topics, vignettes } from '@/content';
import { useStore } from '@/state/store';

/** L2 vignette (item set) listesi: ortak metin + birkaç soru. */
export default function Vignettes() {
  const [topic, setTopic] = useState<string | undefined>();
  const attempts = useStore((s) => s.attempts);
  const done = new Set(attempts.map((a) => a.qid));
  const list = vignettes.filter((v) => !topic || v.topic === topic);
  return (
    <Screen>
      <Stack.Screen options={{ title: 'L2 vignette soruları' }} />
      <T size={14} sub style={{ marginBottom: 8 }}>
        Level II formatı: bir olay metni (vignette) ve ona bağlı sorular. L1 çalışman bittikten sonra için erken önizleme.
      </T>
      <Row wrap style={{ marginBottom: 10 }}>
        <Chip label="Tümü" active={!topic} onPress={() => setTopic(undefined)} />
        {topics.map((t) => (
          <Chip key={t.id} label={t.id} active={topic === t.id} onPress={() => setTopic(t.id)} />
        ))}
      </Row>
      {!list.length ? <Empty text="Henüz doğrulanmış L2 vignette yok." /> : null}
      {list.map((v) => {
        const n = v.questions.filter((q) => done.has(q.id)).length;
        return (
          <Card key={v.id} onPress={() => router.push({ pathname: '/vignette/[id]', params: { id: v.id } })}>
            <Row style={{ justifyContent: 'space-between' }}>
              <T weight="700" style={{ flex: 1 }}>
                {v.title_tr}
              </T>
              <Chip label={`${n}/${v.questions.length}`} />
            </Row>
            <T size={13} sub>
              {v.title_en} · {topicName(v.topic)} · {v.module_id}
            </T>
          </Card>
        );
      })}
    </Screen>
  );
}
