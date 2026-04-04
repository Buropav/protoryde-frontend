export interface PremiumAdjustment {
  factor: string;
  amount: number;
}

export interface PremiumPredictResponse {
  zone: string;
  engine: string;
  base_premium: number;
  final_premium: number;
  adjustments: PremiumAdjustment[];
  currency: string;
  model_status: string;
}
