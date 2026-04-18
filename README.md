# UofU Campus Exploration Game

A University of Utah campus exploration prototype built with Phaser and Vite. Players walk a stylized campus map, trigger short discovery moments about academics and student life, grow `Swoop` from egg to adult, and finish with a lightweight program/result handoff.

## Run Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Repo Layout

```text
/
  assets/   runtime maps, photos, sprites, and fonts
  src/      game logic, scenes, systems, and overlays
  SKILLS/   reusable project-specific skill assets kept at repo root
```

The public repo is intentionally app-first. Internal planning notes, process docs, and working files live under `internal/` locally and are ignored by git.

## Stack

- Vite
- Phaser 3
- Vanilla JavaScript modules

## Status

The current build is a playable vertical slice with:

- title screen and onboarding flow
- campus exploration and trigger interactions
- `Swoop` progression
- program selection and result summary flow
