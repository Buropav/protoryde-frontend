import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, PrimaryButton, SectionCard, StatusChip, TopBar } from '../../src/components/ui';
import { ErrorBanner } from '../../src/components/ErrorBanner';
import { colors } from '../../src/constants/colors';
import { useApiCall } from '../../src/hooks/useApiCall';
import { useRider } from '../../src/hooks/useRider';
import { claimsService } from '../../src/services/claimsService';
import { policyService } from '../../src/services/policyService';

interface LedgerRow {
  id: string;
  weekLabel: string;
  status: 'Active' | 'Expired';
  basePremium: number;
  loyaltyDiscount: number;
  netPaid: number;
  claimCount: number;
  claimLabel?: string;
  firstClaimId?: string;
}

const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

const formatWeekLabel = (weekStartDate: string, weekEndDate: string, isActive: boolean) => {
  const start = new Date(weekStartDate);
  const end = new Date(weekEndDate);
  const range = `${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(start)} - ${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(end)}`;
  return isActive ? `${range} (Current)` : range;
};

const formatTriggerLabel = (triggerType: string) =>
  triggerType
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function WeeklyLedgerScreen() {
  const { phoneNumber, riderId } = useRider();
  const riderIdentifier = phoneNumber || riderId || '';

  const {
    data: historyData,
    loading: loadingHistory,
    error: historyError,
    refetch: refetchHistory,
  } = useApiCall(() => policyService.getPolicyHistory(riderIdentifier), !!riderIdentifier, [riderIdentifier]);

  const {
    data: claimsData,
    loading: loadingClaims,
    error: claimsError,
    refetch: refetchClaims,
  } = useApiCall(() => claimsService.getRiderClaims(riderIdentifier), !!riderIdentifier, [riderIdentifier]);

  const ledgerRows = useMemo<LedgerRow[]>(() => {
    const policies = historyData?.policies ?? [];
    const claims = claimsData?.claims ?? [];

    return [...policies]
      .sort((a, b) => new Date(b.week_start_date).getTime() - new Date(a.week_start_date).getTime())
      .map((policy) => {
        const startDate = new Date(policy.week_start_date);
        const endDate = new Date(policy.week_end_date);
        const claimsForWeek = claims.filter((claim) => {
          const claimDate = new Date(claim.created_at);
          return claimDate >= startDate && claimDate <= endDate;
        });

        return {
          id: policy.policy_id,
          weekLabel: formatWeekLabel(policy.week_start_date, policy.week_end_date, policy.status === 'active'),
          status: policy.status === 'active' ? 'Active' : 'Expired',
          basePremium: policy.base_premium,
          loyaltyDiscount: policy.final_premium - policy.base_premium,
          netPaid: policy.final_premium,
          claimCount: claimsForWeek.length,
          claimLabel: claimsForWeek[0] ? formatTriggerLabel(claimsForWeek[0].trigger_type) : undefined,
          firstClaimId: claimsForWeek[0]?.claim_id,
        };
      });
  }, [claimsData?.claims, historyData?.policies]);

  const lifetimeProtected = ledgerRows.reduce((sum, row) => sum + row.netPaid, 0);
  const isLoading = loadingHistory || loadingClaims;
  
  const getErrorMessage = () => {
    if (historyError) {
      return historyError.userMessage;
    }
    if (claimsError) {
      return claimsError.userMessage;
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  const handleRetry = () => {
    refetchHistory();
    refetchClaims();
  };

  return (
    <View style={styles.container}>
      <TopBar title="Ledger" onBack={() => router.back()} />
      <AppPage contentContainerStyle={styles.content}>
        {errorMessage ? <ErrorBanner message={errorMessage} onRetry={handleRetry} /> : null}

        <SectionCard style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Protected</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalValue}>{formatCurrency(lifetimeProtected)}</Text>
            <Text style={styles.totalSubValue}>Lifetime</Text>
          </View>
        </SectionCard>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading weekly ledger...</Text>
          </View>
        ) : ledgerRows.length > 0 ? (
          ledgerRows.map((entry) => (
            <View key={entry.id} style={styles.weekBlock}>
              <View style={styles.weekHead}>
                <Text style={styles.weekTitle}>{entry.weekLabel}</Text>
                <StatusChip
                  label={entry.status}
                  tone={entry.status === 'Active' ? 'active' : 'default'}
                />
              </View>
              <SectionCard>
                <View style={styles.lineItem}>
                  <Text style={styles.lineLabel}>Base Premium</Text>
                  <Text style={styles.lineValue}>{formatCurrency(entry.basePremium)}</Text>
                </View>
                <View style={styles.lineItem}>
                  <Text style={styles.lineLabel}>Loyalty Discount</Text>
                  <Text style={[styles.lineValue, entry.loyaltyDiscount < 0 && styles.negative]}>
                    {entry.loyaltyDiscount < 0 ? '-' : '+'}
                    {' '}
                    {formatCurrency(Math.abs(entry.loyaltyDiscount))}
                  </Text>
                </View>
                {entry.claimCount > 0 ? (
                  <TouchableOpacity
                    style={styles.claimRow}
                    onPress={() =>
                      router.push({
                        pathname: '/claims/claim-detail-fraud-audit',
                        params: entry.firstClaimId ? { claim_id: entry.firstClaimId } : undefined,
                      })
                    }
                    activeOpacity={0.85}
                  >
                    <View>
                      <Text style={styles.claimTitle}>Claim Recorded</Text>
                      <Text style={styles.claimCaption}>{entry.claimLabel || 'Weather Trigger'}</Text>
                    </View>
                    <Text style={styles.claimLink}>
                      {entry.claimCount} {entry.claimCount === 1 ? 'Claim' : 'Claims'} →
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <View style={[styles.lineItem, styles.netItem]}>
                  <View>
                    <Text style={styles.netLabel}>Net Paid</Text>
                    <Text style={styles.netCaption}>Charged via Wallet</Text>
                  </View>
                  <Text style={styles.netValue}>{formatCurrency(entry.netPaid)}</Text>
                </View>
              </SectionCard>
            </View>
          ))
        ) : (
          <SectionCard style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No ledger entries yet</Text>
            <Text style={styles.emptyText}>Activate coverage to start tracking weekly premiums and claim activity.</Text>
          </SectionCard>
        )}

        <PrimaryButton
          label="Download Full Annual Ledger"
          onPress={() => {}}
          rightSlot={<Text style={styles.downloadIcon}>↓</Text>}
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
  totalCard: {
    backgroundColor: colors.primaryContainer,
  },
  totalLabel: {
    color: colors.onPrimaryContainer,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  totalRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  totalValue: {
    color: colors.onPrimary,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 34,
  },
  totalSubValue: {
    color: colors.onPrimaryContainer,
    fontSize: 12,
  },
  weekBlock: {
    gap: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    gap: 12,
  },
  loadingText: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
  },
  weekHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekTitle: {
    color: colors.onSurface,
    fontSize: 17,
    fontWeight: '700',
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lineLabel: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
  },
  lineValue: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  negative: {
    color: colors.secondary,
  },
  claimRow: {
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  claimTitle: {
    color: colors.onSurface,
    fontSize: 13,
    fontWeight: '700',
  },
  claimCaption: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
  },
  claimLink: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  netItem: {
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingTop: 10,
    marginBottom: 0,
  },
  netLabel: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  netCaption: {
    color: colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  netValue: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: '800',
  },
  downloadIcon: {
    color: colors.onPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 28,
    gap: 8,
  },
  emptyTitle: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
