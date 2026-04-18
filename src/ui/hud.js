import { locationTriggersById } from "../content/locationTriggers";
import { programsById } from "../content/programCatalog";
import { resolveProgramRoute } from "../content/programRoutes";
import {
  getAudioSettings,
  setMusicVolume,
  subscribeAudioSettings,
  toggleMusicMuted,
} from "../systems/audioState";
import { swoopStages } from "../systems/swoopProgression";

let refs = null;
let totalStops = 0;
let requiredStops = 0;
let collectibleLookup = {};
let lastHudMarkup = "";
let lastMissionMarkup = "";
let lastCollectiblesMarkup = "";

const state = {
  mode: "title",
  session: null,
  nearbyTrigger: null,
};
let audioSettings = getAudioSettings();

function getStageLabel(stageId) {
  return swoopStages.find((stage) => stage.id === stageId)?.label ?? "Egg";
}

function getRouteStops(session) {
  const program = session?.selectedProgramId ? programsById[session.selectedProgramId] : null;

  if (!program) {
    return [];
  }

  return resolveProgramRoute(program).stops.map((stop, index) => ({
    ...stop,
    index,
    label: locationTriggersById[stop.triggerId]?.label ?? stop.triggerId,
    visited: session.completedRouteTriggerIds.includes(stop.triggerId),
  }));
}

