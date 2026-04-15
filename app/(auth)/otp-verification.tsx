import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function OTPVerificationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>We've sent a 6-digit code to your mobile number.</Text>
        
        <View style={styles.otpContainer}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <TextInput 
              key={i}
              style={styles.otpBox}
              maxLength={1}
              keyboardType="number-pad"
              textAlign="center"
              placeholderTextColor={Colors.textMuted}
            />
          ))}
        </View>

        <View style={styles.spacer} />

        <Pressable 
          style={styles.button}
          onPress={() => router.push('/onboarding/personal-details-kyc' as any)}
        >
          <Text style={styles.buttonText}>Verify & Next</Text>
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
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  otpBox: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.cardFill,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
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
