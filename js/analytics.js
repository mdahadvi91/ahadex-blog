/**
 * TechJournal - Google Analytics (GA4) Tracker
 * Lightweight asynchronous wrapper ensuring zero render blocking
 */

(function () {
  'use strict';

  // Replace with your Google Analytics Measurement ID (e.g. 'G-XXXXXXXXXX')
  const GA_MEASUREMENT_ID = 'G-TECHJOURNAL26';

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
  });

  // Track article reading milestones (25%, 50%, 75%, 100%)
  let trackedMilestones = new Set();
  window.addEventListener('scroll', function () {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal <= 0) return;

    const percent = Math.round((window.scrollY / scrollTotal) * 100);
    [25, 50, 75, 100].forEach((milestone) => {
      if (percent >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        gtag('event', 'scroll_depth', {
          event_category: 'Engagement',
          event_label: `${milestone}% Read`,
          value: milestone,
        });
      }
    });
  }, { passive: true });

  console.info('[TechJournal Analytics] Tracker initialized with ID:', GA_MEASUREMENT_ID);
})();
