import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../src/constants/colors";
import { useRouter } from "expo-router";

export default function EnhancedCoverageUpsellModal() {
  const router = useRouter();

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />
      <View style={styles.sheet}>
        <View style={styles.dragHandle} />

        <View style={styles.badge}>
          <Text style={styles.badgeText}>RECOMMENDED</Text>
        </View>
        <Text style={styles.title}>Enhanced Income Protection</Text>
        <Text style={styles.subtitle}>
          Upgrade your tier to double your payouts and cover minor traffic
          delays.
        </Text>

        <View style={styles.featureList}>
          <Text style={styles.featureItem}>✓ ₹500 Payout per trigger</Text>
          <Text style={styles.featureItem}>
            ✓ Minor traffic incident coverage
          </Text>
          <Text style={styles.featureItem}>✓ Reduced verification time</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Additional Premium</Text>
          <Text style={styles.priceValue}>+₹25 / day</Text>
        </View>

        <Pressable style={styles.upgradeButton} onPress={() => router.back()}>
          <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
        </Pressable>
        <Pressable style={styles.dismissButton} onPress={() => router.back()}>
          <Text style={styles.dismissButtonText}>Maybe Later</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 22, 40, 0.6)",
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: Colors.cardFill,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 400,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
  },
  badge: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.background,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  featureList: {
    backgroundColor: "rgba(0, 212, 170, 0.05)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 170, 0.2)",
    marginBottom: 24,
  },
  featureItem: { fontSize: 14, color: Colors.textPrimary, marginBottom: 8 },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  priceLabel: { fontSize: 16, color: Colors.textSecondary },
  priceValue: { fontSize: 18, color: Colors.textPrimary, fontWeight: "bold" },
  upgradeButton: {
    backgroundColor: Colors.payment,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  upgradeButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  dismissButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  dismissButtonText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
