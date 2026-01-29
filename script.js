/* ---------- Config & i18n ---------- */
const isFr = document.documentElement.lang === "fr";
const locale = isFr ? "fr-FR" : "en";
const i18n = {
  loading: isFr ? "Chargement…" : "Loading…",
  cvError: isFr ? "Impossible de charger le CV. Vérifiez que cv.html est dans le dossier courant." : "Could not load CV. Make sure cv.html is in the repo root.",
  tabError: isFr ? "Impossible de charger le fichier. Vérifiez qu'il est dans le dossier courant." : "Could not load file. Make sure it is in the repo root.",
  contactSubject: isFr ? "Contact depuis le site" : "Contact from website",
  contactFrom: isFr ? "De" : "From",
};

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const loaded = { aboutCv: false, papers: false, hobbies: false, projects: false, contact: false };
const tabFiles = { papers: "papers.html", hobbies: "hobbies.html", projects: "projects.html", contact: "contact.html" };

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

async function loadPanel(panel, filename, fallbackMsg) {
  showLoading(panel);
  try {
    const res = await fetch(getBaseUrl() + filename, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    hideLoading(panel);
    panel.innerHTML = await res.text();
    initSubTabs(panel);
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

function switchToTab(tab) {
  const id = tab.dataset.tab;
  const panel = document.getElementById(id);
  if (!panel) return;

  tabs.forEach((t) => t.setAttribute("aria-selected", t === tab ? "true" : "false"));
  panels.forEach((p) => p.classList.remove("active"));
  panel.classList.add("active");

  panel.scrollIntoView({ behavior: "smooth", block: "start" });

  if (id === "about") loadAboutCv();
  else if (tabFiles[id] && !loaded[id]) {
    loadPanel(panel, tabFiles[id], i18n.tabError).then(ok => { if (ok) loaded[id] = true; });
  }
}

tabs.forEach((tab, i) => {
  tab.setAttribute("tabindex", "0");
  tab.addEventListener("click", () => switchToTab(tab));
  tab.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      switchToTab(tab);
    }
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = e.key === "ArrowRight" ? tabs[i + 1] : tabs[i - 1];
      if (next) {
        next.focus();
        switchToTab(next);
      }
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.target.closest(".tabs") || e.target.closest(".contact-form")) return;
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    const current = document.querySelector(".tab[aria-selected='true']");
    if (!current) return;
    const i = Array.from(tabs).indexOf(current);
    const next = e.key === "ArrowRight" ? tabs[i + 1] : tabs[i - 1];
    if (next) {
      e.preventDefault();
      next.focus();
      switchToTab(next);
    }
  }
});

if (document.getElementById("about").classList.contains("active")) loadAboutCv();

/* ---------- Contact form: open mailto ---------- */
document.addEventListener("submit", (e) => {
  if (e.target.id !== "contact-form") return;
  e.preventDefault();
  const nameEl = document.getElementById("contact-name");
  const emailEl = document.getElementById("contact-email");
  const messageEl = document.getElementById("contact-message");
  if (!emailEl || !messageEl) return;
  const from = (emailEl.value || "").trim();
  const name = (nameEl?.value || "").trim();
  const message = (messageEl.value || "").trim();
  const fromLine = name ? `${i18n.contactFrom}: ${name} <${from}>` : `${i18n.contactFrom}: ${from}`;
  const mailto = "mailto:thudoann45@gmail.com"
    + "?subject=" + encodeURIComponent(i18n.contactSubject)
    + "&body=" + encodeURIComponent(fromLine + "\n\n" + message);
  window.location.href = mailto;
});

/* ---------- Time & calendar ---------- */
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

function updateTime() {
  const n = new Date();
  const timeOpts = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const dateOpts = { weekday: "long", month: "short", day: "numeric" };
  timeEl.textContent = n.toLocaleTimeString(locale, timeOpts);
  dateEl.textContent = n.toLocaleDateString(locale, dateOpts);
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
  calendar.appendChild(el);
}
