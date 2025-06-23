import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="catalogue" />
      <Tabs.Screen name="club" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}