import { apiGet } from './apiClient';
import { DelhiveryMetricsResponse, BranchMetricsResponse } from '../types/api';

export const mockDataService = {
  getDelhiveryMetrics: async (zone: string, date: string): Promise<DelhiveryMetricsResponse> => {
    try {
      return await apiGet<DelhiveryMetricsResponse>(`/mock/delhivery/${encodeURIComponent(zone)}/${encodeURIComponent(date)}`);
    } catch {
      return {
        zone,
        date,
        total_banking_orders: 12,
        cancelled_orders: 4,
        cancellation_rate_pct: 33.3,
        note: 'Fallback data',
      };
    }
  },
  getBranchMetrics: async (zone: string): Promise<BranchMetricsResponse> => {
    try {
      return await apiGet<BranchMetricsResponse>(`/mock/branches/${encodeURIComponent(zone)}`);
    } catch {
      return {
        zone,
        total_branches: 8,
        closed_branches: 2,
        closure_rate_pct: 25,
        threshold_pct: 50,
        trigger_breached: false,
      };
    }
  }
};
