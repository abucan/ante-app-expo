import React, { useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SegmentedControl from 'react-native-segmented-control-2';

import { router } from 'expo-router';

import { useSignIn } from '@clerk/clerk-expo';

import IonIcons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const signInSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInWithEmail() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const hiddenInputRef = useRef<TextInput>(null);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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

  const onSubmit = async (data: SignInFormData) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive!({ session: result.createdSessionId });
        router.replace('/');
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || 'Invalid email or password';

      // Set error on password field for authentication failures
      setError('password', {
        type: 'manual',
        message: errorMessage,
      });
    }
  };

  const options = ['Light', 'Standard', 'Pro'];
  const [selectedOption, setSelectedOption] = useState('Standard');

  return (
    <SafeAreaView style={styles.container}>
      <TextInput ref={hiddenInputRef} autoFocus editable style={styles.hiddenInput} />

      <View style={styles.header}>
        <View style={styles.segmentedControlWrapper}>
          <SegmentedControl
            tabs={['One', 'Two']}
            value={options.indexOf(selectedOption)}
            onChange={(index: number) => {
              setSelectedOption(options[index]);
            }}
            style={{
              borderRadius: 48,
              alignSelf: 'center',
            }}
            tabStyle={{
              height: 50,
              borderRadius: 48,
            }}
            selectedTabStyle={{
              borderRadius: 48,
              backgroundColor: '#DE483A',
            }}
          />
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <IonIcons name="close" size={24} color="#000000" style={{ padding: 8 }} />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>Sign in to your account</Text>
      <View style={styles.content}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onBlur, onChange } }) => (
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
          render={({ field: { value, onBlur, onChange } }) => (
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
              {errors.password && <Text style={styles.fieldError}>{errors.password.message}</Text>}
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
            <Text style={styles.submitButtonText}>Sign in</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('forgot password')}>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputIcon: {
    marginRight: 12,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  segmentedControlWrapper: {
    flex: 1,
    flexShrink: 1,
  },
  content: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    gap: 24,
    backgroundColor: '#FFFFFF',
  },
  inputContainerError: {
    borderColor: '#EF5350',
    backgroundColor: '#FFF5F5',
  },
  headerTitle: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'BricolageGrotesqueBold',
  },
  errorText: {
    fontSize: 14,
    color: '#C62828',
    fontFamily: 'BricolageGrotesqueRegular',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'BricolageGrotesqueBold',
  },
  hiddenInput: {
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    opacity: 0.01,
    position: 'absolute',
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'BricolageGrotesqueRegular',
  },
  errorContainer: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#EF5350',
    backgroundColor: '#FFEBEE',
  },
  fieldError: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    color: '#EF5350',
    fontFamily: 'BricolageGrotesqueRegular',
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
  linkText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'BricolageGrotesqueRegular',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 48,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderColor: '#E5E5E5',
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#E5E5E5',
    justifyContent: 'space-between',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  submitButton: {
    gap: 10,
    display: 'flex',
    borderRadius: 48,
    borderColor: 'gray',
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#DE483A',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
