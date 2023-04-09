import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { RecoilRoot } from 'recoil';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    'Karla-Regular': require('../assets/fonts/Karla-Regular.ttf'),
    'MarkaziText-Regular': require('../assets/fonts/MarkaziText-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <Stack onLayout={onLayoutRootView}>
        <Stack.Screen name='onboarding' options={{ headerShown: false }} />
        <Stack.Screen name='profile' />
      </Stack>
    </RecoilRoot>
  );
};

export default Layout;
