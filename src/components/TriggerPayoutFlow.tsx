import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../constants/colors';

type PayoutStep = 'gps_verify' | 'policy_check' | 'fraud_check' | 'disbursement' | 'complete';

interface TriggerPayoutFlowProps {
  payoutAmount: number;
  utrNumber?: string;
  onComplete?: () => void;
}

export function TriggerPayoutFlow({ payoutAmount, utrNumber, onComplete }: TriggerPayoutFlowProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [pulseAnim] = useState(new Animated.Value(1));

  const steps = [
    { id: 'gps_verify', label: 'Verifying GPS' },
    { id: 'policy_check', label: 'Checking Policy' },
    { id: 'fraud_check', label: 'Running Fraud Check' },
    { id: 'disbursement', label: `Disbursing ₹${Math.round(payoutAmount)}` },
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(s => s + 1);
      }, 500); // Wait 500ms per step
      return () => clearTimeout(timer);
    } else {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      if (onComplete) {
        const timer = setTimeout(() => onComplete(), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentStep]);

  if (currentStep >= steps.length) {
    return (
      <View style={styles.completeContainer}>
        <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]} />
        <View style={styles.successIcon}>
          <Text style={styles.check}>✓</Text>
        </View>
        <Text style={styles.amountText}>₹{Math.round(payoutAmount)} transferred</Text>
        <Text style={styles.utrText}>UTR: {utrNumber || '123456789'} · 47 seconds</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.timelineLine} />
      {steps.map((s, idx) => {
        const isComplete = idx < currentStep;
        const isActive = idx === currentStep;
        return (
          <View key={s.id} style={styles.stepRow}>
            <View style={[styles.iconBox, isComplete ? styles.iconComplete : isActive ? styles.iconActive : null]}>
              {isComplete ? <Text style={styles.checkIcon}>✓</Text> : isActive ? <Text style={styles.spinnerIcon}>⟳</Text> : null}
            </View>
            <View style={styles.textContent}>
              <Text style={[styles.stepLabel, isComplete || isActive ? styles.stepLabelActive : null]}>
                {s.label}
              </Text>
              <Text style={styles.stepStatus}>
                {isComplete ? 'Done' : isActive ? 'Running...' : 'Pending'}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '100%',
    position: 'relative',
    marginLeft: 12,
  },
  timelineLine: {
    position: 'absolute',
    left: 11,
    top: 20,
    bottom: 20,
    width: 2,
    backgroundColor: colors.surfaceContainerHighest,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  iconActive: {
    backgroundColor: colors.surfaceContainerHighest,
  },
  iconComplete: {
    backgroundColor: '#22C55E',
  },
  checkIcon: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  spinnerIcon: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  textContent: {
    marginLeft: 16,
  },
  stepLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  stepLabelActive: {
    color: '#FFF',
  },
  stepStatus: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  completeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  pulseCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  check: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
  },
  utrText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
});
