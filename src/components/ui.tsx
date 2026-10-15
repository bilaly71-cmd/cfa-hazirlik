import { type ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaxContentWidth } from '@/constants/theme';
import { useColors, useFont } from '@/hooks/use-theme';

type TProps = TextProps & {
  size?: number;
  weight?: '400' | '500' | '600' | '700' | '800';
  color?: string;
  sub?: boolean;
  center?: boolean;
  style?: StyleProp<TextStyle>;
};

export function T({ size = 16, weight = '400', color, sub, center, style, ...rest }: TProps) {
  const c = useColors();
  const f = useFont();
  return (
    <Text
      {...rest}
      style={[
        { fontSize: f(size), lineHeight: Math.round(f(size) * 1.45), fontWeight: weight, color: color ?? (sub ? c.sub : c.text) },
        center && { textAlign: 'center' },
        style,
      ]}
    />
  );
}

export function Screen({ children, scroll = true, footer }: { children: ReactNode; scroll?: boolean; footer?: ReactNode }) {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const inner = <View style={styles.inner}>{children}</View>;
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      {scroll ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 32 + (footer ? 0 : insets.bottom) }} keyboardShouldPersistTaps="handled">
          {inner}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>{inner}</View>
      )}
      {footer ? (
        <View style={[styles.footer, { backgroundColor: c.card, borderTopColor: c.border, paddingBottom: 10 + insets.bottom }]}>
          <View style={{ width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' }}>{footer}</View>
        </View>
      ) : null}
    </View>
  );
}

export function Card({ children, style, onPress }: { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  const c = useColors();
  const body = <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }, style]}>{children}</View>;
  if (!onPress) return body;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })} accessibilityRole="button">
      {body}
    </Pressable>
  );
}

type BtnProps = Omit<PressableProps, 'children' | 'style'> & {
  title: string;
  kind?: 'primary' | 'secondary' | 'ghost' | 'good' | 'bad';
  small?: boolean;
  style?: StyleProp<ViewStyle>;
  icon?: string;
};

export function Button({ title, kind = 'primary', small, style, icon, disabled, ...rest }: BtnProps) {
  const c = useColors();
  const bg = { primary: c.primary, secondary: c.cardAlt, ghost: 'transparent', good: c.good, bad: c.bad }[kind];
  const fg = kind === 'primary' ? c.primaryText : kind === 'good' || kind === 'bad' ? '#fff' : c.text;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      {...rest}
      style={({ pressed }) => [
        styles.btn,
        small && styles.btnSmall,
        { backgroundColor: bg, opacity: disabled ? 0.45 : pressed ? 0.8 : 1, borderColor: kind === 'ghost' ? c.border : bg },
        style,
      ]}>
      <T size={small ? 14 : 16} weight="600" color={fg} center>
        {icon ? `${icon}  ` : ''}
        {title}
      </T>
    </Pressable>
  );
}

export function Chip({ label, color, bg, onPress, active }: { label: string; color?: string; bg?: string; onPress?: () => void; active?: boolean }) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.chip, { backgroundColor: active ? c.primary : bg ?? c.cardAlt, borderColor: active ? c.primary : c.border }]}>
      <T size={12} weight="600" color={active ? c.primaryText : color ?? c.sub}>
        {label}
      </T>
    </Pressable>
  );
}

export function Row({ children, gap = 8, style, wrap }: { children: ReactNode; gap?: number; style?: StyleProp<ViewStyle>; wrap?: boolean }) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center', gap, flexWrap: wrap ? 'wrap' : 'nowrap' }, style]}>{children}</View>;
}

export function Bar({ value, color, height = 8 }: { value: number; color?: string; height?: number }) {
  const c = useColors();
  return (
    <View style={{ height, borderRadius: height, backgroundColor: c.cardAlt, overflow: 'hidden' }}>
      <View style={{ width: `${Math.max(0, Math.min(100, value))}%`, height, backgroundColor: color ?? c.primary }} />
    </View>
  );
}

export function H({ children }: { children: ReactNode }) {
  return (
    <T size={13} weight="700" sub style={{ textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 18, marginBottom: 8 }}>
      {children}
    </T>
  );
}

export function Empty({ text }: { text: string }) {
  return (
    <Card>
      <T sub center>
        {text}
      </T>
    </Card>
  );
}

export const spkChip = (status?: 'known' | 'partial' | 'new') =>
  status === 'known' ? { label: 'SPK: biliyorsun', key: 'good' } : status === 'partial' ? { label: 'SPK: kısmen', key: 'warn' } : status === 'new' ? { label: 'Yeni konu', key: 'mark' } : null;

const styles = StyleSheet.create({
  inner: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: 16, paddingTop: 12 },
  card: { borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, padding: 14, marginBottom: 10 },
  btn: { borderRadius: 12, paddingVertical: 13, paddingHorizontal: 16, borderWidth: 1, minHeight: 48, justifyContent: 'center' },
  btnSmall: { paddingVertical: 7, paddingHorizontal: 12, minHeight: 36, borderRadius: 10 },
  chip: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, borderWidth: StyleSheet.hairlineWidth },
  footer: { borderTopWidth: StyleSheet.hairlineWidth, paddingHorizontal: 16, paddingTop: 10 },
});
