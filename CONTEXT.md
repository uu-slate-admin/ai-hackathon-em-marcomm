---
title: CONTEXT
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# Context Map

## Purpose

Provide a single navigation file for project context across agent work, team execution, and stakeholder alignment.

## Read Order

1. [PLAN/PLAN.md](PLAN/PLAN.md)
2. [docs/spec/DATA-CONTRACTS.md](docs/spec/DATA-CONTRACTS.md)
3. [slate/field-dictionary.md](slate/field-dictionary.md)
4. [README.md](README.md)
5. [docs/decisions/ADR-0001-scope.md](docs/decisions/ADR-0001-scope.md)

## Canonical Sources

| Area | Source | Purpose |
| --- | --- | --- |
| Scope and boundaries | `PLAN/PLAN.md` | Product goal, non-goals, vertical-slice target, QA targets |
| Gameplay and result schemas | `docs/spec/DATA-CONTRACTS.md` | Map, trigger, progression, result, and session contracts |
| Slate handoff fields | `slate/field-dictionary.md` | Visible fields, hidden fields, and query mapping |

## Runtime Structure

| Area | Location | Purpose |
| --- | --- | --- |
| Gameplay systems | `src/game/` | Loop, scenes, movement, collision, triggers |
| Content definitions | `src/content/` | Map data, dialogue, items, scoring, results |
| UI layers | `src/ui/` | HUD, interactions, overlays, results, handoff |
| Runtime assets | `assets/` | Map art, sprites, audio |

## Constraints

- Keep `PLAN/PLAN.md` as scope source of truth.
- Keep `docs/spec/DATA-CONTRACTS.md` as gameplay schema source of truth.
- Keep `slate/field-dictionary.md` as Slate field source of truth.
- Keep Slate secondary to gameplay in the repo structure and product framing.

## Open Questions

- When should additional runtime docs be split by subsystem instead of kept under `docs/spec/`?
