import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function PhoneVerificationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Phone Verification</Text>
        <Text style={styles.subtitle}>Enter your mobile number to receive an active code.</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput 
            style={styles.input}
            placeholder="000 000 0000"
            placeholderTextColor={Colors.textMuted}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.spacer} />

        <Pressable 
          style={styles.button}
          onPress={() => router.push('/(auth)/otp-verification' as any)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginBottom: 32 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardFill,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    height: 56,
  },
  prefix: { fontSize: 18, color: Colors.textPrimary, marginRight: 12, fontWeight: '600' },
  input: { flex: 1, color: Colors.textPrimary, fontSize: 18 },
  spacer: { flex: 1 },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: Colors.background, fontSize: 18, fontWeight: 'bold' },
});
