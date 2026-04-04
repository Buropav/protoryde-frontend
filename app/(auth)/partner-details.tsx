import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';

export default function PartnerDetails() {
  const { zone: contextZone, setRiderInfo } = useRider();
  const [zone, setZone] = useState(contextZone || 'HSR Layout');
  const [upiId, setUpiId] = useState('pranav@okicici');

  const handleContinue = () => {
    setRiderInfo({ 
      zone, 
      upiId 
    });
    router.push('/onboarding/coverage-exclusions');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '66%' }]} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Set Up Your Account</Text>
          </View>
          <Text style={styles.sectionSubtitle}>Tell us about your Delhivery partner profile.</Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>DELHIVERY PARTNER ID</Text>
            <View style={styles.readOnlyInput}>
              <Text style={styles.readOnlyText}>DEL-BLR-284719</Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
                <Text style={styles.verifiedText}>VERIFIED</Text>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>VEHICLE TYPE</Text>
            <TouchableOpacity style={styles.selectInput}>
              <View style={styles.selectRow}>
                <Text style={styles.selectIcon}>🚲</Text>
                <Text style={styles.selectText}>Bike (Two-Wheeler)</Text>
              </View>
              <Text style={styles.chevron}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>YOUR DELIVERY ZONE</Text>
            <View style={styles.mapCard}>
              <View style={styles.mapPreview}>
                <Image
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrRJSLERHtQmfxy2WCntu7TQtSjE4YYiQVMe63APhDPNtF-ruPaxwqFuryO_twymBePBbsiLRJW9midPwQLUvu06keG2vr6yqJBf_jqk9ysFUBWhiwnLcEv3tUAXvoR51ggb0_W8_pePpVmAlZoxq-Nr2ntUdX_YFXJkKiBeohDe1ETMGk5rHReXmKIjuctO8cD3ZyQbXnISRInloiSPacjH3T020cVXrrBovgY2b2Kcz4Ar9bRvk2zV2SxgnqCJ9zWUpr5wMOxg' }}
                  style={styles.mapImage}
                  resizeMode="cover"
                />
                <View style={styles.locationPin}>
                  <Text style={styles.pinIcon}>📍</Text>
                </View>
              </View>
              <View style={styles.mapFooter}>
                <View>
                  <Text style={styles.zoneName}>{zone}, South Bangalore</Text>
                  <Text style={styles.zoneStatus}>Active Coverage Zone</Text>
                </View>
                <TouchableOpacity 
                   style={styles.editButton}
                   onPress={() => router.push('/onboarding/zone-selection')}
                >
                  <Text style={styles.editText}>Edit Zone</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>UPI ID FOR PAYOUTS</Text>
            <View style={styles.upiInput}>
              <View style={styles.upiIcon}>
                <Text style={styles.paymentsIcon}>💳</Text>
              </View>
              <TextInput 
                style={styles.upiId}
                value={upiId}
                onChangeText={setUpiId}
                placeholder="upi@handle"
                placeholderTextColor={colors.onSurfaceVariant + '66'}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>⚡</Text>
            <Text style={styles.infoText}>
              Your zone determines your weekly premium. <Text style={styles.bold}>HSR Layout</Text> is a medium-risk zone with a typical premium <Text style={styles.boldPrimary}>₹82/week</Text>.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.98}
        >
          <Text style={styles.continueText}>Continue</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: colors.primary,
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  progressSection: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  formSection: {
    gap: 24,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
    marginLeft: 4,
  },
  readOnlyInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  readOnlyText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.tertiaryFixed + '30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  verifiedIcon: {
    fontSize: 12,
    color: colors.tertiary,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.tertiary,
    textTransform: 'uppercase',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  selectIcon: {
    fontSize: 20,
  },
  selectText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  chevron: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  mapCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  mapPreview: {
    height: 128,
    backgroundColor: colors.surfaceContainerHigh,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  locationPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 20,
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  pinIcon: {
    fontSize: 16,
  },
  mapFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  zoneName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  zoneStatus: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  editButton: {
    backgroundColor: colors.secondaryFixed + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondaryContainer,
    textTransform: 'uppercase',
  },
  upiInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  upiIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  paymentsIcon: {
    fontSize: 16,
  },
  upiId: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#1E2A36',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.secondaryContainer + '20',
  },
  infoIcon: {
    fontSize: 20,
    color: colors.secondaryContainer,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
    lineHeight: 18,
  },
  bold: {
    fontWeight: '700',
  },
  boldPrimary: {
    fontWeight: '700',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    gap: 16,
  },

  continueButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  arrowIcon: {
    fontSize: 18,
    color: colors.onPrimary,
  },
});
