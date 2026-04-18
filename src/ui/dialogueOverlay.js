let rootElement = null;

import { hideOverlay, showOverlay } from "./overlayMotion";

function getContinueButton() {
  return rootElement?.querySelector("[data-action='continue']") ?? null;
}

export function mountDialogueOverlay(root) {
  rootElement = root;
}

export function showDialogue({ trigger, eventData, onSelect }) {
  if (!rootElement) {
    return;
  }

  showOverlay(rootElement, `
    <div class="overlay-card overlay-card--enter">
      ${eventData.image
        ? `
          <div class="overlay-card__media">
            <img src="${eventData.image}" alt="${eventData.title}" />
          </div>
        `
        : ""}
      <div class="overlay-card__body">
        <span>${trigger.label}</span>
        <h2>${eventData.title}</h2>
        <p>${eventData.body}</p>
        <div class="choice-grid">
          <button class="choice-button" data-action="continue">
            <strong>keep exploring</strong>
          </button>
        </div>
      </div>
    </div>
  `);

  rootElement.querySelectorAll("[data-action='continue']").forEach((button) => {
    button.addEventListener("click", () => {
      onSelect();
    });
  });
}

export function isDialogueVisible() {
  return Boolean(getContinueButton());
}

export function submitDialogue() {
  const continueButton = getContinueButton();

  if (!continueButton) {
    return false;
  }

  continueButton.click();
  return true;
}

export function hideDialogue() {
  hideOverlay(rootElement);
}
