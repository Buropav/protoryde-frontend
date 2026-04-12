import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, SectionCard, TopBar } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { useRider } from '../../src/hooks/useRider';

export default function PersonalInformationScreen() {
  const { riderName, phoneNumber, riderId, zone, upiId } = useRider();

  return (
    <View style={styles.container}>
      <TopBar title="Personal Information" onBack={() => router.back()} />
      <AppPage contentContainerStyle={styles.content}>
        <SectionCard>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{riderName || 'Not set'}</Text>
        </SectionCard>

        <SectionCard>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{phoneNumber || 'Not set'}</Text>
        </SectionCard>

        <SectionCard>
          <Text style={styles.label}>Rider ID</Text>
          <Text style={styles.value}>{riderId || 'Not set'}</Text>
        </SectionCard>

        <SectionCard>
          <Text style={styles.label}>Delivery Zone</Text>
          <Text style={styles.value}>{zone || 'HSR Layout'}</Text>
        </SectionCard>

        <SectionCard>
          <Text style={styles.label}>UPI ID</Text>
          <Text style={styles.value}>{upiId || 'Not set'}</Text>
        </SectionCard>
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
  label: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    marginBottom: 6,
  },
  value: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '700',
  },
});
