import { locationTriggersById } from "../content/locationTriggers";
import { programsById } from "../content/programCatalog";
import { resolveProgramRoute } from "../content/programRoutes";
import {
  getAudioSettings,
  setMusicVolume,
  subscribeAudioSettings,
  toggleMusicMuted,
  toggleSfxMuted,
} from "../systems/audioState";

let refs = null;
let totalStops = 0;
let requiredStops = 0;
let lastHudMarkup = "";
let lastMissionMarkup = "";
let lastStatusMarkup = "";

const state = {
  mode: "title",
  session: null,
  nearbyTrigger: null,
  highlightMovementInfo: false,
};
let audioSettings = getAudioSettings();

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
  const remainingRequiredStops = Math.max(requiredStops - completedRequiredStops, 0);
  const routeStops = getRouteStops(state.session);
  const nextRouteStop = routeStops.find((stop) => !stop.visited) ?? null;
  const routeChecklistMarkup = routeStops.length
    ? `
        <ul class="route-checklist" aria-label="Recommended places checklist">
          ${routeStops
            .map(
              (stop) => `
                <li class="route-checklist__item${stop.visited ? " is-visited" : ""}">
                  <span
                    class="route-checklist__marker${stop.visited ? " route-checklist__marker--visited" : ""}"
                    aria-hidden="true"
                    data-marker="${stop.visited ? "✓" : stop.index + 1}"
                  ></span>
                  <span class="route-checklist__label">${stop.label}</span>
                </li>`,
            )
            .join("")}
        </ul>
      `
    : `
        <p class="route-stop-empty">Your five destinations appear after you pick a major at Gardner Commons.</p>
      `;

  const nearbyCopy =
    state.mode === "title"
      ? "Press Start to launch the tour, then choose a major at Gardner Commons."
      : !program
        ? "Choose a college and major at Gardner Commons to unlock your personalized route."
        : state.nearbyTrigger
          ? `You are close to ${state.nearbyTrigger.label}. Press E, SPACE, ENTER, or tap the action button.`
          : state.session.completedAt
            ? "Route complete. Review your result or restart for another major."
            : nextRouteStop
              ? `Head toward marker ${nextRouteStop.index + 1}: ${nextRouteStop.label}. The green numbered markers show all five route stops.`
              : `Keep moving. Visit all ${requiredStops} recommended places to finish this route.`;

  const hudMarkup = `
    <div class="hud-card hud-card--primary">
      <div class="route-card-layout">
        <div class="route-card-progress">
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
        <div class="route-card-checklist">
          <span>Route Checklist</span>
          ${routeChecklistMarkup}
        </div>
      </div>
    </div>
    <div class="hud-card">
      <span>Audio</span>
      <strong>${audioSettings.musicMuted ? "Music muted" : "Music on"} • ${audioSettings.sfxMuted ? "SFX muted" : "SFX on"}</strong>
      <div class="audio-controls">
        <button
          class="audio-toggle-button${audioSettings.musicMuted ? " is-muted" : " is-active"}"
          type="button"
          data-audio-toggle
        >
          ${audioSettings.musicMuted ? "Music: Off" : "Music: On"}
        </button>
        <button
          class="audio-toggle-button audio-toggle-button--secondary${audioSettings.sfxMuted ? " is-muted" : " is-active"}"
          type="button"
          data-sfx-toggle
        >
          ${audioSettings.sfxMuted ? "SFX: Off" : "SFX: On"}
        </button>
        <label class="audio-slider-group" for="music-volume">
          <span>Music volume</span>
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
    refs.hudRoot.querySelector("[data-sfx-toggle]")?.addEventListener("click", () => {
      toggleSfxMuted();
    });
    refs.hudRoot.querySelector("[data-music-volume]")?.addEventListener("input", (event) => {
      setMusicVolume(Number(event.currentTarget.value) / 100);
    });
    lastHudMarkup = hudMarkup;
  }

  const statusMarkup = `
    <span>Mission Status</span>
    <strong>${
      state.mode === "title"
        ? "Start the tour"
        : !program
          ? "Choose a major at Gardner Commons"
          : state.nearbyTrigger
            ? `Interact at ${state.nearbyTrigger.label}`
            : state.session.completedAt
              ? "Route complete"
              : nextRouteStop
                ? `Next stop: ${nextRouteStop.label}`
                : "Keep exploring campus"
    }</strong>
  `;

  if (refs.statusChip && statusMarkup !== lastStatusMarkup) {
    refs.statusChip.innerHTML = statusMarkup;
    lastStatusMarkup = statusMarkup;
  }

  const missionMarkup = `
    <div class="mission-content${state.highlightMovementInfo ? " mission-content--movement-alert" : ""}">
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
      <div class="intel-list intel-list--compact">
        <div class="intel-item${state.highlightMovementInfo ? " intel-item--alert" : ""}">
          <strong>Move</strong>
          <p>WASD or arrow keys.</p>
        </div>
        <div class="intel-item">
          <strong>Interact</strong>
          <p>E, SPACE, ENTER, or tap.</p>
        </div>
      </div>
    </div>
  `;

  if (missionMarkup !== lastMissionMarkup) {
    refs.missionRoot.innerHTML = missionMarkup;
    lastMissionMarkup = missionMarkup;
  }
}

export function mountHud({
  hudRoot,
  missionRoot,
  statusChip,
  totalStops: configuredTotalStops,
  requiredStops: configuredRequiredStops,
}) {
  refs = {
    hudRoot,
    missionRoot,
    statusChip,
  };
  lastHudMarkup = "";
  lastMissionMarkup = "";
  lastStatusMarkup = "";
  totalStops = configuredTotalStops;
  requiredStops = configuredRequiredStops;
  subscribeAudioSettings((nextAudioSettings) => {
    audioSettings = nextAudioSettings;
    renderHud();
  });
}

export function updateHud(patch) {
  Object.assign(state, patch);
  renderHud();
}
