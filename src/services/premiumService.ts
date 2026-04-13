import { apiPost, apiGet } from './apiClient';
import { PremiumPredictResponse, ModelStatusResponse } from '../types/api';

export interface PredictPremiumParams {
  zone: string;
  prefer_ml?: boolean;
  weather_severity?: number;
  claim_history?: number;
  zone_risk_score?: number;
}

const MOCK_ZONE_DEFAULTS: Record<string, any> = {
  'HSR Layout': { risk_score: 'Medium', base_premium: 89 },
  'Koramangala': { risk_score: 'High', base_premium: 105 },
  'Indiranagar': { risk_score: 'Medium', base_premium: 92 },
  'Whitefield': { risk_score: 'Low', base_premium: 67 },
  'Jayanagar': { risk_score: 'Low', base_premium: 72 },
  'Electronic City': { risk_score: 'Medium', base_premium: 84 },
};

export const premiumService = {
  predictPremium: async (params: PredictPremiumParams): Promise<PremiumPredictResponse> => {
    try {
      return await apiPost<PremiumPredictResponse>('/premium/predict', params);
    } catch {
      // Fallback mock data so the onboarding flow doesn't hang
      const zoneMeta = MOCK_ZONE_DEFAULTS[params.zone] || MOCK_ZONE_DEFAULTS['HSR Layout'];
      const basePremium = zoneMeta.base_premium;
      return {
        zone: params.zone,
        engine: 'fallback',
        base_premium: basePremium,
        final_premium: Math.round(basePremium * 0.92),
        adjustments: [
          { factor: 'Season discount', amount: -Math.round(basePremium * 0.08) },
        ],
        currency: 'INR',
        model_status: 'fallback',
      };
    }
  },
  getModelStatus: async (): Promise<ModelStatusResponse> => {
    try {
      return await apiGet<ModelStatusResponse>('/premium/model-status');
    } catch {
      return {
        ready: true,
        zone_defaults: MOCK_ZONE_DEFAULTS,
      };
    }
  }
};
