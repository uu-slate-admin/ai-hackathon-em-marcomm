import { campusPhotoAssets, swoopStageAssets } from "../content/media";
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
  const allPrograms = Object.values(programsByCollegeId).flat();

  const getPrograms = () => (selectedCollegeId ? programsByCollegeId[selectedCollegeId] ?? [] : []);
  const getFilteredPrograms = () => {
    const normalizedQuery = query.toLowerCase();
    const trimmedQuery = normalizedQuery.trim();

    if (!trimmedQuery) {
      return getPrograms();
    }

    return allPrograms
      .filter((program) => {
        const haystack = `${program.label} ${program.degreeLabel} ${program.collegeLabel}`.toLowerCase();
        return haystack.includes(trimmedQuery);
      })
      .sort((left, right) => {
        const leftLabel = left.label.toLowerCase();
        const rightLabel = right.label.toLowerCase();
        const leftStartsWith = leftLabel.startsWith(trimmedQuery);
        const rightStartsWith = rightLabel.startsWith(trimmedQuery);

        if (leftStartsWith !== rightStartsWith) {
          return leftStartsWith ? -1 : 1;
        }

        const leftIndex = leftLabel.indexOf(trimmedQuery);
        const rightIndex = rightLabel.indexOf(trimmedQuery);

        if (leftIndex !== rightIndex) {
          return leftIndex - rightIndex;
        }

        return left.label.localeCompare(right.label) || left.collegeLabel.localeCompare(right.collegeLabel);
      });
  };

  const buildProgramListMarkup = (filteredPrograms) =>
    filteredPrograms.length
      ? filteredPrograms
          .map(
            (program) => `
              <button class="selector-program ${selectedProgram?.id === program.id ? "is-active" : ""}" data-program-id="${program.id}">
                <span class="selector-program__eyebrow">${escapeHtml(program.degreeLabel)}</span>
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
        <span>Your route starts here</span>
        <h3>${escapeHtml(selectedProgram.label)}</h3>
        <p>${escapeHtml(selectedProgram.collegeLabel)}</p>
        <div class="selector-preview__detail-grid">
          <div class="selector-preview__detail">
            <span>Degree</span>
            <strong>${escapeHtml(selectedProgram.degreeLabel)}</strong>
          </div>
          <div class="selector-preview__detail">
            <span>Next step</span>
            <strong>Start exploring campus</strong>
          </div>
        </div>
        <p class="selector-preview__message">
          Lock in this major to shape your campus tour and begin Swoop's first stage of growth.
        </p>
        <button class="action-button" data-role="confirm-program">
          <strong>Start This Tour</strong>
          <small>Use this major as the focus for your first run across campus.</small>
        </button>
      `
      : `
        <span>Your route starts here</span>
        <h3>Choose a major to unlock your route</h3>
        <p>Pick a college, browse majors, and select one program to begin the tour.</p>
        <div class="selector-preview__detail-grid">
          <div class="selector-preview__detail">
            <span>Step 1</span>
            <strong>Choose a college</strong>
          </div>
          <div class="selector-preview__detail">
            <span>Step 2</span>
            <strong>Select a major</strong>
          </div>
        </div>
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
            Start with the academic area that fits you best, then choose a major to personalize the rest of the campus experience.
          </p>
          <div class="selector-layout">
            <section class="selector-panel">
              <div class="selector-step">
                <div class="selector-step__header selector-step__header--tight">
                  <span>Step 1</span>
                  <strong>Pick a college</strong>
                  <p>Use a broad area first to narrow the major list.</p>
                </div>
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
                  <span>Step 2</span>
                  <strong>Pick a major</strong>
                  <p>Search across all majors or choose from the filtered list below.</p>
                  <input
                    class="selector-search"
                    type="search"
                    placeholder="Search all majors"
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

      const program = allPrograms.find((entry) => entry.id === button.dataset.programId);

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
                <div class="selector-intro__photo-frame">
                  <img src="${campusPhotoAssets.gardnerCommons.url}" alt="${campusPhotoAssets.gardnerCommons.label}" />
                </div>
                <span>${campusPhotoAssets.gardnerCommons.label}</span>
                <h2>Build Your Route Across Campus</h2>
                <p>
                  Start at Gardner Commons, choose the academic path that fits you, and move through real campus spaces to see what the University of Utah can open up for you.
                </p>
                <p>
                  Every stop helps Swoop grow from egg to adult, so your progress on the map becomes a visible part of the experience.
                </p>
                <p class="selector-intro__lead">
                  <strong>Choose a major, then begin the tour.</strong>
                  Your selection sets the theme for the route and gets Swoop moving.
                </p>
                <button class="action-button selector-intro__button" data-role="continue-to-majors">
                  <strong>Choose Your Major</strong>
                  <small>Open the academic selector and start your campus journey.</small>
                </button>
              </div>
              <aside class="selector-intro__supporting" aria-label="How the experience works">
                <div class="selector-intro__supporting-panel selector-intro__supporting-panel--swoop">
                  <span>Swoop progression</span>
                  <div class="selector-intro__swoop-stage">
                    <div class="selector-intro__egg-frame">
                      <img src="${swoopStageAssets.egg.url}" alt="Swoop in egg form" />
                    </div>
                    <div class="selector-intro__swoop-copy">
                      <strong>Start small, grow as you explore</strong>
                      <p>Each new stop moves Swoop into the next stage, giving the tour a clear sense of progress.</p>
                    </div>
                  </div>
                </div>
                <div class="selector-intro__supporting-panel">
                  <span>How it works</span>
                  <div class="selector-intro__highlights">
                    <div class="selector-intro__item">
                      <strong>Choose a path</strong>
                      <p>Select a college and major to frame the experience around your interests.</p>
                    </div>
                    <div class="selector-intro__item">
                      <strong>Visit real places</strong>
                      <p>Move through key campus spaces to see where learning, support, and student life connect.</p>
                    </div>
                    <div class="selector-intro__item">
                      <strong>Watch Swoop evolve</strong>
                      <p>Keep exploring to push Swoop from egg to adult and finish the route stronger than you started.</p>
                    </div>
                  </div>
                </div>
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
