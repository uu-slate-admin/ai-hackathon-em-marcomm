import { academicInterests } from "../content/academicInterests";
import { rankAcademicInterests } from "../systems/academicInterest";
import { swoopStages } from "../systems/swoopProgression";

let refs = null;
let totalStops = 0;
let academicInterestsLookup = {};
let collectibleLookup = {};

const state = {
  mode: "title",
  session: null,
  nearbyTrigger: null,
};

function getStageLabel(stageId) {
  return swoopStages.find((stage) => stage.id === stageId)?.label ?? "Egg";
}

function renderHud() {
  if (!refs || !state.session) {
    return;
  }

  const completedStops = state.session.visitedTriggerIds.length;
  const progressPercentage = `${(completedStops / totalStops) * 100}%`;
  const stageLabel = getStageLabel(state.session.swoopStage);
  const ranked = rankAcademicInterests(state.session.interestScores);
  const leadingInterest = state.session.academicInterest
    ? academicInterestsLookup[state.session.academicInterest]
    : ranked[0]?.interest ?? academicInterests[0];
  const nearbyCopy =
    state.mode === "title"
      ? "Press Start to launch the tour, then use WASD, arrow keys, or the touch pad."
      : state.nearbyTrigger
        ? `You are close to ${state.nearbyTrigger.label}. Press SPACE, ENTER, or tap the red action button to interact.`
        : state.session.completedAt
          ? "Run complete. Review your result, then continue when you are ready."
          : "Keep following the path to the next landmark and guide Swoop forward.";

  refs.hudRoot.innerHTML = `
    <div class="hud-card">
      <span>Swoop Stage</span>
      <strong>${stageLabel}</strong>
      <p>${state.session.growthPoints} growth points earned through exploration.</p>
    </div>
    <div class="hud-card">
      <span>Campus Progress</span>
      <strong>${completedStops} / ${totalStops} Landmarks</strong>
      <div class="progress-track"><div class="progress-fill" style="width: ${progressPercentage}"></div></div>
    </div>
    <div class="hud-card">
      <span>Leading Path</span>
      <strong>${leadingInterest.label}</strong>
      <p>${leadingInterest.summary}</p>
    </div>
  `;

  refs.missionRoot.innerHTML = `
    <span>Field Notes</span>
    <strong>${state.mode === "title" ? "Ready To Launch" : "Next Objective"}</strong>
    <p>${nearbyCopy}</p>
    <div class="intel-list">
      <div class="intel-item">
        <strong>Controls</strong>
        <p>Move with WASD or arrow keys. Interact with SPACE or ENTER.</p>
      </div>
      <div class="intel-item">
        <strong>Goal</strong>
        <p>Reach all five landmarks to unlock your final result.</p>
      </div>
    </div>
  `;

  const collected = state.session.collectedItemIds.length
    ? state.session.collectedItemIds
        .map((itemId) => collectibleLookup[itemId])
        .filter(Boolean)
        .map(
          (item) => `
            <div class="collectible-chip">
              <strong>${item.label}</strong>
              <p>${item.unlockCopy}</p>
            </div>
          `,
        )
        .join("")
    : `
      <div class="collectible-chip">
        <strong>No Collectibles Yet</strong>
        <p>Landmark discoveries will appear here as you guide Swoop across campus.</p>
      </div>
    `;

  refs.collectiblesRoot.innerHTML = `
    <span>Collected Items</span>
    <strong>${state.session.collectedItemIds.length} Keepsakes Found</strong>
    <div class="collectible-list">${collected}</div>
  `;
}

export function mountHud({
  hudRoot,
  missionRoot,
  collectiblesRoot,
  totalStops: configuredTotalStops,
  academicInterestsById,
  collectibleItemsById,
}) {
  refs = {
    hudRoot,
    missionRoot,
    collectiblesRoot,
  };
  totalStops = configuredTotalStops;
  academicInterestsLookup = academicInterestsById;
  collectibleLookup = collectibleItemsById;
}

export function updateHud(patch) {
  Object.assign(state, patch);
  renderHud();
}
