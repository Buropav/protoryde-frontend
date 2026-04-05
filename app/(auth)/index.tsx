import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Easing, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Logo size in dp as specified
const LOGO_SIZE = 120;
// Pulsing ring dimensions
const RING_SIZE = LOGO_SIZE + 40;

export default function SplashScreen() {
  // Fade in the whole content
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // Scale-in for logo entrance
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  // Pulsing ring opacity
  const ringPulse = useRef(new Animated.Value(0.3)).current;
  // Pulsing ring scale
  const ringScale = useRef(new Animated.Value(0.95)).current;
  // Second ring (delayed)
  const ringPulse2 = useRef(new Animated.Value(0.15)).current;
  const ringScale2 = useRef(new Animated.Value(0.9)).current;
  // Fade out for cross-fade transition
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Phase 1: Fade in & scale up logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();

    // Phase 2: Start pulsing ring animation (looping)
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(ringPulse, {
            toValue: 0.7,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(ringScale, {
            toValue: 1.08,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(ringPulse, {
            toValue: 0.2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(ringScale, {
            toValue: 0.95,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Second ring — offset timing for layered pulse effect
    const pulseAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(ringPulse2, {
            toValue: 0.4,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(ringScale2, {
            toValue: 1.15,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(ringPulse2, {
            toValue: 0.05,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(ringScale2, {
            toValue: 0.9,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulseAnimation.start();
    pulseAnimation2.start();

    // Phase 3: Auto-advance after 1.5s with cross-fade
    const timer = setTimeout(() => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 400,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        // Navigate: if authenticated → Home, else → Onboarding
        // For now, go to welcome-screen (onboarding step 1)
        router.replace('/welcome-screen');
      });
    }, 1500);

    return () => {
      clearTimeout(timer);
      pulseAnimation.stop();
      pulseAnimation2.stop();
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <LinearGradient
        colors={['#0A1628', '#0D2137', '#0E3150', '#146B6B', '#1ABFAB']}
        locations={[0, 0.25, 0.5, 0.8, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Logo container with pulsing rings */}
          <View style={styles.logoContainer}>
            {/* Outer pulsing ring 2 (larger, more subtle) */}
            <Animated.View
              style={[
                styles.pulseRing,
                styles.pulseRingOuter,
                {
                  opacity: ringPulse2,
                  transform: [{ scale: ringScale2 }],
                },
              ]}
            />
            {/* Inner pulsing ring 1 */}
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  opacity: ringPulse,
                  transform: [{ scale: ringScale }],
                },
              ]}
            />
            {/* Logo image */}
            <Image
              source={require('../../assets/protoryde-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Tagline */}
          <Text style={styles.tagline}>Your income. Protected.</Text>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: RING_SIZE + 40,
    height: RING_SIZE + 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  pulseRing: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 2,
    borderColor: '#5CECC6',
  },
  pulseRingOuter: {
    width: RING_SIZE + 28,
    height: RING_SIZE + 28,
    borderRadius: (RING_SIZE + 28) / 2,
    borderWidth: 1.5,
    borderColor: '#3ED8B0',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    textAlign: 'center',
    opacity: 0.92,
  },
});