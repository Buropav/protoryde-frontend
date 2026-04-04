import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '../../src/constants/colors';
import { useEffect } from 'react';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { triggerService } from '../../src/services/triggerService';
import { ErrorBanner } from '../../src/components/ErrorBanner';

const getLayerTitle = (layer: string) => {
  switch (layer) {
    case 'L1_WEATHER_THRESHOLD':
      return 'Rain threshold crossed';
    case 'L2_ZONE_PRESENCE':
      return 'GPS confirmed';
    case 'L3_DELHIVERY_CROSS_REF':
      return 'Orders cancelled';
    case 'L4_BRANCH_CLOSURE_CHECK':
      return 'Branch closure verified';
    default:
      return layer.replace(/_/g, ' ');
  }
};

const formatTriggerLabel = (triggerType: string) =>
  triggerType
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function ActiveTriggerScreen() {
  const { zone: paramZone, trigger_type } = useLocalSearchParams<{ zone?: string; trigger_type?: string }>();
  const { zone, phoneNumber, riderId, upiId } = useRider();
  const riderIdentifier = phoneNumber || riderId || '';
  const activeZone = paramZone || zone || 'HSR Layout';
  const activeTriggerType = trigger_type || 'HEAVY_RAIN';

  const {
    data: simulation,
    loading,
    error,
    refetch,
  } = useApiCall(
    () =>
      triggerService.simulateTrigger({
        zone: activeZone,
        trigger_type: activeTriggerType,
        rider_id: riderIdentifier || undefined,
        is_simulated: true,
      }),
    true,
    [activeZone, activeTriggerType, riderIdentifier]
  );

  const preview = simulation?.claims_preview?.[0];
  const fraudLayers = preview?.fraud_layers || [];
  const delhiveryEvidence = fraudLayers.find((layer: any) => layer.layer === 'L3_DELHIVERY_CROSS_REF')?.evidence;
  const triggerValue = Number(simulation?.trigger_event?.value || 0);
  const recommendedPayout = Number(preview?.recommended_payout || 0);
  const fraudCheckPassed = Boolean(preview?.fraud_check_passed);

  useEffect(() => {
    if (!preview) return;
    const timer = setTimeout(() => {
      router.replace({
        pathname: '/trigger-flow/payout-confirmation-screen',
        params: {
          claim_id: String(preview.claim_id || ''),
          recommended_payout: String(recommendedPayout),
          trigger_type: String(simulation?.trigger_type || activeTriggerType),
          trigger_value: String(triggerValue),
          fraud_check_passed: String(fraudCheckPassed),
          cancelled_orders: String(delhiveryEvidence?.cancelled_orders || 0),
          total_banking_orders: String(delhiveryEvidence?.total_banking_orders || 0),
          upi_id: upiId || '',
          zone: activeZone,
        },
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [activeTriggerType, activeZone, delhiveryEvidence?.cancelled_orders, delhiveryEvidence?.total_banking_orders, fraudCheckPassed, preview, recommendedPayout, simulation?.trigger_type, triggerValue, upiId]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.alertSection}>
          <View style={styles.iconContainer}>
            <View style={styles.iconGlow} />
            <Text style={styles.weatherIcon}>🌧️</Text>
          </View>

          <Text style={styles.headline}>{formatTriggerLabel(activeTriggerType)} Detected</Text>
          <Text style={styles.subheadline}>{activeZone} Zone • {Math.round(triggerValue)} recorded</Text>
          <Text style={styles.timestamp}>10:22 AM, Friday Mar 21, 2026</Text>
        </View>

        {error && <ErrorBanner message={error.userMessage} onRetry={refetch} />}

        <View style={styles.claimCard}>
          <View style={styles.claimHeader}>
            <View>
              <Text style={styles.claimTitle}>Your Claim is Being Processed</Text>
              <Text style={styles.claimSubtitle}>Zero action needed from you.</Text>
            </View>
          </View>

          {loading ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Running fraud checks...</Text>
            </View>
          ) : (
            <>
              <View style={styles.timeline}>
                <View style={styles.timelineLineGreen} />
                <View style={styles.timelineLineGrey} />

                {fraudLayers.map((layer: any) => (
                  <View style={styles.timelineStep} key={layer.layer}>
                    <View style={layer.passed ? styles.stepIcon : styles.stepIconFail}>
                      <Text style={styles.checkIcon}>{layer.passed ? '✓' : '!'}</Text>
                    </View>
                    <View style={styles.stepContent}>
                      <Text style={styles.stepTitleDone}>{getLayerTitle(layer.layer)}</Text>
                      <Text style={styles.stepTime}>{layer.passed ? 'Passed' : 'Failed'}</Text>
                    </View>
                  </View>
                ))}

                <View style={styles.timelineStep}>
                  <View style={styles.stepIconActive}>
                    <Text style={styles.spinnerIcon}>⟳</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitleActive}>Transferring ₹{Math.round(recommendedPayout)} to UPI</Text>
                    <Text style={styles.stepTime}>In progress</Text>
                  </View>
                </View>
              </View>

              <View style={styles.payoutSection}>
                <Text style={styles.payoutAmount}>₹{Math.round(recommendedPayout)}</Text>
                <View style={styles.arrivalRow}>
                  <View style={styles.pulseDot} />
                  <Text style={styles.arrivalText}>Estimated arrival: &lt; 60 seconds</Text>
                </View>
              </View>
            </>
          )}
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: 24,
  },
  alertSection: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  iconGlow: {
    position: 'absolute',
    inset: -12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 100,
  },
  weatherIcon: {
    fontSize: 56,
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
    paddingLeft: 20,
    padding: 24,
    marginTop: -45,
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
  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 10,
  },
  loadingText: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
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
  timeline: {
    position: 'relative',
    paddingLeft: 8,
    marginBottom: -20,
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
    bottom: 32,
    height: 20,
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
  stepIconFail: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.error,
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
    paddingTop:10,
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
    marginTop: 8,
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