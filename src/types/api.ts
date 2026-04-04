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

export interface TriggerSimulateResponse {
  simulation_id: string;
  zone: string;
  trigger_type: string;
  trigger_event: Record<string, any>;
  riders_evaluated: number;
  claims_preview: any[];
  fixture_version: string;
}
