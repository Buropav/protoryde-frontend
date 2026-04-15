import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function PersonalDetailsKYCScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Personal Details & KYC</Text>
        <Text style={styles.subtitle}>Let's get to know you to prepare your coverage profile.</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholderTextColor={Colors.textMuted} placeholder="e.g. John Doe" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Aadhaar Number</Text>
          <TextInput style={styles.input} placeholderTextColor={Colors.textMuted} placeholder="0000 0000 0000" keyboardType="numeric" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PAN Number</Text>
          <TextInput style={styles.input} placeholderTextColor={Colors.textMuted} placeholder="ABCDE1234F" autoCapitalize="characters" />
        </View>

        <View style={styles.spacer} />

        <Pressable 
          style={styles.button}
          onPress={() => router.push('/onboarding/partner-profile-setup' as any)}
        >
          <Text style={styles.buttonText}>Save & Continue</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginBottom: 32 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: Colors.textSecondary, marginBottom: 8 },
  input: {
    backgroundColor: Colors.cardFill,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 16,
  },
  spacer: { flex: 1, minHeight: 40 },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: { color: Colors.background, fontSize: 18, fontWeight: 'bold' },
});
