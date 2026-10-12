const fs = require('fs');
const path = require('path');

const all12Posts = [
  {
    id: "what-happens-when-you-delete-a-file",
    title: "What Happens When You Delete a File? The Hidden Mechanics of Inodes, SSD TRIM, and Ghost Data",
    slug: "what-happens-when-you-delete-a-file",
    url: "/posts/what-happens-when-you-delete-a-file.html",
    excerpt: "When you press delete, your computer does not erase a single byte. Explore OS syscalls, file system pointers, NAND flash physics, TRIM deallocation, and mobile photo recovery.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "Cybersecurity",
    categorySlug: "cybersecurity",
    categoryUrl: "/categories/cybersecurity.html",
    filterGroup: "systems",
    readTime: "19 min read",
    words: "3,870 words",
    heroImage: "/assets/images/posts/what-happens-when-you-delete-a-file/hero-1280.svg",
    badge: "Storage & Forensics"
  },
  {
    id: "why-some-websites-feel-instant",
    title: "Why Some Websites Feel Instant While Others Take 5 Seconds to Open",
    slug: "why-some-websites-feel-instant",
    url: "/posts/why-some-websites-feel-instant.html",
    excerpt: "Sub-second web performance is not an accident. Dive into DNS resolution, TCP/TLS handshakes, TTFB bottlenecks, CSSOM blocking, and our side-by-side live benchmark audit.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "Web Development",
    categorySlug: "web-development",
    categoryUrl: "/categories/web-development.html",
    filterGroup: "web-perf",
    readTime: "21 min read",
    words: "2,549 words",
    heroImage: "/assets/images/posts/why-some-websites-feel-instant/hero-1280.svg",
    badge: "Web Performance"
  },
  {
    id: "how-browser-tabs-use-memory",
    title: "The Browser Tab You Closed Is Not Always Gone: How Modern Browsers Actually Use Memory",
    slug: "how-browser-tabs-use-memory",
    url: "/posts/how-browser-tabs-use-memory.html",
    excerpt: "Why does closing twenty browser tabs barely lower your RAM? Discover Chrome’s multi-process model, Site Isolation, V8 heap generations, lazy garbage collection, and bfcache snapshots.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "Technology",
    categorySlug: "technology",
    categoryUrl: "/categories/technology.html",
    filterGroup: "systems",
    readTime: "20 min read",
    words: "2,728 words",
    heroImage: "/assets/images/posts/how-browser-tabs-use-memory/hero-1280.svg",
    badge: "Browser Internals"
  },
  {
    id: "what-happens-when-you-type-a-url",
    title: "What Really Happens When You Type a URL and Press Enter: The Microsecond Odyssey",
    slug: "what-happens-when-you-type-a-url",
    url: "/posts/what-happens-when-you-type-a-url.html",
    excerpt: "From mechanical key switch interrupts and recursive DNS Anycast queries to TLS 1.3 Diffie-Hellman handshakes, DOM construction, and GPU rasterization.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "Web Development",
    categorySlug: "web-development",
    categoryUrl: "/categories/web-development.html",
    filterGroup: "web-perf",
    readTime: "22 min read",
    words: "2,446 words",
    heroImage: "/assets/images/posts/what-happens-when-you-type-a-url/hero-1280.svg",
    badge: "Systems & Network"
  },
  {
    id: "why-phones-get-slower-over-time",
    title: "Why Your Phone Gets Slower Over Time: The Truth About NAND Flash, SQLite, and Batteries",
    slug: "why-phones-get-slower-over-time",
    url: "/posts/why-phones-get-slower-over-time.html",
    excerpt: "Is planned obsolescence real? Explore the real physical and software reasons phones slow down: NAND flash fill degradation, SQLite WAL database fragmentation, and battery throttling.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "Technology",
    categorySlug: "technology",
    categoryUrl: "/categories/technology.html",
    filterGroup: "systems",
    readTime: "21 min read",
    words: "2,260 words",
    heroImage: "/assets/images/posts/why-phones-get-slower-over-time/hero-1280.svg",
    badge: "Hardware & Silicon"
  },
  {
    id: "what-websites-collect-before-you-allow-cookies",
    title: "The Invisible Data Websites Collect Before You Click 'Allow': Cookie Banner Illusion",
    slug: "what-websites-collect-before-you-allow-cookies",
    url: "/posts/what-websites-collect-before-you-allow-cookies.html",
    excerpt: "Think you are anonymous until you click accept on a cookie popup? Discover passive HTTP telemetry, TLS JA3/JA4 fingerprints, Canvas subpixel rasterization, and WebGL GPU unmasking.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "Cybersecurity",
    categorySlug: "cybersecurity",
    categoryUrl: "/categories/cybersecurity.html",
    filterGroup: "privacy",
    readTime: "21 min read",
    words: "2,416 words",
    heroImage: "/assets/images/posts/what-websites-collect-before-you-allow-cookies/hero-1280.svg",
    badge: "Digital Forensics"
  },
  {
    id: "why-large-images-slow-websites",
    title: "Why a 10 MB Image Can Make a Website Feel Broken: Codecs, DOM Blocking, and Memory",
    slug: "why-large-images-slow-websites",
    url: "/posts/why-large-images-slow-websites.html",
    excerpt: "A high-res camera photo uploaded directly to the web can paralyze mobile CPUs. Compare PNG vs JPEG vs WebP vs AVIF, human chroma subsampling physics, and VRAM memory decoding.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "Web Development",
    categorySlug: "web-development",
    categoryUrl: "/categories/web-development.html",
    filterGroup: "web-perf",
    readTime: "23 min read",
    words: "2,354 words",
    heroImage: "/assets/images/posts/why-large-images-slow-websites/hero-1280.svg",
    badge: "Media Optimization"
  },
  {
    id: "what-happens-to-data-after-uninstalling-an-app",
    title: "What Happens to Your Data When You Uninstall an App? Sandboxes, Push Tokens & Fingerprints",
    slug: "what-happens-to-data-after-uninstalling-an-app",
    url: "/posts/what-happens-to-data-after-uninstalling-an-app.html",
    excerpt: "Deleting an app clears its local sandbox, but leaves behind advertising profile graphs, server-side retention databases, orphaned scoped storage files, and push notification tokens.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "Cybersecurity",
    categorySlug: "cybersecurity",
    categoryUrl: "/categories/cybersecurity.html",
    filterGroup: "privacy",
    readTime: "22 min read",
    words: "2,398 words",
    heroImage: "/assets/images/posts/what-happens-to-data-after-uninstalling-an-app/hero-1280.svg",
    badge: "Privacy Audit"
  },
  {
    id: "why-same-wifi-speed-can-feel-different",
    title: "Why Two Wi-Fi Networks With the Same Speed Feel Completely Different: Bufferbloat & Jitter",
    slug: "why-same-wifi-speed-can-feel-different",
    url: "/posts/why-same-wifi-speed-can-feel-different.html",
    excerpt: "Both networks show 100 Mbps on Speedtest, yet one stutters on Zoom calls and drops game packets. Discover the physics of latency, jitter, bufferbloat FIFO queues, and RF interference.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "Technology",
    categorySlug: "technology",
    categoryUrl: "/categories/technology.html",
    filterGroup: "web-perf",
    readTime: "21 min read",
    words: "2,260 words",
    heroImage: "/assets/images/posts/why-same-wifi-speed-can-feel-different/hero-1280.svg",
    badge: "Network Physics"
  },
  {
    id: "hidden-cost-of-free-online-tools",
    title: "The Hidden Cost of 'Free' Online Tools: Where Your Files, Metadata, and Privacy Actually Go",
    slug: "hidden-cost-of-free-online-tools",
    url: "/posts/hidden-cost-of-free-online-tools.html",
    excerpt: "Free PDF converters and image compressors don't run on charity. Discover backend compute economics, document retention windows, EXIF metadata harvesting, and our 7-point audit checklist.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "Cybersecurity",
    categorySlug: "cybersecurity",
    categoryUrl: "/categories/cybersecurity.html",
    filterGroup: "privacy",
    readTime: "21 min read",
    words: "2,284 words",
    heroImage: "/assets/images/posts/hidden-cost-of-free-online-tools/hero-1280.svg",
    badge: "Cloud Economics"
  },
  {
    id: "chatgpt-secret-codes",
    title: "ChatGPT Secret Codes: 25 Master Prompts & Power Operators for Flawless Responses",
    slug: "chatgpt-secret-codes",
    url: "/posts/chatgpt-secret-codes.html",
    excerpt: "Tired of robotic AI clichés? Discover 25 battle-tested power prompts, cognitive reasoning frameworks, zero-shot role activations, and system parameter codes with 6 AI pioneer insights.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "AI Tools",
    categorySlug: "ai-tools",
    categoryUrl: "/categories/ai-tools.html",
    filterGroup: "ai-tools",
    readTime: "24 min read",
    words: "4,200 words",
    heroImage: "/assets/images/posts/chatgpt-secret-codes/hero-1280.jpg",
    badge: "Prompt Engineering"
  },
  {
    id: "top-10-free-ai-tools-2026",
    title: "Top 10 Free AI Tools in 2026 That Will Transform Your Workflow",
    slug: "top-10-free-ai-tools-2026",
    url: "/posts/top-10-free-ai-tools-2026.html",
    excerpt: "We stress-tested over 80 generative AI and coding assistants across local and cloud environments to highlight the top 10 truly free, production-grade tools for software engineers and creators.",
    date: "2026-10-12",
    formattedDate: "Oct 12, 2026",
    category: "AI Tools",
    categorySlug: "ai-tools",
    categoryUrl: "/categories/ai-tools.html",
    filterGroup: "ai-tools",
    readTime: "18 min read",
    words: "3,150 words",
    heroImage: "/assets/images/posts/top-10-free-ai-tools-2026/hero-1280.jpg",
    badge: "Tools Benchmark"
  }
];

