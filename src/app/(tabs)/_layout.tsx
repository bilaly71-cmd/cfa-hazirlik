import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { useColors } from '@/hooks/use-theme';

const icon = (glyph: string) => ({ focused }: { focused: boolean }) => (
  <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.55 }}>{glyph}</Text>
);

export default function TabLayout() {
  const c = useColors();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.sub,
        tabBarStyle: { backgroundColor: c.card, borderTopColor: c.border },
        headerStyle: { backgroundColor: c.card },
        headerTintColor: c.text,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Bugün', tabBarIcon: icon('🏠') }} />
      <Tabs.Screen name="study" options={{ title: 'Konular', tabBarIcon: icon('📘') }} />
      <Tabs.Screen name="practice" options={{ title: 'Soru', tabBarIcon: icon('✍️') }} />
      <Tabs.Screen name="words" options={{ title: 'Kelimeler', tabBarIcon: icon('🔤') }} />
      <Tabs.Screen name="more" options={{ title: 'Daha fazla', tabBarIcon: icon('☰') }} />
    </Tabs>
  );
}
