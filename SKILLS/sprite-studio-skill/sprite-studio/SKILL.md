---
name: sprite-studio
description: design and edit retro 8-bit pixel-art character sprites in a small web-based editor. use when asked to generate a sprite from a text prompt, combine layered parts such as hair, clothes, or accessories, refine a sprite’s colors or pose, or build a single-file react editor for character sprite creation.
---

# Sprite Studio

## Overview
Create compact retro character sprites with a limited palette, crisp pixel edges, and layered parts that remain easy to edit.
Use a small web-based editor as the default output when the request asks for a generator/editor or an interactive sprite workspace.

## Core workflow

1. Extract the sprite brief.
   - Identify subject, style, pose, mood, clothing, hair, accessories, and any must-have details.
   - If the user provides only a text prompt, infer the missing sprite parts and keep the design readable at small size.
   - If the user provides layered parts, preserve them as editable layers and resolve conflicts with sensible defaults.

2. Lock the sprite format.
   - Default to 16x16 or 32x32 pixels.
   - Keep the palette small and consistent.
   - Prefer transparent background, silhouette-first shapes, and limited highlights/shadows.

3. Build the editor.
   - Output a single-file React editor unless the user explicitly asks for a different stack.
   - Include a prompt field, layer stack, palette controls, pixel-grid canvas, and live preview.
   - Support adding, deleting, reordering, hiding, and recoloring layers.
   - Include export/import for JSON sprite data.
   - Add a one-click generate or randomize action seeded by the prompt.

4. Generate the sprite.
   - Translate the prompt into a simple structured sprite plan before drawing.
   - Use separate layers for base body, hair, clothes, accessories, and outline when possible.
   - Keep the design readable at thumbnail size.

## Sprite rules
- Use nearest-neighbor scaling and hard pixel edges.
- Favor strong silhouette contrast over fine detail.
- Keep the face and accessory shapes simple enough to edit per pixel.
- Limit palette drift between layers.
- Preserve transparency where the sprite needs cutouts or empty space.

## Starter editor guidance
When producing a React editor, include these behaviors in the component:
- A central pixel grid that edits the active layer.
- A small palette of retro colors plus transparency.
- Layer visibility toggles and active-layer selection.
- Prompt-driven generation that fills the sprite with a simple retro character design.
- Export to JSON so the sprite can be saved or shared.
- Import from JSON so the user can continue editing later.

## Resource map
- `references/sprite-guidelines.md`: detailed pixel-art conventions and generation rules.
- `assets/SpriteStudioEditor.jsx`: ready-to-use single-file React editor starter.

## Output style
When asked to create the editor, return a polished, self-contained component or app shell with minimal dependencies and clear control labels.
