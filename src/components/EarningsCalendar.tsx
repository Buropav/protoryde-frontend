import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { RiderCalendarItem } from '../types/api';

interface EarningsCalendarProps {
  data: RiderCalendarItem[];
}

export const EarningsCalendar: React.FC<EarningsCalendarProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-Day Earnings</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {data.map((item, index) => (
          <View key={index} style={styles.dayCard}>
            <Text style={styles.dayText}>{new Date(item.date).toLocaleDateString('en-IN', { weekday: 'short' })}</Text>
            <Text style={styles.dateText}>{new Date(item.date).getDate()}</Text>
            
            <View style={styles.amountContainer}>
              <Text style={styles.deliveryText}>₹{item.delhivery_earnings}</Text>
              {item.claim_payout > 0 && (
                <Text style={styles.payoutText}>+₹{item.claim_payout}</Text>
              )}
            </View>

            <View style={[styles.statusIndicator, item.protected ? styles.statusProtected : styles.statusUnprotected]} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 24, marginBottom: 24 },
  title: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 16 },
  scrollContent: { gap: 12 },
  dayCard: { 
    backgroundColor: Colors.cardFill, 
    padding: 12, 
    borderRadius: 12, 
    width: 80, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border
  },
  dayText: { fontSize: 12, color: Colors.textSecondary, textTransform: 'uppercase' },
  dateText: { fontSize: 20, fontWeight: 'bold', color: Colors.textPrimary, marginVertical: 4 },
  amountContainer: { alignItems: 'center', marginTop: 4 },
  deliveryText: { fontSize: 12, color: Colors.textSecondary },
  payoutText: { fontSize: 12, color: Colors.success, fontWeight: 'bold' },
  statusIndicator: { width: '100%', height: 4, borderRadius: 2, marginTop: 8 },
  statusProtected: { backgroundColor: Colors.primary },
  statusUnprotected: { backgroundColor: Colors.textMuted },
});
