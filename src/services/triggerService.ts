import { apiPost, apiGet } from './apiClient';
import { TriggerSimulateResponse, ExclusionsResponse } from '../types/api';

export interface SimulateTriggerParams {
  zone: string;
  trigger_type: string;
  rider_id?: string;
  is_simulated?: boolean;
  trigger_value?: number;
}

export const triggerService = {
  simulateTrigger: async (params: SimulateTriggerParams): Promise<TriggerSimulateResponse> => {
    return apiPost<TriggerSimulateResponse>('/triggers/simulate', params);
  },
  getExclusions: async (): Promise<ExclusionsResponse> => {
    return apiGet<ExclusionsResponse>('/triggers/exclusions');
  }
};
