import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../src/constants/colors";
import { useRouter } from "expo-router";
import { RiderContext } from "../../src/context/RiderContext";
import { policyService } from "../../src/services/policyService";
import { riderService } from "../../src/services/riderService";
import { weatherService } from "../../src/services/weatherService";
import { EarningsCalendar } from "../../src/components/EarningsCalendar";
import {
  CurrentPolicyResponse,
  RiderCalendarResponse,
  WeatherCurrentResponse,
} from "../../src/types/api";

export default function HomeScreen() {
  const router = useRouter();
  const { riderId, zone } = useContext(RiderContext)!;

  const [refreshing, setRefreshing] = useState(false);
  const [policy, setPolicy] = useState<CurrentPolicyResponse | null>(null);
  const [calendar, setCalendar] = useState<RiderCalendarResponse | null>(null);
  const [weather, setWeather] = useState<WeatherCurrentResponse | null>(null);

  const fetchData = async () => {
    if (!riderId) return;
    try {
      const [policyRes, calendarRes, weatherRes] = await Promise.all([
        policyService.getCurrentPolicy(riderId),
        riderService.getCalendar(riderId),
        weatherService.getCurrentWeather(zone),
      ]);
      setPolicy(policyRes);
      setCalendar(calendarRes);
      setWeather(weatherRes);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [riderId, zone]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const isTriggerActive =
    !!weather?.trigger_view &&
    Object.values(weather.trigger_view).some((t) => t.breached);
  const isPolicyActive = policy?.status?.toLowerCase() === "active";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Mission Control</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Coverage</Text>
            <Text
              style={[
                styles.statValue,
                isPolicyActive ? styles.statusActive : styles.statusInactive,
              ]}
            >
              {isPolicyActive ? "Protected" : "No Cover"}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Current Zone</Text>
            <Text style={styles.statValue}>{zone}</Text>
          </View>
        </View>

        {isTriggerActive && (
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>⚠️ Active Trigger Event</Text>
            <Text style={styles.alertText}>
              Extreme conditions detected in {zone}. Click below to confirm
              location and start check-in.
            </Text>
            <Pressable
              style={styles.actionButton}
              onPress={() => router.push("/trigger-flow/active-trigger" as any)}
            >
              <Text style={styles.actionButtonText}>Start Check-in</Text>
            </Pressable>
          </View>
        )}

        {calendar && <EarningsCalendar data={calendar.calendar} />}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Policy Activity</Text>
          {policy ? (
            <View style={styles.activityItem}>
              <Text style={styles.activityLabel}>Weekly Premium</Text>
              <Text style={styles.activityValue}>₹{policy.final_premium}</Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>No active policy found.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24, paddingBottom: 100 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 24, fontWeight: "bold", color: Colors.textPrimary },
  date: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  statsContainer: { flexDirection: "row", gap: 16, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.cardFill,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 8 },
  statValue: { fontSize: 18, fontWeight: "bold", color: Colors.textPrimary },
  statusActive: { color: Colors.success },
  statusInactive: { color: Colors.error },
  alertCard: {
    backgroundColor: "rgba(255, 149, 0, 0.1)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.alert,
    marginBottom: 24,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.alert,
    marginBottom: 8,
  },
  alertText: { fontSize: 14, color: Colors.textPrimary, marginBottom: 16 },
  actionButton: {
    backgroundColor: Colors.alert,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: { color: Colors.background, fontWeight: "bold" },
  section: { marginTop: 8 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  activityLabel: { fontSize: 16, color: Colors.textSecondary },
  activityValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  emptyText: { fontSize: 14, color: Colors.textMuted, fontStyle: "italic" },
});
