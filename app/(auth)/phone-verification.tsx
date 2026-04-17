import React, { useMemo, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "../../src/constants/colors";
import ProtoRydeLogo from "../../src/components/ProtoRydeLogo";
import { MaterialIcons } from "@expo/vector-icons";

export default function PhoneVerificationScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  // Allow only digits when processing logic
  const phoneDigits = useMemo(() => phone.replace(/\D/g, ""), [phone]);
  const canContinue = phoneDigits.length === 10;

  const handleContinue = () => {
    if (!canContinue) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    router.push("/(auth)/otp-verification" as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            
            {/* Logo */}
            <View style={styles.logoContainer}>
              <ProtoRydeLogo width={160} height={160} />
            </View>

            {/* Title */}
            <Text style={styles.title}>Secure Your Income</Text>

            {/* Input Label */}
            <Text style={styles.label}>Your Delhivery partner number</Text>

            {/* Input Container */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="98XXXXXXXX"
                placeholderTextColor={Colors.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(value) => {
                  const digits = value.replace(/\D/g, "").slice(0, 10);
                  setPhone(digits);
                  if (error) setError("");
                }}
                maxLength={10}
              />
              <View style={styles.iconContainer}>
                <MaterialIcons name="sim-card" size={24} color={Colors.primary} />
              </View>
            </View>
            
            {/* Subtitle / Helper text */}
            <Text style={styles.subtitle}>
              We'll send a 6-digit code.
            </Text>

            {!!error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.spacer} />

            {/* Button */}
            <Pressable
              style={[styles.button, !canContinue && styles.buttonDisabled]}
              onPress={handleContinue}
              disabled={!canContinue}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
              <MaterialIcons name="arrow-forward" size={22} color={Colors.background} style={{ marginLeft: 8 }} />
            </Pressable>
            
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: Colors.background 
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 24, 
    paddingVertical: 32 
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 40,
  },
  label: { 
    fontSize: 16, 
    color: Colors.textSecondary,
    marginBottom: 10,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.cardFill,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 60,
  },
  input: { 
    flex: 1, 
    color: Colors.textPrimary, 
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: "600",
  },
  iconContainer: {
    paddingLeft: 12,
  },
  subtitle: { 
    fontSize: 14, 
    color: Colors.textMuted, 
    marginTop: 10,
  },
  errorText: { 
    color: Colors.error, 
    fontSize: 13, 
    marginTop: 8 
  },
  spacer: { 
    flex: 1 
  },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: { 
    opacity: 0.5 
  },
  buttonText: { 
    color: Colors.background, 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});
