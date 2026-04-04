import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, FlatList, Platform } from 'react-native';
import { router } from 'expo-router';
import { AppPage, SectionCard, StatusChip } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';
import { useApiCall } from '../../src/hooks/useApiCall';
import { premiumService } from '../../src/services/premiumService';
import { weatherService } from '../../src/services/weatherService';
import { ErrorBanner } from '../../src/components/ErrorBanner';

type LatLng = {
  latitude: number;
  longitude: number;
};

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type NativeMapsModule = {
  default: React.ComponentType<Record<string, unknown>>;
  Polygon: React.ComponentType<Record<string, unknown>>;
  PROVIDER_GOOGLE: unknown;
};

const loadNativeMapsModule = (): NativeMapsModule | null => {
  if (Platform.OS === 'web') {
    return null;
  }

  // Lazy-require avoids evaluating native map code on web builds.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('react-native-maps') as NativeMapsModule;
};

const BANGALORE_OVERVIEW_REGION: Region = {
  latitude: 12.9716,
  longitude: 77.5946,
  latitudeDelta: 0.22,
  longitudeDelta: 0.22,
};

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#0f1419' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0f1419' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#5b6675' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#263344' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#1a2332' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#7e8a99' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1f2a39' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#18202d' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8f9dad' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#202c3d' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a1a2b' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#415164' }] },
];

