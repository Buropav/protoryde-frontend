import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { useRouter } from 'expo-router';

export default function EarningsCalendarScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Earnings Calendar</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Protected Earnings (This Month)</Text>
          <Text style={styles.summaryAmount}>₹1,250</Text>
        </View>

        <Text style={styles.sectionTitle}>April Delivery Trends</Text>

        <View style={styles.calendarPlaceholder}>
          <Text style={styles.placeholderText}>[ Interactive Heatmap Calendar ]</Text>
          <Text style={styles.placeholderDesc}>Visual representation of active and claimed days</Text>
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
            <Text style={styles.legendLabel}>Active Cover</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.success }]} />
            <Text style={styles.legendLabel}>Claim Paid</Text>
          </View>
        </View>
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
  summaryBox: { backgroundColor: Colors.primary, padding: 24, borderRadius: 16, marginBottom: 32, alignItems: 'center' },
  summaryLabel: { fontSize: 14, color: Colors.background, opacity: 0.9, textAlign: 'center', marginBottom: 8 },
  summaryAmount: { fontSize: 36, fontWeight: 'bold', color: Colors.background, textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 16 },
  calendarPlaceholder: { height: 280, backgroundColor: Colors.cardFill, borderRadius: 16, borderColor: Colors.border, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  placeholderText: { fontSize: 16, color: Colors.textMuted, marginBottom: 8 },
  placeholderDesc: { fontSize: 12, color: Colors.textMuted },
  legendContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Colors.cardFill, padding: 16, borderRadius: 12, borderColor: Colors.borderLight, borderWidth: 1 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  legendLabel: { fontSize: 14, color: Colors.textSecondary },
});
