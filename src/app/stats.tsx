import { Stack, router } from 'expo-router';
import { useMemo } from 'react';

import { Bar, Button, Card, H, Row, Screen, T } from '@/components/ui';
import { questions, questionsByTopic, topics, weights } from '@/content';
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
            %{Math.round(score)}
          </T>
        </Row>
        <Bar value={score} />
        <T size={13} sub style={{ marginTop: 6 }}>
          {total} cevap · %{total ? Math.round((correct / total) * 100) : 0} doğru · ort. {avg} sn · {seen}/{questions.length} farklı soru · seri {streak(s.studyDays, today)} gün ·
          sınava {daysUntil(s.settings.examDate)} gün
        </T>
      </Card>

      <H>Bu hafta ve tempo</H>
      <Card>
        {(() => {
          const day = (n: number) => {
            const d = new Date(today + 'T12:00:00Z');
            d.setUTCDate(d.getUTCDate() - n);
            return d.toISOString().slice(0, 10);
          };
          const wk = (from: number, to: number) => s.attempts.filter((a) => a.at.slice(0, 10) <= day(from) && a.at.slice(0, 10) > day(to));
          const thisW = wk(0, 7);
          const prevW = wk(7, 14);
          const acc = (xs: typeof thisW) => (xs.length ? Math.round((xs.filter((a) => a.correct).length / xs.length) * 100) : null);
          const daysStudied = s.studyDays.filter((d) => d <= today && d > day(7)).length;
          const perDay = thisW.length / 7;
          const left = Math.max(daysUntil(s.settings.examDate) - 14, 1);
          const unseen = Math.max(questions.length - seen, 0);
          const need = Math.ceil(unseen / left);
          const a1 = acc(thisW);
          const a0 = acc(prevW);
          return (
            <>
              <Row style={{ justifyContent: 'space-between' }}>
                <T>Çalıştığın gün (son 7)</T>
                <T weight="700">{daysStudied}/7</T>
              </Row>
              <Row style={{ justifyContent: 'space-between' }}>
                <T>Çözülen soru</T>
                <T weight="700">
                  {thisW.length}
                  {prevW.length ? ` (önceki hafta ${prevW.length})` : ''}
                </T>
              </Row>
              <Row style={{ justifyContent: 'space-between' }}>
                <T>Doğruluk</T>
                <T weight="700">
                  {a1 === null ? '—' : `%${a1}`}
                  {a1 !== null && a0 !== null ? (a1 >= a0 ? ` ▲ (%${a0})` : ` ▼ (%${a0})`) : ''}
                </T>
              </Row>
              {thisW.length >= 5 ? (
                <Button
                  style={{ marginTop: 8 }}
                  kind="secondary"
                  title="Haftalık tekrar: bu haftaki konulardan 15 soru"
                  onPress={() => {
                    const cnt = new Map<string, number>();
                    for (const a of thisW) cnt.set(a.topic, (cnt.get(a.topic) ?? 0) + 1);
                    const tops = [...cnt].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([t]) => t);
                    const pool = tops.flatMap((t) => questionsByTopic(t as never).map((q) => q.id)).sort(() => Math.random() - 0.5);
                    router.push({ pathname: '/quiz', params: { mode: 'ids', ids: pool.slice(0, 15).join(',') } });
                  }}
                />
              ) : null}
              <T size={13} sub style={{ marginTop: 8 }}>
                {unseen === 0
                  ? 'Tüm soruları en az bir kez gördün. Şimdi tekrar ve mock zamanı.'
                  : perDay >= need
                    ? `Tempo yeterli: günde ~${Math.round(perDay)} soru çözüyorsun, ${unseen} yeni soruyu bitirmek için günde ~${need} yeter.`
                    : `Yeni soruları sınavdan 2 hafta öncesine kadar bitirmek için günde ~${need} soru gerekir (şu an ~${Math.round(perDay)}). Kısa turlar toplanır.`}
              </T>
            </>
          );
        })()}
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

      {(() => {
        const miss = new Map<string, number>();
        for (const a of s.attempts) if (!a.correct) miss.set(a.qid, (miss.get(a.qid) ?? 0) + 1);
        const hard = [...miss].filter(([, n]) => n >= 2).map(([id]) => id);
        if (!hard.length) return null;
        return (
          <>
            <H>Takıldığın sorular</H>
            <Card>
              <T size={14}>{hard.length} soruyu 2 kez veya daha fazla yanlış yaptın. Bunlar en çok puan kazandıracak sorular: gerekçeyi bir kez daha oku.</T>
              <Button style={{ marginTop: 8 }} title={`Bunları çöz (${Math.min(hard.length, 10)})`} onPress={() => router.push({ pathname: '/quiz', params: { mode: 'ids', ids: hard.slice(0, 10).join(',') } })} />
            </Card>
          </>
        );
      })()}

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
