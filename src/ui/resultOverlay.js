let rootElement = null;

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
  collectedItems,
  payload,
  slateHref,
  routeCompletedCount,
  onContinue,
  onRestart,
}) {
  if (!rootElement) {
    return;
  }

  rootElement.classList.add("is-active");

  const itemsMarkup = collectedItems
    .map(
      (item) => `
        <div class="result-chip">
          <span>Collectible</span>
          <strong>${escapeHtml(item.label)}</strong>
          <p>${escapeHtml(item.unlockCopy)}</p>
        </div>
      `,
    )
    .join("");
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
  const payloadJson = JSON.stringify(payload, null, 2);
  const payloadMarkup = escapeHtml(payloadJson);

  rootElement.innerHTML = `
    <div class="overlay-card">
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
          ${itemsMarkup}
        </div>
        <div class="result-grid result-grid--route">
          ${routeMarkup}
        </div>
        <details class="payload-disclosure">
          <summary>Show QA payload</summary>
          <pre class="payload-preview">${payloadMarkup}</pre>
        </details>
        <div class="result-actions">
          <button class="action-button" data-action="slate">
            <strong>${slateHref ? escapeHtml(resultMapping.ctaLabel) : "Preview Slate Payload"}</strong>
            <small>${escapeHtml(resultMapping.ctaDescription)}</small>
          </button>
          <button class="action-button action-button--secondary" data-action="continue">
            <strong>Keep Exploring</strong>
            <small>Close this summary and keep visiting the rest of the map.</small>
          </button>
          <button class="action-button action-button--accent" data-action="copy">
            <strong>Copy Payload</strong>
            <small>Copy the handoff metadata for QA or integration testing.</small>
          </button>
          <button class="action-button action-button--secondary" data-action="restart">
            <strong>Play Again</strong>
            <small>Reset the session and choose another major.</small>
          </button>
        </div>
      </div>
    </div>
  `;

  rootElement.querySelector('[data-action="restart"]').addEventListener("click", () => {
    hideResults();
    onRestart();
  });

  rootElement.querySelector('[data-action="continue"]').addEventListener("click", () => {
    hideResults();
    onContinue?.();
  });

  rootElement.querySelector('[data-action="copy"]').addEventListener("click", async () => {
    await navigator.clipboard.writeText(payloadJson);
  });

  rootElement.querySelector('[data-action="slate"]').addEventListener("click", () => {
    if (slateHref) {
      hideResults();
      window.location.assign(slateHref);
    }
  });
}

export function hideResults() {
  if (!rootElement) {
    return;
  }

  rootElement.classList.remove("is-active");
  rootElement.innerHTML = "";
}
