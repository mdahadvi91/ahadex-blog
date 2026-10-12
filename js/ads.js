/**
 * TechJournal - Google AdSense Script & Ad Placement Handler
 * Enforces strict Zero-CLS layout reservation prior to ad insertion
 */

(function () {
  'use strict';

  // Your Google AdSense Publisher ID (Matches ads.txt)
  const ADSENSE_CLIENT_ID = 'ca-pub-9283746152048173';

  // Initialize AdSense Script Asynchronously (deferred to avoid LCP delay)
  function loadAdSenseLibrary() {
    if (document.querySelector('script[src*="adsbygoogle.js"]')) return;

    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }

  // Populate pre-reserved ad containers with zero layout shift
  function mountAdSlots() {
    const slots = document.querySelectorAll('.ad-slot-wrapper');

    slots.forEach((slot, index) => {
      // Ensure layout geometry containment exists
      if (!slot.style.minHeight && !slot.classList.contains('ad-leaderboard') && !slot.classList.contains('ad-inline-rectangle')) {
        slot.style.minHeight = '100px';
      }

      // Avoid double mounting
      if (slot.getAttribute('data-ad-mounted') === 'true') return;
      slot.setAttribute('data-ad-mounted', 'true');

      // Create ins tag for Google AdSense
      const adIns = document.createElement('ins');
      adIns.className = 'adsbygoogle';
      adIns.style.display = 'block';
      adIns.style.width = '100%';
      adIns.style.height = '100%';
      adIns.setAttribute('data-ad-client', ADSENSE_CLIENT_ID);
      adIns.setAttribute('data-ad-slot', `102938${index + 1}`);
      adIns.setAttribute('data-ad-format', 'auto');
      adIns.setAttribute('data-full-width-responsive', 'true');

      slot.appendChild(adIns);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Suppress initial test-environment ad render warnings
      }
    });
  }

  // Delay ad library load slightly after first paint to maximize Lighthouse/PageSpeed score (100/100)
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      loadAdSenseLibrary();
      mountAdSlots();
    });
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadAdSenseLibrary();
        mountAdSlots();
      }, 1000);
    });
  }
})();
