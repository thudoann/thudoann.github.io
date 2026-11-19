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
  copyEmail: isFr ? "Copier l’adresse" : "Copy email",
  copied: isFr ? "Copié ✓" : "Copied ✓",
  copyFailed: isFr ? "Copie impossible" : "Copy failed",
  heroRoles: isFr
    ? ["Ingénierie de recherche en IA", "Biotech × IA en santé", "NLP · données synthétiques", "Disponible pour de nouvelles opportunités"]
    : ["AI Research Engineer", "Biotech × AI in healthcare", "NLP · synthetic data", "Open to opportunities"],
};

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const loaded = { aboutCv: false, papers: false, projects: false, contact: false, aiquiz: false };
const tabFiles = { papers: "papers.html", projects: "projects.html", contact: "contact.html", aiquiz: "ai-quiz.html" };

/* ---------- Scroll progress + back to top ---------- */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress-bar");
  const backToTop = document.getElementById("back-to-top");
  if (!bar || !backToTop) return;

  const update = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    bar.style.width = Math.min(Math.max(percent, 0), 100) + "%";
    backToTop.classList.toggle("visible", window.scrollY > 260);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const reducedMotion = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
const finePointer = !!(window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches);
const REVEAL_SEL = "[data-reveal], article, .card, .proj-card, .paper-item, .glance-card, .contact-card, .cv-item, .tech-pill, .proj-other-heading, .panel-title";

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        obs.unobserve(el);
        if (el.matches(".panel-title")) scrambleText(el);
        // clear the stagger delay so hover transitions stay snappy afterwards
        el.addEventListener("transitionend", () => { el.style.transitionDelay = ""; }, { once: true });
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -20px 0px" })
  : null;

/* Slide-up + fade for anything matching REVEAL_SEL; siblings stagger in */
function initRevealAnimations(root = document) {
  if (!root.querySelectorAll) return;
  const els = root.querySelectorAll(REVEAL_SEL);
  const perParent = new Map();
  els.forEach((el) => {
    if (el.dataset.revealBound) return;
    el.dataset.revealBound = "1";
    el.classList.add("reveal");
    const n = perParent.get(el.parentElement) || 0;
    perParent.set(el.parentElement, n + 1);
    if (!reducedMotion) el.style.transitionDelay = Math.min(n, 6) * 70 + "ms";
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("is-visible");
  });
}

/* Content loaded asynchronously (GitHub projects, CV, tab files) gets revealed too */
function watchForNewContent() {
  const main = document.getElementById("main-content");
  if (!main || !("MutationObserver" in window)) return;
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; initRevealAnimations(main); });
  }).observe(main, { childList: true, subtree: true });
}

