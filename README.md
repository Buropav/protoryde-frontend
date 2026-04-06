# ProtoRyde Frontend

This repository contains the Expo frontend only. Backend code is in protoryde-backend.

# ProtoRyde 🛡️
## Parametric Income Insurance for Delhivery Banking & Fintech Delivery Partners With AI

> *"When Pranav delivers your HDFC credit card in the rain, 
> he loses a day's income. We make sure he doesn't have to choose 
> between his safety and his family's dinner."*

**Guidewire DEVTrails University Hackathon 2026**  
**Team:** Buropav\
**Location:** Coimbatore, Tamil Nadu  
 
🔗 **Live Prototype:** [https://protoryde-frontend.vercel.app/](https://protoryde-frontend.vercel.app/)    

---

## The Problem: A Specific, Real, and Unaddressed Gap

India's gig economy has 7.7 million platform workers. While Zomato and Zepto 
riders get the spotlight, **Delhivery's banking delivery partners** are overlooked - 
the gig workers carrying HDFC credit cards, SBI cheque books, Jupiter neo-bank 
starter kits, and loan sanction letters to doorsteps across Bangalore.

These workers face a unique compounding problem:

1. **Binary income loss.** Unlike food riders who might do 60% of orders in 
   light rain, banking document riders do 0%. Sealed financial documents 
   cannot be risked in rain - one damaged cheque book is a compliance incident. 
   When it rains, Pranav's entire day is cancelled.

2. **No fallback orders.** Food riders switch to lighter items in bad weather. 
   Banking document riders have only one product category. There's no fallback.

3. **Platform-verified cancellations.** Every cancelled order is logged in 
   Delhivery's system with timestamp and reason. The income loss is not 
   estimated, it's recorded. This is critical for our fraud prevention design.

4. **Bangalore's specific vulnerability.** Bangalore receives 970mm of 
   rainfall annually (90% in June-October). HSR Layout, Bellandur, and 
   Koramangala flood predictably every monsoon. A rider in these zones loses 
   income 15-22 times per year from weather alone.

**The gap:** Zero insurance products exist for this specific worker profile. 
Standard health/life insurance is irrelevant. Vehicle insurance doesn't cover 
income. General gig worker schemes are too broad and too slow.

---

## Our Solution: ProtoRyde

ProtoRyde is a **parametric income insurance platform** for Delhivery banking 
delivery partners. Parametric means:

- No claim forms. No adjusters. No 30-day wait.
- When a pre-defined external trigger crosses a threshold for a minimum 
  duration, a payout is automatically initiated.
- The entire process, from trigger detection to UPI transfer, takes 
  under 2 minutes.

**What we insure:** Lost working income when uncontrollable external 
disruptions prevent deliveries.

**What we strictly do NOT insure:** Health, life, accidents, vehicle 
repairs, or any event within the rider's control.

---

## Persona: Pranav, 31 - HSR Layout, Bangalore

Pranav joined Delhivery's banking vertical 2 years ago after working in 
a general courier role. He earns more per delivery here (₹38-55/delivery 
for financial documents vs ₹22-30 for general parcels) because the work 
requires greater accountability.

| Attribute | Detail |
|---|---|
| Zone | HSR Layout -> Koramangala -> Indiranagar route |
| Daily Orders | 18-26 deliveries |
| Daily Gross | ₹950 - ₹1,200 |
| Weekly Target | ₹6,500 - ₹7,800 |
| Working Days | 6 days/week |
| Vehicle | Hero Splendor (own) |
| Payment | Delhivery weekly settlement (every Monday) |

### Scenario A: The July Monsoon (Most Frequent)
> Date: July 14, 2025. IMD issues a red alert for Bangalore. 
> By 9:30 AM, 48mm of rain has fallen in HSR Layout.  
>  
> Pranav's app shows 22 deliveries for today — 17 are to bank branches 
> in Koramangala and Indiranagar. At 10:15 AM, Delhivery's ops team 
> sends an advisory: "Sensitive document routes suspended until further notice."  
>  
> By 4 PM, Pranav has completed just 4 deliveries (non-sensitive general 
> parcels in covered areas). Actual earnings: ₹180. Normal day: ₹1,050. 
> Loss: **₹870**.  
>  
> Without ProtoRyde: Pranav eats into savings, postpones his child's 
> school fees payment.  
>  
> With ProtoRyde: At 10:22 AM, 7 minutes after the ops advisory, 
> ProtoRyde detected 44mm rainfall in Pranav's zone, confirmed the 
> Delhivery ops advisory via API, cross-checked his GPS, verified no 
> fraud flags, and initiated a ₹840 UPI transfer. Pranav got a 
> notification before he'd even pulled over to find shelter.

### Scenario B: November Pollution Spike
> Date: November 8, 2025. Bangalore AQI hits 334 (Severe) by 8 AM 
> due to post-Diwali stubble burning combined with weather inversion.  
>  
> Delhivery issues a reduced-operations advisory for outdoor routes. 
> Bank branches in affected zones reduce KYC operations. 
> Pranav's 18 scheduled deliveries drop to 5 completable ones.  
> Loss: **₹640**.  
>  
> With ProtoRyde: AQI trigger (>300 for 6+ consecutive hours) fires 
> at 2 PM. ₹590 credited automatically.

### Scenario C: Bank Branch Bandh (Specific to Banking Delivery)
> Date: February 24, 2026. A local political group announces a 
> Bangalore Bandh at 6 AM. All bank branches within a 15km radius 
> of Pranav's zone close.  
>  
> Pranav has 21 banking deliveries. Zero can be completed since the 
> destinations don't exist today. Loss: **₹1,020**.  
>  
> With ProtoRyde: ProtoRyde's Branch Closure Trigger detects 
> >60% of bank branches in Pranav's zone are non-operational 
> (via Google Places status API + mock). Trigger fires at 9 AM. 
> ₹920 credited. No food delivery insurance product can replicate 
> this trigger - it's specific to our persona.

---

## Insurance Design

### Understanding Basis Risk (Why Our Design Is Different)

Parametric insurance has an inherent challenge called **basis risk**: 
the trigger fires but the insured didn't lose income, or the insured 
lost income but the trigger didn't fire. Poorly designed parametric 
products have high basis risk and lose customer trust.

**ProtoRyde's three-layer basis risk minimization:**

**Layer 1 - Zone-level triggers, not city-level.**  
We use 5km radius weather data around the rider's registered zone, 
not Bangalore-average data. So HSR Layout flooding doesn't trigger a 
policy for a rider in Whitefield.

**Layer 2 - Delhivery order cancellation cross-reference.**  
When a weather trigger fires, we call Delhivery's (simulated) API 
to confirm that orders in the rider's zone were actually cancelled. 
If Delhivery's data shows no cancellations, the trigger does not pay 
out. This is our structural fraud prevention, and it's only possible 
because of our persona choice.

**Layer 3 - Minimum duration threshold.**  
Triggers require 6 consecutive hours above threshold. A 40-minute 
thunderstorm doesn't trigger a payout since it doesn't materially affect 
a full day's earnings.

### Weekly Premium Model

**All pricing is weekly.** This matches Delhivery's weekly settlement 
cycle and ensures Pranav thinks about coverage the same week he thinks 
about his earnings.

**Actuarial Foundation:**
```
Bangalore expected disruption days per year (banking routes): 18-22
Average payout per trigger day: ₹700
Expected annual claims per rider: 20 × ₹700 = ₹14,000
Weekly expected claims: ₹14,000 ÷ 52 = ₹269/week

Target Loss Ratio: 65% (standard parametric product benchmark)
Raw weekly premium: ₹269 ÷ 0.65 = ₹414/week

With zone-level pricing, cross-subsidization, and volume economics:
Low-risk zone (Whitefield): ₹55/week
Medium-risk zone (Indiranagar): ₹82/week  
High-risk zone (HSR Layout/Bellandur): ₹115/week
```

**AI Dynamic Adjustment on top of zone base premium (-35% to +65%):**

| Factor | Adjustment | Rationale |
|---|---|---|
| Zone: 0 flood events in 3 years | -₹22 | Historically safe |
| 7-day forecast: >60% rain probability | +₹18 | Elevated near-term risk |
| AQI forecast: 3+ days >200 this week | +₹12 | Pollution risk |
| Rider claim rate: <1 claim/month (12-wk avg) | -₹10 | Low-risk behavior |
| Rider has 0 fraud flags (lifetime) | -₹8 | Trust premium |
| First 4 weeks on platform | +₹5 | Insufficient history |

**The "Earn Back" Mechanism:**  
4 consecutive claim-free weeks -> ₹15 cashback credited to next week's 
premium. This reduces moral hazard and rewards responsible riders. 
No other team will have this.

### Payout Formula
```python
def calculate_payout(rider, trigger_event):
    avg_daily_earnings = rider.rolling_4week_avg_daily_earnings
    disrupted_hours = trigger_event.active_duration_hours  # min: 6
    working_hours = 9  # standard working day
    coverage_ratio = 0.80  # 20% co-pay to reduce moral hazard
    weekly_cap = 2300  # ₹ - prevents catastrophic loss ratio
    
    raw_payout = (avg_daily_earnings * disrupted_hours / working_hours) 
                  * coverage_ratio
    
    return min(raw_payout, weekly_cap)
```

**Why 80% coverage (not 100%)?**  
The 20% co-pay is intentional insurance design. If riders receive 100% 
of income regardless of conditions, moral hazard increases - some may 
choose not to work on borderline days. The 20% personal stake keeps 
motivation intact while still providing meaningful protection.

### Parametric Triggers

| # | Trigger | Threshold | Duration | Data Source | Unique To ProtoRyde? |
|---|---|---|---|---|---|
| 1 | Heavy Rainfall | >30mm in rider's 5km zone | 6+ consecutive hrs | OpenWeatherMap (free) | No |
| 2 | Extreme Heat | >40°C | 6+ consecutive hrs | Open-Meteo | No |
| 3 | Severe AQI | >300 | 6+ consecutive hrs | CPCB / Open-Meteo AQ | No |
| 4 | Bank Branch Zone Closure | >60% branches in zone non-operational | Any duration | Google Places API (mock) + News API | **YES - unique** |
| 5 | Delhivery Ops Advisory | Platform halts sensitive-doc routes in zone | Any duration | Simulated Delhivery API | **YES - unique** |

Triggers 4 and 5 cannot be replicated by any food/grocery/generic 
delivery insurance product. They require the specific persona context 
of banking document delivery.

---

## AI/ML Architecture

### Model 1: Hyper-Local Risk Scorer (Premium Engine)

**Problem with the naive approach:** OpenWeatherMap gives Bangalore-average 
rainfall. But Bellandur floods at 25mm while Whitefield needs 50mm 
for any disruption. City-average pricing unfairly charges Whitefield 
riders and undercharges Bellandur riders.

**Our approach: Zone Risk Grid**

We build a 5km × 5km risk grid for Bangalore using:
- **BBMP historical flood complaint data** (public, downloadable from 
  BBMP OpenData portal)
- **IMD weather station interpolation** (6 Bangalore stations -> 
  zone-level estimates)
- **SRTM elevation data** (free - low elevation correlates strongly 
  with flooding)
- **Simulated Delhivery route cancellation history** by zone

**Model:** XGBoost Regressor (chosen over Random Forest for better 
performance on mixed tabular data + interpretable via SHAP values)
```python
features = {
    'zone_flood_events_3yr': int,        # BBMP data
    'zone_elevation_m': float,           # SRTM
    'zone_drainage_score': float,        # BBMP infrastructure data
    'predicted_7day_rain_mm': float,     # OpenWeatherMap forecast
    'predicted_7day_max_temp': float,    # Open-Meteo
    'predicted_7day_avg_aqi': float,     # Open-Meteo AQ
    'month_of_year': int,                # seasonal signal (1-12)
    'rider_claim_rate_12wk': float,      # personal history
    'rider_fraud_flag_count': int,       # trust signal
    'banking_hub_density_score': float,  # Delhivery route density in zone
    'branch_closure_frequency_zone': float  # historical Bandh/strike data
}

output: weekly_premium_inr (float)
```

**Interpretability:** We use SHAP to generate per-rider explanations 
shown in the app: *"Your premium is ₹67 this week. Your zone's low 
flood history saves you ₹22. Predicted rain this week adds ₹7."*

This transparency is important for trust since riders should understand 
why their premium changes week to week.

### Model 2: Multi-Layer Fraud Engine

**Why standard anomaly detection is insufficient:**  
A generic Isolation Forest on GPS data will miss coordinated fraud 
rings and platform-specific manipulation. We use 4 layers:

**Layer 1: Hard Rules (real-time, <100ms)**
```python
HARD_REJECT_CONDITIONS = [
    rider_gps_distance_from_trigger_zone > 10_000,  # meters
    claim_submitted_after_trigger_ended_by > 21600,  # 6 hours
    same_imei_claim_within_hours < 48,
    trigger_zone_delhivery_cancellations == 0,       # THE KEY CHECK
]
```

**Layer 2: Behavioral Anomaly Detection (Isolation Forest)**  
Features: daily GPS movement variance, order acceptance rate, 
speed during claimed disruption, time-of-day GPS activity patterns.  
Any anomaly score >0.85 -> HOLD for manual review.

**Layer 3: Delhivery Order Cross-Reference**  
For every claim, we call the simulated Delhivery API:  
*"On [date] in [zone], what was the order cancellation rate?"*  
If it's <30% (normal), the claim is rejected regardless of weather.  
If it's >60% (consistent with trigger), the claim is approved.  
This single check eliminates ~80% of potential fraudulent claims.

**Layer 4: Network Graph Analysis**  
If 20+ riders in the same zone all claim on the same day with 
no weather event -> detect as coordinated fraud ring.  
Use simple graph connectivity: same pickup hub + same claim day + 
no trigger = flag entire cluster for review.

### Model 3: Predictive Risk Forecaster

**Model:** Facebook Prophet (additive time series with seasonality)

**Training data:** 3 years of Bangalore weather events + simulated 
Delhivery cancellation data

**Two outputs:**

*For riders (in-app):*  
"This week has a 71% probability of at least one trigger day. 
Your coverage protects up to ₹2,300."  
"Consider Enhanced Coverage (+₹25/week, +₹500 payout cap)."

*For insurers (admin dashboard):*  
"Predicted total claims next week: ₹3,42,000 across 486 active 
policies. Recommended reserve buffer: ₹4,10,000 (120% of predicted)."

This gives the admin dashboard a forward-looking metric useful for 
judges who understand reserve management.

---

## Platform Choice: Mobile-First, Web Admin

**Mobile App (React Native + Expo)** for riders.

Why mobile:
- Delhivery partners already use the Delivery Partner App throughout 
  their working day. Our app sits alongside it, same phone, same habit.
- Push notifications are the primary value delivery mechanism. 
  Web apps cannot send background notifications on Android reliably.
- UPI payment for weekly premium is native on Android (>95% of 
  Delhivery riders use Android, sub-₹15,000 devices).
- GPS trigger validation requires background location access -
  React Native supports this natively.
- WhatsApp/SMS fallback for notifications for riders with poor 
  data connectivity in outer Bangalore zones.

**Web Admin Dashboard (React.js)** for insurers/Delhivery ops team.  
Riders never need to log in to a website. Operations and insurance 
teams do.

---

## Product Features

### Feature 1: Rain Radar Pre-Warning (24 Hours Ahead)
When tomorrow has >60% rain probability in the rider's zone:
> *"⚠️ Tomorrow looks risky for your zone (HSR Layout). 
> 74% chance of heavy rain. Your ProtoRyde coverage 
> protects up to ₹2,300. Stay safe, you're covered."*

This lets riders see the product's value before the event happens, 
and builds daily engagement and trust.

### Feature 2: Earnings Protection Calendar
Week-by-week view:
- 🟢 Normal days (full income achieved)
- 🌧 Protected days (trigger fired, payout received)
- 📊 Week summary: "Week 23: ₹5,840 earned + ₹840 protected = 
  ₹6,680 effective income secured"

Tangible, visual proof that the product works.

### Feature 3: Premium Transparency Card
Every Monday when premium is charged:
> *"This week's ProtoRyde: ₹67*  
> Base zone premium: ₹82  
> Zone safety discount: -₹22  
> Rain forecast adjustment: +₹7  
> Your trust bonus: -₹0 (4 more claim-free weeks for ₹15 cashback!)"*

No other team will show riders WHY their premium changed.

### Feature 4: Trigger Verification Receipt
When a claim triggers, the rider receives a verifiable receipt:
> *"📋 ProtoRyde Claim Record #BKS-2025-07-14-VKR  
> Trigger: Rainfall - 44mm at coordinates [zone center]  
> Source: OpenWeatherMap API (verified 10:22 AM)  
> Delhivery cancellations in your zone: 14/18 (78%)  
> Fraud check: PASSED (all 4 layers)  
> Payout: ₹840 -> Pranav@okicici  
> Transfer time: 1m 47s"*

This is the trust mechanism that makes riders advocate for the 
product and reduces disputes.

---

## Tech Stack

| Layer | Technology | Justification |
|---|---|---|
| Mobile App | React Native + Expo | Cross-platform, Delhivery-native UX, background location support |
| Web Admin | React.js + TailwindCSS | Fast development, clean dashboard UI |
| Backend API | Python (FastAPI) | Faster than Flask for async API calls to weather/payment services |
| ML Pipeline | scikit-learn + XGBoost + Prophet | Production-grade, interpretable |
| ML Interpretability | SHAP | Premium explanation for riders |
| Database | PostgreSQL | Relational (insurance policies need ACID compliance) |
| Cache / Queue | Redis | Background trigger monitoring jobs |
| Weather API | OpenWeatherMap (free tier) + Open-Meteo | Zone-level rainfall, temp, AQI |
| Payment (mock) | Razorpay Test Mode | UPI simulation, realistic payout demo |
| Hosting | Render (free) | FastAPI + PostgreSQL |
| Maps/Zones | Google Maps API (free tier) | Zone visualization in admin dashboard |

**Why FastAPI over Flask:** Trigger monitoring requires polling 5 
weather APIs every 30 minutes for 500+ active riders' zones 
concurrently. FastAPI's async support handles this without blocking. 
Flask would require threading workarounds.

---

## 6-Week Development Roadmap

### Phase 1 (Current): Ideation & Foundation
- [x] Persona research and insurance design
- [x] README and strategy document
- [ ] Figma wireframes (6 screens)
- [ ] HTML/JS interactive prototype (premium calculator + trigger simulator)
- [ ] 2-minute strategy video

### Phase 2 (March 21 - April 4): Core Product
**Week 3:**
- Rider registration + onboarding (React Native)
- Zone assignment + initial risk scoring
- Weekly premium calculation (ML model, basic version)
- UPI payment integration (Razorpay test mode)

**Week 4:**
- Weather + AQI + Ops Advisory trigger monitoring (3 live triggers)
- Auto-claim initiation engine
- Delhivery order cross-reference (simulated API)
- Basic fraud rules (Layer 1 hard rules)
- Push notification system

### Phase 3 (April 5-17): Scale & Polish
**Week 5:**
- Full ML fraud engine (Isolation Forest + network graph)
- Admin dashboard v1 (loss ratios, claims map, fraud flags)
- Enhanced Coverage upsell feature
- Rider earnings calendar

**Week 6:**
- Admin dashboard v2 (predictive analytics, reserve recommendations)
- Performance optimization and edge case handling
- 5-minute demo video production
- Final pitch deck

---

## Business Model & Unit Economics

**Unit Economics (per rider, Bangalore Zone B - medium risk):**

| Metric | Value |
|---|---|
| Weekly Premium | ₹82 |
| Annual Premium Revenue | ₹4,264 |
| Expected Annual Claims | ₹2,772 (65% loss ratio) |
| Gross Margin per Rider | ₹1,492 / year |
| Tech Cost per Rider (at 1,000 riders) | ~₹400 / year |
| Net Contribution per Rider | ~₹1,092 / year |

**Path to sustainability:** Break-even at ~800 active riders. 
Bangalore has an estimated 12,000+ Delhivery active partners. 
10% penetration = 1,200 riders = profitable from Year 1.

**Scaling potential:** The same engine works for:
- Delhivery general e-commerce partners
- Other logistics platforms (Shadowfax, Xpressbees)
- Different cities (Mumbai monsoon, Delhi pollution)

---

## Social Impact

- Directly supports Karnataka Gig Workers Welfare Board (2026) 
  mandate for social security for platform workers
- Aligns with RBI's financial inclusion goals for informal economy workers
- Parametric, zero-paperwork design removes literacy barriers to insurance
- At scale (10,000 riders), protects ₹7-9 crore of income annually 
  that would otherwise be unprotected

---

## Business Model Vision: Beyond Premiums

Beyond premiums as the only revenue line, ProtoRyde has **three 
revenue layers**, making it a platform, not just a product.

### Revenue Layer 1: Insurance Premiums (Core)
Weekly premiums from riders. ₹55-₹115/week per rider.

### Revenue Layer 2: DeliveryTrust Score

Every ProtoRyde rider accumulates a **DeliveryTrust Score**, a 
composite reliability metric built from our unique data sources:

```
DeliveryTrust Score = f(
    claim_honesty_rate,        # % of claims that passed all 4 fraud layers
    zone_consistency,          # does rider work their registered zone reliably?
    weather_resilience_index,  # % of borderline-weather days rider still worked
    delivery_completion_rate,  # from Delhivery API (simulated)
    platform_tenure_months,    # time on ProtoRyde
    earnings_stability_cv      # coefficient of variation of weekly earnings
)
```

**Why this matters commercially:**

| Who buys DeliveryTrust data | What they use it for | Revenue model |
|---|---|---|
| **Delhivery Ops** | Assign premium banking routes (credit cards, loan docs) to high-trust riders, reduces document damage incidents | Per-query API: ₹2-5/lookup |
| **NBFCs & Microfinance** | Underwrite micro-loans to gig workers. A rider with 48-week claim history, 0 fraud flags, and stable ₹6,000/week earnings is demonstrably creditworthy but has zero CIBIL history | Monthly data subscription: ₹15,000-50,000/NBFC |
| **Banks (HDFC, SBI, Jupiter)** | Select which Delhivery partners handle their sensitive documents. "Only riders with DeliveryTrust >75 carry our credit cards" | Annual partnership fee |

This turns insurance data exhaust into a gig worker financial identity 
product. Insurance-only teams can't replicate this without the 
Delhivery-specific delivery data layer.

**The flywheel:** More riders -> more data -> better DeliveryTrust 
scores -> banks trust ProtoRyde-scored riders -> Delhivery routes 
more premium work to scored riders -> riders earn more -> more riders 
want ProtoRyde.

### Revenue Layer 3: B2B Route-Risk Intelligence API

ProtoRyde's zone-level weather risk grid, built for premium 
calculation, has independent commercial value:

**API endpoint (conceptual):**
```
GET /api/v1/zone-risk?zone=hsr_layout&date=2025-07-14

Response: {
  "zone": "HSR Layout",
  "risk_score": 0.82,
  "primary_risk": "flooding",
  "predicted_disruption_hours": 6.5,
  "branch_closure_probability": 0.71,
  "recommended_action": "DELAY_SENSITIVE_DISPATCH",
  "confidence": 0.89
}
```

**Buyers:**
- **Banks** - Before dispatching 200 credit cards to Koramangala 
  via Delhivery, check if today's route-risk is green. If it's red, 
  hold dispatch 24 hours instead of losing documents. Banks currently 
  have zero visibility into last-mile weather risk.
- **Delhivery Logistics Planning** - Pre-allocate riders to zones 
  predicted to have clear weather. Route sensitive documents away 
  from high-risk zones on predicted trigger days.

**Revenue:** Per-query pricing (₹1-3/call) or monthly subscription 
for bulk access. At 10,000 queries/day from 5 banking partners = 
₹3-9 lakh/month in API revenue.

---

## Beyond Insurance: The Delivery Intelligence Layer

> *ProtoRyde doesn't stop at insurance. It builds the intelligence 
> infrastructure that India's banking last-mile logistics doesn't 
> have today.*

ProtoRyde goes beyond insurance by creating a Delivery Intelligence 
Layer:

### What This Means in Practice

Today, when HDFC wants to send 500 credit cards via Delhivery in 
Bangalore, they have **zero** answers to:
- "Which zones will have delivery disruptions this week?"
- "Which riders are most reliable for sensitive financial documents?"
- "Should we delay dispatch to Bellandur today due to flooding?"
- "What's our expected delivery failure rate this monsoon?"

**ProtoRyde answers all four** as a byproduct of running the 
insurance platform. The weather risk grid, rider scoring engine, 
and zone analytics built for premium calculation become standalone 
infrastructure.

### The Three-Layer Stack

```
┌─────────────────────────────────────────────────┐
│  Layer 3: DELIVERY INTELLIGENCE (B2B Platform)  │
│  Route-Risk API · DeliveryTrust Scores ·        │
│  Dispatch Optimization · Bank SLA Guarantees    │
├─────────────────────────────────────────────────┤
│  Layer 2: AI/ML ENGINE (Shared Core)            │
│  XGBoost Risk Scorer · Fraud Engine ·           │
│  Prophet Forecaster · SHAP Explainer            │
├─────────────────────────────────────────────────┤
│  Layer 1: PARAMETRIC INSURANCE (Rider Product)  │
│  Weekly Premiums · Auto-Claims · UPI Payouts ·  │
│  Earnings Calendar · Rain Radar                 │
└─────────────────────────────────────────────────┘
```

Layer 1 is the core hackathon deliverable. Layers 2 and 3 show that 
this can be a real company, not just a hackathon project.

### Why This Matters for Judges

Guidewire builds PolicyCenter, ClaimCenter, and BillingCenter - 
enterprise insurance infrastructure. A team that builds **insurance 
infrastructure** (not just an insurance app) speaks Guidewire's 
language. ProtoRyde's Delivery Intelligence Layer mirrors this 
kind of platform thinking.

---

## Why ProtoRyde Wins

| Factor | Generic Food Insurance | ProtoRyde |
|---|---|---|
| Persona uniqueness | 1 of 50+ teams | Only team in hackathon |
| Trigger uniqueness | Rain/Heat/AQI | Rain/Heat/AQI + Bank Closures + Ops Advisory |
| Fraud prevention | GPS + duplicate check | + Delhivery order cross-reference (structural) |
| Premium design | "Dynamic pricing" | Actuarially grounded, zone-level, interpretable |
| Basis risk management | Not mentioned | Three-layer explicit design |
| Insurance domain depth | Buzzwords | Loss ratio, moral hazard, co-pay rationale |
| Business model vision | Premiums only, "scale to more cities" | DeliveryTrust Score + B2B Route-Risk API as additional revenue streams |
| Beyond the rubric | Stays within the insurance product | Delivery Intelligence Layer extends beyond insurance into a broader platform |
