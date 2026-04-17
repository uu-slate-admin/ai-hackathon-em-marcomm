let rootElement = null;

export function mountResultOverlay(root) {
  rootElement = root;
}

export function showResults({
  interest,
  resultMapping,
  stageLabel,
  collectedItems,
  payload,
  slateHref,
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
          <strong>${item.label}</strong>
          <p>${item.unlockCopy}</p>
        </div>
      `,
    )
    .join("");

  rootElement.innerHTML = `
    <div class="overlay-card">
      <div class="overlay-card__body">
        <span>${resultMapping.kicker}</span>
        <h2>${interest.headline}</h2>
        <p>${interest.summary}</p>
        <div class="result-grid">
          <div class="result-chip">
            <span>Final Swoop Stage</span>
            <strong>${stageLabel}</strong>
            <p>Swoop grew with every campus moment you completed.</p>
          </div>
          <div class="result-chip">
            <span>Next Step</span>
            <strong>${interest.label}</strong>
            <p>${interest.nextStep}</p>
          </div>
          ${itemsMarkup}
        </div>
        <pre class="payload-preview">${JSON.stringify(payload, null, 2)}</pre>
        <div class="result-actions">
          <button class="action-button" data-action="slate">
            <strong>${slateHref ? resultMapping.ctaLabel : "Preview Slate Payload"}</strong>
            <small>${resultMapping.ctaDescription}</small>
          </button>
          <button class="action-button action-button--accent" data-action="copy">
            <strong>Copy Payload</strong>
            <small>Copy the handoff metadata for QA or integration testing.</small>
          </button>
          <button class="action-button action-button--secondary" data-action="restart">
            <strong>Play Again</strong>
            <small>Reset the session and guide Swoop through another tour.</small>
          </button>
        </div>
      </div>
    </div>
  `;

  rootElement.querySelector('[data-action="restart"]').addEventListener("click", () => {
    hideResults();
    onRestart();
  });

  rootElement.querySelector('[data-action="copy"]').addEventListener("click", async () => {
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
  });

  rootElement.querySelector('[data-action="slate"]').addEventListener("click", () => {
    if (slateHref) {
      window.open(slateHref, "_blank", "noopener,noreferrer");
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
