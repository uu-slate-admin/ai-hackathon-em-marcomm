---
title: AGENT-START-HERE
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# Agent Start Here

## Purpose

Provide the minimum required context for an agent to make safe, high-value changes in this repository.

## Inputs

Read these files in order before editing:

1. [PLAN/PLAN.md](../../PLAN/PLAN.md)
2. [docs/spec/DATA-CONTRACTS.md](../spec/DATA-CONTRACTS.md)
3. [slate/field-dictionary.md](../../slate/field-dictionary.md)
4. [CONTEXT.md](../../CONTEXT.md)
5. [README.md](../../README.md)

## Outputs

Every change should produce:

- A clear file-level update aligned to current game scope
- Preserved compatibility with canonical gameplay and handoff contracts
- A concise summary of what changed and how it was verified

## Constraints

Safe to edit without prior approval:

- `docs/**` except files marked otherwise later
- `README.md`
- `CONTEXT.md`
- `src/**`
- `assets/**`

Requires explicit human approval before changing:

- `PLAN/PLAN.md`
- `slate/field-dictionary.md`
- `docs/spec/DATA-CONTRACTS.md`
- Any file that changes required field names or handoff semantics

Must-not-break rules:

- Do not rename or redefine canonical handoff fields without approval.
- Do not introduce PII into query parameter mappings.
- Do not duplicate canonical definitions across multiple files.

## Validation

Before finalizing:

1. Confirm changed docs still match canonical sources.
2. Confirm links added or edited resolve to real files.
3. If contracts changed, flag them explicitly in the handoff summary.

## Examples

Appropriate:

- Add a gameplay spec under `docs/spec/`.
- Add runtime placeholder files under `src/game/`, `src/content/`, or `src/ui/`.

Not appropriate without approval:

- Changing required hidden fields in the Slate contract.
- Expanding v1 beyond the one-map exploration slice.

## Open Questions

- Which runtime files should become approval-required once implementation starts?
