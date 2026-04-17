import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../src/constants/colors";
import { adminService } from "../../src/services/adminService";
import { AdminFraudFlagsResponse } from "../../src/types/api";

export default function FraudReview() {
  const [data, setData] = useState<AdminFraudFlagsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getFraudFlags()
      .then(setData)
      .catch((err) => console.error("Fraud flags failed:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.claimId}>{item.claim_id}</Text>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.zoneText}>
        📍 {item.zone} | {item.trigger_type}
      </Text>

      <View style={styles.layerContainer}>
        {item.fraud_layers.map((layer: any, idx: number) => (
          <View
            key={idx}
            style={[
              styles.layerBadge,
              layer.passed ? styles.passed : styles.failed,
            ]}
          >
            <Text style={styles.layerText}>{layer.layer}</Text>
            <Text style={styles.layerStatus}>{layer.passed ? "✓" : "✗"}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.flags || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.claim_id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No suspicious claims detected in this cycle.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 24 },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: Colors.cardFill,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  claimId: { color: Colors.primary, fontWeight: "bold" },
  date: { color: Colors.textSecondary, fontSize: 12 },
  zoneText: { color: Colors.textPrimary, fontSize: 14, marginBottom: 12 },
  layerContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  layerBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  passed: { backgroundColor: "rgba(0, 200, 83, 0.1)" },
  failed: { backgroundColor: "rgba(255, 59, 48, 0.1)" },
  layerText: { color: Colors.textSecondary, fontSize: 10, marginRight: 4 },
  layerStatus: { fontSize: 12, fontWeight: "bold" },
  emptyText: {
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: 40,
    fontStyle: "italic",
  },
});
