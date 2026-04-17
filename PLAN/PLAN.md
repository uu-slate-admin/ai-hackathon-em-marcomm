# Campus Exploration Game With Growing Swoop

## 1) Product Goal and v1 Scope

Build a 2-5 minute branded campus exploration game that feels closer to a lightweight Pokemon-style walkaround than a form.

The game must produce three in-product outcomes:
- `academic_interest` (college/field interest)
- `swoop_stage` (egg -> hatchling -> growing -> adult progression state)
- `collected_items` (campus discoveries earned during play)

v1 uses one shared exploration loop:
- Players move through a stylized University of Utah campus map.
- Walking to landmarks triggers short interactions tied to student life, academics, belonging, and future goals.
- Each completed interaction can award a collectible item and advance `Swoop` growth.
- The overall run produces `academic_interest` and a lightweight non-PII handoff payload for Slate.

After results, the experience can hand off to an embedded Slate RFI that collects `first`, `last`, `email`, `school`, `campus`, `contact_type`, and `birthdate`. The game only passes approved non-PII metadata to Slate hidden fields.

Do not build separate in-state and out-of-state game versions in v1.

## 2) Experience Definition

The intended experience is a guided University of Utah discovery tour for prospective students.

- The player explores campus with `Swoop`, who begins as an egg and grows as the player makes discoveries.
- Movement happens on a stylized topographical campus-and-city map with visible landmarks and trigger points.
- The experience should feel like discovering campus and raising `Swoop`, not filling out a questionnaire.
- Interactions should blend place, academics, student life, support, and future ambition into one cohesive walkaround.
- The result should help the student understand an academic area to explore next, recap `Swoop` growth, and optionally lead into Slate.

This plan defines the product shape, scope, and handoff boundary. Exact map art, item taxonomy, interaction copy, and final interest taxonomy can be finalized during implementation.

## 3) Non-Goals and v1 Boundaries

- Multiple maps or a large open-world campus simulation.
- Separate in-state and out-of-state game experiences.
- Deep adaptive branching that rewrites the entire journey from early answers.
- Combat systems, enemy encounters, or full RPG progression.
- Full custom content for every possible collectible combination.
- In-game contact form collection.
- PII in query parameters.
- Downstream CRM routing or automation beyond Slate submission.

## 4) Canonical User Journey

- Student enters from a campaign or site source.
- Student starts on a campus map with a controllable player avatar and `Swoop` companion.
- Student walks to 5-8 landmarks and triggers short interactions.
- Interactions award progress toward `academic_interest`, advance `Swoop`, and can unlock collectible items.
- Game computes and displays `academic_interest`, final `swoop_stage`, and earned items.
- Student can continue to an embedded Slate RFI form.
- Game passes non-PII metadata to Slate hidden fields.

## 5) Experience Structure (v1)

Recommended v1 tour pillars:
- Student life and community
- Academics and learning environment
- Belonging, identity, and support
- Opportunity, ambition, and career direction
- Campus and city context

Implementation notes for v1:
- Use one map scene with 5-8 interaction stops to preserve the 2-5 minute completion target.
- Each stop should map to a real or plausible campus landmark.
- Movement and discovery should be the main mode of progress; prompt interactions should stay short.
- `academic_interest` should be inferred from the full exploration run rather than a separate branch selector.
- Result content should explain the likely academic area, show final `Swoop` growth, and recap key collectibles.

## 6) Data and Result Contracts

Define these objects before implementation to keep gameplay, personalization, and handoff aligned. Field-level definitions live in `docs/spec/DATA-CONTRACTS.md`.

- `MapScene`
  - Defines the playable campus area, bounds, and trigger placements.
- `LocationTrigger`
  - Defines how a landmark interaction starts and what it can award.
- `DialogueEvent`
  - Defines short interaction sequences shown when a trigger is activated.
- `AcademicInterest`
  - Defines the college or field-interest outcome shown at results.
- `SwoopStage`
  - Defines mascot growth states used during and after play.
- `CollectibleItem`
  - Defines item rewards earned through exploration.
- `ResultMapping`
  - Maps `academic_interest + swoop_stage + collected_items` to result content and calls to action.
- `GameSession`
  - Tracks movement progress, triggered stops, rewards, and final results.
- `GameOutputContract`
  - Carries the approved non-PII metadata passed into Slate.

## 7) Slate Handoff Boundary

- The game scope ends at Slate RFI submission.
- Slate is a secondary handoff step, not the organizing principle of the product.
- Required hidden fields at submit:
  - `game_academic_interest`
  - `game_version`
  - `game_session_id`
  - `game_completed_at`
- No `swoop_stage`, collectible, or internal scoring metadata should be sent to Slate in v1.
- Student-entered Slate fields remain `first`, `last`, `email`, `school`, `campus`, `contact_type`, and `birthdate`.
- Field definitions and mapping rules live in `slate/field-dictionary.md`.

## 8) Personalization Rules

- Personalization is limited to in-product result presentation plus the approved Slate handoff payload.
- The game must compute and display `academic_interest`, final `swoop_stage`, and earned items.
- Result content uses predefined mappings keyed by gameplay outcomes rather than open-ended generation.
- Keep result modules concise: headline, fit explanation, `Swoop` recap, collectibles recap, and next-step CTA.
- No CRM routing or downstream communication logic in-game.

## 9) Measurement and QA

- Median completion time is 2-5 minutes on mobile.
- Every completed run outputs `academic_interest` and a final `swoop_stage`.
- Collectible capture is stable and deterministic for completed runs.
- Required hidden handoff fields reach Slate correctly:
  - `game_academic_interest`
  - `game_version`
  - `game_session_id`
  - `game_completed_at`
- No PII appears in query parameters.
- Incomplete sessions fail gracefully and do not break the handoff screen.
- Accessibility baseline passes: keyboard navigation, contrast, reduced motion support, and touch target usability.

## 10) Delivery Phase (Current)

Phase 1 is now in scope.

- **Phase 1: Repo Repurpose and Vertical Slice Setup**
  - Finalize the 2D exploration game scope and contract definitions.
  - Replace survey/profile assumptions with map, trigger, progression, and result contracts.
  - Add repo structure for gameplay code, content data, UI, and assets.
  - Keep Slate integration scoped to the final handoff boundary.

Future phases for richer content, additional maps, polish, and launch execution are deferred.
