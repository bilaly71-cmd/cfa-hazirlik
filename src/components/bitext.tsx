import { useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { T } from './ui';
import { useWordPopup } from './word-popup';
import { vocabIndex } from '@/content';
import { useColors, useFont } from '@/hooks/use-theme';
import { segment } from '@/lib/tokenize';
import { useSettings } from '@/state/store';

type TapProps = { text: string; size?: number; weight?: '400' | '600' | '700'; marked?: string[]; tappable?: boolean };

/** Her kelimesine dokunulabilen İngilizce metin. İşaretli (vocab_ids) kelimeler altı çizili renkli görünür. */
export function TappableText({ text, size = 16, weight = '400', marked, tappable = true }: TapProps) {
  const c = useColors();
  const f = useFont();
  const open = useWordPopup();
  const segs = useMemo(() => segment(text, vocabIndex, marked ? new Set(marked) : undefined), [text, marked]);
  const base = { fontSize: f(size), lineHeight: Math.round(f(size) * 1.5), fontWeight: weight, color: c.text } as const;
  if (!tappable) return <Text style={base}>{text}</Text>;
  return (
    <Text style={base}>
      {segs.map((s, i) =>
        s.kind === 'sep' ? (
          s.text
        ) : (
          <Text
            key={i}
            onPress={() => open(s.text, s.vocabId)}
            suppressHighlighting={false}
            style={s.marked ? { color: c.mark, textDecorationLine: 'underline', textDecorationStyle: 'dotted' } : undefined}>
            {s.text}
          </Text>
        ),
      )}
    </Text>
  );
}

/** 3B dönen kart: ön yüz İngilizce, arka yüz Türkçe. */
export function FlipCard({
  front,
  back,
  style,
  hint = true,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  hint?: boolean;
}) {
  const c = useColors();
  const anim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);
  const [hf, setHf] = useState(0);
  const [hb, setHb] = useState(0);
  const flip = () => {
    Animated.spring(anim, { toValue: flipped ? 0 : 180, friction: 8, tension: 12, useNativeDriver: true }).start();
    setFlipped(!flipped);
  };
  const frontRot = anim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
  const backRot = anim.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });
  const face = [styles.face, { backgroundColor: c.card, borderColor: c.border }];
  return (
    <Pressable onPress={flip} accessibilityRole="button" accessibilityHint="Çevirmek için dokun" style={style}>
      <View style={{ height: Math.max(hf, hb) || undefined, minHeight: 44 }}>
        <Animated.View
          onLayout={(e) => setHf(e.nativeEvent.layout.height)}
          pointerEvents={flipped ? 'none' : 'auto'}
          style={[face, { transform: [{ perspective: 1000 }, { rotateY: frontRot }] }]}>
          {front}
          {hint ? (
            <T size={11} sub style={{ position: 'absolute', right: 8, bottom: 4 }}>
              ↻ TR
            </T>
          ) : null}
        </Animated.View>
        <Animated.View
          onLayout={(e) => setHb(e.nativeEvent.layout.height)}
          pointerEvents={flipped ? 'auto' : 'none'}
          style={[face, { backgroundColor: c.cardAlt, transform: [{ perspective: 1000 }, { rotateY: backRot }] }]}>
          {back}
          {hint ? (
            <T size={11} sub style={{ position: 'absolute', right: 8, bottom: 4 }}>
              ↻ EN
            </T>
          ) : null}
        </Animated.View>
      </View>
    </Pressable>
  );
}

/**
 * Türkçe destek seviyesine göre çift dilli metin:
 * 3 → EN + TR birlikte · 2 → flip kart (TR arkada) · 1 → yalnızca EN + kelime popup'ı · 0 → sınav modu (yalnızca EN).
 */
export function BiText({
  en,
  tr,
  size = 16,
  weight = '400',
  marked,
  card = true,
  levelOverride,
}: {
  en: string;
  tr: string;
  size?: number;
  weight?: '400' | '600' | '700';
  marked?: string[];
  card?: boolean;
  levelOverride?: 0 | 1 | 2 | 3;
}) {
  const c = useColors();
  const { trLevel } = useSettings();
  const level = levelOverride ?? trLevel;
  const enNode = <TappableText text={en} size={size} weight={weight} marked={level >= 1 ? marked : undefined} tappable={level >= 1} />;
  if (level === 2) {
    return (
      <FlipCard
        style={{ marginVertical: 4 }}
        front={enNode}
        back={
          <T size={size} color={c.tr}>
            {tr}
          </T>
        }
      />
    );
  }
  const body = (
    <>
      {enNode}
      {level === 3 ? (
        <T size={size - 2} color={c.tr} style={{ marginTop: 4 }}>
          {tr}
        </T>
      ) : null}
    </>
  );
  return card ? <View style={[styles.plain, { borderLeftColor: c.border }]}>{body}</View> : body;
}

const styles = StyleSheet.create({
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    paddingBottom: 18,
    backfaceVisibility: 'hidden',
  },
  plain: { paddingVertical: 4 },
});
