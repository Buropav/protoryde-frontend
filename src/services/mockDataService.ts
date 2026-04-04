import { apiGet } from './apiClient';
import { DelhiveryMetricsResponse, BranchMetricsResponse } from '../types/api';

export const mockDataService = {
  getDelhiveryMetrics: async (zone: string, date: string): Promise<DelhiveryMetricsResponse> => {
    return apiGet<DelhiveryMetricsResponse>(`/mock/delhivery/${encodeURIComponent(zone)}/${encodeURIComponent(date)}`);
  },
  getBranchMetrics: async (zone: string): Promise<BranchMetricsResponse> => {
    return apiGet<BranchMetricsResponse>(`/mock/branches/${encodeURIComponent(zone)}`);
  }
};
