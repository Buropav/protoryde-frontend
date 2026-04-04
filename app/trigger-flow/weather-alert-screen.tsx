import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { weatherService } from '../../src/services/weatherService';
import { policyService } from '../../src/services/policyService';
import { triggerService } from '../../src/services/triggerService';
import { ErrorBanner } from '../../src/components/ErrorBanner';

export default function WeatherAlertScreen() {
  const { zone, phoneNumber, riderId } = useRider();
  const riderIdentifier = phoneNumber || riderId || '';

  const {
    data: weatherData,
    loading: loadingWeather,
    error: weatherError,
    refetch: refetchWeather,
  } = useApiCall(
    () => weatherService.getCurrentWeather(zone || 'HSR Layout', true),
    !!zone,
    [zone]
  );

  const {
    data: policy,
    loading: loadingPolicy,
    error: policyError,
    refetch: refetchPolicy,
  } = useApiCall(
    () => policyService.getCurrentPolicy(riderIdentifier),
    !!riderIdentifier,
    [riderIdentifier]
  );

  const {
    data: simulation,
    loading: loadingSimulation,
    error: simulationError,
    refetch: refetchSimulation,
  } = useApiCall(
    () =>
      triggerService.simulateTrigger({
        zone: zone || 'HSR Layout',
        trigger_type: 'HEAVY_RAIN',
        rider_id: riderIdentifier || undefined,
        is_simulated: true,
      }),
    !!zone,
    [zone, riderIdentifier]
  );

  const heavyRain = weatherData?.trigger_view?.heavy_rain;
  const predictedRain = Number(weatherData?.conditions?.rain_24h_mm || 0);
  const threshold = Number(heavyRain?.threshold || 30);
  const breached = Boolean(heavyRain?.breached);
  const coverageCap = policy?.coverage_cap || 2300;
  const previewPayout = Number(simulation?.claims_preview?.[0]?.recommended_payout);
  const fallbackPayout = Math.min(coverageCap, 1050 * (9 / 9) * 0.8);
  const projectedPayout = Number.isFinite(previewPayout) ? previewPayout : fallbackPayout;

  const safeFillPct = predictedRain > 0 ? Math.min((threshold / predictedRain) * 100, 100) : 0;

  const handleRetry = () => {
    refetchWeather();
    refetchPolicy();
    refetchSimulation();
  };

  const getErrorMessage = () => {
    if (weatherError) {
      return weatherError.userMessage;
    }
    if (policyError) {
      return policyError.userMessage;
    }
    if (simulationError) {
      return simulationError.userMessage;
    }
    return null;
  };

  const hasError = !!getErrorMessage();
  const isLoading = loadingWeather || loadingPolicy || loadingSimulation;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather Update</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {hasError && <ErrorBanner message={getErrorMessage() || ''} onRetry={handleRetry} />}
        {isLoading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Preparing trigger outlook...</Text>
          </View>
        ) : null}

        <View style={styles.alertCard}>
          <View style={styles.cardContent}>
            <View style={styles.riskBadge}>
              <Text style={styles.riskIcon}>⚠️</Text>
              <Text style={styles.riskText}>{breached ? 'HIGH RISK' : 'WATCH'} • SIMULATED</Text>
            </View>

            <Text style={styles.headline}>
              Heavy Rain Predicted in {zone || 'HSR Layout'}
            </Text>

            <View style={styles.impactChip}>
              <Text style={styles.impactChipText}>📉  High Impact on Earnings</Text>
            </View>

            {/* Rainfall Threshold Progress Bar */}
            <View style={styles.progressSection}>
              <Text style={styles.progressTitle}>Rainfall Forecast:</Text>
              <View style={styles.progressBarWrapper}>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFillSafe, { width: `${safeFillPct}%` }]} />
                  <View style={styles.progressBarFillDanger} />
                </View>
                {/* Trigger divider line + label, outside track so it can overflow */}
                <View style={[styles.triggerMarker, { left: `${safeFillPct}%` }]} />
                <Text style={styles.endLabel}>{Math.round(predictedRain)}mm</Text>
                <Text style={styles.triggerMarkerLabel}>Trigger ({Math.round(threshold)}mm)</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Trigger</Text>
                <Text style={styles.statValue}>{Math.round(threshold)}mm</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Predicted</Text>
                <Text style={[styles.statValue, styles.dangerValue]}>{Math.round(predictedRain)}mm</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Coverage</Text>
                <Text style={styles.statValue}>₹{Math.round(coverageCap)}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.payoutProjection}>
              <Text style={styles.projectionLabel}>If trigger fires tomorrow, you receive:</Text>
              <Text style={styles.projectionAmount}>₹{Math.round(projectedPayout)}</Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.upgradeButton}
                onPress={() =>
                  router.push({
                    pathname: '/trigger-flow/active-trigger-screen',
                    params: { zone: zone || 'HSR Layout', trigger_type: 'HEAVY_RAIN' },
                  })
                }
                activeOpacity={0.95}
              >
                <Text style={styles.upgradeText}>Upgrade to Enhanced Cover (+₹25)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          You'll be automatically notified if weather conditions change. Payouts are credited instantly to your linked UPI account upon trigger verification.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: colors.surface,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  spacer: {
    width: 120,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 60,
    paddingBottom: 24,
  },
  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    gap: 10,
  },
  loadingText: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
  },
  alertCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  riskIcon: {
    fontSize: 14,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSecondaryFixed,
    letterSpacing: 1,
  },
  cardContent: {
    padding: 24,
    gap: 16,
  },
  headline: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  impactChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
  },
  impactChipText: {
    color: '#FCA5A5',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  progressSection: {
    gap: 12,
  },
  progressTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressBarWrapper: {
    position: 'relative',
    paddingBottom: 20, // space for the trigger label below
  },
  progressBarTrack: {
    height: 14,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 7,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressBarFillSafe: {
    backgroundColor: colors.primary,
  },
  progressBarFillDanger: {
    flex: 1,
    backgroundColor: '#EF4444',
  },
  triggerMarker: {
    position: 'absolute',
    top: -4,
    bottom: 16,
    width: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    zIndex: 2,
  },
  endLabel: {
    position: 'absolute',
    right: 0,
    top: -18,
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
  },
  triggerMarkerLabel: {
    position: 'absolute',
    left: '40.5%',
    bottom: 0,
    fontSize: 10,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginLeft: -2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelLeft: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  progressLabelRight: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceContainerLow,
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  statItem: {
    flex: 1,
    gap: 6,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  dangerValue: {
    color: colors.error,
  },
  payoutProjection: {
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  projectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  projectionAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#22C55E',
    letterSpacing: -1,
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
  },
  upgradeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  upgradeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  disclaimer: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: -27,
    paddingHorizontal: 16,
    opacity: 0.6,
  },
});