# AI Hackathon EM MarComm

## Purpose

Build a branded University of Utah campus exploration game for prospective students. Players walk through a stylized campus-and-city map, trigger short discovery moments about student life and academics, grow a Tamagotchi-style `Swoop` companion from egg to adult, collect campus items, reveal an `academic_interest`, and then optionally continue to an embedded Slate RFI with non-PII game metadata.

## Current Direction

The repo is now organized around a playable vertical slice, not a survey flow.

- Core loop: walk, discover, interact, collect, grow `Swoop`, reveal `academic_interest`
- Experience target: lightweight Pokemon-style campus exploration
- Slate role: final lead-capture handoff only

## Core Documents

- Plan: [PLAN/PLAN.md](PLAN/PLAN.md)
- Stack: [PLAN/stack.md](PLAN/stack.md)
- Context map: [CONTEXT.md](CONTEXT.md)
- Data contracts: [docs/spec/DATA-CONTRACTS.md](docs/spec/DATA-CONTRACTS.md)
- Slate fields: [slate/field-dictionary.md](slate/field-dictionary.md)

## Repo Structure

```text
/
  assets/
    maps/
    sprites/
    audio/
  docs/
  slate/
  src/
    game/
    content/
    ui/
```

- `src/game/`: movement, scenes, triggers, camera, session state
- `src/content/`: map definitions, interactions, items, scoring, result mappings
- `src/ui/`: HUD, dialogue, inventory, results, Slate handoff screens
- `assets/`: map art, sprite sheets, audio, and other runtime assets
