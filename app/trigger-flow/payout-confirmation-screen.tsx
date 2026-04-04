import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../src/constants/colors';

export default function PayoutConfirmationScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.successHeader}>
        <View style={styles.confettiContainer}>
          <View style={[styles.confetti, styles.c1]} />
          <View style={[styles.confetti, styles.c2]} />
          <View style={[styles.confetti, styles.c3]} />
          <View style={[styles.confetti, styles.c4]} />
          <View style={[styles.confetti, styles.c5]} />
        </View>

        <View style={styles.successCircle}>
          <View style={styles.innerCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
        </View>

        <View style={styles.statusPill}>
          <Text style={styles.statusText}>PAYOUT COMPLETE</Text>
        </View>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.amount}>₹840 Credited!</Text>
        <Text style={styles.transferInfo}>
          Transferred to <Text style={styles.email}>pranav@okicici</Text>
        </Text>
        <Text style={styles.timestamp}>Processed in 1m 47s (Today, 10:24 AM)</Text>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.receiptHeader}>
          <Text style={styles.receiptLabel}>Claim Receipt</Text>
          <Text style={styles.receiptId}>#PTR-2026-03-21-PRN</Text>
        </View>

        <View style={styles.receiptRows}>
          <View style={styles.receiptRow}>
            <Text style={styles.rowLabel}>Trigger</Text>
            <View style={styles.rowValue}>
              <Text style={styles.rowIcon}>🌧️</Text>
              <Text style={styles.rowText}>Heavy Rain</Text>
            </View>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.rowLabel}>Rain Intensity</Text>
            <Text style={styles.rowText}>44mm</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.rowLabel}>Affected Orders</Text>
            <Text style={styles.rowText}>14/18 cancelled</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.rowLabel}>Fraud Check</Text>
            <View style={styles.fraudPass}>
              <Text style={styles.passText}>PASSED</Text>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.rowLabel}>Coverage Strength</Text>
            <Text style={styles.rowText}>80% avg</Text>
          </View>

          <View style={styles.transactionRow}>
            <View style={styles.txLeft}>
              <View style={styles.txIconWrap}>
                <Text style={styles.txIcon}>🏦</Text>
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txUpi}>pranav@okicici</Text>
                <Text style={styles.txMeta}>10:24 AM  •  <Text style={styles.txSpeed}>⚡ 1m 47s</Text></Text>
              </View>
            </View>
            <Text style={styles.txAmount}>₹840</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Current Period Protection</Text>
          <Text style={styles.protectedAmount}>₹840 protected</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '65%' }]} />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => router.replace('/(tabs)/home-screen')}
          activeOpacity={0.98}
        >
          <Text style={styles.shareButtonText}>Share My Protection Story</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadIcon}>📥</Text>
          <Text style={styles.downloadText}>Download Receipt (PDF)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navLabel}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Text style={styles.navIconActive}>📋</Text>
          <Text style={styles.navLabelActive}>Claims</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🛡️</Text>
          <Text style={styles.navLabel}>Coverage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  successHeader: {
    height: 180,
    backgroundColor: '#0D2818',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  confettiContainer: {
    position: 'absolute',
    inset: 0,
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  c1: { top: 40, left: 40, backgroundColor: colors.secondaryContainer, transform: [{ rotate: '12deg' }] },
  c2: { top: 80, right: 56, backgroundColor: colors.primary, transform: [{ rotate: '-45deg' }] },
  c3: { bottom: 40, left: 80, backgroundColor: colors.tertiaryContainer, transform: [{ rotate: '30deg' }] },
  c4: { top: 128, left: 32, backgroundColor: colors.secondary, transform: [{ rotate: '12deg' }] },
  c5: { top: 48, right: 128, backgroundColor: colors.primaryContainer, transform: [{ rotate: '12deg' }] },
  
  successCircle: {
    width: 95,
    height: 95,
    borderRadius: 60,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    zIndex: 10,
    marginTop: 20,
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 46,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  statusPill: {
    marginTop: 10,
    backgroundColor: '#0D2818',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4ADE80',
    letterSpacing: 0.5,
  },
  summarySection: {
    paddingHorizontal: 24,
    marginTop: 20,
    zIndex: 20,
    alignItems: 'center',
  },
  amount: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  transferInfo: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurface,
    marginTop: 4,
  },
  email: {
    fontWeight: '700',
    color: colors.primary,
  },
  timestamp: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 8,
  },
  detailsCard: {
    marginHorizontal: 24,
    marginTop: 32,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  receiptLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  receiptId: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'monospace',
  },
  receiptRows: {
    gap: 16,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  rowValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rowIcon: {
    fontSize: 16,
  },
  rowText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  fraudPass: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    color: '#22C55E',
  },
  passText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#22C55E',
  },
  verifiedIcon: {
    fontSize: 14,
    color: '#22C55E',
  },
  transactionRow: {
    marginTop: 16,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txIcon: {
    fontSize: 16,
  },
  txInfo: {
    gap: 2,
  },
  txUpi: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  txMeta: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  txSpeed: {
    color: colors.secondary,
    fontWeight: '600',
  },
  txAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#22C55E',
    letterSpacing: -0.5,
  },
  progressSection: {
    marginHorizontal: 24,
    marginTop: 32,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  protectedAmount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#22C55E',
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
  actions: {
    marginHorizontal: 24,
    marginTop: 40,
    gap: 16,
    marginBottom: 120,
  },
  shareButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  downloadIcon: {
    fontSize: 20,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 32,
    backgroundColor: colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navItemActive: {
    backgroundColor: '#1A3C6E',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  navIcon: {
    fontSize: 24,
    color: colors.onSurfaceVariant,
  },
  navIconActive: {
    fontSize: 24,
    color: colors.primary,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  navLabelActive: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 4,
  },
});