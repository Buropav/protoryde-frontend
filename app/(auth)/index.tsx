import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../src/constants/colors';
import ProtoRydeLogo from '../../src/components/ProtoRydeLogo';

export default function SplashScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/welcome-screen');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={{ marginBottom: 32, alignItems: 'center' }}>
          <ProtoRydeLogo width={120} height={120} />
        </View>

        <Text style={styles.title}>ProtoRyde</Text>
        <Text style={styles.subtitle}>Income Protection for Delivery Partners</Text>
      </Animated.View>

      <View style={styles.bottomSection}>
        <View style={styles.loadingContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 0,
  },
  shieldIcon: {
    fontSize: 64,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.onSurface,
    letterSpacing: 1,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  bottomSection: {
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    opacity: 0.3,
  },
  dotActive: {
    opacity: 1,
  },
  footer: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.onSurface,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
});