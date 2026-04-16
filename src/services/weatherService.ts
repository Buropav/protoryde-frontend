import { apiGet } from './apiClient';
import { WeatherCurrentResponse, WeatherWarningsResponse } from '../types/api';

export const weatherService = {
  getCurrentWeather: async (zone: string): Promise<WeatherCurrentResponse> => {
    const url = `/weather/current/${encodeURIComponent(zone)}`;
    return apiGet<WeatherCurrentResponse>(url);
  },
  getWeatherWarnings: async (zone: string): Promise<WeatherWarningsResponse> => {
    const url = `/weather/warnings/${encodeURIComponent(zone)}`;
    return apiGet<WeatherWarningsResponse>(url);
  }
};
