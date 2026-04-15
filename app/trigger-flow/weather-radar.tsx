import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { useRouter } from 'expo-router';

export default function WeatherRadarScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Radar & Forecast</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.radarPlaceholder}>
          <Text style={styles.radarText}>[ Live Weather Radar Map ]</Text>
        </View>

        <Text style={styles.sectionTitle}>Tomorrow's Forecast</Text>

        <View style={styles.forecastCard}>
          <View style={styles.forecastRow}>
            <Text style={styles.timeLabel}>08:00 AM</Text>
            <Text style={styles.weatherCondition}>⛅ Cloudy</Text>
            <Text style={styles.chanceLabel}>20%</Text>
          </View>
          <View style={styles.forecastRow}>
            <Text style={styles.timeLabel}>02:00 PM</Text>
            <Text style={styles.weatherCondition}>🌧 Heavy Rain</Text>
            <Text style={[styles.chanceLabel, { color: Colors.alert }]}>85%</Text>
          </View>
          <View style={[styles.forecastRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.timeLabel}>06:00 PM</Text>
            <Text style={styles.weatherCondition}>🌦 Light Rain</Text>
            <Text style={styles.chanceLabel}>45%</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  backButton: { width: 60 },
  backText: { fontSize: 18, color: Colors.primary, fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
  container: { flexGrow: 1, padding: 24 },
  radarPlaceholder: { height: 250, backgroundColor: Colors.cardFill, borderRadius: 16, borderColor: Colors.border, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  radarText: { fontSize: 16, color: Colors.textMuted },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 16 },
  forecastCard: { backgroundColor: Colors.cardFill, borderRadius: 16, borderColor: Colors.border, borderWidth: 1, padding: 16 },
  forecastRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  timeLabel: { fontSize: 16, color: Colors.textPrimary, flex: 1 },
  weatherCondition: { fontSize: 16, color: Colors.textSecondary, flex: 1, textAlign: 'center' },
  chanceLabel: { fontSize: 16, fontWeight: 'bold', color: Colors.primary, flex: 1, textAlign: 'right' },
});
