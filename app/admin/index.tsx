import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { useRouter } from 'expo-router';
import { adminService } from '../../src/services/adminService';
import { AdminMetricsResponse } from '../../src/types/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<AdminMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getMetrics()
      .then(setMetrics)
      .catch(err => console.error('Admin metrics failed:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Platform Health</Text>
      
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Policies</Text>
          <Text style={styles.metricValue}>{metrics?.active_policies || 0}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Premiums</Text>
          <Text style={styles.metricValue}>₹{metrics?.total_premiums || 0}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Claims Paid</Text>
          <Text style={[styles.metricValue, { color: Colors.error }]}>₹{metrics?.total_claims_paid || 0}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Operations</Text>
      
      <Pressable style={styles.navCard} onPress={() => router.push('/admin/map' as any)}>
        <View>
          <Text style={styles.navTitle}>📍 Claims Map</Text>
          <Text style={styles.navDesc}>Visualize claim density across zones</Text>
        </View>
        <Text style={styles.navArrow}>→</Text>
      </Pressable>

      <Pressable style={styles.navCard} onPress={() => router.push('/admin/fraud' as any)}>
        <View>
          <Text style={styles.navTitle}>🔍 Fraud Audit</Text>
          <Text style={styles.navDesc}>Review flagged claims and ML outliers</Text>
        </View>
        <Text style={styles.navArrow}>→</Text>
      </Pressable>

      <Pressable style={[styles.navCard, { marginTop: 40, borderColor: Colors.error }]} onPress={() => router.replace('/(tabs)' as any)}>
        <Text style={[styles.navTitle, { color: Colors.error }]}>Exit Admin Mode</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, paddingBottom: 60 },
  centered: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary, marginTop: 32, marginBottom: 16 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { 
    backgroundColor: Colors.cardFill, 
    padding: 16, 
    borderRadius: 12, 
    width: '48%',
    borderWidth: 1,
    borderColor: Colors.border
  },
  metricLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 8 },
  metricValue: { fontSize: 20, fontWeight: 'bold', color: Colors.primary },
  navCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: Colors.cardFill,
    padding: 20, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12
  },
  navTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 4 },
  navDesc: { fontSize: 12, color: Colors.textSecondary },
  navArrow: { fontSize: 20, color: Colors.textMuted }
});