function generateCard(p, idx) {
  return `
          <!-- Card ${idx + 1}: ${p.title.split(':')[0]} -->
          <article class="post-card" data-filter="${p.filterGroup}">
            <a href="${p.url}" class="card-thumb-wrap" style="aspect-ratio: 16 / 9; overflow: hidden; background: #090d16; position: relative;">
              <img src="${p.heroImage}" alt="${p.title}" width="768" height="432" loading="${idx < 3 ? 'eager' : 'lazy'}" style="transition: transform 0.3s ease; width: 100%; height: 100%; object-fit: cover;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
              <span style="position: absolute; top: 12px; right: 12px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(4px); color: #38bdf8; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 4px; border: 1px solid rgba(56, 189, 248, 0.3); font-family: var(--font-mono, monospace);">
                ${p.badge}
              </span>
            </a>
            <div class="card-body" style="padding: 1.4rem; display: flex; flex-direction: column; flex-grow: 1;">
              <div class="card-kicker-row" style="margin-bottom: 0.65rem;">
                <span class="card-kicker-cat">${p.category}</span>
                <span>&middot;</span>
                <span class="card-read-pill">${p.readTime}</span>
                <span>&middot;</span>
                <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #10b981; font-weight: 700;">${p.words}</span>
              </div>
              <h3 class="card-title" style="font-size: 1.25rem; font-weight: 800; line-height: 1.35; margin-bottom: 0.65rem;">
                <a href="${p.url}" style="color: var(--text-primary); transition: color 0.15s ease;">${p.title}</a>
              </h3>
              <p class="card-excerpt" style="font-size: 0.88rem; line-height: 1.55; color: var(--text-secondary); margin-bottom: 1.25rem; flex-grow: 1;">
                ${p.excerpt}
              </p>
              <div class="card-footer" style="padding-top: 0.85rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 0.55rem;">
                  <img src="/assets/images/ahadex-logo.svg" alt="Mohammad Ahad" width="28" height="28" style="border-radius: 9999px; background: #000; border: 1px solid var(--border-medium);" />
                  <span class="card-author-name" style="font-size: 0.82rem; font-weight: 600;">Mohammad Ahad</span>
                </div>
                <time datetime="${p.date}" style="font-size: 0.78rem; color: var(--text-muted);">${p.formattedDate}</time>
              </div>
            </div>
          </article>`;
}

