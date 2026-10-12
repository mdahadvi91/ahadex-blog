/**
 * TechJournal - Instant Client-Side Search Logic
 * Loads /data/search-index.json into memory for instant sub-millisecond querying
 */

(function () {
  'use strict';

  let searchIndex = null;
  let isFetchingIndex = false;

  async function loadSearchIndex() {
    if (searchIndex || isFetchingIndex) return searchIndex;
    isFetchingIndex = true;
    try {
      const res = await fetch('/data/search-index.json');
      if (res.ok) {
        searchIndex = await res.json();
      }
    } catch (err) {
      console.warn('[TechJournal Search] Failed loading search index:', err);
    } finally {
      isFetchingIndex = false;
    }
    return searchIndex;
  }

  function queryIndex(searchTerm) {
    if (!searchIndex || !searchTerm) return [];
    const normalized = searchTerm.toLowerCase().trim();
    if (!normalized) return [];

    const tokens = normalized.split(/\s+/);

    return searchIndex.filter((item) => {
      const corpus = `${item.title} ${item.excerpt} ${item.category} ${item.tags.join(' ')} ${item.keywords || ''}`.toLowerCase();
      return tokens.every((token) => corpus.includes(token));
    });
  }

  function renderResultItem(item) {
    return `
      <a href="${item.url}" class="search-result-item">
        <span class="result-item-cat">${item.category} &middot; ${item.readTime}</span>
        <h4 class="result-item-title">${item.title}</h4>
        <p class="result-item-excerpt">${item.excerpt}</p>
      </a>
    `;
  }

  // Bind Search Modal
  function bindModalSearch() {
    const triggerBtn = document.getElementById('searchTriggerBtn');
    const modalBackdrop = document.getElementById('searchModal');
    const closeBtn = document.getElementById('searchModalClose');
    const searchInput = document.getElementById('modalSearchInput');
    const resultsContainer = document.getElementById('modalSearchResults');

    function openModal() {
      if (!modalBackdrop) return;
      modalBackdrop.classList.add('open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      loadSearchIndex();
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 50);
      }
    }

    function closeModal() {
      if (!modalBackdrop) return;
      modalBackdrop.classList.remove('open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      if (searchInput) searchInput.value = '';
      if (resultsContainer) {
        resultsContainer.innerHTML = '<div class="search-empty-state">Type above to search articles instantly...</div>';
      }
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', function (e) {
        if (e.target === modalBackdrop) closeModal();
      });
    }

    // Ctrl+K / Cmd+K shortcut
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modalBackdrop && modalBackdrop.classList.contains('open')) {
          closeModal();
        } else {
          openModal();
        }
      } else if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });

    // Real-time input typing
    if (searchInput && resultsContainer) {
      searchInput.addEventListener('input', async function (e) {
        const val = e.target.value.trim();
        if (!val) {
          resultsContainer.innerHTML = '<div class="search-empty-state">Type above to search articles instantly...</div>';
          return;
        }

        await loadSearchIndex();
        const matches = queryIndex(val);

        if (matches.length > 0) {
          resultsContainer.innerHTML = matches.map(renderResultItem).join('');
        } else {
          resultsContainer.innerHTML = `<div class="search-empty-state">No matching articles found for "<strong>${val}</strong>". Try searching for "AI", "JavaScript", or "ChatGPT".</div>`;
        }
      });
    }

    // Quick tag buttons
    document.querySelectorAll('.quick-tag-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const q = this.getAttribute('data-query');
        if (searchInput && q) {
          searchInput.value = q;
          searchInput.dispatchEvent(new Event('input'));
        }
      });
    });
  }

  // Bind Dedicated Search Page (if present on /search/index.html)
  function bindPageSearch() {
    const pageInput = document.getElementById('pageSearchInput');
    const pageResults = document.getElementById('pageSearchResults');
    const pageCount = document.getElementById('pageResultsCount');
    if (!pageInput || !pageResults) return;

    loadSearchIndex();

    async function executeSearch() {
      const term = pageInput.value.trim();
      await loadSearchIndex();
      const results = term ? queryIndex(term) : (searchIndex || []);

      if (pageCount) {
        pageCount.textContent = `Showing ${results.length} article${results.length === 1 ? '' : 's'}`;
      }

      if (results.length > 0) {
        pageResults.innerHTML = results.map(renderResultItem).join('');
      } else {
        pageResults.innerHTML = `<div class="search-empty-state">No articles found matching "${term}".</div>`;
      }
    }

    pageInput.addEventListener('input', executeSearch);

    // Read URL query parameter ?q=...
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
      pageInput.value = initialQuery;
      executeSearch();
    } else {
      executeSearch();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindModalSearch();
    bindPageSearch();
  });

  // Re-bind when components are dynamically injected
  document.addEventListener('component:loaded', function (e) {
    if (e.detail.name === 'header' || e.detail.name === 'search') {
      bindModalSearch();
    }
  });
})();
