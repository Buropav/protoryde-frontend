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
    const buildMockResponse = (): TriggerSimulateResponse => ({
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
          rider_id: params.rider_id || 'unknown',
          claim_id: `clm_${Date.now()}`,
          recommended_payout: 840.0,
          currency: 'INR',
          fraud_check_passed: true,
          fraud_layers: [
            { layer: 'L1_WEATHER_THRESHOLD', passed: true, reason: 'Threshold check passed', evidence: { value: params.trigger_value ?? 65.5, threshold: 30.0 } },
            { layer: 'L2_ZONE_PRESENCE', passed: true, reason: 'GPS confirmed in zone', evidence: { mode: 'simulated' } },
            { layer: 'L3_DELHIVERY_CROSS_REF', passed: true, reason: 'Orders cancelled confirmed', evidence: { total_banking_orders: 5, cancelled_orders: 4, cancellation_rate_pct: 80.0 } },
            { layer: 'L4_BRANCH_CLOSURE_CHECK', passed: true, reason: 'Branch closure verified', evidence: { total_branches: 5, closed_branches: 4, closure_rate_pct: 80.0 } }
          ]
        }
      ]
    } as any);

    if (params.rider_id && params.rider_id.startsWith('demo_rider_')) {
      return buildMockResponse();
    }
    try {
      return await apiPost<TriggerSimulateResponse>('/triggers/simulate', params);
    } catch {
      return buildMockResponse();
    }
  },
  getExclusions: async (): Promise<ExclusionsResponse> => {
    try {
      return await apiGet<ExclusionsResponse>('/exclusions');
    } catch {
      return {
        version: 'v1.0.0-fallback',
        items: [
          'Health, injury, or accident of any kind',
          'Vehicle damage, repair, or maintenance',
          'Income loss due to personal decision not to work',
          'Disruptions caused by war, armed conflict, or military operations',
          'Pandemic or epidemic declared events',
          'Nuclear events or radiation incidents',
          'Disruptions caused by rider platform violations or account suspension',
          'Pre-existing platform bans or rating-based deactivations',
          'Income loss unrelated to an active parametric trigger',
          'Civil unrest or protests the rider participated in',
        ],
      };
    }
  }
};
