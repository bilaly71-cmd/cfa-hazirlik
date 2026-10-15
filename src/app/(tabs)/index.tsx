import { router } from 'expo-router';
import { useMemo } from 'react';
import { View } from 'react-native';

import { Bar, Button, Card, Chip, H, Row, Screen, T } from '@/components/ui';
import { questions, topicName, weights } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { dailyPlan, daysUntil, localDay, readinessScore, recommendTrLevel, streak, weakTopics } from '@/lib/scoring';
import { questionOfDay } from '@/lib/session';
import { dueCards } from '@/lib/srs';
import { actions, useStore } from '@/state/store';

const TR_LABEL = ['0 · Sınav modu', '1 · Yalnızca popup', '2 · Çevirince', '3 · Her yerde'];

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
  const rec = recommendTrLevel(s.attempts, s.settings.trLevel);
  const qod = questionOfDay(today);
  const st = streak(s.studyDays, today);
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

      <H>Bugünün planı</H>
      <Card>
        <T>
          • {plan.newQuestions} yeni soru · {plan.reviews} tekrar · ~{plan.minutes} dk
        </T>
        <Row style={{ marginTop: 10 }} wrap>
          <Button
            style={{ flex: 1, minWidth: 140 }}
            title={due.length ? `Tekrar (${due.length})` : 'Tekrar yok ✓'}
            disabled={!due.length}
            onPress={() => router.push('/review')}
          />
          <Button style={{ flex: 1, minWidth: 140 }} kind="secondary" title="10 soru çöz" onPress={() => router.push({ pathname: '/quiz', params: { mode: 'daily', n: '10' } })} />
        </Row>
        <T size={12} sub style={{ marginTop: 6 }}>
          Tekrar: {dueQ} soru · {dueV} kelime
        </T>
      </Card>

      <Button kind="secondary" icon="🚌" title="Otobüs modu — 5 soru, 5 dakika" onPress={() => router.push({ pathname: '/quiz', params: { mode: 'bus' } })} />

      {qod ? (
        <>
          <H>Günün sorusu</H>
          <Card onPress={() => router.push({ pathname: '/quiz', params: { mode: 'ids', ids: qod.id } })}>
            <Row style={{ marginBottom: 6 }}>
              <Chip label={topicName(qod.topic)} />
            </Row>
            <T numberOfLines={3}>{qod.stem_en}</T>
          </Card>
        </>
      ) : null}

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

      <Card onPress={() => router.push('/settings')}>
        <Row style={{ justifyContent: 'space-between' }}>
          <T>Türkçe destek seviyesi</T>
          <Chip label={TR_LABEL[s.settings.trLevel]} />
        </Row>
      </Card>

      {!questions.length ? (
        <Card style={{ backgroundColor: c.warnBg }}>
          <T size={14}>İçerik paketleri hazırlanıyor: doğrulanan sorular geldikçe burada görünecek.</T>
        </Card>
      ) : null}
    </Screen>
  );
}
