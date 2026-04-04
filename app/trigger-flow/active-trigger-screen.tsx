import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../src/constants/colors';
import { useEffect, useState } from 'react';

export default function ActiveTriggerScreen() {
  const [step, setStep] = useState(4);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/trigger-flow/payout-confirmation-screen');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.time}>10:24</Text>
        <View style={styles.icons}>
          <Text style={styles.icon}>📶</Text>
          <Text style={styles.icon}>wifi</Text>
          <Text style={styles.icon}>🔋</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.alertSection}>
          <View style={styles.iconContainer}>
            <View style={styles.iconGlow} />
            <Text style={styles.weatherIcon}>🌧️</Text>
          </View>

          <Text style={styles.headline}>Heavy Rain Detected</Text>
          <Text style={styles.subheadline}>HSR Layout Zone • 44mm rainfall recorded</Text>
          <Text style={styles.timestamp}>10:22 AM, Friday Mar 21, 2026</Text>
        </View>

        <View style={styles.claimCard}>
          <View style={styles.claimHeader}>
            <View>
              <Text style={styles.claimTitle}>Your Claim is Being Processed</Text>
              <Text style={styles.claimSubtitle}>Zero action needed from you.</Text>
            </View>
            <View style={styles.securityIcon}>
              <Text style={styles.iconSmall}>🛡️</Text>
            </View>
          </View>

          <View style={styles.timeline}>
            <View style={styles.timelineLineGreen} />
            <View style={styles.timelineLineGrey} />
            
            <View style={styles.timelineStep}>
              <View style={styles.stepIcon}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitleDone}>Rain threshold crossed</Text>
                <Text style={styles.stepTime}>10:22 AM</Text>
              </View>
            </View>

            <View style={styles.timelineStep}>
              <View style={styles.stepIcon}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitleDone}>GPS confirmed</Text>
                <Text style={styles.stepTime}>10:22 AM</Text>
              </View>
            </View>

            <View style={styles.timelineStep}>
              <View style={styles.stepIcon}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitleDone}>Orders cancelled</Text>
                <Text style={styles.stepTime}>10:23 AM</Text>
              </View>
            </View>

            <View style={styles.timelineStep}>
              <View style={styles.stepIcon}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitleDone}>Fraud check PASSED</Text>
                <Text style={styles.stepTime}>10:23 AM</Text>
              </View>
            </View>

            <View style={styles.timelineStep}>
              <View style={styles.stepIconActive}>
                <Text style={styles.spinnerIcon}>⟳</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitleActive}>Transferring ₹840 to UPI</Text>
                <Text style={styles.stepTime}>10:24 AM</Text>
              </View>
            </View>
          </View>

          <View style={styles.payoutSection}>
            <Text style={styles.payoutAmount}>₹840</Text>
            <View style={styles.arrivalRow}>
              <View style={styles.pulseDot} />
              <Text style={styles.arrivalText}>Estimated arrival: &lt; 60 seconds</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Claim Details</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>We'll notify you the moment it's credited</Text>

        <View style={styles.indicator}>
          <View style={styles.indicatorBar} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryContainer,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 12,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onPrimary,
  },
  icons: {
    flexDirection: 'row',
    gap: 6,
  },
  icon: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: 24,
  },
  alertSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  iconGlow: {
    position: 'absolute',
    inset: -20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 100,
  },
  weatherIcon: {
    fontSize: 80,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.onPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subheadline: {
    fontSize: 14,
    color: colors.onPrimary,
    opacity: 0.6,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryFixed,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 32,
  },
  claimCard: {
    width: '100%',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  claimTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  claimSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSmall: {
    fontSize: 20,
  },
  timeline: {
    position: 'relative',
    paddingLeft: 8,
  },
  timelineLineGreen: {
    position: 'absolute',
    left: 18,
    top: 4,
    bottom: 52,
    width: 2,
    backgroundColor: '#22C55E',
  },
  timelineLineGrey: {
    position: 'absolute',
    left: 18,
    bottom: 8,
    height: 44,
    width: 2,
    backgroundColor: colors.surfaceContainerHighest,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 20,
  },
  stepIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  stepIconActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  checkIcon: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  spinnerIcon: {
    fontSize: 16,
    color: colors.secondary,
  },
  stepContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepTitleDone: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stepTitleActive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
  },
  stepTime: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  payoutSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainer,
    alignItems: 'center',
  },
  payoutAmount: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -1,
  },
  arrivalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  arrivalText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailsButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 16,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPrimary,
    textAlign: 'center',
  },
  footerNote: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onPrimary,
    opacity: 0.6,
    fontStyle: 'italic',
    marginBottom: 24,
  },
  indicator: {
    alignItems: 'center',
  },
  indicatorBar: {
    width: 128,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
});