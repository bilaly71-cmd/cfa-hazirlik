import { Stack } from 'expo-router';
import { useState } from 'react';
import { TextInput } from 'react-native';

import { Button, Card, Chip, H, Row, Screen, T } from '@/components/ui';
import { BiText } from '@/components/bitext';
import { useColors, useFont } from '@/hooks/use-theme';
import { recommendTrLevel, type TrLevel } from '@/lib/scoring';
import { speakEn } from '@/lib/speech';
import { exportFile } from '@/lib/export-file';
import { actions, exportJson, useStore } from '@/state/store';

const LEVELS: { l: TrLevel; title: string; sub: string }[] = [
  { l: 3, title: 'Seviye 3 — Türkçe her yerde', sub: 'İngilizce metnin altında Türkçesi hep görünür.' },
  { l: 2, title: 'Seviye 2 — Çevirince', sub: 'Paragraf, soru kökü ve her şık kart gibi döner; Türkçe arkada.' },
  { l: 1, title: 'Seviye 1 — Yalnızca kelime popup', sub: 'Sadece İngilizce; bilmediğin kelimeye dokun.' },
  { l: 0, title: 'Seviye 0 — Sınav modu', sub: 'Tamamen İngilizce, yardım yok.' },
];

export default function Settings() {
  const c = useColors();
  const f = useFont();
  const st = useStore((s) => s.settings);
  const attempts = useStore((s) => s.attempts);
  const rec = recommendTrLevel(attempts, st.trLevel);
  const [date, setDate] = useState(st.examDate);
  const [confirm, setConfirm] = useState(false);
  const [paste, setPaste] = useState('');
  const [bmsg, setBmsg] = useState('');
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Ayarlar' }} />
      <H>Türkçe destek seviyesi</H>
      {LEVELS.map((x) => (
        <Card key={x.l} onPress={() => actions.updateSettings({ trLevel: x.l })} style={{ borderColor: st.trLevel === x.l ? c.primary : c.border, borderWidth: st.trLevel === x.l ? 2 : 1 }}>
          <T weight="700">{x.title}</T>
          <T size={13} sub>
            {x.sub}
          </T>
        </Card>
      ))}
      <T size={13} sub>
        {rec.reason}
      </T>
      <Card style={{ marginTop: 8 }}>
        <T size={12} sub>
          Önizleme
        </T>
        <BiText en="The bond's yield to maturity is closest to 5.2%." tr="Tahvilin vadeye kadar getirisi %5,2'ye en yakındır." />
      </Card>

      <H>Görünüm</H>
      <Row wrap>
        {(
          [
            ['system', 'Sistem'],
            ['light', 'Açık'],
            ['dark', 'Karanlık'],
          ] as const
        ).map(([k, l]) => (
          <Chip key={k} label={l} active={st.theme === k} onPress={() => actions.updateSettings({ theme: k })} />
        ))}
      </Row>
      <T size={13} sub style={{ marginTop: 10 }}>
        Yazı boyutu
      </T>
      <Row wrap>
        {[1, 1.15, 1.3, 1.45].map((k) => (
          <Chip key={k} label={k === 1 ? 'Normal' : k === 1.15 ? 'Büyük' : k === 1.3 ? 'Çok büyük' : 'En büyük'} active={st.fontScale === k} onPress={() => actions.updateSettings({ fontScale: k })} />
        ))}
      </Row>

      <H>Sesli okuma hızı</H>
      <Row wrap>
        {[0.6, 0.75, 0.85, 1, 1.15].map((k) => (
          <Chip key={k} label={`${k}×`} active={st.ttsRate === k} onPress={() => actions.updateSettings({ ttsRate: k })} />
        ))}
        <Chip label="🔊 Dene" onPress={() => speakEn('The present value of the cash flows is closest to one thousand dollars.')} />
      </Row>

      <H>Sınav tarihi ve günlük hedef</H>
      <Row wrap style={{ marginBottom: 8 }}>
        {(
          [
            ['2027-02-22', 'Şub 2027'],
            ['2027-05-11', 'May 2027'],
            ['2027-08-15', 'Ağu 2027'],
            ['2027-11-13', 'Kas 2027'],
          ] as const
        ).map(([d, label]) => (
          <Chip
            key={d}
            label={label}
            active={st.examDate === d}
            onPress={() => {
              setDate(d);
              actions.updateSettings({ examDate: d });
            }}
          />
        ))}
      </Row>
      <Row>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-AA-GG"
          placeholderTextColor={c.sub}
          style={{ flex: 1, borderWidth: 1, borderColor: c.border, borderRadius: 10, padding: 10, color: c.text, backgroundColor: c.card, fontSize: f(16) }}
        />
        <Button small title="Kaydet" disabled={!/^\d{4}-\d{2}-\d{2}$/.test(date)} onPress={() => actions.updateSettings({ examDate: date })} />
      </Row>
      <T size={12} sub style={{ marginTop: 4 }}>
        Seçtiğin pencerenin ilk günü kullanılır (L1: Şubat 22–28, Mayıs 11–17, Ağustos 15–22, Kasım 13–19). Kendi randevu tarihini de yazabilirsin.
      </T>
      <Row wrap style={{ marginTop: 10 }}>
        {[10, 20, 30, 45, 60].map((k) => (
          <Chip key={k} label={`${k} soru/gün`} active={st.dailyGoal === k} onPress={() => actions.updateSettings({ dailyGoal: k })} />
        ))}
      </Row>

      <H>Veri</H>
      <T size={13} sub>
        Tüm ilerleme yalnızca bu cihazda saklanır (sunucu yok). Tarayıcı verisi silinirse kaybolur; arada yedek al.
      </T>
      <Row style={{ marginTop: 8 }}>
        <Button
          small
          style={{ flex: 1 }}
          kind="secondary"
          title="Yedek indir"
          onPress={async () => setBmsg((await exportFile(`cfa-yedek-${new Date().toISOString().slice(0, 10)}.json`, exportJson(), 'application/json')) ? 'Yedek hazır.' : 'Yedek alınamadı.')}
        />
      </Row>
      <TextInput
        value={paste}
        onChangeText={setPaste}
        placeholder="Yedekten dönmek için yedek dosyasının içeriğini buraya yapıştır"
        placeholderTextColor={c.sub}
        multiline
        style={{ marginTop: 8, minHeight: 56, borderWidth: 1, borderColor: c.border, borderRadius: 10, padding: 10, color: c.text, backgroundColor: c.card, fontSize: f(13) }}
      />
      <Button
        small
        style={{ marginTop: 6 }}
        kind="secondary"
        title="Yedekten yükle"
        disabled={paste.length < 20}
        onPress={() => {
          const ok = actions.importState(paste);
          setBmsg(ok ? 'Yüklendi.' : 'Geçersiz yedek.');
          if (ok) setPaste('');
        }}
      />
      {bmsg ? (
        <T size={12} sub style={{ marginTop: 4 }}>
          {bmsg}
        </T>
      ) : null}
      {confirm ? (
        <Row style={{ marginTop: 8 }}>
          <Button style={{ flex: 1 }} kind="bad" title="Evet, her şeyi sil" onPress={() => (actions.resetAll(), setConfirm(false))} />
          <Button style={{ flex: 1 }} kind="secondary" title="Vazgeç" onPress={() => setConfirm(false)} />
        </Row>
      ) : (
        <Button style={{ marginTop: 8 }} kind="ghost" title="İlerlemeyi sıfırla" onPress={() => setConfirm(true)} />
      )}
    </Screen>
  );
}
