---
title: API-CONTRACTS
owner: team
status: draft
last_updated: 2026-04-17
source_of_truth: false
---

# API Contracts

## Purpose
Document browser-facing interfaces and payload builders needed for the prototype.

## Inputs
- `DATA-CONTRACTS.md`
- `slate/field-dictionary.md`
- `EVENT-FLOWS.md`

## Outputs
- Practical runtime interface definitions for implementation.

## Constraints
- No server dependency is assumed in v1.
- Client-side interfaces must stay compatible with GitHub Pages hosting.

## Runtime Interfaces

- `createSession(): GameSession`
- `loadScene(sceneId): MapScene`
- `resolveTrigger(triggerId, session): GameSession`
- `resolveAcademicInterest(session): string`
- `buildSlatePayload(session): GameOutputContract`

## Example Contract

`buildSlatePayload(session)` should return:

```json
{
  "game_academic_interest": "engineering_technology",
  "game_version": "v1.0.0",
  "game_session_id": "550e8400-e29b-41d4-a716-446655440000",
  "game_completed_at": "2026-04-17T18:24:31Z"
}
```

## Open Questions
- Will the first runtime load content from static JSON files or bundled JS modules?
