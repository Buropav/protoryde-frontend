import { Platform } from 'react-native';

/**
 * Global configuration for the API Base URL.
 * 
 * By default:
 * - Uses EXPO_PUBLIC_API_URL environment variable if set
 * - Falls back to Android emulator localhost (10.0.2.2) on Android
 * - Falls back to standard localhost on iOS / Web
 */
export const API_BASE_URL = 
  process.env.EXPO_PUBLIC_API_URL || 
  (Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api');
