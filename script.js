/* ---------- Config & i18n ---------- */
const isFr = document.documentElement.lang === "fr";
const locale = isFr ? "fr-FR" : "en";
const i18n = {
  loading: isFr ? "Chargement…" : "Loading…",
  cvError: isFr ? "Impossible de charger le CV. Vérifiez que cv.html est dans le dossier courant." : "Could not load CV. Make sure cv.html is in the repo root.",
  tabError: isFr ? "Impossible de charger le fichier. Vérifiez qu'il est dans le dossier courant." : "Could not load file. Make sure it is in the repo root.",
  contactSubject: isFr ? "Contact depuis le site" : "Contact from website",
  contactFrom: isFr ? "De" : "From",
  contactEmailInvalid: isFr ? "Entrez une adresse email valide." : "Please enter a valid email address.",
  contactOpening: isFr ? "Ouverture…" : "Opening…",
  contactSubmitLabel: isFr ? "Envoyer l'email" : "Send email",
  keyboardHint: isFr ? "← → pour changer d’onglet" : "← → to switch tabs",
};

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const loaded = { aboutCv: false, papers: false, hobbies: false, projects: false, quiz: false, contact: false, rabbitholes: false, sudoku: false, aiquiz: false };
const tabFiles = { papers: "papers.html", hobbies: "hobbies.html", projects: "projects.html", quiz: "quiz.html", contact: "contact.html", rabbitholes: "rabbitholes.html", sudoku: "sudoku.html", aiquiz: "ai-quiz.html" };

/* ---------- Theme toggle ---------- */
(function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", function () {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

function getBaseUrl() {
  const path = window.location.pathname;
  return path.endsWith("/") ? path : path.replace(/\/[^/]*$/, "/") || "/";
}

/* ---------- Tabs & panels ---------- */
function initSubTabs(panel) {
  const subTabs = panel.querySelectorAll(".sub-tab");
  const subPanels = panel.querySelectorAll(".sub-panel");
  if (subTabs.length === 0) return;
  subTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.subtab;
      subTabs.forEach((t) => {
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      subPanels.forEach((p) => {
        p.classList.toggle("active", p.id === "sub-" + id);
      });
    });
  });
}

function showLoading(panel, message) {
  panel.classList.add("loading");
  panel.innerHTML = `<p class="loading-text muted">${message ?? i18n.loading}</p>`;
}

function hideLoading(panel) {
  panel.classList.remove("loading");
}

