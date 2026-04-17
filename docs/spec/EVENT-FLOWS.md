---
title: EVENT-FLOWS
owner: team
status: draft
last_updated: 2026-04-17
source_of_truth: false
---

# Event Flows

## Purpose
Define key runtime event sequences from game boot to Slate handoff.

## Inputs
- `PLAN/PLAN.md`
- `DATA-CONTRACTS.md`
- `../../slate/field-dictionary.md`

## Outputs
- Event flow definitions for gameplay, progression, results, and handoff events.

## Constraints
- Keep names aligned with the 2D exploration loop and handoff contract.

## Candidate Canonical Events

- `game_booted`
- `session_started`
- `scene_loaded`
- `player_moved`
- `trigger_entered`
- `interaction_started`
- `interaction_completed`
- `collectible_earned`
- `swoop_stage_changed`
- `academic_interest_resolved`
- `results_viewed`
- `slate_handoff_started`
- `slate_handoff_opened`

## Example Flow

`game_booted` -> `session_started` -> `scene_loaded` -> `trigger_entered` -> `interaction_completed` -> `collectible_earned` -> `swoop_stage_changed` -> `academic_interest_resolved` -> `results_viewed` -> `slate_handoff_started`

## Open Questions
- Which of these events are analytics-only versus state-machine events?
