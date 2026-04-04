import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { AppPage, SectionCard } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { claimsService } from '../../src/services/claimsService';

export default function ClaimsListScreen() {
  const { phoneNumber, zone } = useRider();
  
  const { 
    data: claimsData, 
    loading: loadingClaims, 
    error: claimsError 
  } = useApiCall(
    () => claimsService.getRiderClaims(phoneNumber || ''),
    !!phoneNumber,
    [phoneNumber]
  );

  const claims = claimsData?.claims || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Claims</Text>
      </View>

      <AppPage>
        {loadingClaims ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Fetching your claims...</Text>
          </View>
        ) : (
          <>
            {claims.length > 0 ? (
              claims.map((claim) => (
                <TouchableOpacity
                  key={claim.claim_id}
                  onPress={() => router.push({
                    pathname: '/claims/claim-detail-fraud-audit',
                    params: { claim_id: claim.claim_id }
                  })}
                  activeOpacity={0.85}
                >
                  <SectionCard>
                    <View style={styles.claimHead}>
                      <Text style={styles.claimTitle}>
                        {claim.trigger_type.replace(/_/g, ' ')} - {zone}
                      </Text>
                      <Text style={styles.status}>{claim.payout_status}</Text>
                    </View>
                    <View style={styles.claimMeta}>
                      <Text style={styles.claimDate}>
                        {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(claim.created_at))}
                      </Text>
                      <Text style={styles.claimPayout}>₹{claim.payout_amount}</Text>
                    </View>
                    <Text style={styles.openLink}>Open claim details and fraud audit →</Text>
                  </SectionCard>
                </TouchableOpacity>
              ))
            ) : (
              <SectionCard style={styles.emptyCard}>
                <Text style={styles.emptyIcon}>📂</Text>
                <Text style={styles.emptyTitle}>No claims yet</Text>
                <Text style={styles.emptyText}>
                  Your claims will appear here once a trigger condition is met in your zone.
                </Text>
              </SectionCard>
            )}
          </>
        )}

        <SectionCard style={styles.infoCard}>
          <Text style={styles.infoTitle}>How Claims Work</Text>
          <Text style={styles.infoText}>
            ProtoRyde automatically detects trigger conditions in your delivery zone and processes claims instantly after fraud-layer validation.
          </Text>
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
    paddingBottom: 12,
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  claimHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  claimTitle: {
    color: colors.onSurface,
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  status: {
    color: colors.secondary,
    backgroundColor: colors.secondary + '22',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: colors.onSurfaceVariant,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
    backgroundColor: colors.surfaceVariant + '33',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  claimMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  claimDate: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
  },
  claimPayout: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  openLink: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: colors.primaryFixed + '22',
  },
  infoTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
  },
});
