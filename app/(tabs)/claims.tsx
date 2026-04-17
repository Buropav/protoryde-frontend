import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../src/constants/colors";
import { useRouter } from "expo-router";
import { RiderContext } from "../../src/context/RiderContext";
import { claimsService } from "../../src/services/claimsService";
import { RiderClaimsResponse } from "../../src/types/api";

export default function ClaimsScreen() {
  const router = useRouter();
  const { riderId } = useContext(RiderContext)!;
  const [history, setHistory] = useState<RiderClaimsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    if (!riderId) {
      setHistory({ rider_id: "", count: 0, claims: [] });
      setLoading(false);
      return;
    }
    try {
      const res = await claimsService.getRiderClaims(riderId);
      setHistory(res);
    } catch (err) {
      console.error("Failed to fetch claims history:", err);
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

  const claims = history?.claims ?? [];
  const totalPaid = claims.reduce((acc, c) => acc + (c.payout_amount || 0), 0);

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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        <Text style={styles.headerTitle}>Claims History</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Paid Out</Text>
          <Text style={styles.summaryAmount}>
            ₹{totalPaid.toLocaleString("en-IN")}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Recent Claims</Text>

        {claims.length === 0 ? (
          <Text style={styles.emptyText}>No claims found yet.</Text>
        ) : (
          claims.map((claim) => (
            <Pressable
              key={claim.claim_id}
              style={styles.claimItem}
              onPress={() =>
                router.push({
                  pathname: "/claims-history/claim-receipt",
                  params: { id: claim.claim_id },
                } as any)
              }
            >
              <View style={styles.claimLeft}>
                <Text style={styles.claimType}>
                  {claim.trigger_type.replaceAll("_", " ")}
                </Text>
                <Text style={styles.claimDate}>
                  {claim.created_at
                    ? new Date(claim.created_at).toLocaleDateString("en-IN")
                    : "No date"}
                </Text>
              </View>
              <View style={styles.claimRight}>
                <Text style={styles.claimAmount}>
                  ₹{(claim.payout_amount || 0).toLocaleString("en-IN")}
                </Text>
                <Text style={styles.claimStatusApproved}>
                  {(claim.payout_amount || 0) > 0
                    ? "Paid"
                    : claim.payout_status || "Pending"}
                </Text>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24, paddingBottom: 100 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: Colors.primary,
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.background,
    opacity: 0.9,
    marginBottom: 8,
  },
  summaryAmount: { fontSize: 36, fontWeight: "bold", color: Colors.background },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  claimItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.cardFill,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  claimLeft: { justifyContent: "center" },
  claimType: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  claimDate: { fontSize: 14, color: Colors.textSecondary },
  claimRight: { alignItems: "flex-end", justifyContent: "center" },
  claimAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  claimStatusApproved: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.success,
    backgroundColor: "rgba(52, 199, 89, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  emptyText: { fontSize: 14, color: Colors.textMuted, fontStyle: "italic" },
});
