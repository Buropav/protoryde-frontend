import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function FirstPremiumPaymentScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>First Premium Payment</Text>
        <Text style={styles.subtitle}>Pay your introductory premium to activate coverage instantly.</Text>
        
        <View style={styles.receiptCard}>
          <Text style={styles.premiumLabel}>Total to Pay</Text>
          <Text style={styles.premiumAmount}>₹49.00</Text>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Base Premium</Text>
            <Text style={styles.rowValue}>₹41.50</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Taxes (18%)</Text>
            <Text style={styles.rowValue}>₹7.50</Text>
          </View>
        </View>

        <Text style={styles.secureText}>🔒 Secure connection via UPI or Cards</Text>

        <View style={styles.spacer} />

        <Pressable 
          style={styles.paymentButton}
          onPress={() => router.push('/(tabs)/index' as any)}
        >
          <Text style={styles.paymentText}>Pay ₹49.00 & Activate</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 8, alignSelf: 'flex-start' },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginBottom: 32, alignSelf: 'flex-start' },
  receiptCard: { 
    width: '100%',
    backgroundColor: Colors.cardFill, 
    borderRadius: 16, 
    padding: 24, 
    borderWidth: 1, 
    borderColor: Colors.border,
    alignItems: 'center'
  },
  premiumLabel: { fontSize: 16, color: Colors.textSecondary, marginBottom: 8 },
  premiumAmount: { fontSize: 48, color: Colors.textPrimary, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: Colors.borderLight, width: '100%', marginVertical: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 12 },
  rowLabel: { fontSize: 16, color: Colors.textSecondary },
  rowValue: { fontSize: 16, color: Colors.textPrimary, fontWeight: '500' },
  secureText: { fontSize: 14, color: Colors.success, marginTop: 20 },
  spacer: { flex: 1, minHeight: 40 },
  paymentButton: {
    backgroundColor: Colors.payment, // Special payment CTA rule
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
  },
  paymentText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});