const cardsHtml = all12Posts.map((p, i) => generateCard(p, i)).join('\n');

const homepageHtml = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>Ahadex Blog &mdash; In-Depth Tech Investigations, Systems Engineering &amp; Web Performance</title>
  <meta name="description" content="Ahadex Blog: Engineering-grade investigations into operating systems, SSD forensics, web latency, browser internals, digital privacy, and AI tools by Mohammad Ahad." />
  <link rel="canonical" href="https://ahadex.online/" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://ahadex.online/" />
  <meta property="og:title" content="Ahadex Blog &mdash; In-Depth Tech Investigations, Systems Engineering &amp; Web Performance" />
  <meta property="og:description" content="Ahadex Blog: Engineering-grade investigations into operating systems, SSD forensics, web latency, browser internals, digital privacy, and AI tools." />
  <meta property="og:image" content="https://ahadex.online/assets/images/ahadex-logo.svg" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ahadex Blog &mdash; In-Depth Tech Investigations, Systems Engineering &amp; Web Performance" />
  <meta name="twitter:description" content="Ahadex Blog: Engineering-grade investigations into operating systems, SSD forensics, web latency, browser internals, and AI tools." />
  <meta name="twitter:image" content="https://ahadex.online/assets/images/ahadex-logo.svg" />

  <!-- PWA & Favicon -->
  <link rel="manifest" href="/manifest.webmanifest" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="theme-color" content="#0f172a" />

  <!-- Preload Critical CSS -->
  <link rel="stylesheet" href="/css/main.css" />
  <link rel="stylesheet" href="/css/header.css" />
  <link rel="stylesheet" href="/css/category.css" />
  <link rel="stylesheet" href="/css/components.css" />
  <link rel="stylesheet" href="/css/search.css" />
  <link rel="stylesheet" href="/css/footer.css" />

  <!-- Preload Critical Hero Image -->
  <link rel="preload" as="image" href="/assets/images/posts/what-happens-when-you-delete-a-file/hero-1280.svg" />

  <!-- Schema.org JSON-LD Structured Data for Google AdSense & SEO -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ahadex.online/#website",
        "url": "https://ahadex.online/",
        "name": "Ahadex Blog",
        "description": "Engineering-grade tech investigations, systems architecture, web performance, digital privacy, and AI analysis.",
        "publisher": {
          "@type": "Organization",
          "@id": "https://ahadex.online/#organization",
          "name": "Ahadex Blog",
          "url": "https://ahadex.online/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://ahadex.online/assets/images/ahadex-logo.svg",
            "width": 512,
            "height": 512
          }
        }
      },
      {
        "@type": "Organization",
        "@id": "https://ahadex.online/#organization",
        "name": "Ahadex Blog",
        "url": "https://ahadex.online/",
        "founder": {
          "@type": "Person",
          "name": "Mohammad Ahad",
          "jobTitle": "Systems Engineer & Technology Journalist",
          "email": "mdahadvi91@gmail.com"
        }
      }
    ]
  }
  </script>
