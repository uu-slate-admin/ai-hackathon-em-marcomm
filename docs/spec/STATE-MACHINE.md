---
title: STATE-MACHINE
owner: team
status: draft
last_updated: 2026-04-17
source_of_truth: false
---

# State Machine

## Purpose
Describe game states and transitions for the campus exploration vertical slice.

## Inputs
- `PLAN/PLAN.md`
- `DATA-CONTRACTS.md`
- `EVENT-FLOWS.md`

## Outputs
- Draft state map for implementation planning.

## Constraints
- Keep state names aligned to exploration gameplay rather than survey flow.

## Core States

- `BOOT`
- `TITLE`
- `MAP_EXPLORATION`
- `INTERACTION`
- `REWARD`
- `RESULTS`
- `SLATE_HANDOFF`
- `COMPLETE`

## Example Transition Path

`BOOT` -> `TITLE` -> `MAP_EXPLORATION` -> `INTERACTION` -> `REWARD` -> `MAP_EXPLORATION` -> `RESULTS` -> `SLATE_HANDOFF` -> `COMPLETE`

## Recovery States

- From `INTERACTION`, resume to `MAP_EXPLORATION` if the player closes the overlay.
- From `SLATE_HANDOFF`, allow exit back to `RESULTS` without losing the completed session.

## Open Questions
- Should the prototype support pause and resume via local storage in v1?
