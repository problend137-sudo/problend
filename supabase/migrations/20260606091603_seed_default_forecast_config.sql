with default_config as (
  insert into public.forecast_configs (
    id,
    name,
    description,
    is_active
  )
  values (
    '11111111-1111-4111-8111-111111111111',
    'Default placement estimate assumptions',
    'Initial active assumptions for the public placement estimate flow.',
    true
  )
  on conflict (id) do update
  set
    name = excluded.name,
    description = excluded.description,
    is_active = excluded.is_active,
    updated_at = now()
  returning id
)
insert into public.forecast_config_versions (
  id,
  forecast_config_id,
  version_number,
  assumptions,
  change_note
)
select
  '22222222-2222-4222-8222-222222222222',
  default_config.id,
  1,
  '{
    "commercial": {
      "drinkPrice": 220,
      "revenuePerTransaction": 220,
      "productMix": {
        "belgian_chocolate": 0.34,
        "vanilla": 0.24,
        "mango": 0.24,
        "cola_electrolyte": 0.18
      }
    },
    "behavioral": {
      "conversionRate": 0.035,
      "repeatPurchaseRate": 0.18
    },
    "venueMultipliers": {
      "gym": 1.45,
      "college": 1.2,
      "office": 0.9,
      "hospital": 0.75,
      "mall": 1,
      "residence": 0.65,
      "other": 0.7
    },
    "geographyMultipliers": {
      "metro": 1.18,
      "tier_1": 1,
      "tier_2": 0.82,
      "tier_3": 0.64
    },
    "operational": {
      "transactionsPerMachinePerDay": 75,
      "maxRecommendedMachines": 5,
      "operatingHourBaseline": 12
    },
    "calculation": {
      "daysPerMonth": 30,
      "minimumOperatingHourMultiplier": 0.4,
      "opportunityScoreDemandWeight": 55,
      "opportunityScoreConfidenceWeight": 0.45,
      "confidence": {
        "base": 55,
        "highFootfallThreshold": 500,
        "highFootfallLift": 15,
        "infrastructureReadyLift": 15,
        "decisionAccessLift": 10,
        "completeLocationLift": 5,
        "maximum": 95
      }
    }
  }'::jsonb,
  'Seed default active public placement estimate assumptions.'
from default_config
on conflict (forecast_config_id, version_number) do update
set
  assumptions = excluded.assumptions,
  change_note = excluded.change_note;
