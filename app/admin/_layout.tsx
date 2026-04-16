import { Stack } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.primary,
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Admin Dashboard' }} />
      <Stack.Screen name="map" options={{ title: 'Claims Map' }} />
      <Stack.Screen name="fraud" options={{ title: 'Fraud Review' }} />
    </Stack>
  );
}
