import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Href, router } from 'expo-router';
import { AppPage, SectionCard } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';

import { useRider } from '../../src/hooks/useRider';

export default function ProfileScreen() {
  const { riderName, upiId, riderId, zone } = useRider();

  const menuItems: Array<{
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    route: Href;
  }> = [
    { id: 'personal', icon: '👤', title: 'Personal Information', subtitle: 'Name, phone, DOB', route: '/(auth)/personal-details' },
    { id: 'zone', icon: '📍', title: 'Delivery Zone', subtitle: zone || 'HSR Layout, Bangalore', route: '/onboarding/zone-selection' },
    { id: 'payments', icon: '💳', title: 'Payment Methods', subtitle: 'UPI and bank account', route: '/account/weekly-ledger' },
    { id: 'policy', icon: '🛡️', title: 'Insurance Policy', subtitle: 'Terms and coverage details', route: '/account/policy-document' },
    { id: 'claims', icon: '🧾', title: 'Recent Claim Detail', subtitle: 'Fraud audit and evidence', route: '/claims/claim-detail-fraud-audit' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <AppPage>
        <SectionCard style={styles.profileCard}>
          <View style={styles.avatarLarge}><Text style={styles.avatarText}>PN</Text></View>
          <Text style={styles.name}>{riderName || 'Pranav'}</Text>
          <Text style={styles.email}>{upiId || 'pranav@okicici'}</Text>
          <View style={styles.partnerBadge}><Text style={styles.badgeText}>{riderId || 'DEL-BLR-284719'}</Text></View>
        </SectionCard>

        <SectionCard style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, index > 0 && styles.menuDivider]}
              onPress={() => router.push(item.route)}
              activeOpacity={0.85}
            >
              <View style={styles.menuIcon}><Text style={styles.iconText}>{item.icon}</Text></View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </SectionCard>

        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/(auth)/welcome-screen')}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>ProtoRyde v1.1.0</Text>
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
    paddingBottom: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 22,
  },
  avatarLarge: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    color: colors.onPrimary,
    fontSize: 29,
    fontWeight: '700',
  },
  name: {
    color: colors.onSurface,
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 2,
  },
  email: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    marginBottom: 12,
  },
  partnerBadge: {
    backgroundColor: colors.primaryFixed + '30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  menuSection: {
    paddingVertical: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  menuDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  menuSubtitle: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    marginTop: 2,
  },
  chevron: {
    color: colors.onSurfaceVariant,
    fontSize: 21,
  },
  logoutButton: {
    backgroundColor: colors.error + '28',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.error,
    fontSize: 15,
    fontWeight: '700',
  },
  version: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    textAlign: 'center',
    marginBottom: -30,
  },
});