async function initCivicQuizEmbeds(scope) {
  const root = scope || document;
  const hosts = root.querySelectorAll("[data-embed-civic-quiz]");
  if (!hosts.length) return;

  await Promise.all(Array.from(hosts).map(async (host) => {
    if (host.dataset.embedLoaded === "1") return;
    host.dataset.embedLoaded = "1";
    const src = host.getAttribute("data-src");
    if (!src) return;

    host.innerHTML = `<p class="muted">${i18n.loading}</p>`;

    try {
      const res = await fetch(src, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      const inlineStyle = doc.querySelector("style");
      const scriptEl = doc.querySelector("script");
      if (!inlineStyle || !scriptEl || !doc.body) throw new Error("Malformed quiz document");

      const scriptInBody = doc.body.querySelector("script");
      if (scriptInBody) scriptInBody.remove();
      const content = doc.body.innerHTML;
      if (!content.trim()) throw new Error("Empty quiz content");

      host.innerHTML = "";
      const shadow = host.attachShadow({ mode: "open" });

      const style = document.createElement("style");
      style.textContent = inlineStyle.textContent;
      shadow.appendChild(style);

      const bridge = document.createElement("style");
      bridge.textContent = `
        .project-native-embed-root {
          --bg: transparent !important;
          --ink: var(--q-ink) !important;
          --dim: var(--q-dim) !important;
          --line: var(--q-line) !important;
          --green: var(--q-green) !important;
          --red: var(--q-red) !important;
          --serif: ui-serif, Georgia, "Times New Roman", serif;
          --sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          font-family: var(--sans);
          color: var(--q-ink);
          padding: 0;
          text-align: left;
        }
        .project-native-embed-root > header {
          display: none;
        }
        .project-native-embed-root .card {
          max-width: 100% !important;
          width: 100%;
          margin: 0;
          padding: 0;
          animation: none;
        }
        .project-native-embed-root .section-label,
        .project-native-embed-root .q-meta,
        .project-native-embed-root th {
          color: var(--q-dim) !important;
        }
        .project-native-embed-root .q-score-live,
        .project-native-embed-root .mode-btn.selected,
        .project-native-embed-root .choice-btn:hover:not(:disabled) {
          color: var(--q-ink) !important;
        }
        .project-native-embed-root .mode-btn,
        .project-native-embed-root .btn,
        .project-native-embed-root .choice-btn {
          font-family: var(--sans) !important;
        }
        .project-native-embed-root h2,
        .project-native-embed-root .question-text,
        .project-native-embed-root .verdict,
        .project-native-embed-root .result-circle .big,
        .project-native-embed-root .result-mention,
        .project-native-embed-root .stat-box .sv,
        .project-native-embed-root .choice-badge,
        .project-native-embed-root .rank {
          font-family: var(--serif) !important;
        }
        .project-native-embed-root kbd {
          background: var(--q-line) !important;
          color: var(--q-ink) !important;
        }
        .project-native-embed-root .pt-dot {
          background: var(--q-line) !important;
        }
        .project-native-embed-root .pt-dot.ok {
          background: var(--q-green) !important;
        }
        .project-native-embed-root .pt-dot.bad {
          background: var(--q-red) !important;
        }
        .project-native-embed-root .pt-dot.cur {
          background: var(--q-ink) !important;
        }
        .project-native-embed-root .btn-primary {
          color: var(--q-ink) !important;
        }
        .project-native-embed-root .result-circle .big {
          font-size: clamp(3.5rem, 12vw, 5.5rem);
        }
      `;
      shadow.appendChild(bridge);

      const wrapper = document.createElement("div");
      wrapper.className = "project-native-embed-root";
      wrapper.innerHTML = content;
      shadow.appendChild(wrapper);

      const documentProxy = {
        querySelector: (sel) => shadow.querySelector(sel),
        querySelectorAll: (sel) => shadow.querySelectorAll(sel),
        getElementById: (id) => shadow.querySelector(`#${CSS.escape(id)}`),
        addEventListener: (...args) => shadow.addEventListener(...args),
        removeEventListener: (...args) => shadow.removeEventListener(...args),
        createElement: (...args) => document.createElement(...args),
      };

      const runQuiz = new Function(
        "document",
        "window",
        "localStorage",
        "setInterval",
        "clearInterval",
        "setTimeout",
        "clearTimeout",
        "console",
        "confirm",
        `${scriptEl.textContent}
return {
  toggleSound: typeof toggleSound === "function" ? toggleSound : null,
  selectCategory: typeof selectCategory === "function" ? selectCategory : null,
  selectMode: typeof selectMode === "function" ? selectMode : null,
  startQuiz: typeof startQuiz === "function" ? startQuiz : null,
  showScores: typeof showScores === "function" ? showScores : null,
  nextQuestion: typeof nextQuestion === "function" ? nextQuestion : null,
  goHome: typeof goHome === "function" ? goHome : null,
  clearScores: typeof clearScores === "function" ? clearScores : null
};`
      );
      const exported = runQuiz(
        documentProxy,
        window,
        localStorage,
        setInterval,
        clearInterval,
        setTimeout,
        clearTimeout,
        console,
        confirm
      );

      // The quiz markup uses inline onclick handlers; expose needed actions globally.
      Object.entries(exported || {}).forEach(([name, fn]) => {
        if (typeof fn === "function") window[name] = fn;
      });
    } catch (err) {
      host.innerHTML = `<p class="muted">${i18n.tabError}</p>`;
      console.error(err);
    }
  }));
}

async function loadPanel(panel, filename, fallbackMsg) {
  showLoading(panel);
  try {
    const res = await fetch(getBaseUrl() + filename, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    hideLoading(panel);
    panel.innerHTML = await res.text();
    initSubTabs(panel);
    await initCivicQuizEmbeds(panel);
    if (panel.id === "hobbies") {
      initTravelPlanner(panel);
      if (typeof initCameraGuide === "function") initCameraGuide(panel);
    }
    if (panel.id === "rabbitholes") {
      if (typeof initKnowledgeGuide === "function") initKnowledgeGuide(panel);
    }
    if (panel.id === "projects") {
      if (typeof initProjectsGuide === "function") initProjectsGuide(panel);
    }
    if (panel.id === "sudoku") {
      if (typeof initSudoku === "function") initSudoku(panel);
    }
    if (panel.id === "aiquiz") {
      if (typeof initAiQuiz === "function") initAiQuiz(panel);
    }
    return true;
  } catch (err) {
    hideLoading(panel);
    panel.innerHTML = `<p class="muted">${fallbackMsg}</p>`;
    console.error(err);
    return false;
  }
}

function initCvAccordion(container) {
  const items = container.querySelectorAll(".cv .cv-item");
  items.forEach((item, i) => {
    const row = item.querySelector(".cv-row");
    const location = item.querySelector(".cv-location");
    const bodyContent = [item.querySelector(".cv-bullets"), item.querySelector(".cv-grade")].filter(Boolean);
    if (!row || !bodyContent.length) return;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "cv-item-toggle";
    toggle.setAttribute("aria-expanded", i === 0 ? "true" : "false");
    const head = document.createElement("div");
    head.className = "cv-item-head";
    head.append(row, location);
    const chevron = document.createElement("span");
    chevron.className = "cv-item-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "▼";
    toggle.append(head, chevron);

    const body = document.createElement("div");
    body.className = "cv-item-body";
    bodyContent.forEach((el) => body.appendChild(el));

    item.prepend(toggle);
    item.append(body);
    if (i > 0) item.classList.add("collapsed");

    toggle.addEventListener("click", () => {
      const open = item.classList.toggle("collapsed");
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });
}

async function loadAboutCv() {
  const container = document.getElementById("about-cv");
  if (!container || loaded.aboutCv) return;
  container.classList.add("loading");
  container.innerHTML = `<p class="loading-text muted">${i18n.loading}</p>`;
  try {
    const res = await fetch(getBaseUrl() + "cv.html", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    container.classList.remove("loading");
    container.innerHTML = await res.text();
    initCvAccordion(container);
    loaded.aboutCv = true;
  } catch (err) {
    container.classList.remove("loading");
    container.innerHTML = `<p class="muted">${i18n.cvError}</p>`;
    console.error(err);
  }
}

function initAboutCvLazy() {
  const container = document.getElementById("about-cv");
  if (!container) return;
  const btn = container.querySelector("[data-role='about-cv-toggle']");
  if (!btn) return;
  btn.addEventListener("click", () => {
    loadAboutCv();
  }, { once: true });
}

function switchToTab(tab) {
  const id = tab.dataset.tab;
  const panel = document.getElementById(id);
  if (!panel) return;

  tabs.forEach((t) => t.setAttribute("aria-selected", t === tab ? "true" : "false"));
  panels.forEach((p) => p.classList.remove("active"));
  panel.classList.add("active");

  if (history.replaceState) history.replaceState(null, "", "#" + id);
  else location.hash = id;

  panel.scrollIntoView({ behavior: "smooth", block: "start" });

  if (tabFiles[id] && !loaded[id]) {
    loadPanel(panel, tabFiles[id], i18n.tabError).then(ok => { if (ok) loaded[id] = true; });
  }
}

function openTabById(id) {
  const tab = document.querySelector(".tab[data-tab='" + id + "']");
  if (tab) switchToTab(tab);
}

tabs.forEach((tab, i) => {
  tab.setAttribute("tabindex", "0");
  tab.addEventListener("click", () => switchToTab(tab));
  tab.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      switchToTab(tab);
    }
  });
});

document.addEventListener("keydown", (e) => {
  const inForm = e.target.closest(".contact-form");
  if (e.target.closest(".tabs")) return;
  if (inForm) return;
});

const hash = location.hash.slice(1);
if (hash && ["about", "projects", "quiz", "papers", "hobbies", "rabbitholes", "sudoku", "aiquiz", "contact"].includes(hash)) {
  openTabById(hash);
} else {
  if (history.replaceState) history.replaceState(null, "", "#about");
}
initAboutCvLazy();
window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1);
  if (id && document.getElementById(id)) openTabById(id);
});

