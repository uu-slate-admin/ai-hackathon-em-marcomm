---
title: DATA-CONTRACTS
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# Data Contracts

## Purpose

Define the canonical data contracts for the v1 campus exploration game and the Slate handoff boundary.

## Inputs

- [PLAN/PLAN.md](../../PLAN/PLAN.md)
- [slate/field-dictionary.md](../../slate/field-dictionary.md)

## Outputs

- Gameplay contract models for map exploration, progression, and results
- Handoff contract models for Slate submission integration
- Required field definitions and validation expectations

## Constraints

- Keep v1 aligned to one campus map and one short exploration loop.
- Keep PII out of query parameters.
- Keep Slate field semantics consistent with `slate/field-dictionary.md`.

## Contract Objects

## `MapScene`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stable scene identifier |
| `label` | string | yes | Human-readable map name |
| `map_asset` | string | yes | Relative path to scene art |
| `collision_asset` | string | no | Optional collision layer reference |
| `spawn_point` | object | yes | Initial player position |
| `trigger_ids` | array[string] | yes | Triggers present in the scene |

## `LocationTrigger`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stable trigger identifier |
| `scene_id` | string | yes | Foreign key to `MapScene` |
| `position` | object | yes | Trigger origin on the map |
| `interaction_radius` | number | yes | Activation range |
| `dialogue_event_id` | string | yes | Linked interaction content |
| `interest_weights` | object | yes | Weight map toward `academic_interest` |
| `collectible_item_id` | string | no | Optional reward item |
| `swoop_growth_points` | number | yes | Progress awarded to `Swoop` |

## `DialogueEvent`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stable dialogue identifier |
| `title` | string | yes | Landmark or interaction title |
| `body` | array[string] | yes | Ordered dialogue or narration lines |
| `choices` | array | no | Optional response choices |
| `completion_flag` | string | yes | Session flag set when finished |

## `AcademicInterest`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Interest identifier used in results and handoff |
| `label` | string | yes | Human-readable interest label |
| `college_group` | string | yes | College or field grouping |
| `description` | string | no | Student-facing summary |
| `learn_more_url` | string | no | Optional destination URL |

## `SwoopStage`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stage identifier |
| `label` | string | yes | Human-readable stage name |
| `min_growth_points` | number | yes | Inclusive threshold for this stage |
| `sprite_asset` | string | no | Optional stage-specific art |

## `CollectibleItem`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Item identifier |
| `label` | string | yes | Human-readable item name |
| `icon_asset` | string | no | Optional icon asset |
| `category` | string | no | Optional grouping for UI organization |
| `unlock_copy` | string | no | Short copy shown when earned |

## `ResultMapping`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `academic_interest_id` | string | yes | Interest foreign key |
| `swoop_stage_id` | string | yes | `Swoop` stage foreign key |
| `message_modules` | array | yes | Result content modules |
| `cta_modules` | array | yes | CTA modules for the result state |
| `collectible_highlights` | array[string] | no | Optional items to spotlight in results |

## `GameSession`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `game_session_id` | string | yes | Unique session identifier |
| `scene_id` | string | yes | Active map scene |
| `visited_trigger_ids` | array[string] | yes | Completed trigger IDs |
| `collected_items` | array[string] | yes | Earned item IDs |
| `interest_scores` | object | yes | Running interest score map |
| `swoop_growth_points` | number | yes | Total growth progress |
| `swoop_stage` | string | yes | Current resolved stage ID |
| `academic_interest` | string | no | Final resolved interest once complete |
| `game_completed_at` | datetime | no | Completion timestamp |

## `GameOutputContract`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `game_academic_interest` | string | yes | Final academic-interest result ID |
| `game_version` | string | yes | Contract/game version |
| `game_session_id` | string | yes | Unique game session identifier |
| `game_completed_at` | datetime | yes | ISO-8601 UTC completion timestamp |

## `LeadPayload` (Conceptual Slate Record)

| Field Group | Fields |
| --- | --- |
| Visible student-entered fields | `first`, `last`, `email`, `school`, `campus`, `contact_type`, `birthdate` |
| Hidden game-derived fields | `game_academic_interest`, `game_version`, `game_session_id`, `game_completed_at` |

## Handoff Contract (Game -> Slate)

Required hidden fields at submit:

- `game_academic_interest`
- `game_version`
- `game_session_id`
- `game_completed_at`

No optional gameplay metadata is passed to Slate in v1.

Source of truth for field constraints:

- [slate/field-dictionary.md](../../slate/field-dictionary.md)

## Example Payloads

### Example `GameSession`

```json
{
  "game_session_id": "550e8400-e29b-41d4-a716-446655440000",
  "scene_id": "campus_core",
  "visited_trigger_ids": ["union_plaza", "library_walk", "stadium_overlook"],
  "collected_items": ["map_pin", "feather_badge"],
  "interest_scores": {
    "engineering_technology": 4,
    "health_sciences": 2,
    "arts_media": 1
  },
  "swoop_growth_points": 6,
  "swoop_stage": "growing",
  "academic_interest": "engineering_technology",
  "game_completed_at": "2026-04-17T18:24:31Z"
}
```

### Example `GameOutputContract`

```json
{
  "game_academic_interest": "engineering_technology",
  "game_version": "v1.0.0",
  "game_session_id": "550e8400-e29b-41d4-a716-446655440000",
  "game_completed_at": "2026-04-17T18:24:31Z"
}
```

### Example query parameter handoff (non-PII only)

```text
?game_academic_interest=engineering_technology
&game_version=v1.0.0
&game_session_id=550e8400-e29b-41d4-a716-446655440000
&game_completed_at=2026-04-17T18%3A24%3A31Z
```

## Open Questions

- Should `game_version` track the gameplay schema version, content version, or both?
- What is the final canonical `academic_interest` ID list for launch?
- Should the prototype persist `GameSession` only in memory or in local storage?
