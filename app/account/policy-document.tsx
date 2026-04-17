import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../src/constants/colors";
import { useRouter } from "expo-router";

export default function PolicyDocumentScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Definitions</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Policy Document & Trigger Definitions</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Severe Weather Triggers</Text>
          <Text style={styles.paragraph}>
            Coverage activates automatically when the recorded rainfall exceeds
            15mm per hour or ambient temperature rises above 45°C within your
            active delivery zone. Data is verified via recognized meteorological
            networks.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Payout Mechanisms</Text>
          <Text style={styles.paragraph}>
            Payouts are processed instantly to your linked bank account via
            IMPS/UPI. Minimum verification time from the trigger incident is
            approximately 30 minutes to reduce fraudulent readings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Dispute Handling</Text>
          <Text style={styles.paragraph}>
            If you believe a claim should have been triggered but wasn't, you
            can request a manual audit within 48 hours of the associated
            incident.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
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
  backText: { fontSize: 24, color: Colors.primary, fontWeight: "bold" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: Colors.textPrimary },
  container: { flexGrow: 1, padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 24,
  },
  section: {
    backgroundColor: Colors.cardFill,
    padding: 16,
    borderRadius: 12,
    borderColor: Colors.border,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  paragraph: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
});
