import { swoopStageAssets } from "../content/media";

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

  const render = () => {
    if (step === "intro") {
      rootElement.classList.add("is-active", "is-centered");
      rootElement.innerHTML = `
        <div class="overlay-card overlay-card--selector overlay-card--intro">
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
      `;

      rootElement.querySelector('[data-role="continue-to-majors"]')?.addEventListener("click", () => {
        step = "select-program";
        render();
      });

      return;
    }

    const programs = selectedCollegeId ? programsByCollegeId[selectedCollegeId] ?? [] : [];
    const filteredPrograms = programs.filter((program) => {
      const haystack = `${program.label} ${program.degreeLabel}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
    rootElement.classList.add("is-active", "is-centered");
    rootElement.innerHTML = `
      <div class="overlay-card overlay-card--selector">
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
                    value="${escapeHtml(query)}"
                    placeholder="Filter majors in this college"
                    data-role="search"
                  />
                </div>
                <div class="selector-program-list">
                  ${filteredPrograms.length
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
                    : `<div class="selector-empty">No majors match this filter.</div>`}
                </div>
              </div>
            </section>
            <aside class="selector-preview">
              <span>Selection</span>
              ${
                selectedProgram
                  ? `
                    <h3>${escapeHtml(selectedProgram.label)}</h3>
                    <p>${escapeHtml(selectedProgram.collegeLabel)}</p>
                    <button class="action-button" data-role="confirm-program">
                      <strong>Start With This Major</strong>
                      <small>Use this major as the starting point for the rest of the game.</small>
                    </button>
                  `
                  : `
                    <h3>Choose a major to continue</h3>
                    <p>Select any major from the list to start the game.</p>
                  `
              }
            </aside>
          </div>
        </div>
      </div>
    `;

    rootElement.querySelectorAll("[data-college-id]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedCollegeId = button.dataset.collegeId;
        selectedProgram = null;
        query = "";
        render();
      });
    });

    rootElement.querySelectorAll("[data-program-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const program = programs.find((entry) => entry.id === button.dataset.programId);

        if (program) {
          selectedProgram = program;
          render();
        }
      });
    });

    rootElement.querySelector('[data-role="search"]')?.addEventListener("input", (event) => {
      query = event.currentTarget.value;
      render();
    });

    rootElement.querySelector('[data-role="confirm-program"]')?.addEventListener("click", () => {
      if (selectedProgram) {
        onConfirm(selectedProgram);
      }
    });
  };

  render();
}

export function hideProgramSelector() {
  if (!rootElement) {
    return;
  }

  rootElement.classList.remove("is-active", "is-centered");
  rootElement.innerHTML = "";
}
