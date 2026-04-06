import { Platform } from 'react-native';

const RENDER_API_URL = 'https://protoryde-backend-bqgr.onrender.com/api';
const LOCAL_API_URL = 'http://localhost:8000/api';

/**
 * Global configuration for the API Base URL.
 * 
 * Priority:
 * 1. EXPO_PUBLIC_API_URL environment variable (if set)
 * 2. Platform-specific defaults:
 *    - Web (localhost dev): localhost:8000
 *    - Web (production): Render production URL
 *    - Android emulator: 10.0.2.2:8000
 *    - iOS / Other: localhost:8000
 */
// Normalize the env variable to ensure it ends with /api if it doesn't already
const envApiUrl = process.env.EXPO_PUBLIC_API_URL;
const normalizedEnvUrl = envApiUrl 
  ? (envApiUrl.replace(/\/$/, '').endsWith('/api') ? envApiUrl.replace(/\/$/, '') : `${envApiUrl.replace(/\/$/, '')}/api`)
  : undefined;

const isWebDev = Platform.OS === 'web' && typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE_URL = 
  normalizedEnvUrl || 
  (Platform.OS === 'web' 
    ? (isWebDev ? LOCAL_API_URL : RENDER_API_URL)
    : Platform.OS === 'android' 
      ? 'http://10.0.2.2:8000/api' 
      : LOCAL_API_URL);
