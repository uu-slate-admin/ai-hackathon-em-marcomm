let rootElement = null;

export function mountDialogueOverlay(root) {
  rootElement = root;
}

export function showDialogue({ trigger, eventData, onSelect }) {
  if (!rootElement) {
    return;
  }

  rootElement.classList.add("is-active");
  rootElement.innerHTML = `
    <div class="overlay-card">
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
  `;

  rootElement.querySelectorAll("[data-action='continue']").forEach((button) => {
    button.addEventListener("click", () => {
      onSelect();
    });
  });
}

export function hideDialogue() {
  if (!rootElement) {
    return;
  }

  rootElement.classList.remove("is-active");
  rootElement.innerHTML = "";
}
