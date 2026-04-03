import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../src/constants/colors';

export default function CoverageScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coverage</Text>
      </View>

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.currentPlan}>
          <View style={styles.planHeader}>
            <View style={styles.planBadge}>
              <Text style={styles.badgeText}>ACTIVE</Text>
            </View>
            <Text style={styles.planName}>ProtoRyde Basic</Text>
          </View>

          <View style={styles.planDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Weekly Premium</Text>
              <Text style={styles.detailValue}>₹67</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Coverage Cap</Text>
              <Text style={styles.detailValue}>₹2,300/week</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payout Speed</Text>
              <Text style={styles.detailValue}>&lt; 2 minutes</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Next Billing</Text>
              <Text style={styles.detailValue}>Monday, Mar 24</Text>
            </View>
          </View>

          <View style={styles.protectionMeter}>
            <View style={styles.meterHeader}>
              <Text style={styles.meterLabel}>Protection Used This Week</Text>
              <Text style={styles.meterValue}>₹0 / ₹2,300</Text>
            </View>
            <View style={styles.meterBar}>
              <View style={[styles.meterFill, { width: '0%' }]} />
            </View>
            <Text style={styles.meterNote}>Full protection available</Text>
          </View>
        </View>

        <View style={styles.upgradeSection}>
          <Text style={styles.sectionTitle}>Available Upgrades</Text>
          
          <TouchableOpacity style={styles.upgradeCard} activeOpacity={0.9}>
            <View style={styles.upgradeHeader}>
              <Text style={styles.upgradeName}>ProtoRyde Enhanced</Text>
              <View style={styles.upgradePrice}>
                <Text style={styles.priceText}>+₹25/week</Text>
              </View>
            </View>
            <Text style={styles.upgradeDescription}>
              Increase coverage cap to ₹5,000/week with priority support
            </Text>
            <View style={styles.upgradeFeatures}>
              <Text style={styles.feature}>✓ ₹5,000 coverage cap</Text>
              <Text style={styles.feature}>✓ Priority processing</Text>
              <Text style={styles.feature}>✓ Extended weather coverage</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Cancel Anytime</Text>
            <Text style={styles.infoText}>
              You can cancel your plan anytime. Your coverage will remain active until the end of the current billing period.
            </Text>
          </View>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 16,
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  currentPlan: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  planHeader: {
    marginBottom: 20,
  },
  planBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: 1,
  },
  planName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.onPrimary,
  },
  planDetails: {
    gap: 12,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: colors.onPrimary,
    opacity: 0.7,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onPrimary,
  },
  protectionMeter: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
  },
  meterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  meterLabel: {
    fontSize: 12,
    color: colors.onPrimary,
    opacity: 0.8,
  },
  meterValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  meterBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
  meterNote: {
    fontSize: 11,
    color: colors.onPrimary,
    opacity: 0.6,
  },
  upgradeSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
  },
  upgradeCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.secondaryContainer,
  },
  upgradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  upgradeName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  upgradePrice: {
    backgroundColor: colors.secondaryFixed + '30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondaryContainer,
  },
  upgradeDescription: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
    lineHeight: 20,
  },
  upgradeFeatures: {
    gap: 8,
  },
  feature: {
    fontSize: 13,
    color: colors.onSurface,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.surfaceContainerLow,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
});