import { academicInterests } from "../content/academicInterests";
import { rankAcademicInterests } from "../systems/academicInterest";
import { swoopStages } from "../systems/swoopProgression";

let refs = null;
let totalStops = 0;
let requiredStops = 0;
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
  const completedRequiredStops = Math.min(completedStops, requiredStops);
  const progressPercentage = `${requiredStops === 0 ? 0 : (completedRequiredStops / requiredStops) * 100}%`;
  const stageLabel = getStageLabel(state.session.swoopStage);
  const ranked = rankAcademicInterests(state.session.interestScores);
  const leadingInterest = state.session.academicInterest
    ? academicInterestsLookup[state.session.academicInterest]
    : ranked[0]?.interest ?? academicInterests[0];
  const remainingRequiredStops = Math.max(requiredStops - completedStops, 0);
  const latestCollectibleId = state.session.collectedItemIds.at(-1);
  const latestCollectible = latestCollectibleId ? collectibleLookup[latestCollectibleId] : null;
  const nearbyCopy =
    state.mode === "title"
      ? "Press Start to launch the tour, then use WASD, arrow keys, or the touch pad."
      : state.nearbyTrigger
        ? `You are close to ${state.nearbyTrigger.label}. Press SPACE, ENTER, or tap the action button.`
        : state.session.completedAt
          ? "Tour complete. Review your result or restart for another path."
          : `Keep moving. Any ${requiredStops} landmarks will complete the tour.`;

  refs.hudRoot.innerHTML = `
    <div class="hud-card hud-card--primary">
      <span>Landmarks Required</span>
      <strong>${completedRequiredStops} of ${requiredStops}</strong>
      <p>${remainingRequiredStops === 0 ? `Tour complete. ${totalStops} locations are on the map.` : `${remainingRequiredStops} more landmark${remainingRequiredStops === 1 ? "" : "s"} needed. ${totalStops} total locations are available.`}</p>
      <div class="progress-track"><div class="progress-fill" style="width: ${progressPercentage}"></div></div>
    </div>
    <div class="hud-card">
      <span>Growing</span>
      <strong>${stageLabel}</strong>
      <p>${leadingInterest.label} is the strongest fit so far.</p>
    </div>
  `;

  refs.missionRoot.innerHTML = `
    <span>${state.mode === "title" ? "Before You Start" : "Right Now"}</span>
    <strong>${state.mode === "title" ? "Launch the tour" : state.nearbyTrigger ? `Interact at ${state.nearbyTrigger.label}` : "Head to the next landmark"}</strong>
    <p>${nearbyCopy}</p>
    <div class="intel-list intel-list--compact">
      <div class="intel-item">
        <strong>Move</strong>
        <p>WASD or arrow keys.</p>
      </div>
      <div class="intel-item">
        <strong>Interact</strong>
        <p>SPACE, ENTER, or tap.</p>
      </div>
    </div>
  `;

  refs.collectiblesRoot.innerHTML = `
    <span>Collectibles</span>
    <strong>${state.session.collectedItemIds.length} found</strong>
    <div class="collectible-list collectible-list--compact">
      <div class="collectible-chip">
        <strong>${latestCollectible ? latestCollectible.label : "Nothing unlocked yet"}</strong>
        <p>${latestCollectible ? latestCollectible.unlockCopy : "Discover landmarks to reveal keepsakes during the tour."}</p>
      </div>
    </div>
  `;
}

export function mountHud({
  hudRoot,
  missionRoot,
  collectiblesRoot,
  totalStops: configuredTotalStops,
  requiredStops: configuredRequiredStops,
  academicInterestsById,
  collectibleItemsById,
}) {
  refs = {
    hudRoot,
    missionRoot,
    collectiblesRoot,
  };
  totalStops = configuredTotalStops;
  requiredStops = configuredRequiredStops;
  academicInterestsLookup = academicInterestsById;
  collectibleLookup = collectibleItemsById;
}

export function updateHud(patch) {
  Object.assign(state, patch);
  renderHud();
}
