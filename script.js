/* Tabs + CV loader */
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
let cvLoaded = false;

tabs.forEach(tab => {
  tab.addEventListener("click", async () => {
    tabs.forEach(t => t.setAttribute("aria-selected", "false"));
    panels.forEach(p => p.classList.remove("active"));

    tab.setAttribute("aria-selected", "true");
    const id = tab.dataset.tab;
    const panel = document.getElementById(id);
    panel.classList.add("active");

    if (id === "cv" && !cvLoaded) {
      const res = await fetch("cv.html");
      panel.innerHTML = await res.text();
      cvLoaded = true;
    }
  });
});

/* Time (with seconds) */
function updateTime() {
  const n = new Date();
  time.textContent = n.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  date.textContent = n.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric"
  });
}
updateTime();
setInterval(updateTime, 1000);

/* Calendar */
const calendar = document.getElementById("calendar-grid");
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
document.getElementById("month").textContent = `${monthNames[month]} ${year}`;

["S","M","T","W","T","F","S"].forEach(d => {
  const el = document.createElement("div");
  el.textContent = d;
  calendar.appendChild(el);
});

const firstDay = new Date(year, month, 1).getDay();
const days = new Date(year, month + 1, 0).getDate();
for (let i = 0; i < firstDay; i++) calendar.appendChild(document.createElement("div"));

for (let d = 1; d <= days; d++) {
  const el = document.createElement("div");
  el.textContent = d;
  if (d === now.getDate()) el.classList.add("today");
  calendar.appendChild(el);
}
