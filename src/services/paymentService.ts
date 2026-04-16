import { apiPost } from './apiClient';

export interface PaymentCollectParams {
  rider_id: string;
  policy_id: string;
  amount: number;
  upi_id?: string;
}

export const paymentService = {
  collectPayment: async (params: PaymentCollectParams): Promise<any> => {
    return apiPost('/payments/collect', params);
  }
};
