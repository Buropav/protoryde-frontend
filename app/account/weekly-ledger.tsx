import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, PrimaryButton, SectionCard, StatusChip, TopBar } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { weeklyLedgerEntries } from '../../src/data/prototype-data';

export default function WeeklyLedgerScreen() {
  return (
    <View style={styles.container}>
      <TopBar title="Ledger" onBack={() => router.back()} />
      <AppPage contentContainerStyle={styles.content}>
        <SectionCard style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Protected</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalValue}>₹2,520</Text>
            <Text style={styles.totalSubValue}>Lifetime</Text>
          </View>
        </SectionCard>

        {weeklyLedgerEntries.map((entry) => (
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
                <Text style={styles.lineValue}>₹{entry.basePremium}</Text>
              </View>
              <View style={styles.lineItem}>
                <Text style={styles.lineLabel}>Loyalty Discount</Text>
                <Text style={[styles.lineValue, entry.loyaltyDiscount < 0 && styles.negative]}>
                  {entry.loyaltyDiscount < 0 ? '-' : ''} ₹{Math.abs(entry.loyaltyDiscount)}
                </Text>
              </View>
              {entry.claimCount ? (
                <TouchableOpacity
                  style={styles.claimRow}
                  onPress={() => router.push('/claims/claim-detail-fraud-audit')}
                  activeOpacity={0.85}
                >
                  <View>
                    <Text style={styles.claimTitle}>Claim Recorded</Text>
                    <Text style={styles.claimCaption}>{entry.claimLabel}</Text>
                  </View>
                  <Text style={styles.claimLink}>{entry.claimCount} Claim →</Text>
                </TouchableOpacity>
              ) : null}
              <View style={[styles.lineItem, styles.netItem]}>
                <View>
                  <Text style={styles.netLabel}>Net Paid</Text>
                  <Text style={styles.netCaption}>Charged via Wallet</Text>
                </View>
                <Text style={styles.netValue}>₹{entry.netPaid}</Text>
              </View>
            </SectionCard>
          </View>
        ))}

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
});
