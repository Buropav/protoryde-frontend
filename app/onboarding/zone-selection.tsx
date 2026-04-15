import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';

const ZONES = [
  { id: '1', name: 'Downtown Core', status: 'High Demand' },
  { id: '2', name: 'North District', status: 'Moderate' },
  { id: '3', name: 'South District', status: 'Moderate' },
];

export default function ZoneSelectionScreen() {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState('1');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Zone Selection</Text>
        <Text style={styles.subtitle}>Select your primary delivery zone. This affects premium calculations.</Text>
        
        {ZONES.map((zone) => (
          <Pressable 
            key={zone.id} 
            style={[styles.zoneCard, selectedZone === zone.id && styles.zoneCardSelected]}
            onPress={() => setSelectedZone(zone.id)}
          >
            <View>
              <Text style={styles.zoneName}>{zone.name}</Text>
              <Text style={styles.zoneStatus}>{zone.status}</Text>
            </View>
            <View style={[styles.radioItem, selectedZone === zone.id && styles.radioItemSelected]} />
          </Pressable>
        ))}

        <View style={styles.spacer} />

        <Pressable 
          style={styles.button}
          onPress={() => router.push('/onboarding/coverage-exclusions' as any)}
        >
          <Text style={styles.buttonText}>Confirm Zone</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginBottom: 32 },
  zoneCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: Colors.cardFill, 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: Colors.border 
  },
  zoneCardSelected: { borderColor: Colors.primary, backgroundColor: 'rgba(0, 212, 170, 0.1)' },
  zoneName: { fontSize: 18, color: Colors.textPrimary, fontWeight: 'bold', marginBottom: 4 },
  zoneStatus: { fontSize: 14, color: Colors.textSecondary },
  radioItem: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: Colors.border },
  radioItemSelected: { borderColor: Colors.primary, backgroundColor: Colors.primary },
  spacer: { flex: 1, minHeight: 40 },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: { color: Colors.background, fontSize: 18, fontWeight: 'bold' },
});
