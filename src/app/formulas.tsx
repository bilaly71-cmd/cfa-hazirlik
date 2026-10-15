import { Stack } from 'expo-router';
import { useState } from 'react';

import { MathView } from '@/components/math';
import { Card, Chip, Empty, Row, Screen, T } from '@/components/ui';
import { formulas, topics } from '@/content';
import { useColors } from '@/hooks/use-theme';

export default function Formulas() {
  const c = useColors();
  const [topic, setTopic] = useState(topics[0]?.id);
  const list = formulas.filter((f) => f.topic === topic);
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Formül kartları' }} />
      <Row wrap style={{ marginBottom: 10 }}>
        {topics.map((t) => (
          <Chip key={t.id} label={`${t.id} (${formulas.filter((f) => f.topic === t.id).length})`} active={topic === t.id} onPress={() => setTopic(t.id)} />
        ))}
      </Row>
      {!list.length ? <Empty text="Bu konunun formül kartları henüz doğrulanmadı." /> : null}
      {list.map((f) => (
        <Card key={f.id}>
          <T weight="700">{f.name_tr}</T>
          <T size={13} sub>
            {f.name_en}
            {f.module_id ? ` · ${f.module_id}` : ''}
          </T>
          <MathView latex={f.latex} />
          {f.vars_tr ? <T size={14}>{f.vars_tr}</T> : null}
          {f.note_tr ? (
            <T size={13} color={c.warn} style={{ marginTop: 4 }}>
              ⚠ {f.note_tr}
            </T>
          ) : null}
        </Card>
      ))}
    </Screen>
  );
}
