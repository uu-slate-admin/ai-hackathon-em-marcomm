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
      <div class="overlay-card__body">
        <span>${trigger.label}</span>
        <h2>${eventData.title}</h2>
        <p>${eventData.body}</p>
        <p><strong>${eventData.prompt}</strong></p>
        <div class="choice-grid">
          ${eventData.options
            .map(
              (option) => `
                <button class="choice-button" data-option-id="${option.id}">
                  <strong>${option.label}</strong>
                  <small>${option.description}</small>
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  rootElement.querySelectorAll("[data-option-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedOption = eventData.options.find(
        (option) => option.id === button.dataset.optionId,
      );

      if (selectedOption) {
        onSelect(selectedOption);
      }
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
