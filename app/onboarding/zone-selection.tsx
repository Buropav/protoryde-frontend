import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Ionicons, Feather } from '@expo/vector-icons';
import { RiderContext } from '../../src/context/RiderContext';

const { width } = Dimensions.get('window');

const ZONES = [
  { id: 'hsr', name: 'HSR Layout', risk: 'MEDIUM', price: 82 },
  { id: 'koramangala', name: 'Koramangala', risk: 'HIGH', price: 107 },
  { id: 'indiranagar', name: 'Indiranagar', risk: 'MEDIUM', price: 82 },
  { id: 'whitefield', name: 'Whitefield', risk: 'LOW', price: 55 },
  { id: 'marathahalli', name: 'Marathahalli', risk: 'MEDIUM', price: 82 },
  { id: 'electronic-city', name: 'Electronic City', risk: 'LOW', price: 55 },
  { id: 'jp-nagar', name: 'JP Nagar', risk: 'LOW', price: 55 },
  { id: 'hebbal', name: 'Hebbal', risk: 'HIGH', price: 107 },
];

export default function ZoneSelectionScreen() {
  const router = useRouter();
  const { setRiderInfo } = (React.useContext(RiderContext) || { setRiderInfo: () => {} }) as any;
  const [selectedZone, setSelectedZone] = useState('hsr');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return Colors.success;
      case 'MEDIUM': return Colors.payment;
      case 'HIGH': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'rgba(0, 200, 83, 0.15)';
      case 'MEDIUM': return 'rgba(245, 166, 35, 0.15)';
      case 'HIGH': return 'rgba(255, 59, 48, 0.15)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Zone Selection</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={styles.progressSegment} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Where do you mainly deliver?</Text>
          <Text style={styles.subtitle}>This sets your zone risk level and weekly premium.</Text>
          
          <View style={styles.zonesList}>
            {ZONES.map((zone) => {
              const isSelected = selectedZone === zone.id;
              return (
                <Pressable 
                  key={zone.id} 
                  style={[styles.zoneCard, isSelected && styles.zoneCardSelected]}
                  onPress={() => setSelectedZone(zone.id)}
                >
                  <View style={styles.zoneCardLeft}>
                    <View style={styles.zoneNameRow}>
                      <Text style={styles.zoneName}>{zone.name}</Text>
                      {isSelected && (
                        <Ionicons name="checkmark-circle" size={16} color={Colors.primary} style={styles.checkIcon} />
                      )}
                    </View>
                    <View style={[styles.riskBadge, { backgroundColor: getRiskBg(zone.risk) }]}>
                      <Text style={[styles.riskBadgeText, { color: getRiskColor(zone.risk) }]}>{zone.risk}</Text>
                    </View>
                  </View>
                  <View style={styles.zoneCardRight}>
                    <Text style={[styles.zonePrice, isSelected && { color: Colors.primary }]}>
                      ₹{zone.price}/week
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable 
          style={styles.button}
          onPress={() => {
            const zone = ZONES.find((item) => item.id === selectedZone)?.name;
            if (zone) {
              setRiderInfo({ zone });
            }
            router.push('/onboarding/coverage-exclusions' as any);
          }}
        >
          <Text style={styles.buttonText}>Confirm Zone</Text>
        </Pressable>
        <View style={styles.secureFooter}>
          <Feather name="lock" size={12} color={Colors.textMuted} style={styles.secureIcon} />
          <Text style={styles.secureText}>256-bit encrypted. Your data is safe.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
  },
  progressActive: {
    backgroundColor: Colors.primary,
  },
  container: { 
    flexGrow: 1 
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: Colors.textSecondary, marginBottom: 24, lineHeight: 22 },
  zonesList: {
    gap: 12,
  },
  zoneCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: Colors.cardFill, 
    borderRadius: 8, 
    padding: 16, 
    borderWidth: 2, 
    borderColor: 'transparent'
  },
  zoneCardSelected: { 
    borderColor: Colors.primary, 
    backgroundColor: 'rgba(0, 212, 170, 0.05)' 
  },
  zoneCardLeft: {
    flex: 1,
  },
  zoneNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  zoneName: { fontSize: 16, color: Colors.textPrimary, fontWeight: '600' },
  checkIcon: {
    marginLeft: 6,
  },
  riskBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  riskBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  zoneCardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  zonePrice: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    backgroundColor: Colors.background,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: Colors.background, fontSize: 16, fontWeight: '700' },
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
