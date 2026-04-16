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
    return apiPost<PolicyActivateResponse>('/policies/activate', params);
  },
  getCurrentPolicy: async (riderId: string): Promise<CurrentPolicyResponse> => {
    return apiGet<CurrentPolicyResponse>(`/policies/${riderId}/current`);
  },
  getPolicyHistory: async (riderId: string): Promise<PolicyHistoryResponse> => {
    return apiGet<PolicyHistoryResponse>(`/policies/${riderId}/history`);
  },
  downloadPolicyPdf: async (riderId: string): Promise<Blob> => {
    const response = await fetch(`${API_BASE_URL}/policies/${riderId}/current/document`);
    if (!response.ok) {
      throw new Error(`Failed to download policy PDF: ${response.status}`);
    }
    return response.blob();
  },
  getLockoutStatus: async (zone: string): Promise<{ lockout_active: boolean; reason?: string }> => {
    return apiGet<{ lockout_active: boolean; reason?: string }>(`/policy/eligibility?zone=${encodeURIComponent(zone)}`);
  },
  upgradePolicy: async (policyId: string): Promise<PolicyActivateResponse> => {
    return apiPost<PolicyActivateResponse>(`/policy/${policyId}/upgrade`, {});
  }
};
