import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, PrimaryButton, SectionCard, StatusChip, TopBar } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { claimAuditSteps } from '../../src/data/prototype-data';

export default function ClaimDetailFraudAuditScreen() {
  return (
    <View style={styles.container}>
      <TopBar title="Claim Details" onBack={() => router.back()} />
      <AppPage contentContainerStyle={styles.content}>
        <SectionCard>
          <Text style={styles.referenceLabel}>Reference ID</Text>
          <Text style={styles.reference}>Claim #BKS-2026-03-21</Text>
          <View style={styles.statusRow}>
            <View>
              <Text style={styles.statusLabel}>Payout Status</Text>
              <View style={styles.payoutRow}>
                <Text style={styles.payout}>₹840</Text>
                <StatusChip label="Paid" tone="success" />
              </View>
            </View>
          </View>
        </SectionCard>

        <View>
          <View style={styles.auditHeader}>
            <Text style={styles.auditTitle}>Fraud Audit Trail</Text>
            <Text style={styles.auditMeta}>System Validated</Text>
          </View>
          {claimAuditSteps.map((step) => (
            <SectionCard key={step.id} style={styles.auditStep}>
              <View style={styles.auditIconWrap}>
                <Text style={styles.auditIcon}>{step.icon}</Text>
              </View>
              <View style={styles.auditBody}>
                <View style={styles.auditBodyTop}>
                  <Text style={styles.auditStepTitle}>{step.title}</Text>
                  <StatusChip label={step.passed ? 'Passed' : 'Failed'} tone={step.passed ? 'success' : 'error'} />
                </View>
                <Text style={styles.auditText}>{step.detail}</Text>
              </View>
            </SectionCard>
          ))}
        </View>

        <PrimaryButton
          label="View Proof for Rainfall Data"
          onPress={() => {}}
          rightSlot={<Text style={styles.rain}>🌧️</Text>}
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
  referenceLabel: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  reference: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
  },
  statusLabel: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    marginBottom: 6,
  },
  payoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  payout: {
    color: '#22C55E',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  auditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  auditTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  auditMeta: {
    color: colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  auditStep: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  auditIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  auditIcon: {
    fontSize: 17,
  },
  auditBody: {
    flex: 1,
    gap: 4,
  },
  auditBodyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  auditStepTitle: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  auditText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
  },
  rain: {
    fontSize: 18,
  },
});
