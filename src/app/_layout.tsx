import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WordPopupProvider } from '@/components/word-popup';
import { useColors, useIsDark } from '@/hooks/use-theme';
import { hydrate } from '@/state/store';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    hydrate().finally(() => {
      setReady(true);
      SplashScreen.hideAsync().catch(() => {});
    });
  }, []);
  const dark = useIsDark();
  const c = useColors();
  if (!ready) return null;
  const base = dark ? DarkTheme : DefaultTheme;
  return (
    <SafeAreaProvider>
      <ThemeProvider value={{ ...base, colors: { ...base.colors, background: c.bg, card: c.card, text: c.text, border: c.border, primary: c.primary } }}>
        <WordPopupProvider>
          <StatusBar style={dark ? 'light' : 'dark'} />
          <Stack screenOptions={{ headerBackTitle: 'Geri', headerTitleStyle: { fontSize: 16 } }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </WordPopupProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
