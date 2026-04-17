import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "../../src/constants/colors";

export default function PhoneVerificationScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
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
      <View style={styles.container}>
        <Text style={styles.title}>Phone Verification</Text>
        <Text style={styles.subtitle}>
          Enter your mobile number to receive an active code.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="000 000 0000"
            placeholderTextColor={Colors.textMuted}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(value) => {
              const digits = value.replace(/\D/g, "").slice(0, 10);
              setPhone(digits);
              if (error) setError("");
            }}
          />
        </View>
        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.spacer} />

        <Pressable
          style={[styles.button, !canContinue && styles.buttonDisabled]}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginBottom: 32 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.cardFill,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    height: 56,
  },
  prefix: {
    fontSize: 18,
    color: Colors.textPrimary,
    marginRight: 12,
    fontWeight: "600",
  },
  input: { flex: 1, color: Colors.textPrimary, fontSize: 18 },
  errorText: { color: Colors.error, fontSize: 13, marginTop: 10 },
  spacer: { flex: 1 },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: Colors.background, fontSize: 18, fontWeight: "bold" },
});
