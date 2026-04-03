import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, PrimaryButton, SectionCard, StatusChip } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, Pranav</Text>
          <Text style={styles.date}>Friday, April 3, 2026</Text>
        </View>
        <TouchableOpacity style={styles.avatar} onPress={() => router.push('/(tabs)/profile-screen')}>
          <Text style={styles.avatarText}>PN</Text>
        </TouchableOpacity>
      </View>

      <AppPage contentContainerStyle={styles.content}>
        <SectionCard style={styles.coverageCard}>
          <View style={styles.coverageHead}>
            <StatusChip label="Coverage Active" tone="active" />
            <TouchableOpacity onPress={() => router.push('/account/notifications-center')}>
              <Text style={styles.bell}>🔔</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.coverageTitle}>Protected until Sunday, Apr 5</Text>
          <Text style={styles.coverageSub}>This week premium: ₹67 paid</Text>
          <PrimaryButton
            label="View Trigger Readiness"
            subLabel="Weather + AQI + Branch checks"
            onPress={() => router.push('/trigger-flow/weather-alert-screen')}
            rightSlot={<Text style={styles.arrow}>→</Text>}
          />
        </SectionCard>

        <View style={styles.quickRow}>
          <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/account/weekly-ledger')}>
            <Text style={styles.quickIcon}>💳</Text>
            <Text style={styles.quickTitle}>Ledger</Text>
            <Text style={styles.quickCaption}>Weekly debits</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/account/policy-document')}>
            <Text style={styles.quickIcon}>📄</Text>
            <Text style={styles.quickTitle}>Policy</Text>
            <Text style={styles.quickCaption}>Rules & exclusions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/claims/claim-detail-fraud-audit')}>
            <Text style={styles.quickIcon}>🧾</Text>
            <Text style={styles.quickTitle}>Claim</Text>
            <Text style={styles.quickCaption}>Fraud audit</Text>
          </TouchableOpacity>
        </View>

        <SectionCard>
          <Text style={styles.sectionTitle}>Live Conditions</Text>
          <View style={styles.metricRow}>
            <View style={styles.metricCard}><Text style={styles.metricLabel}>Weather</Text><Text style={styles.metricValue}>Clear 28°C</Text><Text style={styles.metricState}>No trigger</Text></View>
            <View style={styles.metricCard}><Text style={styles.metricLabel}>AQI</Text><Text style={styles.metricValue}>Moderate 142</Text><Text style={styles.metricState}>No trigger</Text></View>
            <View style={styles.metricCard}><Text style={styles.metricLabel}>Banks</Text><Text style={styles.metricValue}>Normal</Text><Text style={styles.metricState}>No trigger</Text></View>
          </View>
        </SectionCard>

        <SectionCard>
          <View style={styles.sectionHeadRow}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => router.push('/account/notifications-center')}>
              <Text style={styles.link}>See all</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.activityRow} onPress={() => router.push('/account/weekly-ledger')}>
            <Text style={styles.activityIcon}>✅</Text>
            <View style={styles.activityBody}>
              <Text style={styles.activityTitle}>Coverage activated</Text>
              <Text style={styles.activityDate}>Mon Mar 31</Text>
            </View>
            <Text style={styles.activityAmount}>₹67 charged</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activityRow} onPress={() => router.push('/claims/claim-detail-fraud-audit')}>
            <Text style={styles.activityIcon}>🛡️</Text>
            <View style={styles.activityBody}>
              <Text style={styles.activityTitle}>Claim validated</Text>
              <Text style={styles.activityDate}>Fri Apr 03</Text>
            </View>
            <Text style={styles.activityAmount}>₹840 paid</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  greeting: {
    color: colors.primary,
    fontSize: 21,
    fontWeight: '800',
  },
  date: {
    marginTop: 2,
    color: colors.onSurfaceVariant,
    fontSize: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  content: {
    paddingTop: 4,
  },
  coverageCard: {
    backgroundColor: colors.primaryContainer,
    gap: 10,
  },
  coverageHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bell: {
    fontSize: 18,
  },
  coverageTitle: {
    color: colors.onPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  coverageSub: {
    color: colors.onPrimaryContainer,
    fontSize: 13,
    marginBottom: 4,
  },
  arrow: {
    color: colors.onPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    backgroundColor: colors.surfaceContainerLow,
  },
  quickIcon: {
    fontSize: 18,
    marginBottom: 8,
  },
  quickTitle: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  quickCaption: {
    color: colors.onSurfaceVariant,
    fontSize: 10,
    marginTop: 2,
  },
  sectionTitle: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 10,
    padding: 10,
  },
  metricLabel: {
    color: colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  metricValue: {
    color: colors.onSurface,
    fontSize: 12,
    fontWeight: '700',
  },
  metricState: {
    color: colors.secondary,
    fontSize: 10,
    marginTop: 2,
  },
  sectionHeadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  link: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  activityIcon: {
    fontSize: 16,
    width: 20,
  },
  activityBody: {
    flex: 1,
  },
  activityTitle: {
    color: colors.onSurface,
    fontSize: 13,
    fontWeight: '600',
  },
  activityDate: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
  },
  activityAmount: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});
