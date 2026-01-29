/* ---------- Tabs + CV loader ---------- */
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
let cvLoaded = false;

async function loadCV(panel) {
  try {
    const res = await fetch("./cv.html", { cache: "no-store" });
    if (!res.ok) throw new Error(`cv.html not found (HTTP ${res.status})`);
    panel.innerHTML = await res.text();
    cvLoaded = true;
  } catch (err) {
    panel.innerHTML = `<p class="muted">Could not load CV. Make sure <strong>cv.html</strong> is in the repo root.</p>`;
    console.error(err);
  }
}

tabs.forEach(tab => {
  tab.addEventListener("click", async () => {
    tabs.forEach(t => t.setAttribute("aria-selected", "false"));
    panels.forEach(p => p.classList.remove("active"));

    tab.setAttribute("aria-selected", "true");
    const id = tab.dataset.tab;          // "about" | "cv" | "projects"
    const panel = document.getElementById(id);
    panel.classList.add("active");

    if (id === "cv" && !cvLoaded) {
      await loadCV(panel);
    }
  });
});

/* ---------- Time (with seconds) ---------- */
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

function updateTime() {
  const n = new Date();
  timeEl.textContent = n.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  dateEl.textContent = n.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

updateTime();
setInterval(updateTime, 1000);

/* ---------- Calendar ---------- */
const calendar = document.getElementById("calendar-grid");
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

document.getElementById("month").textContent = `${monthNames[month]} ${year}`;

// Weekdays header
["S","M","T","W","T","F","S"].forEach(d => {
  const el = document.createElement("div");
  el.textContent = d;
  el.className = "day";
  calendar.appendChild(el);
});

const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

// Empty cells before day 1
for (let i = 0; i < firstDay; i++) {
  calendar.appendChild(document.createElement("div"));
}

// Dates
for (let d = 1; d <= daysInMonth; d++) {
  const el = document.createElement("div");
  el.textContent = d;
  el.className = "cell";
  if (d === now.getDate()) el.classList.add("today");
  calendar.appendChild(el);
}
