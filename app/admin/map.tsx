import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors } from '../../src/constants/colors';
import { adminService } from '../../src/services/adminService';
import { AdminClaimsMapResponse } from '../../src/types/api';

export default function ClaimsMap() {
  const [data, setData] = useState<AdminClaimsMapResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getClaimsMap()
      .then(setData)
      .catch(err => console.error('Map fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const initialRegion = {
    latitude: 12.9141, // Default to HSR Layout area
    longitude: 77.6413,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={darkMapStyle}
      >
        {data?.claims.map((claim) => (
          <Marker
            key={claim.id}
            coordinate={{ latitude: claim.latitude, longitude: claim.longitude }}
            title={`Claim: ${claim.id}`}
            description={`Payout: ₹${claim.payout_amount}`}
            pinColor={claim.fraud_check_passed ? Colors.success : Colors.error}
          />
        ))}
      </MapView>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: Colors.success }]} />
          <Text style={styles.legendText}>Verified</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: Colors.error }]} />
          <Text style={styles.legendText}>Suspicious</Text>
        </View>
      </View>
    </View>
  );
}

const darkMapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
    // Simplified for brevity in this environment
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  map: { width: '100%', height: '100%' },
  centered: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' },
  legend: { 
    position: 'absolute', 
    bottom: 24, 
    left: 24, 
    backgroundColor: Colors.cardFill, 
    padding: 12, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  legendText: { color: Colors.textSecondary, fontSize: 12 }
});
