import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/colors';
import { RiderContext } from '../../src/context/RiderContext';

const { width } = Dimensions.get('window');

export default function PartnerProfileSetupScreen() {
  const router = useRouter();
  const { setRiderInfo } = (React.useContext(RiderContext) || { setRiderInfo: () => {} }) as any;
  const [upiId, setUpiId] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header / Nav */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <View style={styles.progressContainer}>
            <View style={[styles.progressSegment, styles.progressActive]} />
            <View style={[styles.progressSegment, styles.progressActive]} />
            <View style={styles.progressSegment} />
            <View style={styles.progressSegment} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Set Up Your Account</Text>
          <Text style={styles.subtitle}>Tell us about your Delhivery partner profile.</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>DELHIVERY PARTNER ID</Text>
            <View style={styles.cardInput}>
              <Text style={styles.partnerIdValue}>DEL-BLR-284719</Text>
              <View style={styles.badge}>
                <Ionicons name="checkmark-circle-outline" size={14} color={Colors.success} />
                <Text style={styles.badgeText}>VERIFIED</Text>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>VEHICLE TYPE</Text>
            <View style={styles.cardInput}>
              <MaterialCommunityIcons name="moped" size={24} color={Colors.primary} style={{ marginRight: 12 }} />
              <Text style={styles.vehicleText}>Bike (Two-Wheeler)</Text>
              <Feather name="chevron-down" size={20} color={Colors.textPrimary} style={{ marginLeft: 'auto' }} />
            </View>
          </View>

          <View style={styles.mapCard}>
            <View style={styles.mapGraphicPlaceholder}>
              <View style={styles.mapLines} />
              <View style={styles.mapLines2} />
              <Ionicons name="location" size={32} color={Colors.primary} style={styles.mapPin} />
            </View>
            <View style={styles.mapCardContent}>
              <View>
                <Text style={styles.mapCardTitle}>HSR Layout</Text>
                <Text style={styles.mapCardSubtitle}>Active Coverage Zone</Text>
              </View>
              <Pressable style={styles.editZoneBtn}>
                <Text style={styles.editZoneText}>Edit Zone</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>UPI ID</Text>
            <View style={[styles.inputWrapper, { borderColor: Colors.primary }]}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="wallet-bifold-outline" size={24} color={Colors.primary} />
              </View>
              <TextInput 
                style={styles.flexInput} 
                placeholderTextColor={Colors.textMuted} 
                placeholder="yourname@upi"
                value={upiId}
                onChangeText={setUpiId}
              />
            </View>
            <View style={styles.infoTextRow}>
              <Ionicons name="information-circle" size={14} color={Colors.primary} />
              <Text style={styles.helperText}>This is where your payouts will be sent.</Text>
            </View>
          </View>

          <View style={styles.premiumCard}>
            <View style={styles.premiumIconBox}>
              <MaterialCommunityIcons name="diamond-stone" size={24} color={Colors.payment} />
            </View>
            <View>
              <Text style={styles.premiumLabel}>HSR Layout typical premium:</Text>
              <Text style={styles.premiumValue}>
                <Text style={{ color: Colors.primary }}>₹82</Text>
                <Text style={{ color: Colors.primary, opacity: 0.8 }}> / week</Text>
              </Text>
            </View>
          </View>

          <View style={styles.spacer} />

          <Pressable 
            style={styles.button}
            onPress={() => {
              setRiderInfo({ upiId: upiId.trim() });
              router.push('/onboarding/zone-selection' as any);
            }}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    marginBottom: 24,
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
  content: {
    paddingHorizontal: 24,
    flex: 1,
    paddingBottom: 24,
  },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: Colors.textSecondary, marginBottom: 32, lineHeight: 22 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 12, color: Colors.textSecondary, marginBottom: 8, letterSpacing: 1, fontWeight: '600' },
  cardInput: {
    flexDirection: 'row',
    backgroundColor: Colors.cardFill,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 60,
    alignItems: 'center',
  },
  partnerIdValue: {
    flex: 1,
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 200, 83, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  badgeText: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  vehicleText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  mapCard: {
    backgroundColor: Colors.cardFill,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    overflow: 'hidden',
    marginBottom: 24,
  },
  mapGraphicPlaceholder: {
    height: 100,
    backgroundColor: '#132840',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  mapLines: {
    position: 'absolute',
    width: '150%',
    height: 1,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    transform: [{ rotate: '25deg' }],
  },
  mapLines2: {
    position: 'absolute',
    width: '150%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: [{ rotate: '-45deg' }],
  },
  mapPin: {
    elevation: 5,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  mapCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  mapCardTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  mapCardSubtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  editZoneBtn: {
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editZoneText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.cardFill,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    height: 60,
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  flexInput: {
    flex: 1,
    color: Colors.textPrimary,
    paddingRight: 16,
    fontSize: 16,
    height: '100%',
  },
  infoTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 2,
    gap: 6,
  },
  helperText: {
    color: Colors.primary,
    fontSize: 13,
    fontStyle: 'italic',
    opacity: 0.9,
  },
  premiumCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardFill,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  premiumIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 166, 35, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 4,
  },
  premiumValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  spacer: { flex: 1, minHeight: 40 },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: { color: Colors.background, fontSize: 16, fontWeight: '700' },
});
