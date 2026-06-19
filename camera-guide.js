(function () {
  'use strict';

  /* megapixels = 0  →  film camera (display "35mm Film" instead of MP) */

  /* ── Helpers ── */
  function fmt(price) {
    return '$' + price.toLocaleString('en-US');
  }

  function mpDisplay(c) {
    return c.megapixels > 0 ? c.megapixels + 'MP' : '35mm Film';
  }

  function mpDisplayDetail(c) {
    return c.megapixels > 0 ? c.megapixels + ' MP' : '35mm Film';
  }

  function filteredSorted(state) {
    let list = CAMERAS;
    if (state.filter !== 'all') {
      list = list.filter(c => c.type === state.filter);
    }
    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter(c =>
        c.brand.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.sensor.toLowerCase().includes(q) ||
        c.mount.toLowerCase().includes(q) ||
        String(c.year).includes(q)
      );
    }
    return [...list].sort((a, b) => {
      switch (state.sort) {
        case 'year-asc':   return a.year - b.year;
        case 'price-asc':  return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'mp-desc':    return b.megapixels - a.megapixels;
        default:           return b.year - a.year;
      }
    });
  }

  function badge(type) {
    return `<span class="cam-badge" data-type="${type}">${type}</span>`;
  }

  function renderItem(camera, isActive) {
    return `<li class="cam-item${isActive ? ' cam-item-active' : ''}" data-id="${camera.id}" role="option" aria-selected="${isActive}" tabindex="0">
      <div class="cam-item-top">
        <span class="cam-item-brand">${camera.brand}</span>
        ${badge(camera.type)}
      </div>
      <div class="cam-item-model">${camera.name}</div>
      <div class="cam-item-meta">${camera.year} · ${mpDisplay(camera)} · ${fmt(camera.price)}</div>
    </li>`;
  }

  function renderDetail(c) {
    if (!c) {
      return `<p class="muted cam-detail-empty">Select a camera from the list to view its full specifications.</p>`;
    }
    const hi = c.highlights.map(h => `<li>${h}</li>`).join('');
    return `<div class="cam-detail-inner">
      <div class="cam-detail-head">
        ${badge(c.type)}
        <h3 class="cam-detail-name">${c.brand} ${c.name}</h3>
        <p class="muted cam-detail-sub">${c.sensor} · ${c.year} · ${c.mount}</p>
      </div>
      <div class="cam-specs-grid">
        <div class="cam-spec"><div class="cam-spec-label">Resolution</div><div class="cam-spec-val">${mpDisplayDetail(c)}</div></div>
        <div class="cam-spec"><div class="cam-spec-label">ISO range</div><div class="cam-spec-val">${c.iso}</div></div>
        <div class="cam-spec"><div class="cam-spec-label">Burst</div><div class="cam-spec-val">${c.burst}</div></div>
        <div class="cam-spec"><div class="cam-spec-label">Weight</div><div class="cam-spec-val">${c.weight} g</div></div>
        <div class="cam-spec"><div class="cam-spec-label">Launch price</div><div class="cam-spec-val">${fmt(c.price)}</div></div>
        <div class="cam-spec"><div class="cam-spec-label">Stabilization</div><div class="cam-spec-val">${c.stabilization}</div></div>
      </div>
      <div class="cam-detail-row"><div class="cam-detail-label">Autofocus</div><p class="cam-detail-text">${c.autofocus}</p></div>
      <div class="cam-detail-row"><div class="cam-detail-label">Video</div><p class="cam-detail-text">${c.video}</p></div>
      <div class="cam-detail-row"><div class="cam-detail-label">About</div><p class="cam-detail-text">${c.description}</p></div>
      <div class="cam-detail-row"><div class="cam-detail-label">Key features</div><ul class="cam-highlights">${hi}</ul></div>
    </div>`;
  }

  /* ── Init ── */
  function initCameraGuide(container) {
    const guide = container.querySelector('[data-role="camera-guide"]');
    if (!guide) return;

    const searchEl = guide.querySelector('[data-role="cam-search"]');
    const chipsEl  = guide.querySelector('[data-role="cam-chips"]');
    const sortEl   = guide.querySelector('[data-role="cam-sort"]');
    const countEl  = guide.querySelector('[data-role="cam-count"]');
    const listEl   = guide.querySelector('[data-role="cam-list"]');
    const detailEl = guide.querySelector('[data-role="cam-detail"]');

    const state = { search: '', filter: 'all', sort: 'year-desc', selected: null };

    function render() {
      const cameras = filteredSorted(state);
      if (state.selected && !cameras.find(c => c.id === state.selected)) state.selected = null;

      countEl.textContent = cameras.length === 1 ? '1 camera' : `${cameras.length} cameras`;

      chipsEl.querySelectorAll('.cam-chip').forEach(chip => {
        const active = chip.dataset.filter === state.filter;
        chip.classList.toggle('cam-chip-active', active);
        chip.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      listEl.innerHTML = cameras.length
        ? cameras.map(c => renderItem(c, c.id === state.selected)).join('')
        : '<li class="cam-empty muted">No cameras match your search.</li>';

      const sel = state.selected ? CAMERAS.find(c => c.id === state.selected) : null;
      detailEl.innerHTML = renderDetail(sel);
    }

    searchEl.addEventListener('input', () => { state.search = searchEl.value; render(); });

    chipsEl.addEventListener('click', e => {
      const chip = e.target.closest('.cam-chip');
      if (!chip) return;
      state.filter = chip.dataset.filter;
      render();
    });

    sortEl.addEventListener('change', () => { state.sort = sortEl.value; render(); });

    listEl.addEventListener('click', e => {
      const item = e.target.closest('.cam-item');
      if (!item) return;
      state.selected = item.dataset.id === state.selected ? null : item.dataset.id;
      render();
      if (window.innerWidth < 700) detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    listEl.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const item = e.target.closest('.cam-item');
      if (!item) return;
      e.preventDefault();
      state.selected = item.dataset.id === state.selected ? null : item.dataset.id;
      render();
    });

    render();
  }

  window.initCameraGuide = initCameraGuide;
})();
