import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const [loaded] = useFonts({
    BricolageGrotesqueExtraLight: require('@/assets/fonts/BricolageGrotesque-ExtraLight.ttf'),
    BricolageGrotesqueLight: require('@/assets/fonts/BricolageGrotesque-Light.ttf'),
    BricolageGrotesqueRegular: require('@/assets/fonts/BricolageGrotesque-Regular.ttf'),
    BricolageGrotesqueMedium: require('@/assets/fonts/BricolageGrotesque-Medium.ttf'),
    BricolageGrotesqueSemiBold: require('@/assets/fonts/BricolageGrotesque-SemiBold.ttf'),
    BricolageGrotesqueBold: require('@/assets/fonts/BricolageGrotesque-Bold.ttf'),
    BricolageGrotesqueExtraBold: require('@/assets/fonts/BricolageGrotesque-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
