import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { useRouter } from 'expo-router';

export default function ActiveTriggerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Severe Weather Triggered</Text>
          <Text style={styles.alertSubtitle}>Payouts are actively processing.</Text>
        </View>

        <View style={styles.payoutStatusContainer}>
          <Text style={styles.statusLabel}>Trigger Type</Text>
          <Text style={styles.statusValue}>Rainfall {'>'} 15mm/hr</Text>

          <Text style={[styles.statusLabel, { marginTop: 16 }]}>Predicted Payout</Text>
          <Text style={styles.payoutAmount}>₹250</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.progressText}>Processing...</Text>
        </View>

        <Pressable 
          style={styles.actionButton}
          onPress={() => router.push('/trigger-flow/weather-radar' as any)}
        >
          <Text style={styles.actionButtonText}>View Weather Radar</Text>
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
  alertCard: { backgroundColor: 'rgba(255, 69, 58, 0.1)', padding: 24, borderRadius: 16, borderColor: Colors.alert, borderWidth: 1, marginBottom: 32, alignItems: 'center' },
  alertTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.alert, marginBottom: 8, textAlign: 'center' },
  alertSubtitle: { fontSize: 14, color: Colors.textPrimary, textAlign: 'center' },
  payoutStatusContainer: { backgroundColor: Colors.cardFill, padding: 24, borderRadius: 16, borderColor: Colors.border, borderWidth: 1, marginBottom: 32 },
  statusLabel: { fontSize: 14, color: Colors.textSecondary, marginBottom: 4 },
  statusValue: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary },
  payoutAmount: { fontSize: 42, fontWeight: 'bold', color: Colors.primary, marginTop: 4 },
  progressContainer: { height: 8, backgroundColor: Colors.borderLight, borderRadius: 4, marginTop: 24, overflow: 'hidden' },
  progressBar: { height: '100%', width: '60%', backgroundColor: Colors.primary, borderRadius: 4 },
  progressText: { fontSize: 12, color: Colors.textSecondary, marginTop: 8, textAlign: 'right' },
  actionButton: { backgroundColor: Colors.cardFill, paddingVertical: 16, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: Colors.primary },
  actionButtonText: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
});
