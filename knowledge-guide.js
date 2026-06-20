(function () {
  'use strict';

  function filteredSorted(state) {
    let list = ENTRIES;
    if (state.filter !== 'all') {
      list = list.filter(e => e.topic === state.filter);
    }
    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.topic.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.content.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      switch (state.sort) {
        case 'title-desc': return b.title.localeCompare(a.title);
        case 'topic':       return a.topic.localeCompare(b.topic) || a.title.localeCompare(b.title);
        default:            return a.title.localeCompare(b.title);
      }
    });
  }

  function badge(topic) {
    return `<span class="rh-badge" data-topic="${topic}">${topic}</span>`;
  }

  function renderItem(entry, isActive) {
    return `<li class="rh-item${isActive ? ' rh-item-active' : ''}" data-id="${entry.id}" role="option" aria-selected="${isActive}" tabindex="0">
      <div class="rh-item-top">
        <span class="rh-item-category">${entry.category}</span>
        ${badge(entry.topic)}
      </div>
      <div class="rh-item-title">${entry.title}</div>
      <div class="rh-item-meta">${entry.summary}</div>
    </li>`;
  }

  function renderDetail(e) {
    if (!e) {
      return `<p class="muted rh-detail-empty">Select an entry from the list to read more.</p>`;
    }
    const hi = e.highlights.map(h => `<li>${h}</li>`).join('');
    return `<div class="rh-detail-inner">
      <div class="rh-detail-head">
        ${badge(e.topic)}
        <h3 class="rh-detail-name">${e.title}</h3>
        <p class="muted rh-detail-sub">${e.category}</p>
      </div>
      <p class="rh-detail-summary">${e.summary}</p>
      <div class="rh-detail-row"><div class="rh-detail-label">More</div><p class="rh-detail-text">${e.content}</p></div>
      <div class="rh-detail-row"><div class="rh-detail-label">Key facts</div><ul class="rh-highlights">${hi}</ul></div>
    </div>`;
  }

  function initKnowledgeGuide(container) {
    const guide = container.querySelector('[data-role="knowledge-guide"]');
    if (!guide) return;

    const searchEl = guide.querySelector('[data-role="rh-search"]');
    const chipsEl  = guide.querySelector('[data-role="rh-chips"]');
    const sortEl   = guide.querySelector('[data-role="rh-sort"]');
    const countEl  = guide.querySelector('[data-role="rh-count"]');
    const listEl   = guide.querySelector('[data-role="rh-list"]');
    const detailEl = guide.querySelector('[data-role="rh-detail"]');

    const state = { search: '', filter: 'all', sort: 'title-asc', selected: null };

    function render() {
      const entries = filteredSorted(state);
      if (state.selected && !entries.find(e => e.id === state.selected)) state.selected = null;

      countEl.textContent = entries.length === 1 ? '1 entry' : `${entries.length} entries`;

      chipsEl.querySelectorAll('.rh-chip').forEach(chip => {
        const active = chip.dataset.filter === state.filter;
        chip.classList.toggle('rh-chip-active', active);
        chip.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      listEl.innerHTML = entries.length
        ? entries.map(e => renderItem(e, e.id === state.selected)).join('')
        : '<li class="rh-empty muted">No entries match your search.</li>';

      const sel = state.selected ? ENTRIES.find(e => e.id === state.selected) : null;
      detailEl.innerHTML = renderDetail(sel);
    }

    searchEl.addEventListener('input', () => { state.search = searchEl.value; render(); });

    chipsEl.addEventListener('click', e => {
      const chip = e.target.closest('.rh-chip');
      if (!chip) return;
      state.filter = chip.dataset.filter;
      render();
    });

    sortEl.addEventListener('change', () => { state.sort = sortEl.value; render(); });

    listEl.addEventListener('click', e => {
      const item = e.target.closest('.rh-item');
      if (!item) return;
      state.selected = item.dataset.id === state.selected ? null : item.dataset.id;
      render();
      if (window.innerWidth < 700) detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    listEl.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const item = e.target.closest('.rh-item');
      if (!item) return;
      e.preventDefault();
      state.selected = item.dataset.id === state.selected ? null : item.dataset.id;
      render();
    });

    render();
  }

  window.initKnowledgeGuide = initKnowledgeGuide;
})();
