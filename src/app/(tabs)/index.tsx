import { router } from 'expo-router';
import { useMemo } from 'react';
import { Platform, View } from 'react-native';

import { Bar, Button, Card, H, Row, Screen, T } from '@/components/ui';
import { lessonByModule, questions, topicName, topics, weights } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { dailyPlan, daysUntil, localDay, readMinutes, readinessScore, recommendTrLevel, streak, weakTopics, wordCount } from '@/lib/scoring';
import { dueCards } from '@/lib/srs';
import { actions, useStore } from '@/state/store';

export default function Today() {
  const c = useColors();
  const s = useStore((x) => x);
  const today = localDay();
  const days = daysUntil(s.settings.examDate);
  const due = useMemo(() => dueCards(s.srs), [s.srs]);
  const dueQ = due.filter((d) => d.key.startsWith('q:')).length;
  const dueV = due.length - dueQ;
  const answeredIds = useMemo(() => new Set(s.attempts.map((a) => a.qid)), [s.attempts]);
  const plan = dailyPlan(days, questions.length - answeredIds.size, due.length);
  const todayCount = s.attempts.filter((a) => a.at.slice(0, 10) === today).length;
  const score = readinessScore(s.attempts, weights);
  const weak = weakTopics(s.attempts, weights, 3);
  const focus = s.attempts.length >= 20 ? weak[0] : undefined; // en çok puan getirecek zayıf konu
  const rec = recommendTrLevel(s.attempts, s.settings.trLevel);
  const st = streak(s.studyDays, today);
  // Sıradaki ders: müfredat sırasında, okunmamış LOS'u olan ilk anlatımlı modül
  const nextMod = useMemo(() => {
    for (const t of topics) for (const m of t.modules) if (lessonByModule.has(m.id) && m.los.some((l) => !s.losRead[l.id])) return m;
    return undefined;
  }, [s.losRead]);
  const nextLesson = nextMod ? lessonByModule.get(nextMod.id) : undefined;
  // Web'de ve uygulama olarak yüklenmemişse "ana ekrana ekle" ipucu
  const showInstall =
    Platform.OS === 'web' &&
    !s.settings.installDismissed &&
    typeof window !== 'undefined' &&
    !window.matchMedia?.('(display-mode: standalone)').matches &&
    !(navigator as unknown as { standalone?: boolean }).standalone &&
    /android|iphone|ipad/i.test(navigator.userAgent);
  const isIos = typeof navigator !== 'undefined' && /iphone|ipad/i.test(navigator.userAgent);
  const goal = Math.max(s.settings.dailyGoal, 1);

  return (
    <Screen>
      <Card>
        <Row style={{ justifyContent: 'space-between' }}>
          <View>
            <T size={13} sub>
              Sınava kalan
            </T>
            <T size={30} weight="800">
              {days} gün
            </T>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <T size={13} sub>
              Seri
            </T>
            <T size={24} weight="800">
              🔥 {st}
            </T>
          </View>
        </Row>
        <T size={13} sub style={{ marginTop: 8 }}>
          Bugün: {todayCount}/{goal} soru
        </T>
        <Bar value={(todayCount / goal) * 100} color={c.good} />
      </Card>

      {rec.suggest !== null && s.settings.lastSuggestionDismissed !== `${rec.suggest}-${s.attempts.length >> 5}` ? (
        <Card style={{ backgroundColor: rec.suggest < s.settings.trLevel ? c.goodBg : c.warnBg }}>
          <T weight="700">Türkçe destek önerisi</T>
          <T size={14} style={{ marginTop: 4 }}>
            {rec.reason}
          </T>
          <Row style={{ marginTop: 10 }}>
            <Button small title={`Seviye ${rec.suggest}'e geç`} onPress={() => actions.updateSettings({ trLevel: rec.suggest! })} />
            <Button
              small
              kind="ghost"
              title="Şimdi değil"
              onPress={() => actions.updateSettings({ lastSuggestionDismissed: `${rec.suggest}-${s.attempts.length >> 5}` })}
            />
          </Row>
        </Card>
      ) : null}

      {showInstall ? (
        <Card style={{ backgroundColor: c.warnBg }}>
          <T weight="700">📲 Ana ekrana ekle</T>
          <T size={13} style={{ marginTop: 4 }}>
            {isIos ? 'Safari’de Paylaş düğmesi → “Ana Ekrana Ekle”.' : 'Tarayıcı menüsü (⋮) → “Uygulamayı yükle” / “Ana ekrana ekle”.'} Uygulama gibi açılır, internetsiz de çalışır.
          </T>
          <Button small kind="ghost" title="Tamam, gizle" style={{ marginTop: 6 }} onPress={() => actions.updateSettings({ installDismissed: true })} />
        </Card>
      ) : null}

      <Button
        icon="▶"
        title={due.length ? `Başla — ${Math.min(due.length, 10)} tekrar kartı` : 'Başla — 5 soru, 3 dakika'}
        onPress={() =>
          due.length
            ? router.push('/review')
            : router.push({ pathname: '/quiz', params: focus ? { mode: 'topic', topic: focus.id, n: '5' } : { mode: 'daily', n: '5' } })
        }
      />
      <T size={12} sub style={{ textAlign: 'center' }}>
        Ne çalışacağını düşünme, başla. Kısa tur de sayılır; 5 soru bile seriyi sürdürür.
      </T>

      <H>Kaç dakikan var?</H>
      <Row>
        {([[5, 3], [10, 7], [15, 10]] as const).map(([min, n]) => (
          <Button
            key={min}
            style={{ flex: 1 }}
            kind={min === 10 ? 'primary' : 'secondary'}
            title={`${min} dk`}
            onPress={() =>
              min === 5 && due.length
                ? router.push('/review')
                : router.push({ pathname: '/quiz', params: focus ? { mode: 'topic', topic: focus.id, n: String(n) } : { mode: 'daily', n: String(n) } })
            }
          />
        ))}
      </Row>
      <T size={12} sub>
        5 dk: tekrar ya da 3 soru · 10 dk: 7 soru · 15 dk: 10 soru
      </T>

      <T size={13} sub>
        Bugünün planı: {plan.newQuestions} yeni soru · {due.length} tekrar ({dueQ} soru, {dueV} kelime) · ~{plan.minutes} dk. Hepsini bitirmek zorunda değilsin.
      </T>

      {nextMod && nextLesson ? (
        <Button
          kind="secondary"
          icon="📖"
          title={`Sıradaki ders: ${nextMod.title_tr} (~${readMinutes(nextLesson.sections.reduce((a, x) => a + wordCount(x.en), 0))} dk)`}
          onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: nextMod.id } })}
        />
      ) : null}

      <Button kind="secondary" icon="🎮" title="İngilizce oyunu — 2 dakikada kelime" onPress={() => router.push('/english')} />


      <H>Hazırlık</H>
      <Card onPress={() => router.push('/stats')}>
        <Row style={{ justifyContent: 'space-between' }}>
          <T weight="700">Tahmini hazırlık skoru</T>
          <T size={22} weight="800" color={score >= 70 ? c.good : score >= 55 ? c.warn : c.bad}>
            %{score}
          </T>
        </Row>
        <Bar value={score} color={score >= 70 ? c.good : score >= 55 ? c.warn : c.bad} />
        <T size={12} sub style={{ marginTop: 6 }}>
          Konu ağırlıklarıyla hesaplanır; az veride şans düzeyine (%33) çekilir. %70 üzeri hedef (resmi değil).
        </T>
        {s.attempts.length ? (
          <T size={14} style={{ marginTop: 6 }}>
            Öncelik: {weak.map((w) => `${topicName(w.id)} (%${Math.round(w.acc * 100)})`).join(', ')}
          </T>
        ) : null}
      </Card>


    </Screen>
  );
}