/* ---------- Theme toggle ---------- */
(function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", function () {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    const apply = () => html.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    if (!document.startViewTransition || reducedMotion) { apply(); return; }
    const r = toggle.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      html.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(() => {});
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
    initRevealAnimations(panel);
    if (panel.id === "projects") {
      if (typeof initProjectsGuide === "function") initProjectsGuide(panel);
    }
    if (panel.id === "projects") initProjectSearch(panel);
    if (panel.id === "aiquiz") {
      if (typeof initAiQuiz === "function") initAiQuiz(panel);
    }
    if (panel.id === "aiquiz") initPipelineDiagram(panel);
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
    initRevealAnimations(container);
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
  syncNav();

  if (history.replaceState) history.replaceState(null, "", "#" + id);
  else location.hash = id;

  panel.scrollIntoView({ behavior: "smooth", block: "start" });

  if (tabFiles[id] && !loaded[id]) {
    loadPanel(panel, tabFiles[id], i18n.tabError).then(ok => { if (ok) loaded[id] = true; });
  }

  requestAnimationFrame(() => initRevealAnimations(panel));
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

/* Arrow keys switch tabs when focus is on the page (not in a widget that uses arrows) */
function initArrowTabNav() {
  const tabList = Array.from(tabs);
  document.addEventListener("keydown", (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const t = e.target;
    const onPage = t === document.body || t === document.documentElement || t.classList?.contains("tab");
    if (!onPage) return;
    const active = document.querySelector(".panel.active");
    if (active && active.id === "aiquiz") return;

    const cur = tabList.findIndex((tb) => tb.getAttribute("aria-selected") === "true");
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = tabList[(cur + dir + tabList.length) % tabList.length];
    e.preventDefault();
    switchToTab(next);
    next.focus({ preventScroll: true });
    hideKeyboardHint();
  });
}

/* Typewriter role line under the name */
function initHeroRole() {
  const el = document.getElementById("hero-role");
  if (!el) return;
  const roles = i18n.heroRoles;
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    el.textContent = roles[0];
    return;
  }
  let r = 0;
  let c = 0;
  let deleting = false;
  const tick = () => {
    const word = roles[r];
    if (!deleting) {
      c++;
      el.textContent = word.slice(0, c);
      if (c === word.length) {
        deleting = true;
        return setTimeout(tick, 2000);
      }
      return setTimeout(tick, 55 + Math.random() * 45);
    }
    c--;
    el.textContent = word.slice(0, c);
    if (c === 0) {
      deleting = false;
      r = (r + 1) % roles.length;
      return setTimeout(tick, 350);
    }
    setTimeout(tick, 28);
  };
  tick();
}

/* Copy-to-clipboard for the contact email shown in the sidebar */
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true, () => false);
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return Promise.resolve(ok);
  } catch (_) {
    return Promise.resolve(false);
  }
}

function initCopyEmail() {
  const btn = document.getElementById("copy-email");
  const link = document.querySelector(".aside-link[href^='mailto:']");
  if (!btn || !link) return;
  const email = link.getAttribute("href").replace(/^mailto:/, "");
  const label = i18n.copyEmail;
  btn.textContent = label;
  let timer;
  btn.addEventListener("click", async () => {
    const ok = await copyText(email);
    btn.textContent = ok ? i18n.copied : i18n.copyFailed;
    btn.classList.toggle("copied", ok);
    clearTimeout(timer);
    timer = setTimeout(() => {
      btn.textContent = label;
      btn.classList.remove("copied");
    }, 1800);
  });
}

/* Clicking the cat line sends paw prints floating up from the cursor */
function initCatPaws() {
  const cat = document.querySelector(".cat-line");
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!cat || reduce) return;
  cat.addEventListener("click", (e) => {
    for (let i = 0; i < 6; i++) {
      const paw = document.createElement("span");
      paw.className = "paw-burst";
      paw.textContent = "🐾";
      paw.setAttribute("aria-hidden", "true");
      paw.style.left = e.clientX + (Math.random() * 40 - 20) + "px";
      paw.style.top = e.clientY + "px";
      paw.style.setProperty("--dx", Math.random() * 60 - 30 + "px");
      paw.style.setProperty("--dy", -40 - Math.random() * 60 + "px");
      paw.style.setProperty("--rot", Math.random() * 60 - 30 + "deg");
      document.body.appendChild(paw);
      setTimeout(() => paw.remove(), 1300);
    }
  });
}

/* Cursor spotlight on cards (fine pointers only) */
function initCardSpotlight() {
  if (!finePointer) return;
  const SEL = ".proj-card, .paper-item, .glance-card, .contact-card";
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest ? e.target.closest(SEL) : null;
    if (!card) return;
    card.classList.add("spotlight-ready");
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  }, { passive: true });
}

const hash = location.hash.slice(1);
if (hash && ["about", "projects", "papers", "aiquiz", "contact"].includes(hash)) {
  openTabById(hash);
} else {
  if (history.replaceState) history.replaceState(null, "", "#about");
}
initAboutCvLazy();
initScrollProgress();
initRevealAnimations();
initArrowTabNav();
initHeroRole();
initCopyEmail();
initCatPaws();
initCardSpotlight();
initNav();
initNameWave();
initRipples();
initDoodleTilt();
initTilt();
initMagnetic();
initCursorGlow();
watchForNewContent();
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
    const parts = new Intl.DateTimeFormat("en", { timeZone: "Europe/Paris", hour: "2-digit", hour12: false }).formatToParts(n);
    const h = parseInt(parts.find(p => p.type === "hour").value, 10);
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

