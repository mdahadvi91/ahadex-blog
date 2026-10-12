/**
 * Ahadex Blog - Main Global Logic & Component Loader
 * Vanilla JavaScript (Zero dependencies, minimal runtime overhead)
 */

(function () {
  'use strict';

  // 1. Dynamic Component Loader
  async function loadComponents() {
    const componentPlaceholders = document.querySelectorAll('[data-component]');
    if (!componentPlaceholders.length) return;

    for (const el of componentPlaceholders) {
      const componentName = el.getAttribute('data-component');
      if (!componentName) continue;

      try {
        const response = await fetch(`/components/${componentName}.html`);
        if (response.ok) {
          const html = await response.text();
          el.innerHTML = html;
          document.dispatchEvent(new CustomEvent('component:loaded', { detail: { name: componentName, element: el } }));
        }
      } catch (err) {
        console.warn(`[Ahadex Blog] Error loading component: ${componentName}`, err);
      }
    }

    initNavigation();
    initTheme();
  }

  // 2. Navigation & Mobile Drawer
  function initNavigation() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileMenu');

    if (mobileBtn && mobileDrawer) {
      mobileBtn.onclick = function (e) {
        e.stopPropagation();
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', String(isOpen));
        mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
      };

      document.addEventListener('click', function (e) {
        if (!mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
          mobileDrawer.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', 'false');
          mobileDrawer.setAttribute('aria-hidden', 'true');
        }
      });
    }

    // Active link highlighting
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '/' && href === '/') || (href !== '/' && currentPath.startsWith(href))) {
        link.classList.add('active');
      }
    });
  }

  // 3. Theme Toggle (Light / Dark)
  function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const storedTheme = localStorage.getItem('ahadex_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }

    if (themeBtn) {
      themeBtn.onclick = function () {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('ahadex_theme', newTheme);
      };
    }
  }

  // 4. Reading Progress Bar
  function initReadingProgress() {
    const bar = document.querySelector('.reading-progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', function () {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const progress = (window.scrollY / scrollTotal) * 100;
        bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
      }
    }, { passive: true });
  }

  // 5. Code Copy Button Handler
  window.copyCodeBlock = function (btn) {
    const codeWrapper = btn.closest('.code-block-wrapper') || btn.closest('pre');
    if (!codeWrapper) return;
    const codeEl = codeWrapper.querySelector('code');
    if (!codeEl) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeEl.innerText).then(() => {
        const oldHtml = btn.innerHTML;
        btn.innerHTML = '<span>&check; Copied!</span>';
        setTimeout(() => { btn.innerHTML = oldHtml; }, 2000);
      });
    }
  };

  // 6. Global Handlers (Newsletter, Share, Copy Link)
  window.handleNewsletterSubmit = function (formEl) {
    const successMsg = document.getElementById('newsletterSuccess');
    if (successMsg) {
      successMsg.style.display = 'block';
      const input = formEl.querySelector('input[type="email"]');
      if (input) input.value = '';
    }
  };

  window.copyArticleLink = function () {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      const textSpan = document.getElementById('copyLinkText');
      if (textSpan) {
        const oldText = textSpan.innerText;
        textSpan.innerText = 'Copied!';
        setTimeout(() => { textSpan.innerText = oldText; }, 2000);
      }
    }
  };

  window.shareToX = function () {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');
  };

  window.shareToLinkedIn = function () {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  window.shareToWhatsApp = function () {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${document.title} - Read on Ahadex Blog: `);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank', 'noopener,noreferrer');
  };

  // Bootstrap when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    loadComponents();
    initReadingProgress();
  });
})();
