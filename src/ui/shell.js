export function createShell(root) {
  root.innerHTML = `
    <div class="app-shell">
      <header class="chrome-bar">
        <div class="brand-lockup">
          <p class="eyebrow">University of Utah • Geared to Rise</p>
          <h1>Explore With Swoop</h1>
          <p>Walk the campus and discover your best-fit path.</p>
        </div>
        <div class="status-chip" id="status-chip">
          <span>Mission Status</span>
          <strong>Launch the tour and reach any five landmarks.</strong>
        </div>
      </header>
      <main class="play-layout">
        <section class="game-stage">
          <div class="frame-stack">
            <div class="game-root" id="game-root"></div>
            <div class="overlay-layer" id="dialogue-layer"></div>
            <div class="overlay-layer is-centered" id="result-layer"></div>
          </div>
          <div class="touch-controls" id="touch-controls"></div>
        </section>
        <aside class="intel-stack">
          <div class="intel-card" id="mission-root"></div>
          <div class="intel-card" id="collectibles-root"></div>
          <div class="hud-root" id="hud-root"></div>
        </aside>
      </main>
    </div>
  `;

  return {
    gameRoot: root.querySelector("#game-root"),
    hudRoot: root.querySelector("#hud-root"),
    dialogueLayer: root.querySelector("#dialogue-layer"),
    resultLayer: root.querySelector("#result-layer"),
    missionRoot: root.querySelector("#mission-root"),
    collectiblesRoot: root.querySelector("#collectibles-root"),
    touchControlsRoot: root.querySelector("#touch-controls"),
    statusChip: root.querySelector("#status-chip"),
  };
}
