import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Bar, Button, Card, Chip, H, Row, Screen, T } from '@/components/ui';
import { questionById, vocab, vocabById } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { buildMatch, buildRound, type GameQ, type MatchBoard, type PoolInput } from '@/lib/games';
import { speakEn } from '@/lib/speech';
import { srsKey } from '@/lib/srs';
import { actions, getState } from '@/state/store';

type Mode = 'meaning' | 'cloze' | 'match';
const ROUND = 10;

/** Oyun havuzu: defter + çözdüğün sorulardaki kelimeler (yanlış yapılanlar önce) + A2-B1/günlük anlamlı kelimeler. */
function poolInput(): PoolInput {
  const s = getState();
  const wrongFirst = [...s.attempts].reverse().sort((a, b) => Number(a.correct) - Number(b.correct));
  const seen: string[] = [];
  for (const a of wrongFirst.slice(0, 300)) for (const id of questionById.get(a.qid)?.vocab_ids ?? []) seen.push(id);
  return { vocab, notebookIds: Object.keys(s.notebook), seenIds: [...new Set(seen)] };
}

function learn(id: string, correct: boolean) {
  const key = srsKey('v', id);
  const s = getState();
  if (!correct && vocabById.has(id)) actions.addWord(id); // bilinmeyen kelime deftere + aralıklı tekrara girer
  else if (s.srs[key]) actions.reviewCard(key, 'good');
}

export default function English() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [seed, setSeed] = useState(1);
  const [best, setBest] = useState<Record<string, number>>({});
  const input = useMemo(poolInput, [mode, seed]); // eslint-disable-line react-hooks/exhaustive-deps

  if (mode) {
    return (
      <Screen>
        <Stack.Screen options={{ title: mode === 'meaning' ? 'Anlam oyunu' : mode === 'cloze' ? 'Boşluk doldur' : 'Eşleştir' }} />
        {mode === 'match' ? (
          <MatchGame
            key={seed}
            input={input}
            seed={seed}
            onExit={(score) => {
              setBest((b) => ({ ...b, [mode]: Math.max(b[mode] ?? 0, score) }));
              setMode(null);
            }}
            onAgain={() => setSeed((x) => x + 1)}
          />
        ) : (
          <QuizGame
            key={`${mode}-${seed}`}
            kind={mode}
            input={input}
            seed={seed}
            onExit={(score) => {
              setBest((b) => ({ ...b, [mode]: Math.max(b[mode] ?? 0, score) }));
              setMode(null);
            }}
            onAgain={() => setSeed((x) => x + 1)}
          />
        )}
      </Screen>
    );
  }

  const nb = Object.keys(getState().notebook).length;
  return (
    <Screen>
      <Stack.Screen options={{ title: 'İngilizce oyunları' }} />
      <T sub size={14}>
        Sorularda ve derslerde geçen kelime ve cümlelerle kısa oyunlar. Havuz her seferinde değişir ve hepsini kapsamaz: defterindeki kelimeler ve
        çözdüğün sorulardaki kelimeler öncelikli. Bilemediğin kelime otomatik olarak deftere (aralıklı tekrara) eklenir.
      </T>
      <H>Oyunlar ({ROUND} soruluk tur)</H>
      <Card onPress={() => setMode('meaning')}>
        <Row style={{ justifyContent: 'space-between' }}>
          <T weight="700">🎯 Anlam oyunu</T>
          {best.meaning !== undefined ? <Chip label={`en iyi ${best.meaning}/${ROUND}`} /> : null}
        </Row>
        <T size={13} sub>
          İngilizce kelimeyi gör, doğru Türkçe anlamı seç. Telaffuzu dinle.
        </T>
      </Card>
      <Card onPress={() => setMode('cloze')}>
        <Row style={{ justifyContent: 'space-between' }}>
          <T weight="700">✍️ Boşluk doldur</T>
          {best.cloze !== undefined ? <Chip label={`en iyi ${best.cloze}/${ROUND}`} /> : null}
        </Row>
        <T size={13} sub>
          Cümledeki eksik kelimeyi seç. Cümle yapısını ve kullanım yerini öğretir.
        </T>
      </Card>
      <Card onPress={() => setMode('match')}>
        <Row style={{ justifyContent: 'space-between' }}>
          <T weight="700">🔗 Eşleştir</T>
          {best.match !== undefined ? <Chip label={`en iyi ${best.match} hata`} /> : null}
        </Row>
        <T size={13} sub>
          5 kelime ile Türkçe karşılıklarını eşleştir; hata sayını azalt.
        </T>
      </Card>
      <T size={12} sub style={{ marginTop: 8 }}>
        Defterinde {nb} kelime var · havuzda {vocab.length} kelime
      </T>
    </Screen>
  );
}

