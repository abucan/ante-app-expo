import React, { useEffect, useRef } from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput ref={hiddenInputRef} autoFocus editable style={styles.hiddenInput} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign in</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <IonIcons name="close" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onBlur, onChange } }) => (
            <View>
              <View style={[styles.inputContainer, errors.email && styles.inputContainerError]}>
                <IonIcons
                  name="mail-outline"
                  size={20}
                  color={errors.email ? '#EF5350' : '#666666'}
                  style={styles.inputIcon}
                />
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
                <IonIcons
                  name="lock-closed-outline"
                  size={20}
                  color={errors.password ? '#EF5350' : '#666666'}
                  style={styles.inputIcon}
                />
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    padding: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputContainerError: {
    borderColor: '#EF5350',
    backgroundColor: '#FFF5F5',
  },
  content: {
    flex: 1,
    gap: 20,
    paddingTop: 32,
    paddingHorizontal: 24,
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
  submitButton: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderColor: '#E5E5E5',
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    borderBottomColor: '#E5E5E5',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
