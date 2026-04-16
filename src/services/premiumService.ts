import { apiPost, apiGet } from './apiClient';
import { PremiumPredictResponse, ModelStatusResponse } from '../types/api';

export interface PredictPremiumParams {
  zone: string;
  prefer_ml?: boolean;
  weather_severity?: number;
  claim_history?: number;
  zone_risk_score?: number;
}

export const premiumService = {
  predictPremium: async (params: PredictPremiumParams): Promise<PremiumPredictResponse> => {
    return apiPost<PremiumPredictResponse>('/premium/predict', params);
  },
  getModelStatus: async (): Promise<ModelStatusResponse> => {
    return apiGet<ModelStatusResponse>('/premium/model-status');
  }
};
