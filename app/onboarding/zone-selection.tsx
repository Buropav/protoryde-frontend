import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Modal, FlatList, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { AppPage, SectionCard, StatusChip } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { premiumService } from '../../src/services/premiumService';
import { weatherService } from '../../src/services/weatherService';
import { ErrorBanner } from '../../src/components/ErrorBanner';

export default function ZoneSelectionScreen() {
  const { zone: contextZone, setRiderInfo } = useRider();
  const [selectedZone, setSelectedZone] = useState(contextZone || 'HSR Layout');
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch supported zones and defaults from model status
  const { 
    data: modelStatus, 
    loading: loadingZones,
    error: modelStatusError,
    refetch: refetchModelStatus
  } = useApiCall(premiumService.getModelStatus);

  const availableZones = modelStatus?.zone_defaults 
    ? Object.keys(modelStatus.zone_defaults) 
    : ['HSR Layout'];

  // Fetch live premium for the selected zone
  const { 
    data: premiumData, 
    loading: loadingPremium,
    error: premiumError,
    refetch: refetchPremium
  } = useApiCall(
    () => premiumService.predictPremium({ zone: selectedZone }),
    true,
    [selectedZone]
  );

  // Fetch current weather for insights
  const { 
    data: weatherData, 
    loading: loadingWeather,
    error: weatherError,
    refetch: refetchWeather
  } = useApiCall(
    () => weatherService.getCurrentWeather(selectedZone, true),
    true,
    [selectedZone]
  );

  const zoneRisk = modelStatus?.zone_defaults?.[selectedZone]?.risk_score || 'Medium';

  const handleContinue = () => {
    setRiderInfo({ zone: selectedZone });
    router.push('/(auth)/premium-reveal');
  };

  return (
    <View style={styles.container}>
      <AppPage contentContainerStyle={styles.content}>
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '66%' }]} />
          </View>
        </View>

        <View style={styles.heroBlock}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Confirm Your Zone</Text>
          </View>
        </View>

        {modelStatusError && (
          <ErrorBanner 
            message={modelStatusError.userMessage}
            onRetry={refetchModelStatus}
          />
        )}

        {premiumError && (
          <ErrorBanner 
            message={premiumError.userMessage}
            onRetry={refetchPremium}
          />
        )}

        {weatherError && (
          <ErrorBanner 
            message={weatherError.userMessage}
            onRetry={refetchWeather}
          />
        )}

        <View style={styles.selectorWrap}>
          <Text style={styles.label}>Risk Assessment Zone</Text>
          <TouchableOpacity 
            style={styles.zoneSelector} 
            activeOpacity={0.85}
            onPress={() => setShowDropdown(true)}
          >
            <Text style={styles.zoneText}>{selectedZone}</Text>
              {loadingZones ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <View style={styles.dropdownIconContainer}>
                  <Text style={styles.zoneIcon}>▼</Text>
                </View>
              )}
            </TouchableOpacity>
        </View>

        <Modal
          visible={showDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDropdown(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity 
              style={StyleSheet.absoluteFill} 
              activeOpacity={1} 
              onPress={() => setShowDropdown(false)}
            />
            <View style={styles.dropdownMenu}>
              <Text style={styles.dropdownTitle}>Select Your Zone</Text>
              <FlatList
                data={availableZones}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[
                      styles.dropdownItem, 
                      selectedZone === item && styles.selectedItem
                    ]}
                    onPress={() => {
                      setSelectedZone(item);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      selectedZone === item && styles.selectedItemText
                    ]}>{item}</Text>
                    {selectedZone === item && <Text style={styles.checkIcon}>✓</Text>}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <SectionCard style={styles.mapCard}>
          <View style={styles.fakeMap}>
            <Text style={styles.mapBadge}>Bangalore Grid</Text>
            <View style={styles.pin} />
            <StatusChip label={`${zoneRisk} Risk`} tone={zoneRisk === 'High' ? 'error' : 'warning'} style={styles.riskChip} />
          </View>
        </SectionCard>

        <View>
          <Text style={styles.sectionTitle}>Live Insights</Text>
          <View style={styles.insightsRow}>
            <SectionCard style={styles.insightCard}>
              <Text style={styles.insightIcon}>💧</Text>
              <Text style={styles.insightLabel}>Historical Flood</Text>
              <Text style={styles.insightValue}>{zoneRisk} Risk</Text>
            </SectionCard>
            <SectionCard style={[styles.insightCard, styles.alertCard]}>
              <Text style={styles.insightIcon}>⛈️</Text>
              <Text style={styles.insightLabel}>Predicted Rain</Text>
              <Text style={styles.insightValue}>
                {loadingWeather ? '...' : `${weatherData?.conditions?.rain_24h_mm || 0}mm/24h`}
              </Text>
            </SectionCard>
          </View>
        </View>

        <SectionCard style={styles.premiumCard}>
          <Text style={styles.premiumCaption}>Base Premium Preview</Text>
          <View style={styles.premiumRow}>
            {loadingPremium ? (
              <ActivityIndicator size="large" color={colors.onPrimary} style={{ marginRight: 10 }} />
            ) : (
              <>
                <Text style={styles.premiumAmount}>₹{premiumData?.base_premium || '--'}</Text>
                <Text style={styles.premiumUnit}>/week</Text>
              </>
            )}
          </View>
          <Text style={styles.premiumText}>
            Premium is adjusted based on real-time meteorological data and your selected primary operation zone.
          </Text>
        </SectionCard>

        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.9}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue to Premium Calculation</Text>
          <Text style={styles.arrowIcon}>{'\u2192'}</Text>
        </TouchableOpacity>
      </AppPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingTop: 8,
  },
  heroBlock: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    paddingRight: 5,
  },
  backIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  progressSection: {
    paddingTop: 25,
    marginBottom: 8,
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
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
    flex: 1,
  },
  selectorWrap: {
    gap: 8,
    marginTop: -10,
  },
  label: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  zoneSelector: {
    borderRadius: 14,
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zoneText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  dropdownIconContainer: {
    backgroundColor: colors.surfaceContainerHigh,
    padding: 6,
    borderRadius: 8,
  },
  zoneIcon: {
    color: colors.primary,
    fontSize: 12,
  },
  mapCard: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
  },
  fakeMap: {
    height: 210,
    backgroundColor: '#192A3B',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapBadge: {
    color: '#8CB8FF',
    fontSize: 12,
    letterSpacing: 0.6,
  },
  pin: {
    marginTop: 12,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.secondaryContainer,
    borderWidth: 2,
    borderColor: colors.onPrimary,
  },
  riskChip: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  insightsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  insightCard: {
    flex: 1,
    gap: 6,
  },
  alertCard: {
    borderLeftWidth: 3,
    borderLeftColor: colors.secondary,
  },
  insightIcon: {
    fontSize: 16,
  },
  insightLabel: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
  },
  insightValue: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  premiumCard: {
    backgroundColor: colors.primaryContainer,
    gap: 10,
  },
  premiumCaption: {
    color: colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    fontSize: 10,
    fontWeight: '700',
  },
  premiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  premiumAmount: {
    color: colors.onPrimary,
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 38,
  },
  premiumUnit: {
    color: colors.onPrimaryContainer,
    fontSize: 13,
    marginBottom: 4,
  },
  premiumText: {
    color: colors.onPrimaryContainer,
    fontSize: 12,
    lineHeight: 18,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: -15,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.onPrimary,
  },
  arrowIcon: {
    color: colors.onPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  dropdownMenu: {
    backgroundColor: '#0F1A24',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '70%',
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 480 : '100%',
    alignSelf: 'center',
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  dropdownTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 16,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '20',
  },
  selectedItem: {
    backgroundColor: colors.primaryContainer + '20',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: -12,
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.onSurface,
    fontWeight: '500',
  },
  selectedItemText: {
    color: colors.primary,
    fontWeight: '700',
  },
  checkIcon: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '800',
  },
});
