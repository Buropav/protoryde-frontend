import { apiGet } from './apiClient';
import { RiderClaimsResponse } from '../types/api';

export const claimsService = {
  getRiderClaims: async (riderId: string): Promise<RiderClaimsResponse> => {
    return apiGet<RiderClaimsResponse>(`/claims/${riderId}`);
  }
};
