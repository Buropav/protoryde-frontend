import { apiPost, apiGet } from './apiClient';
import { PolicyActivateResponse, CurrentPolicyResponse } from '../types/api';

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
  }
};
