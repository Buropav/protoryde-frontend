import { apiGet } from './apiClient';
import { WeatherCurrentResponse, WeatherWarningsResponse } from '../types/api';

export const weatherService = {
  getCurrentWeather: async (zone: string, isSimulated?: boolean): Promise<WeatherCurrentResponse> => {
    let url = `/weather/current/${encodeURIComponent(zone)}`;
    if (isSimulated !== undefined) {
      url += `?is_simulated=${isSimulated}`;
    }
    return apiGet<WeatherCurrentResponse>(url);
  },
  getWeatherWarnings: async (zone: string, isSimulated?: boolean): Promise<WeatherWarningsResponse> => {
    let url = `/weather/warnings/${encodeURIComponent(zone)}`;
    if (isSimulated !== undefined) {
      url += `?is_simulated=${isSimulated}`;
    }
    return apiGet<WeatherWarningsResponse>(url);
  }
};
