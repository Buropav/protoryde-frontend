import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Mission Control</Text>
          <Text style={styles.date}>Mon, 16 Apr</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Coverage</Text>
            <Text style={styles.statValueActive}>Protected</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Current Zone</Text>
            <Text style={styles.statValue}>Downtown</Text>
          </View>
        </View>

        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>🌧 Severe Weather Alert</Text>
          <Text style={styles.alertText}>Heavy rainfall detected in your zone. Trigger active.</Text>
          <Pressable style={styles.actionButton} onPress={() => router.push('/trigger-flow/active-trigger' as any)}>
            <Text style={styles.actionButtonText}>View Details</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>Premium Deducted</Text>
            <Text style={styles.activityValue}>-₹49</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24, paddingBottom: 100 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary },
  date: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  statsContainer: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: Colors.cardFill, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: Colors.border },
  statLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 8 },
  statValueActive: { fontSize: 18, fontWeight: 'bold', color: Colors.success },
  statValue: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
  alertCard: { backgroundColor: 'rgba(255, 69, 58, 0.1)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: Colors.alert, marginBottom: 24 },
  alertTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.alert, marginBottom: 8 },
  alertText: { fontSize: 14, color: Colors.textPrimary, marginBottom: 16 },
  actionButton: { backgroundColor: Colors.alert, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  actionButtonText: { color: Colors.background, fontWeight: 'bold' },
  section: { marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 16 },
  activityItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  activityLabel: { fontSize: 16, color: Colors.textSecondary },
  activityValue: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary },
});
