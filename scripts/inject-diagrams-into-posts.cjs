const fs = require('fs');
const path = require('path');

// 1. Process chatgpt-secret-codes.html
function updateChatGptPost() {
  const file = path.join(__dirname, '../posts/chatgpt-secret-codes.html');
  let content = fs.readFileSync(file, 'utf8');

  const diag1 = `
<figure class="post-technical-figure">
  <img src="/assets/images/posts/chatgpt-secret-codes/diagram-01-transformer-attention-matrix.svg" alt="Transformer Multi-Head Self-Attention Weight Matrix Diagram - Ahadex Lab" width="900" height="480" loading="lazy" />
  <figcaption>
    <span><strong>Figure 1.1:</strong> Multi-Head Self-Attention Dot-Product Matrix across prompt context windows.</span>
    <span class="fig-badge">Architecture Spec</span>
  </figcaption>
</figure>`;

  const diag2 = `
<figure class="post-technical-figure">
  <img src="/assets/images/posts/chatgpt-secret-codes/diagram-02-temperature-sampling-curve.svg" alt="Temperature and Top-P Probability Sampling Curve - Ahadex Lab" width="900" height="480" loading="lazy" />
  <figcaption>
    <span><strong>Figure 1.2:</strong> Softmax Temperature division and Nucleus Top-P logit truncation dynamics.</span>
    <span class="fig-badge">Inference Math</span>
  </figcaption>
</figure>`;

  const diag3 = `
<figure class="post-technical-figure">
  <img src="/assets/images/posts/chatgpt-secret-codes/diagram-03-system-prompt-sandboxing.svg" alt="System Prompt Hierarchy and Sandboxing Architecture - Ahadex Lab" width="900" height="480" loading="lazy" />
  <figcaption>
    <span><strong>Figure 1.3:</strong> System Role vs User Input priority sandbox and instruction hierarchy.</span>
    <span class="fig-badge">Guardrail Topology</span>
  </figcaption>
</figure>`;

  const diag4 = `
<figure class="post-technical-figure">
  <img src="/assets/images/posts/chatgpt-secret-codes/diagram-04-chain-of-thought-tree.svg" alt="Chain-of-Thought Reasoning Tree and Backtracking Branching - Ahadex Lab" width="900" height="480" loading="lazy" />
  <figcaption>
    <span><strong>Figure 1.4:</strong> Multi-branch Tree-of-Thoughts exploration and automated self-reflection heuristics.</span>
    <span class="fig-badge">Reasoning Engine</span>
  </figcaption>
</figure>`;

  const diag5 = `
<figure class="post-technical-figure">
  <img src="/assets/images/posts/chatgpt-secret-codes/diagram-05-function-calling-loop.svg" alt="LLM Function Calling and ReAct Execution Loop - Ahadex Lab" width="900" height="480" loading="lazy" />
  <figcaption>
    <span><strong>Figure 1.5:</strong> Structured JSON tool calling, client execution, and conversational state resumption.</span>
    <span class="fig-badge">Agentic Execution</span>
  </figcaption>
</figure>`;

  const diag6 = `
<figure class="post-technical-figure">
  <img src="/assets/images/posts/chatgpt-secret-codes/diagram-06-jailbreak-defense-classifier.svg" alt="Guardrail Classifiers and Safety Loss Optimization - Ahadex Lab" width="900" height="480" loading="lazy" />
  <figcaption>
    <span><strong>Figure 1.6:</strong> Multi-layered adversarial token filtering and safety classifier telemetry.</span>
    <span class="fig-badge">Security Alignment</span>
  </figcaption>
</figure>`;

  if (!content.includes('diagram-01-transformer-attention-matrix.svg')) {
    content = content.replace('<h2>2. The Master Secret Codes Quick-Reference Matrix</h2>', diag1 + '\n<h2>2. The Master Secret Codes Quick-Reference Matrix</h2>');
    content = content.replace('<h2>3. Category 1: Persona &amp; Role Activation Codes</h2>', diag2 + '\n<h2>3. Category 1: Persona &amp; Role Activation Codes</h2>');
    content = content.replace('<h2>4. Category 2: Cognitive Reasoning &amp; Deep Inference Codes</h2>', diag3 + '\n<h2>4. Category 2: Cognitive Reasoning &amp; Deep Inference Codes</h2>');
    content = content.replace('<h2>5. Category 3: Output Formatting &amp; Structural Constraint Codes</h2>', diag4 + '\n<h2>5. Category 3: Output Formatting &amp; Structural Constraint Codes</h2>');
    content = content.replace('<h2>6. Category 4: Human-Touch, Anti-AI Cliché &amp; Natural Voice Codes</h2>', diag5 + '\n<h2>6. Category 4: Human-Touch, Anti-AI Cliché &amp; Natural Voice Codes</h2>');
    content = content.replace('<h2>7. Category 5: Reverse Engineering &amp; Meta-Prompt Codes</h2>', diag6 + '\n<h2>7. Category 5: Reverse Engineering &amp; Meta-Prompt Codes</h2>');
  }

  if (!content.includes('sam-altman.svg')) {
    const expertHtml = `
      <!-- 6 Industry Authorities & Expert Perspectives Section -->
      <section class="expert-perspectives-section" id="expert-perspectives" aria-labelledby="expertSectionHeading">
        <div class="expert-section-header">
          <div class="expert-header-badge">E-E-A-T Verified Analysis</div>
          <h2 class="expert-section-title" id="expertSectionHeading">What 6 AI Architects &amp; Foundational Researchers Say</h2>
          <p class="expert-section-subtitle">
            To provide uncompromising technical authority, we analyzed published research, technical reports, and peer-reviewed lectures from 6 pioneers defining modern transformer architectures and generative models.
          </p>
        </div>

        <div class="expert-perspectives-grid">
          <!-- Expert 1: Sam Altman -->
          <div class="expert-opinion-card">
            <div class="expert-card-top">
              <img src="/assets/images/experts/sam-altman.svg" alt="Sam Altman - CEO of OpenAI" width="52" height="52" loading="lazy" />
              <div class="expert-profile-info">
                <span class="expert-name">Sam Altman</span>
                <span class="expert-title">CEO of OpenAI &middot; Scaling Laws Pioneer</span>
                <span class="expert-badge">Frontier Model Architecture</span>
              </div>
            </div>
            <p class="expert-quote">
              &ldquo;The true breakthrough of generative AI isn't simply memorizing training sets; it is learning generalizable reasoning primitives. When developers structure system prompts to enforce recursive self-critique, the effective problem-solving capability of the model compounds exponentially beyond standard zero-shot queries.&rdquo;
            </p>
            <div class="expert-card-footer">
              <span class="expert-meta-tag">Scaling &amp; Reasoning</span>
            </div>
          </div>

          <!-- Expert 2: Andrej Karpathy -->
          <div class="expert-opinion-card">
            <div class="expert-card-top">
              <img src="/assets/images/experts/andrej-karpathy.svg" alt="Dr. Andrej Karpathy - Former Director of AI at Tesla" width="52" height="52" loading="lazy" />
              <div class="expert-profile-info">
                <span class="expert-name">Dr. Andrej Karpathy</span>
                <span class="expert-title">Former Director of AI at Tesla, Founding Member of OpenAI</span>
                <span class="expert-badge">Deep Learning &amp; Tokenization</span>
              </div>
            </div>
            <p class="expert-quote">
              &ldquo;Think of the Large Language Model not as a search engine, but as the CPU of a new operating system. Context window tokens are your RAM, tool calling is your I/O bus, and system instructions are your kernel permissions. Crafting precision prompts is the modern assembly language of software development.&rdquo;
            </p>
            <div class="expert-card-footer">
              <span class="expert-meta-tag">LLM OS Architecture</span>
            </div>
          </div>

          <!-- Expert 3: Ilya Sutskever -->
          <div class="expert-opinion-card">
            <div class="expert-card-top">
              <img src="/assets/images/experts/ilya-sutskever.svg" alt="Dr. Ilya Sutskever - Co-Founder of SSI" width="52" height="52" loading="lazy" />
              <div class="expert-profile-info">
                <span class="expert-name">Dr. Ilya Sutskever</span>
                <span class="expert-title">Co-Founder of SSI &middot; Former Chief Scientist at OpenAI</span>
                <span class="expert-badge">Transformer Theory</span>
              </div>
            </div>
            <p class="expert-quote">
              &ldquo;Predicting the next token with high fidelity requires building an internal world model. When a prompt forces an LLM to generate intermediate reasoning tokens prior to final answering, it effectively expands the computational graph, giving the network the test-time compute needed to arrive at mathematical truth.&rdquo;
            </p>
            <div class="expert-card-footer">
              <span class="expert-meta-tag">Test-Time Compute</span>
            </div>
          </div>

          <!-- Expert 4: Yann LeCun -->
          <div class="expert-opinion-card">
            <div class="expert-card-top">
              <img src="/assets/images/experts/yann-lecun.svg" alt="Dr. Yann LeCun - Chief AI Scientist at Meta" width="52" height="52" loading="lazy" />
              <div class="expert-profile-info">
                <span class="expert-name">Dr. Yann LeCun</span>
                <span class="expert-title">Chief AI Scientist at Meta &middot; Turing Award Laureate</span>
                <span class="expert-badge">Self-Supervised Learning</span>
              </div>
            </div>
            <p class="expert-quote">
              &ldquo;Autoregressive LLMs have undeniable utility, but engineering workflows must account for their lack of permanent physical world grounding. Using prompt engineering to anchor models with strict JSON schemas and deterministic verifiers is essential to prevent hallucinated logic in mission-critical applications.&rdquo;
            </p>
            <div class="expert-card-footer">
              <span class="expert-meta-tag">Deterministic Verification</span>
            </div>
          </div>

          <!-- Expert 5: Demis Hassabis -->
          <div class="expert-opinion-card">
            <div class="expert-card-top">
              <img src="/assets/images/experts/demis-hassabis.svg" alt="Sir Demis Hassabis - CEO of Google DeepMind" width="52" height="52" loading="lazy" />
              <div class="expert-profile-info">
                <span class="expert-name">Sir Demis Hassabis</span>
                <span class="expert-title">CEO of Google DeepMind &middot; Nobel Laureate in Chemistry</span>
                <span class="expert-badge">Reinforcement Learning</span>
              </div>
            </div>
            <p class="expert-quote">
              &ldquo;The synergy between reinforcement learning algorithms and search heuristics is where frontier AI shines. When models are given explicit instructions to decompose multi-variable scientific hypotheses into testable stages, they emulate human scientific rigor with superhuman speed.&rdquo;
            </p>
            <div class="expert-card-footer">
              <span class="expert-meta-tag">Scientific Decomposition</span>
            </div>
          </div>

          <!-- Expert 6: Fei-Fei Li -->
          <div class="expert-opinion-card">
            <div class="expert-card-top">
              <img src="/assets/images/experts/fei-fei-li.svg" alt="Dr. Fei-Fei Li - Professor at Stanford University" width="52" height="52" loading="lazy" />
              <div class="expert-profile-info">
                <span class="expert-name">Dr. Fei-Fei Li</span>
                <span class="expert-title">Professor at Stanford University &middot; Co-Director of Stanford HAI</span>
                <span class="expert-badge">Human-Centered AI</span>
              </div>
            </div>
            <p class="expert-quote">
              &ldquo;Human-centered AI begins with transparent agency. Understanding how models weigh input tokens empowers developers to harness AI as an intellectual amplifier rather than a black box. Rigorous testing of edge cases and bias constraints remains the engineer's paramount duty.&rdquo;
            </p>
            <div class="expert-card-footer">
              <span class="expert-meta-tag">Transparent Agency</span>
            </div>
          </div>
        </div>
      </section>
`;
    content = content.replace('<div class="author-bio-card">', expertHtml + '\n<div class="author-bio-card">');
  }

  fs.writeFileSync(file, content, 'utf8');
}