/* Clicking .tab-link (e.g. from Projects placeholder) switches to that tab */
document.addEventListener("click", (e) => {
  const link = e.target.closest(".tab-link");
  if (!link || !link.dataset.tab) return;
  e.preventDefault();
  const tab = document.querySelector(".tab[data-tab='" + link.dataset.tab + "']");
  if (tab) switchToTab(tab);
});

/* Keyboard hint: show once, hide on first arrow/key or after 5s */
function hideKeyboardHint() {
  const el = document.getElementById("keyboard-hint");
  if (el) {
    el.classList.add("keyboard-hint-hidden");
    try { sessionStorage.setItem("keyboard-hint-seen", "1"); } catch (_) {}
  }
}
(function initKeyboardHint() {
  try { if (sessionStorage.getItem("keyboard-hint-seen")) return; } catch (_) {}
  const el = document.getElementById("keyboard-hint");
  if (!el) return;
  const textEl = el.querySelector(".keyboard-hint-text");
  if (textEl) textEl.textContent = i18n.keyboardHint;
  el.classList.remove("keyboard-hint-hidden");
  el.querySelector(".keyboard-hint-dismiss")?.addEventListener("click", hideKeyboardHint);
  setTimeout(hideKeyboardHint, 5000);
})();

/* ---------- Contact form: validation + mailto ---------- */
function showContactError(el, msg) {
  let err = el.nextElementSibling?.classList?.contains("contact-field-error") ? el.nextElementSibling : null;
  if (!err) {
    err = document.createElement("p");
    err.className = "contact-field-error";
    el.insertAdjacentElement("afterend", err);
  }
  err.textContent = msg;
  err.setAttribute("role", "alert");
}
function clearContactError(el) {
  const err = el.nextElementSibling;
  if (err?.classList?.contains("contact-field-error")) err.remove();
}
function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s || "").trim());
}

