import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { router } from 'expo-router';
import ProtoRydeLogo from '../src/components/ProtoRydeLogo';
import { useRider } from '../src/hooks/useRider';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LOGO_SIZE = 140;

export default function SplashScreen() {
  const { isBootstrapped } = useRider();
  // Fade in the whole content
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // Slide up content
  const translateY = useRef(new Animated.Value(30)).current;

  const dotsOpacity = useRef(new Animated.Value(0)).current;

  // Fade out for cross-fade transition
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse dots
    const pulseDots = Animated.loop(
      Animated.sequence([
        Animated.timing(dotsOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(dotsOpacity, {
          toValue: 0.3,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseDots.start();

    // Phase 3: Auto-advance after 2s with cross-fade Smooth transition
    const timer = setTimeout(() => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        // Navigate
        if (isBootstrapped) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/phone-verification');
        }
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      pulseDots.stop();
    };
  }, [isBootstrapped, fadeAnim, fadeOut, translateY, dotsOpacity]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <ProtoRydeLogo width={LOGO_SIZE} height={LOGO_SIZE} />
        
        <Text style={styles.title}>ProtoRyde</Text>
        <Text style={styles.tagline}>Your income. Protected.</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060F1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3ED8B0',
    marginTop: 16,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E0E6ED',
    letterSpacing: 0.3,
    marginTop: 8,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3ED8B0',
    opacity: 0.8,
  },
  loadingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3ED8B0',
    letterSpacing: 1.5,
    opacity: 0.6,
  }
});
