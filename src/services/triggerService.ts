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
        zone: params.zone,
        trigger_type: params.trigger_type,
        trigger_event: {
          value: params.trigger_value ?? 65.5,
          threshold: 30.0,
          breached: true,
        },
        riders_evaluated: 1,
        claims_preview: [
          {
            rider_id: params.rider_id,
            claim_id: `clm_${Date.now()}`,
            recommended_payout: 840.0,
            currency: 'INR',
            fraud_check_passed: true,
            fraud_layers: [
              { layer: 'L1_WEATHER_THRESHOLD', passed: true, reason: 'Mock threshold check', evidence: { value: params.trigger_value ?? 65.5, threshold: 30.0 } },
              { layer: 'L2_ZONE_PRESENCE', passed: true, reason: 'Simulated mode', evidence: { mode: 'simulated' } },
              { layer: 'L3_DELHIVERY_CROSS_REF', passed: true, reason: 'Mock delhivery check', evidence: { total_banking_orders: 5, cancelled_orders: 4, cancellation_rate_pct: 80.0 } },
              { layer: 'L4_BRANCH_CLOSURE_CHECK', passed: true, reason: 'Mock branch check', evidence: { total_branches: 5, closed_branches: 4, closure_rate_pct: 80.0 } }
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
