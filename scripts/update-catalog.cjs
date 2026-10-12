const fs = require('fs');
const path = require('path');

const newPostsMeta = [
  {
    id: "what-happens-when-you-delete-a-file",
    title: "What Happens When You Delete a File? The Hidden Mechanics of Inodes, SSD TRIM, and Ghost Data",
    slug: "what-happens-when-you-delete-a-file",
    url: "/posts/what-happens-when-you-delete-a-file.html",
    excerpt: "When you press delete, your computer does not erase a single byte. Explore OS syscalls, file system pointers, NAND flash physics, TRIM deallocation, and mobile photo recovery.",
    date: "2026-10-12",
    formattedDate: "October 12, 2026",
    category: "Cybersecurity",
    categorySlug: "cybersecurity",
    categoryUrl: "/categories/cybersecurity.html",
    author: "Mohammad Ahad",
    authorSlug: "author-name",
    authorUrl: "/authors/author-name.html",
    authorAvatar: "/assets/images/ahadex-logo.svg",
    readTime: "19 min read",
    featured: true,
    tags: ["Cybersecurity", "Filesystems", "SSD TRIM", "Hardware", "Operating Systems"],
    heroImage: {
      fallback: "/assets/images/posts/what-happens-when-you-delete-a-file/hero-1280.svg",
      alt: "What Happens When You Delete a File - Inode and TRIM Architecture"
    }
  },
  {
    id: "why-some-websites-feel-instant",
    title: "Why Some Websites Feel Instant While Others Take 5 Seconds to Open",
    slug: "why-some-websites-feel-instant",
    url: "/posts/why-some-websites-feel-instant.html",
    excerpt: "Sub-second web performance is not an accident. Dive into DNS resolution, TCP/TLS handshakes, TTFB bottlenecks, CSSOM blocking, and our side-by-side live benchmark audit.",
    date: "2026-10-12",
    formattedDate: "October 12, 2026",
    category: "Web Development",
    categorySlug: "web-development",
    categoryUrl: "/categories/web-development.html",
    author: "Mohammad Ahad",
    authorSlug: "author-name",
    authorUrl: "/authors/author-name.html",
    authorAvatar: "/assets/images/ahadex-logo.svg",
    readTime: "21 min read",
    featured: true,
    tags: ["Web Development", "Performance", "Core Web Vitals", "JavaScript", "Networking"],
    heroImage: {
      fallback: "/assets/images/posts/why-some-websites-feel-instant/hero-1280.svg",
      alt: "Web Performance Latency Breakdown - DNS, TCP, and TTFB Waterfall"
    }
  },
  {
    id: "how-browser-tabs-use-memory",
    title: "The Browser Tab You Closed Is Not Always Gone: How Modern Browsers Actually Use Memory",
    slug: "how-browser-tabs-use-memory",
    url: "/posts/how-browser-tabs-use-memory.html",
    excerpt: "Why does closing twenty browser tabs barely lower your RAM? Discover Chrome’s multi-process model, Site Isolation, V8 heap generations, lazy garbage collection, and bfcache snapshots.",
    date: "2026-10-12",
    formattedDate: "October 12, 2026",
    category: "Technology",
    categorySlug: "technology",
    categoryUrl: "/categories/technology.html",
    author: "Mohammad Ahad",
    authorSlug: "author-name",
    authorUrl: "/authors/author-name.html",
    authorAvatar: "/assets/images/ahadex-logo.svg",
    readTime: "20 min read",
    featured: false,
    tags: ["Technology", "Browsers", "RAM", "Chrome", "V8 Engine"],
    heroImage: {
      fallback: "/assets/images/posts/how-browser-tabs-use-memory/hero-1280.svg",
      alt: "Browser Multi-Process Architecture and V8 Memory Allocation"
    }
  },
  {
    id: "what-happens-when-you-type-a-url",
    title: "What Really Happens When You Type a URL and Press Enter: The Microsecond Odyssey",
    slug: "what-happens-when-you-type-a-url",
    url: "/posts/what-happens-when-you-type-a-url.html",
    excerpt: "From mechanical key switch interrupts and recursive DNS Anycast queries to TLS 1.3 Diffie-Hellman handshakes, DOM construction, and GPU rasterization &mdash; the complete engineering journey.",
    date: "2026-10-12",
    formattedDate: "October 12, 2026",
    category: "Web Development",
    categorySlug: "web-development",
    categoryUrl: "/categories/web-development.html",
    author: "Mohammad Ahad",
    authorSlug: "author-name",
    authorUrl: "/authors/author-name.html",
    authorAvatar: "/assets/images/ahadex-logo.svg",
    readTime: "22 min read",
    featured: false,
    tags: ["Web Development", "Networking", "DNS", "TCP", "TLS", "Browser Internals"],
    heroImage: {
      fallback: "/assets/images/posts/what-happens-when-you-type-a-url/hero-1280.svg",
      alt: "End-to-End URL Request Lifecycle - From Keystroke to Composited Pixels"
    }
  },
  {
    id: "why-phones-get-slower-over-time",
    title: "Why Your Phone Gets Slower Over Time: The Truth About NAND Flash, SQLite, and Batteries",
    slug: "why-phones-get-slower-over-time",
    url: "/posts/why-phones-get-slower-over-time.html",
    excerpt: "Is planned obsolescence real? Explore the real physical and software reasons phones slow down: NAND flash fill degradation, SQLite WAL database fragmentation, and battery throttling.",
    date: "2026-10-12",
    formattedDate: "October 12, 2026",
    category: "Technology",
    categorySlug: "technology",
    categoryUrl: "/categories/technology.html",
    author: "Mohammad Ahad",
    authorSlug: "author-name",
    authorUrl: "/authors/author-name.html",
    authorAvatar: "/assets/images/ahadex-logo.svg",
    readTime: "21 min read",
    featured: false,
    tags: ["Technology", "Smartphones", "Hardware", "Batteries", "NAND Flash", "Android"],
    heroImage: {
      fallback: "/assets/images/posts/why-phones-get-slower-over-time/hero-1280.svg",
      alt: "Smartphone Hardware Architecture - NAND Flash WAF and Battery Throttling"
    }
  },
  {
    id: "what-websites-collect-before-you-allow-cookies",
    title: "The Invisible Data Websites Collect Before You Click 'Allow': Cookie Banner Illusion",
    slug: "what-websites-collect-before-you-allow-cookies",
    url: "/posts/what-websites-collect-before-you-allow-cookies.html",
    excerpt: "Think you are anonymous until you click accept on a cookie popup? Discover passive HTTP telemetry, TLS JA3/JA4 fingerprints, Canvas subpixel rasterization, and WebGL GPU unmasking.",
    date: "2026-10-12",
    formattedDate: "October 12, 2026",
    category: "Cybersecurity",
    categorySlug: "cybersecurity",
    categoryUrl: "/categories/cybersecurity.html",
    author: "Mohammad Ahad",
    authorSlug: "author-name",
    authorUrl: "/authors/author-name.html",
    authorAvatar: "/assets/images/ahadex-logo.svg",
    readTime: "21 min read",
    featured: false,
    tags: ["Cybersecurity", "Privacy", "Fingerprinting", "Cookies", "Web Standards"],
    heroImage: {
      fallback: "/assets/images/posts/what-websites-collect-before-you-allow-cookies/hero-1280.svg",
      alt: "Browser Fingerprinting Matrix - Canvas, WebGL, and TLS JA3 Telemetry"
    }
  },
  {
    id: "why-large-images-slow-websites",
    title: "Why a 10 MB Image Can Make a Website Feel Broken: Decoding Modern Web Formats",
    slug: "why-large-images-slow-websites",
    url: "/posts/why-large-images-slow-websites.html",
    excerpt: "Shipping raw high-res photos destroys web performance. Compare PNG, JPEG, WebP, and AVIF, discover why a 10MB JPEG expands to 100MB of mobile RAM, and implement zero-CLS responsive pictures.",
    date: "2026-10-12",
    formattedDate: "October 12, 2026",
    category: "Web Development",
    categorySlug: "web-development",
    categoryUrl: "/categories/web-development.html",
    author: "Mohammad Ahad",
    authorSlug: "author-name",
    authorUrl: "/authors/author-name.html",
    authorAvatar: "/assets/images/ahadex-logo.svg",
    readTime: "20 min read",
    featured: false,
    tags: ["Web Development", "Images", "AVIF", "WebP", "Performance", "Core Web Vitals"],
    heroImage: {
      fallback: "/assets/images/posts/why-large-images-slow-websites/hero-1280.svg",
      alt: "Image Codec Benchmark - AVIF, WebP, JPEG, and Mobile RAM Footprint"
    }
  },
  {
    id: "what-happens-to-data-after-uninstalling-an-app",
    title: "What Happens to Your Data When You Uninstall an App? The Ghost Trails",
    slug: "what-happens-to-data-after-uninstalling-an-app",
    url: "/posts/what-happens-to-data-after-uninstalling-an-app.html",
    excerpt: "Think deleting an app erases your history? Discover what actually happens to sandbox directories, iOS Keychain tokens, Android external storage, cloud backups, and advertising IDs.",
    date: "2026-10-12",
    formattedDate: "October 12, 2026",
    category: "Cybersecurity",
    categorySlug: "cybersecurity",
    categoryUrl: "/categories/cybersecurity.html",
    author: "Mohammad Ahad",
    authorSlug: "author-name",
    authorUrl: "/authors/author-name.html",
    authorAvatar: "/assets/images/ahadex-logo.svg",
    readTime: "21 min read",
    featured: false,
    tags: ["Cybersecurity", "Mobile Privacy", "iOS", "Android", "Data Protection"],
    heroImage: {
      fallback: "/assets/images/posts/what-happens-to-data-after-uninstalling-an-app/hero-1280.svg",
      alt: "App Sandbox Deletion vs Persistent Keychains and Remote Databases"
    }
  },
  {
    id: "why-same-wifi-speed-can-feel-different",
    title: "Why Two Wi-Fi Networks With the Same Speed Feel Completely Different",
    slug: "why-same-wifi-speed-can-feel-different",
    url: "/posts/why-same-wifi-speed-can-feel-different.html",
    excerpt: "Both show 100 Mbps on a speed test, but one feels instant while the other stutters on Zoom and lags in gaming. Discover why bandwidth is not speed: latency, packet jitter, and Bufferbloat.",
    date: "2026-10-12",
    formattedDate: "October 12, 2026",
    category: "Technology",
    categorySlug: "technology",
    categoryUrl: "/categories/technology.html",
    author: "Mohammad Ahad",
    authorSlug: "author-name",
    authorUrl: "/authors/author-name.html",
    authorAvatar: "/assets/images/ahadex-logo.svg",
    readTime: "21 min read",
    featured: false,
    tags: ["Technology", "Networking", "Wi-Fi", "Bufferbloat", "Latency", "Gaming"],
    heroImage: {
      fallback: "/assets/images/posts/why-same-wifi-speed-can-feel-different/hero-1280.svg",
      alt: "Network Telemetry - 100 Mbps Low Latency vs High Jitter Bufferbloat"
    }
  },
  {
    id: "hidden-cost-of-free-online-tools",
    title: "The Hidden Cost of 'Free' Online Tools: Where Your Files and Metadata Go",
    slug: "hidden-cost-of-free-online-tools",
    url: "/posts/hidden-cost-of-free-online-tools.html",
    excerpt: "Nothing in cloud computing is free. Uncover hidden privacy risks of free PDF converters and online tools: server retention windows, EXIF metadata harvesting, and WebAssembly alternatives.",
    date: "2026-10-12",
    formattedDate: "October 12, 2026",
    category: "Cybersecurity",
    categorySlug: "cybersecurity",
    categoryUrl: "/categories/cybersecurity.html",
    author: "Mohammad Ahad",
    authorSlug: "author-name",
    authorUrl: "/authors/author-name.html",
    authorAvatar: "/assets/images/ahadex-logo.svg",
    readTime: "21 min read",
    featured: false,
    tags: ["Cybersecurity", "Privacy", "WebAssembly", "Online Tools", "Metadata"],
    heroImage: {
      fallback: "/assets/images/posts/hidden-cost-of-free-online-tools/hero-1280.svg",
      alt: "Cloud Server Security vs Local WebAssembly Browser Privacy Architecture"
    }
  }
];

