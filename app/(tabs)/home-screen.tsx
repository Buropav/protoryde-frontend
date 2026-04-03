import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../src/constants/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, Pranav 👋</Text>
          <Text style={styles.date}>Thursday, March 20, 2026</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>PN</Text>
        </View>
      </View>

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity 
          style={styles.coverageCard}
          onPress={() => router.push('/trigger-flow/weather-alert-screen')}
          activeOpacity={0.9}
        >
          <View style={styles.coverageHeader}>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>COVERAGE ACTIVE</Text>
            </View>
          </View>

          <View style={styles.shieldSection}>
            <Text style={styles.shieldIcon}>🛡️</Text>
            <Text style={styles.coverageText}>Protected until Sunday, Mar 22</Text>
          </View>

          <View style={styles.premiumRow}>
            <Text style={styles.premiumLabel}>This week's premium</Text>
            <Text style={styles.premiumValue}>₹67 paid</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.conditionsRow}>
          <View style={styles.conditionCard}>
            <View style={styles.conditionHeader}>
              <View style={[styles.conditionDot, { backgroundColor: '#22C55E' }]} />
              <Text style={styles.conditionLabel}>Weather</Text>
            </View>
            <Text style={styles.conditionValue}>Clear 28°C</Text>
            <Text style={styles.conditionStatus}>No trigger</Text>
          </View>

          <View style={styles.conditionCard}>
            <View style={styles.conditionHeader}>
              <View style={[styles.conditionDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.conditionLabel}>AQI</Text>
            </View>
            <Text style={styles.conditionValue}>Mod. 142</Text>
            <Text style={styles.conditionStatus}>No trigger</Text>
          </View>

          <View style={styles.conditionCard}>
            <View style={styles.conditionHeader}>
              <View style={[styles.conditionDot, { backgroundColor: '#22C55E' }]} />
              <Text style={styles.conditionLabel}>Banks</Text>
            </View>
            <Text style={styles.conditionValue}>Normal</Text>
            <Text style={styles.conditionStatus}>No trigger</Text>
          </View>
        </View>

        <View style={styles.earningsCard}>
          <Text style={styles.cardTitle}>This Week's Earnings</Text>
          <View style={styles.earningsRow}>
            <Text style={styles.earningsValue}>₹4,840</Text>
            <Text style={styles.earningsTarget}>/₹6,500 target</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.dailyEarnings}>
            <Text style={styles.dailyText}>Mon <Text style={styles.dayValue}>₹1,020</Text></Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.dailyText}>Tue <Text style={styles.dayValue}>₹980</Text></Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.dailyText}>Wed <Text style={styles.dayValue}>₹1,120</Text></Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.ongoing}>Thu ongoing</Text>
          </View>
        </View>

        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityList}>
            <View style={styles.activityRow}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>✓</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Coverage activated</Text>
                <Text style={styles.activityDate}>Mon Mar 16</Text>
              </View>
              <Text style={styles.activityAmount}>₹67 charged</Text>
            </View>

            <View style={styles.activityRow}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>🛡️</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Policy renewed</Text>
                <Text style={styles.activityDate}>Mon Mar 16</Text>
              </View>
              <Text style={styles.activityAuto}>Auto-renewed</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: 'rgba(15,20,25,0.85)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  date: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginTop: 2,
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
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  mainContent: {
    flex: 1,
    marginTop: 88,
    paddingHorizontal: 16,
  },
  coverageCard: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  coverageHeader: {
    marginBottom: 24,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: 1,
  },
  shieldSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  shieldIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  coverageText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onPrimary,
    opacity: 0.9,
  },
  premiumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  premiumLabel: {
    fontSize: 12,
    color: colors.onPrimary,
    opacity: 0.7,
  },
  premiumValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondaryContainer,
  },
  conditionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  conditionCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  conditionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  conditionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  conditionValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  conditionStatus: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    opacity: 0.6,
  },
  earningsCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  earningsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 16,
  },
  earningsValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  earningsTarget: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    width: '74%',
    height: '100%',
    backgroundColor: colors.secondaryContainer,
    borderRadius: 4,
  },
  dailyEarnings: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: 11,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    gap: 4,
  },
  dayValue: {
    fontWeight: '700',
    color: colors.primary,
  },
  dailyText: {
    color: colors.onSurfaceVariant,
  },
  separator: {
    opacity: 0.3,
    color: colors.onSurfaceVariant,
  },
  ongoing: {
    color: colors.secondary,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  activitySection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  activityList: {
    gap: 12,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    padding: 16,
    borderRadius: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A3C6E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIconText: {
    fontSize: 16,
    color: colors.onPrimary,
  },
  activityContent: {
    flex: 1,
    marginLeft: 16,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  activityDate: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  activityAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  activityAuto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
});