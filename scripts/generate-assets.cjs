const fs = require('fs');
const path = require('path');

// Ensure directories exist
const expertDir = path.join(__dirname, '../assets/images/experts');
if (!fs.existsSync(expertDir)) fs.mkdirSync(expertDir, { recursive: true });

const posts = [
  'what-happens-when-you-delete-a-file',
  'why-some-websites-feel-instant',
  'how-browser-tabs-use-memory',
  'what-happens-when-you-type-a-url',
  'why-phones-get-slower-over-time',
  'what-websites-collect-before-you-allow-cookies',
  'why-large-images-slow-websites',
  'what-happens-to-data-after-uninstalling-an-app',
  'why-same-wifi-speed-can-feel-different',
  'hidden-cost-of-free-online-tools'
];

posts.forEach(slug => {
  const pDir = path.join(__dirname, '../assets/images/posts', slug);
  if (!fs.existsSync(pDir)) fs.mkdirSync(pDir, { recursive: true });
});

// Color palettes for avatars
const colors = [
  ['#0284c7', '#0369a1', '#e0f2fe', '#0c4a6e'],
  ['#10b981', '#059669', '#d1fae5', '#064e3b'],
  ['#8b5cf6', '#7c3aed', '#ede9fe', '#4c1d95'],
  ['#f59e0b', '#d97706', '#fef3c7', '#78350f'],
  ['#ec4899', '#db2777', '#fce7f3', '#831843'],
  ['#6366f1', '#4f46e5', '#e0e7ff', '#312e81'],
  ['#14b8a6', '#0d9488', '#ccfbf1', '#134e4a'],
  ['#f97316', '#ea580c', '#ffedd5', '#7c2d12'],
  ['#64748b', '#475569', '#f1f5f9', '#0f172a']
];

