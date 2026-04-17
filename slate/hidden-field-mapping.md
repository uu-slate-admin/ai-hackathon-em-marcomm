---
title: HIDDEN-FIELD-MAPPING
owner: team
status: draft
last_updated: 2026-04-17
source_of_truth: false
---

# Slate Hidden Field Mapping

## Purpose
Provide a compact mapping reference for game metadata -> Slate hidden fields.

## Inputs
- `field-dictionary.md`
- `../docs/spec/DATA-CONTRACTS.md`

## Outputs
- Quick mapping table for hidden-field handoff implementation.

## Mapping

| Game Output Key | Slate Hidden Field | Required |
| --- | --- | --- |
| `game_academic_interest` | `game_academic_interest` | yes |
| `game_version` | `game_version` | yes |
| `game_session_id` | `game_session_id` | yes |
| `game_completed_at` | `game_completed_at` | yes |

## Notes

- Canonical field definitions remain in `slate/field-dictionary.md`.
- `Swoop` growth, collectibles, and internal scoring stay in-product and are not mapped to Slate in v1.
- Keep PII out of URL/query mappings.

## Constraints
- Must remain consistent with `slate/field-dictionary.md` canonical definitions.

## Examples
- `game_academic_interest=engineering_technology` maps to Slate hidden field `game_academic_interest`.

## Open Questions
- Should this file remain a quick reference or be merged into `field-dictionary.md` later?
