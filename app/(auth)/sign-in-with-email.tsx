import { useSignIn } from '@clerk/clerk-expo';
import IonIcons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInWithEmail() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const hiddenInputRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    setError,
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
      const errorMessage =
        err.errors?.[0]?.message || 'Invalid email or password';

      // Set error on password field for authentication failures
      setError('password', {
        type: 'manual',
        message: errorMessage,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        ref={hiddenInputRef}
        autoFocus
        editable
        style={styles.hiddenInput}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign in</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <IonIcons name='close' size={24} color='#000000' />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <View
                style={[
                  styles.inputContainer,
                  errors.email && styles.inputContainerError,
                ]}
              >
                <IonIcons
                  name='mail-outline'
                  size={20}
                  color={errors.email ? '#EF5350' : '#666666'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Email'
                  placeholderTextColor='#999999'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  autoComplete='email'
                  editable={!isSubmitting}
                />
              </View>
              {errors.email && (
                <Text style={styles.fieldError}>{errors.email.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <View
                style={[
                  styles.inputContainer,
                  errors.password && styles.inputContainerError,
                ]}
              >
                <IonIcons
                  name='lock-closed-outline'
                  size={20}
                  color={errors.password ? '#EF5350' : '#666666'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Password'
                  placeholderTextColor='#999999'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  autoCapitalize='none'
                  autoComplete='password'
                  editable={!isSubmitting}
                />
              </View>
              {errors.password && (
                <Text style={styles.fieldError}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color='#FFFFFF' />
          ) : (
            <Text style={styles.submitButtonText}>Sign in</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    opacity: 0.01,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },

  headerTitle: {
    fontSize: 20,
    fontFamily: 'BricolageGrotesqueBold',
    color: '#000000',
  },

  closeButton: {
    padding: 4,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    gap: 20,
  },

  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF5350',
  },

  errorText: {
    color: '#C62828',
    fontSize: 14,
    fontFamily: 'BricolageGrotesqueRegular',
  },
  fieldError: {
    color: '#EF5350',
    fontSize: 12,
    fontFamily: 'BricolageGrotesqueRegular',
    marginTop: 4,
    marginLeft: 4,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FAFAFA',
  },
  inputContainerError: {
    borderColor: '#EF5350',
    backgroundColor: '#FFF5F5',
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'BricolageGrotesqueRegular',
    color: '#000000',
    padding: 0,
  },

  submitButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'BricolageGrotesqueBold',
  },
});
