import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Card, Chip, Empty, Row, Screen, T } from '@/components/ui';
import { calcGuides } from '@/content';
import { Fonts } from '@/constants/theme';
import { useColors } from '@/hooks/use-theme';

export default function Calculator() {
  const c = useColors();
  const [device, setDevice] = useState<'BA II Plus' | 'HP 12C'>('BA II Plus');
  const [open, setOpen] = useState<string | null>(null);
  const list = calcGuides.filter((g) => g.device === device);
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Hesap makinesi rehberi' }} />
      <Row style={{ marginBottom: 10 }}>
        <Chip label="TI BA II Plus" active={device === 'BA II Plus'} onPress={() => setDevice('BA II Plus')} />
        <Chip label="HP 12C" active={device === 'HP 12C'} onPress={() => setDevice('HP 12C')} />
      </Row>
      <T size={13} sub style={{ marginBottom: 8 }}>
        Sınavda yalnızca TI BA II Plus (Professional dahil) ve HP 12C ailesi serbest. Tuşları gerçek cihazında deneyerek çalış.
      </T>
      {!list.length ? <Empty text="Rehberler henüz doğrulanmadı." /> : null}
      {list.map((g) => (
        <Card key={g.id} onPress={() => setOpen(open === g.id ? null : g.id)}>
          <T weight="700">{g.title_tr}</T>
          <T size={13} sub>
            {g.title_en} · {g.when_tr}
          </T>
          {open === g.id ? (
            <View style={{ marginTop: 8, gap: 6 }}>
              {g.steps.map((s, i) => (
                <Row key={i} style={{ alignItems: 'flex-start' }}>
                  <View style={{ minWidth: 120, backgroundColor: c.cardAlt, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 }}>
                    <T size={13} style={{ fontFamily: Fonts.mono }}>
                      {s.keys}
                    </T>
                  </View>
                  <View style={{ flex: 1 }}>
                    <T size={14}>{s.note_tr}</T>
                    {s.display ? (
                      <T size={12} sub style={{ fontFamily: Fonts.mono }}>
                        ekran: {s.display}
                      </T>
                    ) : null}
                  </View>
                </Row>
              ))}
              {g.example_tr ? (
                <Card style={{ backgroundColor: c.cardAlt, marginTop: 6 }}>
                  <T size={14}>{g.example_tr}</T>
                </Card>
              ) : null}
              {g.pitfalls_tr.map((p, i) => (
                <T key={i} size={13} color={c.warn}>
                  ⚠ {p}
                </T>
              ))}
            </View>
          ) : null}
        </Card>
      ))}
    </Screen>
  );
}
