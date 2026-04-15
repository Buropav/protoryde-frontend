import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { useRouter } from 'expo-router';

export default function ClaimReceiptScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Receipt</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.receiptCard}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.payoutStatus}>Payout Successful</Text>
          <Text style={styles.payoutAmount}>₹250.00</Text>
          <Text style={styles.payoutDate}>Paid on 12 Apr 2026</Text>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValue}>TXN-987654321</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Trigger Verification</Text>
            <Text style={[styles.detailValue, { color: Colors.primary }]}>Verified via Dataminr</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank Account</Text>
            <Text style={styles.detailValue}>... 1234</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        <Pressable style={styles.downloadButton}>
          <Text style={styles.downloadText}>Download PDF</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  backButton: { width: 60 },
  backText: { fontSize: 18, color: Colors.primary, fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
  container: { flexGrow: 1, padding: 24 },
  receiptCard: { backgroundColor: Colors.cardFill, borderRadius: 16, borderColor: Colors.border, borderWidth: 1, padding: 24, alignItems: 'center' },
  successIcon: { fontSize: 48, marginBottom: 16 },
  payoutStatus: { fontSize: 18, color: Colors.success, fontWeight: 'bold', marginBottom: 8 },
  payoutAmount: { fontSize: 42, color: Colors.textPrimary, fontWeight: 'bold', marginBottom: 8 },
  payoutDate: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24 },
  divider: { width: '100%', height: 1, backgroundColor: Colors.borderLight, marginBottom: 24, borderStyle: 'dashed' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 8 },
  detailLabel: { fontSize: 14, color: Colors.textSecondary },
  detailValue: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600' },
  spacer: { flex: 1, minHeight: 40 },
  downloadButton: { backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  downloadText: { color: Colors.background, fontSize: 16, fontWeight: 'bold' },
});
