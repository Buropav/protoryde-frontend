import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topNav}>
        <View style={styles.topLeft}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={22} color="#132840" />
          </View>
          <Text style={styles.brandTitle}>ProtoRyde</Text>
        </View>
        <Pressable style={styles.bellBtn}>
          <Ionicons name="notifications" size={26} color={Colors.primary} />
          <View style={styles.badgeDot} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.greeting}>Good morning, Pranav <Text style={{fontSize: 16}}>👋</Text></Text>

        {/* Coverage Card */}
        <View style={styles.coverageCard}>
            <Feather style={styles.infoIcon} name="info" size={16} color="#8A94A6" />
            <View style={styles.coverageRow}>
              <View style={styles.shieldCol}>
                <MaterialCommunityIcons name="shield" size={54} color={Colors.primary} style={{marginTop: -4}} />
                <View style={styles.activeDot} />
              </View>
              <View style={styles.coverageInfo}>
                <Text style={styles.coverageLabel}>COVERED THIS WEEK</Text>
                <Text style={styles.coverageAmount}>UP TO ₹2,300</Text>
                <Text style={styles.coverageSubtext}>HSR Layout · Week 23</Text>
              </View>
            </View>
            <View style={styles.coverageCardBottomBar} />
        </View>

        {/* Alert Card */}
        <Pressable 
          style={styles.alertCard} 
          onPress={() => router.push('/trigger-flow/active-trigger' as any)}
        >
          <View style={styles.alertIconGroup}>
            <Ionicons name="warning" size={22} color="#FFB020" />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertText}>
              Heavy rain alert: HSR Layout tomorrow.
            </Text>
            <Text style={styles.alertSubtext}>
              You're covered.
            </Text>
          </View>
          <Feather name="arrow-right" size={20} color="#FFB020" />
        </Pressable>

        {/* Stats Row */}
        <View style={styles.statsRow}>
            <View style={styles.statCard}>
                <Feather name="calendar" size={22} color="#A0ABBA" style={styles.statIcon} />
                <Text style={styles.statValue}>4 / 6</Text>
                <Text style={styles.statLabel}>DAYS{"\n"}WORKED</Text>
            </View>
            <View style={styles.statCard}>
                <MaterialCommunityIcons name="cash-multiple" size={24} color={Colors.primary} style={styles.statIcon} />
                <Text style={styles.statValue}>₹4,120</Text>
                <Text style={styles.statLabel}>EARNED</Text>
            </View>
            <View style={styles.statCard}>
                <MaterialCommunityIcons name="shield-check" size={24} color={Colors.primary} style={styles.statIcon} />
                <Text style={styles.statValue}>₹840</Text>
                <Text style={styles.statLabel}>PROTECTED</Text>
            </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <View style={styles.activityList}>
            {/* Item 1 */}
            <Pressable style={styles.activityItem} onPress={() => router.push('/trigger-flow/active-trigger' as any)}>
              <View style={styles.activityIconCircle}>
                <Ionicons name="umbrella" size={20} color={Colors.primary} />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Rain Trigger</Text>
                <Text style={styles.activitySubtitle}>HSR LAYOUT · WED</Text>
              </View>
              <Text style={[styles.activityAmount, { color: Colors.primary }]}>+₹840</Text>
            </Pressable>

            {/* Item 2 */}
            <View style={styles.activityItem}>
              <View style={styles.activityIconCircle}>
                <Ionicons name="receipt-outline" size={20} color="#A0ABBA" />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Weekly Premium</Text>
                <Text style={styles.activitySubtitle}>AUTOMATIC DEDUCTION</Text>
              </View>
              <Text style={styles.activityAmountGray}>-₹82</Text>
            </View>

            {/* Item 3 */}
            <View style={styles.activityItem}>
              <View style={styles.activityIconCircle}>
                <MaterialCommunityIcons name="piggy-bank" size={22} color={Colors.primary} />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Earn-Back Cashback</Text>
                <Text style={styles.activitySubtitle}>SAFE DRIVING BONUS</Text>
              </View>
              <Text style={[styles.activityAmount, { color: Colors.primary }]}>+₹15</Text>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B121C' },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  bellBtn: {
    position: 'relative',
    padding: 4,
  },
  badgeDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFB020',
  },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    color: '#A0ABBA',
    marginBottom: 20,
  },
  coverageCard: {
    backgroundColor: '#15212E',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  infoIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  coverageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  shieldCol: {
    alignItems: 'center',
    marginRight: 20,
    width: 50,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  coverageInfo: {
    flex: 1,
  },
  coverageLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A94A6',
    letterSpacing: 1,
    marginBottom: 8,
  },
  coverageAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  coverageSubtext: {
    fontSize: 13,
    color: '#8A94A6',
  },
  coverageCardBottomBar: {
    height: 6,
    backgroundColor: Colors.primary,
    width: '100%',
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 176, 32, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 176, 32, 0.3)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  alertIconGroup: {
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
    lineHeight: 18,
  },
  alertSubtext: {
    color: '#FFB020',
    fontSize: 13,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#15212E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  statIcon: {
    marginBottom: 12,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#8A94A6',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 14,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#15212E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  activityIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  activitySubtitle: {
    color: '#8A94A6',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  activityAmountGray: {
    color: '#8A94A6',
    fontSize: 16,
    fontWeight: '700',
  },
});