document.addEventListener("submit", (e) => {
  if (e.target.id !== "contact-form") return;
  e.preventDefault();
  const nameEl = document.getElementById("contact-name");
  const emailEl = document.getElementById("contact-email");
  const messageEl = document.getElementById("contact-message");
  const submitBtn = e.target.querySelector('button[type="submit"]');
  if (!emailEl || !messageEl) return;
  const from = (emailEl.value || "").trim();
  const name = (nameEl?.value || "").trim();
  const message = (messageEl.value || "").trim();
  clearContactError(emailEl);
  if (!isValidEmail(from)) {
    showContactError(emailEl, i18n.contactEmailInvalid);
    emailEl.focus();
    return;
  }
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = i18n.contactOpening;
  }
  const fromLine = name ? `${i18n.contactFrom}: ${name} <${from}>` : `${i18n.contactFrom}: ${from}`;
  const mailto = "mailto:thudoann45@gmail.com"
    + "?subject=" + encodeURIComponent(i18n.contactSubject)
    + "&body=" + encodeURIComponent(fromLine + "\n\n" + message);
  window.location.href = mailto;
  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = i18n.contactSubmitLabel;
    }
  }, 1500);
});

document.addEventListener("blur", (e) => {
  if (e.target.id === "contact-email" && e.target.form?.id === "contact-form") {
    if (e.target.value.trim() && !isValidEmail(e.target.value)) showContactError(e.target, i18n.contactEmailInvalid);
    else clearContactError(e.target);
  }
}, true);

/* ---------- Time & calendar ---------- */
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const asideNoteEl = document.querySelector(".aside-note");
let _lastNight = null;

function updateTime() {
  const n = new Date();
  const timeOpts = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const dateOpts = { weekday: "long", month: "short", day: "numeric" };
  timeEl.textContent = n.toLocaleTimeString(locale, timeOpts);
  dateEl.textContent = n.toLocaleDateString(locale, dateOpts);

  if (asideNoteEl) {
    const h = parseInt(n.toLocaleString("en", { timeZone: "Europe/Paris", hour: "numeric", hour12: false }), 10);
    const isNight = h >= 21 || h < 8;
    if (isNight !== _lastNight) {
      _lastNight = isNight;
      asideNoteEl.hidden = !isNight;
    }
  }
}

updateTime();
setInterval(updateTime, 1000);

const monthNames = isFr
  ? ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"]
  : ["January","February","March","April","May","June","July","August","September","October","November","December"];
const weekdays = isFr ? ["D","L","M","M","J","V","S"] : ["S","M","T","W","T","F","S"];

const calendar = document.getElementById("calendar-grid");
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();

document.getElementById("month").textContent = `${monthNames[month]} ${year}`;

weekdays.forEach((d) => {
  const el = document.createElement("div");
  el.className = "day";
  el.textContent = d;
  calendar.appendChild(el);
});

const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();
for (let i = 0; i < firstDay; i++) calendar.appendChild(document.createElement("div"));
for (let d = 1; d <= daysInMonth; d++) {
  const el = document.createElement("div");
  el.className = "cell" + (d === now.getDate() ? " today" : "");
  el.textContent = d;
  el.setAttribute("title", `${monthNames[month]} ${d}, ${year}`);
  el.setAttribute("role", "gridcell");
  if (d === now.getDate()) el.setAttribute("aria-current", "date");
  calendar.appendChild(el);
}
