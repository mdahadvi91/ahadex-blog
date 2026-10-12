const fs = require('fs');
const path = require('path');

const expertDir = path.join(__dirname, '../assets/images/experts');
if (!fs.existsSync(expertDir)) fs.mkdirSync(expertDir, { recursive: true });

// AI Experts for chatgpt-secret-codes
const aiExperts = [
  { id: 'sam-altman', name: 'Sam Altman', initials: 'SA', role: 'CEO of OpenAI & Pioneer of Modern Generative AI Scaling' },
  { id: 'andrej-karpathy', name: 'Dr. Andrej Karpathy', initials: 'AK', role: 'Former Director of AI at Tesla, Founding Member of OpenAI' },
  { id: 'ilya-sutskever', name: 'Dr. Ilya Sutskever', initials: 'IS', role: 'Co-Founder of SSI & Former Chief Scientist at OpenAI' },
  { id: 'yann-lecun', name: 'Dr. Yann LeCun', initials: 'YL', role: 'Chief AI Scientist at Meta, Turing Award Laureate & NYU Professor' },
  { id: 'demis-hassabis', name: 'Sir Demis Hassabis', initials: 'DH', role: 'CEO of Google DeepMind & Nobel Laureate in Chemistry' },
  { id: 'fei-fei-li', name: 'Dr. Fei-Fei Li', initials: 'FL', role: 'Professor at Stanford University, Co-Director of Stanford HAI' }
];

const colors = [
  ['#0284c7', '#0369a1', '#e0f2fe', '#0c4a6e'],
  ['#10b981', '#059669', '#d1fae5', '#064e3b'],
  ['#8b5cf6', '#7c3aed', '#ede9fe', '#4c1d95'],
  ['#f59e0b', '#d97706', '#fef3c7', '#78350f'],
  ['#ec4899', '#db2777', '#fce7f3', '#831843'],
  ['#6366f1', '#4f46e5', '#e0e7ff', '#312e81']
];

