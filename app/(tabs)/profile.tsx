import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../src/constants/colors";
import { useRouter } from "expo-router";
import { RiderContext } from "../../src/context/RiderContext";
import { policyService } from "../../src/services/policyService";
import { CurrentPolicyResponse } from "../../src/types/api";

export default function ProfileScreen() {
  const router = useRouter();
  const {
    riderId,
    riderName,
    phoneNumber,
    policyId,
    setPolicyId,
    setRiderInfo,
    setBootstrapped,
  } = useContext(RiderContext)!;

  const [policy, setPolicy] = useState<CurrentPolicyResponse | null>(null);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    if (riderId) {
      policyService
        .getCurrentPolicy(riderId)
        .then(setPolicy)
        .catch((err) => console.error("Policy fetch skipped or failed:", err));
    }
  }, [riderId, policyId]);

  const handleUpgrade = async () => {
    const targetPolicyId = policyId || policy?.policy_id;
    if (!targetPolicyId) return;

    Alert.alert(
      "Upgrade Coverage",
      "Upgrade to ENHANCED tier for ₹25 extra/week? This increases your payout cap to ₹2,800.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm Upgrade",
          onPress: async () => {
            setUpgrading(true);
            try {
              const res = await policyService.upgradePolicy(targetPolicyId);
              setPolicyId(res.policy_id);
              Alert.alert(
                "Success",
                "Your coverage has been upgraded to ENHANCED!",
              );
            } catch (err) {
              Alert.alert("Error", "Upgrade failed. Please try again.");
            } finally {
              setUpgrading(false);
            }
          },
        },
      ],
    );
  };

  const isEnhanced = policy?.coverage_cap === 2800;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {riderName ? riderName.substring(0, 2).toUpperCase() : "RY"}
            </Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{riderName || "Rider"}</Text>
            <Text style={styles.phone}>{phoneNumber || "No phone set"}</Text>
          </View>
        </View>

        <View style={[styles.card, styles.tierCard]}>
          <Text style={styles.cardLabel}>CURRENT TIER</Text>
          <View style={styles.tierRow}>
            <Text
              style={[
                styles.tierValue,
                isEnhanced
                  ? { color: Colors.primary }
                  : { color: Colors.textPrimary },
              ]}
            >
              {isEnhanced ? "ENHANCED" : "STANDARD"}
            </Text>
            {!isEnhanced && (
              <Pressable
                style={styles.upgradeButton}
                onPress={handleUpgrade}
                disabled={upgrading}
              >
                {upgrading ? (
                  <ActivityIndicator size="small" color={Colors.background} />
                ) : (
                  <Text style={styles.upgradeText}>UPGRADE</Text>
                )}
              </Pressable>
            )}
          </View>
          <Text style={styles.tierLimit}>
            Payout Cap: ₹{policy?.coverage_cap || 2300}
          </Text>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Account</Text>
          <Pressable
            style={styles.menuItem}
            onPress={() => router.push("/account/policy-document" as any)}
          >
            <Text style={styles.menuText}>Policy Document & Definitions</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable
            style={styles.menuItem}
            onPress={() => router.push("/admin" as any)}
          >
            <Text style={[styles.menuText, { color: Colors.alert }]}>
              Switch to Admin Mode
            </Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={() => {
            setRiderInfo({
              riderId: null,
              riderName: "",
              phoneNumber: "",
              zone: "HSR Layout",
              upiId: "",
            });
            setPolicyId(null);
            setBootstrapped(false);
            router.replace("/(auth)/phone-verification" as any);
          }}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24, paddingBottom: 100 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 32 },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.cardFill,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatarText: { fontSize: 24, fontWeight: "bold", color: Colors.primary },
  headerInfo: { flex: 1 },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  phone: { fontSize: 14, color: Colors.textSecondary },
  card: {
    backgroundColor: Colors.cardFill,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  tierCard: { borderColor: Colors.primary },
  cardLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: "600",
  },
  tierRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  tierValue: { fontSize: 28, fontWeight: "bold" },
  tierLimit: { fontSize: 14, color: Colors.textMuted },
  upgradeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  upgradeText: { color: Colors.background, fontWeight: "bold", fontSize: 12 },
  menuSection: { marginBottom: 32 },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuText: { fontSize: 16, color: Colors.textPrimary },
  menuArrow: { fontSize: 20, color: Colors.textMuted },
  logoutButton: { marginTop: "auto", alignSelf: "center", paddingVertical: 16 },
  logoutText: { color: Colors.error, fontSize: 16, fontWeight: "bold" },
});