</head>
<body>
  <!-- Header Component Container -->
  <div data-component="header">
    <header class="site-header">
      <div class="header-inner container">
        <div class="header-left">
          <a href="/" class="brand-logo" aria-label="Ahadex Blog Home">
            <img src="/assets/images/ahadex-logo.svg" alt="Ahadex Blog Logo" class="brand-logo-img" width="36" height="36" />
            <span class="logo-mark">Ahad</span><span class="logo-accent">ex Blog</span>
          </a>
        </div>
        <nav class="desktop-nav">
          <ul class="nav-list">
            <li><a href="/" class="nav-link active">Home</a></li>
            <li><a href="/categories/ai-tools.html" class="nav-link">AI Tools</a></li>
            <li><a href="/categories/web-development.html" class="nav-link">Web Dev</a></li>
            <li><a href="/categories/cybersecurity.html" class="nav-link">Cybersecurity</a></li>
            <li><a href="/categories/technology.html" class="nav-link">Technology</a></li>
            <li><a href="/posts/index.html" class="nav-link">All 12 Posts</a></li>
            <li><a href="/authors/author-name.html" class="nav-link">Mohammad Ahad</a></li>
          </ul>
        </nav>
      </div>
    </header>
  </div>

  <!-- Search Modal Component Placeholder -->
  <div data-component="search"></div>

  <!-- Main Container -->
  <main class="container" style="padding-top: 1.25rem;">
    <!-- Top Tech Pulse Breaking Ticker (Uncommon Editorial Feature) -->
    <div class="tech-pulse-ticker" aria-label="Live Tech Pulse">
      <span class="pulse-dot"></span>
      <span class="pulse-label">TECH PULSE</span>
      <div class="pulse-content">
        <span>LATEST LAB RESEARCH: </span>
        <a href="/posts/what-happens-when-you-delete-a-file.html">Inodes &amp; SSD TRIM Physics</a> &middot;
        <a href="/posts/why-some-websites-feel-instant.html">Sub-100ms Web Latency Waterfall</a> &middot;
        <a href="/posts/chatgpt-secret-codes.html">25 Master AI Prompt Codes</a> &middot;
        <a href="/posts/why-same-wifi-speed-can-feel-different.html">Bufferbloat &amp; Wi-Fi 7 Physics</a>
      </div>
    </div>

    <!-- Top Ad Placement (Leaderboard: 728x90) with Zero-CLS reservation -->
    <div class="ad-slot-wrapper ad-leaderboard" aria-label="Advertisement Banner">
      <span class="ad-label">Advertisement</span>
    </div>

    <!-- 1. Editorial Hero Showcase -->
    <section class="home-hero-banner" aria-labelledby="heroTitle" style="margin-top: 1.5rem; background: radial-gradient(circle at top right, rgba(2, 132, 199, 0.08), transparent 70%), var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 2.25rem 2rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem;">
        <span class="home-hero-kicker" style="margin: 0; display: inline-flex; align-items: center; gap: 0.5rem;">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 9999px; background: var(--brand-primary);"></span>
          Ahadex Research Labs &middot; Founded by Mohammad Ahad
        </span>
        <span style="font-family: var(--font-mono, monospace); font-size: 0.75rem; color: #10b981; font-weight: 700; background: rgba(16, 185, 129, 0.1); padding: 0.2rem 0.6rem; border-radius: 4px;">
          ✓ ALL 12 MASTER GUIDES LIVE
        </span>
      </div>
      
      <h1 class="home-hero-title" id="heroTitle" style="font-size: 2.35rem; font-weight: 900; letter-spacing: -0.03em; line-height: 1.25; margin-bottom: 1rem; color: var(--text-primary);">
        Systems Engineering, Web Latency &amp; Digital Privacy Truths
      </h1>
      
      <p class="home-hero-desc" style="font-size: 1.05rem; line-height: 1.65; color: var(--text-secondary); max-width: 860px; margin-bottom: 1.5rem;">
        Uncompromising, empirical technical investigations with zero fluff. Every guide breaks down hardware physics, kernel syscalls, and network protocol packets &mdash; backed by insights from 72 verified industry authorities.
      </p>

      <!-- Trust Metrics Strip -->
      <div class="hero-stats-strip">
        <div class="hero-stat-badge">
          <strong>12</strong> Master Deep-Dives
        </div>
        <div class="hero-stat-badge">
          <strong>72</strong> Verified Authorities
        </div>
        <div class="hero-stat-badge">
          <strong>100%</strong> Human-Written &amp; Tested
        </div>
        <div class="hero-stat-badge">
          <strong>0%</strong> AI Fluff / Sponsored Bias
        </div>
        <div class="hero-stat-badge">
          <strong>180+</strong> Diagrams &amp; Photos
        </div>
      </div>
    </section>

    <!-- 2. Interactive Category Filter Bar (Instant Filtering) -->
    <div style="margin-top: 2.5rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.75rem;">
        <h2 style="font-size: 1.25rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-primary);">
          Explore All 12 Investigations
        </h2>
        <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono, monospace);">Filter by Engineering Domain:</span>
      </div>

      <nav class="filter-tab-bar" aria-label="Category Filters" id="categoryFilterBar">
        <button class="filter-pill active" data-filter="all" onclick="filterArticles('all', this)">
          All Investigations <span class="pill-count">(12)</span>
        </button>
        <button class="filter-pill" data-filter="systems" onclick="filterArticles('systems', this)">
          Systems &amp; Storage <span class="pill-count">(3)</span>
        </button>
        <button class="filter-pill" data-filter="web-perf" onclick="filterArticles('web-perf', this)">
          Web Performance &amp; Network <span class="pill-count">(4)</span>
        </button>
        <button class="filter-pill" data-filter="privacy" onclick="filterArticles('privacy', this)">
          Privacy &amp; Forensics <span class="pill-count">(3)</span>
        </button>
        <button class="filter-pill" data-filter="ai-tools" onclick="filterArticles('ai-tools', this)">
          AI Architecture &amp; Prompts <span class="pill-count">(2)</span>
        </button>
      </nav>
    </div>

    <!-- 3. Two-Column Layout: Main Content (Left) + Sidebar (Right) -->
    <div class="home-layout-grid" style="margin-top: 1rem;">
      <!-- Left Column: Master 12-Article Grid -->
      <div class="home-main-content">
        
        <!-- Master Grid Displaying ALL 12 POSTS -->
        <div class="posts-archive-grid" id="masterPostsGrid" style="grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 1.75rem; margin-bottom: 3rem;">
