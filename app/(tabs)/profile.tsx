import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}><Text style={styles.avatarText}>JD</Text></View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.phone}>+91 98765 43210</Text>
          </View>
        </View>

        <View style={styles.trustScoreCard}>
          <Text style={styles.trustScoreLabel}>DeliveryTrust™ Score</Text>
          <Text style={styles.trustScoreValue}>98/100</Text>
          <Text style={styles.trustScoreDesc}>Excellent standing. You qualify for minimum premium rates.</Text>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Account</Text>
          <Pressable style={styles.menuItem} onPress={() => router.push('/account/policy-document' as any)}>
            <Text style={styles.menuText}>Policy Document & Definitions</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Bank Payout Details</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
        </View>

        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  avatarPlaceholder: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.border, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: Colors.textSecondary },
  headerInfo: { flex: 1 },
  name: { fontSize: 24, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 4 },
  phone: { fontSize: 14, color: Colors.textSecondary },
  trustScoreCard: { backgroundColor: 'rgba(0, 212, 170, 0.1)', padding: 24, borderRadius: 16, borderColor: Colors.primary, borderWidth: 1, marginBottom: 32 },
  trustScoreLabel: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600', marginBottom: 8 },
  trustScoreValue: { fontSize: 36, fontWeight: 'bold', color: Colors.primary, marginBottom: 8 },
  trustScoreDesc: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  menuSection: { marginBottom: 32 },
  menuTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 16 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  menuText: { fontSize: 16, color: Colors.textPrimary },
  menuArrow: { fontSize: 20, color: Colors.textMuted },
  logoutButton: { marginTop: 'auto', alignSelf: 'center', paddingVertical: 16 },
  logoutText: { color: Colors.alert, fontSize: 16, fontWeight: 'bold' },
});