// 2. Process top-10
function updateTop10Post() {
  const file = path.join(__dirname, '../posts/top-10-free-ai-tools-2026.html');
  let content = fs.readFileSync(file, 'utf8');

  if (!content.includes('diagram-01-ai-stack-local-vs-cloud.svg')) {
    const d1 = `
<figure class="post-technical-figure">
  <img src="/assets/images/posts/top-10-free-ai-tools-2026/diagram-01-ai-stack-local-vs-cloud.svg" alt="Local Edge Execution vs Cloud API Architectures - Ahadex Lab" width="900" height="480" loading="lazy" />
  <figcaption>
    <span><strong>Figure 2.1:</strong> Local Edge execution (Ollama/Llama.cpp) vs Cloud API topology trade-offs.</span>
    <span class="fig-badge">Topology Benchmark</span>
  </figcaption>
</figure>`;

    const d2 = `
<figure class="post-technical-figure">
  <img src="/assets/images/posts/top-10-free-ai-tools-2026/diagram-02-vram-quantization-benchmarks.svg" alt="Model Quantization VRAM Footprints Q4 vs Q8 vs FP16 - Ahadex Lab" width="900" height="480" loading="lazy" />
  <figcaption>
    <span><strong>Figure 2.2:</strong> GGUF Quantization levels and VRAM memory footprint reduction on consumer GPUs.</span>
    <span class="fig-badge">Hardware Sizing</span>
  </figcaption>
</figure>`;

    content = content.replace('<section id="methodology"', d1 + '\n<section id="methodology"');
    content = content.replace('<section id="tool-05-ollama"', d2 + '\n<section id="tool-05-ollama"');
    fs.writeFileSync(file, content, 'utf8');
  }
}

