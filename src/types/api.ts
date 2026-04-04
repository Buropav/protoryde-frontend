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

export interface CurrentPolicyResponse {
  policy_id: string;
  rider_id: string;
  week_start_date: string;
  week_end_date: string;
  base_premium: number;
  final_premium: number;
  premium_breakdown: PremiumAdjustment[];
  coverage_cap: number;
  status: string;
  exclusions_version: string;
  exclusions_acknowledged_at: string;
}

export interface PolicyHistoryResponse {
  rider_id: string;
  count: number;
  policies: CurrentPolicyResponse[];
}

export interface RiderClaimsResponse {
  rider_id: string;
  count: number;
  claims: ClaimItem[];
}

export interface ClaimItem {
  claim_id: string;
  trigger_type: string;
  trigger_value: number;
  trigger_threshold: number;
  fraud_check_passed: boolean;
  fraud_layers: FraudLayer[];
  payout_amount: number;
  payout_status: string;
  created_at: string;
  is_simulated: boolean;
}

export interface FraudLayer {
  layer: string;
  passed: boolean;
  reason: string;
  evidence: Record<string, any>;
}

export interface WeatherConditions {
  temp_c: number;
  rain_24h_mm: number;
  wind_kph: number;
  aqi: number;
  description: string;
}

export interface WeatherTriggerStatus {
  threshold: number;
  breached: boolean;
}

export interface WeatherCurrentResponse {
  zone: string;
  timestamp: string;
  source: string;
  is_simulated: boolean;
  fixture_version?: string;
  conditions: WeatherConditions;
  trigger_view: Record<string, WeatherTriggerStatus>;
}

export interface WeatherWarning {
  id: string;
  title: string;
  severity: string;
  message: string;
  timestamp?: string;
  [key: string]: any;
}

export interface WeatherWarningsResponse {
  zone: string;
  warnings: WeatherWarning[];
}

export interface ExclusionsResponse {
  version: string;
  items: string[];
}

export interface ModelStatusResponse {
  ready: boolean;
  model_path?: string;
  error?: string;
  zone_defaults: Record<string, any>;
}

export interface DelhiveryMetricsResponse {
  zone: string;
  date: string;
  total_banking_orders: number;
  cancelled_orders: number;
  cancellation_rate_pct: number;
  note?: string;
  fixture_version?: string;
}
