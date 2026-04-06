import { apiPost, apiGet } from './apiClient';
import { API_BASE_URL } from '../config/api';
import { PolicyActivateResponse, CurrentPolicyResponse, PolicyHistoryResponse } from '../types/api';

export interface PolicyActivateParams {
  rider_id: string;
  zone: string;
  exclusions_accepted: boolean;
  prefer_ml?: boolean;
  weather_severity?: number;
  claim_history?: number;
  coverage_cap?: number;
}

export const policyService = {
  activatePolicy: async (params: PolicyActivateParams): Promise<PolicyActivateResponse> => {
    if (params.rider_id && params.rider_id.startsWith('demo_rider_')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            policy_id: `mock_pol_${Date.now()}`,
            rider_id: params.rider_id,
            zone: params.zone,
            status: 'active',
            base_premium: 30.54,
            final_premium: 30.54,
            premium_breakdown: [],
            premium_engine: 'mock',
            exclusions_version: 'v1.0',
            exclusions_acknowledged_at: new Date().toISOString()
          });
        }, 600); // Simulate network delay for UX
      });
    }
    return apiPost<PolicyActivateResponse>('/policies/activate', params);
  },
  getCurrentPolicy: async (riderId: string): Promise<CurrentPolicyResponse> => {
    if (riderId.startsWith('demo_rider_')) {
      return {
        policy_id: `mock_pol_${Date.now()}`,
        rider_id: riderId,
        week_start_date: new Date().toISOString(),
        week_end_date: new Date(Date.now() + 7 * 86400000).toISOString(),
        base_premium: 30.54,
        final_premium: 30.54,
        premium_breakdown: [],
        coverage_cap: 2300,
        status: 'active',
        exclusions_version: 'v1.0',
        exclusions_acknowledged_at: new Date().toISOString()
      };
    }
    return apiGet<CurrentPolicyResponse>(`/policies/${riderId}/current`);
  },
  getPolicyHistory: async (riderId: string): Promise<PolicyHistoryResponse> => {
    if (riderId.startsWith('demo_rider_')) {
      return {
        rider_id: riderId,
        count: 0,
        policies: [] // No prior entries for the mock rider
      };
    }
    return apiGet<PolicyHistoryResponse>(`/policies/${riderId}/history`);
  },
  downloadPolicyPdf: async (riderId: string): Promise<Blob> => {
    if (riderId.startsWith('demo_rider_')) {
      return new Blob(["Mock PDF Content"], { type: "application/pdf" });
    }
    const response = await fetch(`${API_BASE_URL}/policies/${riderId}/current/document`);
    if (!response.ok) {
      throw new Error(`Failed to download policy PDF: ${response.status}`);
    }
    return response.blob();
  }
};
