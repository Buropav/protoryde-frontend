import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Feather } from '@expo/vector-icons';
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
  const [code, setCode] = useState<string>('');

  const handlePress = (val: string) => {
    if (code.length < 6) {
      setCode(prev => prev + val);
    }
  };

  const handleBackspace = () => {
    setCode(prev => prev.slice(0, -1));
  };

  const handleVerify = () => {
    // Keeps functionality mocked so any value (or no value) can be entered and passed
    router.push('/onboarding/personal-details-kyc' as any);
  };

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      const isActive = i === code.length || (i === 5 && code.length === 6);
      const isFilled = i < code.length;
      boxes.push(
        <View 
          key={i} 
          style={[
            styles.otpBox, 
            isActive && styles.otpBoxActive
          ]}
        >
          <Text style={styles.otpText}>{isFilled ? code[i] : ''}</Text>
        </View>
      );
    }
    return boxes;
  };

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', 'delete']
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.topSection}>
          <View style={styles.graphicContainer}>
             <RiderGraphic />
          </View>
          
          <Text style={styles.title}>
            Enter the 6-digit code sent{'\n'}to +91 98XXX XXXXX
          </Text>

          <View style={styles.boxesContainer}>
            {renderBoxes()}
          </View>
          
          <Text style={styles.resendText}>Resend in 0:45</Text>
        </View>

        <View style={styles.bottomSection}>
          <Pressable style={styles.verifyBtn} onPress={handleVerify}>
            <Text style={styles.verifyBtnText}>Verify</Text>
          </Pressable>

          <View style={styles.keypad}>
            {keys.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.keyRow}>
                {row.map((key) => {
                  if (key === 'delete') {
                    return (
                      <Pressable 
                        key={key} 
                        style={styles.keyButton} 
                        onPress={handleBackspace}
                      >
                        <View style={styles.bsIcon}>
                          <Feather name="delete" size={18} color="#FFFFFF" />
                        </View>
                      </Pressable>
                    );
                  }
                  
                  return (
                    <Pressable 
                      key={key} 
                      style={styles.keyButton}
                      onPress={() => handlePress(key)}
                    >
                      <Text style={styles.keyText}>{key}</Text>
                      {key !== '*' && key !== '0' && <Text style={styles.keySubText}>{
                         key === '2' ? 'ABC' : 
                         key === '3' ? 'DEF' : 
                         key === '4' ? 'GHI' : 
                         key === '5' ? 'JKL' : 
                         key === '6' ? 'MNO' : 
                         key === '7' ? 'PQRS' : 
                         key === '8' ? 'TUV' : 
                         key === '9' ? 'WXYZ' : ''
                      }</Text>}
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B121C' },
  container: { flex: 1, justifyContent: 'space-between' },
  topSection: {
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
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
    marginBottom: 24,
  },
  otpBox: {
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
  otpText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resendText: {
    fontSize: 14,
    color: '#8A94A6',
  },
  bottomSection: {
    backgroundColor: '#0E1624',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  verifyBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  verifyBtnText: {
    color: '#0B121C',
    fontSize: 18,
    fontWeight: '700',
  },
  keypad: {
    gap: 16,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keyButton: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  keySubText: {
    fontSize: 10,
    color: '#5C6A7D',
    marginTop: 2,
    fontWeight: '600',
  },
  bsIcon: {
    backgroundColor: '#1C2738',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
