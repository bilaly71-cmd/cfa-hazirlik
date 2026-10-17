import { Stack } from 'expo-router';
import { useState } from 'react';

import { MathView } from '@/components/math';
import { Button, Card, Chip, Empty, Row, Screen, T } from '@/components/ui';
import { formulas, topics } from '@/content';
import { useColors } from '@/hooks/use-theme';

export default function Formulas() {
  const c = useColors();
  const [topic, setTopic] = useState(topics[0]?.id);
  const list = formulas.filter((f) => f.topic === topic);
  const [flash, setFlash] = useState<string[] | null>(null); // kalan kart kimlikleri
  const [shown, setShown] = useState(false);
  const startFlash = () => {
    setFlash([...list].sort(() => Math.random() - 0.5).map((f) => f.id));
    setShown(false);
  };
  const answer = (known: boolean) => {
    setFlash((q) => {
      if (!q) return q;
      const [first, ...rest] = q;
      return known ? rest : [...rest, first]; // bilinmeyen sona döner
    });
    setShown(false);
  };
  const cur = flash?.length ? formulas.find((f) => f.id === flash[0]) : undefined;
  if (flash) {
    return (
      <Screen>
        <Stack.Screen options={{ title: 'Formül flaş' }} />
        {cur ? (
          <>
            <T size={12} sub>
              Kalan: {flash.length}
            </T>
            <Card onPress={() => setShown(true)}>
              <T size={20} weight="800">
                {cur.name_en}
              </T>
              <T sub>{cur.name_tr}</T>
              {shown ? (
                <>
                  <MathView latex={cur.latex} />
                  {cur.vars_tr ? <T size={14}>{cur.vars_tr}</T> : null}
                  {cur.note_tr ? (
                    <T size={13} color={c.warn} style={{ marginTop: 4 }}>
                      ⚠ {cur.note_tr}
                    </T>
                  ) : null}
                </>
              ) : (
                <T size={13} sub style={{ marginTop: 10 }}>
                  Formülü aklından söyle, sonra dokun.
                </T>
              )}
            </Card>
            {shown ? (
              <Row>
                <Button style={{ flex: 1 }} kind="bad" title="Bilemedim" onPress={() => answer(false)} />
                <Button style={{ flex: 1 }} kind="good" title="Bildim" onPress={() => answer(true)} />
              </Row>
            ) : null}
          </>
        ) : (
          <Card>
            <T weight="700">Hepsini bitirdin ✓</T>
          </Card>
        )}
        <Button kind="ghost" title="Çık" onPress={() => setFlash(null)} />
      </Screen>
    );
  }
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Formül kartları' }} />
      <Row wrap style={{ marginBottom: 10 }}>
        {topics.map((t) => (
          <Chip key={t.id} label={`${t.id} (${formulas.filter((f) => f.topic === t.id).length})`} active={topic === t.id} onPress={() => setTopic(t.id)} />
        ))}
      </Row>
      {list.length ? <Button kind="secondary" title={`🃏 Flaş: bu konunun ${list.length} formülü`} onPress={startFlash} /> : null}
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
