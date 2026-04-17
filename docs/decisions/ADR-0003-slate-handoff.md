---
title: ADR-0003-SLATE-HANDOFF
owner: team
status: draft
last_updated: 2026-04-17
source_of_truth: false
---

# ADR-0003: Slate Handoff Boundary

## Purpose
Capture the decision rationale for where game scope ends and Slate responsibility begins.

## Inputs
- `PLAN/PLAN.md`
- `slate/field-dictionary.md`
- `docs/spec/DATA-CONTRACTS.md`

## Outputs
- Durable decision record on the final integration boundary and ownership split.

## Constraints
- Must preserve the required hidden-field contract.
- Must keep Slate secondary to gameplay.

## Current Direction

- Slate begins after the result screen.
- The game passes only `game_academic_interest`, `game_version`, `game_session_id`, and `game_completed_at`.
- `Swoop` stage, collectibles, and runtime exploration data remain in-product only.

## Examples
- The results screen includes a CTA that builds the Slate query payload from the finished session.

## Open Questions
- Should the Slate handoff open inline, in an iframe, or as a separate route in the first playable slice?
