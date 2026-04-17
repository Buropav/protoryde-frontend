import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { RiderContext } from '../../src/context/RiderContext';
import { notificationService, Notification } from '../../src/services/notificationService';

export default function AlertsScreen() {
  const { riderId } = useContext(RiderContext)!;
  const [alerts, setAlerts] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    if (!riderId) {
      setAlerts([]);
      setLoading(false);
      return;
    }
    try {
      const res = await notificationService.getNotifications(riderId);
      setAlerts(res.notifications.map((item) => ({ ...item, isRead: item.isRead ?? true })));
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [riderId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        <Text style={styles.headerTitle}>Notifications</Text>

        {alerts.map((alert) => (
          <View key={alert.id} style={[styles.alertItem, !alert.isRead && styles.unreadItem]}>
            <View style={styles.alertContent}>
              <View style={styles.titleRow}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                {!alert.isRead && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.alertDesc}>{alert.description}</Text>
              <Text style={styles.alertTime}>
                {new Date(alert.time).toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' },
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