// 1. Update data/posts.json
const postsJsonPath = path.join(__dirname, '../data/posts.json');
let existingPosts = [];
try {
  existingPosts = JSON.parse(fs.readFileSync(postsJsonPath, 'utf8'));
} catch (e) {
  existingPosts = [];
}

// Filter out existing duplicates if any
const existingIds = new Set(newPostsMeta.map(p => p.id));
const filteredExisting = existingPosts.filter(p => !existingIds.has(p.id));
const combinedPosts = [...newPostsMeta, ...filteredExisting];
fs.writeFileSync(postsJsonPath, JSON.stringify(combinedPosts, null, 2));
console.log(`Updated data/posts.json: total ${combinedPosts.length} posts.`);

// 2. Update data/search-index.json
const searchJsonPath = path.join(__dirname, '../data/search-index.json');
let existingSearch = [];
try {
  existingSearch = JSON.parse(fs.readFileSync(searchJsonPath, 'utf8'));
} catch (e) {
  existingSearch = [];
}

const newSearchItems = newPostsMeta.map(p => ({
  id: p.id,
  title: p.title,
  url: p.url,
  category: p.category,
  tags: p.tags,
  author: p.author,
  date: "Oct 12, 2026",
  readTime: p.readTime,
  excerpt: p.excerpt,
  keywords: `${p.title.toLowerCase()} ${p.tags.join(' ').toLowerCase()} ${p.category.toLowerCase()} mohammad ahad ahadex research systems ${p.slug}`
}));

