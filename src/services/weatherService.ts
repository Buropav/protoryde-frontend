import { apiGet } from './apiClient';
import { WeatherCurrentResponse, WeatherWarningsResponse } from '../types/api';

export const weatherService = {
  getCurrentWeather: async (zone: string, isSimulated?: boolean): Promise<WeatherCurrentResponse> => {
    try {
      let url = `/weather/current/${encodeURIComponent(zone)}`;
      if (isSimulated !== undefined) {
        url += `?is_simulated=${isSimulated}`;
      }
      return await apiGet<WeatherCurrentResponse>(url);
    } catch {
      return {
        zone,
        timestamp: new Date().toISOString(),
        source: 'fallback',
        is_simulated: true,
        conditions: {
          temp_c: 31,
          rain_24h_mm: 42,
          wind_kph: 18,
          aqi: 145,
          description: 'Partly Cloudy',
        },
        trigger_view: {
          rain_24h_mm: { threshold: 30, breached: true },
          heavy_rain: { threshold: 30, breached: true },
          aqi: { threshold: 300, breached: false },
        },
      };
    }
  },
  getWeatherWarnings: async (zone: string, isSimulated?: boolean): Promise<WeatherWarningsResponse> => {
    try {
      let url = `/weather/warnings/${encodeURIComponent(zone)}`;
      if (isSimulated !== undefined) {
        url += `?is_simulated=${isSimulated}`;
      }
      return await apiGet<WeatherWarningsResponse>(url);
    } catch {
      return { zone, warnings: [] };
    }
  }
};
