import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { AppPage, SectionCard, StatusChip } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { premiumService } from '../../src/services/premiumService';

export default function ZoneSelectionScreen() {
  const { zone } = useRider();

  // Fetch supported zones from model status
  const { 
    data: modelStatus, 
    loading: loadingZones 
  } = useApiCall(premiumService.getModelStatus);

  const availableZones = modelStatus?.zone_defaults 
    ? Object.keys(modelStatus.zone_defaults) 
    : ['HSR Layout'];

  return (
    <View style={styles.container}>
      <AppPage contentContainerStyle={styles.content}>
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '66%' }]} />
          </View>
        </View>

        <View style={styles.heroBlock}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Confirm Your Zone</Text>
          </View>
        </View>

        <View style={styles.selectorWrap}>
          <Text style={styles.label}>Risk Assessment Zone</Text>
          <TouchableOpacity style={styles.zoneSelector} activeOpacity={0.85}>
            <Text style={styles.zoneText}>{zone || 'HSR Layout'}</Text>
            <Text style={styles.zoneIcon}>⌄</Text>
          </TouchableOpacity>
        </View>

        <SectionCard style={styles.mapCard}>
          <View style={styles.fakeMap}>
            <Text style={styles.mapBadge}>Bangalore Grid</Text>
            <View style={styles.pin} />
            <StatusChip label="Medium Risk" tone="warning" style={styles.riskChip} />
          </View>
        </SectionCard>

        <View>
          <Text style={styles.sectionTitle}>Live Insights</Text>
          <View style={styles.insightsRow}>
            <SectionCard style={styles.insightCard}>
              <Text style={styles.insightIcon}>💧</Text>
              <Text style={styles.insightLabel}>Historical Flood</Text>
              <Text style={styles.insightValue}>Low Risk</Text>
            </SectionCard>
            <SectionCard style={[styles.insightCard, styles.alertCard]}>
              <Text style={styles.insightIcon}>⛈️</Text>
              <Text style={styles.insightLabel}>Predicted Rain</Text>
              <Text style={styles.insightValue}>High Intensity</Text>
            </SectionCard>
          </View>
        </View>

        <SectionCard style={styles.premiumCard}>
          <Text style={styles.premiumCaption}>Base Premium Preview</Text>
          <View style={styles.premiumRow}>
            <Text style={styles.premiumAmount}>₹82</Text>
            <Text style={styles.premiumUnit}>/week</Text>
          </View>
          <Text style={styles.premiumText}>
            Premium is adjusted based on real-time meteorological data and your selected primary operation zone.
          </Text>
        </SectionCard>

        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.9}
          onPress={() => router.push('/(auth)/premium-reveal')}
        >
          <Text style={styles.continueText}>Continue to Premium Calculation</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </AppPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingTop: 8,
  },
  heroBlock: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    paddingRight: 5,
  },
  backIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  progressSection: {
    paddingTop: 25,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
    flex: 1,
  },
  selectorWrap: {
    gap: 8,
    marginTop: -10,
  },
  label: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  zoneSelector: {
    borderRadius: 14,
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zoneText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  zoneIcon: {
    color: colors.primary,
    fontSize: 18,
  },
  mapCard: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
  },
  fakeMap: {
    height: 210,
    backgroundColor: '#192A3B',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapBadge: {
    color: '#8CB8FF',
    fontSize: 12,
    letterSpacing: 0.6,
  },
  pin: {
    marginTop: 12,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.secondaryContainer,
    borderWidth: 2,
    borderColor: colors.onPrimary,
  },
  riskChip: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  insightsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  insightCard: {
    flex: 1,
    gap: 6,
  },
  alertCard: {
    borderLeftWidth: 3,
    borderLeftColor: colors.secondary,
  },
  insightIcon: {
    fontSize: 16,
  },
  insightLabel: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
  },
  insightValue: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  premiumCard: {
    backgroundColor: colors.primaryContainer,
    gap: 10,
  },
  premiumCaption: {
    color: colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    fontSize: 10,
    fontWeight: '700',
  },
  premiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  premiumAmount: {
    color: colors.onPrimary,
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 38,
  },
  premiumUnit: {
    color: colors.onPrimaryContainer,
    fontSize: 13,
    marginBottom: 4,
  },
  premiumText: {
    color: colors.onPrimaryContainer,
    fontSize: 12,
    lineHeight: 18,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: -15,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.onPrimary,
  },
  arrowIcon: {
    color: colors.onPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
});
