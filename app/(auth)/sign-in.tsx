import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        source={require('@/assets/logo.png')}
        style={{ width: 240, height: 40, marginTop: 10 }}
        placeholder={'Loading...'}
        contentFit='contain'
        transition={1000}
      />
      <View style={styles.content}>
        <Text style={styles.title}>All in One Productivity App</Text>
        <Image
          source={require('@/assets/undraw.svg')}
          style={{ width: 300, height: 300 }}
          placeholder={'Loading...'}
          contentFit='contain'
          transition={1000}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('@/assets/icons/google.svg')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('@/assets/icons/apple.svg')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    gap: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  footer: {
    gap: 24,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  buttonIcon: {
    width: 24,
    aspectRatio: 1,
    objectFit: 'contain',
  },
});
