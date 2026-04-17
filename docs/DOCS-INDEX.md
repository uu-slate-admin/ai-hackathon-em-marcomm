---
title: DOCS-INDEX
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# Docs Index

## Purpose

Provide a single-table index of core documentation and reference files.

## Inputs

- `CONTEXT.md`
- Markdown frontmatter metadata in `docs/`, `slate/`, and `codex/`

## Outputs

- Fast navigation for team members and agents
- Clear visibility of canonical vs draft documents

## Index

| Path | Owner | Status | Source of Truth | Purpose |
| --- | --- | --- | --- | --- |
| `README.md` | n/a | n/a | n/a | Introduce the repo as a campus exploration game and runtime scaffold. |
| `CONTEXT.md` | team | canonical | true | Provide a single navigation file for project context across agent work, team execution, and stakeholder alignment. |
| `docs/agents/AGENT-START-HERE.md` | team | canonical | true | Provide the minimum required context for an agent to make safe, high-value changes in this repository. |
| `docs/agents/AGENT-RULES.md` | team | canonical | true | Define non-negotiable operating rules for agent contributions in this repository. |
| `docs/team/ONBOARDING.md` | team | canonical | true | Provide a quick team-level understanding of the current game concept, repo structure, and boundaries. |
| `docs/team/DEV-SETUP.md` | team | canonical | true | Document the practical local setup for this hackathon team so contributors can clone the repo and work locally. |
| `docs/team/WORKFLOW.md` | team | canonical | true | Define how the team collaborates while building the first playable campus exploration slice. |
| `docs/team/QA-CHECKLIST.md` | team | canonical | true | Provide a lightweight quality checklist for the repo-reset and vertical-slice phase. |
| `docs/team/HANDOFF.md` | team | canonical | true | Define what must be true before handing off gameplay, content, UI, or asset work. |
| `docs/spec/DATA-CONTRACTS.md` | team | canonical | true | Define the canonical gameplay and Slate handoff contracts for v1. |
| `docs/spec/EVENT-FLOWS.md` | team | draft | false | Define key runtime event sequences from game boot to Slate handoff. |
| `docs/spec/STATE-MACHINE.md` | team | draft | false | Describe game states and transitions for the campus exploration slice. |
| `docs/spec/API-CONTRACTS.md` | team | draft | false | Document browser-facing interfaces and payload builders needed for the prototype. |
| `docs/decisions/ADR-0001-scope.md` | team | canonical | true | Record the scope decision for the one-map exploration-game v1. |
| `docs/decisions/ADR-0002-data-model.md` | team | draft | false | Capture rationale for gameplay data-model choices once finalized. |
| `docs/decisions/ADR-0003-slate-handoff.md` | team | draft | false | Capture final decision rationale for where game scope ends and Slate begins. |
| `docs/qa/TEST-MATRIX.md` | team | draft | false | Outline key test scenarios for gameplay completion and Slate handoff. |
| `docs/examples/sample-inputs.json` | n/a | draft | false | Example in-memory game session payload for runtime design. |
| `docs/examples/sample-outputs.json` | n/a | draft | false | Example output payload for game-to-Slate handoff metadata. |
| `slate/field-dictionary.md` | n/a | canonical | true | Define Slate visible and hidden field contracts for v1 handoff. |
| `slate/hidden-field-mapping.md` | team | draft | false | Provide a compact mapping reference for game metadata -> Slate hidden fields. |

## Constraints

- Canonical source definitions in this index must match file frontmatter and project authority boundaries.

## Examples

- Use this file to quickly identify which docs are safe to revise versus which ones define canonical game scope or contracts.

## Open Questions

- Should this index be auto-generated from frontmatter in the future?
