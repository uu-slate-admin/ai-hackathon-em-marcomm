---
title: ONBOARDING
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# Team Onboarding

## Purpose

Provide a quick team-level understanding of the current game concept, repo structure, and boundaries.

## What “Canonical” vs “Supporting” Means

- **Canonical files**: final source of truth for a topic. If there is conflict, these win.
- **Supporting files**: helpful guidance and planning docs that should align to canonical files.

Current canonical files:

- [PLAN/PLAN.md](../../PLAN/PLAN.md) for product scope and v1 boundaries
- [slate/field-dictionary.md](../../slate/field-dictionary.md) for the Slate handoff contract
- [docs/spec/DATA-CONTRACTS.md](../spec/DATA-CONTRACTS.md) for gameplay and handoff schemas

## Outputs

After onboarding, a contributor should be able to:

- Explain the campus exploration game loop
- Describe the `Swoop` progression and `academic_interest` result model
- Describe the game -> Slate handoff contract
- Identify where gameplay code, content data, UI work, and assets belong

## Inputs

- [README.md](../../README.md)
- [CONTEXT.md](../../CONTEXT.md)
- [PLAN/PLAN.md](../../PLAN/PLAN.md)
- [docs/spec/DATA-CONTRACTS.md](../spec/DATA-CONTRACTS.md)
- [slate/field-dictionary.md](../../slate/field-dictionary.md)

## Read First

1. [README.md](../../README.md)
2. [CONTEXT.md](../../CONTEXT.md)
3. [PLAN/PLAN.md](../../PLAN/PLAN.md)
4. [docs/spec/DATA-CONTRACTS.md](../spec/DATA-CONTRACTS.md)
5. [slate/field-dictionary.md](../../slate/field-dictionary.md)

## Current Project Focus

At this point, the team should focus on:

- Building the repo around a playable vertical slice
- Locking gameplay, content, and handoff contracts
- Adding map, sprite, and interaction assets in predictable locations
- Keeping Slate integration intentionally narrow

## Scope Snapshot

- Product goal: 2-5 minute campus exploration game
- Primary in-product outcomes: `academic_interest`, `swoop_stage`, `collected_items`
- Handoff: embedded Slate RFI with minimal hidden game metadata
- Current phase: vertical-slice setup

## Constraints

- Do not change v1 scope boundaries without team approval.
- Do not change required Slate field definitions without team approval.
- Keep PII out of query parameter examples and contracts.

## Examples

- New teammate can describe the one-map exploration loop and point to the source-of-truth files without reading chat history.

## Open Questions

- When should we split work into map-engine, content, and UI implementation tracks?
- What asset naming convention should become mandatory for sprites and map layers?
