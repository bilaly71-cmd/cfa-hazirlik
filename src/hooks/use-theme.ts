import { Palette, type Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSettings } from '@/state/store';

export function useIsDark() {
  const system = useColorScheme();
  const { theme } = useSettings();
  return theme === 'system' ? system === 'dark' : theme === 'dark';
}

export function useColors(): Colors {
  return useIsDark() ? Palette.dark : Palette.light;
}

/** Yazı boyutunu kullanıcı ölçeğiyle çarpar. */
export function useFont() {
  const { fontScale } = useSettings();
  return (size: number) => Math.round(size * fontScale);
}
