import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../src/constants/colors';

export default function WeatherAlertScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather Update</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.alertCard}>
          <View style={styles.cardContent}>
            <View style={styles.riskBadge}>
              <Text style={styles.riskIcon}>⚠️</Text>
              <Text style={styles.riskText}>HIGH RISK  •  FRI, MAR 21</Text>
            </View>

            <Text style={styles.headline}>
              Heavy Rain Predicted in HSR Layout
            </Text>

            <View style={styles.impactChip}>
              <Text style={styles.impactChipText}>📉  High Impact on Earnings</Text>
            </View>

            {/* Rainfall Threshold Progress Bar */}
            <View style={styles.progressSection}>
              <Text style={styles.progressTitle}>Rainfall Forecast:</Text>
              <View style={styles.progressBarWrapper}>
                <View style={styles.progressBarTrack}>
                  <View style={styles.progressBarFillSafe} />
                  <View style={styles.progressBarFillDanger} />
                </View>
                {/* Trigger divider line + label, outside track so it can overflow */}
                <View style={styles.triggerMarker} />
                <Text style={styles.endLabel}>74mm</Text>
                <Text style={styles.triggerMarkerLabel}>Trigger (30mm)</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Trigger</Text>
                <Text style={styles.statValue}>30mm</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Predicted</Text>
                <Text style={[styles.statValue, styles.dangerValue]}>74mm</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Coverage</Text>
                <Text style={styles.statValue}>₹2,300</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.payoutProjection}>
              <Text style={styles.projectionLabel}>If trigger fires tomorrow, you receive:</Text>
              <Text style={styles.projectionAmount}>₹840</Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.upgradeButton}
                onPress={() => router.push('/trigger-flow/active-trigger-screen')}
                activeOpacity={0.95}
              >
                <Text style={styles.upgradeText}>Upgrade to Enhanced Cover (+₹25)</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.stayButton}
                onPress={() => router.push('/trigger-flow/active-trigger-screen')}
                activeOpacity={0.95}
              >
                <Text style={styles.stayText}>Stay on ₹67 Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          You'll be automatically notified if weather conditions change. Payouts are credited instantly to your linked UPI account upon trigger verification.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: colors.surface,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  spacer: {
    width: 120,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 60,
    paddingBottom: 24,
  },
  alertCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  riskIcon: {
    fontSize: 14,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSecondaryFixed,
    letterSpacing: 1,
  },
  cardContent: {
    padding: 24,
    gap: 16,
  },
  headline: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  impactChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
  },
  impactChipText: {
    color: '#FCA5A5',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  progressSection: {
    gap: 12,
  },
  progressTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressBarWrapper: {
    position: 'relative',
    paddingBottom: 20, // space for the trigger label below
  },
  progressBarTrack: {
    height: 14,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 7,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressBarFillSafe: {
    width: '40.5%', // 30/74 ≈ 40.5%
    backgroundColor: colors.primary,
  },
  progressBarFillDanger: {
    flex: 1,
    backgroundColor: '#EF4444',
  },
  triggerMarker: {
    position: 'absolute',
    left: '40.5%',
    top: -4,
    bottom: 16,
    width: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    zIndex: 2,
  },
  endLabel: {
    position: 'absolute',
    right: 0,
    top: -18,
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
  },
  triggerMarkerLabel: {
    position: 'absolute',
    left: '40.5%',
    bottom: 0,
    fontSize: 10,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginLeft: -2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelLeft: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  progressLabelRight: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceContainerLow,
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  statItem: {
    flex: 1,
    gap: 6,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  dangerValue: {
    color: colors.error,
  },
  payoutProjection: {
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  projectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  projectionAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#22C55E',
    letterSpacing: -1,
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
  },
  upgradeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  upgradeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  stayButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 16,
    borderRadius: 12,
  },
  stayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D1D5DB',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: -20,
    paddingHorizontal: 16,
    opacity: 0.6,
  },
});