/* ---------- Navigation: sync label, mobile menu, shrink on scroll ---------- */
function syncNav() {
  const selected = document.querySelector(".tab[aria-selected='true']");
  const label = document.querySelector(".nav-toggle-label");
  if (selected && label) label.textContent = selected.textContent.trim();
}

function setNavOpen(open) {
  const nav = document.querySelector(".nav");
  const btn = document.querySelector(".nav-toggle");
  if (!nav || !btn) return;
  nav.classList.toggle("nav-open", open);
  btn.setAttribute("aria-expanded", open ? "true" : "false");
}

function initNav() {
  const nav = document.querySelector(".nav");
  const btn = document.querySelector(".nav-toggle");
  if (!nav) return;
  if (btn) {
    btn.addEventListener("click", () => setNavOpen(!nav.classList.contains("nav-open")));
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavOpen(false);
  });
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("nav-open")) return;
    if (!e.target.closest(".nav")) setNavOpen(false);
  });
  tabs.forEach((t) => t.addEventListener("click", () => setNavOpen(false)));

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle("is-scrolled", window.scrollY > 80);
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  syncNav();
}

/* ---------- Micro-interactions (fine pointers only) ---------- */
function initTilt() {
  if (!finePointer || reducedMotion) return;
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest ? e.target.closest(".proj-card") : null;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform =
      `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-3px)`;
  }, { passive: true });
  document.addEventListener("pointerout", (e) => {
    const card = e.target.closest ? e.target.closest(".proj-card") : null;
    if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
  });
}

function initMagnetic() {
  if (!finePointer || reducedMotion) return;
  const SEL = ".theme-toggle, .planner-secondary-btn, .aside-copy, .back-to-top, .lang-switch, .nav-toggle";
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest ? e.target.closest(SEL) : null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.2;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.2;
    el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
  }, { passive: true });
  document.addEventListener("pointerout", (e) => {
    const el = e.target.closest ? e.target.closest(SEL) : null;
    if (el && !el.contains(e.relatedTarget)) el.style.translate = "";
  });
}

function initCursorGlow() {
  if (!finePointer || reducedMotion) return;
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  glow.setAttribute("aria-hidden", "true");
  document.documentElement.appendChild(glow);
  let x = 0;
  let y = 0;
  let queued = false;
  document.addEventListener("pointermove", (e) => {
    x = e.clientX;
    y = e.clientY;
    glow.classList.add("on");
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      glow.style.transform = `translate(${x}px, ${y}px)`;
      queued = false;
    });
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => glow.classList.remove("on"));
}

/* ---------- Extra interactions ---------- */

/* Letters of the name lift individually under the cursor */
function initNameWave() {
  const h1 = document.querySelector(".site-title h1");
  if (!h1 || reducedMotion) return;
  const text = h1.textContent;
  h1.setAttribute("aria-label", text);
  h1.textContent = "";
  Array.from(text).forEach((ch) => {
    const span = document.createElement("span");
    span.className = "hl";
    span.setAttribute("aria-hidden", "true");
    span.textContent = ch === " " ? "\u00a0" : ch;
    h1.appendChild(span);
  });
}

