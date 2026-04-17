---
title: TEST-MATRIX
owner: team
status: draft
last_updated: 2026-04-17
source_of_truth: false
---

# Test Matrix

## Purpose
Outline key test scenarios for the campus exploration loop and Slate handoff.

## Inputs
- `../../PLAN/PLAN.md`
- `../spec/DATA-CONTRACTS.md`
- `../../slate/field-dictionary.md`

## Outputs
- Shared validation baseline for gameplay completion and handoff integrity.

## Matrix

| Area | Scenario | Expected Result |
| --- | --- | --- |
| Movement | Player traverses the map | Player moves within bounds and respects collision rules |
| Interaction | Player reaches a landmark trigger | Overlay opens and interaction can complete |
| Progression | Player finishes multiple landmarks | `Swoop` growth advances deterministically |
| Results | Student completes full flow | `academic_interest`, `swoop_stage`, and `collected_items` are produced |
| Handoff | Required hidden fields passed | Slate receives `game_academic_interest`, `game_version`, `game_session_id`, `game_completed_at` |
| Privacy | URL inspection | No PII in query params |
| Failure | Player exits before completion | Session fails gracefully without broken results or handoff |

## Constraints
- Keep expected results aligned with canonical scope and field contracts.

## Examples
- Validate that a completed session resolves exactly one `game_academic_interest` value for Slate.

## Open Questions
- Which matrix rows should be automated first in the prototype?
