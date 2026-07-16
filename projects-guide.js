/* ---------- Projects guide ---------- */
const PROJECTS_CACHE_KEY = "ghProjectsCache_v1";
const PROJECTS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function initProjectsGuide(panel) {
  const container = panel.querySelector("[data-role='gh-projects']");
  if (!container || container.dataset.initialized === "1") return;
  container.dataset.initialized = "1";

  const cfg = typeof PROJECTS_CONFIG !== "undefined" ? PROJECTS_CONFIG : { user: "thudoann", pinned: [], exclude: [], descriptions: {} };

  renderProjects(container, cfg);
}

async function fetchRepos(user) {
  const cached = (() => {
    try {
      const raw = sessionStorage.getItem(PROJECTS_CACHE_KEY);
      if (!raw) return null;
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < PROJECTS_CACHE_TTL) return data;
    } catch (_) {}
    return null;
  })();
  if (cached) return cached;

  const res = await fetch(
    `https://api.github.com/users/${user}/repos?sort=updated&per_page=100`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const data = await res.json();

  try {
    sessionStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch (_) {}

  return data;
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(isFr ? "fr-FR" : "en-GB", { year: "numeric", month: "short" });
}

function langColor(lang) {
  const map = {
    Python: "#3572A5",
    JavaScript: "#f1e05a",
    "Jupyter Notebook": "#DA5B0B",
    Java: "#b07219",
    HTML: "#e34c26",
    R: "#198CE7",
  };
  return map[lang] || "#8b7355";
}

function makeCard(repo, pinned, cfg) {
  const desc = (cfg.descriptions && cfg.descriptions[repo.name]) || repo.description || "";
  const label = repo.name.replace(/[-_]/g, " ");
  const updated = formatDate(repo.pushed_at);
  const stars = repo.stargazers_count;
  const lang = repo.language;
  const url = repo.html_url;
  const tags = (cfg.tags && cfg.tags[repo.name]) || (repo.topics || []).slice(0, 5);
  const demoUrl = cfg.demos && cfg.demos[repo.name];

  const card = document.createElement("article");
  card.className = "proj-card" + (pinned ? " proj-card-pinned" : "");

  const tagsHtml = tags.length
    ? `<div class="proj-tags">${tags.map((t) => `<span class="proj-tag">${t}</span>`).join("")}</div>`
    : "";

  card.innerHTML = `
    ${pinned ? `<span class="proj-badge">${isFr ? "Sélectionné" : "Featured"}</span>` : ""}
    <h3 class="proj-title">${label}</h3>
    ${desc ? `<p class="proj-desc">${desc}</p>` : ""}
    ${tagsHtml}
    <div class="proj-meta">
      ${lang ? `<span class="proj-lang"><span class="proj-lang-dot" style="background:${langColor(lang)}"></span>${lang}</span>` : ""}
      ${stars ? `<span class="proj-stars">★ ${stars}</span>` : ""}
      ${updated ? `<span class="proj-updated">${isFr ? "Mis à jour" : "Updated"} ${updated}</span>` : ""}
    </div>
    <div class="proj-links">
      <a href="${url}" target="_blank" rel="noopener" class="proj-link-github">GitHub →</a>
      ${demoUrl ? `<a href="${demoUrl}" target="_blank" rel="noopener" class="proj-link-demo">Demo →</a>` : ""}
    </div>
  `;
  return card;
}

async function renderProjects(container, cfg) {
  container.innerHTML = `<p class="proj-loading muted">${isFr ? "Chargement des projets…" : "Loading projects…"}</p>`;

  let repos;
  try {
    repos = await fetchRepos(cfg.user);
  } catch (e) {
    container.innerHTML = `<p class="muted">${isFr ? "Impossible de charger les projets GitHub." : "Could not load GitHub projects."}</p>`;
    return;
  }

  const excludeSet = new Set((cfg.exclude || []).map((s) => s.toLowerCase()));
  const pinnedOrder = (cfg.pinned || []).map((s) => s.toLowerCase());
  const pinnedSet = new Set(pinnedOrder);

  const filtered = repos.filter((r) => !excludeSet.has(r.name.toLowerCase()) && !r.fork);

  const pinnedRepos = pinnedOrder
    .map((name) => filtered.find((r) => r.name.toLowerCase() === name))
    .filter(Boolean);

  const otherRepos = filtered
    .filter((r) => !pinnedSet.has(r.name.toLowerCase()))
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

  container.innerHTML = "";

  if (pinnedRepos.length) {
    const featuredGrid = document.createElement("div");
    featuredGrid.className = "proj-grid proj-grid-featured";
    pinnedRepos.forEach((r) => featuredGrid.appendChild(makeCard(r, true, cfg)));
    container.appendChild(featuredGrid);
  }

  if (otherRepos.length) {
    const otherHeading = document.createElement("h3");
    otherHeading.className = "proj-other-heading muted";
    otherHeading.textContent = isFr ? "Autres dépôts" : "Other repositories";
    container.appendChild(otherHeading);

    const otherGrid = document.createElement("div");
    otherGrid.className = "proj-grid";
    otherRepos.forEach((r) => otherGrid.appendChild(makeCard(r, false, cfg)));
    container.appendChild(otherGrid);
  }

  if (!pinnedRepos.length && !otherRepos.length) {
    container.innerHTML = `<p class="muted">${isFr ? "Aucun dépôt à afficher." : "No repositories to display."}</p>`;
  }
}
