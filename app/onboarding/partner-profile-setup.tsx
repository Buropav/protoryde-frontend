import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function PartnerProfileSetupScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Partner Profile & Payout Setup</Text>
        <Text style={styles.subtitle}>Link your bank account to receive your payouts securely.</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bank Account Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Holder Name</Text>
            <Text style={styles.detailValue}>John Doe</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Number</Text>
            <Text style={styles.detailValue}>XXXX XXXX 1234</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>IFSC Code</Text>
            <Text style={styles.detailValue}>HDFC0000123</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        <Pressable 
          style={styles.button}
          onPress={() => router.push('/onboarding/zone-selection')}
        >
          <Text style={styles.buttonText}>Confirm Payout Details</Text>
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
  card: { backgroundColor: Colors.cardFill, borderRadius: 12, padding: 20, borderWidth: 1, borderColor: Colors.border },
  cardTitle: { fontSize: 18, color: Colors.textPrimary, fontWeight: 'bold', marginBottom: 16 },
  detailRow: { marginBottom: 12 },
  detailLabel: { fontSize: 14, color: Colors.textSecondary, marginBottom: 4 },
  detailValue: { fontSize: 16, color: Colors.textPrimary, fontWeight: '500' },
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
