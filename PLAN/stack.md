# Stack Decision: Student Discovery Game

## Chosen Stack

| Layer | Choice |
|---|---|
| Markup | HTML |
| Styling | CSS + Tailwind CSS (via CDN) |
| Logic | Vanilla JavaScript |
| Data | Static JSON files |
| Hosting | GitHub Pages |
| Build tool | None |

No framework. No build step. No compilation. You write files, open them in a browser, and they work.

---

## Why This Stack

- **Familiar languages** — HTML, CSS, and JavaScript are readable and understandable without a framework layer in between.
- **No tooling overhead** — no Node, no bundler, no config files to wrestle with.
- **GitHub Pages ready** — a folder with an `index.html` and supporting files deploys directly, no extra steps.
- **Capable enough** — modern CSS handles animations natively. Tailwind handles utility styling. Vanilla JS handles state logic cleanly for a game this size.
- **AI-assisted friendly** — generated code is easier to read and understand without framework abstractions on top.

### What Was Considered and Why It Was Set Aside

- **SvelteKit** — good framework, but requires learning new conventions under time pressure. GitHub Pages deployment also requires extra adapter configuration.
- **React + Vite** — familiar to many, but introduces a build pipeline and module system that adds complexity without meaningful benefit at this scale.
- **TypeScript** — adds type safety, but also a compilation step and config overhead. Can be introduced later if complexity grows.

---

## File Structure

```
/
├── index.html          # Entry point, game shell
├── style.css           # Custom styles (Tailwind supplements, animations)
├── app.js              # All game logic and state management
└── data/
    ├── questions.json  # Question prompts, options, and profile weights
    ├── profiles.json   # Student motivation types with labels and descriptions
    ├── interests.json  # College/field interest branches
    └── results.json    # Profile + interest combination result mappings
```

---

## How the Game Works (State Flow)

The game is a simple state machine. One variable (`state`) controls what screen is shown. JavaScript watches it and redraws the screen when it changes.

```
intro → question (×5-7) → branch (college selector) → result → form (Slate RFI)
```

As the player answers questions, their choices add points to profile buckets tracked in a plain JavaScript object. At the end, the bucket with the most points determines their profile.

---

## Data Files

Each JSON file maps to one of the four core data contracts defined in `PLAN.md`.

### `questions.json`
Each question has a prompt, a list of options, and weights that nudge toward one or more profiles.

### `profiles.json`
3–5 student motivation types (e.g. Explorer, Builder, Connector) with a label, short summary, and result copy.

### `interests.json`
College/field branches the student selects from (e.g. Engineering, Humanities, Health Sciences). Maps to University of Utah college structure.

### `results.json`
A lookup table keyed by `profile_id + interest_id` that returns a personalized headline, body copy, and CTA for the result screen.

---

## Animations and Visual Polish

Modern CSS is fully capable of the animations and transitions needed:

- `transition` — smooth state changes between screens
- `@keyframes` — entrance/exit animations for questions and results
- `@starting-style` — enter animations without JavaScript
- Tailwind utility classes handle spacing, color, and typography

University of Utah brand colors (crimson `#CC0000`, white `#FFFFFF`, and neutrals) will be defined as CSS custom properties in `style.css`.

---

## Slate RFI Handoff

The game ends by passing non-PII metadata to an embedded Slate RFI form via URL query parameters:

| Field | Source |
|---|---|
| `game_profile` | Computed at result screen |
| `game_interest` | Selected in college branch |
| `game_version` | Hardcoded in `app.js` |
| `game_session_id` | Generated at game start |
| `game_completed_at` | Timestamp at result screen |

No PII is passed via query parameters. Student contact fields are collected directly by Slate.

---

## Next Steps

1. Draft content for all four JSON data files (questions, profiles, interests, results) using University of Utah branding and college structure.
2. Build a minimal working `app.js` state machine with placeholder data.
3. Layer in CSS animations and Tailwind polish.
4. Integrate Slate RFI embed and hidden field handoff.
