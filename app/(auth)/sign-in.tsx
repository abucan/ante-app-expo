import React, { useCallback } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Stack, router } from 'expo-router';
import { maybeCompleteAuthSession } from 'expo-web-browser';

import { useSSO } from '@clerk/clerk-expo';

import IonIcons from '@expo/vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

maybeCompleteAuthSession();

export default function Page() {
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(
    async (provider: 'oauth_google' | 'oauth_apple') => {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy: provider,
        });

        if (createdSessionId) {
          setActive!({
            navigate: async ({ session }) => {
              if (session?.currentTask) {
                console.log(session?.currentTask);
                router.push('/sign-in');
                return;
              }

              router.push('/(tasks)/daily-tasks');
            },
            session: createdSessionId,
          });
        }
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onPressEmail = useCallback(() => {
    router.push('/sign-in-with-email');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image source={require('@/assets/logo.png')} style={styles.logo} />
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Organize your tasks, habits and finances with ease</Text>
          <LottieView
            source={require('@/assets/lottie.json')}
            style={styles.lottie}
            loop={true}
            autoPlay
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.socialButtonGoogle]}
            onPress={() => onPress('oauth_google')}
          >
            <Image source={require('@/assets/icons/google.png')} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, styles.socialButtonApple]}
            onPress={() => onPress('oauth_apple')}
          >
            <IonIcons name="logo-apple" size={24} color={'white'} />
            <Text style={[styles.socialButtonText, styles.socialButtonTextApple]}>
              Continue with Apple
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, styles.socialButtonEmail]}
            onPress={onPressEmail}
          >
            <IonIcons name="mail" size={24} color={'white'} />
            <Text style={[styles.socialButtonText, styles.socialButtonTextEmail]}>
              Continue with Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.termsText}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  content: {
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  footer: {
    gap: 14,
    width: '100%',
  },
  logo: {
    alignSelf: 'center',
    height: 40,
    resizeMode: 'contain',
  },
  lottie: {
    aspectRatio: 1,
    width: '100%',
  },
  socialButton: {
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 48,
    borderWidth: StyleSheet.hairlineWidth,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: 14,
  },
  socialButtonApple: {
    backgroundColor: '#000000',
  },
  socialButtonEmail: {
    backgroundColor: '#DE483A',
  },
  socialButtonGoogle: {
    backgroundColor: '#F2F2F2',
  },
  socialButtonText: {
    fontFamily: 'BricolageGrotesqueBold',
    fontSize: 16,
  },
  socialButtonTextApple: {
    color: 'white',
  },
  socialButtonTextEmail: {
    color: 'white',
  },
  termsText: {
    color: 'gray',
    fontFamily: 'BricolageGrotesqueRegular',
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'BricolageGrotesqueSemiBold',
    fontSize: 26,
    textAlign: 'center',
  },
});
