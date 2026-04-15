import { apiPost } from './apiClient';

export interface PayoutInitiateParams {
  claim_id: string;
  rider_id: string;
  amount: number;
  upi_id?: string;
}

export const payoutService = {
  initiatePayout: async (params: PayoutInitiateParams): Promise<any> => {
    try {
      return await apiPost('/payouts/initiate', params);
    } catch (e) {
      console.warn('Failed to initiate payout:', e);
      return { status: 'mock_success' };
    }
  }
};
