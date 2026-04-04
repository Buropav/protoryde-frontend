import { apiPost } from './apiClient';
import { DemoBootstrapResponse } from '../types/api';

export interface BootstrapDemoParams {
  rider_id: string;
  rider_name: string;
  zone: string;
  upi_id?: string;
  exclusions_accepted: boolean;
}

export const demoService = {
  bootstrapDemo: async (params: BootstrapDemoParams): Promise<DemoBootstrapResponse> => {
    return apiPost<DemoBootstrapResponse>('/demo/bootstrap', params);
  }
};
