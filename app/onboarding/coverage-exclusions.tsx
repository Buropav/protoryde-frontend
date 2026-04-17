import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "../../src/constants/colors";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");

const EXCLUSION_GROUPS = [
  {
    id: "bodily",
    title: "Bodily & Vehicle Harms",
    items: [
      "Personal injuries sustained while gigging during triggered weather events.",
      "Mechanical breakdown, tire damage, or engine flood damage to your vehicle.",
      "Theft or vandalism occurring during the period of active weather coverage.",
      "Liability to third parties or property damage caused by collision.",
    ],
  },
  {
    id: "downtime",
    title: "Non-Weather Downtime",
    items: [
      "Coverage does not apply to non-weather related app outages, server downtime, or lack of orders.",
    ],
  },
  {
    id: "bans",
    title: "Third-Party App Bans",
    items: [
      "Loss of income due to account suspension, deactivation, or temporary bans by the gig platform.",
    ],
  },
  {
    id: "international",
    title: "International Incidents",
    items: [
      "Coverage is limited to events within your specified active coverage zone and country.",
    ],
  },
];

export default function CoverageExclusionsScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>("bodily");
  const [viewedGroups, setViewedGroups] = useState<Set<string>>(
    new Set(["bodily"]),
  );

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const isExpanding = expandedId !== id;
    setExpandedId(isExpanding ? id : null);

    if (isExpanding) {
      setViewedGroups((prev) => new Set(prev).add(id));
    }
  };

  const allViewed = viewedGroups.size === EXCLUSION_GROUPS.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Coverage Exclusions</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={[styles.progressSegment, styles.progressActive]} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            What ProtoRyde Covers{"\n"}(and Doesn't)
          </Text>
          <Text style={styles.subtitle}>
            Review our coverage boundaries before activating your protection.
          </Text>

          <View style={styles.sectionHeader}>
            <Ionicons
              name="shield-checkmark"
              size={16}
              color={Colors.primary}
            />
            <Text style={styles.sectionTitle}>CORE COVERAGE TRIGGERS</Text>
          </View>

          <View style={styles.coreTriggersRow}>
            <View style={styles.triggerCard}>
              <View style={styles.triggerCardLine} />
              <Ionicons
                name="cloud-download"
                size={24}
                color={Colors.primary}
                style={styles.triggerIcon}
              />
              <Text style={styles.triggerTitle}>Heavy Rainfall</Text>
              <Text style={styles.triggerValue}>≥ 30mm / 24h</Text>
            </View>
            <View style={styles.triggerCard}>
              <View style={styles.triggerCardLine} />
              <Feather
                name="sun"
                size={24}
                color={Colors.primary}
                style={styles.triggerIcon}
              />
              <Text style={styles.triggerTitle}>Extreme Heat</Text>
              <Text style={styles.triggerValue}>Heat Index &gt; 42°C</Text>
            </View>
          </View>

          <View style={[styles.sectionHeader, { marginTop: 32 }]}>
            <Ionicons name="warning" size={16} color="#FF8A80" />
            <Text style={[styles.sectionTitle, { color: "#FF8A80" }]}>
              WHAT'S NOT COVERED
            </Text>
          </View>

          <View style={styles.exclusionsList}>
            {EXCLUSION_GROUPS.map((group) => {
              const isExpanded = expandedId === group.id;
              return (
                <View key={group.id} style={styles.exclusionGroup}>
                  <Pressable
                    style={[
                      styles.exclusionHeader,
                      isExpanded && styles.exclusionHeaderExpanded,
                    ]}
                    onPress={() => toggleExpand(group.id)}
                  >
                    <Text style={styles.exclusionGroupTitle}>
                      {group.title}
                    </Text>
                    <Feather
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={20}
                      color={Colors.textSecondary}
                    />
                  </Pressable>
                  {isExpanded && (
                    <View style={styles.exclusionContent}>
                      {group.items.map((item, index) => (
                        <View key={index} style={styles.exclusionItem}>
                          <View style={styles.minusIconContainer}>
                            <Feather
                              name="minus"
                              size={14}
                              color={Colors.textPrimary}
                            />
                          </View>
                          <Text style={styles.exclusionItemText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.understandingBox}>
            <View style={styles.understandingIconBox}>
              <Feather name="lock" size={16} color={Colors.textSecondary} />
            </View>
            <View style={styles.understandingTextCol}>
              <Text style={styles.understandingTitle}>
                I have read and understood the above exclusions.
              </Text>
              {!allViewed && (
                <Text style={styles.understandingWarning}>
                  Please review all exclusion groups above first.
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, !allViewed && styles.buttonDisabled]}
          disabled={!allViewed}
          onPress={() =>
            router.push("/onboarding/first-premium-payment" as any)
          }
        >
          <Text
            style={[styles.buttonText, !allViewed && styles.buttonTextDisabled]}
          >
            I Understand and Accept
          </Text>
        </Pressable>
        <View style={styles.secureFooter}>
          <Feather
            name="lock"
            size={12}
            color={Colors.textMuted}
            style={styles.secureIcon}
          />
          <Text style={styles.secureText}>
            256-BIT ENCRYPTED. YOUR DATA IS SAFE.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
  },
  progressContainer: {
    flexDirection: "row",
    gap: 8,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
  },
  progressActive: {
    backgroundColor: Colors.primary,
  },
  container: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 32,
    lineHeight: 22,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  coreTriggersRow: {
    flexDirection: "row",
    gap: 16,
  },
  triggerCard: {
    flex: 1,
    backgroundColor: Colors.cardFill,
    borderRadius: 8,
    padding: 16,
    overflow: "hidden",
  },
  triggerCardLine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Colors.primary,
  },
  triggerIcon: {
    marginBottom: 12,
  },
  triggerTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  triggerValue: {
    color: Colors.primary,
    fontSize: 12,
    opacity: 0.9,
  },

  exclusionsList: {
    gap: 12,
    marginBottom: 32,
  },
  exclusionGroup: {
    backgroundColor: Colors.cardFill,
    borderRadius: 8,
    overflow: "hidden",
  },
  exclusionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  exclusionHeaderExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  exclusionGroupTitle: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: "600",
  },
  exclusionContent: {
    padding: 16,
    paddingTop: 8,
    gap: 16,
  },
  exclusionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  minusIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  exclusionItemText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },

  understandingBox: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    alignItems: "center",
  },
  understandingIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  understandingTextCol: {
    flex: 1,
  },
  understandingTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  understandingWarning: {
    color: "#FF9500",
    fontSize: 13,
    marginTop: 4,
    fontStyle: "italic",
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    backgroundColor: Colors.background,
  },
  button: {
    backgroundColor: "#1E2D40",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#1A2536",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  buttonTextDisabled: {
    color: Colors.textMuted,
  },
  secureFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  secureIcon: {
    marginRight: 6,
  },
  secureText: {
    color: Colors.textMuted,
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: "600",
  },
});
