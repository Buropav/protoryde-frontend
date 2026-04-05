import { apiGet } from './apiClient';
import { RiderClaimsResponse } from '../types/api';

export interface AdminClaimsParams {
  zone?: string;
  trigger_type?: string;
  is_simulated?: boolean;
  limit?: number;
}

export const claimsService = {
  getRiderClaims: async (riderId: string): Promise<RiderClaimsResponse> => {
    if (riderId.startsWith('demo_rider_')) {
      return {
        rider_id: riderId,
        count: 0,
        claims: []
      };
    }
    return apiGet<RiderClaimsResponse>(`/claims/${riderId}`);
  },
  getAdminClaims: async (params?: AdminClaimsParams): Promise<RiderClaimsResponse> => {
    let url = '/claims';
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.zone) queryParams.append('zone', params.zone);
      if (params.trigger_type) queryParams.append('trigger_type', params.trigger_type);
      if (params.is_simulated !== undefined) queryParams.append('is_simulated', String(params.is_simulated));
      if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
      
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    return apiGet<RiderClaimsResponse>(url);
  }
};