function QuizGame({
  kind,
  input,
  seed,
  onExit,
  onAgain,
}: {
  kind: 'meaning' | 'cloze';
  input: PoolInput;
  seed: number;
  onExit: (score: number) => void;
  onAgain: () => void;
}) {
  const c = useColors();
  const qs = useMemo<GameQ[]>(() => buildRound(kind, input, ROUND, seed * 977), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<GameQ[]>([]);

  if (!qs.length) {
    return (
      <Card>
        <T sub center>
          Bu oyun için yeterli kelime/cümle yok.
        </T>
        <Button title="Geri" onPress={() => onExit(0)} />
      </Card>
    );
  }
  if (i >= qs.length) {
    return (
      <View>
        <Card>
          <T size={28} weight="800" center>
            {score} / {qs.length}
          </T>
          <T center sub>
            {score === qs.length ? 'Mükemmel! 🎉' : score >= qs.length * 0.7 ? 'Çok iyi!' : 'Tekrar edelim, olur.'}
          </T>
        </Card>
        {missed.length ? (
          <>
            <H>Bilemediklerin (deftere eklendi)</H>
            {missed.map((m) => (
              <Card key={m.id} onPress={() => speakEn(m.speak)} style={{ paddingVertical: 10 }}>
                <T weight="700">{m.reveal.termTr}</T>
                <T size={13}>{m.reveal.en}</T>
                <T size={13} color={c.tr}>
                  {m.reveal.tr}
                </T>
              </Card>
            ))}
          </>
        ) : null}
        <Row style={{ marginTop: 8 }}>
          <Button style={{ flex: 1 }} title="Yeni tur" onPress={onAgain} />
          <Button style={{ flex: 1 }} kind="secondary" title="Menü" onPress={() => onExit(score)} />
        </Row>
      </View>
    );
  }

  const q = qs[i];
  const done = pick !== null;
  const choose = (id: string) => {
    if (done) return;
    setPick(id);
    const ok = id === q.answerId;
    learn(q.id, ok);
    if (ok) setScore((x) => x + 1);
    else setMissed((m) => [...m, q]);
    if (kind === 'cloze' || ok) speakEn(q.speak);
  };

  return (
    <View>
      <Bar value={(i / qs.length) * 100} height={5} />
      <T size={12} sub style={{ marginVertical: 6 }}>
        {i + 1}/{qs.length} · doğru {score}
      </T>
      <Card>
        <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <T size={kind === 'meaning' ? 26 : 18} weight={kind === 'meaning' ? '800' : '600'} style={{ flex: 1 }}>
            {q.prompt}
          </T>
          <Pressable onPress={() => speakEn(kind === 'meaning' ? q.speak : q.prompt.replace('_____', 'blank'))} hitSlop={10}>
            <T size={20}>🔊</T>
          </Pressable>
        </Row>
        {q.promptSub && kind === 'meaning' ? (
          <T size={13} sub style={{ marginTop: 4 }}>
            {q.promptSub}
          </T>
        ) : null}
      </Card>
      <View style={{ gap: 8, marginTop: 6 }}>
        {q.options.map((o) => {
          const isAns = o.id === q.answerId;
          const isPick = o.id === pick;
          const border = done ? (isAns ? c.good : isPick ? c.bad : c.border) : c.border;
          const bg = done ? (isAns ? c.goodBg : isPick ? c.badBg : c.card) : c.card;
          return (
            <Pressable
              key={o.id}
              onPress={() => choose(o.id)}
              disabled={done}
              style={{ borderWidth: done && (isAns || isPick) ? 2 : 1, borderColor: border, backgroundColor: bg, borderRadius: 12, padding: 14 }}>
              <T weight="600">{o.label}</T>
            </Pressable>
          );
        })}
      </View>
      {done ? (
        <View style={{ marginTop: 10 }}>
          <Card style={{ backgroundColor: pick === q.answerId ? c.goodBg : c.badBg }}>
            <T weight="700" color={pick === q.answerId ? c.good : c.bad}>
              {pick === q.answerId ? '✓ Doğru' : '✗ Yanlış'} — {q.reveal.termTr}
            </T>
            <T size={14}>{q.reveal.en}</T>
            <T size={13} color={c.tr}>
              {q.reveal.tr}
            </T>
          </Card>
          <Button
            title={i + 1 < qs.length ? 'Sonraki →' : 'Sonucu gör'}
            onPress={() => {
              setPick(null);
              setI(i + 1);
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

function MatchGame({
  input,
  seed,
  onExit,
  onAgain,
}: {
  input: PoolInput;
  seed: number;
  onExit: (mistakes: number) => void;
  onAgain: () => void;
}) {
  const c = useColors();
  const boards = useMemo<MatchBoard[]>(() => [buildMatch(input, 5, seed * 131), buildMatch(input, 5, seed * 131 + 1)], []); // eslint-disable-line react-hooks/exhaustive-deps
  const [b, setB] = useState(0);
  const [left, setLeft] = useState<string | null>(null);
  const [solved, setSolved] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [missedIds, setMissedIds] = useState<string[]>([]);

  const finished = b >= boards.length;
  if (finished) {
    return (
      <View>
        <Card>
          <T size={28} weight="800" center>
            {mistakes} hata
          </T>
          <T center sub>
            {mistakes === 0 ? 'Hatasız! 🎉' : 'Hata yaptığın kelimeler deftere eklendi.'}
          </T>
        </Card>
        {missedIds.map((id) => {
          const v = vocabById.get(id);
          return v ? (
            <Card key={id} onPress={() => speakEn(v.example_en)} style={{ paddingVertical: 10 }}>
              <T weight="700">
                {v.term_en} = {v.tr}
              </T>
              <T size={13}>{v.example_en}</T>
            </Card>
          ) : null;
        })}
        <Row style={{ marginTop: 8 }}>
          <Button style={{ flex: 1 }} title="Yeni tur" onPress={onAgain} />
          <Button style={{ flex: 1 }} kind="secondary" title="Menü" onPress={() => onExit(mistakes)} />
        </Row>
      </View>
    );
  }

  const board = boards[b];
  const tapRight = (id: string) => {
    if (!left || solved.includes(id)) return;
    if (left === id) {
      speakEn(vocabById.get(id)?.term_en ?? '');
      learn(id, true);
      const next = [...solved, id];
      setSolved(next);
      setLeft(null);
      if (next.length === board.left.length) {
        setTimeout(() => {
          setSolved([]);
          setB(b + 1);
        }, 500);
      }
    } else {
      setMistakes((m) => m + 1);
      setMissedIds((m) => (m.includes(left) ? m : [...m, left]));
      learn(left, false);
      setWrong(id);
      setLeft(null);
      setTimeout(() => setWrong(null), 600);
    }
  };

  const cell = (id: string, label: string, side: 'l' | 'r') => {
    const ok = solved.includes(id);
    const sel = side === 'l' && left === id;
    const bad = side === 'r' && wrong === id;
    return (
      <Pressable
        key={side + id}
        disabled={ok}
        onPress={() => (side === 'l' ? setLeft(id) : tapRight(id))}
        style={{
          borderWidth: sel || ok || bad ? 2 : 1,
          borderColor: ok ? c.good : bad ? c.bad : sel ? c.primary : c.border,
          backgroundColor: ok ? c.goodBg : bad ? c.badBg : c.card,
          borderRadius: 12,
          padding: 12,
          minHeight: 52,
          justifyContent: 'center',
          opacity: ok ? 0.6 : 1,
        }}>
        <T size={14} weight="600">
          {label}
        </T>
      </Pressable>
    );
  };

  return (
    <View>
      <T size={12} sub style={{ marginBottom: 6 }}>
        Tahta {b + 1}/{boards.length} · hata {mistakes} · önce soldaki kelimeye, sonra Türkçe karşılığına dokun
      </T>
      <Row gap={8} style={{ alignItems: 'flex-start' }}>
        <View style={{ flex: 1, gap: 8 }}>{board.left.map((o) => cell(o.id, o.label, 'l'))}</View>
        <View style={{ flex: 1, gap: 8 }}>{board.right.map((o) => cell(o.id, o.label, 'r'))}</View>
      </Row>
    </View>
  );
}
