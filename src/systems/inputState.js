const state = {
  up: false,
  down: false,
  left: false,
  right: false,
};

let actionHandler = null;

export function getInputState() {
  return state;
}

export function setInputDirection(direction, isActive) {
  state[direction] = isActive;
}

export function clearInputState() {
  Object.keys(state).forEach((direction) => {
    state[direction] = false;
  });
}

export function setActionHandler(handler) {
  actionHandler = handler;
}

export function triggerAction() {
  actionHandler?.();
}
