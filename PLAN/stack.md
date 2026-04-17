# Stack Decision: Campus Exploration Game

## Chosen Stack

| Layer | Choice |
| --- | --- |
| Runtime | Browser-based 2D game |
| Markup shell | HTML |
| Styling/UI | CSS |
| Logic | JavaScript modules |
| Game rendering | Canvas-based scene rendering |
| Content | Static JSON or JS data modules |
| Hosting | GitHub Pages |
| Local dev | Lightweight local web server |
| Build tool | None for v1 unless engine choice forces one |

The repo should now be prepared for a real map-driven game loop rather than a screen-by-screen survey flow.

## Why This Direction

- Free movement is central to the concept, so the architecture should center map scenes, trigger zones, and exploration state.
- A browser-based 2D stack keeps the prototype lightweight enough for hackathon speed.
- Static content files are still a good fit for landmarks, interactions, items, and result mappings.
- GitHub Pages remains viable if the prototype stays client-side.

## Runtime Structure

```text
/
  index.html              # Game shell and bootstrapping
  src/
    game/                 # Loop, scenes, movement, collision, triggers
    content/              # Map data, dialogues, items, interests, results
    ui/                   # HUD, dialogue boxes, overlays, handoff screens
  assets/
    maps/                 # Campus map art and collision layers
    sprites/              # Player, Swoop, item, and landmark art
    audio/                # Optional ambient and UI audio
```

## Gameplay Flow

The target loop is:

```text
boot -> map exploration -> landmark interaction -> reward/progression -> results -> slate handoff
```

Core systems needed in v1:
- Tile or grid-aware player movement
- One campus map scene with collision boundaries
- Trigger zones for 5-8 landmarks
- Dialogue or prompt overlays for interactions
- `Swoop` growth progression
- Collectible tracking
- `academic_interest` scoring
- Final result screen
- Optional Slate handoff screen

## Data Files

Recommended content modules:

- `map-scenes.json`: scene bounds, landmark positions, collision references
- `location-triggers.json`: trigger metadata, linked dialogue, rewards, scoring
- `dialogue-events.json`: short interaction content and choice outcomes
- `collectible-items.json`: item metadata and unlock conditions
- `academic-interests.json`: result IDs, labels, and destination copy
- `result-mappings.json`: result modules keyed by `academic_interest`, `swoop_stage`, and items

## Slate RFI Handoff

If the player continues to Slate, the game should pass only:

| Field | Source |
| --- | --- |
| `game_academic_interest` | Computed at result screen |
| `game_version` | Game/content contract version |
| `game_session_id` | Generated at game start |
| `game_completed_at` | Timestamp at result completion |

No PII, `swoop_stage`, or collectible data should be passed via query parameters in v1.

## Next Steps

1. Build the gameplay and content contracts.
2. Implement a one-map vertical slice with movement and trigger zones.
3. Add `Swoop` growth, collectibles, and result mapping.
4. Add the final Slate handoff screen and query payload builder.
