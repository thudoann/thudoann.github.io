/* ---------- Travel planner (Hobbies → Travel) ---------- */
const TRAVEL_STORAGE_KEY = "travelPlannerTrips_v1";

function readTripsFromStorage() {
  try {
    const raw = localStorage.getItem(TRAVEL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function writeTripsToStorage(trips) {
  try {
    localStorage.setItem(TRAVEL_STORAGE_KEY, JSON.stringify(trips));
  } catch (_) {
    // ignore quota / private mode errors
  }
}

function createTripId() {
  return "trip_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function initTravelPlanner(root) {
  if (!root) return;
  const container = root.querySelector("[data-role='travel-planner']");
  if (!container || container.dataset.initialized === "1") return;
  container.dataset.initialized = "1";

  const form = container.querySelector("[data-role='planner-form']");
  const startInput = form && form.elements.namedItem("startDate");
  const endInputGlobal = form && form.elements.namedItem("endDate");
  const tripListEl = container.querySelector("[data-role='planner-trip-list']");
  const emptyEl = container.querySelector("[data-role='planner-empty']");
  const newTripBtn = container.querySelector("[data-role='planner-new-trip']");
  const clearBtn = container.querySelector("[data-role='planner-clear-trip']");
  const addItemBtn = container.querySelector("[data-role='planner-add-item']");
  const tbody = container.querySelector("[data-role='planner-itinerary-body']");
  const budgetSummaryEl = container.querySelector("[data-role='planner-budget-summary']");
  const downloadBtn = container.querySelector("[data-role='planner-download-summary']");
  const mapFrame = container.querySelector("[data-role='planner-map-frame']");

  if (!form || !tripListEl || !tbody) return;

  const state = {
    trips: readTripsFromStorage(),
    currentTripId: null,
  };

  function slugifyForFilename(s) {
    return (s || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      || "trip-summary";
  }

  function downloadTextFile(filename, text) {
    try {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  }

  function updateRowFlightVisibility(row) {
    const kindSelect = row.querySelector('select[name="item-kind"]');
    const extra = row.querySelector(".planner-flight-extra");
    if (!extra || !kindSelect) return;
    if (kindSelect.value === "flight") {
      extra.classList.add("planner-flight-extra-visible");
    } else {
      extra.classList.remove("planner-flight-extra-visible");
    }
  }

  function updateItineraryDateConstraints() {
    const min = (startInput && startInput.value ? startInput.value.trim() : "") || "";
    const max = (endInputGlobal && endInputGlobal.value ? endInputGlobal.value.trim() : "") || "";
    const dateInputs = tbody.querySelectorAll('input[name="item-date"]');
    dateInputs.forEach((input) => {
      if (min) {
        input.min = min;
        if (input.value && input.value < min) {
          input.value = min;
        }
      } else {
        input.removeAttribute("min");
      }

      if (max) {
        input.max = max;
        if (input.value && input.value > max) {
          input.value = max;
        }
      } else {
        input.removeAttribute("max");
      }
    });
  }

  function updateEndDateConstraint() {
    if (!endInputGlobal) return;
    const min = (startInput && startInput.value ? startInput.value.trim() : "") || "";
    if (min) {
      endInputGlobal.min = min;
      if (endInputGlobal.value && endInputGlobal.value < min) {
        endInputGlobal.value = min;
      }
    } else {
      endInputGlobal.removeAttribute("min");
    }
  }

  function updateMapPreview() {
    if (!mapFrame) return;
    const items = collectItineraryFromDom();
    let query = "";

    const flightItem = items.find((it) => it.kind === "flight" && (it.to || it.from));
    if (flightItem) {
      query = flightItem.to || flightItem.from || "";
    } else {
      const placeItem = items.find((it) => it.place);
      if (placeItem) query = placeItem.place;
    }

    if (!query) {
      const titleInput = form.elements.namedItem("title");
      query = (titleInput?.value || "").trim();
    }

    if (!query) {
      const fallback = "https://www.google.com/maps?output=embed";
      if (mapFrame.src !== fallback) mapFrame.src = fallback;
      return;
    }

    const url = "https://www.google.com/maps?q=" + encodeURIComponent(query) + "&output=embed";
    if (mapFrame.src !== url) mapFrame.src = url;
  }

  function makeRow(item) {
    const tr = document.createElement("tr");
    let dateVal = item && item.date ? item.date : "";
    // For brand new items without an explicit date, default to trip start date (if set),
    // instead of today's date.
    if (!dateVal && startInput && startInput.value) {
      dateVal = startInput.value.trim();
    }
    const timeVal = item && item.time ? item.time : "";
    const placeVal = item && item.place ? item.place : "";
    const notesVal = item && item.notes ? item.notes : "";
    const kindVal = item && item.kind ? item.kind : "";
    const costVal = item && (typeof item.cost === "number" || item.cost) ? item.cost : "";
    const fromVal = item && item.from ? item.from : "";
    const toVal = item && item.to ? item.to : "";
    const flightTypeVal = item && item.flightType ? item.flightType : "";
    tr.innerHTML = `
      <td><input type="date" name="item-date" value="${dateVal}"></td>
      <td><input type="time" name="item-time" value="${timeVal}"></td>
      <td>
        <select name="item-kind">
          <option value="">${isFr ? "— Type —" : "— Type —"}</option>
          <option value="flight"${kindVal === "flight" ? " selected" : ""}>${isFr ? "Vol" : "Flight"}</option>
          <option value="transport"${kindVal === "transport" ? " selected" : ""}>${isFr ? "Transport" : "Transport"}</option>
          <option value="accommodation"${kindVal === "accommodation" ? " selected" : ""}>${isFr ? "Hébergement" : "Accommodation"}</option>
          <option value="food"${kindVal === "food" ? " selected" : ""}>${isFr ? "Repas" : "Food"}</option>
          <option value="activity"${kindVal === "activity" ? " selected" : ""}>${isFr ? "Activité" : "Activity"}</option>
          <option value="other"${kindVal === "other" ? " selected" : ""}>${isFr ? "Autre" : "Other"}</option>
        </select>
      </td>
      <td>
        <input type="text" name="item-place" placeholder="${isFr ? "City, neighbourhood…" : "City, neighborhood…"}" value="${placeVal}">
        <div class="planner-flight-extra">
          <select name="item-flight-type">
            <option value="">${isFr ? "Type de trajet" : "Trip type"}</option>
            <option value="oneway"${flightTypeVal === "oneway" ? " selected" : ""}>${isFr ? "Aller simple" : "One way"}</option>
            <option value="roundtrip"${flightTypeVal === "roundtrip" ? " selected" : ""}>${isFr ? "Aller-retour" : "Round trip"}</option>
          </select>
          <input type="text" name="item-from" placeholder="${isFr ? "De" : "From"}" value="${fromVal}">
          <input type="text" name="item-to" placeholder="${isFr ? "À" : "To"}" value="${toVal}">
        </div>
      </td>
      <td><input type="number" name="item-cost" min="0" step="0.01" placeholder="${isFr ? "€" : "€"}" value="${costVal}"></td>
      <td><input type="text" name="item-notes" placeholder="${isFr ? "Details, notes…" : "Details, notes…"}" value="${notesVal}"></td>
      <td><button type="button" class="planner-row-remove" aria-label="${isFr ? "Supprimer la ligne" : "Remove row"}">×</button></td>
    `;
    updateRowFlightVisibility(tr);
    return tr;
  }

  function renderItinerary(items) {
    tbody.innerHTML = "";
    const list = items && items.length ? items : [{}];
    list.forEach((item) => {
      tbody.appendChild(makeRow(item));
    });
    recomputeBudgetSummary();
    updateItineraryDateConstraints();
  }

  function getTripById(id) {
    return state.trips.find((t) => t.id === id) || null;
  }

  function deleteTrip(id) {
    const idx = state.trips.findIndex((t) => t.id === id);
    if (idx === -1) return;
    const wasCurrent = state.currentTripId === id;
    state.trips.splice(idx, 1);

    if (!state.trips.length) {
      state.currentTripId = null;
      clearCurrentTrip();
      renderItinerary([{}]);
    } else if (wasCurrent) {
      const next = state.trips[Math.max(0, idx - 1)];
      state.currentTripId = next.id;
      fillFormFromTrip(next);
    }

    saveTrips();
  }

  function renderTripsList() {
    tripListEl.innerHTML = "";
    const trips = state.trips || [];
    if (emptyEl) emptyEl.style.display = trips.length ? "none" : "";

    trips
      .slice()
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .forEach((trip) => {
        const li = document.createElement("li");
        li.className = "planner-trip-entry";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "planner-trip-btn" + (trip.id === state.currentTripId ? " planner-trip-btn-active" : "");
        btn.dataset.tripId = trip.id;

        const datesLabel = trip.startDate || trip.endDate
          ? [trip.startDate, trip.endDate].filter(Boolean).join(" → ")
          : (isFr ? "Dates flexibles" : "Flexible dates");

        btn.innerHTML = `
          <span class="planner-trip-title">${trip.title || (isFr ? "Voyage sans titre" : "Untitled trip")}</span>
          <span class="planner-trip-meta">${datesLabel}</span>
        `;

        btn.addEventListener("click", () => {
          selectTrip(trip.id);
        });

        const del = document.createElement("button");
        del.type = "button";
        del.className = "planner-trip-delete";
        del.setAttribute("aria-label", isFr ? "Supprimer ce voyage" : "Delete this trip");
        del.textContent = "×";
        del.addEventListener("click", (e) => {
          e.stopPropagation();
          const msg = isFr
            ? "Supprimer ce voyage ? Cette action ne peut pas être annulée dans ce navigateur."
            : "Delete this trip? This cannot be undone in this browser.";
          if (!window.confirm(msg)) return;
          deleteTrip(trip.id);
        });

        li.appendChild(btn);
        li.appendChild(del);
        tripListEl.appendChild(li);
      });
  }

  function fillFormFromTrip(trip) {
    const titleInput = form.elements.namedItem("title");
    const startInputEl = form.elements.namedItem("startDate");
    const endInputEl = form.elements.namedItem("endDate");

    if (titleInput) titleInput.value = (trip && trip.title) || "";
    if (startInputEl) startInputEl.value = (trip && trip.startDate) || "";
    if (endInputEl) endInputEl.value = (trip && trip.endDate) || "";

    renderItinerary(trip && Array.isArray(trip.itinerary) ? trip.itinerary : []);
    updateEndDateConstraint();
    updateItineraryDateConstraints();
  }

  function collectItineraryFromDom() {
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const items = [];
    const startLimit = (startInput && startInput.value ? startInput.value.trim() : "") || "";
    const endLimit = (endInputGlobal && endInputGlobal.value ? endInputGlobal.value.trim() : "") || "";
    rows.forEach((row) => {
      let date = row.querySelector('input[name="item-date"]')?.value?.trim() || "";
      const time = row.querySelector('input[name="item-time"]')?.value?.trim() || "";
      const place = row.querySelector('input[name="item-place"]')?.value?.trim() || "";
      const notes = row.querySelector('input[name="item-notes"]')?.value?.trim() || "";
      const kind = row.querySelector('select[name="item-kind"]')?.value || "";
      const costRaw = row.querySelector('input[name="item-cost"]')?.value || "";
      const flightType = row.querySelector('select[name="item-flight-type"]')?.value || "";
      const from = row.querySelector('input[name="item-from"]')?.value?.trim() || "";
      const to = row.querySelector('input[name="item-to"]')?.value?.trim() || "";
      if (startLimit && date && date < startLimit) {
        date = startLimit;
      }
      if (endLimit && date && date > endLimit) {
        date = endLimit;
      }
      const hasAny = date || time || place || notes || kind || costRaw || flightType || from || to;
      if (hasAny) {
        const costNum = costRaw && !Number.isNaN(Number(costRaw)) ? Number(costRaw) : null;
        items.push({ date, time, place, notes, kind, cost: costNum, flightType, from, to });
      }
    });
    return items;
  }

  function recomputeBudgetSummary() {
    if (!budgetSummaryEl) return;
    const items = collectItineraryFromDom();
    if (!items.length) {
      budgetSummaryEl.textContent = isFr
        ? "Aucun coût ajouté pour l’instant."
        : "No costs added yet.";
      return;
    }

    const labels = {
      flight: isFr ? "vols" : "flights",
      transport: isFr ? "transports" : "transport",
      accommodation: isFr ? "hébergement" : "accommodation",
      food: isFr ? "repas" : "food",
      activity: isFr ? "activités" : "activities",
      other: isFr ? "autre" : "other",
    };

    let total = 0;
    const byKind = {};

    items.forEach((item) => {
      if (item.cost == null || Number.isNaN(item.cost)) return;
      total += item.cost;
      const key = item.kind || "other";
      byKind[key] = (byKind[key] || 0) + item.cost;
    });

    if (!total) {
      budgetSummaryEl.textContent = isFr
        ? "Aucun coût ajouté pour l’instant."
        : "No costs added yet.";
      return;
    }

    const parts = Object.keys(byKind).map((kind) => {
      const label = labels[kind] || labels.other;
      return `${label}: ${byKind[kind].toFixed(2)}€`;
    });

    const totalText = `${isFr ? "Total estimé" : "Estimated total"}: ${total.toFixed(2)}€`;
    budgetSummaryEl.textContent = `${totalText} (${parts.join(", ")})`;
  }

  function buildSummaryText() {
    const titleInput = form.elements.namedItem("title");
    const startInputEl = form.elements.namedItem("startDate");
    const endInputEl = form.elements.namedItem("endDate");

    const title = (titleInput?.value || "").trim() || (isFr ? "Voyage sans titre" : "Untitled trip");
    const startDate = (startInputEl?.value || "").trim();
    const endDate = (endInputEl?.value || "").trim();
    const itinerary = collectItineraryFromDom();

    const now = new Date();
    const headerDate = now.toISOString().slice(0, 10);

    let total = 0;
    const byKind = {};
    const labelsShort = {
      flight: isFr ? "Flight" : "Flight",
      transport: isFr ? "Transport" : "Transport",
      accommodation: isFr ? "Accommodation" : "Accommodation",
      food: isFr ? "Food" : "Food",
      activity: isFr ? "Activity" : "Activity",
      other: isFr ? "Other" : "Other",
    };

    itinerary.forEach((item) => {
      if (item.cost == null || Number.isNaN(item.cost)) return;
      total += item.cost;
      const key = item.kind || "other";
      byKind[key] = (byKind[key] || 0) + item.cost;
    });

    const lines = [];
    lines.push(isFr ? "Trip summary" : "Trip summary");
    lines.push(`Date: ${headerDate}`);
    lines.push("");
    lines.push(`${isFr ? "Trip" : "Trip"}: ${title}`);
    if (startDate || endDate) {
      const range = [startDate, endDate].filter(Boolean).join(" → ");
      lines.push(`${isFr ? "Dates" : "Dates"}: ${range}`);
    }
    lines.push("");
    lines.push(isFr ? "Itinerary:" : "Itinerary:");

    if (!itinerary.length) {
      lines.push(isFr ? "  (no items yet)" : "  (no items yet)");
    } else {
      const tOneWay = isFr ? "aller simple" : "one way";
      const tRound = isFr ? "aller-retour" : "round trip";
      itinerary.forEach((item, idx) => {
        const date = item.date || "";
        const time = item.time || "";
        const kindLabel = labelsShort[item.kind] || labelsShort.other;
        const place = item.place || "";
        const notes = item.notes || "";
        const costText = item.cost != null && !Number.isNaN(item.cost) ? `${item.cost.toFixed(2)}€` : "";
        const from = item.from || "";
        const to = item.to || "";
        const flightType = item.flightType || "";

        const parts = [];
        if (date) parts.push(date);
        if (time) parts.push(time);
        parts.push(`[${kindLabel}]`);
        if (item.kind === "flight") {
          if (from || to) {
            let route = `${from || "?"} → ${to || "?"}`;
            const typeLabel = flightType === "roundtrip" ? tRound : flightType === "oneway" ? tOneWay : "";
            if (typeLabel) route += ` (${typeLabel})`;
            parts.push(route);
          } else if (place) {
            parts.push(place);
          }
        } else if (place) {
          parts.push(place);
        }
        if (costText) parts.push(costText);
        if (notes) parts.push(`- ${notes}`);

        lines.push(`${idx + 1}. ${parts.join(" ")}`);
      });
    }

    lines.push("");
    if (total) {
      lines.push(
        `${isFr ? "Estimated total" : "Estimated total"}: ${total.toFixed(2)}€`
      );
      const parts = Object.keys(byKind).map((kind) => {
        const label = labelsShort[kind] || labelsShort.other;
        return `${label}: ${byKind[kind].toFixed(2)}€`;
      });
      lines.push((isFr ? "By category: " : "By category: ") + parts.join(", "));
    } else {
      lines.push(isFr ? "No costs added yet." : "No costs added yet.");
    }

    return { text: lines.join("\n"), titleForFile: title };
  }

  function saveTrips() {
    writeTripsToStorage(state.trips);
    renderTripsList();
  }

  function selectTrip(id) {
    const trip = getTripById(id);
    if (!trip) return;
    state.currentTripId = id;
    fillFormFromTrip(trip);
    renderTripsList();
    updateMapPreview();
  }

  function clearCurrentTrip() {
    state.currentTripId = null;
    fillFormFromTrip(null);
    const titleInput = form.elements.namedItem("title");
    if (titleInput && typeof titleInput.focus === "function") titleInput.focus();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleInput = form.elements.namedItem("title");
    const endInput = form.elements.namedItem("endDate");

    const title = (titleInput?.value || "").trim();
    let startDate = (startInput?.value || "").trim();
    let endDate = (endInput?.value || "").trim();

    if (!title) {
      if (titleInput) {
        titleInput.focus();
        titleInput.classList.add("planner-input-error");
        titleInput.addEventListener(
          "input",
          () => titleInput.classList.remove("planner-input-error"),
          { once: true }
        );
      }
      return;
    }

    const itinerary = collectItineraryFromDom();

    // If dates are empty, infer them from itinerary (min/max item dates)
    if ((!startDate || !endDate) && itinerary.length) {
      const datesOnly = itinerary.map((it) => it.date).filter(Boolean).sort();
      if (datesOnly.length) {
        if (!startDate) startDate = datesOnly[0];
        if (!endDate) endDate = datesOnly[datesOnly.length - 1];
      }
    }

    // Enforce end date >= start date
    if (startDate && endDate && endDate < startDate) {
      endDate = startDate;
    }

    if (startInput) startInput.value = startDate;
    if (endInput) endInput.value = endDate;
    updateEndDateConstraint();
    const nowTs = Date.now();

    if (state.currentTripId) {
      const existing = getTripById(state.currentTripId);
      if (existing) {
        existing.title = title;
        existing.startDate = startDate;
        existing.endDate = endDate;
        existing.itinerary = itinerary;
        existing.updatedAt = nowTs;
      }
    } else {
      const newTrip = {
        id: createTripId(),
        title,
        startDate,
        endDate,
        itinerary,
        createdAt: nowTs,
        updatedAt: nowTs,
      };
      state.trips.push(newTrip);
      state.currentTripId = newTrip.id;
    }

    saveTrips();
  });

  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest(".planner-row-remove");
    if (!btn) return;
    const row = btn.closest("tr");
    if (row) row.remove();
    if (!tbody.querySelector("tr")) {
      renderItinerary([{}]);
    } else {
      recomputeBudgetSummary();
    }
  });

  tbody.addEventListener("change", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;
    if (e.target.name === "item-kind") {
      updateRowFlightVisibility(row);
    }
    recomputeBudgetSummary();
  });

  tbody.addEventListener("input", () => {
    recomputeBudgetSummary();
    updateMapPreview();
  });

  if (addItemBtn) {
    addItemBtn.addEventListener("click", () => {
      const rows = tbody.querySelectorAll("tr");
      let base = {};
      if (rows.length) {
        const last = rows[rows.length - 1];
        const kind = last.querySelector('select[name="item-kind"]')?.value || "";
        const place = last.querySelector('input[name="item-place"]')?.value?.trim() || "";
        const from = last.querySelector('input[name="item-from"]')?.value?.trim() || "";
        const to = last.querySelector('input[name="item-to"]')?.value?.trim() || "";
        const flightType = last.querySelector('select[name="item-flight-type"]')?.value || "";
        base.kind = kind;
        // For flights, chain legs: next FROM = previous TO
        if (kind === "flight") {
          base.from = to || from || "";
          base.flightType = flightType;
        }
        // Reuse place for convenience (can be overwritten by user)
        base.place = place;
      }
      tbody.appendChild(makeRow(base));
      const firstInput = tbody.lastElementChild && tbody.lastElementChild.querySelector("input, select");
      if (firstInput && typeof firstInput.focus === "function") firstInput.focus();
      updateItineraryDateConstraints();
      updateMapPreview();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearCurrentTrip();
      renderItinerary([{}]);
      updateMapPreview();
    });
  }

  if (newTripBtn) {
    newTripBtn.addEventListener("click", () => {
      clearCurrentTrip();
      renderItinerary([{}]);
      updateMapPreview();
    });
  }

  if (startInput) {
    startInput.addEventListener("change", () => {
      updateItineraryDateConstraints();
      updateEndDateConstraint();
      updateMapPreview();
    });
  }

  if (endInputGlobal) {
    endInputGlobal.addEventListener("change", () => {
      updateEndDateConstraint();
      updateItineraryDateConstraints();
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const titleInput = form.elements.namedItem("title");
      const title = (titleInput?.value || "").trim();
      if (!title) {
        if (titleInput && typeof titleInput.focus === "function") titleInput.focus();
      }
      const { text, titleForFile } = buildSummaryText();
      const filename = `${slugifyForFilename(titleForFile)}.txt`;
      downloadTextFile(filename, text);
    });
  }

  // Initial render
  renderTripsList();
  if (state.trips.length) {
    selectTrip(state.trips[0].id);
  } else {
    renderItinerary([{}]);
    updateMapPreview();
  }
}