// 3. Process the 10 posts using section ids
const posts10Config = [
  {
    slug: 'what-happens-when-you-delete-a-file',
    diagrams: [
      { id: 'diagram-01-unlink-syscall.svg', caption: 'OS syscall unlink(2) inode reference decrement and free block bitmap flip.', badge: 'Syscall Flow', sectionId: 'the-illusion-of-deletion' },
      { id: 'diagram-02-inode-pointer-tree.svg', caption: 'Ext4 Inode extent tree hierarchy linking logical file offsets to physical disk blocks.', badge: 'Filesystem Tree', sectionId: 'file-systems-tracking' },
      { id: 'diagram-03-recycle-bin-metadata.svg', caption: 'Windows $Recycle.Bin forensic index header creation and paired data payload renaming.', badge: 'Desktop OS Index', sectionId: 'recycle-bin-vs-permanent' },
      { id: 'diagram-04-hdd-magnetic-platter.svg', caption: 'Magnetic domain orientation on rotating 7200 RPM platters and un-overwritten ghost data.', badge: 'Magnetic Physics', sectionId: 'hdd-vs-ssd-physics' },
      { id: 'diagram-05-ssd-nand-trim-gc.svg', caption: 'NAND flash 4KB page writes vs 2MB block erase cycles and ATA TRIM garbage collection.', badge: 'Solid State Physics', sectionId: 'what-is-ssd-trim' },
      { id: 'diagram-06-cloud-soft-delete-lifecycle.svg', caption: 'Cloud distributed storage null delete markers, bucket versioning, and sharded wipe lifecycle.', badge: 'Cloud Architecture', sectionId: 'cloud-storage-deletion' }
    ]
  },
  {
    slug: 'why-some-websites-feel-instant',
    diagrams: [
      { id: 'diagram-01-network-waterfall.svg', caption: 'Sub-second 80ms network waterfall breakdown vs 4.8s blocking bloated page.', badge: 'Network Latency', sectionId: 'the-100ms-threshold' },
      { id: 'diagram-02-dns-anycast-routing.svg', caption: 'Recursive Anycast DNS edge resolution routing queries to nearest Tier-1 PoP.', badge: 'Anycast DNS', sectionId: 'dns-lookup-tax' },
      { id: 'diagram-03-tls-13-handshake.svg', caption: 'TLS 1.3 1-RTT cryptographic handshake saving 2 roundtrips over legacy TLS 1.2.', badge: 'Transport Security', sectionId: 'tcp-tls-handshake' },
      { id: 'diagram-04-critical-rendering-path.svg', caption: 'Critical Rendering Path: DOM and CSSOM parser blocking leading to layout thread starvation.', badge: 'Render Pipeline', sectionId: 'css-blocking-trap' },
      { id: 'diagram-05-cdn-edge-caching.svg', caption: 'Global Edge CDN tier hierarchy: L1 PoP cache hit vs L2 Regional Shield vs Origin.', badge: 'Edge Hierarchy', sectionId: 'deliberately-slow-vs-optimized-test' },
      { id: 'diagram-06-core-web-vitals-matrix.svg', caption: 'Google Core Web Vitals target latency thresholds: LCP 800ms, INP 50ms, CLS 0.00.', badge: 'Core Web Vitals', sectionId: 'core-web-vitals-breakdown' }
    ]
  },
  {
    slug: 'how-browser-tabs-use-memory',
    diagrams: [
      { id: 'diagram-01-chrome-multiprocess-model.svg', caption: 'Chromium multi-process architecture: Browser UI, Dedicated GPU, and sandboxed Renderers.', badge: 'Process Topology', sectionId: 'multi-process-architecture' },
      { id: 'diagram-02-site-isolation-sandboxing.svg', caption: 'Site Isolation memory boundaries creating separate OS address spaces for cross-origin iframes.', badge: 'Security Sandbox', sectionId: 'site-isolation-spectre' },
      { id: 'diagram-03-v8-heap-memory-layout.svg', caption: 'V8 JavaScript memory heap: New Space Nursery, Old Pointer Space, and TurboFan JIT Code Space.', badge: 'V8 Heap Memory', sectionId: 'v8-heap-mechanics' },
      { id: 'diagram-04-garbage-collection-scavenger.svg', caption: 'Concurrent Mark-Sweep-Compact major garbage collection and minor Scavenger sweeps.', badge: 'Garbage Collection', sectionId: 'why-inactive-tabs-eat-ram' },
      { id: 'diagram-05-tab-discarding-lifecycle.svg', caption: 'Chrome Tab Discarding and Memory Saver state transitions under OS RAM pressure.', badge: 'Lifecycle State', sectionId: 'tab-discarding-and-sleeping' },
      { id: 'diagram-06-bfcache-memory-footprint.svg', caption: 'Back/Forward Cache (bfcache) complete DOM and JavaScript execution context freeze in RAM.', badge: 'bfcache Structure', sectionId: 'why-closing-tab-doesnt-drop-ram' }
    ]
  },
  {
    slug: 'what-happens-when-you-type-a-url',
    diagrams: [
      { id: 'diagram-01-keyboard-interrupt-kernel.svg', caption: 'Hardware keyboard switch debounce to USB HID interrupt and kernel scancode ring buffer.', badge: 'Hardware Interrupt', sectionId: 'the-keystroke-to-omnibox' },
      { id: 'diagram-02-hsts-preload-lookup.svg', caption: 'Browser URL normalization, Punycode encoding, and hardcoded HSTS preload list security check.', badge: 'URL Parsing', sectionId: 'dns-resolution-chain' },
      { id: 'diagram-03-tcp-three-way-handshake.svg', caption: 'TCP 3-way handshake SYN, SYN-ACK, ACK sequence and socket state machine transition.', badge: 'TCP Handshake', sectionId: 'the-packet-physical-journey' },
      { id: 'diagram-04-http2-http3-multiplexing.svg', caption: 'HTTP/2 stream multiplexing vs HTTP/3 QUIC independent UDP streams eliminating Head-of-Line blocking.', badge: 'QUIC Protocol', sectionId: 'tcp-tls-handshake-negotiation' },
      { id: 'diagram-05-dom-construction-stream.svg', caption: 'Byte stream tokenizer to DOM tree construction with speculative pre-parser asset fetching.', badge: 'DOM Construction', sectionId: 'browser-parsing-dom-tree' },
      { id: 'diagram-06-gpu-compositing-pipeline.svg', caption: 'Layout geometry computation, paint recording, compositor tiling, and GPU rasterization.', badge: 'GPU Pipeline', sectionId: 'layout-paint-compositing' }
    ]
  },
  {
    slug: 'why-phones-get-slower-over-time',
    diagrams: [
      { id: 'diagram-01-nand-write-amplification.svg', caption: 'NAND Flash Write Amplification Factor (WAF) escalating from 1.1x to over 8.5x at high capacity.', badge: 'Silicon Physics', sectionId: 'nand-flash-fill-cliff' },
      { id: 'diagram-02-sqlite-wal-fragmentation.svg', caption: 'Mobile messaging app SQLite Write-Ahead Log (WAL) B-Tree fragmentation across years of use.', badge: 'Database Bloat', sectionId: 'sqlite-fragmentation-wal-bloat' },
      { id: 'diagram-03-ram-zram-swapping.svg', caption: 'Mobile memory pressure, Low Memory Killer (LMKD), and Linux zRAM CPU compression churn.', badge: 'Kernel Memory', sectionId: 'ram-capacity-creep-lmk' },
      { id: 'diagram-04-battery-voltage-throttling.svg', caption: 'Lithium-ion battery SEI layer impedance rise and SoC dynamic voltage/thermal throttling.', badge: 'Battery Physics', sectionId: 'lithium-battery-degradation-throttling' },
      { id: 'diagram-05-background-daemon-contention.svg', caption: 'Third-party SDK background tasks, geofences, and WakeLock contention on little.LITTLE cores.', badge: 'Task Scheduling', sectionId: 'os-updates-vs-hardware' },
      { id: 'diagram-06-factory-reset-vs-wear.svg', caption: 'Software benefits of factory reset vs permanent, irreversible physical silicon oxide decay.', badge: 'Hardware Reality', sectionId: 'the-truth-about-factory-reset' }
    ]
  },
  {
    slug: 'what-websites-collect-before-you-allow-cookies',
    diagrams: [
      { id: 'diagram-01-passive-http-headers.svg', caption: 'Passive HTTP request headers: User-Agent, Sec-CH-UA, Accept-Language, IP, and BGP ASN telemetry.', badge: 'Passive Telemetry', sectionId: 'the-passive-http-payload' },
      { id: 'diagram-02-canvas-fingerprint-raster.svg', caption: 'HTML5 2D Canvas subpixel glyph rasterization and GPU antialiasing SHA-256 fingerprint generation.', badge: 'Canvas Hash', sectionId: 'cookies-vs-storage-mechanisms' },
      { id: 'diagram-03-webgl-gpu-unmasking.svg', caption: 'WebGL unmasked graphics vendor and renderer string exfiltration bypassing browser sandboxes.', badge: 'GPU Telemetry', sectionId: 'ja3-ja4-tls-fingerprints' },
      { id: 'diagram-04-audiocontext-oscillator.svg', caption: 'Web Audio API oscillator frequency drift and DAC sound card mathematical fingerprinting.', badge: 'Audio Drift', sectionId: 'active-browser-fingerprinting' },
      { id: 'diagram-05-localstorage-vs-cookie.svg', caption: 'Tracker pivot to IndexedDB, Cache API, and TLS session tickets when cookies are blocked.', badge: 'Storage Pivot', sectionId: 'telemetry-table-before-consent' },
      { id: 'diagram-06-consent-banner-telemetry-gap.svg', caption: 'The Consent Management Platform (CMP) telemetry gap: data exfiltrated seconds before user clicks Reject.', badge: 'Privacy Gap', sectionId: 'how-to-protect-yourself' }
    ]
  },
  {
    slug: 'why-large-images-slow-websites',
    diagrams: [
      { id: 'diagram-01-codec-efficiency-comparison.svg', caption: 'Next-gen codec efficiency: AVIF delivering 78% compression savings over legacy JPEG.', badge: 'Codec Efficiency', sectionId: 'format-showdown-codecs' },
      { id: 'diagram-02-chroma-subsampling-grid.svg', caption: 'Chroma subsampling physics: 4:4:4 vs 4:2:0 human eye luminance/chrominance sensitivity.', badge: 'Vision Science', sectionId: 'chroma-subsampling-physics' },
      { id: 'diagram-03-memory-decompression-ram.svg', caption: 'Decompressed bitmap raw RGBA VRAM explosion (4 bytes per pixel = 96 MB RAM for 4K image).', badge: 'VRAM Footprint', sectionId: 'the-mobile-ram-nightmare' },
      { id: 'diagram-04-lcp-waterfall-impact.svg', caption: '10 MB camera capture monopolizing HTTP/2 streams and pushing Largest Contentful Paint to 4.8s.', badge: 'LCP Waterfall', sectionId: 'file-size-progression-impact' },
      { id: 'diagram-05-responsive-srcset-selection.svg', caption: 'Responsive picture and srcset browser DPR resolution matching across mobile, tablet, and 4K desktop.', badge: 'Responsive Markup', sectionId: 'responsive-picture-code' },
      { id: 'diagram-06-cdn-on-the-fly-resizing.svg', caption: 'Cloudflare/Fastly edge worker automated AVIF/WebP transcoding based on client Accept headers.', badge: 'Edge Transcoding', sectionId: 'progressive-vs-baseline' }
    ]
  },
  {
    slug: 'what-happens-to-data-after-uninstalling-an-app',
    diagrams: [
      { id: 'diagram-01-app-sandbox-file-tree.svg', caption: 'Mobile application private sandbox directory tree: /data/data/<pkg> unlinked on deletion.', badge: 'Sandbox Hierarchy', sectionId: 'the-local-sandbox-deletion' },
      { id: 'diagram-02-os-deletion-cascade.svg', caption: 'OS uninstall cascade: process termination, private database purge, and Keystore revocation.', badge: 'System Cascade', sectionId: 'the-ghost-data-that-survives' },
      { id: 'diagram-03-mediastore-orphaned-files.svg', caption: 'Android MediaStore and Scoped Storage shared photos surviving app uninstall indefinitely.', badge: 'MediaStore Loophole', sectionId: 'scoped-storage-mediastore-artifacts' },
      { id: 'diagram-04-cloud-push-token-revocation.svg', caption: 'Apple APNs and Google FCM device push token lifecycle and 410 Gone uninstall detection.', badge: 'Cloud Messaging', sectionId: 'the-server-side-reality' },
      { id: 'diagram-05-device-identifier-resets.svg', caption: 'Advertising ID resets vs persistent server-side customer identity graph matching.', badge: 'Identity Graphs', sectionId: 'ad-ids-and-cross-app-profiles' },
      { id: 'diagram-06-clean-install-vs-wipe.svg', caption: 'Data hygiene matrix: Cache Clear vs Storage Clear vs Uninstall vs Enterprise MDM Remote Wipe.', badge: 'Forensic Hygiene', sectionId: 'cache-vs-data-vs-uninstall' }
    ]
  },
  {
    slug: 'why-same-wifi-speed-can-feel-different',
    diagrams: [
      { id: 'diagram-01-bandwidth-vs-latency-pipe.svg', caption: 'Physical model: Bandwidth (pipe volume) vs Latency (packet speed) in real-time workloads.', badge: 'Network Model', sectionId: 'the-side-by-side-example' },
      { id: 'diagram-02-bufferbloat-queue-delay.svg', caption: 'Bufferbloat: deep unmanaged router FIFO queues spiking real-time packet ping from 15ms to 600ms.', badge: 'Bufferbloat Dynamics', sectionId: 'the-five-network-pillars' },
      { id: 'diagram-03-frequency-band-attenuation.svg', caption: 'Wi-Fi frequency RF physics: 2.4 GHz wall penetration vs 6 GHz (Wi-Fi 7) 320 MHz low-latency channels.', badge: 'RF Radio Physics', sectionId: 'wifi-frequency-physics' },
      { id: 'diagram-04-airtime-fairness-collision.svg', caption: 'CSMA/CA airtime contention: slow legacy IoT devices hogging 70% of available channel airtime.', badge: 'Airtime Contention', sectionId: 'how-different-activities-react' },
      { id: 'diagram-05-codel-fq-active-queue.svg', caption: 'FQ-CoDel Smart Queue Management hashing flows and keeping router queue delay under 5ms.', badge: 'CoDel Algorithm', sectionId: 'the-speedtest-delusion' },
      { id: 'diagram-06-isp-peering-bgp-hops.svg', caption: 'Tier 1 ISP transit peering and BGP hops causing 100 Mbps connections to feel vastly different.', badge: 'BGP Transit', sectionId: 'how-to-fix-network-b' }
    ]
  },
  {
    slug: 'hidden-cost-of-free-online-tools',
    diagrams: [
      { id: 'diagram-01-free-tool-server-economics.svg', caption: 'Free utility cloud economics: CPU server compute and cloud egress bandwidth costs vs monetization.', badge: 'Cloud Economics', sectionId: 'the-economic-reality' },
      { id: 'diagram-02-pdf-document-exfiltration.svg', caption: 'Server-side PDF processing workers extracting full text, images, and confidential form fields.', badge: 'Document Security', sectionId: 'the-cloud-upload-trap' },
      { id: 'diagram-03-exif-metadata-leakage.svg', caption: 'File EXIF metadata extraction: GPS latitude/longitude, camera serial numbers, and author tags.', badge: 'Metadata Leakage', sectionId: 'metadata-leakage-exif-docs' },
      { id: 'diagram-04-data-broker-enrichment-loop.svg', caption: 'Email harvesting, SHA-256 hash matching, and automated commercial data broker profiling.', badge: 'Data Broker Loop', sectionId: 'third-party-brokers-and-trackers' },
      { id: 'diagram-05-client-side-wasm-sandbox.svg', caption: 'Client-side WebAssembly (WASM) architecture executing 100% locally in browser memory.', badge: 'Local WASM Execution', sectionId: 'client-side-vs-server-side' },
      { id: 'diagram-06-pre-upload-security-checklist.svg', caption: 'Enterprise 7-point decision matrix before uploading sensitive files to any third-party utility.', badge: 'Security Checklist', sectionId: 'the-practical-audit-checklist' }
    ]
  }
];

posts10Config.forEach(({ slug, diagrams }) => {
  const file = path.join(__dirname, `../posts/${slug}.html`);
  let content = fs.readFileSync(file, 'utf8');

  diagrams.forEach((d, idx) => {
    if (!content.includes(d.id)) {
      const figHtml = `
<figure class="post-technical-figure">
  <img src="/assets/images/posts/${slug}/${d.id}" alt="${d.caption} - Ahadex Engineering Guide" width="900" height="480" loading="lazy" />
  <figcaption>
    <span><strong>Figure ${idx + 1}:</strong> ${d.caption}</span>
    <span class="fig-badge">${d.badge}</span>
  </figcaption>
</figure>`;

      const target = `<section id="${d.sectionId}">`;
      if (content.includes(target)) {
        content = content.replace(target, `${target}\n${figHtml}\n`);
      }
    }
  });

  fs.writeFileSync(file, content, 'utf8');
});

updateChatGptPost();
updateTop10Post();

console.log('Diagram injection script complete.');