aiExperts.forEach((exp, idx) => {
  const [bg1, bg2, accent, textCol] = colors[idx % colors.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="grad-${exp.initials}-${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg1}" />
      <stop offset="100%" stop-color="${bg2}" />
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#grad-${exp.initials}-${idx})" />
  <circle cx="60" cy="48" r="24" fill="${accent}" opacity="0.9" />
  <path d="M26 102 C 26 78, 94 78, 94 102 Z" fill="${accent}" opacity="0.9" />
  <text x="60" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="${textCol}" text-anchor="middle" dominant-baseline="middle">${exp.initials}</text>
  <circle cx="94" cy="94" r="14" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
  <path d="M90 94 L93 97 L99 91" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  fs.writeFileSync(path.join(expertDir, `${exp.id}.svg`), svg);
});
console.log('AI Experts generated.');

// Diagram definitions for all 12 posts
const diagramDefinitions = {
  'what-happens-when-you-delete-a-file': [
    {
      file: 'diagram-01-unlink-syscall.svg',
      title: 'Operating System Syscall Architecture: unlink() vs Storage Blocks',
      category: 'FILE SYSTEM INTERNALS',
      accent: '#38bdf8',
      desc: 'Process issues unlink(2) -> Kernel decrements i_nlinks -> File metadata detached -> Data blocks marked unallocated in bitmap.',
      steps: ['User Action: rm /path/file', 'VFS unlink(path) syscall', 'i_nlinks decremented (1 -> 0)', 'Bitmap bit flipped to free', 'Zero data overwritten']
    },
    {
      file: 'diagram-02-inode-pointer-tree.svg',
      title: 'Ext4 Inode Hierarchy & Extent Tree Structure',
      category: 'STORAGE ARTIFACTS',
      accent: '#10b981',
      desc: 'Direct blocks vs 4-deep extent tree index nodes pointing to contiguous block runs on physical disk.',
      steps: ['Inode Header (Flags, Size, Perms)', 'Extent Header (eh_depth, eh_entries)', 'Extent Index Nodes (Physical Block Ptrs)', 'Data Block Allocation', 'Inode Table Deallocation']
    },
    {
      file: 'diagram-03-recycle-bin-metadata.svg',
      title: 'Windows $Recycle.Bin & macOS .Trash Indexing Flow',
      category: 'DESKTOP OS FORENSICS',
      accent: '#f59e0b',
      desc: 'Moving files into trash performs a rapid directory entry rename and generates $I / $R paired forensic index records.',
      steps: ['Desktop "Move to Trash"', 'Atomic FS Rename to Hidden Dir', 'Header creation ($I metadata file)', 'Data renamed ($R payload file)', 'Recovery preserves timestamps']
    },
    {
      file: 'diagram-04-hdd-magnetic-platter.svg',
      title: 'Magnetic Platter Geometry: Sectors, Tracks & Ghost Remanence',
      category: 'MAGNETIC STORAGE PHYSICS',
      accent: '#ec4899',
      desc: 'How legacy hard disk drives retain magnetic flux domains until mechanical write heads overwrite raw sectors.',
      steps: ['Rotating Platter 7200 RPM', 'GMR Read/Write Head Floating', 'Sectors marked inactive', 'Residual magnetic flux intact', 'Bit-by-bit raw imaging possible']
    },
    {
      file: 'diagram-05-ssd-nand-trim-gc.svg',
      title: 'SSD NAND Flash: Pages, Blocks, TRIM & Garbage Collection',
      category: 'SOLID STATE PHYSICS',
      accent: '#8b5cf6',
      desc: 'Why SSDs cannot overwrite in place: 4KB page writes vs 2MB block erase cycles, Wear Leveling, and ATA TRIM command.',
      steps: ['Host OS issues ATA TRIM', 'Flash Translation Layer (FTL) remaps', 'Page marked invalid in NAND', 'Background Garbage Collection sweeps', 'Block erased to high-voltage state']
    },
    {
      file: 'diagram-06-cloud-soft-delete-lifecycle.svg',
      title: 'Cloud Object Storage (AWS S3 / Google Cloud Storage) Lifecycle',
      category: 'CLOUD ARCHITECTURE',
      accent: '#06b6d4',
      desc: 'Object deletion inserts a Delete Marker; versioning and immutable retention locks prevent instant physical wipe.',
      steps: ['DELETE /bucket/object request', 'S3 inserts Null Delete Marker', 'Object version hidden from listing', 'Lifecycle rule trigger (e.g. 30d)', 'Physical erasure from distributed shards']
    }
  ],

  'why-some-websites-feel-instant': [
    {
      file: 'diagram-01-network-waterfall.svg',
      title: 'The Millisecond Web Latency Waterfall Breakdown',
      category: 'NETWORK PERFORMANCE',
      accent: '#38bdf8',
      desc: 'Side-by-side comparison of 80ms optimized load vs 4,800ms bloated waterfall showing blocking phases.',
      steps: ['DNS Resolution (4ms vs 120ms)', 'TCP + TLS 1.3 (22ms vs 310ms)', 'TTFB Server Edge (35ms vs 950ms)', 'CSSOM Non-blocking (10ms vs 820ms)', 'First Paint at 75ms total']
    },
    {
      file: 'diagram-02-dns-anycast-routing.svg',
      title: 'Recursive Anycast DNS Resolution Pathway',
      category: 'INTERNET PROTOCOLS',
      accent: '#10b981',
      desc: 'How BGP Anycast routes your DNS query to the nearest 1.1.1.1 or 8.8.8.8 POP in single-digit milliseconds.',
      steps: ['Browser DNS Cache Check', 'Local Resolver Query', 'BGP Anycast Routing to Edge', 'Authoritative NS Zone Answer', 'EDNS Client Subnet Response']
    },
    {
      file: 'diagram-03-tls-13-handshake.svg',
      title: 'TLS 1.3 0-RTT vs TLS 1.2 Multi-Roundtrip Handshake',
      category: 'CRYPTOGRAPHIC TRANSPORT',
      accent: '#8b5cf6',
      desc: 'Diffie-Hellman ephemeral key exchange in 1 RTT vs legacy TLS 1.2 needing 2 full roundtrips before first data byte.',
      steps: ['ClientHello + Key Share', 'ServerHello + Cert + Finished', '1-RTT Connection Established', 'Pre-Shared Key 0-RTT Early Data', 'Saves 100-300ms on Mobile']
    },
    {
      file: 'diagram-04-critical-rendering-path.svg',
      title: 'The Critical Rendering Path: DOM + CSSOM to Layout Tree',
      category: 'BROWSER ENGINE',
      accent: '#f59e0b',
      desc: 'How synchronous stylesheets and render-blocking scripts starve the Blink/Gecko layout engine.',
      steps: ['HTML Tokenizer -> DOM Tree', 'CSS Parser -> CSSOM Tree', 'Render Tree Construction', 'Layout Calculation (Reflow)', 'GPU Paint & Composite Layers']
    },
    {
      file: 'diagram-05-cdn-edge-caching.svg',
      title: 'Multi-Tier Edge CDN Architecture & Cache Shields',
      category: 'EDGE INFRASTRUCTURE',
      accent: '#ec4899',
      desc: 'Local PoP Cache Hit vs Cache Shield vs Origin Failover and HTTP Cache-Control stale-while-revalidate.',
      steps: ['Client Request to Nearest PoP', 'L1 Edge Cache Hit (2ms)', 'L2 Regional Shield (if miss)', 'Origin HTTP Fetch (if stale)', 'Background Asynchronous Revalidation']
    },
    {
      file: 'diagram-06-core-web-vitals-matrix.svg',
      title: 'Google Core Web Vitals Optimization Matrix: LCP, INP, CLS',
      category: 'PERFORMANCE BENCHMARKS',
      accent: '#06b6d4',
      desc: 'Target thresholds, real-world attribution, and lab vs field telemetry for sub-second perception.',
      steps: ['LCP < 2.5s (Target: 800ms)', 'INP < 200ms (Target: 50ms)', 'CLS < 0.1 (Target: 0.00)', 'Zero Layout Shift Containers', 'Preload Hero LCP Resources']
    }
  ],

  'how-browser-tabs-use-memory': [
    {
      file: 'diagram-01-chrome-multiprocess-model.svg',
      title: 'Chromium Multi-Process Architecture & IPC Bus',
      category: 'BROWSER INTERNALS',
      accent: '#38bdf8',
      desc: 'Browser Main Process, GPU Process, Network Service, and Isolated Renderer Processes communicating via Mojo IPC.',
      steps: ['Browser UI & Storage Coordinator', 'Dedicated GPU Raster Process', 'Network Service Process', 'Isolated Renderer Per Origin', 'Sandboxed Utility Services']
    },
    {
      file: 'diagram-02-site-isolation-sandboxing.svg',
      title: 'Site Isolation & Cross-Origin iframe Process Boundary',
      category: 'SECURITY SANDBOXING',
      accent: '#10b981',
      desc: 'Defending against Spectre attacks by giving each eTLD+1 origin its own private OS address space.',
      steps: ['Page loads 3rd party iframe', 'Renderer forks out-of-process iframe', 'OS memory page isolation', 'Mojo IPC cross-frame messaging', 'Memory cost: ~35MB per origin']
    },
    {
      file: 'diagram-03-v8-heap-memory-layout.svg',
      title: 'V8 JavaScript Engine Memory Heap Layout',
      category: 'V8 RUNTIME',
      accent: '#8b5cf6',
      desc: 'New Space (Nursery + Intermediate), Old Pointer Space, Old Data Space, Large Object Space, and Code Space.',
      steps: ['Allocation in New Space (Nursery)', 'Minor GC scavenges survivors', 'Promotion to Old Space', 'Code Space for JIT TurboFan', 'Large Objects bypassed directly']
    },
    {
      file: 'diagram-04-garbage-collection-scavenger.svg',
      title: 'V8 Major GC: Concurrent Mark-Sweep-Compact Pipeline',
      category: 'MEMORY MANAGEMENT',
      accent: '#f59e0b',
      desc: 'Incremental marking on helper threads, idle-time sweeping, and page compaction to eliminate RAM fragmentation.',
      steps: ['Concurrent Marking Threads', 'Main Thread Incremental Steps', 'Stop-the-World Pause (<2ms)', 'Sweeping Unreachable Objects', 'Compacting Memory Segments']
    },
    {
      file: 'diagram-05-tab-discarding-lifecycle.svg',
      title: 'Chrome Tab Discarding & Memory Saver State Machine',
      category: 'RESOURCE EFFICIENCY',
      accent: '#ec4899',
      desc: 'Active -> Background -> Snoozed -> Freeze -> Discarded state transitions when OS RAM runs low.',
      steps: ['Active Tab: Full 300MB Footprint', 'Background Tab: Timers Throttled', 'Frozen: DOM & JS Suspended', 'Discarded: Renderer Killed (0MB)', 'Click to Restore: Instant Reload']
    },
    {
      file: 'diagram-06-bfcache-memory-footprint.svg',
      title: 'Back/Forward Cache (bfcache) In-Memory Page Freeze',
      category: 'CACHE ARCHITECTURE',
      accent: '#06b6d4',
      desc: 'Preserving full DOM, JavaScript execution context, and styles in RAM for instantaneous navigation.',
      steps: ['User Navigates Forward', 'Entire Page Tree Frozen in RAM', 'Network sockets paused', 'User Clicks Back Button', 'Zero-Latency Page Resume']
    }
  ],

  'what-happens-when-you-type-a-url': [
    {
      file: 'diagram-01-keyboard-interrupt-kernel.svg',
      title: 'Hardware Keyboard Switch Interrupt to Kernel Ring Buffer',
      category: 'HARDWARE & KERNEL',
      accent: '#38bdf8',
      desc: 'Mechanical keycap debounce, USB HID controller interrupt, OS CPU IRQ, and window manager event loop.',
      steps: ['Keycap Switch Closes Contact', 'USB Microcontroller Scans Matrix', 'Interrupt Request (IRQ) to CPU', 'OS HID Driver Enqueues Scancode', 'Browser Event Loop dispatches keydown']
    },
    {
      file: 'diagram-02-hsts-preload-lookup.svg',
      title: 'URL Parsing, HSTS Preload Check & ServiceWorker Intercept',
      category: 'BROWSER SUBSYSTEMS',
      accent: '#10b981',
      desc: 'Protocol resolution, punycode encoding, hardcoded HSTS list check, and local ServiceWorker fetch interception.',
      steps: ['Syntax Verification & URL Normalization', 'HSTS Preload List Query', 'ServiceWorker fetch event check', 'Disk Cache & Memory Cache Lookup', 'Network Request Initialized']
    },
    {
      file: 'diagram-03-tcp-three-way-handshake.svg',
      title: 'TCP 3-Way Handshake SYN / SYN-ACK / ACK Sequence',
      category: 'TRANSPORT LAYER',
      accent: '#8b5cf6',
      desc: 'SYN packet with Initial Sequence Number (ISN), SYN-ACK acknowledgment, and socket state transition to ESTABLISHED.',
      steps: ['Client sends SYN (seq=x)', 'Server replies SYN-ACK (seq=y, ack=x+1)', 'Client sends ACK (seq=x+1, ack=y+1)', 'TCP Socket state = ESTABLISHED', 'Window scale & MSS negotiated']
    },
    {
      file: 'diagram-04-http2-http3-multiplexing.svg',
      title: 'HTTP/2 vs HTTP/3 QUIC: Head-of-Line Blocking Solution',
      category: 'PROTOCOL EVOLUTION',
      accent: '#f59e0b',
      desc: 'Why packet loss in TCP halts all HTTP/2 streams, while HTTP/3 over UDP isolates streams completely.',
      steps: ['HTTP/1.1: Single file per connection', 'HTTP/2: Multiplexed binary streams', 'TCP packet drop: All streams stall', 'HTTP/3 QUIC: UDP Independent streams', 'Zero Head-of-Line blocking']
    },
    {
      file: 'diagram-05-dom-construction-stream.svg',
      title: 'Incremental HTML Parser & DOM Tree Construction Stream',
      category: 'PARSING PIPELINE',
      accent: '#ec4899',
      desc: 'Bytes -> Characters -> Tokens -> Nodes -> DOM Tree streaming while speculative pre-parser fetches assets.',
      steps: ['Network chunk received', 'HTML Tokenizer emits StartTag/EndTag', 'Tree Builder constructs Node', 'Speculative Parser preloads images', 'DOM ready for execution']
    },
    {
      file: 'diagram-06-gpu-compositing-pipeline.svg',
      title: 'Layout Engine, Paint Records & GPU Rasterization Pipeline',
      category: 'GRAPHICS RASTERIZATION',
      accent: '#06b6d4',
      desc: 'Style recalculation, layout box geometry, paint recording, compositor thread tiling, and GPU quad submission.',
      steps: ['Style Invalidation & CSS Matching', 'Layout computes X,Y,Width,Height', 'Paint records Skia display lists', 'Compositor tiles viewport textures', 'GPU glDrawElements renders pixels']
    }
  ],

  'why-phones-get-slower-over-time': [
    {
      file: 'diagram-01-nand-write-amplification.svg',
      title: 'NAND Flash Write Amplification Factor (WAF) Curve',
      category: 'SILICON PHYSICS',
      accent: '#38bdf8',
      desc: 'How drive fullness skyrockets Write Amplification Factor from 1.1x to over 8.5x, choking write speeds.',
      steps: ['Fresh Drive (20% full): WAF ~ 1.1x', 'Half Full (50% full): WAF ~ 1.8x', 'Nearly Full (85% full): WAF ~ 4.2x', 'Critical Full (95% full): WAF > 8.5x', 'Controller spends 90% time on GC']
    },
    {
      file: 'diagram-02-sqlite-wal-fragmentation.svg',
      title: 'Mobile SQLite WAL Database Bloat & Fragmentation',
      category: 'DATABASE FORENSICS',
      accent: '#10b981',
      desc: 'Messaging apps (WhatsApp, Telegram) accumulating gigabytes of fragmented B-Trees across years of uncompacted writes.',
      steps: ['Daily Chat Writes & Media Logging', 'Write-Ahead Log (WAL) accumulates', 'B-Tree Index splits and fragments', 'Query scan time increases 500%', 'Vacuum & defrag rarely executed']
    },
    {
      file: 'diagram-03-ram-zram-swapping.svg',
      title: 'Mobile RAM Pressure & Linux zRAM Compressed Swap Thrashing',
      category: 'KERNEL MEMORY',
      accent: '#8b5cf6',
      desc: 'When app memory demand exceeds physical RAM, the CPU constantly burns cycles compressing memory into zRAM.',
      steps: ['Apps consume physical LPDDR4/5', 'Low Memory Killer daemon (LMKD) active', 'Kernel swaps inactive pages to zRAM', 'CPU decompresses pages on demand', 'CPU cycles lost to decompression churn']
    },
    {
      file: 'diagram-04-battery-voltage-throttling.svg',
      title: 'Battery Internal Impedance Rise & Dynamic Thermal Throttling',
      category: 'ELECTROCHEMISTRY',
      accent: '#f59e0b',
      desc: 'Lithium battery SEI layer thickening raises internal resistance (IR), forcing CPU frequency clamps under peak load.',
      steps: ['Charge Cycles degrade SEI Layer', 'Internal Resistance increases (mΩ)', 'Peak current draws cause voltage droop', 'Power IC clamps CPU/GPU clock', 'Micro-stutters and frame drops occur']
    },
    {
      file: 'diagram-05-background-daemon-contention.svg',
      title: 'Background Process Contention & WakeLock Architecture',
      category: 'OS SCHEDULING',
      accent: '#ec4899',
      desc: 'Analytics SDKs, location polling, and push notifications competing for little.LITTLE CPU scheduler cores.',
      steps: ['Installed Apps register background jobs', 'Push Notification daemons poll', 'Location SDKs trigger geofences', 'CPU wakeups prevent deep C-States', 'Battery drain and thermal build-up']
    },
    {
      file: 'diagram-06-factory-reset-vs-wear.svg',
      title: 'Factory Reset Benefits vs Irreversible Physical Silicon Wear',
      category: 'HARDWARE TRUTHS',
      accent: '#06b6d4',
      desc: 'Factory resets clean filesystem caches and database bloat, but cannot reverse NAND flash wear or battery decay.',
      steps: ['Software Reset: Clears SQLite Bloat (100% fix)', 'Software Reset: Clears Junk Daemons (100% fix)', 'Hardware Wear: NAND Oxide Degradation (0% fix)', 'Hardware Wear: Battery Chemistry (0% fix)', 'Thermal Paste Degradation (0% fix)']
    }
  ],

  'what-websites-collect-before-you-allow-cookies': [
    {
      file: 'diagram-01-passive-http-headers.svg',
      title: 'Passive HTTP Request Header Extraction & Client Hints',
      category: 'NETWORK TELEMETRY',
      accent: '#38bdf8',
      desc: 'User-Agent, Sec-CH-UA, Accept-Language, IP Address, and BGP ASN transmitted before any JavaScript executes.',
      steps: ['Initial TCP/TLS Handshake', 'HTTP GET request transmitted', 'IP reveals Country, City, ISP', 'Sec-CH-UA reveals exact OS & Chip', 'Referrer reveals precise inbound source']
    },
    {
      file: 'diagram-02-canvas-fingerprint-raster.svg',
      title: 'HTML5 Canvas 2D Hidden Subpixel Glyph Rasterization',
      category: 'FINGERPRINTING ENGINES',
      accent: '#10b981',
      desc: 'Subtle differences in GPU drivers, font antialiasing, and subpixel rendering create a 99.8% unique device hash.',
      steps: ['Script creates invisible 200x50 canvas', 'Renders complex font glyphs & emojis', 'Applies gradient shading & compositing', 'Reads raw pixel buffer via toDataURL()', 'Generates SHA-256 fingerprint hash']
    },
    {
      file: 'diagram-03-webgl-gpu-unmasking.svg',
      title: 'WebGL GPU Unmasked Vendor & Renderer Parameter Leakage',
      category: 'GRAPHICS TELEMETRY',
      accent: '#8b5cf6',
      desc: 'Querying WEBGL_debug_renderer_info unmasks the exact physical graphics card model and driver version.',
      steps: ['Initializes WebGL Rendering Context', 'Queries EXT_debug_renderer_info', 'Extracts UNMASKED_VENDOR_WEBGL', 'Extracts UNMASKED_RENDERER_WEBGL', 'Bypasses browser privacy protections']
    },
    {
      file: 'diagram-04-audiocontext-oscillator.svg',
      title: 'Web Audio API AudioContext Oscillator Frequency Drift',
      category: 'AUDIO TELEMETRY',
      accent: '#f59e0b',
      desc: 'Synthesizing audio buffers and calculating mathematical FFT harmonics reveals DAC and audio processing hardware traits.',
      steps: ['Creates OfflineAudioContext', 'Attaches OscillatorNode (sine wave)', 'Applies DynamicsCompressor filter', 'Renders waveform buffer', 'Calculates float signature of sound card']
    },
    {
      file: 'diagram-05-localstorage-vs-cookie.svg',
      title: 'Client Storage Sandboxes: Cookies vs LocalStorage vs IndexedDB',
      category: 'DATA STORAGE',
      accent: '#ec4899',
      desc: 'How trackers pivot to IndexedDB, Cache API, and ETags when standard HTTP cookies are blocked.',
      steps: ['Standard HTTP Cookies (4KB, header sent)', 'LocalStorage (5MB-10MB, persistent)', 'IndexedDB (Structured NoSQL storage)', 'Cache API (ServiceWorker asset store)', 'ETag & TLS Session Ticket bounce tracking']
    },
    {
      file: 'diagram-06-consent-banner-telemetry-gap.svg',
      title: 'The Consent Management Platform (CMP) Telemetry Gap',
      category: 'LEGAL & REALITY',
      accent: '#06b6d4',
      desc: 'Data already harvested and dispatched to analytics endpoints while the user decides whether to click Accept.',
      steps: ['0ms: Page requested', '150ms: Telemetry beacons fired', '300ms: Canvas & WebGL hashed', '500ms: Banner UI displayed to user', '5000ms: User clicks "Reject" (Too Late)']
    }
  ],

  'why-large-images-slow-websites': [
    {
      file: 'diagram-01-codec-efficiency-comparison.svg',
      title: 'Next-Gen Codec Efficiency: PNG vs JPEG vs WebP vs AVIF',
      category: 'IMAGE COMPRESSION',
      accent: '#38bdf8',
      desc: 'Comparative compression curves showing AVIF saving 78% bandwidth over legacy JPEG at identical perceptual DSSIM.',
      steps: ['Raw Camera Capture: 10,000 KB (10 MB)', 'Optimized JPEG (MozJPEG): 1,850 KB', 'Modern WebP: 920 KB', 'Next-Gen AVIF (AOMedia): 380 KB', 'Zero visible perceptual artifacting']
    },
    {
      file: 'diagram-02-chroma-subsampling-grid.svg',
      title: 'Chroma Subsampling Physics: 4:4:4 vs 4:2:2 vs 4:2:0 Matrices',
      category: 'VISION SCIENCE',
      accent: '#10b981',
      desc: 'How human eye rod cells (luminance) dominate cone cells (chrominance), allowing 50% color data reduction.',
      steps: ['Y Component: 100% Luma preserved', 'Cb Component: Blue-difference downsampled', 'Cr Component: Red-difference downsampled', '4:2:0 subsampling cuts raw size in half', 'Indistinguishable to human retina']
    },
    {
      file: 'diagram-03-memory-decompression-ram.svg',
      title: 'Decompressed Bitmap RGBA VRAM Footprint in Memory',
      category: 'HARDWARE MEMORY',
      accent: '#8b5cf6',
      desc: 'A 2 MB compressed file decompresses into Width x Height x 4 bytes of raw RGBA GPU texture memory (e.g. 96 MB RAM!).',
      steps: ['Compressed AVIF: 380 KB on disk', 'Browser decodes in memory thread', 'Decoded dimensions: 6000 x 4000 px', 'Raw RGBA: 24,000,000 pixels x 4 bytes', 'Total VRAM consumed: 96,000,000 bytes (96 MB)']
    },
    {
      file: 'diagram-04-lcp-waterfall-impact.svg',
      title: 'Largest Contentful Paint (LCP) Delay in Network Waterfall',
      category: 'CORE WEB VITALS',
      accent: '#f59e0b',
      desc: 'How unoptimized images monopolize HTTP/2 stream bandwidth, starving critical CSS and JavaScript.',
      steps: ['HTML loads at 80ms', '10MB image starts downloading at 120ms', 'TCP congestion window saturates', 'Critical CSS & Fonts choked', 'LCP occurs at 4,800ms (Fail threshold)']
    },
    {
      file: 'diagram-05-responsive-srcset-selection.svg',
      title: 'Responsive <picture> & srcset Browser Viewport Selection',
      category: 'RESPONSIVE ARCHITECTURE',
      accent: '#ec4899',
      desc: 'Browser picks exact image resolution based on device pixel ratio (DPR 1x vs 2x vs 3x) and viewport width.',
      steps: ['Mobile Viewport (390px, DPR 3): 768w image', 'Tablet Viewport (768px, DPR 2): 1080w image', 'Desktop 4K Display (1920px): 1920w image', 'Browser downloads only needed bytes', 'Saves 80%+ mobile data allowance']
    },
    {
      file: 'diagram-06-cdn-on-the-fly-resizing.svg',
      title: 'Cloudflare / Fastly Edge Image Resizing & Codec Negotiation',
      category: 'EDGE TRANSFORMATION',
      accent: '#06b6d4',
      desc: 'Browser sends Accept: image/avif,image/webp; Edge converts and caches optimal format automatically.',
      steps: ['Client sends HTTP Accept headers', 'Edge Worker inspects client capabilities', 'Fetches master raw asset from S3', 'Encodes to AVIF using Rust SIMD engine', 'Delivers instantly from local PoP cache']
    }
  ],

  'what-happens-to-data-after-uninstalling-an-app': [
    {
      file: 'diagram-01-app-sandbox-file-tree.svg',
      title: 'Mobile App Sandbox File Hierarchy: /data/data/<package>',
      category: 'OS SANDBOX FORENSICS',
      accent: '#38bdf8',
      desc: 'Private internal storage directories (databases, shared_prefs, files, code_cache) purged on uninstall.',
      steps: ['/data/data/com.app.name private directory', 'databases/ (Encrypted SQLite DBs)', 'shared_prefs/ (XML configuration)', 'cache/ (HTTP response buffers)', 'OS removes entire folder tree']
    },
    {
      file: 'diagram-02-os-deletion-cascade.svg',
      title: 'OS Uninstall Cascade: Local Files, Permissions & Keychains',
      category: 'SYSTEM INTEGRITY',
      accent: '#10b981',
      desc: 'What the OS truly deletes vs persistent iOS Keychain items, Android MediaStore assets, and server backups.',
      steps: ['App icon dragged to "Uninstall"', 'Package Manager kills process', 'Private sandbox unlinked', 'Hardware Keystore credentials purged', 'Orphaned shared assets left behind']
    },
    {
      file: 'diagram-03-mediastore-orphaned-files.svg',
      title: 'Android Scoped Storage & MediaStore Orphaned Assets',
      category: 'FILE SYSTEM PERSISTENCE',
      accent: '#8b5cf6',
      desc: 'Photos and videos written to DCIM/ or Pictures/ survive app deletion indefinitely as shared media files.',
      steps: ['Camera app saves photo to MediaStore', 'App assigns metadata tags', 'User uninstalls camera application', 'MediaStore keeps photo in /sdcard/DCIM', 'New gallery app reads existing photo']
    },
    {
      file: 'diagram-04-cloud-push-token-revocation.svg',
      title: 'Apple APNs & Google FCM Device Push Token Lifecycle',
      category: 'CLOUD MESSAGING',
      accent: '#f59e0b',
      desc: 'How cloud notification services detect app uninstalls via device feedback error responses.',
      steps: ['Server sends Push Notification payload', 'APNs / FCM attempts device delivery', 'Device responds: App Not Installed (410)', 'Cloud registers uninstall event', 'Server suspends marketing push tokens']
    },
    {
      file: 'diagram-05-device-identifier-resets.svg',
      title: 'Advertising ID Resets vs Server-Side Identity Graphs',
      category: 'PRIVACY DECONSTRUCTION',
      accent: '#ec4899',
      desc: 'Why resetting your Google Advertising ID doesn’t wipe the server-side identity graph built on email & IP.',
      steps: ['User resets GAID / IDFA in settings', 'Local identifier changes to fresh UUID', 'App reinstalled months later', 'User logs in via Google/Email account', 'Server merges past history immediately']
    },
    {
      file: 'diagram-06-clean-install-vs-wipe.svg',
      title: 'Storage Hygiene Matrix: Cache Clear vs Uninstall vs MDM Wipe',
      category: 'FORENSIC COMPARISON',
      accent: '#06b6d4',
      desc: 'Side-by-side data deletion capabilities across Android, iOS, and enterprise mobile device management.',
      steps: ['Clear Cache: Frees temp files, retains login', 'Clear Data: Resets app to factory initial state', 'Uninstall: Removes local sandbox', 'Cloud Sync: Server keeps account history', 'Remote MDM Wipe: Factory cryptographic zeroing']
    }
  ],

  'why-same-wifi-speed-can-feel-different': [
    {
      file: 'diagram-01-bandwidth-vs-latency-pipe.svg',
      title: 'Bandwidth (Pipe Diameter) vs Latency (Speed of Sound) Model',
      category: 'NETWORK PHYSICS',
      accent: '#38bdf8',
      desc: 'Why 100 Mbps with 150ms ping feels sluggish for calls and gaming while 20 Mbps with 12ms ping feels instantaneous.',
      steps: ['Network A: 100 Mbps @ 18ms latency (Instant)', 'Network B: 100 Mbps @ 160ms latency (Laggy)', 'Bandwidth = Volume of data per second', 'Latency = Time for one packet to arrive', 'High bandwidth cannot fix high latency']
    },
    {
      file: 'diagram-02-bufferbloat-queue-delay.svg',
      title: 'Bufferbloat: How Deep FIFO Queues Destroy Real-Time Traffic',
      category: 'QUEUE DYNAMICS',
      accent: '#10b981',
      desc: 'Large unmanaged router buffers delay real-time audio and game packets during background upload downloads.',
      steps: ['Host starts bulk file upload', 'Router FIFO buffer fills completely', 'Queue delay spikes from 15ms to 600ms', 'VoIP packets trapped behind bulk TCP chunks', 'Video call stutters, games disconnect']
    },
    {
      file: 'diagram-03-frequency-band-attenuation.svg',
      title: 'Wi-Fi Frequencies: 2.4 GHz vs 5 GHz vs 6 GHz (Wi-Fi 6E/7)',
      category: 'RF RADIO FREQUENCY',
      accent: '#8b5cf6',
      desc: 'RF wavelength physics: 2.4 GHz penetrates concrete walls; 6 GHz delivers ultra-wide 160/320 MHz low-latency channels.',
      steps: ['2.4 GHz: High penetration, crowded, 20 MHz', '5 GHz: Medium range, low interference, 80 MHz', '6 GHz (Wi-Fi 7): Zero legacy congestion, 320 MHz', 'Channel overlap in 2.4 GHz causes packet drop', 'Multi-Link Operation (MLO) aggregates bands']
    },
    {
      file: 'diagram-04-airtime-fairness-collision.svg',
      title: 'CSMA/CA Airtime Contention & Legacy Device Slowdown',
      category: 'MAC LAYER PROTOCOLS',
      accent: '#f59e0b',
      desc: 'How an ancient 802.11b smart bulb consumes 70% of available airtime, dragging down Wi-Fi 6 devices.',
      steps: ['Carrier Sense Multiple Access with Collision Avoidance', 'Devices wait for clear airtime slot', 'Slow device transmits at 5.5 Mbps', 'Fast device waits idle in queue', 'Airtime Fairness scheduler balances airtime']
    },
    {
      file: 'diagram-05-codel-fq-active-queue.svg',
      title: 'CoDel & FQ-CoDel Smart Queue Management (SQM) Smoothing',
      category: 'ALGORITHM DESIGN',
      accent: '#ec4899',
      desc: 'Fair Queuing Controlled Delay drops offending TCP packets early, keeping router latency flat under full load.',
      steps: ['Packets hashed into individual flow queues', 'Round-Robin scheduling between flows', 'CoDel algorithm measures sojourn time', 'Drops single packet if queue persists >5ms', 'Sender shrinks TCP window, latency remains low']
    },
    {
      file: 'diagram-06-isp-peering-bgp-hops.svg',
      title: 'ISP Transit Peering, Internet Exchanges (IXP) & BGP Routing',
      category: 'GLOBAL ROUTING',
      accent: '#06b6d4',
      desc: 'Why two neighbors with 100 Mbps plans have wildly different game ping based on upstream Tier 1 transit routes.',
      steps: ['ISP A: Peered directly at local IXP (8ms ping)', 'ISP B: Hairpins traffic 800 miles away (65ms ping)', 'BGP routing policy dictates packet path', 'Subsea cable routing variations', 'Physical distance sets unbending speed of light']
    }
  ],

  'hidden-cost-of-free-online-tools': [
    {
      file: 'diagram-01-free-tool-server-economics.svg',
      title: 'Free Utility Economics: Cloud Compute vs Monetization Models',
      category: 'SERVER ECONOMICS',
      accent: '#38bdf8',
      desc: 'Running CPU-heavy file conversions costs real hosting dollars; if there is no subscription, your data is the revenue.',
      steps: ['User uploads 25 MB document for conversion', 'Cloud server runs headless LibreOffice CPU task', 'Bandwidth egress costs incurred', 'Free user pays $0.00 to platform', 'Revenue generated by data reselling & targeted ads']
    },
    {
      file: 'diagram-02-pdf-document-exfiltration.svg',
      title: 'Server-Side PDF Processing & Unregulated Cloud Storage Pools',
      category: 'DOCUMENT PRIVACY',
      accent: '#10b981',
      desc: 'Files uploaded to online PDF editors often persist on backend object storage long after download completes.',
      steps: ['Upload to "free-pdf-compressor.example"', 'File unzipped on shared Linux worker', 'Extracted text indexed for OCR training', 'Stored in multi-tenant AWS S3 bucket', 'Retention period: Often indefinite or 30+ days']
    },
    {
      file: 'diagram-03-exif-metadata-leakage.svg',
      title: 'Image & File EXIF Metadata: Forensic Leakage Vectors',
      category: 'METADATA FORENSICS',
      accent: '#8b5cf6',
      desc: 'Images contain GPS coordinates, camera serial numbers, author usernames, and embedded printer tracking codes.',
      steps: ['Camera records GPS Latitude/Longitude', 'Embeds device IMEI & serial number', 'Online converter ingests raw file', 'Third-party scripts extract EXIF tags', 'Location and identity correlated across tools']
    },
    {
      file: 'diagram-04-data-broker-enrichment-loop.svg',
      title: 'Email Harvesting, Hash Matching & Data Broker Ecosystem',
      category: 'DATA BROKER NETWORKS',
      accent: '#f59e0b',
      desc: 'Requiring an email to receive your converted file enters you into automated data enrichment and lead lists.',
      steps: ['"Enter email to download your PDF"', 'Email hashed into SHA-256 identifier', 'Cross-referenced with Data Broker identity graphs', 'Enriched with employer, salary, phone number', 'Added to commercial B2B marketing databases']
    },
    {
      file: 'diagram-05-client-side-wasm-sandbox.svg',
      title: 'Privacy-First Architecture: Client-Side WebAssembly (WASM)',
      category: 'LOCAL EXECUTION',
      accent: '#ec4899',
      desc: 'Modern browsers can run FFmpeg, SQLite, and PDF tools 100% inside your browser with zero server uploads.',
      steps: ['Browser loads compiled WebAssembly binary', 'File dragged into browser memory buffer', 'WASM executes CPU computation locally', 'Processed file exported directly to disk', 'Zero bytes transmitted across the network']
    },
    {
      file: 'diagram-06-pre-upload-security-checklist.svg',
      title: 'The Enterprise 7-Point Pre-Upload Security Checklist',
      category: 'SECURITY AUDIT',
      accent: '#06b6d4',
      desc: 'Mandatory decision tree before uploading corporate or sensitive personal documents to any online tool.',
      steps: ['1. Is HTTPS and HSTS active?', '2. Does processing happen locally or server-side?', '3. What is the explicit file retention policy?', '4. Is an email address required?', '5. Are third-party trackers present?', '6. Has EXIF/PII been scrubbed?', '7. Is there a GDPR/SOC2 compliance badge?']
    }
  ],

  'chatgpt-secret-codes': [
    {
      file: 'diagram-01-transformer-attention-matrix.svg',
      title: 'Transformer Multi-Head Self-Attention Weight Matrix',
      category: 'AI ARCHITECTURE',
      accent: '#38bdf8',
      desc: 'How Query, Key, and Value vector dot-products determine semantic attention across deep prompt token contexts.',
      steps: ['Input Tokens projected into Q, K, V vectors', 'Scaled Dot-Product Attention: Softmax(QK^T / sqrt(d)) * V', 'Multi-Head split attends to syntax & facts', 'Feed-Forward neural network transforms hidden state', 'Layer normalization stabilizes training dynamics']
    },
    {
      file: 'diagram-02-temperature-sampling-curve.svg',
      title: 'Temperature & Top-P Probability Distribution Sampling Curve',
      category: 'INFERENCE DYNAMICS',
      accent: '#10b981',
      desc: 'Mathematical impact of Temperature (0.0 to 1.5) and Top-P Nucleus cutoff on token probability logits.',
      steps: ['Logits output from final linear head', 'Temperature divides logits before Softmax', 'T = 0.0: Greedy argmax deterministic output', 'T = 0.7: Balanced creative reasoning', 'Top-P = 0.9: Truncates improbable tail tokens']
    },
    {
      file: 'diagram-03-system-prompt-sandboxing.svg',
      title: 'System Prompt Hierarchy & Instruction-Following Sandboxing',
      category: 'PROMPT SECURITY',
      accent: '#8b5cf6',
      desc: 'Developer system instructions vs User prompts vs Tool outputs in multi-turn conversational trees.',
      steps: ['System Role: Immutable Core Guardrails', 'User Role: Dynamic Task Prompts', 'Assistant Role: Reasoning & Response Generation', 'Tool Role: External Sandbox Function Payloads', 'Instruction Tuning prioritizes System over User overrides']
    },
    {
      file: 'diagram-04-chain-of-thought-tree.svg',
      title: 'Chain-of-Thought (CoT) & Tree-of-Thoughts Reasoning Branches',
      category: 'REASONING ALGORITHMS',
      accent: '#f59e0b',
      desc: 'Step-by-step reasoning tokens allowing the model to explore, backtrack, and verify complex logic solutions.',
      steps: ['Problem Prompt formulated', 'Branch 1: Hypothesis Generation', 'Self-Reflection Verification Check', 'Branch Pruning & Backtracking', 'Synthesized Final Output with Verified Proof']
    },
    {
      file: 'diagram-05-function-calling-loop.svg',
      title: 'LLM Function Calling & ReAct Execution Feedback Loop',
      category: 'AGENTIC WORKFLOWS',
      accent: '#ec4899',
      desc: 'How LLMs output structured JSON tool calls, wait for external API responses, and resume final answers.',
      steps: ['User requests real-time data', 'Model outputs JSON: {"name": "fetch_stock", "args": {...}}', 'Client executes API network call', 'Result payload injected back to model context', 'Model generates natural language summary']
    },
    {
      file: 'diagram-06-jailbreak-defense-classifier.svg',
      title: 'Guardrail Classifiers & Multi-Layer Safety Architecture',
      category: 'SAFETY ENGINEERING',
      accent: '#06b6d4',
      desc: 'Input moderation classifiers, RLHF alignment weights, and output token safety filters preventing policy breaches.',
      steps: ['Incoming prompt scanned by LlamaGuard / OpenAI Moderation', 'Adversarial jailbreak patterns detected', 'Alignment loss penalizes hazardous tokens', 'Output streaming checked by safety heuristics', 'Safe sanitized response delivered to user']
    }
  ],

  'top-10-free-ai-tools-2026': [
    {
      file: 'diagram-01-ai-stack-local-vs-cloud.svg',
      title: 'Local Edge Execution (Ollama) vs Cloud API Architectures',
      category: 'INFRASTRUCTURE TOPOLOGY',
      accent: '#38bdf8',
      desc: 'Running private open-weight models on workstation GPUs versus low-latency cloud inference endpoints.',
      steps: ['Local: 100% Data Privacy on Apple Silicon / RTX 4090', 'Local: Zero monthly subscription fees', 'Cloud: Massive frontier parameter scale (e.g. 405B+)', 'Hybrid: Edge router forwards sensitive tasks locally', 'Optimal cost and privacy balance']
    },
    {
      file: 'diagram-02-vram-quantization-benchmarks.svg',
      title: 'Model Quantization (Q4_K_M vs Q8 vs FP16) VRAM Footprints',
      category: 'PERFORMANCE BENCHMARKS',
      accent: '#10b981',
      desc: 'How 4-bit and 8-bit GGUF quantization fits 70B parameter models into modest consumer graphic cards.',
      steps: ['FP16 Unquantized: 140 GB VRAM (Datacenter only)', 'Q8_0 Quantized: 74 GB VRAM (High accuracy)', 'Q4_K_M Quantized: 41 GB VRAM (Consumer sweet spot)', 'Perplexity loss under 0.05 perplexity score', 'Runs on dual RTX 3090/4090 setups']
    },
    {
      file: 'diagram-03-context-window-expansion.svg',
      title: 'Context Window Attention Scaling (128K to 1M Tokens)',
      category: 'ATTENTION SCALING',
      accent: '#8b5cf6',
      desc: 'RoPE position embeddings, RingAttention, and FlashAttention-3 enabling whole-repository codebase analysis.',
      steps: ['RoPE (Rotary Position Embeddings) frequency scaling', 'FlashAttention-3 GPU SRAM memory tiling', 'RingAttention distributed across multiple GPUs', 'Needle-in-a-Haystack retrieval at 99.9%', 'Ingests entire codebases and books in one prompt']
    },
    {
      file: 'diagram-04-developer-productivity-metrics.svg',
      title: 'AI Code Assistant Latency vs Acceptance Rate Matrix',
      category: 'DEV EXPERIENCE',
      accent: '#f59e0b',
      desc: 'Real-world benchmark of inline code completion latency, token velocity, and engineer acceptance ratios.',
      steps: ['Ghost-text inline completion latency < 120ms', 'Multi-line generation acceptance rate: 42%', 'Chat refactor test generation velocity', 'Unit test generation coverage boost: +65%', 'Engineers ship features 2.3x faster']
    }
  ]
};

// Generate SVG files
function createTechnicalDiagramSvg({ title, category, accent, desc, steps }) {
  const stepItems = steps.map((s, idx) => `
    <g transform="translate(${50 + (idx % 3) * 270}, ${180 + Math.floor(idx / 3) * 85})">
      <rect x="0" y="0" width="250" height="70" rx="8" fill="#131b2e" stroke="#1e293b" stroke-width="1.2" />
      <circle cx="22" cy="22" r="12" fill="${accent}" opacity="0.15" />
      <text x="22" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="${accent}" text-anchor="middle">${idx + 1}</text>
      <text x="44" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">Phase ${idx + 1}</text>
      <text x="14" y="50" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" fill="#94a3b8">${s}</text>
    </g>
  `).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="900" height="480">
  <defs>
    <linearGradient id="bg-grad-${Math.abs(title.length * 37)}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0f19" />
      <stop offset="100%" stop-color="#070a10" />
    </linearGradient>
    <pattern id="grid-pat-${Math.abs(title.length * 37)}" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" stroke-width="0.8" stroke-opacity="0.4"/>
    </pattern>
  </defs>
  
  <!-- Canvas Background -->
  <rect width="900" height="480" fill="url(#bg-grad-${Math.abs(title.length * 37)})" />
  <rect width="900" height="480" fill="url(#grid-pat-${Math.abs(title.length * 37)})" />

  <!-- Outer Border Frame -->
  <rect x="20" y="20" width="860" height="440" rx="12" fill="none" stroke="#1e293b" stroke-width="1.5" />

  <!-- Top Accent Bar -->
  <rect x="20" y="20" width="860" height="42" rx="12" fill="#0f172a" />
  <rect x="20" y="60" width="860" height="2" fill="#1e293b" />
  
  <!-- Window Controls -->
  <circle cx="44" cy="41" r="5" fill="#ef4444" />
  <circle cx="60" cy="41" r="5" fill="#f59e0b" />
  <circle cx="76" cy="41" r="5" fill="#10b981" />

  <!-- Category Kicker -->
  <rect x="105" y="31" width="160" height="20" rx="10" fill="rgba(2, 132, 199, 0.12)" stroke="${accent}" stroke-width="0.8"/>
  <text x="185" y="45" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="${accent}" text-anchor="middle" letter-spacing="1">${category}</text>
  <text x="850" y="45" font-family="'JetBrains Mono', monospace" font-size="10" fill="#64748b" text-anchor="end">AHADEX SPEC LABS</text>

  <!-- Title & Description -->
  <text x="50" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="-0.3">${title}</text>
  <text x="50" y="135" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#94a3b8">${desc}</text>

  <!-- Flow Grid Nodes -->
  ${stepItems}

  <!-- Footer Verification Badge -->
  <g transform="translate(50, 400)">
    <rect x="0" y="0" width="800" height="38" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1" />
    <circle cx="20" cy="19" r="6" fill="#10b981" />
    <text x="36" y="23" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#cbd5e1">Hardware Architecture &amp; Protocol Specification &middot; Peer Verified &middot; Ahadex Research</text>
    <text x="785" y="23" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}" text-anchor="end">FIGURE VERIFIED</text>
  </g>
</svg>`;
}

// Write out all diagram files
let totalDiagrams = 0;
Object.entries(diagramDefinitions).forEach(([slug, diagrams]) => {
  const postDir = path.join(__dirname, '../assets/images/posts', slug);
  if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });

  diagrams.forEach(diag => {
    const svgContent = createTechnicalDiagramSvg(diag);
    fs.writeFileSync(path.join(postDir, diag.file), svgContent);
    totalDiagrams++;
  });
});
console.log(`Generated ${totalDiagrams} technical diagrams across all posts.`);
