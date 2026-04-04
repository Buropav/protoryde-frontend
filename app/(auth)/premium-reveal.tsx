import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { premiumService } from '../../src/services/premiumService';
import { demoService } from '../../src/services/demoService';
import { LoadingOverlay } from '../../src/components/LoadingOverlay';
import { ErrorBanner } from '../../src/components/ErrorBanner';

export default function PremiumReveal() {
  const { riderName, zone, upiId, phoneNumber, setPolicyId, setBootstrapped, setRiderInfo } = useRider();
  const [isActivating, setIsActivating] = useState(false);
  const [activationError, setActivationError] = useState<string | null>(null);

  // Fetch final premium calculation
  const { 
    data: premium, 
    loading: loadingPremium, 
    error: premiumError,
    refetch: refetchPremium
  } = useApiCall(
    () => premiumService.predictPremium({ zone, prefer_ml: true }),
    true,
    [zone]
  );

  const finalPremium = premium?.final_premium || 0;
  const basePremium = premium?.base_premium || 0;
  const discountDelta = basePremium - finalPremium;

  const handleActivate = async () => {
    try {
      setIsActivating(true);
      setActivationError(null);
      
      const response = await demoService.bootstrapDemo({
        rider_id: phoneNumber, // Using phone as unique ID
        rider_name: riderName,
        zone: zone,
        upi_id: upiId,
        exclusions_accepted: true
      });

      setRiderInfo({ riderId: response.rider?.rider_id || response.rider?.id || 'DEL-BLR-284719' });
      setPolicyId(response.policy.policy_id);
      setBootstrapped(true);

      // Navigate to home
      router.replace('/(tabs)/home-screen');
    } catch (error: any) {
      console.error('Activation failed:', error);
      const errorMessage = error?.userMessage || error?.message || 'We could not activate your policy at this time. Please try again.';
      setActivationError(errorMessage);
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={isActivating} message="Activating your ProtoRyde shield..." />
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>

        <View style={styles.section}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Your ProtoRyde Plan</Text>
          </View>
        </View>

        {premiumError && (
          <ErrorBanner 
            message={premiumError.userMessage}
            onRetry={refetchPremium}
          />
        )}

        {activationError && (
          <ErrorBanner 
            message={activationError}
            onRetry={handleActivate}
          />
        )}

        {loadingPremium ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Calculating hyper-local risk...</Text>
          </View>
        ) : (
          <>
            <View style={styles.premiumCard}>
              <View style={styles.cardGrain} />
              <Text style={styles.premiumLabel}>YOUR WEEKLY PREMIUM</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{finalPremium}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.strikePrice}>₹{basePremium} base</Text>
                  {discountDelta !== 0 && (
                    <Text style={styles.discount}>
                      {discountDelta > 0 ? `-₹${discountDelta}` : `+₹${Math.abs(discountDelta)}`} zone adjustment
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.featuresList}>
                <View style={styles.featureRow}>
                  <Text style={styles.featureIcon}>🔒</Text>
                  <Text style={styles.featureText}>Coverage Cap: ₹2,300 / week</Text>
                </View>
                <View style={styles.featureRow}>
                  <Text style={styles.featureIcon}>⚡</Text>
                  <Text style={styles.featureText}>Payout Speed: &lt; 2 minutes</Text>
                </View>
                <View style={styles.featureRow}>
                  <Text style={styles.featureIcon}>✨</Text>
                  <Text style={styles.featureText}>Claim Type: Automatic • Zero Touch</Text>
                </View>
              </View>
            </View>

            <View style={styles.breakdownCard}>
              <Text style={styles.breakdownTitle}>PREMIUM BREAKDOWN</Text>
              
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Base zone rate ({premium?.zone})</Text>
                <Text style={styles.breakdownValue}>₹{basePremium}</Text>
              </View>
              
              {premium?.adjustments.map((adj, index) => (
                <View key={index} style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>{adj.factor}</Text>
                  <Text style={[
                    styles.breakdownValue, 
                    adj.amount < 0 ? styles.discountValue : styles.addValue
                  ]}>
                    {adj.amount < 0 ? `-₹${Math.abs(adj.amount)}` : `+₹${adj.amount}`}
                  </Text>
                </View>
              ))}
              
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Your premium</Text>
                <Text style={styles.totalValue}>₹{finalPremium}</Text>
              </View>
            </View>
          </>
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>✓</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Architecture of Trust</Text>
            <Text style={styles.infoText}>
              Our algorithms analyze hyper-local weather patterns and history to ensure you pay the fairest price in the industry.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.activateButton, (loadingPremium || isActivating) && styles.disabledButton]}
          onPress={handleActivate}
          activeOpacity={0.98}
          disabled={loadingPremium || isActivating}
        >
            <Text style={styles.activateText}>Activate ProtoRyde (₹{finalPremium})</Text>
          <View style={styles.upiBadge}>
            <Text style={styles.upiText}>UPI</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.footerText}>Billed every Monday. Cancel anytime.</Text>
      </View>
    </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 3,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  premiumCard: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#191C1E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  cardGrain: {
    position: 'absolute',
    top: -32,
    right: -32,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 64,
  },
  premiumLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: 2,
    opacity: 0.8,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 8,
  },
  price: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.onPrimary,
    lineHeight: 60,
  },
  discountBadge: {
    marginBottom: 8,
  },
  strikePrice: {
    fontSize: 14,
    color: colors.onPrimaryContainer,
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  discount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ADE80',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 20,
  },
  featuresList: {
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 16,
    opacity: 0.7,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onPrimary,
  },
  breakdownCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    gap: 16,
  },
  breakdownTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  discountValue: {
    color: '#27AE60',
  },
  addValue: {
    color: colors.error,
  },
  breakdownRowWithBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant + '20',
  },
  cashbackActive: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant + '40',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: colors.tertiaryFixed + '30',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoIcon: {
    fontSize: 20,
    color: colors.tertiary,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.tertiary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
  activateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#27AE60',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#27AE60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  activateText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  upiBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  upiText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.onPrimary,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  footerText: {
    marginBottom: -15,
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: colors.outline,
  },
});