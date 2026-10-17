import { Stack, router } from 'expo-router';
import { useMemo } from 'react';

import { Bar, Button, Card, H, Row, Screen, T } from '@/components/ui';
import { questions, topics, weights } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { daysUntil, localDay, readinessScore, streak, topicStats } from '@/lib/scoring';
import { useStore } from '@/state/store';

export default function Stats() {
  const c = useColors();
  const s = useStore((x) => x);
  const stats = useMemo(() => topicStats(s.attempts), [s.attempts]);
  const score = readinessScore(s.attempts, weights);
  const total = s.attempts.length;
  const correct = s.attempts.filter((a) => a.correct).length;
  const avg = total ? Math.round(s.attempts.reduce((x, a) => x + a.seconds, 0) / total) : 0;
  const seen = new Set(s.attempts.map((a) => a.qid)).size;
  const byLevel = [0, 1, 2, 3].map((l) => {
    const xs = s.attempts.filter((a) => a.trLevel === l);
    return { l, n: xs.length, acc: xs.length ? Math.round((xs.filter((a) => a.correct).length / xs.length) * 100) : 0 };
  });
  const today = localDay();
  return (
    <Screen>
      <Stack.Screen options={{ title: 'İstatistik' }} />
      <Card>
        <Row style={{ justifyContent: 'space-between' }}>
          <T weight="700">Hazırlık skoru</T>
          <T size={24} weight="800">
            %{score}
          </T>
        </Row>
        <Bar value={score} />
        <T size={13} sub style={{ marginTop: 6 }}>
          {total} cevap · %{total ? Math.round((correct / total) * 100) : 0} doğru · ort. {avg} sn · {seen}/{questions.length} farklı soru · seri {streak(s.studyDays, today)} gün ·
          sınava {daysUntil(s.settings.examDate)} gün
        </T>
      </Card>

      <H>Konu bazında</H>
      {topics.map((t) => {
        const st = stats[t.id];
        const acc = st ? Math.round(st.accuracy * 100) : 0;
        return (
          <Card key={t.id} style={{ paddingVertical: 10 }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <T style={{ flex: 1 }}>
                {t.name_tr} <T size={12} sub>{`%${t.weight_min}–${t.weight_max}`}</T>
              </T>
              <T weight="700" color={!st ? c.sub : acc >= 70 ? c.good : acc >= 50 ? c.warn : c.bad}>
                {st ? `%${acc}` : '—'}
              </T>
            </Row>
            <Bar value={acc} height={5} color={acc >= 70 ? c.good : acc >= 50 ? c.warn : c.bad} />
            <T size={12} sub>
              {st ? `${st.attempts} soru · ort. ${Math.round(st.avgSeconds)} sn` : 'henüz soru yok'}
            </T>
          </Card>
        );
      })}

      <H>Yanlışların nedeni</H>
      <Card>
        {(
          [
            ['know', 'Bilmiyordum'],
            ['rush', 'Acele ettim'],
            ['read', 'Yanlış okudum'],
            ['calc', 'Hesap hatası'],
          ] as const
        ).map(([k, label]) => {
          const n = s.attempts.filter((a) => a.reason === k).length;
          // Şu an hâlâ yanlış olan ve en son bu nedenle etiketlenen sorular
          const last = new Map<string, (typeof s.attempts)[number]>();
          for (const a of s.attempts) last.set(a.qid, a);
          const ids = [...last.values()].filter((a) => !a.correct && a.reason === k).map((a) => a.qid);
          return (
            <Row key={k} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <T>{label}</T>
              <Row>
                <T sub>{n}</T>
                {ids.length ? (
                  <Button small kind="secondary" title={`${ids.length} soruyu çöz`} onPress={() => router.push({ pathname: '/quiz', params: { mode: 'ids', ids: ids.slice(0, 15).join(',') } })} />
                ) : null}
              </Row>
            </Row>
          );
        })}
        <T size={12} sub style={{ marginTop: 6 }}>
          {(() => {
            const tips = {
              know: 'En sık neden “bilmiyordum”: ilgili dersi tekrar oku, Tekrar sekmesindeki kartları çalış.',
              rush: 'En sık neden “acele”: şıkları okumadan işaretleme; son 10 saniyeye kadar bekle.',
              read: 'En sık neden “yanlış okudum”: Soru kalıpları bölümüne bak (NOT, least likely, closest to).',
              calc: 'En sık neden “hesap hatası”: Hesap rehberi ve Formüller ekranında adımları tekrar et.',
            } as const;
            const top = (['know', 'rush', 'read', 'calc'] as const)
              .map((k) => [k, s.attempts.filter((a) => a.reason === k).length] as const)
              .sort((a, b) => b[1] - a[1])[0];
            return top[1] ? tips[top[0]] : 'Yanlış yaptığında nedenini işaretle; burada sana özel öneri çıkar.';
          })()}
        </T>
      </Card>

      <H>Türkçe destek seviyesine göre</H>
      <Card>
        {byLevel.map((b) => (
          <Row key={b.l} style={{ justifyContent: 'space-between' }}>
            <T>Seviye {b.l}</T>
            <T sub>{b.n ? `${b.n} soru · %${b.acc}` : '—'}</T>
          </Row>
        ))}
        <T size={12} sub style={{ marginTop: 6 }}>
          Amaç: sınavdan önce Seviye 0'da da aynı başarıyı yakalamak.
        </T>
      </Card>

      <H>Mock geçmişi</H>
      {s.mocks.length ? (
        s.mocks.map((m) => (
          <Row key={m.id} style={{ justifyContent: 'space-between' }}>
            <T>{m.at.slice(0, 10)}</T>
            <T weight="700">%{Math.round((m.correct / m.total) * 100)}</T>
          </Row>
        ))
      ) : (
        <T sub>Henüz mock yok.</T>
      )}
    </Screen>
  );
}
