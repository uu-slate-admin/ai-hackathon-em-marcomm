---
title: AGENT-RULES
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# Agent Rules

## Purpose

Define non-negotiable operating rules for agent contributions in this repository.

## Inputs

- [docs/agents/AGENT-START-HERE.md](AGENT-START-HERE.md)
- [PLAN/PLAN.md](../../PLAN/PLAN.md)
- [slate/field-dictionary.md](../../slate/field-dictionary.md)
- [docs/spec/DATA-CONTRACTS.md](../spec/DATA-CONTRACTS.md)
- [CONTEXT.md](../../CONTEXT.md)

## Outputs

Agent work should produce:

- Changes aligned with canonical scope and field contracts
- Explicit notes when assumptions are made
- Validation evidence for paths and contract safety

## Canonical Source Rules

- Treat `PLAN/PLAN.md` as scope source of truth.
- Treat `slate/field-dictionary.md` as Slate field source of truth.
- Treat `docs/spec/DATA-CONTRACTS.md` as gameplay schema source of truth.
- Do not redefine canonical objects in secondary docs.

## Edit Boundary Rules

Safe without prior approval:

- `docs/**` except files explicitly marked approval-required
- `README.md`
- `CONTEXT.md`
- `src/**`
- `assets/**`
- `SKILLS/**` for skill/documentation/asset organization work

Approval required before editing:

- `PLAN/PLAN.md`
- `slate/field-dictionary.md`
- `docs/spec/DATA-CONTRACTS.md`
- Any file or change that modifies required handoff fields or field semantics

## Data and Privacy Rules

- Never place PII in query parameters.
- Keep game-to-Slate handoff payload limited to approved non-PII metadata fields.
- Preserve required hidden fields for submission contracts unless approval is granted.

## Change Safety Rules

- Make minimal, reversible edits.
- Do not silently change naming conventions or IDs used by canonical contracts.
- If a planned edit conflicts with canonical docs, stop and request review.

## Examples

Allowed:

- Add a new gameplay spec under `docs/spec/`.
- Create sprite placeholders under `assets/sprites/`.
- Add implementation files under `src/game/` that follow canonical contracts.

Not allowed without approval:

- Renaming `game_academic_interest` to another field name.
- Adding `swoop_stage` or collectible fields to the Slate payload.
- Expanding v1 beyond one-map vertical-slice scope.

## Open Questions

- Should we add automated contract validation once runtime code exists?