const filteredSearch = existingSearch.filter(s => !existingIds.has(s.id));
const combinedSearch = [...newSearchItems, ...filteredSearch];
fs.writeFileSync(searchJsonPath, JSON.stringify(combinedSearch, null, 2));
console.log(`Updated data/search-index.json: total ${combinedSearch.length} search entries.`);

// 3. Update sitemap-posts.xml
const sitemapPostsPath = path.join(__dirname, '../sitemap-posts.xml');
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

combinedPosts.forEach(p => {
  sitemapXml += `  <url>\n    <loc>https://ahadex.online${p.url}</loc>\n    <lastmod>2026-10-12T00:00:00+00:00</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${p.featured ? '1.0' : '0.85'}</priority>\n  </url>\n`;
});
sitemapXml += `  <url>\n    <loc>https://ahadex.online/posts/index.html</loc>\n    <lastmod>2026-10-12T00:00:00+00:00</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n</urlset>\n`;
fs.writeFileSync(sitemapPostsPath, sitemapXml);
console.log('Updated sitemap-posts.xml with all articles.');

// 4. Update posts/index.html (Archive grid)
const postsIndexHtmlPath = path.join(__dirname, '../posts/index.html');
let archiveCardsHtml = combinedPosts.map(p => `
      <article class="post-card">
        <a href="${p.url}" class="card-thumb-wrap">
          <img src="${p.heroImage.fallback}" alt="${p.heroImage.alt}" width="768" height="432" loading="lazy" />
        </a>
        <div class="card-body">
          <div class="card-kicker-row">
            <span class="card-kicker-cat">${p.category}</span>
            <span>&middot;</span>
            <span>${p.readTime}</span>
          </div>
          <h2 class="card-title">
            <a href="${p.url}">${p.title}</a>
          </h2>
          <p class="card-excerpt">${p.excerpt}</p>
          <div class="card-footer">
            <span class="card-author-name">${p.author}</span>
            <time datetime="${p.date}">${p.formattedDate}</time>
          </div>
        </div>
      </article>
`).join('\n');

