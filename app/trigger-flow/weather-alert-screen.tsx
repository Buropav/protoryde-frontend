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
        <Text style={styles.headerTitle}>Weather Alert</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.alertCard}>
          <View style={styles.cardContent}>
            <View style={styles.riskBadge}>
              <Text style={styles.riskIcon}>⚠️</Text>
              <Text style={styles.riskText}>HIGH RISK TOMORROW</Text>
            </View>

            <Text style={styles.headline}>
              Heavy Rain Predicted in HSR Layout
            </Text>
            <Text style={styles.description}>
              Our radar indicates <Text style={styles.bold}>68–82mm</Text> rain expected Friday, Mar 21. Your earnings might be affected.
            </Text>

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
                <Text style={styles.upgradeText}>Upgrade to Enhanced Cover  •  +₹25</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.stayButton}
                onPress={() => router.push('/trigger-flow/active-trigger-screen')}
                activeOpacity={0.95}
              >
                <Text style={styles.stayText}>I'm Good — Stay on ₹67 Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          You'll be automatically notified if conditions change. Payouts are credited instantly to your ProtoRyde wallet upon trigger verification.
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
    paddingTop: 60,
    paddingBottom: 16,
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
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  spacer: {
    width: 40,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
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
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '700',
    color: colors.primary,
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
    paddingHorizontal: 16,
    opacity: 0.6,
  },
});