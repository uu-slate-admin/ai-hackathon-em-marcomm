---
title: WORKFLOW
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# Team Workflow

## Purpose

Define how the team collaborates while building the first playable campus exploration slice.

## Inputs

- [docs/team/ONBOARDING.md](ONBOARDING.md)
- [docs/team/DEV-SETUP.md](DEV-SETUP.md)
- [PLAN/PLAN.md](../../PLAN/PLAN.md)
- [CONTEXT.md](../../CONTEXT.md)

## Outputs

- Team-aligned gameplay, content, and UI contributions
- Predictable placement for code, content, and assets
- Clear review loop before new systems are merged

## Current Phase Workflow

1. Review canonical docs first.
2. Decide whether the work belongs in gameplay, content, UI, or assets.
3. Add or update files in the correct repo area.
4. Notify the lead developer of any canonical or contract impact.
5. Resolve review feedback before starting dependent work.

## Contribution Lanes

- Gameplay: `src/game/`
- Content/data: `src/content/` and `docs/spec/`
- UI/UX: `src/ui/`
- Runtime assets: `assets/`
- Canonical docs and handoff rules: `PLAN/`, `slate/`, `docs/spec/`

## Asset Placement Rules

- Put runtime map art in `assets/maps/`.
- Put character, `Swoop`, item, and landmark art in `assets/sprites/`.
- Put ambient or UI audio in `assets/audio/`.
- Keep brand-source/reference assets under `SKILLS/uofu-enrollment-branding/assets/`.

## Naming Rules

- Use descriptive, stable filenames tied to game concepts.
- Prefer slug-style names such as `campus-core.png`, `swoop-hatchling.png`, `union-plaza-trigger.json`.
- Avoid temporary names like `final`, `new-map`, or `sprite2`.

## Review and Approval Workflow

- Lead developer reviews:
  - system boundary fit
  - naming consistency
  - alignment to scope and contracts
- Changes to canonical files (`PLAN/PLAN.md`, `slate/field-dictionary.md`, `docs/spec/DATA-CONTRACTS.md`) require explicit review.

## Constraints

- Do not introduce PII into runtime payloads or query-parameter examples.
- Do not change scope boundaries without approval.
- Do not broaden the Slate payload beyond the canonical fields without approval.

## Examples

- Designer adds `assets/sprites/swoop-hatchling.png`, then developer wires it into `SwoopStage` data and requests review.

## Open Questions

- Should map content live entirely in data files, or may the engine define some triggers in code during prototyping?
