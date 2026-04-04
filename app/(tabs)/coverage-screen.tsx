import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, SectionCard, StatusChip } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { policyService } from '../../src/services/policyService';

export default function CoverageScreen() {
  const { phoneNumber } = useRider();
  
  const { 
    data: policy, 
    loading: loadingPolicy, 
    error: policyError 
  } = useApiCall(
    () => policyService.getCurrentPolicy(phoneNumber || ''),
    !!phoneNumber,
    [phoneNumber]
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coverage</Text>
      </View>

      <AppPage>
        <SectionCard style={styles.currentPlan}>
          <View style={styles.planHead}>
            <StatusChip 
              label={policy?.status || 'No Policy'} 
              tone={policy?.status === 'active' ? 'success' : 'warning'} 
            />
            <Text style={styles.planName}>ProtoRyde Basic</Text>
          </View>
          <View style={styles.planRows}>
            <View style={styles.row}><Text style={styles.rowLabel}>Weekly Premium</Text><Text style={styles.rowValue}>₹67</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Coverage Cap</Text><Text style={styles.rowValue}>₹2,300/week</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Payout Speed</Text><Text style={styles.rowValue}>under 2 minutes</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Next Billing</Text><Text style={styles.rowValue}>Monday, Apr 6</Text></View>
          </View>

          <View style={styles.meterBlock}>
            <View style={styles.row}><Text style={styles.rowLabel}>Protection Used This Week</Text><Text style={styles.rowValue}>₹0 / ₹2,300</Text></View>
            <View style={styles.meterTrack}><View style={styles.meterFill} /></View>
          </View>
        </SectionCard>

        <SectionCard>
          <Text style={styles.sectionTitle}>Policy & Documents</Text>
          <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/account/policy-document')}>
            <View>
              <Text style={styles.actionTitle}>Policy Document</Text>
              <Text style={styles.actionSub}>Trigger definitions, legal terms, exclusions</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/account/weekly-ledger')}>
            <View>
              <Text style={styles.actionTitle}>Weekly Ledger</Text>
              <Text style={styles.actionSub}>Premium debits and claim history summary</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </SectionCard>

        <SectionCard>
          <Text style={styles.sectionTitle}>Available Upgrades</Text>
          <View style={styles.upgradeCard}>
            <View style={styles.upgradeHead}>
              <Text style={styles.upgradeName}>ProtoRyde Enhanced</Text>
              <Text style={styles.upgradePrice}>+₹25/week</Text>
            </View>
            <Text style={styles.feature}>• ₹5,000 coverage cap</Text>
            <Text style={styles.feature}>• Priority processing</Text>
            <Text style={styles.feature}>• Extended weather coverage</Text>
          </View>
        </SectionCard>

      </AppPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  currentPlan: {
    backgroundColor: colors.primaryContainer,
    gap: 12,
  },
  planHead: {
    gap: 8,
  },
  planName: {
    color: colors.onPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  planRows: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  rowLabel: {
    color: colors.onPrimaryContainer,
    fontSize: 12,
  },
  rowValue: {
    color: colors.onPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  meterBlock: {
    marginTop: 4,
    backgroundColor: colors.surface + '33',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  meterTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.onPrimary + '22',
    overflow: 'hidden',
  },
  meterFill: {
    width: '0%',
    height: '100%',
    backgroundColor: '#1DD460',
  },
  sectionTitle: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  actionRow: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  actionTitle: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  actionSub: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    marginTop: 2,
  },
  chevron: {
    color: colors.onSurfaceVariant,
    fontSize: 22,
    marginLeft: 12,
  },
  upgradeCard: {
    borderRadius: 12,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.secondary + '50',
    padding: 14,
    gap: 6,
  },
  upgradeHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upgradeName: {
    color: colors.onSurface,
    fontSize: 15,
    fontWeight: '700',
  },
  upgradePrice: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  feature: {
    color: colors.onSurface,
    fontSize: 12,
  },
});
