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

export const exclusionItems = [
  {
    id: 'macro-events',
    title: 'Macro Events',
    detail: 'War, Pandemic, Nuclear contamination, or Public emergencies.',
  },
  {
    id: 'self-suspension',
    title: 'Self-Caused Suspension',
    detail: 'Voluntary account deactivation or policy violations.',
  },
  {
    id: 'pre-existing',
    title: 'Pre-existing Status',
    detail: 'Bans or restrictions active before ProtoRyde enrollment.',
  },
  {
    id: 'protest',
    title: 'Protest Participation',
    detail: 'Loss of income due to strike or protest participation.',
  },
] as const;

export const notificationItems: NotificationItem[] = [
  {
    id: 'n1',
    category: 'Weather',
    title: 'High Risk Tomorrow',
    body: 'Heavy rain predicted for HSR Layout. Maintain caution and check drainage status.',
    time: 'Just now',
    icon: '⛈️',
    unread: true,
  },
  {
    id: 'n2',
    category: 'Payments',
    title: 'Payout Credited',
    body: '₹840 sent to UPI. Transaction ID: RYD90214. Funds should reflect in 5 mins.',
    time: '2h ago',
    icon: '💰',
    unread: true,
  },
  {
    id: 'n3',
    category: 'Payments',
    title: 'Weekly Debit',
    body: '₹67 premium scheduled for Monday. Ensure wallet balance is maintained.',
    time: 'Yesterday',
    icon: '🗓️',
  },
  {
    id: 'n4',
    category: 'Claims',
    title: 'Claim Created',
    body: 'Rain trigger detected. Your proactive cover has been initiated automatically.',
    time: 'Oct 24',
    icon: '🛡️',
  },
];

export const weeklyLedgerEntries: WeeklyLedgerEntry[] = [
  {
    id: 'w12',
    weekLabel: 'Week 12 (Current)',
    status: 'Active',
    basePremium: 82,
    loyaltyDiscount: -15,
    netPaid: 67,
  },
  {
    id: 'w11',
    weekLabel: 'Week 11',
    status: 'Expired',
    basePremium: 82,
    loyaltyDiscount: 0,
    netPaid: 82,
    claimCount: 1,
    claimLabel: 'Accident Support',
  },
];

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

export const policyExclusions = [
  'Offline status during weather event window.',
  'Pre-existing vehicle damage not related to event.',
  'Incidents outside of registered operation zones.',
] as const;

export const claimAuditSteps: AuditStep[] = [
  {
    id: 'gps',
    title: 'GPS Consistency Check',
    detail: 'Location signals match historical delivery patterns within 4m radius.',
    icon: '📍',
    passed: true,
  },
  {
    id: 'weather',
    title: 'Weather Data Correlation',
    detail: 'Real-time precipitation levels confirmed >15mm/hr in sector 14-B.',
    icon: '☁️',
    passed: true,
  },
  {
    id: 'activity',
    title: 'Platform Activity Sync',
    detail: 'System log confirmed 4 orders cancelled during peak rain intensity.',
    icon: '🔁',
    passed: true,
  },
  {
    id: 'behavior',
    title: 'Behavioral Analysis',
    detail: 'Idle time vs travel velocity ratio aligns with standard safety delays.',
    icon: '📊',
    passed: true,
  },
];