/* Click ripple on buttons and tabs */
function initRipples() {
  if (reducedMotion) return;
  const SEL = ".planner-secondary-btn, .aside-copy, .aiquiz-next-btn, .aiquiz-opt-btn, .theme-toggle, .back-to-top, .tab, .nav-toggle, .proj-link-github, .proj-link-demo";
  document.addEventListener("pointerdown", (e) => {
    const el = e.target.closest ? e.target.closest(SEL) : null;
    if (!el || el.disabled) return;
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    el.classList.add("ripple-host");
    const r = el.getBoundingClientRect();
    const d = Math.max(r.width, r.height) * 2;
    const span = document.createElement("span");
    span.className = "ripple";
    span.style.width = span.style.height = d + "px";
    span.style.left = e.clientX - r.left - d / 2 + "px";
    span.style.top = e.clientY - r.top - d / 2 + "px";
    el.appendChild(span);
    setTimeout(() => { span.remove(); el.classList.remove("ripple-host"); }, 650);
  }, { passive: true });
}

/* Scramble-in effect for section titles */
const SCRAMBLE_CHARS = "!<>-_/[]{}=+*^?#";
function scrambleText(el) {
  if (reducedMotion || el.dataset.scrambled) return;
  el.dataset.scrambled = "1";
  const final = el.textContent;
  const frames = 18;
  let f = 0;
  const step = () => {
    f++;
    const progress = f / frames;
    el.textContent = final.split("").map((ch, i) => {
      if (ch === " " || i / final.length < progress) return ch;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }).join("");
    if (f < frames) requestAnimationFrame(step);
    else el.textContent = final;
  };
  requestAnimationFrame(step);
}

/* Sidebar doodle tilts toward the cursor */
function initDoodleTilt() {
  const img = document.querySelector(".aside-doodle img");
  const aside = document.querySelector(".calendar");
  if (!img || !aside || !finePointer || reducedMotion) return;
  aside.addEventListener("pointermove", (e) => {
    const r = aside.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    img.style.transform = `perspective(600px) rotateY(${(px * 12).toFixed(2)}deg) rotateX(${(-py * 9).toFixed(2)}deg) scale(1.03)`;
  }, { passive: true });
  aside.addEventListener("pointerleave", () => { img.style.transform = ""; });
}

/* Project search: filters cards by any text they contain */
function initProjectSearch(panel) {
  const input = panel.querySelector("#proj-search");
  const grid = panel.querySelector("[data-role='gh-projects']");
  const empty = panel.querySelector(".proj-search-empty");
  if (!input || !grid || input.dataset.bound) return;
  input.dataset.bound = "1";
  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    grid.querySelectorAll(".proj-card").forEach((card) => {
      const match = !q || card.textContent.toLowerCase().includes(q);
      card.classList.toggle("proj-filtered-out", !match);
      if (match) shown++;
    });
    if (empty) empty.hidden = !(q && shown === 0);
  };
  input.addEventListener("input", apply);
  new MutationObserver(apply).observe(grid, { childList: true, subtree: true });
}

