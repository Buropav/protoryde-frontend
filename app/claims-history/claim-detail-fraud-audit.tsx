import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { AppPage, PrimaryButton, SectionCard, StatusChip, TopBar } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { claimsService } from '../../src/services/claimsService';

export default function ClaimDetailFraudAuditScreen() {
  const { claim_id } = useLocalSearchParams<{ claim_id: string }>();
  const { phoneNumber } = useRider();

  const { 
    data: claimsData, 
    loading, 
    error 
  } = useApiCall(
    () => claimsService.getRiderClaims(phoneNumber || ''),
    !!phoneNumber,
    [phoneNumber]
  );

  const claim = claimsData?.claims.find(c => c.claim_id === claim_id);

  const getAuditStepInfo = (layerKey: string) => {
    switch (layerKey) {
      case 'L1_WEATHER_THRESHOLD':
        return { title: 'Weather Threshold Check', icon: '🌧️' };
      case 'L2_ZONE_PRESENCE':
        return { title: 'Zone Presence Verification', icon: '📍' };
      case 'L3_DELHIVERY_CROSS_REF':
        return { title: 'Delhivery Cross-Reference', icon: '🔁' };
      case 'L4_BRANCH_CLOSURE_CHECK':
        return { title: 'Branch Closure Check', icon: '🏦' };
      default:
        return { title: layerKey.replace(/_/g, ' '), icon: '🛡️' };
    }
  };

  return (
    <View style={styles.container}>
      <TopBar title="Claim Details" onBack={() => router.back()} />
      <AppPage contentContainerStyle={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Verifying fraud audit logs...</Text>
          </View>
        ) : (
          <>
            <SectionCard>
              <Text style={styles.referenceLabel}>Reference ID</Text>
              <Text style={styles.reference}>#{claim_id || '---'}</Text>
              <View style={styles.statusRow}>
                <View>
                  <Text style={styles.statusLabel}>Payout Status</Text>
                  <View style={styles.payoutRow}>
                    <Text style={styles.payout}>₹{claim?.payout_amount ?? '---'}</Text>
                    <StatusChip 
                      label={claim?.payout_status || 'Processing'} 
                      tone={claim?.payout_status === 'validated' ? 'success' : claim?.payout_status === 'rejected' ? 'error' : 'warning'} 
                    />
                  </View>
                </View>
              </View>
            </SectionCard>

            <View>
              <View style={styles.auditHeader}>
                <Text style={styles.auditTitle}>Fraud Audit Trail</Text>
                <Text style={styles.auditMeta}>System Validated</Text>
              </View>
              {claim?.fraud_layers.map((layer, index) => {
                const info = getAuditStepInfo(layer.layer);
                return (
                  <SectionCard key={index} style={styles.auditStep}>
                    <View style={styles.auditIconWrap}>
                      <Text style={styles.auditIcon}>{info.icon}</Text>
                    </View>
                    <View style={styles.auditBody}>
                      <View style={styles.auditBodyTop}>
                        <Text style={styles.auditStepTitle}>{info.title}</Text>
                        <StatusChip label={layer.passed ? 'Passed' : 'Failed'} tone={layer.passed ? 'success' : 'error'} />
                      </View>
                      <Text style={styles.auditText}>{layer.reason}</Text>
                    </View>
                  </SectionCard>
                );
              })}
            </View>

            <PrimaryButton
              label="View Proof for Rainfall Data 🌧️"
              onPress={() => {}}
            />
          </>
        )}
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
  loadingContainer: {
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    color: colors.onSurfaceVariant,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
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
});
