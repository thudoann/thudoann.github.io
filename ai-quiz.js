/* ---------- AI Quiz ---------- */
(function () {

  function initAiQuiz(panel) {
    const mainEl = panel.querySelector("[data-role='aiquiz-main']");
    if (!mainEl || mainEl.dataset.initialized) return;
    mainEl.dataset.initialized = "1";

    const fr = typeof isFr !== "undefined" && isFr;
    const BEST_KEY = "aiquiz_best_v1";
    const PER_ROUND = 10;

    const CATS = [
      { id: "all",    label: fr ? "Tout"          : "All",          icon: "🧠" },
      { id: "ml",     label: fr ? "ML Classique"  : "ML Basics",    icon: "📐" },
      { id: "dl",     label: fr ? "Deep Learning" : "Deep Learning", icon: "🔬" },
      { id: "nlp",    label: fr ? "NLP"           : "NLP",          icon: "💬" },
      { id: "ethics", label: fr ? "Éthique IA"    : "AI Ethics",    icon: "⚖️" },
      { id: "tools",  label: fr ? "Outils"        : "Tools",        icon: "🛠️" },
    ];

    let questions = [], idx = 0, score = 0, answered = false, curCat = "all";

    /* ---- Persistence ---- */
    function loadBests() {
      try { return JSON.parse(localStorage.getItem(BEST_KEY)) || {}; } catch (_) { return {}; }
    }
    function saveBest(cat, sc) {
      const b = loadBests();
      if (b[cat] === undefined || sc > b[cat]) {
        b[cat] = sc; localStorage.setItem(BEST_KEY, JSON.stringify(b)); return true;
      }
      return false;
    }

    /* ---- Data helpers ---- */
    function getPool(cat) {
      const data = window.AI_QUIZ_DATA;
      if (!data) return [];
      return cat === "all" ? [...data] : data.filter(q => q.category === cat);
    }
    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    /* ---- Screens ---- */

    function renderHome() {
      const bests = loadBests();
      mainEl.innerHTML = `
        <p class="aiquiz-subtitle muted">${fr
          ? "Testez vos connaissances en IA &amp; ML"
          : "Test your AI &amp; ML knowledge — pick a category to start"}</p>
        <div class="aiquiz-cats">
          ${CATS.map(c => {
            const pool = getPool(c.id);
            const best = bests[c.id];
            const total = Math.min(PER_ROUND, pool.length);
            return `<button type="button" class="aiquiz-cat-btn" data-cat="${c.id}">
              <span class="aiquiz-cat-icon">${c.icon}</span>
              <span class="aiquiz-cat-label">${c.label}</span>
              <span class="aiquiz-cat-count muted">${pool.length} ${fr ? "questions" : "questions"}</span>
              ${best !== undefined
                ? `<span class="aiquiz-cat-best">${fr ? "Meilleur" : "Best"} ${best}/${total}</span>`
                : ""}
            </button>`;
          }).join("")}
        </div>
      `;
      mainEl.querySelectorAll(".aiquiz-cat-btn").forEach(btn => {
        btn.addEventListener("click", () => startQuiz(btn.dataset.cat));
      });
    }

    function startQuiz(cat) {
      curCat = cat;
      const pool = getPool(cat);
      questions = shuffle(pool).slice(0, PER_ROUND);
      idx = 0; score = 0;
      renderQuestion();
    }

    function renderQuestion() {
      answered = false;
      const q = questions[idx];
      const pct = Math.round((idx / questions.length) * 100);
      const OPT_LABELS = ["A", "B", "C", "D"];

      mainEl.innerHTML = `
        <div class="aiquiz-progress-row">
          <span class="aiquiz-counter muted">${fr ? "Question" : "Question"} ${idx + 1} / ${questions.length}</span>
          <div class="aiquiz-progress-bar"><div class="aiquiz-progress-fill" style="width:${pct}%"></div></div>
        </div>
        <div class="aiquiz-question-card">
          <p class="aiquiz-question">${q.q}</p>
          <div class="aiquiz-options">
            ${q.opts.map((opt, i) => `
              <button type="button" class="aiquiz-opt-btn" data-i="${i}">
                <span class="aiquiz-opt-label">${OPT_LABELS[i]}</span>
                <span class="aiquiz-opt-text">${opt}</span>
              </button>`).join("")}
          </div>
          <div class="aiquiz-explanation" data-role="aiquiz-exp"></div>
        </div>
        <button type="button" class="aiquiz-next-btn" data-role="aiquiz-next" hidden>
          ${idx + 1 < questions.length
            ? (fr ? "Suivant →" : "Next →")
            : (fr ? "Voir les résultats →" : "See results →")}
        </button>
      `;

      mainEl.querySelectorAll(".aiquiz-opt-btn").forEach(btn => {
        btn.addEventListener("click", () => pick(parseInt(btn.dataset.i)));
      });
      mainEl.querySelector("[data-role='aiquiz-next']").addEventListener("click", advance);
    }

    function pick(chosen) {
      if (answered) return;
      answered = true;
      const q = questions[idx];
      const correct = q.ans;
      if (chosen === correct) score++;

      mainEl.querySelectorAll(".aiquiz-opt-btn").forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) btn.classList.add("aiquiz-opt-correct");
        else if (i === chosen) btn.classList.add("aiquiz-opt-wrong");
      });

      const expEl = mainEl.querySelector("[data-role='aiquiz-exp']");
      if (expEl) {
        const ok = chosen === correct;
        expEl.innerHTML = `<span class="aiquiz-exp-icon">${ok ? "✓" : "✗"}</span> ${q.exp}`;
        expEl.classList.add("visible", ok ? "aiquiz-exp-ok" : "aiquiz-exp-bad");
      }

      const nextBtn = mainEl.querySelector("[data-role='aiquiz-next']");
      if (nextBtn) nextBtn.hidden = false;
    }

    function advance() {
      idx++;
      if (idx < questions.length) renderQuestion();
      else renderResults();
    }

    function renderResults() {
      const isRecord = saveBest(curCat, score);
      const bests = loadBests();
      const pct = Math.round((score / questions.length) * 100);
      const total = questions.length;

      let msg;
      if (pct >= 90)      msg = fr ? "Excellent ! 🏆 Tu maîtrises le sujet !" : "Excellent! 🏆 You really know your stuff!";
      else if (pct >= 70) msg = fr ? "Très bien ! Continue comme ça. 💪"       : "Great work! Keep it up. 💪";
      else if (pct >= 50) msg = fr ? "Pas mal ! Il y a encore des choses à explorer." : "Not bad! There's still more to discover.";
      else                msg = fr ? "Continue à apprendre — tu y arriveras ! 📚" : "Keep studying — you'll get there! 📚";

      const catsWithBests = CATS.filter(c => bests[c.id] !== undefined);

      mainEl.innerHTML = `
        <div class="aiquiz-results">
          <div class="aiquiz-score-circle">
            <span class="aiquiz-score-big">${score}</span>
            <span class="aiquiz-score-denom">/ ${total}</span>
          </div>
          <p class="aiquiz-result-msg">${msg}</p>
          ${isRecord ? `<p class="aiquiz-new-record">🏆 ${fr ? "Nouveau record !" : "New record!"}</p>` : ""}
          ${catsWithBests.length ? `
            <div class="aiquiz-result-bests">
              <span class="aiquiz-bests-label">${fr ? "Vos meilleurs scores" : "Your best scores"}</span>
              ${catsWithBests.map(c => {
                const poolTotal = Math.min(PER_ROUND, getPool(c.id).length);
                return `<span class="aiquiz-best-row${c.id === curCat ? " current" : ""}">
                  <span>${c.icon} ${c.label}</span>
                  <span class="aiquiz-best-val">${bests[c.id]}/${poolTotal}</span>
                </span>`;
              }).join("")}
            </div>` : ""}
          <div class="aiquiz-result-btns">
            <button type="button" class="aiquiz-play-again">${fr ? "Rejouer" : "Play again"}</button>
            <button type="button" class="aiquiz-change-cat">${fr ? "Changer de catégorie" : "Change category"}</button>
          </div>
        </div>
      `;
      mainEl.querySelector(".aiquiz-play-again").addEventListener("click", () => startQuiz(curCat));
      mainEl.querySelector(".aiquiz-change-cat").addEventListener("click", renderHome);
    }

    renderHome();
  }

  window.initAiQuiz = initAiQuiz;
})();
