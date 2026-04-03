import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../src/constants/colors';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <View style={styles.heroGlow} />
        <View style={styles.heroContent}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnIMxJgD0KrnGJqpaPXNymWZZkuWdj3UWAcectb9-kJQEyWwvG6cZvPocy-cxCWQfUEr_6v_QaEv-tnn_bfSK-ndiQYDUFDYc0kgqtRQRQOotisQrMAaN8T7eZqEWulfxK6mR58FlV_8tUSeG-eYyZRpQcifrppdTGtsNVrDOBM4sMUDBq8zWxtVSGBc6JYSGK6HtUp_drX69z7Oiq3s1UKZ7WibBL10CHNsItCI1UD5erbS1X1RSdHKkNwx_q7ZWfMyBdRTlspg' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <ScrollView style={styles.contentSection} contentContainerStyle={styles.contentInner} bounces={false} showsVerticalScrollIndicator={false}>
        <Text style={styles.headline}>Your income.{'\n'}Protected.</Text>
        <Text style={styles.description}>
          When Bangalore rains halt your deliveries, <Text style={styles.bold}>ProtoRyde automatically pays you.</Text>
        </Text>

        <View style={styles.pillContainer}>
          <View style={styles.pill}>
            <Text style={styles.pillEmoji}>☔</Text>
            <Text style={styles.pillText}>Auto-Claim</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillEmoji}>⚡</Text>
            <Text style={styles.pillText}>2-Min Payout</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillEmoji}>🛡️</Text>
            <Text style={styles.pillText}>Weekly Cover</Text>
          </View>
        </View>

        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/personal-details')}
            activeOpacity={0.98}
          >
            <Text style={styles.ctaText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.ctaSubtext}>₹67–₹115/week. Cancel anytime.</Text>

          <TouchableOpacity style={styles.loginLink}>
            <Text style={styles.loginText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.ambientShadow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  heroSection: {
    height: '40%',
    backgroundColor: '#162029',
    position: 'relative',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    width: 256,
    height: 256,
    backgroundColor: colors.primary,
    opacity: 0.1,
    borderRadius: 128,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -128 }, { translateY: -128 }],
  },
  heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  heroImage: {
    marginTop: -50,
    width: '120%',
    height: '150%',
  },
  contentSection: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    zIndex: 20,
  },
  contentInner: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 24,
  },
  headline: {
    marginTop: -5,
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 30,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    maxWidth: '90%',
    marginBottom: 20,
  },
  bold: {
    fontWeight: '600',
    color: colors.primary,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainerLow,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  pillEmoji: {
    fontSize: 16,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  ctaContainer: {
    marginTop: 'auto',
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  ctaSubtext: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 12,
  },
  loginLink: {
    marginTop: 10,
    textAlign: 'center',
  },
  loginText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  ambientShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: 'transparent',
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
});