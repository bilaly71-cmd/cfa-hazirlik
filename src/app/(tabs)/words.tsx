import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';

import { useWordPopup } from '@/components/word-popup';
import { Button, Card, Chip, H, Row, Screen, T } from '@/components/ui';
import { vocab, vocabById } from '@/content';
import { useColors, useFont } from '@/hooks/use-theme';
import { exportFile } from '@/lib/export-file';
import { dueCards, intervalLabelTr } from '@/lib/srs';
import { toCsv, toJson, type ExportRow } from '@/lib/vocabExport';
import { actions, useStore } from '@/state/store';

export default function Words() {
  const c = useColors();
  const f = useFont();
  const open = useWordPopup();
  const notebook = useStore((s) => s.notebook);
  const srs = useStore((s) => s.srs);
  const [q, setQ] = useState('');
  const [msg, setMsg] = useState('');
  const dueV = useMemo(() => dueCards(srs, new Date(), 'v').length, [srs]);
  const ids = Object.keys(notebook).sort((a, b) => notebook[b].addedAt.localeCompare(notebook[a].addedAt));

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    return vocab.filter((v) => v.term_en.toLowerCase().includes(s) || v.tr.toLowerCase().includes(s)).slice(0, 30);
  }, [q]);

  const rows: ExportRow[] = ids.map((id) => {
    const v = vocabById.get(id);
    const cu = notebook[id].custom;
    return {
      term_en: v?.term_en ?? cu?.term_en ?? id,
      tr: v?.tr ?? cu?.tr ?? '',
      example_en: v?.example_en ?? cu?.example_en ?? '',
      example_tr: v?.example_tr ?? cu?.example_tr ?? '',
      topic: v?.topic ?? cu?.topic ?? '',
    };
  });

  const doExport = async (kind: 'json' | 'csv') => {
    const name = `kelime-defteri-${new Date().toISOString().slice(0, 10)}.${kind}`;
    const ok = await exportFile(name, kind === 'json' ? toJson(rows) : toCsv(rows), kind === 'json' ? 'application/json' : 'text/csv');
    setMsg(ok ? `${rows.length} kelime dışa aktarıldı (${name}).` : 'Dışa aktarma başarısız.');
  };

  return (
    <Screen>
      <Card onPress={() => router.push('/english')}>
        <T weight="700">🎮 İngilizce oyunları</T>
        <T size={13} sub>
          Anlam, boşluk doldurma ve eşleştirme — çözdüğün sorulardaki kelimelerle.
        </T>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <View>
            <T weight="700">Kelime defteri</T>
            <T size={13} sub>
              {ids.length} kelime · {dueV} tekrar bekliyor
            </T>
          </View>
          <Button small title="Tekrar et" disabled={!dueV} onPress={() => router.push({ pathname: '/review', params: { only: 'v' } })} />
        </Row>
        {ids.length ? (
          <>
        <Row style={{ marginTop: 10 }}>
          <Button small kind="secondary" title="JSON indir" disabled={!ids.length} onPress={() => doExport('json')} />
          <Button small kind="secondary" title="CSV indir" disabled={!ids.length} onPress={() => doExport('csv')} />
        </Row>
        {msg ? (
          <T size={12} sub style={{ marginTop: 6 }}>
            {msg}
          </T>
        ) : null}
        <T size={11} sub style={{ marginTop: 4 }}>
          Alanlar: term_en, tr, example_en, example_tr, topic {Platform.OS === 'web' ? '· dosya indirilir' : '· paylaş menüsü açılır'}
        </T>
          </>
        ) : null}
      </Card>

      <H>Sözlükte ara ({vocab.length} terim)</H>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="ör. yield, getiri, whereas…"
        placeholderTextColor={c.sub}
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: c.border, borderRadius: 12, padding: 12, color: c.text, backgroundColor: c.card, fontSize: f(16) }}
      />
      {results.map((v) => (
        <Card key={v.id} onPress={() => open(v.term_en, v.id)} style={{ marginTop: 6 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <T weight="700">{v.term_en}</T>
            {notebook[v.id] ? <Chip label="defterde" color={c.good} /> : <Chip label="+ ekle" onPress={() => actions.addWord(v.id)} />}
          </Row>
          <T size={14} color={c.tr}>
            {v.tr}
          </T>
        </Card>
      ))}

      <H>Defterim</H>
      {!ids.length ? (
        <Card>
          <T sub>Metinlerde bir kelimeye dokun → “Kelime defterime ekle”. Eklenen kelimeler aralıklı tekrara girer.</T>
        </Card>
      ) : null}
      {ids.map((id) => {
        const v = vocabById.get(id);
        const card = srs[`v:${id}`];
        return (
          <Card key={id} onPress={() => open(v?.term_en ?? notebook[id].custom?.term_en ?? id, v?.id)} style={{ paddingVertical: 10 }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <T weight="600">{v?.term_en ?? notebook[id].custom?.term_en}</T>
                <T size={13} color={c.tr}>
                  {v?.tr ?? (notebook[id].custom?.tr || '—')}
                </T>
              </View>
              {card ? <Chip label={`↻ ${intervalLabelTr(card)}`} /> : null}
            </Row>
          </Card>
        );
      })}
    </Screen>
  );
}
