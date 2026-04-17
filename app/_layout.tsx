import { useEffect } from "react";
import { Platform } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RiderProvider } from "../src/context/RiderContext";
import { Colors } from "../src/constants/colors";

const PHONE_FRAME_CSS = \n  html, body {\n    background-color: #0A1628 !important;\n    min-height: 100vh !important;\n    margin: 0;\n  }\n  #root {\n    display: flex;\n    flex: 1;\n    min-height: 100vh;\n  }\n@media (min-width: 640px) {\n  html, body {\n    background-color: #000000 !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    min-height: 100vh !important;\n  }\n  #root {\n    width: 360px !important;\n    max-width: 360px !important;\n    height: 780px !important;\n    max-height: 95vh !important;\n    min-height: auto !important;\n    border-radius: 36px !important;\n    border: 7px solid #4b5563 !important;\n    overflow: hidden !important;\n    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;\n    position: relative !important;\n  }\n}\n;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 100vh !important;
  }
  #root {
    width: 340px !important;
    max-width: 340px !important;
    height: 780px !important;
    max-height: 95vh !important;
    border-radius: 36px !important;
    border: 7px solid #4b5563 !important;
    overflow: hidden !important;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
    position: relative !important;
  }
}
`;

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "web") {
      const style = document.createElement("style");
      style.id = "phone-frame-css";
      style.textContent = PHONE_FRAME_CSS;
      document.head.appendChild(style);
      return () => {
        style.remove();
      };
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RiderProvider>
          <StatusBar style="light" backgroundColor={Colors.background} />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: Colors.background },
              animation: "fade",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="modals/premium-transparency"
              options={{
                presentation: "transparentModal",
                animation: "slide_from_bottom",
                contentStyle: { backgroundColor: "transparent" },
              }}
            />
            <Stack.Screen
              name="modals/enhanced-coverage-upsell"
              options={{
                presentation: "transparentModal",
                animation: "slide_from_bottom",
                contentStyle: { backgroundColor: "transparent" },
              }}
            />
          </Stack>
        </RiderProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
