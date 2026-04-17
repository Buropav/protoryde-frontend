import { apiPost } from "./apiClient";

export interface PayoutInitiateParams {
  claim_id: string;
  rider_id: string;
  amount: number;
  upi_id?: string;
}

export const payoutService = {
  initiatePayout: async (params: PayoutInitiateParams): Promise<any> => {
    return apiPost("/payouts/initiate", params);
  },
};
