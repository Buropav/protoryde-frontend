import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, SectionCard } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { claimsService } from '../../src/services/claimsService';

const mockClaims = [
  {
    id: 'c1',
    title: 'Rainfall Trigger - HSR Layout',
    date: 'Apr 03, 2026',
    payout: '₹840',
    status: 'PAID',
  },
  {
    id: 'c2',
    title: 'Platform Advisory Trigger',
    date: 'Mar 22, 2026',
    payout: '₹590',
    status: 'PAID',
  },
];

export default function ClaimsListScreen() {
  const { phoneNumber } = useRider();
  
  const { 
    data: claimsData, 
    loading: loadingClaims, 
    error: claimsError 
  } = useApiCall(
    () => claimsService.getRiderClaims(phoneNumber || ''),
    !!phoneNumber,
    [phoneNumber]
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Claims</Text>
      </View>

      <AppPage>
        {mockClaims.map((claim) => (
          <TouchableOpacity
            key={claim.id}
            onPress={() => router.push('/claims/claim-detail-fraud-audit')}
            activeOpacity={0.85}
          >
            <SectionCard>
              <View style={styles.claimHead}>
                <Text style={styles.claimTitle}>{claim.title}</Text>
                <Text style={styles.status}>{claim.status}</Text>
              </View>
              <View style={styles.claimMeta}>
                <Text style={styles.claimDate}>{claim.date}</Text>
                <Text style={styles.claimPayout}>{claim.payout}</Text>
              </View>
              <Text style={styles.openLink}>Open claim details and fraud audit →</Text>
            </SectionCard>
          </TouchableOpacity>
        ))}

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
