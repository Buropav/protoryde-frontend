import { Platform } from 'react-native';

const RENDER_API_URL = 'https://protoryde-backend-bqgr.onrender.com/api';

/**
 * Global configuration for the API Base URL.
 * 
 * Priority:
 * 1. EXPO_PUBLIC_API_URL environment variable (if set)
 * 2. Platform-specific defaults:
 *    - Web: Render production URL
 *    - Android emulator: 10.0.2.2:8000
 *    - iOS / Other: localhost:8000
 */
// Normalize the env variable to ensure it ends with /api if it doesn't already
const envApiUrl = process.env.EXPO_PUBLIC_API_URL;
const normalizedEnvUrl = envApiUrl 
  ? (envApiUrl.replace(/\/$/, '').endsWith('/api') ? envApiUrl.replace(/\/$/, '') : `${envApiUrl.replace(/\/$/, '')}/api`)
  : undefined;

export const API_BASE_URL = 
  normalizedEnvUrl || 
  (Platform.OS === 'web' 
    ? RENDER_API_URL
    : Platform.OS === 'android' 
      ? 'http://10.0.2.2:8000/api' 
      : 'http://localhost:8000/api');
