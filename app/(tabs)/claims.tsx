import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { useRouter } from 'expo-router';

export default function ClaimsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Claims History</Text>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Paid Out</Text>
          <Text style={styles.summaryAmount}>₹1,250</Text>
        </View>

        <Text style={styles.sectionTitle}>Recent Claims</Text>

        <Pressable 
          style={styles.claimItem}
          onPress={() => router.push('/claims-history/claim-receipt' as any)}
        >
          <View style={styles.claimLeft}>
            <Text style={styles.claimType}>Weather Delay</Text>
            <Text style={styles.claimDate}>Apr 12, 2026</Text>
          </View>
          <View style={styles.claimRight}>
            <Text style={styles.claimAmount}>₹250</Text>
            <Text style={styles.claimStatusApproved}>Approved</Text>
          </View>
        </Pressable>

        <Pressable style={styles.claimItem}>
          <View style={styles.claimLeft}>
            <Text style={styles.claimType}>Traffic Incident</Text>
            <Text style={styles.claimDate}>Mar 28, 2026</Text>
          </View>
          <View style={styles.claimRight}>
            <Text style={styles.claimAmount}>₹1,000</Text>
            <Text style={styles.claimStatusApproved}>Approved</Text>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24, paddingBottom: 100 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 24 },
  summaryCard: {
    backgroundColor: Colors.primary,
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  summaryLabel: { fontSize: 14, color: Colors.background, opacity: 0.9, marginBottom: 8 },
  summaryAmount: { fontSize: 36, fontWeight: 'bold', color: Colors.background },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 16 },
  claimItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardFill,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  claimLeft: { justifyContent: 'center' },
  claimType: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 4 },
  claimDate: { fontSize: 14, color: Colors.textSecondary },
  claimRight: { alignItems: 'flex-end', justifyContent: 'center' },
  claimAmount: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 4 },
  claimStatusApproved: { fontSize: 12, fontWeight: '600', color: Colors.success, backgroundColor: 'rgba(52, 199, 89, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
});
