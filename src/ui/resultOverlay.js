let rootElement = null;

import { hideOverlay, showOverlay } from "./overlayMotion";

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function mountResultOverlay(root) {
  rootElement = root;
}

export function showResults({
  program,
  route,
  routeStops,
  resultMapping,
  stageLabel,
  slateHref,
  routeCompletedCount,
  onContinue,
}) {
  if (!rootElement) {
    return;
  }

  const routeMarkup = routeStops
    .map(
      (stop) => `
        <div class="result-chip">
          <span>${stop.visited ? "Visited" : "Recommended"}</span>
          <strong>${escapeHtml(stop.label)}</strong>
          <p>${escapeHtml(stop.reason)}</p>
        </div>
      `,
    )
    .join("");
  showOverlay(rootElement, `
    <div class="overlay-card overlay-card--enter">
      <div class="overlay-card__body">
        <span>${escapeHtml(resultMapping.kicker)}</span>
        <h2>${escapeHtml(program.label)}</h2>
        <p>${escapeHtml(program.collegeLabel)}</p>
        <div class="result-grid">
          <div class="result-chip">
            <span>Route Progress</span>
            <strong>${routeCompletedCount} of ${routeStops.length}</strong>
            <p>You completed the five-stop campus route built for this selected major.</p>
          </div>
          <div class="result-chip">
            <span>Final Swoop Stage</span>
            <strong>${escapeHtml(stageLabel)}</strong>
            <p>Swoop grew at every recommended stop you completed.</p>
          </div>
          <div class="result-chip">
            <span>Route Family</span>
            <strong>${escapeHtml(route.label)}</strong>
            <p>Your top five places were grouped to match this major’s strongest campus fit.</p>
          </div>
        </div>
        <div class="result-grid result-grid--route">
          ${routeMarkup}
        </div>
        <div class="result-actions">
          <button class="action-button" data-action="slate">
            <strong>${slateHref ? escapeHtml(resultMapping.ctaLabel) : "Preview Slate Payload"}</strong>
            <small>${escapeHtml(resultMapping.ctaDescription)}</small>
          </button>
          <button class="action-button action-button--secondary" data-action="continue">
            <strong>Keep Exploring</strong>
            <small>Close this summary and keep visiting the rest of the map.</small>
          </button>
        </div>
      </div>
    </div>
  `);

  rootElement.querySelector('[data-action="continue"]').addEventListener("click", () => {
    hideResults();
    onContinue?.();
  });

  rootElement.querySelector('[data-action="slate"]').addEventListener("click", () => {
    if (slateHref) {
      hideResults();
      window.location.assign(slateHref);
    }
  });
}

export function hideResults() {
  hideOverlay(rootElement);
}
