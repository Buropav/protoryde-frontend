import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../src/constants/colors';

export default function PersonalDetails() {
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Set Up Your Account</Text>
          </View>
          <Text style={styles.sectionSubtitle}>We need this to verify your Delhivery partner status.</Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>FULL NAME</Text>
            <TextInput 
              style={styles.input}
              placeholder="Pranav"
              placeholderTextColor={colors.onSurfaceVariant + '66'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>MOBILE NUMBER</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.code}>+91</Text>
              </View>
              <TextInput 
                style={styles.phoneInput}
                placeholder="98765 43210"
                placeholderTextColor={colors.onSurfaceVariant + '66'}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>AADHAAR NUMBER (LAST 4 DIGITS)</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.input}
                placeholder="XXXX XXXX 7821"
                placeholderTextColor={colors.onSurfaceVariant + '66'}
                keyboardType="numeric"
                maxLength={12}
              />
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>DATE OF BIRTH</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.input}
                placeholder="DD / MM / YYYY"
                placeholderTextColor={colors.onSurfaceVariant + '66'}
              />
              <Text style={styles.calendarIcon}>📅</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Your Aadhaar is encrypted and never stored. Used only for one-time KYC.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/partner-details')}
          activeOpacity={0.98}
        >
          <Text style={styles.continueText}>Continue</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
        <View style={styles.securityRow}>
          <Text style={styles.lockIconSmall}>🔐</Text>
          <Text style={styles.securityText}>256-bit encrypted. Your data is safe.</Text>
        </View>
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
    paddingTop: 35,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    width: '33%',
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
    lineHeight: 20,
  },
  formSection: {
    gap: 20,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
    marginLeft: 4,
  },
  input: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '30',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '30',
    borderRadius: 12,
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: colors.outlineVariant + '20',
    paddingVertical: 16,
  },
  flag: {
    fontSize: 18,
    marginRight: 4,
  },
  code: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  inputWrapper: {
    position: 'relative',
  },
  lockIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    fontSize: 18,
    opacity: 0.6,
  },
  calendarIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    fontSize: 18,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.primaryFixed + '30',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryFixed + '50',
    marginBottom: 24,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  arrowIcon: {
    fontSize: 20,
    color: colors.onPrimary,
  },
  securityRow: {
    marginTop: -10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    opacity: 0.6,
  },
  lockIconSmall: {
    fontSize: 14,
    marginBottom: -10,
  },
  securityText: {
    marginTop: 1,
    marginBottom: -10,
    fontSize: 11,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
});