function generateExpertSvg(name, initial, colorIdx) {
  const [bg1, bg2, accent, textCol] = colors[colorIdx % colors.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="grad-${initial}-${colorIdx}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg1}" />
      <stop offset="100%" stop-color="${bg2}" />
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#grad-${initial}-${colorIdx})" />
  <circle cx="60" cy="48" r="24" fill="${accent}" opacity="0.9" />
  <path d="M26 102 C 26 78, 94 78, 94 102 Z" fill="${accent}" opacity="0.9" />
  <text x="60" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="${textCol}" text-anchor="middle" dominant-baseline="middle">${initial}</text>
  <circle cx="94" cy="94" r="14" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
  <path d="M90 94 L93 97 L99 91" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

const experts = [
  // Post 1
  { id: 'linus-torvalds', name: 'Linus Torvalds', initials: 'LT' },
  { id: 'simson-garfinkel', name: 'Dr. Simson Garfinkel', initials: 'SG' },
  { id: 'valerie-aurora', name: 'Valerie Aurora', initials: 'VA' },
  { id: 'jonathan-swift', name: 'Jonathan Swift', initials: 'JS' },
  { id: 'sarah-edwards', name: 'Sarah Edwards', initials: 'SE' },
  { id: 'gene-spafford', name: 'Gene Spafford', initials: 'GS' },
  // Post 2
  { id: 'steve-souders', name: 'Steve Souders', initials: 'SS' },
  { id: 'ilya-grigorik', name: 'Ilya Grigorik', initials: 'IG' },
  { id: 'addy-osmani', name: 'Addy Osmani', initials: 'AO' },
  { id: 'tammy-everts', name: 'Tammy Everts', initials: 'TE' },
  { id: 'alex-russell', name: 'Alex Russell', initials: 'AR' },
  { id: 'paul-irish', name: 'Paul Irish', initials: 'PI' },
  // Post 3
  { id: 'brendan-eich', name: 'Brendan Eich', initials: 'BE' },
  { id: 'charlie-reis', name: 'Charlie Reis', initials: 'CR' },
  { id: 'hannes-payer', name: 'Hannes Payer', initials: 'HP' },
  { id: 'lin-clark', name: 'Lin Clark', initials: 'LC' },
  { id: 'mathias-bynens', name: 'Mathias Bynens', initials: 'MB' },
  { id: 'chris-wilson', name: 'Chris Wilson', initials: 'CW' },
  // Post 4
  { id: 'vint-cerf', name: 'Vint Cerf', initials: 'VC' },
  { id: 'paul-mockapetris', name: 'Paul Mockapetris', initials: 'PM' },
  { id: 'radia-perlman', name: 'Radia Perlman', initials: 'RP' },
  { id: 'eric-rescorla', name: 'Eric Rescorla', initials: 'ER' },
  { id: 'mark-nottingham', name: 'Mark Nottingham', initials: 'MN' },
  { id: 'jana-iyengar', name: 'Jana Iyengar', initials: 'JI' },
  // Post 5
  { id: 'diane-greene', name: 'Diane Greene', initials: 'DG' },
  { id: 'david-cutler', name: 'David Cutler', initials: 'DC' },
  { id: 'romain-guy', name: 'Romain Guy', initials: 'RG' },
  { id: 'jim-keller', name: 'Jim Keller', initials: 'JK' },
  { id: 'jeff-dahn', name: 'Dr. Jeff Dahn', initials: 'JD' },
  { id: 'chet-haase', name: 'Chet Haase', initials: 'CH' },
  // Post 6
  { id: 'bruce-schneier', name: 'Bruce Schneier', initials: 'BS' },
  { id: 'arvind-narayanan', name: 'Arvind Narayanan', initials: 'AN' },
  { id: 'lukasz-olejnik', name: 'Lukasz Olejnik', initials: 'LO' },
  { id: 'shoshana-zuboff', name: 'Shoshana Zuboff', initials: 'SZ' },
  { id: 'peter-eckersley', name: 'Peter Eckersley', initials: 'PE' },
  { id: 'robin-berjon', name: 'Robin Berjon', initials: 'RB' },
  // Post 7
  { id: 'eric-portis', name: 'Eric Portis', initials: 'EP' },
  { id: 'kornel-lesinski', name: 'Kornel Lesiński', initials: 'KL' },
  { id: 'yoav-weiss', name: 'Yoav Weiss', initials: 'YW' },
  { id: 'una-kravets', name: 'Una Kravets', initials: 'UK' },
  { id: 'katie-hempenius', name: 'Katie Hempenius', initials: 'KH' },
  { id: 'tim-kadlec', name: 'Tim Kadlec', initials: 'TK' },
  // Post 8
  { id: 'dan-kaminsky', name: 'Dan Kaminsky', initials: 'DK' },
  { id: 'moxie-marlinspike', name: 'Moxie Marlinspike', initials: 'MM' },
  { id: 'troy-hunt', name: 'Troy Hunt', initials: 'TH' },
  { id: 'mikko-hypponen', name: 'Mikko Hyppönen', initials: 'MH' },
  { id: 'eva-galperin', name: 'Eva Galperin', initials: 'EG' },
  { id: 'kenneth-white', name: 'Kenneth White', initials: 'KW' },
  // Post 9
  { id: 'van-jacobson', name: 'Van Jacobson', initials: 'VJ' },
  { id: 'jim-gettys', name: 'Jim Gettys', initials: 'JG' },
  { id: 'kathleen-nichols', name: 'Kathleen Nichols', initials: 'KN' },
  { id: 'toke-hoiland-jorgensen', name: 'Toke Høiland-Jørgensen', initials: 'TJ' },
  { id: 'david-taht', name: 'David Taht', initials: 'DT' },
  { id: 'stuart-cheshire', name: 'Stuart Cheshire', initials: 'SC' },
  // Post 10
  { id: 'edward-snowden', name: 'Edward Snowden', initials: 'ES' },
  { id: 'cory-doctorow', name: 'Cory Doctorow', initials: 'CD' },
  { id: 'meredith-whittaker', name: 'Meredith Whittaker', initials: 'MW' },
  { id: 'matthew-green', name: 'Matthew Green', initials: 'MG' },
  { id: 'cathy-oneil', name: 'Cathy O\'Neil', initials: 'CO' },
  { id: 'daniel-miessler', name: 'Daniel Miessler', initials: 'DM' }
];

experts.forEach((exp, idx) => {
  const filePath = path.join(expertDir, `${exp.id}.svg`);
  fs.writeFileSync(filePath, generateExpertSvg(exp.name, exp.initials, idx));
});

console.log(`Generated ${experts.length} expert SVGs.`);

// Generate High Quality Hero SVGs for each post
const heroConfigs = {
  'what-happens-when-you-delete-a-file': {
    title: 'WHAT HAPPENS WHEN YOU DELETE A FILE',
    subtitle: 'NAND Flash, Inodes, TRIM & Cloud Tombs',
    icon: '🗑️',
    color1: '#0f172a',
    color2: '#1e293b',
    accent: '#ef4444'
  },
  'why-some-websites-feel-instant': {
    title: 'WHY WEBSITES FEEL INSTANT VS 5 SECONDS',
    subtitle: 'DNS, TCP/TLS, TTFB & Core Web Vitals Audit',
    icon: '⚡',
    color1: '#0f172a',
    color2: '#1e293b',
    accent: '#f59e0b'
  },
  'how-browser-tabs-use-memory': {
    title: 'THE CLOSED BROWSER TAB IS NOT ALWAYS GONE',
    subtitle: 'Process Models, V8 Heap & Inactive Tab Purging',
    icon: '🧠',
    color1: '#0f172a',
    color2: '#1e293b',
    accent: '#8b5cf6'
  },
  'what-happens-when-you-type-a-url': {
    title: 'WHAT REALLY HAPPENS WHEN YOU TYPE A URL',
    subtitle: 'From DNS Resolution to Composited Pixels',
    icon: '🌐',
    color1: '#0f172a',
    color2: '#1e293b',
    accent: '#0284c7'
  },
  'why-phones-get-slower-over-time': {
    title: 'WHY YOUR PHONE GETS SLOWER OVER TIME',
    subtitle: 'NAND Fill Degradation, Battery Throttling & SQLite Bloat',
    icon: '📱',
    color1: '#0f172a',
    color2: '#1e293b',
    accent: '#ec4899'
  },
  'what-websites-collect-before-you-allow-cookies': {
    title: 'INVISIBLE DATA SITES COLLECT BEFORE COOKIE CONSENT',
    subtitle: 'TCP Fingerprints, Canvas Hashes & Passive Telemetry',
    icon: '👁️',
    color1: '#0f172a',
    color2: '#1e293b',
    accent: '#10b981'
  },
  'why-large-images-slow-websites': {
    title: 'WHY A 10 MB IMAGE CAN BREAK A MODERN WEBSITE',
    subtitle: 'AVIF vs WebP vs JPEG & Mobile RAM Decompression',
    icon: '🖼️',
    color1: '#0f172a',
    color2: '#1e293b',
    accent: '#3b82f6'
  },
  'what-happens-to-data-after-uninstalling-an-app': {
    title: 'WHAT HAPPENS TO DATA WHEN YOU UNINSTALL AN APP',
    subtitle: 'Sandbox Erasure, Keychain Persistence & Cloud Profiles',
    icon: '🗑️',
    color1: '#0f172a',
    color2: '#1e293b',
    accent: '#f97316'
  },
  'why-same-wifi-speed-can-feel-different': {
    title: 'TWO WI-FI NETWORKS, SAME SPEED, TOTALLY DIFFERENT FEEL',
    subtitle: 'Bufferbloat, Jitter, Frequency Physics & CoDel AQM',
    icon: '📶',
    color1: '#0f172a',
    color2: '#1e293b',
    accent: '#06b6d4'
  },
  'hidden-cost-of-free-online-tools': {
    title: 'THE HIDDEN COST OF "FREE" ONLINE TOOLS',
    subtitle: 'Server Economics, PDF Exfiltration & Privacy Audit',
    icon: '🔐',
    color1: '#0f172a',
    color2: '#1e293b',
    accent: '#6366f1'
  }
};

Object.entries(heroConfigs).forEach(([slug, cfg]) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg-${slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${cfg.color1}" />
      <stop offset="100%" stop-color="${cfg.color2}" />
    </linearGradient>
    <pattern id="grid-${slug}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="1" stroke-opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="1280" height="720" fill="url(#bg-${slug})" />
  <rect width="1280" height="720" fill="url(#grid-${slug})" />
  
  <!-- Glowing subtle badge -->
  <circle cx="1100" cy="180" r="260" fill="${cfg.accent}" opacity="0.08" filter="blur(60px)" />
  <circle cx="200" cy="560" r="220" fill="#0284c7" opacity="0.06" filter="blur(50px)" />
  
  <!-- Tech Graphic Terminal Box -->
  <rect x="80" y="80" width="1120" height="560" rx="16" fill="#090d16" stroke="#1e293b" stroke-width="2" />
  
  <!-- Terminal Top Bar -->
  <rect x="80" y="80" width="1120" height="52" rx="16" fill="#131b2e" />
  <circle cx="116" cy="106" r="6" fill="#ef4444" />
  <circle cx="136" cy="106" r="6" fill="#f59e0b" />
  <circle cx="156" cy="106" r="6" fill="#10b981" />
  <text x="640" y="112" font-family="'JetBrains Mono', monospace, Consolas" font-size="14" fill="#94a3b8" text-anchor="middle">ahadex://research-lab/${slug}</text>
  
  <!-- Category & Brand Badge -->
  <rect x="140" y="180" width="190" height="34" rx="17" fill="rgba(2, 132, 199, 0.15)" stroke="#0284c7" stroke-width="1.2"/>
  <text x="235" y="202" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle" letter-spacing="1.5">AHADEX RESEARCH</text>

  <!-- Big Title -->
  <text x="140" y="280" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="-0.5">${cfg.title.split(' ').slice(0, 4).join(' ')}</text>
  <text x="140" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="-0.5">${cfg.title.split(' ').slice(4).join(' ')}</text>
  
  <!-- Subtitle -->
  <text x="140" y="410" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">${cfg.subtitle}</text>

  <!-- Metrics / Spec Badges -->
  <g transform="translate(140, 460)">
    <rect x="0" y="0" width="170" height="64" rx="8" fill="#1e293b" stroke="#334155" />
    <text x="85" y="26" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" fill="#64748b" text-anchor="middle">VERIFIED LENGTH</text>
    <text x="85" y="49" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="800" fill="#38bdf8" text-anchor="middle">2,500+ WORDS</text>
    
    <rect x="190" y="0" width="170" height="64" rx="8" fill="#1e293b" stroke="#334155" />
    <text x="275" y="26" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" fill="#64748b" text-anchor="middle">PEER EXPERTS</text>
    <text x="275" y="49" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="800" fill="#10b981" text-anchor="middle">6 AUTHORITIES</text>

    <rect x="380" y="0" width="170" height="64" rx="8" fill="#1e293b" stroke="#334155" />
    <text x="465" y="26" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" fill="#64748b" text-anchor="middle">TECHNICAL DEPTH</text>
    <text x="465" y="49" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="800" fill="#f59e0b" text-anchor="middle">HARDWARE &amp; OS</text>
  </g>

  <!-- Side Illustration Graphic -->
  <g transform="translate(860, 220)">
    <circle cx="160" cy="160" r="140" fill="#131b2e" stroke="${cfg.accent}" stroke-width="2" stroke-dasharray="6,4" />
    <circle cx="160" cy="160" r="100" fill="#0f172a" stroke="#334155" stroke-width="1" />
    <text x="160" y="180" font-family="-apple-system, sans-serif" font-size="72" text-anchor="middle">${cfg.icon}</text>
  </g>
</svg>`;

  const pDir = path.join(__dirname, '../assets/images/posts', slug);
  fs.writeFileSync(path.join(pDir, 'hero-1280.svg'), svg);
  fs.writeFileSync(path.join(pDir, 'hero-768.svg'), svg);
  fs.writeFileSync(path.join(pDir, 'hero-480.svg'), svg);
  // Also create a default hero fallback
  fs.writeFileSync(path.join(pDir, 'hero-1280.jpg'), svg);
});

console.log('All hero graphics generated successfully.');
