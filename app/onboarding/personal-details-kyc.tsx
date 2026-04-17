import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../../src/constants/colors';

const { width } = Dimensions.get('window');

export default function PersonalDetailsKYCScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('Pranav');
  const [mobile, setMobile] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [dob, setDob] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header / Nav */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <View style={styles.progressContainer}>
            <View style={[styles.progressSegment, styles.progressActive]} />
            <View style={styles.progressSegment} />
            <View style={styles.progressSegment} />
            <View style={styles.progressSegment} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Set Up Your Account</Text>
          <Text style={styles.subtitle}>We need this to verify your Delhivery partner status</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>FULL NAME</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.input} 
                placeholderTextColor={Colors.textMuted} 
                placeholder="e.g. John Doe"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>MOBILE NUMBER</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.countryCodeContainer}>
                <Text style={styles.countryCode}>+91</Text>
              </View>
              <TextInput 
                style={styles.flexInput} 
                placeholderTextColor={Colors.textMuted} 
                placeholder="Enter number" 
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>AADHAAR NUMBER (LAST 4 DIGITS)</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.flexInput} 
                placeholderTextColor={Colors.textMuted} 
                placeholder="XXXX XXXX 1234" 
                keyboardType="numeric"
                maxLength={4}
                value={aadhaar}
                onChangeText={setAadhaar}
              />
              <View style={styles.iconContainer}>
                <Feather name="lock" size={20} color={Colors.primary} />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>DATE OF BIRTH</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.flexInput} 
                placeholderTextColor={Colors.textMuted} 
                placeholder="DD / MM / YYYY" 
                value={dob}
                onChangeText={setDob}
              />
              <View style={styles.iconContainer}>
                <Feather name="calendar" size={20} color={Colors.textMuted} />
              </View>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={24} color={Colors.primary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Your Aadhaar is encrypted and never stored. Used only for one-time KYC verification.
            </Text>
          </View>

          <View style={styles.spacer} />

          <Pressable 
            style={styles.button}
            onPress={() => router.push('/onboarding/partner-profile-setup' as any)}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>

          <View style={styles.secureFooter}>
            <Feather name="lock" size={12} color={Colors.textMuted} style={styles.secureIcon} />
            <Text style={styles.secureText}>256-bit encrypted. Your data is safe.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
  },
  progressActive: {
    backgroundColor: Colors.primary,
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
    paddingBottom: 24,
  },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: Colors.textSecondary, marginBottom: 32, lineHeight: 22 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 12, color: Colors.textSecondary, marginBottom: 8, letterSpacing: 1, fontWeight: '600' },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.cardFill,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    fontSize: 16,
    height: '100%',
  },
  flexInput: {
    flex: 1,
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    fontSize: 16,
    height: '100%',
  },
  countryCodeContainer: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  countryCode: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: Colors.cardFill,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 12,
    marginTop: -2,
  },
  infoText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  spacer: { flex: 1, minHeight: 40 },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: Colors.background, fontSize: 16, fontWeight: '700' },
  secureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureIcon: {
    marginRight: 6,
  },
  secureText: {
    color: Colors.textMuted,
    fontSize: 12,
  },
});
