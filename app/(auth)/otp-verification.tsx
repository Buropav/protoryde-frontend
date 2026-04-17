import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const RiderGraphic = () => (
  <Svg width="140" height="100" viewBox="0 0 140 100" fill="none">
    {/* Umbrella/Shield Arch */}
    <Path d="M 25 35 C 50 15, 90 15, 115 35 L 115 45 C 90 30, 50 30, 25 45 Z" stroke="#6893B8" strokeWidth="2.5" strokeLinejoin="round" />
    <Path d="M 33 41 L 33 60 M 107 41 L 107 60" stroke="#6893B8" strokeWidth="2" strokeLinecap="round" />
    <Circle cx="70" cy="40" r="7" stroke="#6893B8" strokeWidth="2.5" />
    <Path d="M 52 65 C 55 52, 85 52, 88 65 L 85 70 C 80 62, 60 62, 55 70 Z" stroke="#6893B8" strokeWidth="2.5" strokeLinejoin="round" />
    <Path d="M 64 65 L 64 90 M 76 65 L 76 90" stroke="#6893B8" strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M 55 68 L 85 68" stroke="#6893B8" strokeWidth="2.5" strokeLinecap="round" />
    <Circle cx="70" cy="68" r="5" fill="#DEB169" />
    <Path d="M 68 90 L 68 100 M 72 90 L 72 100" stroke="#6893B8" strokeWidth="2.5" strokeLinecap="round" />
    {/* Curved road line */}
    <Path d="M 20 95 L 60 95 C 75 95, 80 82, 100 70 L 125 70" stroke="#6893B8" strokeWidth="3" strokeLinecap="round" />
  </Svg>
);

export default function OTPVerificationScreen() {
  const router = useRouter();
  // Using an array of refs and individual state for the professional 6-input box setup
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleVerify = () => {
    // Keeps functionality mocked so any value (or no value) can be entered and passed
    router.push('/onboarding/personal-details-kyc' as any);
  };

  const handleOtpChange = (text: string, index: number) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otpDigits];

    if (numericText.length > 1) {
      // Handle paste
      const pastedArray = numericText.split('').slice(0, 6 - index);
      for (let i = 0; i < pastedArray.length; i++) {
        newOtp[index + i] = pastedArray[i];
      }
      setOtpDigits(newOtp);
      
      const nextIndex = Math.min(index + pastedArray.length, 5);
      if (inputsRef.current[nextIndex]) {
        inputsRef.current[nextIndex]?.focus();
      }
      return;
    }

    newOtp[index] = numericText;
    setOtpDigits(newOtp);

    // Auto advance
    if (numericText && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpDigits[index] && index > 0) {
      // If box is empty and user hits backspace, focus the previous box and clear it
      inputsRef.current[index - 1]?.focus();
      const newOtp = [...otpDigits];
      newOtp[index - 1] = '';
      setOtpDigits(newOtp);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.container}>
          
          <View style={styles.topSection}>
            <View style={styles.graphicContainer}>
               <RiderGraphic />
            </View>
            
            <Text style={styles.title}>
              Enter the 6-digit code sent{'\n'}to +91 98XXX XXXXX
            </Text>

            <View style={styles.boxesContainer}>
              {otpDigits.map((digit, index) => {
                const isFilled = digit.length > 0;
                // Currently active box is the first empty box, or the last box if all are full
                const firstEmptyIndex = otpDigits.findIndex(d => d === '');
                const activeIndex = firstEmptyIndex === -1 ? 5 : firstEmptyIndex;
                const isActive = index === activeIndex;

                return (
                  <View 
                    key={index}
                    style={[
                      styles.otpBoxWrapper,
                      isActive && styles.otpBoxActive
                    ]}
                  >
                    <TextInput
                      ref={(ref) => { inputsRef.current[index] = ref; }}
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={index === 0 ? 6 : 1} // allow paste only on first box natively
                      value={digit}
                      onChangeText={(text) => handleOtpChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      textContentType="oneTimeCode"
                      autoFocus={index === 0}
                    />
                  </View>
                );
              })}
            </View>
            
            <Text style={styles.resendText}>Resend in 0:45</Text>
          </View>

          <View style={styles.bottomSection}>
            <Pressable style={styles.verifyBtn} onPress={handleVerify}>
              <Text style={styles.verifyBtnText}>Verify</Text>
            </Pressable>
          </View>
          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B121C' },
  keyboardAvoidingView: { flex: 1 },
  container: { flex: 1, justifyContent: 'space-between' },
  topSection: {
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
    flex: 1,
  },
  graphicContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 32,
    letterSpacing: -0.5,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    marginBottom: 24,
  },
  otpBoxWrapper: {
    width: 45,
    height: 54,
    backgroundColor: '#121C2B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  otpBoxActive: {
    borderColor: Colors.primary,
  },
  otpInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resendText: {
    fontSize: 14,
    color: '#8A94A6',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  verifyBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyBtnText: {
    color: '#0B121C',
    fontSize: 18,
    fontWeight: '700',
  }
});
