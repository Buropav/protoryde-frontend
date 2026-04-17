import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Animated, Easing, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { RiderContext } from "../../src/context/RiderContext";
import { claimsService } from "../../src/services/claimsService";

export default function ActiveTriggerScreen() {
  const { riderId } = useContext(RiderContext)!;
  const [pulseAnim] = useState(new Animated.Value(1));
  const [claim, setClaim] = useState<any>(null);
  const [seconds, setSeconds] = useState(92); // 1m 32s start as per image
  const progressStage = 2; // 0: Weather, 1: Zone, 2: Delhivery

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Timer for processing
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Real functionality: polling or fetching the newest claim.
    const fetchClaim = async () => {
      if (!riderId) return;
      try {
        const res = await claimsService.getRiderClaims(riderId);
        if (res.claims && res.claims.length > 0) {
          const latestClaim = res.claims[0];
          setClaim(latestClaim);
        }
      } catch (err) {
        console.error("Failed to fetch processing claim:", err);
      }
    };
    fetchClaim();
  }, [riderId]);

  const formatTime = (totalS: number) => {
    const m = Math.floor(totalS / 60);
    const s = totalS % 60;
    return `${m}m ${s}s`;
  };

  const steps = [
    { label: "Weather", color: "#10b981", activeColor: "#10b981", active: false },
    { label: "Zone", color: "#10b981", activeColor: "#10b981", active: false },
    { label: "DELHIVERY", color: "#334155", activeColor: "#f59e0b", active: true },
    { label: "Fraud", color: "#334155", activeColor: "#334155", active: false },
    { label: "Transfer", color: "#334155", activeColor: "#334155", active: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.headerTitle}>Payout Processing</Text>

      <View style={styles.diamondContainer}>
        {/* Pulsing diamond */}
        <Animated.View style={[styles.animDiamondWrapper, { transform: [{ scale: pulseAnim }, { rotate: '45deg' }] }]}>
          <View style={styles.diamondOutline} />
        </Animated.View>

        {/* Center icon */}
        <View style={styles.iconCenter}>
          <Ionicons name="shield" size={40} color="#fbbf24" />
        </View>
      </View>

      <Text style={styles.statusText}>Verifying Delhivery cancellations...</Text>
      <Text style={styles.timerText}>Processing for {formatTime(seconds)}</Text>

      {/* Progress Bars */}
      <View style={styles.progressContainer}>
        {steps.map((step, idx) => (
          <View key={idx} style={styles.progressStep}>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: step.active ? step.activeColor : (idx < progressStage ? "#10b981" : "#334155") },
                step.active && styles.progressBarActive
              ]}
            />
            <Text style={[styles.progressLabel, step.active && { color: step.activeColor, fontWeight: 'bold' }]}>
              {step.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Checklist box */}
      <View style={styles.checklistCard}>
        <View style={styles.checkItem}>
          <Ionicons name="cloud" size={20} color="#10b981" />
          <View style={styles.checkTexts}>
            <Text style={styles.checkLabel}>TRIGGER</Text>
            <Text style={styles.checkValue}>
              Heavy Rainfall · {claim ? claim.trigger_value : '44'}mm
            </Text>
          </View>
          <Ionicons name="checkmark-circle" size={24} color="#10b981" />
        </View>

        <View style={styles.checkItem}>
          <MaterialCommunityIcons name="database" size={20} color="#10b981" />
          <View style={styles.checkTexts}>
            <Text style={styles.checkLabel}>DATA SOURCE</Text>
            <Text style={styles.checkValue}>OpenWeatherMap verified</Text>
          </View>
          <Ionicons name="checkmark-circle" size={24} color="#10b981" />
        </View>

        <View style={[styles.checkItem, { borderBottomWidth: 0, paddingBottom: 0 }]}>
          <MaterialCommunityIcons name="moped" size={20} color="#f59e0b" />
          <View style={styles.checkTexts}>
            <Text style={[styles.checkLabel, { color: '#64748b' }]}>DELHIVERY CANCELLATIONS</Text>
            <Text style={[styles.checkValue, { color: '#f59e0b' }]}>Verifying...</Text>
          </View>
          <View style={styles.spinnerWrapper}>
            <ActivityIndicator size="small" color="#f59e0b" />
          </View>
        </View>
      </View>

      <Text style={styles.claimIdText}>
        Claim ID: {claim ? claim.claim_id : 'BKS-2025-07-14-VKR'}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0a101d", alignItems: "center" },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 20,
    marginBottom: 60,
  },
  diamondContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  animDiamondWrapper: {
    position: 'absolute',
    width: 140,
    height: 140,
  },
  diamondOutline: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'rgba(251, 191, 36, 0.4)',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 20,
  },
  iconCenter: {
    position: 'absolute',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: '#334155',
    marginBottom: 8,
  },
  progressBarActive: {
    height: 5,
    backgroundColor: '#f59e0b',
  },
  progressLabel: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
  },
  checklistCard: {
    backgroundColor: '#141e2e',
    width: '90%',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 40,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  checkTexts: {
    flex: 1,
    paddingHorizontal: 16,
  },
  checkLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 4,
  },
  checkValue: {
    fontSize: 15,
    color: '#f8fafc',
    fontWeight: '500',
  },
  spinnerWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimIdText: {
    fontSize: 12,
    color: '#334155',
  },
});