/* ---------- CI/CD pipeline diagram: click a box for details ---------- */
const PIPELINE_DETAILS = {
  en: {
    write: ["Write code", "Developers write features and fixes, then push them to the shared repository on GitHub. Every push can trigger the steps below. Small, frequent changes are easier to review and easier to fix."],
    ci: ["CI: Continuous Integration", "On every push, a robot builds the project and runs automated tests, linting and security checks. A red result reaches the author within minutes, while the change is still fresh. Typical tools: GitHub Actions, GitLab CI, Jenkins."],
    cd: ["CD: Continuous Delivery / Deployment", "When CI passes, the app is packaged (for example as a Docker image) and released. With Delivery, a person decides when to go live. With Deployment, it goes live automatically. Teams often release gradually, for example with a canary release."],
    prod: ["Production: real users", "The new version now serves real users. Good pipelines release gradually and can roll back quickly if errors rise."],
    monitor: ["Monitor: check quality", "Logs, error rates and latency are watched continuously. For AI systems, output quality is watched too: accuracy on fresh samples, drift in the input data and user feedback. Alerts fire when a number drops below its limit."],
    retrain: ["Retrain: fresh data", "When quality drops (new data patterns, drift), the model is retrained on fresh data and evaluated. The new model goes back into the pipeline at CI, which tests it and releases it. This extra loop is the MLOps part: models are treated like code."]
  },
  fr: {
    write: ["Écrire le code", "Les développeurs écrivent des fonctionnalités et des corrections, puis les envoient dans le dépôt partagé sur GitHub. Chaque envoi peut déclencher les étapes suivantes. Des modifications petites et fréquentes sont plus faciles à relire et à corriger."],
    ci: ["CI : intégration continue", "À chaque envoi, un robot construit le projet et lance les tests automatiques, le linting et les contrôles de sécurité. Un résultat en échec prévient l’auteur en quelques minutes, pendant que la modification est encore fraîche. Outils courants : GitHub Actions, GitLab CI, Jenkins."],
    cd: ["CD : livraison ou déploiement continu", "Quand la CI réussit, l’application est empaquetée (par exemple en image Docker) puis publiée. Avec la livraison continue, une personne décide du moment de la mise en ligne. Avec le déploiement continu, la mise en ligne est automatique. Les équipes publient souvent progressivement, par exemple avec une publication canary."],
    prod: ["Production : vrais utilisateurs", "La nouvelle version sert maintenant de vrais utilisateurs. Un bon pipeline publie progressivement et peut revenir rapidement en arrière si les erreurs augmentent."],
    monitor: ["Surveiller : contrôler la qualité", "Les journaux, les taux d’erreur et les temps de réponse sont suivis en continu. Pour les systèmes d’IA, la qualité des réponses est aussi suivie : précision sur des données récentes, dérive des données d’entrée et retours des utilisateurs. Une alerte se déclenche quand un indicateur passe sous sa limite."],
    retrain: ["Réentraîner : nouvelles données", "Quand la qualité baisse (nouveaux schémas de données, dérive), le modèle est réentraîné sur des données récentes puis évalué. Le nouveau modèle repasse dans le pipeline à l’étape CI, qui le teste et le publie. Cette boucle supplémentaire est la partie MLOps : les modèles sont traités comme du code."]
  }
};

function initPipelineDiagram(panel) {
  const figure = panel.querySelector(".pipe-figure");
  if (!figure) return;
  const detail = figure.querySelector(".pipe-detail");
  const nodes = figure.querySelectorAll(".pipe-node");
  const texts = isFr ? PIPELINE_DETAILS.fr : PIPELINE_DETAILS.en;

  const select = (node) => {
    nodes.forEach((n) => {
      const on = n === node;
      n.classList.toggle("selected", on);
      n.setAttribute("aria-pressed", on ? "true" : "false");
    });
    const [title, body] = texts[node.dataset.step];
    detail.innerHTML = "";
    const strong = document.createElement("strong");
    strong.textContent = title;
    const p = document.createElement("span");
    p.textContent = body;
    detail.append(strong, document.createElement("br"), p);
  };

  nodes.forEach((node) => {
    node.addEventListener("click", () => select(node));
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(node);
      }
    });
  });
}

/* ---------- Embedded labs: fit each frame to its content height ---------- */
function initLabFrames() {
  // Same-origin labs: read the real content height straight from the iframe.
  const fit = (frame) => {
    try {
      const doc = frame.contentDocument;
      if (!doc || !doc.documentElement) return;
      const h = Math.max(doc.documentElement.scrollHeight, doc.body ? doc.body.scrollHeight : 0) + 24;
      frame.style.height = Math.max(h, 300) + "px";
    } catch (err) { /* cross-origin or not ready: keep the default height */ }
  };
  const frames = () => document.querySelectorAll(".docker-frame, .evals-frame, .monitoring-frame");
  frames().forEach((frame) => frame.addEventListener("load", () => fit(frame)));
  window.addEventListener("message", (e) => {
    if (!e.data || e.data.type !== "lab-height") return;
    frames().forEach((frame) => { if (frame.contentWindow === e.source) fit(frame); });
  });
  // Content can grow after load (quiz answers, expanded missions): re-check often.
  setInterval(() => frames().forEach((frame) => { if (frame.offsetParent !== null) fit(frame); }), 500);
}
initLabFrames();
