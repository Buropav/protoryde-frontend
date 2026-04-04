export type NotificationCategory = 'All' | 'Weather' | 'Claims' | 'Payments';

export interface NotificationItem {
  id: string;
  category: Exclude<NotificationCategory, 'All'>;
  title: string;
  body: string;
  time: string;
  icon: string;
  unread?: boolean;
}

export interface WeeklyLedgerEntry {
  id: string;
  weekLabel: string;
  status: 'Active' | 'Expired';
  basePremium: number;
  loyaltyDiscount: number;
  netPaid: number;
  claimCount?: number;
  claimLabel?: string;
}

export interface AuditStep {
  id: string;
  title: string;
  detail: string;
  icon: string;
  passed: boolean;
}

export const coverageItems = [
  { id: 'rain', title: 'Heavy Rain', subtitle: '>30mm/hr intensity', icon: '🌧️' },
  { id: 'heat', title: 'Extreme Heat', subtitle: '>40°C threshold', icon: '🌡️' },
  { id: 'wind', title: 'High Winds', subtitle: 'Gales >50km/h', icon: '💨' },
  { id: 'snow', title: 'Snowfall', subtitle: 'Hazardous icing', icon: '❄️' },
] as const;

export const policyTriggerDefinitions = [
  {
    id: 'precipitation',
    title: 'Precipitation',
    threshold: '> 2.5mm/hr',
    detail:
      'System triggers automatically when local radar confirms sustained heavy rainfall exceeding 2.5mm per hour for 15 minutes.',
  },
  {
    id: 'heat',
    title: 'Extreme Heat',
    threshold: '> 42°C',
    detail:
      'Activation occurs when the ambient wet-bulb temperature exceeds 42° Celsius in your active delivery zone.',
  },
] as const;
