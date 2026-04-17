---
title: HANDOFF
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# Team Handoff

## Purpose

Define what must be true before handing off gameplay, content, UI, or asset work between contributors.

## Inputs

- [docs/team/WORKFLOW.md](WORKFLOW.md)
- [docs/team/QA-CHECKLIST.md](QA-CHECKLIST.md)
- [PLAN/PLAN.md](../../PLAN/PLAN.md)
- [slate/field-dictionary.md](../../slate/field-dictionary.md)

## Outputs

- Consistent and reviewable handoff packets
- Fewer misunderstandings between contributors
- Clear readiness signals for system-level integration

## Handoff Packet (Required)

Each handoff should include:

1. **What changed**
   - File paths changed
   - Brief summary of additions or updates

2. **Why it changed**
   - Gameplay, content, UI, or handoff rationale
   - Related contract or scope tie-back

3. **What to review**
   - Specific review points
   - Any canonical or runtime integration risk

4. **What is still open**
   - Explicit unresolved items
   - Suggested owner for each decision

## Role-Based Handoff Guidance

Content -> Gameplay/UI:

- Include trigger IDs, intended tone, and any scoring assumptions.

Designer -> Gameplay/UI:

- Include asset paths, intended state usage, and dimensions if relevant.

Gameplay -> Team:

- Confirm state changes, trigger behavior, and content dependencies.

Developer -> Team:

- Flag any canonical contract impact immediately.

## Phase Transition Handoff

Before moving from setup into broader implementation, confirm:

- `PLAN/PLAN.md` is stable for the current review cycle.
- `slate/field-dictionary.md` is stable for the current review cycle.
- `docs/spec/DATA-CONTRACTS.md` reflects current gameplay and handoff schemas.
- `src/` and `assets/` structure is in place for gameplay, content, UI, and runtime assets.
- High-priority open questions are resolved or clearly assigned.

## Constraints

- No handoff is complete if canonical-impacting changes are undocumented.
- No hidden assumptions: unresolved decisions must be written in files, not only in chat.
- Do not treat chat-only context as sufficient handoff documentation.

## Example Handoff Template

```text
Handoff Summary
- Changed:
  - path/to/file1
  - path/to/file2
- Reason:
  - aligns with gameplay or contract goal
- Review Focus:
  - verify specific runtime or contract behavior
- Open Questions:
  - question (owner: role)
```

## Open Questions

- Should we add a running handoff log once multiple contributors start touching runtime code?
