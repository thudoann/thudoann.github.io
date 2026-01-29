/* ---------- Tabs ---------- */
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.setAttribute("aria-selected", "false"));
    panels.forEach(p => p.classList.remove("active"));

    tab.setAttribute("aria-selected", "true");
    document
      .getElementById("panel-" + tab.id.replace("tab-", ""))
      .classList.add("active");
  });
});

/* ---------- Time (with seconds) ---------- */
function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

  document.getElementById("date").textContent =
    now.toLocaleDateString([], {
      weekday: "long",
      month: "short",
      day: "numeric"
    });
}

updateTime();
setInterval(updateTime, 1000);

/* ---------- Calendar ---------- */
const calendar = document.getElementById("calendar-grid");
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

document.getElementById("month").textContent =
  `${monthNames[month]} ${year}`;

const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

["S","M","T","W","T","F","S"].forEach(d => {
  const el = document.createElement("div");
  el.textContent = d;
  el.className = "day";
  calendar.appendChild(el);
});

for (let i = 0; i < firstDay; i++) {
  calendar.appendChild(document.createElement("div"));
}

for (let d = 1; d <= daysInMonth; d++) {
  const el = document.createElement("div");
  el.textContent = d;
  el.className = "cell";

  if (d === today.getDate()) el.classList.add("today");
  calendar.appendChild(el);
}
