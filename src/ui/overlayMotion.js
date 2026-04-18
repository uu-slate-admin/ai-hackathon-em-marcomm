function getOverlayStateClassNames({ centered = false } = {}) {
  return ["is-active", centered ? "is-centered" : null].filter(Boolean);
}

export function showOverlay(root, markup, options = {}) {
  if (!root) {
    return;
  }

  root.classList.add(...getOverlayStateClassNames(options));
  root.innerHTML = markup;
}

export function hideOverlay(root, options = {}) {
  if (!root) {
    return;
  }

  root.classList.remove(...getOverlayStateClassNames(options));
  root.innerHTML = "";
}
