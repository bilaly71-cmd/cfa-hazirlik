import { Stack } from 'expo-router';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { Button, Card, Chip, Row, Screen, T } from '@/components/ui';
import { useColors } from '@/hooks/use-theme';
import { solveFv, solveN, solvePmt, solvePv, solveRate } from '@/lib/tvm';

type K = 'n' | 'iy' | 'pv' | 'pmt' | 'fv';
const LABEL: Record<K, string> = { n: 'N (dönem sayısı)', iy: 'I/Y (yıllık %)', pv: 'PV', pmt: 'PMT', fv: 'FV' };

const fmt = (x: number) => (Math.abs(x) >= 1000 ? x.toFixed(4) : Number(x.toPrecision(8)).toString());

/** BA II Plus mantığıyla TVM: bilinenleri gir, bilinmeyen için [CPT] dokun. Sınavda cihazını kullan; burada doğrulama için. */
export default function TvmScreen() {
  const c = useColors();
  const [v, setV] = useState<Record<K, string>>({ n: '', iy: '', pv: '', pmt: '0', fv: '0' });
  const [py, setPy] = useState(1);
  const [bgn, setBgn] = useState(false);
  const [msg, setMsg] = useState('');
  const num = (k: K) => (v[k].trim() === '' ? NaN : Number(v[k].replace(',', '.')));

  const cpt = (k: K) => {
    const when = bgn ? 1 : 0;
    const r = num('iy') / 100 / py;
    const need = (['n', 'iy', 'pv', 'pmt', 'fv'] as K[]).filter((x) => x !== k);
    if (need.some((x) => Number.isNaN(num(x)))) {
      setMsg('Diğer dört değeri gir (PMT/FV yoksa 0 yaz).');
      return;
    }
    let out = NaN;
    if (k === 'pv') out = solvePv({ n: num('n'), r, pmt: num('pmt'), fv: num('fv'), when });
    if (k === 'fv') out = solveFv({ n: num('n'), r, pv: num('pv'), pmt: num('pmt'), when });
    if (k === 'pmt') out = solvePmt({ n: num('n'), r, pv: num('pv'), fv: num('fv'), when });
    if (k === 'n') out = solveN({ r, pv: num('pv'), pmt: num('pmt'), fv: num('fv'), when });
    if (k === 'iy') out = solveRate({ n: num('n'), pv: num('pv'), pmt: num('pmt'), fv: num('fv'), when }) * py * 100;
    if (!Number.isFinite(out)) {
      setMsg('Çözüm yok: işaretleri kontrol et (para çıkışı negatif, girişi pozitif olmalı).');
      return;
    }
    setMsg('');
    setV((s) => ({ ...s, [k]: fmt(out) }));
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: 'TVM hesaplayıcı' }} />
      <T size={13} sub>
        BA II Plus işaret kuralı: ödediğin (çıkış) negatif, aldığın (giriş) pozitif. Bilinen değerleri yaz, bilinmeyen satırda “CPT”ye dokun.
      </T>
      <Card style={{ marginTop: 10 }}>
        {(['n', 'iy', 'pv', 'pmt', 'fv'] as K[]).map((k) => (
          <Row key={k} style={{ marginBottom: 8, alignItems: 'center' }}>
            <T style={{ width: 120 }} weight="700">
              {LABEL[k]}
            </T>
            <TextInput
              value={v[k]}
              onChangeText={(t) => setV((s) => ({ ...s, [k]: t }))}
              keyboardType="numbers-and-punctuation"
              placeholder="?"
              placeholderTextColor={c.sub}
              style={{ flex: 1, borderWidth: 1, borderColor: c.border, borderRadius: 10, padding: 10, color: c.text, backgroundColor: c.card, fontSize: 16 }}
            />
            <Button small kind="secondary" title="CPT" onPress={() => cpt(k)} style={{ marginLeft: 6 }} />
          </Row>
        ))}
        <Row wrap style={{ marginTop: 4 }}>
          {[1, 2, 4, 12].map((p) => (
            <Chip key={p} label={`P/Y ${p}`} active={py === p} onPress={() => setPy(p)} />
          ))}
          <Chip label={bgn ? 'BGN (dönem başı)' : 'END (dönem sonu)'} active={bgn} onPress={() => setBgn(!bgn)} />
        </Row>
        {msg ? (
          <T size={13} color={c.warn} style={{ marginTop: 8 }}>
            {msg}
          </T>
        ) : null}
        <View style={{ marginTop: 10 }}>
          <Button kind="ghost" small title="Temizle" onPress={() => { setV({ n: '', iy: '', pv: '', pmt: '0', fv: '0' }); setMsg(''); }} />
        </View>
      </Card>
      <T size={12} sub style={{ marginTop: 8 }}>
        Not: Aylık ödemede N ay sayısı, P/Y 12 seç; I/Y yine yıllık yüzde. Sınavda cihazında P/Y ayarını kontrol etmeyi unutma.
      </T>
    </Screen>
  );
}
