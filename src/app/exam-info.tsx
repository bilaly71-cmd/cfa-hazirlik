import { Stack } from 'expo-router';
import { useState } from 'react';
import { Linking, Pressable, View } from 'react-native';

import { Card, Chip, Empty, H, Row, Screen, T } from '@/components/ui';
import { examInfo } from '@/content';
import { useColors } from '@/hooks/use-theme';

const CHECKLIST = [
  'Kayıttaki adım kimlikle birebir aynı (harf harf kontrol ettim)',
  'Sınav merkezinin adresini, ulaşım süresini ve saatini biliyorum',
  'Hesap makinem (BA II Plus / HP 12C) hazır: pil, ondalık ve P/Y ayarı kontrol edildi',
  'Resmi sınav günü kurallarını okudum (neyi getirebilirim, neyi getiremem)',
  'Son hafta: tam mock yaptım, zayıf alt konularıma döndüm',
  'Sınavdan önceki gece erken yattım; yeni konu çalışmıyorum',
];

export default function ExamInfo() {
  const c = useColors();
  const [done, setDone] = useState<Record<number, boolean>>({});
  if (!examInfo) {
    return (
      <Screen>
        <Stack.Screen options={{ title: 'Sınav bilgisi' }} />
        <Empty text="Sınav bilgisi henüz hazırlanmadı." />
      </Screen>
    );
  }
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Sınav bilgisi' }} />
      <Card style={{ backgroundColor: c.warnBg }}>
        <T size={13}>
          Son doğrulama: <T weight="700">{examInfo.last_verified}</T>. Ücret ve tarihler değişebilir; kayıt öncesi resmi siteden kontrol et.
          “Doğrulanmadı” etiketli bilgiler tek kaynağa dayanıyor.
        </T>
      </Card>
      <H>Sınav öncesi kontrol listesi</H>
      <Card>
        {CHECKLIST.map((t, i) => (
          <Pressable key={i} onPress={() => setDone((d) => ({ ...d, [i]: !d[i] }))} style={{ flexDirection: 'row', paddingVertical: 6, gap: 10 }} accessibilityRole="checkbox" accessibilityState={{ checked: !!done[i] }}>
            <T>{done[i] ? '✅' : '⬜'}</T>
            <T size={14} style={{ flex: 1, textDecorationLine: done[i] ? 'line-through' : 'none' }} sub={!!done[i]}>
              {t}
            </T>
          </Pressable>
        ))}
        <T size={12} sub style={{ marginTop: 4 }}>
          Genel hazırlık önerisidir; resmi kuralları CFA Institute sitesinden kontrol et.
        </T>
      </Card>
      {examInfo.sections.map((s) => (
        <View key={s.title}>
          <H>{s.title}</H>
          <Card>
            {s.items.map((it, i) => (
              <Row key={i} style={{ justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 4 }}>
                <T size={14} sub style={{ flex: 1 }}>
                  {it.label}
                </T>
                <Row style={{ flex: 1.3, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <T size={14} weight="600" style={{ textAlign: 'right' }}>
                    {it.value}
                  </T>
                  {it.unverified ? <Chip label="doğrulanmadı" color={c.warn} /> : null}
                </Row>
              </Row>
            ))}
          </Card>
        </View>
      ))}
      <H>Kaynaklar</H>
      {examInfo.links.map((l) => (
        <Card key={l.url} onPress={() => Linking.openURL(l.url)}>
          <T color={c.primary}>{l.title}</T>
          <T size={12} sub>
            {l.url}
          </T>
        </Card>
      ))}
    </Screen>
  );
}

