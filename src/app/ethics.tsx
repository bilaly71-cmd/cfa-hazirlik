import { Stack, router } from 'expo-router';
import { useState } from 'react';

import { BiText } from '@/components/bitext';
import { Button, Card, Chip, Empty, Row, Screen, T } from '@/components/ui';
import { ethicsCases, questionById } from '@/content';
import { useColors } from '@/hooks/use-theme';

const STANDARDS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default function Ethics() {
  const c = useColors();
  const [std, setStd] = useState('I');
  const [open, setOpen] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);
  const list = ethicsCases.filter((e) => e.standard.startsWith(std + '('));
  const cur = ethicsCases.find((e) => e.id === open);

  if (cur) {
    const qids = cur.question_ids.filter((id) => questionById.has(id));
    return (
      <Screen footer={<Button kind="secondary" title="← Vakalar" onPress={() => (setOpen(null), setReveal(false))} />}>
        <Stack.Screen options={{ title: `Standard ${cur.standard}` }} />
        <T size={20} weight="800">
          {cur.title_en}
        </T>
        <T color={c.tr}>{cur.title_tr}</T>
        <T weight="700" style={{ marginTop: 10 }}>
          Vaka
        </T>
        <BiText en={cur.scenario_en} tr={cur.scenario_tr} />
        <T size={14} sub style={{ marginTop: 8 }}>
          Önce kendin düşün: hangi standart ilgili, ihlal var mı, doğru davranış ne olurdu?
        </T>
        {!reveal ? (
          <Button style={{ marginTop: 10 }} title="Analizi göster" onPress={() => setReveal(true)} />
        ) : (
          <>
            <T weight="700" style={{ marginTop: 10 }}>
              Analiz
            </T>
            <BiText en={cur.analysis_en} tr={cur.analysis_tr} levelOverride={3} />
            <Card style={{ marginTop: 8, backgroundColor: c.goodBg }}>
              <T weight="700" color={c.good}>
                Akılda kalsın
              </T>
              <T size={14}>{cur.takeaway_tr}</T>
            </Card>
          </>
        )}
        {qids.length ? (
          <Button style={{ marginTop: 10 }} kind="secondary" title={`İlgili ${qids.length} soru`} onPress={() => router.push({ pathname: '/quiz', params: { mode: 'ids', ids: qids.join(',') } })} />
        ) : null}
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: 'Etik vakaları' }} />
      <Row wrap style={{ marginBottom: 10 }}>
        {STANDARDS.map((s) => (
          <Chip key={s} label={`Std ${s}`} active={std === s} onPress={() => setStd(s)} />
        ))}
      </Row>
      {!list.length ? <Empty text="Bu standardın vakaları henüz doğrulanmadı." /> : null}
      {list.map((e) => (
        <Card key={e.id} onPress={() => setOpen(e.id)}>
          <Row>
            <Chip label={e.standard} />
            <T weight="700" style={{ flex: 1 }}>
              {e.title_tr}
            </T>
          </Row>
          <T size={13} sub numberOfLines={2} style={{ marginTop: 4 }}>
            {e.scenario_tr}
          </T>
        </Card>
      ))}
      <Button kind="secondary" style={{ marginTop: 8 }} title="Etik soruları çöz" onPress={() => router.push({ pathname: '/quiz', params: { mode: 'topic', topic: 'ETH' } })} />
    </Screen>
  );
}
