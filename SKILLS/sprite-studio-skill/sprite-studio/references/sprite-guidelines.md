# Sprite guidelines

## Defaults
- Canvas size: 16x16 for tiny icons, 32x32 for fuller characters.
- Perspective: front-facing or 3/4 front.
- Palette: 6-12 colors, with one outline color and 1-2 shades per material.
- Background: transparent unless the user requests a scene.

## Layer model
Recommended layer order:
1. outline
2. base body
3. hair
4. clothes
5. accessories
6. highlights
7. effects

## Generation approach
1. Start from the silhouette.
2. Place head, torso, limbs, and any large props.
3. Add hair and clothing shapes.
4. Add facial features and accessory pixels last.
5. Clean noisy pixels that break readability.

## Useful prompt cues
- Hair: spiky, bob cut, ponytail, hood, helmet, bangs
- Clothes: armor, robe, jacket, tunic, dress, cape
- Accessories: sword, staff, backpack, eyepatch, glasses, badge
- Mood: hero, shy, villain, wizard, rogue, robot

## Quality check
- Readable at 2x thumbnail size.
- Clear outline or contour.
- No accidental single-pixel noise unless intentional.
- Symmetry where appropriate, asymmetry where character identity needs it.
