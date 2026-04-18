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
  routeStops,
  resultMapping,
  slateHref,
  onContinue,
}) {
  if (!rootElement) {
    return;
  }

  const visitedStops = routeStops.filter((stop) => stop.visited);
  const visitedMarkup = visitedStops.length
    ? visitedStops.map((stop) => `<li>${escapeHtml(stop.label)}</li>`).join("")
    : "<li>No route locations visited yet.</li>";
  const confettiMarkup = Array.from({ length: 84 }, (_, index) => {
    const left = (index * 37) % 100;
    const drift = ((index * 29) % 18) - 9;
    const delay = (index % 12) * 0.08;
    const duration = 2.9 + (index % 7) * 0.24;
    const rotation = ((index * 47) % 90) - 45;
    const colors = ["var(--utah-red)", "var(--white)", "var(--obsidian)"];
    const color = colors[index % colors.length];

    return `
      <span
        class="result-confetti-piece"
        style="--confetti-left:${left}%; --confetti-drift:${drift}vw; --confetti-delay:${delay}s; --confetti-duration:${duration}s; --confetti-rotation:${rotation}deg; --confetti-color:${color};"
      ></span>
    `;
  }).join("");

  showOverlay(rootElement, `
    <div class="result-confetti result-confetti--fullscreen" aria-hidden="true">
      ${confettiMarkup}
    </div>
    <div class="overlay-card overlay-card--enter overlay-card--result">
      <div class="overlay-card__body">
        <span>${escapeHtml(resultMapping.kicker)}</span>
        <h2>${escapeHtml(program.label)}</h2>
        <p>${escapeHtml(program.collegeLabel)}</p>
        <div class="result-message">
          <strong>Congratulations</strong>
          <p>You finished your campus route and unlocked your program match. Keep exploring the map or jump to the next step.</p>
        </div>
        <div class="result-list-block">
          <span>Visited Locations</span>
          <strong>${visitedStops.length} of ${routeStops.length} route stops visited</strong>
          <ul class="result-location-list">
            ${visitedMarkup}
          </ul>
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
