import { apiGet } from './apiClient';
import { WeatherCurrentResponse } from '../types/api';

export const weatherService = {
  getCurrentWeather: async (zone: string, isSimulated?: boolean): Promise<WeatherCurrentResponse> => {
    let url = `/weather/current/${encodeURIComponent(zone)}`;
    if (isSimulated !== undefined) {
      url += `?is_simulated=${isSimulated}`;
    }
    return apiGet<WeatherCurrentResponse>(url);
  }
};
