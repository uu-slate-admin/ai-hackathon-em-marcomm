---
title: DEV-SETUP
owner: team
status: canonical
last_updated: 2026-04-17
source_of_truth: true
---

# Dev Setup

## Purpose

Document the practical local setup for contributors preparing to build the campus exploration prototype.

## Inputs

- [README.md](../../README.md)
- [CONTEXT.md](../../CONTEXT.md)
- [PLAN/PLAN.md](../../PLAN/PLAN.md)

## Outputs

After setup, contributors should be able to:

- Clone the repository locally
- Open the repository in their editor
- Understand where gameplay, content, UI, and asset files belong

## Current Setup

Required:

- GitHub account with repo access
- Git installed
- A local editor or Codex-compatible workspace

Recommended:

- GitHub Desktop for easier clone and pull workflow
- A lightweight local web server for eventual browser testing

Repository actions currently expected:

- Read and update docs
- Add runtime scaffolding under `src/`
- Add map, sprite, and audio assets under `assets/`
- Prepare for client-side prototype implementation

## Not Yet Defined

The following are intentionally not locked yet:

- Final engine or rendering library
- Build pipeline
- Test runner and CI workflow
- Deployment details beyond static hosting compatibility

Do not assume these until implementation explicitly defines them.

## Setup Steps

Repository URL:

- `https://github.com/uu-slate-admin/ai-hackathon-em-marcomm.git`

1. Install Git if needed.
2. Clone the repo using GitHub Desktop or `git clone`.
3. Open the cloned folder in your editor.
4. Confirm these paths are visible:
   - `README.md`
   - `PLAN/PLAN.md`
   - `docs/spec/DATA-CONTRACTS.md`
   - `slate/field-dictionary.md`
   - `src/`
   - `assets/`

## Setup Verification Checklist

- Repo is cloned locally.
- Repo opens in the editor.
- Team member can navigate to plan, contracts, Slate docs, `src/`, and `assets/`.
- Team member knows where to place edits for their role.

## Constraints

- Keep instructions simple for mixed technical backgrounds.
- Keep canonical scope and contract files unchanged unless explicitly approved by the project lead.

## Open Questions

- When the runtime starts, should we document one standard local server command for everyone?
