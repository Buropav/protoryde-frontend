import { apiGet } from './apiClient';
import { 
  AdminMetricsResponse, 
  AdminClaimsMapResponse, 
  AdminFraudFlagsResponse,
  WeatherCurrentResponse
} from '../types/api';

export const adminService = {
  getMetrics: async (): Promise<AdminMetricsResponse> => {
    return apiGet<AdminMetricsResponse>('/admin/metrics');
  },
  getClaimsMap: async (): Promise<AdminClaimsMapResponse> => {
    return apiGet<AdminClaimsMapResponse>('/admin/claims_map');
  },
  getFraudFlags: async (): Promise<AdminFraudFlagsResponse> => {
    return apiGet<AdminFraudFlagsResponse>('/admin/fraud_flags');
  },
  getPredictions: async (zone: string): Promise<WeatherCurrentResponse> => {
    return apiGet<WeatherCurrentResponse>(`/admin/predictions?zone=${encodeURIComponent(zone)}`);
  }
};
