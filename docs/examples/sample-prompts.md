---
title: SAMPLE-PROMPTS
owner: team
status: draft
last_updated: 2026-04-17
source_of_truth: false
---

# Sample Prompts

## Purpose
Provide reusable prompt starters for recurring team tasks.

## Inputs
- `../../CONTEXT.md`
- `../agents/AGENT-START-HERE.md`

## Outputs
- Reusable prompt set for common repo tasks.

## Examples

- Add landmark interactions:
  - "Propose 5 new landmark interactions that fit the current campus map and score toward existing academic-interest IDs."
- Validate Slate mapping:
  - "Compare hidden-field mappings in docs/spec and slate/field-dictionary, then list mismatches."
- Organize runtime assets:
  - "Review new files under assets/ and suggest final folder placement and naming fixes."
- Draft result copy:
  - "Generate 3 short result variants for `academic_interest=engineering_technology` with `swoop_stage=growing`."

## Constraints
- Prompts must preserve canonical field names and scope boundaries.

## Open Questions
- Which prompts should become canonical templates in `codex/prompt-pack.md`?
