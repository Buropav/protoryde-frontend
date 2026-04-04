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

export interface PolicyActivateResponse {
  policy_id: string;
  rider_id: string;
  zone: string;
  status: string;
  base_premium: number;
  final_premium: number;
  premium_breakdown: PremiumAdjustment[];
  premium_engine: string;
  exclusions_version: string;
  exclusions_acknowledged_at: string;
}

export interface DemoBootstrapResponse {
  status: string;
  rider: Record<string, any>;
  policy: PolicyActivateResponse;
}
