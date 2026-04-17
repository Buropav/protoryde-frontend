import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Simple UPI Logo SVG placeholder
const UpiIcon = () => (
  <View style={styles.upiBadge}>
    <Text style={styles.upiText}>UPI</Text>
  </View>
);

export default function FirstPremiumPaymentScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerLogo}>ShieldPay</Text>
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="help-circle" size={24} color={Colors.textSecondary} />
          </Pressable>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="close" size={28} color={Colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.graphicContainer}>
          <View style={styles.shieldWrapper}>
            <MaterialCommunityIcons name="shield" size={80} color={Colors.payment} />
            <Text style={styles.rupeeSymbol}>₹</Text>
            {/* Sparkles */}
            <MaterialCommunityIcons name="star-four-points" size={12} color={Colors.payment} style={[styles.sparkle, { top: -5, left: 30 }]} />
            <MaterialCommunityIcons name="star-four-points" size={10} color={Colors.payment} style={[styles.sparkle, { top: 10, right: -10 }]} />
            <MaterialCommunityIcons name="star-four-points" size={8} color={Colors.payment} style={[styles.sparkle, { bottom: 15, left: -5 }]} />
            <MaterialCommunityIcons name="star-four-points" size={10} color={Colors.payment} style={[styles.sparkle, { bottom: 10, right: 10 }]} />
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>You're almost covered!</Text>
          <Text style={styles.subtitle}>One payment activates your first week of protection.</Text>
        </View>
        
        <View style={styles.receiptCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderTitle}>WEEK 1 COVERAGE</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Week 1 of ∞</Text>
            </View>
          </View>

          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Zone</Text>
            <Text style={styles.rowValue}>HSR Layout</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Risk level</Text>
            <Text style={styles.rowValue}>Medium</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Base premium</Text>
            <Text style={styles.rowValue}>₹82</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>New rider discount</Text>
            <Text style={styles.rowValueGreen}>-₹5</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total this week</Text>
            </View>
            <View style={styles.totalRight}>
              <Text style={styles.totalAmount}>₹77</Text>
              <Text style={styles.totalSubtext}>for 7 days of coverage</Text>
            </View>
          </View>

          <View style={styles.protectedBadge}>
            <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
            <Text style={styles.protectedText}>Up to ₹2,300 protected this week</Text>
          </View>
        </View>

        <View style={styles.footerCol}>
          <Pressable 
            style={styles.paymentButton}
            onPress={() => router.replace('/(tabs)' as any)}
          >
            <UpiIcon />
            <Text style={styles.paymentText}>Pay ₹77 via UPI</Text>
          </Pressable>

          <Text style={styles.autoRenewText}>
            Auto-renewed weekly from your Delhivery{'\n'}earnings. Cancel anytime.
          </Text>

          <View style={styles.secureFooter}>
            <Feather name="lock" size={12} color={Colors.textMuted} style={styles.secureIcon} />
            <Text style={styles.secureText}>256-bit encrypted. Your data is safe.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerLogo: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: {
    padding: 4,
  },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 32 },
  graphicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  shieldWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  rupeeSymbol: {
    position: 'absolute',
    color: '#132840', // Dark color for contrast against gold shield
    fontSize: 32,
    fontWeight: '700',
    marginTop: -4,
  },
  sparkle: {
    position: 'absolute',
    opacity: 0.8,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: Colors.textPrimary, 
    marginBottom: 8, 
    textAlign: 'center',
    letterSpacing: -0.5
  },
  subtitle: { 
    fontSize: 15, 
    color: Colors.textSecondary, 
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  receiptCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 24, 
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderTitle: {
    color: '#8A94A6',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  badge: {
    backgroundColor: 'rgba(0, 212, 170, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.3)',
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  divider: { 
    height: 1, 
    backgroundColor: '#EAECEF', 
    width: '100%', 
    marginVertical: 16 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 14 
  },
  rowLabel: { 
    fontSize: 15, 
    color: '#5C6A7D' 
  },
  rowValue: { 
    fontSize: 15, 
    color: '#132840', 
    fontWeight: '700' 
  },
  rowValueGreen: {
    fontSize: 15, 
    color: Colors.success, 
    fontWeight: '700' 
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    color: '#5C6A7D',
    marginTop: 8,
  },
  totalRight: {
    alignItems: 'flex-end',
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.payment,
    lineHeight: 40,
  },
  totalSubtext: {
    fontSize: 12,
    color: '#8A94A6',
    marginTop: 2,
  },
  protectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  protectedText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  footerCol: {
    alignItems: 'center',
    gap: 16,
  },
  paymentButton: {
    backgroundColor: Colors.payment,
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  paymentText: { 
    color: '#132840', 
    fontSize: 17, 
    fontWeight: '800' 
  },
  upiBadge: {
    borderWidth: 1,
    borderColor: '#132840',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  upiText: {
    color: '#132840',
    fontSize: 10,
    fontWeight: '800',
  },
  autoRenewText: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  secureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureIcon: {
    marginRight: 6,
  },
  secureText: {
    color: Colors.textMuted,
    fontSize: 12,
  },
});
