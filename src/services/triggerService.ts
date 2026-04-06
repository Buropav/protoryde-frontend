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
    if (params.rider_id && params.rider_id.startsWith('demo_rider_')) {
      return {
        simulation_id: `sim_${Date.now()}`,
        trigger_event: {
          event_id: `evt_${Date.now()}`,
          trigger_type: params.trigger_type,
          zone: params.zone,
          value: params.trigger_value ?? 65.5,
          timestamp: new Date().toISOString(),
          source: 'MockWeatherAPI'
        },
        claims_preview: [
          {
            rider_id: params.rider_id,
            claim_id: `clm_${Date.now()}`,
            base_payout: 400.0,
            recommended_payout: 350.0,
            fraud_check_passed: true,
            fraud_layers: [
              { layer: 'L1_WEATHER_THRESHOLD', passed: true, score: 0 },
              { layer: 'L2_ZONE_PRESENCE', passed: true, score: 0, evidence: { distance_km: 1.2 } },
              { layer: 'L3_DELHIVERY_CROSS_REF', passed: true, score: 0, evidence: { total_banking_orders: 5, cancelled_orders: 3 } }
            ]
          }
        ]
      } as any;
    }
    return apiPost<TriggerSimulateResponse>('/triggers/simulate', params);
  },
  getExclusions: async (): Promise<ExclusionsResponse> => {
    return apiGet<ExclusionsResponse>('/exclusions');
  }
};
