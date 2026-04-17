import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "../../src/constants/colors";
import { RiderContext } from "../../src/context/RiderContext";
import { ApiError } from "../../src/services/apiClient";

export default function FirstPremiumPaymentScreen() {
  const router = useRouter();
  const { riderId, zone, setPolicyId, setBootstrapped } =
    useContext(RiderContext)!;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (!riderId || !zone) {
      Alert.alert(
        "Missing Info",
        "Rider ID or Zone is missing. Please go back.",
      );
      return;
    }

    setError("");
    setLoading(true);
    try {
      // Mock the policy activation for now
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network request
      
      setPolicyId("MOCK_POLICY_" + Math.floor(Math.random() * 1000));
      setBootstrapped(true);
      Alert.alert("Success", "Policy activated! Welcome to ProtoRyde.");
      router.replace("/(tabs)" as any);
    } catch (err) {
      console.error("Activation failed:", err);
      const message =
        err instanceof ApiError
          ? err.userMessage
          : "We couldn't activate your policy. Please try again.";
      setError(message);
      Alert.alert("Activation Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>First Premium Payment</Text>
        <Text style={styles.subtitle}>
          Pay your introductory premium to activate coverage instantly.
        </Text>

        <View style={styles.receiptCard}>
          <Text style={styles.premiumLabel}>Total to Pay</Text>
          <Text style={styles.premiumAmount}>₹49.00</Text>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Base Premium</Text>
            <Text style={styles.rowValue}>₹41.50</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Taxes (18%)</Text>
            <Text style={styles.rowValue}>₹7.50</Text>
          </View>
        </View>

        <Text style={styles.secureText}>
          🔒 Secure connection via UPI or Cards
        </Text>
        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.spacer} />

        <Pressable
          style={[styles.paymentButton, loading && { opacity: 0.7 }]}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.paymentText}>Pay ₹49.00 & Activate</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24, alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
    alignSelf: "flex-start",
  },
  receiptCard: {
    width: "100%",
    backgroundColor: Colors.cardFill,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  premiumLabel: { fontSize: 16, color: Colors.textSecondary, marginBottom: 8 },
  premiumAmount: {
    fontSize: 48,
    color: Colors.textPrimary,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    width: "100%",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  rowLabel: { fontSize: 16, color: Colors.textSecondary },
  rowValue: { fontSize: 16, color: Colors.textPrimary, fontWeight: "500" },
  secureText: { fontSize: 14, color: Colors.success, marginTop: 20 },
  errorText: {
    color: Colors.error,
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
  },
  spacer: { flex: 1, minHeight: 40 },
  paymentButton: {
    backgroundColor: Colors.payment, // Special payment CTA rule
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "auto",
  },
  paymentText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
});
