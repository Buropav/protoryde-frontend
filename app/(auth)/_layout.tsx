import { Stack } from 'expo-router';
import { colors } from '../../src/constants/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.surface },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome-screen" />
      <Stack.Screen name="personal-details" />
      <Stack.Screen name="partner-details" />
      <Stack.Screen name="premium-reveal" />
    </Stack>
  );
}