const archivePageHtml = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>All Articles &amp; Technical Archives &mdash; Ahadex Blog</title>
  <meta name="description" content="Explore all technical articles, operating system teardowns, cybersecurity guides, web performance audits, and AI prompt benchmarks on Ahadex Blog." />
  <link rel="canonical" href="https://ahadex.online/posts/index.html" />
  
  <meta property="og:type" content="website" />
  <meta property="og:title" content="All Articles &amp; Technical Archives &mdash; Ahadex Blog" />
  <meta property="og:description" content="Explore all technical articles, operating system teardowns, and web performance benchmarks on Ahadex Blog." />
  <meta property="og:url" content="https://ahadex.online/posts/index.html" />
  
  <link rel="manifest" href="/manifest.webmanifest" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <link rel="stylesheet" href="/css/main.css" />
  <link rel="stylesheet" href="/css/header.css" />
  <link rel="stylesheet" href="/css/category.css" />
  <link rel="stylesheet" href="/css/components.css" />
  <link rel="stylesheet" href="/css/search.css" />
  <link rel="stylesheet" href="/css/footer.css" />
</head>
<body>
  <div data-component="header"></div>
  <div data-component="search"></div>

  <main class="container">
    <div class="archive-hero">
      <span class="archive-pretitle">Complete Technical Library</span>
      <h1 class="archive-main-title">All Articles &amp; Systems Research Archives</h1>
      <p class="archive-desc">
        Every benchmark teardown, performance audit, operating system guide, and cybersecurity field report published by Mohammad Ahad and Ahadex Systems Lab.
      </p>
    </div>

    <!-- Ad Placement (Leaderboard) -->
    <div class="ad-slot-wrapper ad-leaderboard" aria-label="Archive Top Ad">
      <span class="ad-label">Advertisement</span>
    </div>

    <!-- Posts Grid -->
    <div class="posts-archive-grid">
      ${archiveCardsHtml}
    </div>
  </main>

  <div data-component="footer"></div>
  <script src="/js/main.js" defer></script>
</body>
</html>`;

fs.writeFileSync(postsIndexHtmlPath, archivePageHtml);
console.log('Updated posts/index.html with all post cards.');
