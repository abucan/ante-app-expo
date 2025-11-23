import React, { useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SegmentedControl from 'react-native-segmented-control-2';

import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useSignIn, useSignUp } from '@clerk/clerk-expo';

import IonIcons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInWithEmail() {
  const { isLoaded, setActive, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, setActive: setActiveSignUp, signUp } = useSignUp();

  const [isSignIn, setIsSignIn] = useState(true);

  const hiddenInputRef = useRef<TextInput>(null);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    const t = setTimeout(() => {
      hiddenInputRef.current?.focus();
    }, 80);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    router.back();
  };

  const handleSignIn = async (data: SignInFormData) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive!({ session: result.createdSessionId });
        router.replace('/(tasks)/daily-tasks');
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || 'Invalid email or password';
      Alert.alert('Error', errorMessage);
    }
  };

  const handleSignUp = async (data: SignInFormData) => {
    if (!isSignUpLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActiveSignUp!({ session: result.createdSessionId });
        router.replace('/(tasks)/daily-tasks');
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || 'Invalid email or password';
      Alert.alert('Error', errorMessage);
    }
  };

  const onSubmit = async (data: SignInFormData) => {
    if (isSignIn) {
      await handleSignIn(data);
    } else {
      await handleSignUp(data);
    }
  };

  const options = ['Sign In', 'Sign Up'];
  const [selectedOption, setSelectedOption] = useState('Sign In');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TextInput ref={hiddenInputRef} autoFocus editable style={styles.hiddenInput} />

      <View style={styles.header}>
        <SegmentedControl
          tabs={options}
          value={options.indexOf(selectedOption)}
          onChange={(index: number) => {
            setSelectedOption(options[index]);
            setIsSignIn(index === 0 ? true : false);
          }}
          activeTextColor="#FFFFFF"
          textStyle={styles.segmentedControlText}
          style={styles.segmentedControl}
          tabStyle={styles.segmentedControlTab}
          selectedTabStyle={styles.segmentedControlSelectedTab}
        />
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <IonIcons name="close" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <View style={[styles.inputContainer, errors.email && styles.inputContainerError]}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999999"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                  editable={!isSubmitting}
                />
              </View>
              {errors.email && <Text style={styles.fieldError}>{errors.email.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <View style={[styles.inputContainer, errors.password && styles.inputContainerError]}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999999"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                  editable={!isSubmitting}
                />
                <TouchableOpacity onPress={() => console.log('show password')}>
                  <IonIcons name="eye-outline" size={20} color="#666666" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>{isSignIn ? 'Sign in' : 'Sign up'}</Text>
          )}
        </TouchableOpacity>
        {isSignIn && (
          <TouchableOpacity onPress={() => console.log('forgot password')}>
            <Text style={styles.linkText}>Forgot your password?</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 48,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    gap: 26,
  },
  content: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 24,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderColor: '#EF5350',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  errorText: {
    color: '#C62828',
    fontFamily: 'BricolageGrotesqueRegular',
    fontSize: 14,
  },
  fieldError: {
    color: '#EF5350',
    fontFamily: 'BricolageGrotesqueRegular',
    fontSize: 12,
    marginLeft: 4,
    marginTop: 4,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row',

    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerTitle: {
    color: '#000000',
    fontFamily: 'BricolageGrotesqueBold',
    fontSize: 20,
  },
  hiddenInput: {
    height: 1,
    left: 0,
    opacity: 0.01,
    position: 'absolute',
    top: 0,
    width: 1,
  },
  input: {
    color: '#000000',
    flex: 1,
    fontFamily: 'BricolageGrotesqueRegular',
    fontSize: 16,
    padding: 0,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderColor: '#E5E5E5',
    borderRadius: 48,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputContainerError: {
    backgroundColor: '#FFF5F5',
    borderColor: '#EF5350',
  },
  inputIcon: {
    marginRight: 12,
  },
  linkText: {
    color: '#666666',
    fontFamily: 'BricolageGrotesqueRegular',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  segmentedControl: {
    borderRadius: 48,
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  segmentedControlSelectedTab: {
    backgroundColor: '#DE483A',
    borderRadius: 48,
    color: '#FFFFFF',
    shadowOpacity: 0,
  },
  segmentedControlTab: {
    borderRadius: 48,
    height: 50,
  },
  segmentedControlText: {
    fontFamily: 'BricolageGrotesqueBold',
  },
  segmentedControlWrapper: {},
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#DE483A',
    borderColor: 'gray',
    borderRadius: 48,
    borderWidth: StyleSheet.hairlineWidth,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: 14,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontFamily: 'BricolageGrotesqueBold',
    fontSize: 16,
  },
});
