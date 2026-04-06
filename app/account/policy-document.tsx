import { StyleSheet, Text, View, Linking } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { AppPage, PrimaryButton, SectionCard, StatusChip, TopBar } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { triggerService } from '../../src/services/triggerService';
import { policyService } from '../../src/services/policyService';
import { API_BASE_URL } from '../../src/config/api';

const TRIGGER_DEFINITIONS = [
  {
    id: 'rain',
    title: 'Heavy Rainfall',
    icon: '🌧️',
    threshold: '≥ 30mm / 24h',
    detail: 'Payout triggered when cumulative rainfall in the registered zone exceeds 30mm within any 24-hour window during active coverage.',
  },
  {
    id: 'heat',
    title: 'Extreme Heat',
    icon: '☀️',
    threshold: '≥ 40°C',
    detail: 'Payout triggered when the maximum recorded temperature in the zone reaches or exceeds 40°C making outdoor delivery dangerous.',
  },
  {
    id: 'aqi',
    title: 'Severe AQI',
    icon: '🌫️',
    threshold: 'AQI ≥ 300',
    detail: 'Payout triggered when the Air Quality Index in the zone is classified as Hazardous (≥300), impairing safe outdoor work.',
  },
];

export default function PolicyDocumentScreen() {
  const { phoneNumber } = useRider();
  const [isDownloading, setIsDownloading] = useState(false);

  // Task 10.1: Fetch live exclusions from backend
  const { data: exclusionsData, loading: loadingExclusions } = useApiCall(
    () => triggerService.getExclusions(),
    true,
    []
  );

  const exclusions = exclusionsData?.items || [];

  const handleDownloadPdf = async () => {
    if (!phoneNumber) return;
    setIsDownloading(true);
    try {
      if (phoneNumber.startsWith('demo_rider_')) {
        alert("PDF downloads are currently disabled in mock demo mode.");
        return;
      }
      // Opens PDF in the device's default browser/PDF viewer
      const pdfUrl = `${API_BASE_URL}/policies/${phoneNumber}/current/document`;
      await Linking.openURL(pdfUrl);
    } catch (err) {
      console.error('PDF download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopBar title="Policy Document" onBack={() => router.back()} />
      <AppPage contentContainerStyle={styles.content}>
        <View>
          <View style={styles.activeHeader}>
            <Text style={styles.sectionTitle}>Active Coverage</Text>
            <StatusChip label="Live Shield" tone="active" />
          </View>
          <View style={styles.coverageGrid}>
            {TRIGGER_DEFINITIONS.map((t) => (
              <SectionCard key={t.id} style={styles.iconCard}>
                <Text style={styles.icon}>{t.icon}</Text>
                <Text style={styles.iconText}>{t.title.split(' ')[0]}</Text>
              </SectionCard>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.sectionEyebrow}>Trigger Definitions</Text>
          {TRIGGER_DEFINITIONS.map((item) => (
            <SectionCard key={item.id} style={styles.triggerCard}>
              <View style={styles.triggerHeader}>
                <Text style={styles.triggerTitle}>{item.title}</Text>
                <Text style={styles.triggerThreshold}>{item.threshold}</Text>
              </View>
              <Text style={styles.triggerText}>{item.detail}</Text>
            </SectionCard>
          ))}
        </View>

        <SectionCard style={styles.exclusionWrap}>
          <View style={styles.exclusionHeader}>
            <Text style={styles.sectionEyebrow}>Exclusions & Legal</Text>
            {exclusionsData && (
              <Text style={styles.exclusionVersion}>
                {exclusionsData.version}
              </Text>
            )}
          </View>
          {loadingExclusions ? (
            <Text style={styles.loadingText}>Loading exclusions...</Text>
          ) : (
            exclusions.map((item, index) => (
              <View key={index} style={styles.exclusionRow}>
                <Text style={styles.exclusionIcon}>⛔</Text>
                <Text style={styles.exclusionText}>{item}</Text>
              </View>
            ))
          )}
        </SectionCard>

        <View style={styles.twoCards}>
          <SectionCard style={styles.metricCardPrimary}>
            <Text style={styles.metricIcon}>⏱️</Text>
            <Text style={styles.metricTitle}>Claim Window</Text>
            <Text style={styles.metricText}>Must file within 24 hours of event conclusion.</Text>
          </SectionCard>
          <SectionCard style={styles.metricCardError}>
            <Text style={styles.metricIcon}>⚖️</Text>
            <Text style={styles.metricTitle}>Fraud Policy</Text>
            <Text style={styles.metricText}>Zero tolerance. Violation results in permanent ban.</Text>
          </SectionCard>
        </View>

        <PrimaryButton
          label={isDownloading ? 'Generating PDF...' : 'Download Policy PDF'}
          onPress={handleDownloadPdf}
          rightSlot={<Text style={styles.download}>{isDownloading ? '⏳' : '↓'}</Text>}
        />
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
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  coverageGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  iconCard: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    fontSize: 18,
  },
  iconText: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    fontWeight: '700',
  },
  sectionEyebrow: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '700',
    marginBottom: 8,
  },
  triggerCard: {
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  triggerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  triggerTitle: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '800',
  },
  triggerThreshold: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: colors.primary + '1E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  triggerText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
  },
  exclusionWrap: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  exclusionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exclusionVersion: {
    color: colors.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: colors.outlineVariant + '55',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  exclusionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  exclusionIcon: {
    fontSize: 13,
    marginTop: 2,
  },
  exclusionText: {
    color: colors.onSurface,
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
  loadingText: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontStyle: 'italic',
    paddingVertical: 8,
  },
  twoCards: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCardPrimary: {
    flex: 1,
    backgroundColor: colors.primaryContainer,
  },
  metricCardError: {
    flex: 1,
    backgroundColor: colors.error + 'BB',
  },
  metricIcon: {
    fontSize: 18,
    marginBottom: 8,
  },
  metricTitle: {
    color: colors.onPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricText: {
    color: colors.onPrimaryContainer,
    fontSize: 11,
    lineHeight: 16,
  },
  download: {
    color: colors.onPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
});
