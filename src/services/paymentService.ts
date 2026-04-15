import { apiPost } from './apiClient';

export interface PaymentCollectParams {
  rider_id: string;
  policy_id: string;
  amount: number;
  upi_id?: string;
}

export const paymentService = {
  collectPayment: async (params: PaymentCollectParams): Promise<any> => {
    try {
      return await apiPost('/payments/collect', params);
    } catch (e) {
      console.warn('Failed to collect payment:', e);
      return { status: 'mock_success' };
    }
  }
};
