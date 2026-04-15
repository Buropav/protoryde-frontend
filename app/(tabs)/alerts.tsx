import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';

const MOCK_ALERTS = [
  { id: '1', title: 'Coverage Activated', description: 'Your policy is now active in the Downtown Zone.', time: '2h ago', isRead: false },
  { id: '2', title: 'Payment Successful', description: '₹49 was deducted for your daily premium.', time: '5h ago', isRead: true },
  { id: '3', title: 'Weather Warning', description: 'Expect moderate rainfall between 2 PM - 5 PM.', time: '1d ago', isRead: true },
];

export default function AlertsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Notifications</Text>
        
        {MOCK_ALERTS.map((alert) => (
          <View key={alert.id} style={[styles.alertItem, !alert.isRead && styles.unreadItem]}>
            <View style={styles.alertContent}>
              <View style={styles.titleRow}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                {!alert.isRead && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.alertDesc}>{alert.description}</Text>
              <Text style={styles.alertTime}>{alert.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24, paddingBottom: 100 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 24 },
  alertItem: {
    backgroundColor: Colors.cardFill,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  unreadItem: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  alertContent: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  alertTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  alertDesc: { fontSize: 14, color: Colors.textSecondary, marginBottom: 8, lineHeight: 20 },
  alertTime: { fontSize: 12, color: Colors.textMuted },
});
