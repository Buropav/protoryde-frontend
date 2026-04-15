import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { useRouter } from 'expo-router';

export default function PremiumTransparencyModal() {
  const router = useRouter();

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />
      <View style={styles.sheet}>
        <View style={styles.dragHandle} />
        
        <Text style={styles.title}>Premium Transparency</Text>
        <Text style={styles.subtitle}>How your ₹49 premium is utilized based on our risk models.</Text>

        <View style={styles.breakdownContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Risk Pool Contribution</Text>
            <Text style={styles.value}>₹35.00</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>API & Oracle Costs</Text>
            <Text style={styles.value}>₹4.50</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Platform Fee</Text>
            <Text style={styles.value}>₹2.00</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Taxes (18%)</Text>
            <Text style={styles.totalValue}>₹7.50</Text>
          </View>
        </View>

        <Pressable 
          style={styles.doneButton}
          onPress={() => router.back()}
        >
          <Text style={styles.doneButtonText}>Got it</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 22, 40, 0.6)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: Colors.cardFill,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 350,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24, lineHeight: 20 },
  breakdownContainer: { marginBottom: 32 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  label: { fontSize: 16, color: Colors.textSecondary },
  value: { fontSize: 16, color: Colors.textPrimary, fontWeight: '600' },
  totalRow: { borderBottomWidth: 0, marginTop: 8 },
  totalLabel: { fontSize: 16, color: Colors.textPrimary, fontWeight: 'bold' },
  totalValue: { fontSize: 16, color: Colors.textPrimary, fontWeight: 'bold' },
  doneButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  doneButtonText: { color: Colors.background, fontSize: 18, fontWeight: 'bold' },
});
