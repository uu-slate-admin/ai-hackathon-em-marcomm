---
title: QA-CHECKLIST
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# QA Checklist

## Purpose

Provide a lightweight quality checklist for the repo-reset and vertical-slice phase.

## Inputs

- [PLAN/PLAN.md](../../PLAN/PLAN.md)
- [slate/field-dictionary.md](../../slate/field-dictionary.md)
- [docs/team/WORKFLOW.md](WORKFLOW.md)

## Outputs

- Fewer scope and contract regressions
- Cleaner gameplay/content structure
- Better readiness for implementation kickoff

## Scope and Contract Checks

- [ ] Changes remain within current v1 scope boundaries.
- [ ] No non-goal systems were introduced by implication.
- [ ] Required handoff fields remain unchanged:
  - `game_academic_interest`
  - `game_version`
  - `game_session_id`
  - `game_completed_at`
- [ ] No new PII appears in runtime examples or query parameter examples.

## Gameplay Structure Checks

- [ ] Gameplay code lives under `src/game/`.
- [ ] Content definitions live under `src/content/` or canonical spec docs.
- [ ] UI code or overlays live under `src/ui/`.
- [ ] Runtime assets are placed under `assets/`.
- [ ] The vertical slice still targets one map and one short exploration loop.

## Documentation Checks

- [ ] New docs include frontmatter when they live under `docs/` or `slate/`.
- [ ] Links point to valid files.
- [ ] Canonical values are referenced, not duplicated inconsistently.
- [ ] `Open Questions` exists where appropriate.

## Team Review Checks

- [ ] Lead developer reviewed canonical-sensitive changes.
- [ ] Content, art, and system contributions are traceable to repo paths.
- [ ] Any unresolved decision is logged in a repo file, not hidden in chat.

## Readiness Signal

Ready to move deeper into implementation when:

- [ ] Scope docs are stable for one review cycle.
- [ ] Slate field dictionary is stable for one review cycle.
- [ ] Data contracts are stable for one review cycle.
- [ ] Repo structure for gameplay, content, UI, and assets is in place.
- [ ] No high-severity contract questions remain.

## Open Questions

- Which checks should become automated first: link validation, payload validation, or asset naming rules?
