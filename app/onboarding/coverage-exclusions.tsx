import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function CoverageExclusionsScreen() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Coverage Exclusions</Text>
        <Text style={styles.subtitle}>Please review the following situations where coverage does not apply.</Text>
        
        <View style={styles.exclusionCard}>
          <Text style={styles.exclusionTitle}>1. Pre-existing Conditions</Text>
          <Text style={styles.exclusionText}>Any medical condition diagnosed before the policy start date.</Text>
        </View>

        <View style={styles.exclusionCard}>
          <Text style={styles.exclusionTitle}>2. Intoxication</Text>
          <Text style={styles.exclusionText}>Incidents occurring while under the influence of drugs or alcohol.</Text>
        </View>

        <View style={styles.exclusionCard}>
          <Text style={styles.exclusionTitle}>3. Unregistered Vehicles</Text>
          <Text style={styles.exclusionText}>Using a vehicle not registered on the platform at the time of delivery.</Text>
        </View>

        <View style={styles.spacer} />

        <Pressable style={styles.checkboxContainer} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxActive]} />
          <Text style={styles.checkboxLabel}>I acknowledge the exclusions above.</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, !agreed && styles.buttonDisabled]}
          disabled={!agreed}
          onPress={() => router.push('/onboarding/first-premium-payment')}
        >
          <Text style={styles.buttonText}>Acknowledge & Next</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginBottom: 24 },
  exclusionCard: { backgroundColor: Colors.cardFill, borderRadius: 8, padding: 16, marginBottom: 12 },
  exclusionTitle: { fontSize: 16, color: Colors.textPrimary, fontWeight: 'bold', marginBottom: 4 },
  exclusionText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  spacer: { flex: 1, minHeight: 20 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  checkbox: { width: 24, height: 24, borderRadius: 4, borderWidth: 2, borderColor: Colors.border, marginRight: 12 },
  checkboxActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkboxLabel: { fontSize: 14, color: Colors.textPrimary, flex: 1 },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonDisabled: { backgroundColor: Colors.border },
  buttonText: { color: Colors.background, fontSize: 18, fontWeight: 'bold' },
});
