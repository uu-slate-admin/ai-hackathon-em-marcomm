import { clearInputState, setInputDirection, triggerAction } from "../systems/inputState";

let rootElement = null;

function bindDirectionalButton(button, direction) {
  const activate = (event) => {
    event.preventDefault();
    setInputDirection(direction, true);
    button.classList.add("is-active");
  };

  const deactivate = (event) => {
    event.preventDefault();
    setInputDirection(direction, false);
    button.classList.remove("is-active");
  };

  button.addEventListener("pointerdown", activate);
  button.addEventListener("pointerup", deactivate);
  button.addEventListener("pointerleave", deactivate);
  button.addEventListener("pointercancel", deactivate);
}

export function mountTouchControls(root) {
  rootElement = root;

  rootElement.innerHTML = `
    <div class="touch-pad">
      <button class="touch-button" data-key="up" aria-label="Move up">▲</button>
      <button class="touch-button" data-key="left" aria-label="Move left">◀</button>
      <button class="touch-button" data-key="right" aria-label="Move right">▶</button>
      <button class="touch-button" data-key="down" aria-label="Move down">▼</button>
    </div>
    <button class="touch-button" data-key="action" aria-label="Interact">Explore</button>
  `;

  rootElement.querySelectorAll("[data-key]").forEach((button) => {
    const { key } = button.dataset;

    if (key === "action") {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        triggerAction();
      });
      return;
    }

    bindDirectionalButton(button, key);
  });

  window.addEventListener("blur", clearInputState);
}
