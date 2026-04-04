import { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, SectionCard, TopBar } from '../../src/components/ui';
import { ErrorBanner } from '../../src/components/ErrorBanner';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { claimsService } from '../../src/services/claimsService';
import { policyService } from '../../src/services/policyService';
import { weatherService } from '../../src/services/weatherService';

type NotificationCategory = 'All' | 'Weather' | 'Claims' | 'Payments';

interface DynamicNotificationItem {
  id: string;
  category: Exclude<NotificationCategory, 'All'>;
  title: string;
  body: string;
  time: string;
  icon: string;
  unread?: boolean;
}

const categories: NotificationCategory[] = ['All', 'Weather', 'Claims', 'Payments'];

const formatRelativeTime = (dateValue?: string) => {
  if (!dateValue) return 'Now';
  const now = new Date();
  const then = new Date(dateValue);
  const diffMs = now.getTime() - then.getTime();

  if (Number.isNaN(then.getTime())) {
    return 'Now';
  }
  if (diffMs < 60 * 1000) {
    return 'Just now';
  }
  if (diffMs < 60 * 60 * 1000) {
    return `${Math.floor(diffMs / (60 * 1000))}m ago`;
  }
  if (diffMs < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diffMs / (60 * 60 * 1000))}h ago`;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(then);
};

const formatTriggerLabel = (triggerType: string) =>
  triggerType
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function NotificationsCenterScreen() {
  const { zone, phoneNumber, riderId } = useRider();
  const [selected, setSelected] = useState<NotificationCategory>('All');
  const riderIdentifier = phoneNumber || riderId || '';

  const {
    data: warningsData,
    loading: loadingWarnings,
    error: warningsError,
    refetch: refetchWarnings,
  } = useApiCall(
    () => weatherService.getWeatherWarnings(zone || 'HSR Layout', false),
    !!zone,
    [zone]
  );

  const {
    data: claimsData,
    loading: loadingClaims,
    error: claimsError,
    refetch: refetchClaims,
  } = useApiCall(
    () => claimsService.getRiderClaims(riderIdentifier),
    !!riderIdentifier,
    [riderIdentifier]
  );

  const {
    data: policy,
    loading: loadingPolicy,
    error: policyError,
    refetch: refetchPolicy,
  } = useApiCall(
    () => policyService.getCurrentPolicy(riderIdentifier),
    !!riderIdentifier,
    [riderIdentifier]
  );

  const notificationItems = useMemo<DynamicNotificationItem[]>(() => {
    const weatherItems: DynamicNotificationItem[] = (warningsData?.warnings ?? []).map((warning, index) => ({
      id: `weather-${warning.id || index}`,
      category: 'Weather',
      title: warning.title || 'Weather warning',
      body: warning.message || `Weather alert active in ${zone}.`,
      time: formatRelativeTime(warning.timestamp),
      icon: '⛈️',
      unread: true,
    }));

    const claimItems: DynamicNotificationItem[] = (claimsData?.claims ?? [])
      .slice(0, 8)
      .map((claim) => ({
        id: `claim-${claim.claim_id}`,
        category: 'Claims',
        title: `${formatTriggerLabel(claim.trigger_type)} claim ${claim.payout_status.toLowerCase()}`,
        body:
          claim.payout_amount > 0
            ? `Payout ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(claim.payout_amount)}.`
            : 'Claim is under review.',
        time: formatRelativeTime(claim.created_at),
        icon: '🛡️',
        unread: claim.payout_status.toLowerCase() !== 'paid',
      }));

    const paymentItems: DynamicNotificationItem[] = policy
      ? [
          {
            id: `payment-${policy.policy_id}`,
            category: 'Payments',
            title: 'Weekly premium debited',
            body: `${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(policy.final_premium)} charged for active coverage.`,
            time: formatRelativeTime(policy.week_start_date),
            icon: '💳',
            unread: false,
          },
        ]
      : [];

    return [...weatherItems, ...claimItems, ...paymentItems].sort((a, b) => {
      const order: Record<DynamicNotificationItem['category'], number> = {
        Weather: 0,
        Claims: 1,
        Payments: 2,
      };
      return order[a.category] - order[b.category];
    });
  }, [claimsData?.claims, policy, warningsData?.warnings, zone]);

  const items = useMemo(() => {
    if (selected === 'All') {
      return notificationItems;
    }
    return notificationItems.filter((item) => item.category === selected);
  }, [selected]);

  const loading = loadingWarnings || loadingClaims || loadingPolicy;
  const error = warningsError || claimsError || policyError;

  const retryAll = () => {
    refetchWarnings();
    refetchClaims();
    refetchPolicy();
  };

  return (
    <View style={styles.container}>
      <TopBar title="Notifications" onBack={() => router.back()} />
      <AppPage contentContainerStyle={styles.content}>
        <View style={styles.chipsRow}>
          {categories.map((category) => {
            const active = category === selected;
            return (
              <TouchableOpacity
                key={category}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setSelected(category)}
                activeOpacity={0.85}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{category}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {error ? <ErrorBanner message={error} onRetry={retryAll} /> : null}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading notifications...</Text>
          </View>
        ) : items.length === 0 ? (
          <SectionCard style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptyText}>Weather alerts, claims, and payment updates will appear here.</Text>
          </SectionCard>
        ) : null}

        {!loading &&
          items.map((item) => (
          <SectionCard key={item.id} style={styles.noticeCard}>
            <View style={styles.noticeIcon}>
              {item.unread ? <View style={styles.unreadDot} /> : null}
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <View style={styles.noticeBody}>
              <View style={styles.noticeHeader}>
                <Text style={styles.noticeTitle}>{item.title}</Text>
                <Text style={styles.noticeTime}>{item.time}</Text>
              </View>
              <Text style={styles.noticeText}>{item.body}</Text>
            </View>
          </SectionCard>
          ))}
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
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  chip: {
    borderRadius: 12,
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.onPrimary,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    gap: 10,
  },
  loadingText: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
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
  noticeCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  noticeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: -3,
    left: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    zIndex: 2,
    borderWidth: 2,
    borderColor: colors.surfaceContainerLowest,
  },
  iconText: {
    fontSize: 20,
  },
  noticeBody: {
    flex: 1,
    gap: 6,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  noticeTitle: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  noticeTime: {
    color: colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  noticeText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
  },
});
