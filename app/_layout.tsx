import '@/global.css';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';


export default function RootLayout() {
  const [loaded, error] = useFonts({
    'LTKaraoke-Bold': require('@/assets/font/LTKaraoke-Bold.ttf'),
    'LTKaraoke-Light': require('@/assets/font/LTKaraoke-Light.ttf'),
    'LTKaraoke-Regular': require('@/assets/font/LTKaraoke-Regular.ttf'),
    'LTKaraoke-Medium': require('@/assets/font/LTKaraoke-Medium.ttf'),
    'LTKaraoke-Semibold': require('@/assets/fonts/LTKaraoke-Semibold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
