import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../src/constants/colors";
import { RiderContext } from "../../src/context/RiderContext";
import {
  notificationService,
  Notification,
} from "../../src/services/notificationService";

const TABS = ["All", "Weather", "Claims", "Payments"];

export default function AlertsScreen() {
  const { riderId } = useContext(RiderContext)!;
  const [alerts, setAlerts] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const fetchData = async () => {
    if (!riderId) {
      setAlerts([]);
      setLoading(false);
      return;
    }
    try {
      const res = await notificationService.getNotifications(riderId);
      setAlerts(
        res.notifications.map((item) => ({
          ...item,
          isRead: item.isRead ?? true,
        })),
      );
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
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

  const filteredAlerts = alerts.filter((a) => {
    if (activeTab === "All") return true;
    if (activeTab === "Weather") return a.title.toLowerCase().includes("rain") || a.title.toLowerCase().includes("clear");
    if (activeTab === "Claims") return a.title.toLowerCase().includes("fraud");
    if (activeTab === "Payments") return a.title.toLowerCase().includes("credit") || a.title.toLowerCase().includes("deducted") || a.title.toLowerCase().includes("payout");
    return true;
  });

  const getCardStyle = (title: string, isRead: boolean) => {
    const lower = title.toLowerCase();
    let icon, iconBg;
    if (lower.includes('rain')) {
      icon = <Ionicons name="thunderstorm" size={24} color="#facc15" />;
      iconBg = '#332714';
    } else if (lower.includes('credited') || lower.includes('claim') || lower.includes('payout')) {
      icon = <Ionicons name="shield-checkmark" size={24} color="#4ade80" />;
      iconBg = '#102a24';
    } else if (lower.includes('premium')) {
      icon = <Ionicons name="card" size={24} color="#34d399" />;
      iconBg = '#1e293b';
    } else if (lower.includes('fraud')) {
      icon = <Ionicons name="document-text" size={24} color="#94a3b8" />;
      iconBg = '#1e293b';
    } else if (lower.includes('clear')) {
      icon = <Ionicons name="sunny" size={24} color="#94a3b8" />;
      iconBg = '#1e293b';
    } else {
      icon = <Ionicons name="notifications" size={24} color="#94a3b8" />;
      iconBg = '#1e293b';
    }
    return { icon, iconBg };
  };

  const getRelativeTime = (timeStr: string) => {
    const now = new Date();
    const alertTime = new Date(timeStr);
    const diffMs = now.getTime() - alertTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 60) return `${Math.max(1, diffMins)}M AGO`;
    if (diffHrs < 24) return `${diffHrs}H AGO`;
    return alertTime.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabContainer}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        {filteredAlerts.length === 0 ? (
           <Text style={styles.emptyText}>No notifications here.</Text>
        ) : (
          filteredAlerts.map((alert) => {
            const { icon, iconBg } = getCardStyle(alert.title, !alert.isRead);
            return (
              <View key={alert.id} style={styles.alertItem}>
                {!alert.isRead && <View style={styles.unreadBorder} />}
                
                <View style={styles.alertRow}>
                  <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
                    {icon}
                    {!alert.isRead && <View style={styles.unreadDotIcon} />}
                  </View>

                  <View style={styles.alertContent}>
                    <View style={styles.titleRow}>
                      <Text style={styles.alertTitle}>{alert.title}</Text>
                      <Text style={styles.alertTime}>{getRelativeTime(alert.time)}</Text>
                    </View>
                    <Text style={styles.alertDesc}>{alert.description}</Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: '#0a101d',
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: { flex: 1, backgroundColor: '#0a101d' },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#00e5a0',
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  tabButtonActive: {
    backgroundColor: '#00e5a0',
    borderColor: '#00e5a0',
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: '#94a3b8',
  },
  tabTextActive: {
    color: '#000000',
  },
  container: { paddingHorizontal: 16, paddingBottom: 100 },
  emptyText: { color: Colors.textMuted, textAlign: "center", marginTop: 40 },
  alertItem: {
    backgroundColor: '#141e2e',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    overflow: 'hidden',
    position: 'relative',
  },
  unreadBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#00e5a0',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  alertRow: {
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  unreadDotIcon: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00e5a0',
  },
  alertContent: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  alertTitle: { fontSize: 15, fontWeight: "bold", color: "#f8fafc" },
  alertDesc: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 20,
  },
  alertTime: { fontSize: 11, color: "#64748b", fontWeight: "bold" },
});
