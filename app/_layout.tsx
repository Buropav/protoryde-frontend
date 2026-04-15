import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../src/constants/colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.background} />
      
      <Stack
        screenOptions={{
          headerShown: false, // Disables native headers (custom headers are used in Stitch UI)
          contentStyle: { backgroundColor: Colors.background }, // Enforces #0A1628 globally
          animation: 'fade', // Default smooth transitions matching Splash cross-fade spec
        }}
      >
        {/* --- Primary Flows --- */}
        <Stack.Screen name="index" /> 
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />

        {/* --- Nested Sub-Flows --- */}
        <Stack.Screen name="trigger-flow" />
        <Stack.Screen name="claims-history" />
        <Stack.Screen name="account" />

        {/* --- Bottom Sheet Modals --- 
          These use 'transparentModal' so the background screen remains visible
          beneath the semi-transparent overlay defined in the Stitch spec.
        */}
        <Stack.Screen
          name="modals/premium-transparency"
          options={{
            presentation: 'transparentModal',
            animation: 'slide_from_bottom',
            contentStyle: { backgroundColor: 'transparent' }, 
          }}
        />
        <Stack.Screen
          name="modals/enhanced-coverage-upsell"
          options={{
            presentation: 'transparentModal',
            animation: 'slide_from_bottom',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </Stack>
    </>
  );
}