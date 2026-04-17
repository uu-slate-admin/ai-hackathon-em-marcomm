---
title: ADR-0001-SCOPE
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# ADR-0001: v1 Scope Boundary

## Purpose

Record the v1 scope decision so implementation stays aligned across product, engineering, and agent work.

## Inputs

- [PLAN/PLAN.md](../../PLAN/PLAN.md)
- [docs/spec/DATA-CONTRACTS.md](../spec/DATA-CONTRACTS.md)
- [slate/field-dictionary.md](../../slate/field-dictionary.md)

## Decision

For v1, the product will ship a single-map campus exploration game, compute three in-product outcomes (`academic_interest`, `swoop_stage`, `collected_items`), and optionally hand off to embedded Slate RFI using a minimal hidden-field contract.

Out of scope for v1:

- Multiple maps or large open-world traversal
- Separate in-state and out-of-state game experiences
- Combat or full RPG systems
- Deep adaptive branching that rewrites the entire journey
- Full custom content for every collectible combination
- In-game PII collection
- CRM routing or automation beyond Slate submission

## Outputs

This decision establishes:

- A narrow vertical-slice target
- A stable game-to-Slate handoff boundary
- Clear non-goals to reduce scope creep

## Constraints

- Keep median completion time in the 2-5 minute target
- Keep PII out of query parameters
- Preserve required hidden fields for Slate handoff
- Keep scope and field contract definitions canonical in `PLAN/PLAN.md` and `slate/field-dictionary.md`

## Consequences

Positive:

- Stronger alignment between concept and implementation
- Lower risk of building a dressed-up survey instead of a game
- Clearer system boundaries for map, progression, and handoff work

Tradeoffs:

- Less content breadth in v1
- Only one map scene at launch
- Slate remains intentionally minimal

## Last Verified

- Verified against `PLAN/PLAN.md` and `slate/field-dictionary.md` on 2026-04-17.

## Examples

In-scope example:

- Student walks the campus map, triggers landmark interactions, grows `Swoop`, sees an `academic_interest`, and can continue to Slate.

Out-of-scope example:

- Student is routed into a separate multi-map or combat-heavy game based on an early answer.

## Open Questions

- What criteria will justify a second map scene after the first vertical slice?
- When should save persistence move from optional to required?