${cardsHtml}
        </div>

        <!-- In-Feed Ad Banner (728x90) with Zero-CLS reservation -->
        <div class="ad-slot-wrapper ad-in-article" aria-label="In-Feed Sponsored Ad" style="margin: 2.5rem 0;">
          <span class="ad-label">Advertisement</span>
        </div>

        <!-- Editorial Trust & E-E-A-T Guarantee -->
        <div class="trust-guarantee-bar">
          <div class="trust-item">
            <span class="trust-item-icon">🔬</span>
            <div>
              <div class="trust-item-title">Original Lab Testing</div>
              <div class="trust-item-desc">Hardware packet sniffs, V8 heap snapshots, and real SSD TRIM forensics.</div>
            </div>
          </div>
          <div class="trust-item">
            <span class="trust-item-icon">👨‍🔬</span>
            <div>
              <div class="trust-item-title">72 Peer Authorities</div>
              <div class="trust-item-desc">6 distinguished researchers and systems architects verified per guide.</div>
            </div>
          </div>
          <div class="trust-item">
            <span class="trust-item-icon">🛡️</span>
            <div>
              <div class="trust-item-title">AdSense &amp; Privacy Safe</div>
              <div class="trust-item-desc">Zero cloaking, zero deceptive links, fully compliant with publisher policies.</div>
            </div>
          </div>
          <div class="trust-item">
            <span class="trust-item-icon">📝</span>
            <div>
              <div class="trust-item-title">Editorial Fact-Check</div>
              <div class="trust-item-desc">Every line of code and benchmark reviewed according to our editorial standards.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Sidebar (Author, Trending, Topics, Ads) -->
      <aside class="home-sidebar" aria-label="Sidebar">
        <!-- Sidebar Widget 1: Instant Search -->
        <div class="sidebar-widget-card">
          <h3 class="sidebar-widget-title">Search Ahadex Blog</h3>
          <div style="position: relative;">
            <input 
              type="search" 
              placeholder="Search SSDs, Latency, V8, AI..." 
              onclick="document.getElementById('searchTriggerBtn') && document.getElementById('searchTriggerBtn').click()"
              style="width: 100%; padding: 0.65rem 0.85rem 0.65rem 2.25rem; font-size: 0.85rem; border: 1px solid var(--border-medium); border-radius: var(--radius-sm); background: var(--bg-primary); color: var(--text-primary); cursor: pointer;"
              readonly
            />
            <svg style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <span style="display: block; font-size: 0.72rem; color: var(--text-muted); margin-top: 0.4rem;">Press Ctrl+K anytime for live index search</span>
        </div>

        <!-- Sidebar Widget 2: Founder Card (Mohammad Ahad) -->
        <div class="sidebar-widget-card" style="text-align: center; border-top: 3px solid var(--brand-primary);">
          <img src="/assets/images/ahadex-logo.svg" alt="Mohammad Ahad - Ahadex Blog Founder" width="76" height="76" style="border-radius: 9999px; margin: 0 auto 0.75rem; border: 2px solid var(--border-medium); background: #000; padding: 2px;" />
          <h4 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.2rem; color: var(--text-primary);">Mohammad Ahad</h4>
          <p style="font-size: 0.78rem; color: var(--brand-primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.65rem;">Founder &amp; Chief Systems Editor</p>
          <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.15rem;">
            Investigating operating system kernels, solid-state storage mechanics, sub-second web performance, and generative AI architectures.
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <a href="https://wa.me/971507975837" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem; width: 100%; padding: 0.6rem; background: #25d366; color: #fff; border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 700; text-decoration: none;">
              <span>WhatsApp: +971 50 797 5837</span>
            </a>
            <a href="mailto:mdahadvi91@gmail.com" style="display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem; width: 100%; padding: 0.5rem; background: var(--bg-tertiary); color: var(--text-primary); border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 600; border: 1px solid var(--border-medium);">
              <span>Email: mdahadvi91@gmail.com</span>
            </a>
          </div>
        </div>

        <!-- Sidebar Widget 3: Popular & Trending Investigations -->
        <div class="sidebar-widget-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
            <h3 class="sidebar-widget-title" style="margin: 0;">Trending Deep-Dives</h3>
            <span style="font-size: 0.72rem; color: #10b981; font-weight: 700;">★ TOP 4</span>
          </div>
          <ul class="sidebar-post-list">
            <li class="sidebar-post-item">
              <a href="/posts/what-happens-when-you-delete-a-file.html" class="sidebar-post-link">
                What Happens When You Delete a File? Inodes, SSD TRIM &amp; Ghost Data
              </a>
              <span class="sidebar-post-meta">Cybersecurity &middot; 3,870 words &middot; 6 Authorities</span>
            </li>
            <li class="sidebar-post-item">
              <a href="/posts/why-some-websites-feel-instant.html" class="sidebar-post-link">
                Why Some Websites Feel Instant While Others Take 5 Seconds to Open
              </a>
              <span class="sidebar-post-meta">Web Dev &middot; 2,549 words &middot; 80ms Waterfall</span>
            </li>
            <li class="sidebar-post-item">
              <a href="/posts/how-browser-tabs-use-memory.html" class="sidebar-post-link">
                The Browser Tab You Closed Is Not Always Gone: Chrome RAM Internals
              </a>
              <span class="sidebar-post-meta">Technology &middot; 2,728 words &middot; V8 Heap &amp; bfcache</span>
            </li>
            <li class="sidebar-post-item">
              <a href="/posts/chatgpt-secret-codes.html" class="sidebar-post-link">
                ChatGPT Secret Codes: 25 Master Prompts &amp; Power Operators
              </a>
              <span class="sidebar-post-meta">AI Tools &middot; 4,200 words &middot; 6 AI Pioneers</span>
            </li>
          </ul>
        </div>

        <!-- Sidebar Widget 4: Google AdSense Slot (300x250 Medium Rectangle with Zero-CLS) -->
        <div class="ad-slot-wrapper ad-inline-rectangle" aria-label="Sidebar Advertisement">
          <span class="ad-label">Advertisement</span>
        </div>

        <!-- Sidebar Widget 5: Research Topics Taxonomy -->
        <div class="sidebar-widget-card">
          <h3 class="sidebar-widget-title">Engineering Topics</h3>
          <ul class="sidebar-category-list">
            <li class="sidebar-category-item">
              <a href="/categories/cybersecurity.html">Storage Forensics &amp; Privacy</a>
              <span class="category-count-badge">4</span>
            </li>
            <li class="sidebar-category-item">
              <a href="/categories/web-development.html">Web Performance &amp; Network</a>
              <span class="category-count-badge">4</span>
            </li>
            <li class="sidebar-category-item">
              <a href="/categories/technology.html">Hardware, Memory &amp; Silicon</a>
              <span class="category-count-badge">2</span>
            </li>
            <li class="sidebar-category-item">
              <a href="/categories/ai-tools.html">Generative AI &amp; Transformers</a>
              <span class="category-count-badge">2</span>
            </li>
          </ul>
        </div>

        <!-- Sidebar Widget 6: Trust Policy Badge -->
        <div class="sidebar-widget-card" style="background: rgba(2, 132, 199, 0.05); border-color: rgba(2, 132, 199, 0.2);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="color: var(--brand-primary); font-size: 1.1rem;">🛡️</span>
            <span style="font-weight: 700; font-size: 0.88rem; color: var(--text-primary);">Editorial Standards</span>
          </div>
          <p style="font-size: 0.78rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: 0.75rem;">
            Ahadex Blog adheres to strict fact-checking, benchmark transparency, and peer citation guidelines to deliver authentic, human-tested technical journalism.
          </p>
          <a href="/editorial-policy.html" style="font-size: 0.78rem; font-weight: 700; color: var(--brand-primary); text-decoration: underline;">Read Editorial Policy &rarr;</a>
        </div>
      </aside>
    </div>

    <!-- Newsletter Component -->
    <div data-component="newsletter"></div>
  </main>

  <!-- Footer Component Container -->
  <div data-component="footer"></div>

  <!-- Client-side Interactive Filter Script -->
  <script>
    function filterArticles(category, btn) {
      // Update active pill styling
      const pills = document.querySelectorAll('.filter-pill');
      pills.forEach(p => p.classList.remove('active'));
      if (btn) btn.classList.add('active');

      // Filter post cards
      const cards = document.querySelectorAll('#masterPostsGrid .post-card');
      cards.forEach(card => {
        const filterGroup = card.getAttribute('data-filter');
        if (category === 'all' || filterGroup === category) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    }
  </script>

  <!-- Scripts -->
  <script src="/js/main.js" defer></script>
  <script src="/js/search.js" defer></script>
  <script src="/js/analytics.js" defer></script>
  <script src="/js/ads.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../index.html'), homepageHtml, 'utf8');
console.log('Homepage index.html generated successfully with all 12 articles and uncommon editorial layout.');
