import { swoopStageAssets } from "../content/media";
import { hideOverlay, showOverlay } from "./overlayMotion";

let rootElement = null;

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function mountProgramSelectorOverlay(root) {
  rootElement = root;
}

export function showProgramSelector({
  colleges,
  programsByCollegeId,
  onConfirm,
}) {
  if (!rootElement) {
    return;
  }

  let selectedCollegeId = colleges[0]?.id ?? null;
  let selectedProgram = null;
  let query = "";
  let step = "intro";

  const getPrograms = () => (selectedCollegeId ? programsByCollegeId[selectedCollegeId] ?? [] : []);
  const getFilteredPrograms = () => {
    const normalizedQuery = query.toLowerCase();

    return getPrograms().filter((program) => {
      const haystack = `${program.label} ${program.degreeLabel}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  };

  const buildProgramListMarkup = (filteredPrograms) =>
    filteredPrograms.length
      ? filteredPrograms
          .map(
            (program) => `
              <button class="selector-program ${selectedProgram?.id === program.id ? "is-active" : ""}" data-program-id="${program.id}">
                <strong>${escapeHtml(program.label)}</strong>
                <small>${escapeHtml(program.collegeLabel)}</small>
              </button>
            `,
          )
          .join("")
      : `<div class="selector-empty">No majors match this filter.</div>`;

  const buildPreviewMarkup = () =>
    selectedProgram
      ? `
        <span>Selection</span>
        <h3>${escapeHtml(selectedProgram.label)}</h3>
        <p>${escapeHtml(selectedProgram.collegeLabel)}</p>
        <button class="action-button" data-role="confirm-program">
          <strong>Start With This Major</strong>
          <small>Use this major as the starting point for the rest of the game.</small>
        </button>
      `
      : `
        <span>Selection</span>
        <h3>Choose a major to continue</h3>
        <p>Select any major from the list to start the game.</p>
      `;

  const renderSelectionUi = () => {
    const filteredPrograms = getFilteredPrograms();
    const searchInput = rootElement.querySelector('[data-role="search"]');
    const programList = rootElement.querySelector(".selector-program-list");
    const preview = rootElement.querySelector(".selector-preview");

    if (searchInput && searchInput.value !== query) {
      searchInput.value = query;
    }

    rootElement.querySelectorAll("[data-college-id]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.collegeId === selectedCollegeId);
    });

    if (programList) {
      programList.innerHTML = buildProgramListMarkup(filteredPrograms);
    }

    if (preview) {
      preview.innerHTML = buildPreviewMarkup();
    }
  };

  const mountSelectionStep = () => {
    showOverlay(rootElement, `
      <div class="overlay-card overlay-card--enter overlay-card--selector">
        <div class="overlay-card__body overlay-card__body--selector">
          <span>Gardner Commons</span>
          <h2>Choose Your Academic Interest</h2>
          <p>
            You know the mission: explore campus, visit key spaces, and help Swoop grow from an egg into later stages. Start by choosing the college category that fits best, then pick the major you want to explore.
          </p>
          <div class="selector-layout">
            <section class="selector-panel">
              <div class="selector-step">
                <strong>1. Pick a college</strong>
                <div class="selector-chip-grid">
                  ${colleges
                    .map(
                      (college) => `
                        <button
                          class="selector-chip ${college.id === selectedCollegeId ? "is-active" : ""}"
                          data-college-id="${college.id}"
                        >
                          ${escapeHtml(college.label)}
                        </button>
                      `,
                    )
                    .join("")}
                </div>
              </div>
              <div class="selector-step">
                <div class="selector-step__header">
                  <strong>2. Pick a major</strong>
                  <input
                    class="selector-search"
                    type="search"
                    placeholder="Filter majors in this college"
                    data-role="search"
                  />
                </div>
                <div class="selector-program-list"></div>
              </div>
            </section>
            <aside class="selector-preview"></aside>
          </div>
        </div>
      </div>
    `, { centered: true });

    rootElement.querySelectorAll("[data-college-id]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.collegeId === selectedCollegeId) {
          return;
        }

        selectedCollegeId = button.dataset.collegeId;
        selectedProgram = null;
        query = "";
        renderSelectionUi();
        rootElement.querySelector(".selector-program-list")?.scrollTo({ top: 0 });
      });
    });

    rootElement.querySelector('[data-role="search"]')?.addEventListener("input", (event) => {
      query = event.currentTarget.value;
      renderSelectionUi();
    });

    rootElement.querySelector(".selector-program-list")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-program-id]");

      if (!button) {
        return;
      }

      const program = getPrograms().find((entry) => entry.id === button.dataset.programId);

      if (program && selectedProgram?.id !== program.id) {
        selectedProgram = program;
        renderSelectionUi();
      }
    });

    rootElement.querySelector(".selector-preview")?.addEventListener("click", (event) => {
      const confirmButton = event.target.closest('[data-role="confirm-program"]');

      if (confirmButton && selectedProgram) {
        onConfirm(selectedProgram);
      }
    });

    renderSelectionUi();
  };

  const render = () => {
    if (step === "intro") {
      showOverlay(rootElement, `
        <div class="overlay-card overlay-card--enter overlay-card--selector overlay-card--intro">
          <div class="overlay-card__body overlay-card__body--selector overlay-card__body--intro">
            <div class="selector-intro">
              <div class="selector-intro__copy">
                <span>How The Game Works</span>
                <h2>Explore Campus And Help Swoop Grow</h2>
                <p>
                  You are about to explore the University of Utah campus by visiting key places and seeing what each area can offer you.
                </p>
                <p>
                  Swoop starts this journey as an egg. As you move through campus and visit new stops, Swoop grows through baby, adolescent, teen, and adult stages.
                </p>
                <div class="selector-intro__highlights">
                  <div class="selector-intro__card">
                    <strong>Explore the map</strong>
                    <p>Visit campus spaces, discover what happens there, and build your route as you go.</p>
                  </div>
                  <div class="selector-intro__card">
                    <strong>Grow Swoop</strong>
                    <p>Your egg evolves into new stages as you keep exploring and completing stops.</p>
                  </div>
                  <div class="selector-intro__card">
                    <strong>Pick your path</strong>
                    <p>After this screen, choose a college and major to unlock your personalized campus journey.</p>
                  </div>
                </div>
                <button class="action-button selector-intro__button" data-role="continue-to-majors">
                  <strong>Choose A Major</strong>
                  <small>Continue to the major selection screen and start the tour.</small>
                </button>
              </div>
              <aside class="selector-intro__visual" aria-hidden="true">
                <div class="selector-intro__egg-frame">
                  <img src="${swoopStageAssets.egg.url}" alt="" />
                </div>
                <p>Swoop begins as an egg and grows with every new campus stop you complete.</p>
              </aside>
            </div>
          </div>
        </div>
      `, { centered: true });

      rootElement.querySelector('[data-role="continue-to-majors"]')?.addEventListener("click", () => {
        step = "select-program";
        render();
      });

      return;
    }

    mountSelectionStep();
  };

  render();
}

export function hideProgramSelector() {
  hideOverlay(rootElement, { centered: true });
}
