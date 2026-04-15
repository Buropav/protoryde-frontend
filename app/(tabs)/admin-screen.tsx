import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AppPage, SectionCard, TopBar, StatusChip } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';

const API_BASE_URL = 'http://localhost:8000'; // Make sure this is correct for your environment

type PoolHealthData = {
  active_policies: number;
  pool_balance: number;
  bcr: number;
  status: string;
  reserve_ratio: string;
  simulated_monsoon_impact: {
    expected_claims: number;
    expected_payout: number;
    post_stress_balance: number;
    post_stress_status: string;
  };
};

export default function AdminScreen() {
  const [data, setData] = useState<PoolHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [simulated, setSimulated] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/admin/pool-health`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSimulate = () => {
    setSimulated(true);
  };

  return (
    <View style={styles.container}>
      <TopBar title="Admin Dashboard" />
      <AppPage contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        ) : data ? (
          <>
            <SectionCard>
              <Text style={styles.sectionTitle}>Pool Health</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Active Policies</Text>
                <Text style={styles.statValue}>{data.active_policies}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Pool Balance (Liquidity)</Text>
                <Text style={[styles.statValue, { color: colors.primary }]}>
                  ₹{simulated ? data.simulated_monsoon_impact.post_stress_balance.toLocaleString() : data.pool_balance.toLocaleString()}
                </Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Benefit Cost Ratio (BCR)</Text>
                <Text style={styles.statValue}>{data.bcr}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Status</Text>
                <StatusChip 
                  label={simulated ? data.simulated_monsoon_impact.post_stress_status : data.status} 
                  tone={simulated ? (data.simulated_monsoon_impact.post_stress_balance > 0 ? "success" : "error") : "success"} 
                />
              </View>
            </SectionCard>

            <SectionCard style={{ marginTop: 16 }}>
              <Text style={styles.sectionTitle}>Stress Testing</Text>
              <Text style={styles.description}>
                Simulate a 14-day consecutive monsoon event to verify pool sustainability and liquidity reserves.
              </Text>
              <TouchableOpacity 
                style={[styles.simButton, simulated && styles.simButtonActive]} 
                onPress={handleSimulate}
                disabled={simulated}
              >
                <Text style={styles.simButtonText}>
                  {simulated ? "Stress Test Completed" : "Simulate Monsoon"}
                </Text>
              </TouchableOpacity>

              {simulated && (
                <View style={styles.simResults}>
                  <Text style={styles.resultTitle}>Simulation Results</Text>
                  <Text style={styles.resultText}>Expected Claims: {data.simulated_monsoon_impact.expected_claims}</Text>
                  <Text style={styles.resultText}>Total Payouts: ₹{data.simulated_monsoon_impact.expected_payout.toLocaleString()}</Text>
                  <Text style={[styles.resultText, { marginTop: 8, fontWeight: '700', color: colors.primary }]}>
                    Liquidity dropped but remained solvent.
                  </Text>
                </View>
              )}
            </SectionCard>
          </>
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 40 }}>Failed to load data.</Text>
        )}
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
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  description: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 16,
  },
  simButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  simButtonActive: {
    backgroundColor: colors.surfaceContainerHighest,
  },
  simButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  simResults: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
});
