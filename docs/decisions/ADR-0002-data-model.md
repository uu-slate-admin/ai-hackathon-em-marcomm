---
title: ADR-0002-DATA-MODEL
owner: team
status: draft
last_updated: 2026-04-17
source_of_truth: false
---

# ADR-0002: Data Model Direction

## Purpose
Capture the rationale for gameplay data model choices once IDs and structures are finalized.

## Inputs
- `docs/spec/DATA-CONTRACTS.md`

## Outputs
- Decision record for map, trigger, progression, and result data design.

## Constraints
- Must remain aligned with canonical scope and Slate contract files.

## Examples
- Candidate decision: keep human-readable slugs for `academic_interest`, `swoop_stage`, `collectible_item`, and `location_trigger` IDs.

## Open Questions
- Should scene and trigger positions live in JSON assets or in JS modules tuned by the runtime?