function renderHud() {
  if (!refs || !state.session) {
    return;
  }

  const program = state.session.selectedProgramId ? programsById[state.session.selectedProgramId] : null;
  const completedRequiredStops = state.session.completedRouteTriggerIds.length;
  const progressPercentage = `${requiredStops === 0 ? 0 : (completedRequiredStops / requiredStops) * 100}%`;
  const stageLabel = getStageLabel(state.session.swoopStage);
  const remainingRequiredStops = Math.max(requiredStops - completedRequiredStops, 0);
  const latestCollectibleId = state.session.collectedItemIds.at(-1);
  const latestCollectible = latestCollectibleId ? collectibleLookup[latestCollectibleId] : null;
  const routeStops = getRouteStops(state.session);
  const nextRouteStop = routeStops.find((stop) => !stop.visited) ?? null;
  const routeListMarkup = routeStops.length
    ? routeStops
        .map(
          (stop) => `
            <div class="route-stop-chip${stop.visited ? " is-visited" : nextRouteStop?.triggerId === stop.triggerId ? " is-next" : ""}">
              <strong>${stop.index + 1}. ${stop.label}</strong>
              <p>${stop.visited ? "Visited. Swoop already grew here." : nextRouteStop?.triggerId === stop.triggerId ? "Next recommended stop." : "Still ahead on your route."}</p>
            </div>
          `,
        )
        .join("")
    : `
        <div class="route-stop-chip">
          <strong>Route locked</strong>
          <p>Your five destinations appear after you pick a major at Gardner Commons.</p>
        </div>
      `;

  const nearbyCopy =
    state.mode === "title"
      ? "Press Start to launch the tour, then choose a major at Gardner Commons."
      : !program
        ? "Choose a college and major at Gardner Commons to unlock your personalized route."
        : state.nearbyTrigger
          ? `You are close to ${state.nearbyTrigger.label}. Press SPACE, ENTER, or tap the action button.`
          : state.session.completedAt
            ? "Route complete. Review your result or restart for another major."
            : nextRouteStop
              ? `Head toward marker ${nextRouteStop.index + 1}: ${nextRouteStop.label}. The green numbered markers show all five route stops.`
              : `Keep moving. Visit all ${requiredStops} recommended places to finish this route.`;

  const hudMarkup = `
    <div class="hud-card hud-card--primary">
      <span>Recommended Places</span>
      <strong>${completedRequiredStops} of ${requiredStops}</strong>
      <p>
        ${
          program
            ? remainingRequiredStops === 0
              ? `You completed the ${program.label} route. ${totalStops} total locations are still available.`
              : `${remainingRequiredStops} recommended stop${remainingRequiredStops === 1 ? "" : "s"} left for ${program.label}.`
            : "Your five-stop campus route will appear after you pick a major."
        }
      </p>
      <div class="progress-track"><div class="progress-fill" style="width: ${progressPercentage}"></div></div>
    </div>
    <div class="hud-card">
      <span>Swoop</span>
      <strong>${stageLabel}</strong>
      <p>${program ? `${program.label} • ${program.collegeLabel}` : "Still waiting for a starting major."}</p>
    </div>
    <div class="hud-card">
      <span>Audio</span>
      <strong>${audioSettings.musicMuted ? "Music muted" : "Music on"}</strong>
      <div class="audio-controls">
        <button class="audio-toggle-button" type="button" data-audio-toggle>
          ${audioSettings.musicMuted ? "Unmute music" : "Mute music"}
        </button>
        <label class="audio-slider-group" for="music-volume">
          <span>Volume</span>
          <input
            id="music-volume"
            type="range"
            min="0"
            max="100"
            step="1"
            value="${Math.round(audioSettings.musicVolume * 100)}"
            data-music-volume
          />
        </label>
      </div>
    </div>
  `;

  if (hudMarkup !== lastHudMarkup) {
    refs.hudRoot.innerHTML = hudMarkup;
    refs.hudRoot.querySelector("[data-audio-toggle]")?.addEventListener("click", () => {
      toggleMusicMuted();
    });
    refs.hudRoot.querySelector("[data-music-volume]")?.addEventListener("input", (event) => {
      setMusicVolume(Number(event.currentTarget.value) / 100);
    });
    lastHudMarkup = hudMarkup;
  }

  const missionMarkup = `
    <span>${state.mode === "title" ? "Before You Start" : "Right Now"}</span>
    <strong>${
      !program
        ? "Choose a major at Gardner Commons"
        : state.nearbyTrigger
          ? `Interact at ${state.nearbyTrigger.label}`
          : nextRouteStop
            ? `Head to ${nextRouteStop.label}`
            : "Head to the next recommended stop"
    }</strong>
    <p>${nearbyCopy}</p>
    <div class="route-stop-list">
      ${routeListMarkup}
    </div>
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

  if (missionMarkup !== lastMissionMarkup) {
    refs.missionRoot.innerHTML = missionMarkup;
    lastMissionMarkup = missionMarkup;
  }

  const collectiblesMarkup = `
    <span>Collectibles</span>
    <strong>${state.session.collectedItemIds.length} found</strong>
    <div class="collectible-list collectible-list--compact">
      <div class="collectible-chip">
        <strong>${latestCollectible ? latestCollectible.label : "Nothing unlocked yet"}</strong>
        <p>${latestCollectible ? latestCollectible.unlockCopy : "Discover landmarks to reveal keepsakes during the tour."}</p>
      </div>
    </div>
  `;

  if (collectiblesMarkup !== lastCollectiblesMarkup) {
    refs.collectiblesRoot.innerHTML = collectiblesMarkup;
    lastCollectiblesMarkup = collectiblesMarkup;
  }
}

export function mountHud({
  hudRoot,
  missionRoot,
  collectiblesRoot,
  totalStops: configuredTotalStops,
  requiredStops: configuredRequiredStops,
  collectibleItemsById,
}) {
  refs = {
    hudRoot,
    missionRoot,
    collectiblesRoot,
  };
  lastHudMarkup = "";
  lastMissionMarkup = "";
  lastCollectiblesMarkup = "";
  totalStops = configuredTotalStops;
  requiredStops = configuredRequiredStops;
  collectibleLookup = collectibleItemsById;
  subscribeAudioSettings((nextAudioSettings) => {
    audioSettings = nextAudioSettings;
    renderHud();
  });
}

export function updateHud(patch) {
  Object.assign(state, patch);
  renderHud();
}
