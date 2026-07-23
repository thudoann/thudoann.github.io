/* ---------- AI Quiz ---------- */
(function () {

  const GLOSSARY_SECTIONS = [
    { heading: "Fields", items: [
      { a: "AI",    d: "Artificial Intelligence" },
      { a: "ML",    d: "Machine Learning" },
      { a: "DL",    d: "Deep Learning" },
      { a: "NLP",   d: "Natural Language Processing" },
      { a: "CV",    d: "Computer Vision" },
      { a: "RL",    d: "Reinforcement Learning" },
      { a: "XAI",   d: "Explainable AI" },
    ]},
    { heading: "Models & architectures", items: [
      { a: "LLM",   d: "Large Language Model" },
      { a: "SLM",   d: "Small Language Model" },
      { a: "VLM",   d: "Vision-Language Model" },
      { a: "GPT",   d: "Generative Pre-trained Transformer" },
      { a: "BERT",  d: "Bidirectional Encoder Representations from Transformers" },
      { a: "CNN",   d: "Convolutional Neural Network" },
      { a: "RNN",   d: "Recurrent Neural Network" },
      { a: "LSTM",  d: "Long Short-Term Memory" },
      { a: "GRU",   d: "Gated Recurrent Unit" },
      { a: "GAN",   d: "Generative Adversarial Network" },
      { a: "VAE",   d: "Variational Autoencoder" },
      { a: "MoE",   d: "Mixture of Experts" },
      { a: "SSM",   d: "State Space Model" },
      { a: "MHA",   d: "Multi-Head Attention" },
      { a: "FFN",   d: "Feed-Forward Network" },
    ]},
    { heading: "Training & alignment", items: [
      { a: "SGD",   d: "Stochastic Gradient Descent" },
      { a: "SFT",   d: "Supervised Fine-Tuning" },
      { a: "RLHF",  d: "Reinforcement Learning from Human Feedback" },
      { a: "RLAIF", d: "Reinforcement Learning from AI Feedback" },
      { a: "CoT",   d: "Chain-of-Thought (prompting)" },
      { a: "RAG",   d: "Retrieval-Augmented Generation" },
      { a: "KD",    d: "Knowledge Distillation" },
      { a: "LoRA",  d: "Low-Rank Adaptation" },
      { a: "QLoRA", d: "Quantized Low-Rank Adaptation" },
      { a: "PEFT",  d: "Parameter-Efficient Fine-Tuning" },
      { a: "PPO",   d: "Proximal Policy Optimization" },
      { a: "KL",    d: "Kullback–Leibler divergence" },
      { a: "BPE",   d: "Byte-Pair Encoding" },
    ]},
    { heading: "Evaluation", items: [
      { a: "PPL",    d: "Perplexity" },
      { a: "BLEU",   d: "Bilingual Evaluation Understudy" },
      { a: "ROUGE",  d: "Recall-Oriented Understudy for Gisting Evaluation" },
      { a: "AUC",    d: "Area Under the (ROC) Curve" },
      { a: "ROC",    d: "Receiver Operating Characteristic" },
      { a: "F1",     d: "F1-score (harmonic mean of precision & recall)" },
      { a: "NER",    d: "Named Entity Recognition" },
      { a: "POS",    d: "Part-of-Speech (tagging)" },
      { a: "TF-IDF", d: "Term Frequency–Inverse Document Frequency" },
      { a: "BM25",   d: "Best Matching 25 (ranking function)" },
      { a: "MMLU",   d: "Massive Multitask Language Understanding (benchmark)" },
      { a: "SOTA",   d: "State of the Art" },
      { a: "OOD",    d: "Out-of-Distribution" },
    ]},
    { heading: "Infrastructure", items: [
      { a: "GPU",  d: "Graphics Processing Unit" },
      { a: "TPU",  d: "Tensor Processing Unit" },
      { a: "FP16", d: "16-bit floating point (half precision)" },
      { a: "BF16", d: "Brain Float 16 (Google's 16-bit format)" },
      { a: "INT8", d: "8-bit integer quantization" },
      { a: "ONNX", d: "Open Neural Network Exchange" },
      { a: "API",  d: "Application Programming Interface" },
      { a: "ASR",  d: "Automatic Speech Recognition" },
      { a: "TTS",  d: "Text-to-Speech" },
    ]},
  ];

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

    /* ---- Glossary toggle ---- */
    const glossaryToggle = panel.querySelector("[data-role='aiquiz-glossary-toggle']");
    const glossaryEl = panel.querySelector("[data-role='aiquiz-glossary']");
    if (glossaryToggle && glossaryEl) {
      glossaryEl.innerHTML = GLOSSARY_SECTIONS.map(sec =>
        `<div class="aiquiz-gloss-section">
          <p class="aiquiz-gloss-heading">${sec.heading}</p>
          <div class="aiquiz-glossary-grid">${sec.items.map(g =>
            `<div class="aiquiz-gloss-row"><span class="aiquiz-gloss-term">${g.a}</span><span class="aiquiz-gloss-def">${g.d}</span></div>`
          ).join("")}</div>
        </div>`
      ).join("");
      glossaryToggle.addEventListener("click", () => {
        const hidden = glossaryEl.hidden;
        glossaryEl.hidden = !hidden;
        const arrow = hidden ? "▲" : "▼";
        glossaryToggle.textContent = glossaryToggle.textContent.replace(/[▼▲]/, arrow);
      });
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
        expEl.innerHTML = `<span class="aiquiz-exp-icon">${ok ? "✓" : "✗"}</span> ${q.exp}${
          q.src ? `<cite class="aiquiz-src">📄 ${q.src}</cite>` : ""}`;
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
