import { useSSO } from '@clerk/clerk-expo';
import IonIcons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import LottieView from 'lottie-react-native';
import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
            session: createdSessionId,
            navigate: async ({ session }) => {
              if (session?.currentTask) {
                console.log(session?.currentTask);
                router.push('/sign-in');
                return;
              }

              router.push('/');
            },
          });
        }
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image source={require('@/assets/logo.png')} style={styles.logo} />
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Organize your tasks, habits and finances with ease
          </Text>
          <LottieView
            source={require('@/assets/lottie.json')}
            style={styles.lottie}
            loop={true}
            autoPlay
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: '#F2F2F2' }]}
            onPress={() => onPress('oauth_google')}
          >
            <Image source={require('@/assets/icons/google.png')} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: '#000000' }]}
            onPress={() => onPress('oauth_apple')}
          >
            <IonIcons name='logo-apple' size={24} color={'white'} />
            <Text style={[styles.socialButtonText, { color: 'white' }]}>
              Continue with Apple
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: '#DE483A' }]}
          >
            <IonIcons name='mail' size={24} color={'white'} />
            <Text style={[styles.socialButtonText, { color: 'white' }]}>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  logo: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
  },
  title: {
    fontSize: 26,
    fontFamily: 'BricolageGrotesqueSemiBold',
    textAlign: 'center',
  },
  lottie: {
    width: '100%',
    aspectRatio: 1,
  },
  footer: {
    width: '100%',
    gap: 14,
  },
  socialButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    gap: 10,
    paddingVertical: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontFamily: 'BricolageGrotesqueBold',
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'BricolageGrotesqueRegular',
    textAlign: 'center',
    color: 'gray',
  },
});