const toRgba = (hexColor: string, alpha: number) => {
  const clean = hexColor.replace('#', '');
  const normalized = clean.length === 3
    ? clean.split('').map((value) => value + value).join('')
    : clean;
  const int = Number.parseInt(normalized, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const parsePoint = (value: unknown): LatLng | null => {
  if (!value) return null;

  if (Array.isArray(value) && value.length >= 2) {
    const first = Number(value[0]);
    const second = Number(value[1]);
    if (Number.isFinite(first) && Number.isFinite(second)) {
      const isLngLat = Math.abs(first) > 90;
      return {
        latitude: isLngLat ? second : first,
        longitude: isLngLat ? first : second,
      };
    }
  }

  if (typeof value === 'object') {
    const point = value as Record<string, unknown>;
    const latitude = Number(point.latitude ?? point.lat);
    const longitude = Number(point.longitude ?? point.lng ?? point.lon);
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      return { latitude, longitude };
    }
  }

  return null;
};

const parsePolygon = (value: unknown): LatLng[] => {
  if (!Array.isArray(value)) return [];

  const first = value[0];
  if (Array.isArray(first) && first.length > 0 && Array.isArray(first[0])) {
    return (first as unknown[]).map(parsePoint).filter((point): point is LatLng => point !== null);
  }

  return value.map(parsePoint).filter((point): point is LatLng => point !== null);
};

const getPolygonCenter = (polygon: LatLng[]): LatLng | null => {
  if (polygon.length === 0) return null;
  const totals = polygon.reduce(
    (acc, point) => ({
      latitude: acc.latitude + point.latitude,
      longitude: acc.longitude + point.longitude,
    }),
    { latitude: 0, longitude: 0 }
  );
  return {
    latitude: totals.latitude / polygon.length,
    longitude: totals.longitude / polygon.length,
  };
};

export default function ZoneSelectionScreen() {
  const { zone: contextZone, setRiderInfo } = useRider();
  const [selectedZone, setSelectedZone] = useState(contextZone || 'HSR Layout');
  const [showDropdown, setShowDropdown] = useState(false);
  const mapRef = useRef<{ animateToRegion?: (region: Region, duration?: number) => void } | null>(null);
  const hasAnimatedRef = useRef(false);
  const nativeMaps = useMemo(loadNativeMapsModule, []);
  const MapViewComponent = nativeMaps?.default;
  const PolygonComponent = nativeMaps?.Polygon;
  const googleProvider = nativeMaps?.PROVIDER_GOOGLE;

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
  const zoneMeta = modelStatus?.zone_defaults?.[selectedZone] as Record<string, unknown> | undefined;

  const selectedPolygon = useMemo(() => {
    if (!zoneMeta) return [];

    const explicitCandidates = [
      zoneMeta.polygon,
      zoneMeta.boundary,
      zoneMeta.boundaries,
      zoneMeta.coverage_area,
      zoneMeta.coverage_polygon,
      zoneMeta.coordinates,
      zoneMeta.geojson,
    ];

    for (const candidate of explicitCandidates) {
      const parsed = parsePolygon(candidate);
      if (parsed.length >= 3) {
        return parsed;
      }
    }

    for (const value of Object.values(zoneMeta)) {
      const parsed = parsePolygon(value);
      if (parsed.length >= 3) {
        return parsed;
      }
    }

    return [];
  }, [zoneMeta]);

  const selectedCenter = useMemo(() => {
    if (!zoneMeta) {
      return getPolygonCenter(selectedPolygon);
    }

    const centerCandidates = [
      zoneMeta.center,
      zoneMeta.centroid,
      zoneMeta.location,
      zoneMeta.position,
    ];

    for (const candidate of centerCandidates) {
      const parsed = parsePoint(candidate);
      if (parsed) {
        return parsed;
      }
    }

    for (const value of Object.values(zoneMeta)) {
      const parsed = parsePoint(value);
      if (parsed) {
        return parsed;
      }
    }

    return getPolygonCenter(selectedPolygon);
  }, [selectedPolygon, zoneMeta]);

  const selectedRegion = useMemo<Region>(() => {
    if (!selectedCenter) {
      return BANGALORE_OVERVIEW_REGION;
    }

    return {
      latitude: selectedCenter.latitude,
      longitude: selectedCenter.longitude,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    };
  }, [selectedCenter]);

  const normalizedRisk = String(zoneRisk).toLowerCase();
  const activeRiskColor = normalizedRisk.includes('high') ? colors.error : colors.secondary;

  useEffect(() => {
    if (!mapRef.current) return;

    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      return;
    }

    mapRef.current?.animateToRegion?.(selectedRegion, 700);
  }, [selectedRegion, selectedZone]);

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

        <SectionCard style={styles.mapCard}>
          <View style={styles.mapContainer}>
            {!MapViewComponent || !PolygonComponent ? (
              <View style={styles.webMapFallback}>
                <Text style={styles.fallbackText}>Map preview is available on native builds.</Text>
              </View>
            ) : (
              <MapViewComponent
                ref={mapRef}
                style={styles.mapView}
                provider={googleProvider}
                initialRegion={BANGALORE_OVERVIEW_REGION}
                customMapStyle={DARK_MAP_STYLE}
                showsCompass={false}
                showsTraffic={false}
                showsIndoors={false}
                toolbarEnabled={false}
                pitchEnabled={false}
              >
                {selectedPolygon.length >= 3 && (
                  <PolygonComponent
                    coordinates={selectedPolygon}
                    strokeColor={activeRiskColor}
                    fillColor={toRgba(activeRiskColor, 0.2)}
                    strokeWidth={2}
                  />
                )}
              </MapViewComponent>
            )}
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

      {showDropdown && (
        <View style={styles.dropdownOverlay} pointerEvents="box-none">
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
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    selectedZone === item && styles.selectedItem,
                  ]}
                  onPress={() => {
                    setSelectedZone(item);
                    setShowDropdown(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedZone === item && styles.selectedItemText,
                    ]}
                  >
                    {item}
                  </Text>
                  {selectedZone === item && <Text style={styles.checkIcon}>✓</Text>}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
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
    position: 'relative',
    zIndex: 20,
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
  mapContainer: {
    height: 210,
    backgroundColor: colors.surfaceContainerLow,
    position: 'relative',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  webMapFallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#192A3B',
  },
  fallbackText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
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
  dropdownOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 50,
  },
  dropdownMenu: {
    backgroundColor: '#0F1A24',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '58%',
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 24,
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
