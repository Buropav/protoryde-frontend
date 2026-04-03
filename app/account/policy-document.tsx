import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, PrimaryButton, SectionCard, StatusChip, TopBar } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { policyExclusions, policyTriggerDefinitions } from '../../src/data/prototype-data';

export default function PolicyDocumentScreen() {
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
            <SectionCard style={styles.iconCard}><Text style={styles.icon}>🌧️</Text><Text style={styles.iconText}>Rain</Text></SectionCard>
            <SectionCard style={styles.iconCard}><Text style={styles.icon}>☀️</Text><Text style={styles.iconText}>Heat</Text></SectionCard>
            <SectionCard style={styles.iconCard}><Text style={styles.icon}>🌫️</Text><Text style={styles.iconText}>AQI</Text></SectionCard>
          </View>
        </View>

        <View>
          <Text style={styles.sectionEyebrow}>Trigger Definitions</Text>
          {policyTriggerDefinitions.map((item) => (
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
          <Text style={styles.sectionEyebrow}>Exclusions & Legal</Text>
          {policyExclusions.map((item) => (
            <View key={item} style={styles.exclusionRow}>
              <Text style={styles.exclusionIcon}>⛔</Text>
              <Text style={styles.exclusionText}>{item}</Text>
            </View>
          ))}
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
          label="Download Policy PDF"
          onPress={() => {}}
          rightSlot={<Text style={styles.download}>↓</Text>}
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
