import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../src/constants/colors";
import { useRouter, useLocalSearchParams } from "expo-router";
import { RiderContext } from "../../src/context/RiderContext";
import { claimsService } from "../../src/services/claimsService";
import { ClaimItem } from "../../src/types/api";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function ClaimReceiptScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { riderId } = useContext(RiderContext)!;
  const [claim, setClaim] = useState<ClaimItem | null>(null);
  const [loading, setLoading] = useState(true);

  const generateAndSharePDF = async () => {
    try {
      if (!claim) return;
      const html = `
        <html>
          <head>
            <style>
              body { font-family: 'Helvetica', sans-serif; padding: 20px; color: #333; }
              h1 { color: #007aff; }
              .receipt-container { border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
              .detail { margin-bottom: 10px; }
              .label { font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>Claim Receipt</h1>
            <div class="receipt-container">
              <div class="detail"><span class="label">Transaction ID:</span> ${claim.claim_id}</div>
              <div class="detail"><span class="label">Amount:</span> ₹${(claim.payout_amount || 0).toFixed(2)}</div>
              <div class="detail"><span class="label">Status:</span> ${claim.payout_amount && claim.payout_amount > 0 ? "Payout Successful" : "No Payout"}</div>
              <div class="detail"><span class="label">Date:</span> ${claim.created_at ? new Date(claim.created_at).toLocaleDateString("en-IN") : "N/A"}</div>
            </div>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Error", "Sharing is not available on this device");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to generate PDF");
    }
  };

  useEffect(() => {
    if (riderId && typeof id === "string") {
      claimsService
        .getRiderClaims(riderId)
        .then((res) => {
          const found = res.claims.find((c) => c.claim_id === id);
          setClaim(found ?? null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [riderId, id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Receipt</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.receiptCard}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.payoutStatus}>
            {(claim?.payout_amount || 0) > 0
              ? "Payout Successful"
              : "No Payout"}
          </Text>
          <Text style={styles.payoutAmount}>
            ₹{(claim?.payout_amount || 0).toFixed(2)}
          </Text>
          <Text style={styles.payoutDate}>
            {claim?.created_at
              ? `Recorded on ${new Date(claim.created_at).toLocaleDateString("en-IN")}`
              : "No claim date available"}
          </Text>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValue}>{claim?.claim_id || "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Trigger Verification</Text>
            <Text style={[styles.detailValue, { color: Colors.primary }]}>
              Verified via Dataminr
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank Account</Text>
            <Text style={styles.detailValue}>... 1234</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        <Pressable
          style={styles.downloadButton}
          onPress={generateAndSharePDF}
        >
          <Text style={styles.downloadText}>Download PDF</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: { width: 60 },
  backText: { fontSize: 18, color: Colors.primary, fontWeight: "bold" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: Colors.textPrimary },
  container: { flexGrow: 1, padding: 24 },
  receiptCard: {
    backgroundColor: Colors.cardFill,
    borderRadius: 16,
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
  },
  successIcon: { fontSize: 48, marginBottom: 16 },
  payoutStatus: {
    fontSize: 18,
    color: Colors.success,
    fontWeight: "bold",
    marginBottom: 8,
  },
  payoutAmount: {
    fontSize: 42,
    color: Colors.textPrimary,
    fontWeight: "bold",
    marginBottom: 8,
  },
  payoutDate: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24 },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.borderLight,
    marginBottom: 24,
    borderStyle: "dashed",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
  },
  detailLabel: { fontSize: 14, color: Colors.textSecondary },
  detailValue: { fontSize: 14, color: Colors.textPrimary, fontWeight: "600" },
  spacer: { flex: 1, minHeight: 40 },
  downloadButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  downloadText: { color: Colors.background, fontSize: 16, fontWeight: "bold" },
});
