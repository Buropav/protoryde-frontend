import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, PrimaryButton, SectionCard, StatusChip } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { policyService } from '../../src/services/policyService';
import { weatherService } from '../../src/services/weatherService';
import { mockDataService } from '../../src/services/mockDataService';

export default function HomeScreen() {
  const { riderName, phoneNumber, zone } = useRider();

  const { 
    data: policy, 
    loading: loadingPolicy, 
    error: policyError 
  } = useApiCall(
    () => policyService.getCurrentPolicy(phoneNumber || ''),
    !!phoneNumber,
    [phoneNumber]
  );

  const { 
    data: weather, 
    loading: loadingWeather, 
    error: weatherError 
  } = useApiCall(
    () => weatherService.getCurrentWeather(zone || 'HSR Layout', false),
    !!zone,
    [zone]
  );

  const { 
    data: branchMetrics, 
    loading: loadingBranches, 
    error: branchError 
  } = useApiCall(
    () => mockDataService.getBranchMetrics(zone || 'HSR Layout'),
    !!zone,
    [zone]
  );

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const getAqiLabel = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy';
    if (aqi <= 200) return 'Very Unhealthy';
    return 'Hazardous';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, {riderName || 'Rider'}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <TouchableOpacity style={styles.avatar} onPress={() => router.push('/(tabs)/profile-screen')}>
          <Text style={styles.avatarText}>
            {riderName ? riderName.split(' ').map(n => n[0]).join('').toUpperCase() : 'PN'}
          </Text>
        </TouchableOpacity>
      </View>

      <AppPage contentContainerStyle={styles.content}>
        <View style={styles.coverageCard}>
          <View style={styles.coverageHead}>
            <View style={[
              styles.activeBadge, 
              (!policy || policy.status !== 'active') && styles.inactiveBadge
            ]}>
              <View style={[
                styles.activeDot, 
                (!policy || policy.status !== 'active') && styles.inactiveDot
              ]} />
              <Text style={[
                styles.activeBadgeText, 
                (!policy || policy.status !== 'active') && styles.inactiveBadgeText
              ]}>
                {policy?.status === 'active' ? 'COVERAGE ACTIVE' : 'NO ACTIVE COVERAGE'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/account/notifications-center')}>
              <Text style={styles.bell}>🔔</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coverageBody}>
            <Text style={styles.coverageLabel}>Valid till</Text>
            <Text style={styles.coverageTitle}>
              {policy?.week_end_date 
                ? new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date(policy.week_end_date))
                : '--'}
            </Text>
            <Text style={styles.coverageSub}>
              This week premium: <Text style={styles.coverageHighlight}>₹{policy?.final_premium ?? '--'} paid</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.triggerButton}
            activeOpacity={0.85}
            onPress={() => router.push('/trigger-flow/weather-alert-screen')}
          >
            <View>
              <Text style={styles.triggerButtonLabel}>View Trigger Readiness</Text>
              <Text style={styles.triggerButtonSub}>Weather + AQI + Branch checks</Text>
            </View>
            <Text style={styles.triggerArrow}>→</Text>
          </TouchableOpacity>
        </View>

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
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Weather</Text>
              <Text style={styles.metricValue}>
                {weather?.conditions ? `${weather.conditions.description} ${weather.conditions.temp_c}°C` : '--'}
              </Text>
              <Text style={[
                styles.metricState,
                weather?.trigger_view?.rain_24h_mm?.breached && styles.metricStateActive
              ]}>
                {weather?.trigger_view?.rain_24h_mm?.breached ? '⚠️ Active' : 'No trigger'}
              </Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>AQI</Text>
              <Text style={styles.metricValue}>
                {weather?.conditions ? `${getAqiLabel(weather.conditions.aqi)} ${weather.conditions.aqi}` : '--'}
              </Text>
              <Text style={[
                styles.metricState,
                weather?.trigger_view?.aqi?.breached && styles.metricStateActive
              ]}>
                {weather?.trigger_view?.aqi?.breached ? '⚠️ Active' : 'No trigger'}
              </Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Banks</Text>
              <Text style={styles.metricValue}>
                {branchMetrics ? (branchMetrics.closure_rate_pct > 0 ? `${branchMetrics.closure_rate_pct}% Closed` : 'Normal') : '--'}
              </Text>
              <Text style={[
                styles.metricState,
                branchMetrics?.trigger_breached && styles.metricStateActive
              ]}>
                {branchMetrics?.trigger_breached ? '⚠️ Active' : 'No trigger'}
              </Text>
            </View>
          </View>
        </SectionCard>

        <SectionCard>
          <View style={styles.sectionHeadRow}>
            <Text style={styles.sectionTitle}>Notifications</Text>
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
  inactiveBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  inactiveDot: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
  },
  inactiveBadgeText: {
    color: '#EF4444',
  },
  content: {
    paddingTop: 4,
  },
  coverageCard: {
    backgroundColor: '#0D1B2A',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: 18,
    gap: 16,
  },
  coverageHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#34D399',
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  activeBadgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  bell: {
    fontSize: 18,
  },
  coverageBody: {
    gap: 2,
  },
  coverageLabel: {
    color: '#6B7F99',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  coverageTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  coverageSub: {
    color: '#6B7F99',
    fontSize: 13,
    marginTop: 4,
  },
  coverageHighlight: {
    color: '#4A9EFF',
    fontWeight: '700',
  },
  triggerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(74, 158, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(74, 158, 255, 0.25)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  triggerButtonLabel: {
    color: '#4A9EFF',
    fontSize: 14,
    fontWeight: '700',
  },
  triggerButtonSub: {
    color: '#5A7A9C',
    fontSize: 11,
    marginTop: 2,
  },
  triggerArrow: {
    color: '#4A9EFF',
    fontSize: 20,
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
  metricStateActive: {
    color: '#EF4444',
    fontWeight: '700',
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
