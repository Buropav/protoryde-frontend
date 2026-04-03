import { Stack } from 'expo-router';
import { colors } from '../../src/constants/colors';

export default function TriggerFlowLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.surface },
        presentation: 'modal',
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="weather-alert-screen" />
      <Stack.Screen name="active-trigger-screen" />
      <Stack.Screen name="payout-confirmation-screen" />
    </Stack>
  );
}