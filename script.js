/**
 * NARENDRA GODARA - SENIOR DATA ENGINEER WORKSPACE
 * High-performance Vanilla JavaScript Engine for One-Page Executive Workspace
 * Multi-Platform: Microsoft Fabric, Databricks, Snowflake, PySpark & Advanced SQL
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initCanvasNodes();
  initOnePageTabs();
  initTypingEffect();
  initStatsCounter();
  initSkillsFilterAndSearch();
  initSeniorAssessmentQuiz();
  initArchitectureVisualizer();
  initProjectModals();
  initCoverLetterEngine();
  initResumeModal();
  initContactFormAndCopy();
});

/* ==========================================================================
   1. Interactive Background Canvas (Data Node Network)
   ========================================================================== */
function initCanvasNodes() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 38), 36);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.38;
      this.vy = (Math.random() - 0.5) * 0.38;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.2)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Connect to mouse pointer subtly
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(79, 70, 229, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. One-Pager Tab & Dock Navigation Engine
   ========================================================================== */
function initOnePageTabs() {
  const TABS = ['overview', 'platforms', 'skills', 'architecture', 'experience', 'cover-letter', 'contact'];
  const TAB_LABELS = {
    overview: 'Overview',
    platforms: 'Big 3 Platforms',
    skills: 'Skills & Roadmap',
    architecture: 'Architecture Showcase',
    experience: 'Experience & Projects',
    'cover-letter': 'Cover Letter',
    contact: 'Contact & Connect'
  };

  const tabButtons = document.querySelectorAll('.workspace-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const prevBtn = document.getElementById('dock-prev-btn');
  const nextBtn = document.getElementById('dock-next-btn');
  const activeLabel = document.getElementById('dock-active-tab-label');
  const indicatorsContainer = document.getElementById('dock-indicators');
  const quickPills = document.querySelectorAll('[data-target-tab]');
  const quickCoverLetterBtn = document.getElementById('btn-quick-coverletter');
  const overviewCoverLetterBtn = document.getElementById('overview-btn-coverletter');

  let currentTab = 'overview';

  // Build bottom dock indicator dots
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    TABS.forEach((tabId, idx) => {
      const dot = document.createElement('button');
      dot.className = `dock-dot ${idx === 0 ? 'active' : ''}`;
      dot.title = `Switch to ${TAB_LABELS[tabId]}`;
      dot.setAttribute('aria-label', `Tab ${idx + 1}: ${TAB_LABELS[tabId]}`);
      dot.addEventListener('click', () => switchTab(tabId));
      indicatorsContainer.appendChild(dot);
    });
  }

  function switchTab(targetTabId, updateHash = true) {
    if (!TABS.includes(targetTabId)) targetTabId = 'overview';
    currentTab = targetTabId;

    // Update Tab Buttons
    tabButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-tab') === targetTabId;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      if (isMatch) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    // Update Tab Panels
    tabPanels.forEach((panel) => {
      const isMatch = panel.getAttribute('data-panel') === targetTabId;
      panel.classList.toggle('active', isMatch);
    });

    // Update Dock Dots & Label
    const dots = indicatorsContainer ? indicatorsContainer.querySelectorAll('.dock-dot') : [];
    const activeIdx = TABS.indexOf(targetTabId);
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIdx);
    });

    if (activeLabel) {
      activeLabel.textContent = `Current: ${TAB_LABELS[targetTabId]}`;
    }

    // Scroll viewport to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update hash in browser URL bar
    if (updateHash) {
      history.replaceState(null, '', '#' + targetTabId);
    }
  }

  // Bind tab clicks
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Bind Quick Navigation Pills
  quickPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const target = pill.getAttribute('data-target-tab');
      if (target) switchTab(target);
    });
  });

  // Bind Cover Letter Shortcuts
  if (quickCoverLetterBtn) {
    quickCoverLetterBtn.addEventListener('click', () => switchTab('cover-letter'));
  }
  if (overviewCoverLetterBtn) {
    overviewCoverLetterBtn.addEventListener('click', () => switchTab('cover-letter'));
  }

  // Bind Dock Prev/Next Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const idx = TABS.indexOf(currentTab);
      const prevIdx = (idx - 1 + TABS.length) % TABS.length;
      switchTab(TABS[prevIdx]);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const idx = TABS.indexOf(currentTab);
      const nextIdx = (idx + 1) % TABS.length;
      switchTab(TABS[nextIdx]);
    });
  }

  // Keyboard navigation: Left/Right arrows or digit keys 1-7
  window.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

    if (e.key === 'ArrowRight') {
      const idx = TABS.indexOf(currentTab);
      switchTab(TABS[(idx + 1) % TABS.length]);
    } else if (e.key === 'ArrowLeft') {
      const idx = TABS.indexOf(currentTab);
      switchTab(TABS[(idx - 1 + TABS.length) % TABS.length]);
    } else if (e.key >= '1' && e.key <= '7') {
      const numIdx = parseInt(e.key, 10) - 1;
      if (numIdx >= 0 && numIdx < TABS.length) {
        switchTab(TABS[numIdx]);
      }
    }
  });

  // Check initial hash on load
  const hash = window.location.hash.replace('#', '');
  if (TABS.includes(hash)) {
    switchTab(hash, false);
  } else {
    switchTab('overview', false);
  }
}

/* ==========================================================================
   3. Animated Typing Subtitle Effect
   ========================================================================== */
function initTypingEffect() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  const roles = [
    'Microsoft Fabric, Databricks & Snowflake Lead',
    'PySpark & Distributed Compute Architect',
    'Advanced SQL, CDC & SCD Type 2 Modeling',
    'Delta Lake & Unity Catalog Governance',
    '99.2% Financial Data Integrity Specialist'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Hold full text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. Animated Metric Number Counters
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  function runCounters() {
    if (hasAnimated) return;
    hasAnimated = true;

    statNumbers.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const duration = 1800;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = easeProgress * target;

        el.textContent = currentVal.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target.toFixed(decimals);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Trigger counters immediately or on intersection
  const statsDeck = document.querySelector('.hero-stats-deck');
  if (statsDeck) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(statsDeck);
  } else {
    runCounters();
  }
}

/* ==========================================================================
   5. Comprehensive Skills Matrix Filter & Live Search
   ========================================================================== */
function initSkillsFilterAndSearch() {
  const filterButtons = document.querySelectorAll('.domain-tab');
  const searchInput = document.getElementById('skills-search-input');
  const countBadge = document.getElementById('skills-counter-badge');
  const domainItems = document.querySelectorAll('.domain-item');

  if (!domainItems.length) return;

  let currentDomain = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    domainItems.forEach((card) => {
      const cardDomain = card.getAttribute('data-domain');
      const cardKeywords = card.getAttribute('data-keywords') || '';
      const cardText = card.textContent.toLowerCase();

      const matchCategory = currentDomain === 'all' || cardDomain === currentDomain;
      const combinedText = `${cardKeywords} ${cardText}`.toLowerCase();
      const matchSearch = searchQuery === '' || combinedText.includes(searchQuery);

      if (matchCategory && matchSearch) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.25s ease-out';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = `${visibleCount} of ${domainItems.length} Domains Active`;
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentDomain = btn.getAttribute('data-domain');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* ==========================================================================
   6. Interactive Senior Readiness Assessment Tool
   ========================================================================== */
function initSeniorAssessmentQuiz() {
  const expSelect = document.getElementById('quiz-experience');
  const platformSelect = document.getElementById('quiz-platform');
  const goalSelect = document.getElementById('quiz-goal');
  const resultBox = document.getElementById('recommendation-result-box');

  if (!resultBox) return;

  function updateAssessment() {
    const exp = expSelect ? expSelect.value : '3-5';
    const plat = platformSelect ? platformSelect.value : 'all';
    const goal = goalSelect ? goalSelect.value : 'senior-interviews';

    let focusTitle = '';
    let focusBadge = '';
    let focusSummary = '';
    let bullets = [];

    // Experience tailoring
    if (exp === '3-5') {
      focusBadge = 'Senior DE Transition Strategy • 3–5 Years';
      focusTitle = 'Deepen Production Depth, Performance Tuning & Solution Ownership';
      focusSummary = 'At 3–5 years, interviewers evaluate whether you can architect solutions end-to-end rather than merely authoring notebooks. Emphasize multi-platform fluency across Fabric, Databricks, and Snowflake, query plan tuning, and CI/CD automation.';
    } else if (exp === '0-3') {
      focusBadge = 'Foundational Fast-Track • 0–3 Years';
      focusTitle = 'Solidify Core SQL, PySpark & Medallion Ingestion';
      focusSummary = 'Focus heavily on Priority 1 of the roadmap: master advanced CTEs, window functions, incremental loads, Change Data Capture (CDC), and SCD Type 2 modeling.';
    } else {
      focusBadge = 'Lead & Architect Track • 5+ Years';
      focusTitle = 'System Design, Governance, Cross-Cloud Trade-Offs & Leadership';
      focusSummary = 'Focus on Priority 3: Data Mesh principles, FinOps compute cost optimization, Unity Catalog multi-region governance, and cross-platform trade-offs between Fabric, Databricks, and Snowflake.';
    }

    // Platform & Goal specifics
    if (goal === 'senior-interviews') {
      bullets.push('<strong>System Design Defense:</strong> Draw an end-to-end architecture from source API/DB through Bronze/Silver/Gold to Direct Lake / BI with failure recovery mechanisms.');
      bullets.push('<strong>Performance Regressions:</strong> Explain exactly how you diagnose slow Spark jobs (spill to disk, shuffle partitions, data skew) and Snowflake Query Profile bottlenecks.');
      bullets.push('<strong>Platform Decision Guide:</strong> Articulate when to choose Snowflake Dynamic Tables vs. Streams & Tasks, or Fabric Direct Lake vs. Import mode.');
    } else if (goal === 'data-architect') {
      bullets.push('<strong>Enterprise Data Mesh:</strong> Structure domain-oriented data products with conformed dimensions and zero-copy cross-cloud shortcuts.');
      bullets.push('<strong>Security & Lineage:</strong> Design fine-grained RBAC, Row-Level Security (RLS), and automated column-level audit lineage.');
      bullets.push('<strong>FinOps Strategy:</strong> Implement warehouse auto-suspend policies and Spark serverless pools to slash enterprise compute bills by 20–40%.');
    } else {
      bullets.push('<strong>Project Spotlight:</strong> Lead with the UK Fund Management Billing Lakehouse (99.2% verified accuracy) and Databricks Auto Loader CDC pipeline.');
      bullets.push('<strong>Key Modern Terms:</strong> Highlight SCD Type 2, CDC, OneLake Shortcuts, Direct Lake, Unity Catalog, and dbt modular testing.');
    }

    resultBox.innerHTML = `
      <span class="phase-tag">${focusBadge}</span>
      <h4 class="rec-title">${focusTitle}</h4>
      <p class="rec-body">${focusSummary}</p>
      <div style="margin-top: 0.85rem; display: flex; flex-direction: column; gap: 0.45rem;">
        ${bullets.map((b) => `<div style="font-size: 0.88rem; color: var(--text-main);"><i class="fa-solid fa-arrow-right" style="color: var(--accent-blue); margin-right: 6px;"></i> ${b}</div>`).join('')}
      </div>
    `;
    resultBox.classList.add('show');
  }

  if (expSelect) expSelect.addEventListener('change', updateAssessment);
  if (platformSelect) platformSelect.addEventListener('change', updateAssessment);
  if (goalSelect) goalSelect.addEventListener('change', updateAssessment);

  updateAssessment();
}

/* ==========================================================================
   7. Interactive Architecture Showcase (4 Complete Production Flows)
   ========================================================================== */
function initArchitectureVisualizer() {
  const flowButtons = document.querySelectorAll('.flow-btn');
  const stepsNav = document.getElementById('pipeline-steps-nav');
  const detailDisplay = document.getElementById('pipeline-detail-display');
  if (!detailDisplay || !stepsNav) return;

  const architectures = {
    fabric: {
      steps: ['1. Multi-Source Ingestion', '2. Bronze OneLake', '3. Silver PySpark & dbt', '4. Gold Fabric Warehouse', '5. Direct Lake & Power BI'],
      data: {
        1: {
          step: 'Stage 1 of 5',
          title: 'Multi-Source Dynamic Ingestion Tier',
          badge: 'Fabric Data Pipelines • Fivetran • REST APIs',
          desc: 'Ingests operational data across AWS S3 buckets, SaaS endpoints via Fivetran, on-premise databases, and financial REST APIs (e.g. Open Exchange Rates) with parameterization and retry policies.',
          specs: [
            { label: 'Ingestion Engine', val: 'Fabric Data Factory & Fivetran' },
            { label: 'Protocols', val: 'REST, JDBC, Parquet, JSON' },
            { label: 'Fault Tolerance', val: 'Automated Retry & Dead-Letter Queue' }
          ]
        },
        2: {
          step: 'Stage 2 of 5',
          title: 'Bronze Tier: Raw OneLake Storage',
          badge: 'Delta Parquet • OneLake Shortcuts • Append-Only',
          desc: 'Raw data lands in OneLake as append-only Delta Parquet tables, preserving historical fidelity with zero unnecessary egress charges via OneLake shortcuts pointing straight to AWS S3.',
          specs: [
            { label: 'Storage Format', val: 'Delta Lake (Parquet + Transaction Log)' },
            { label: 'Zero-Egress', val: 'OneLake Shortcuts to AWS S3' },
            { label: 'Auditability', val: 'Immutable Timestamped Ingestion' }
          ]
        },
        3: {
          step: 'Stage 3 of 5',
          title: 'Silver Tier: Cleansing & Conformance',
          badge: 'PySpark DataFrames • SCD Type 2 • Data Quality',
          desc: 'Cleanses duplicates, handles currency conversions using daily OXR exchange feeds, validates schema constraints, and tracks historical changes via SCD Type 2 MERGE operations.',
          specs: [
            { label: 'Compute Engine', val: 'Fabric Spark Notebooks' },
            { label: 'Modeling', val: 'SCD Type 1 & 2 Merge Operations' },
            { label: 'Quality Assertions', val: 'Null checks, Referential Integrity' }
          ]
        },
        4: {
          step: 'Stage 4 of 5',
          title: 'Gold Tier: Fabric Dimensional Warehouse',
          badge: 'T-SQL • Star Schema • RBAC & Row-Level Security',
          desc: 'Curated dimensional models (Fact & Dimension tables) optimized for analytical reporting. Governed by enterprise Role-Based Access Controls (RBAC) and Row-Level Security (RLS).',
          specs: [
            { label: 'Engine', val: 'Fabric Synapse Data Warehouse' },
            { label: 'Model', val: 'Kimball Star Schema / Conformed Dims' },
            { label: 'Security', val: 'RBAC, RLS, Object-Level Security' }
          ]
        },
        5: {
          step: 'Stage 5 of 5',
          title: 'Direct Lake Power BI & Financial Reporting',
          badge: 'Sub-Second Concurrency • 99.2% Verified Accuracy',
          desc: 'Direct Lake mode connects Power BI directly to OneLake Delta tables without scheduled data import refreshes, delivering ARR insights and automated fund billing with 99.2% accuracy.',
          specs: [
            { label: 'Mode', val: 'Direct Lake (Zero-Import Latency)' },
            { label: 'Impact', val: '99.2% Fund Billing Integrity' },
            { label: 'Use Cases', val: 'Executive KPI Portals & Exit Planning' }
          ]
        }
      }
    },
    databricks: {
      steps: ['1. Cloud Object Landing', '2. Auto Loader Streaming', '3. Spark Compute Tuning', '4. Delta Lake MERGE', '5. Unity Catalog Governance'],
      data: {
        1: {
          step: 'Stage 1 of 5',
          title: 'Continuous Cloud Storage Landing',
          badge: 'ADLS Gen2 / AWS S3 • Event-Driven Arrival',
          desc: 'Unstructured, semi-structured, and Parquet data arrives in high volume across cloud object storage containers triggered by real-time upstream application events.',
          specs: [
            { label: 'Storage', val: 'ADLS Gen2 & AWS S3' },
            { label: 'Throughput', val: 'Multi-GB/hour Continuous Streams' },
            { label: 'Triggers', val: 'Blob Creation & Event Grid' }
          ]
        },
        2: {
          step: 'Stage 2 of 5',
          title: 'Auto Loader (cloudFiles) Ingestion',
          badge: 'Schema Inference • Rescued Data Column',
          desc: 'Databricks Auto Loader continuously discovers newly arrived files with low latency, automatically evolving schemas and quarantining malformed records into rescued data columns.',
          specs: [
            { label: 'Mechanism', val: 'spark.readStream with cloudFiles' },
            { label: 'Schema Evolution', val: 'addNewColumns Mode' },
            { label: 'Reliability', val: '_rescued_data Column Tracking' }
          ]
        },
        3: {
          step: 'Stage 3 of 5',
          title: 'PySpark Distributed Compute & Tuning',
          badge: 'Catalyst Optimizer • Broadcast Joins • Salting',
          desc: 'Tuning Spark memory and execution plans. Eliminating partition skews using key salting, replacing expensive shuffle joins with BroadcastHashJoins, and compacting small files with OPTIMIZE Z-Ordering.',
          specs: [
            { label: 'Optimization', val: 'Broadcast Joins & Z-Order Clustering' },
            { label: 'Skew Handling', val: 'Key Salting & Adaptive Query Execution' },
            { label: 'Storage Tuning', val: 'Delta OPTIMIZE & VACUUM Policies' }
          ]
        },
        4: {
          step: 'Stage 4 of 5',
          title: 'Delta Lake ACID & CDC Ingestion',
          badge: 'Delta MERGE • Change Data Feed (CDF)',
          desc: 'Executes idempotent Delta Lake MERGE upserts with Change Data Feed (CDF) enabled, maintaining full audit trails and time-travel querying capabilities.',
          specs: [
            { label: 'Semantics', val: 'ACID Exactly-Once Delivery' },
            { label: 'CDC Mechanism', val: 'Change Data Feed (CDF) Logs' },
            { label: 'Auditability', val: 'Delta Time Travel (VERSION AS OF)' }
          ]
        },
        5: {
          step: 'Stage 5 of 5',
          title: 'Unity Catalog Governance & DAB CI/CD',
          badge: '3-Tier Namespace • Lineage • Asset Bundles',
          desc: 'Assets organized across Catalog.Schema.Table namespaces with centralized column masking and end-to-end automated lineage. Workflows deployed using Databricks Asset Bundles (DAB).',
          specs: [
            { label: 'Namespace', val: 'Catalog.Schema.Table 3-Tier Hierarchy' },
            { label: 'Security', val: 'Dynamic Column Masking & Tag Policies' },
            { label: 'DevOps', val: 'Databricks Asset Bundles (DAB) CI/CD' }
          ]
        }
      }
    },
    snowflake: {
      steps: ['1. External Stage Setup', '2. Snowpipe Serverless Load', '3. Streams & Tasks CDC', '4. Declarative Dynamic Tables', '5. FinOps & Auto-Suspend'],
      data: {
        1: {
          step: 'Stage 1 of 5',
          title: 'Secure External Cloud Stage Configuration',
          badge: 'Storage Integrations • AWS S3 / Azure ADLS',
          desc: 'Establishing storage integration objects that authenticate Snowflake directly with cloud storage without hardcoded credentials.',
          specs: [
            { label: 'Integration', val: 'STORAGE INTEGRATION Objects' },
            { label: 'Security', val: 'IAM Roles & Azure Service Principals' },
            { label: 'Stage Type', val: 'External Stages (Delta & Parquet)' }
          ]
        },
        2: {
          step: 'Stage 2 of 5',
          title: 'Serverless Ingestion via Snowpipe',
          badge: 'Event Notifications (SNS/SQS) • Auto-Ingest',
          desc: 'Serverless continuous loading reacting to cloud file arrival notifications, auto-ingesting raw payloads with minimal compute overhead.',
          specs: [
            { label: 'Ingestion Mode', val: 'Snowpipe with auto_ingest=true' },
            { label: 'Compute', val: 'Serverless (Zero idle warehouse cost)' },
            { label: 'Target', val: 'Raw Staging Variant / Parquet Tables' }
          ]
        },
        3: {
          step: 'Stage 3 of 5',
          title: 'Change Data Capture via Streams & Tasks',
          badge: 'Change Tracking • Procedural Orchestration',
          desc: 'Snowflake Streams capture row-level deltas (METADATA$ACTION, METADATA$ISUPDATE), while Tasks execute automated MERGE statements on schedules.',
          specs: [
            { label: 'Change Capture', val: 'Append-Only & Standard Streams' },
            { label: 'Orchestrator', val: 'Serverless & Cron-Scheduled Tasks' },
            { label: 'Idempotency', val: 'MERGE WHEN MATCHED / NOT MATCHED' }
          ]
        },
        4: {
          step: 'Stage 4 of 5',
          title: 'Declarative Modeling with Dynamic Tables',
          badge: 'Target Lag SLA • Automated DAG Refreshes',
          desc: 'Declarative data transformations specifying TARGET_LAG intervals, allowing Snowflake to automatically resolve dependency DAGs without manual orchestrator scripts.',
          specs: [
            { label: 'Pipeline Type', val: 'Declarative SQL Dynamic Tables' },
            { label: 'SLA Control', val: 'TARGET_LAG = 10 MINUTES' },
            { label: 'Snowpark', val: 'Python Stored Procedures & UDFs' }
          ]
        },
        5: {
          step: 'Stage 5 of 5',
          title: 'FinOps Cost Tuning & Query Profile Pruning',
          badge: 'Auto-Suspend (60s) • Micro-Partition Pruning',
          desc: 'Analyzing Query Profiles to eliminate table scans, configuring warehouse auto-suspend and multi-cluster auto-scaling to keep cloud costs strictly aligned with business value.',
          specs: [
            { label: 'Cost Control', val: 'AUTO_SUSPEND = 60, Resource Monitors' },
            { label: 'Optimization', val: 'Query Profile Micro-Partition Pruning' },
            { label: 'Multi-Cluster', val: 'Auto-Scaling Standard & Economy Modes' }
          ]
        }
      }
    },
    hybrid: {
      steps: ['1. AWS S3 Landing', '2. Cross-Cloud Fabric Copy', '3. OXR Currency Conversion', '4. Unified OneLake Store', '5. 90% Manual Time Cut'],
      data: {
        1: {
          step: 'Stage 1 of 5',
          title: 'AWS S3 Multi-Source Landing',
          badge: 'Mass Hosting Client Data • Parameterized Buckets',
          desc: 'High-volume hosting infrastructure metrics, domain registrations, and client logs deposited into Amazon S3 storage buckets.',
          specs: [
            { label: 'Source', val: 'Amazon S3 Multi-Region Buckets' },
            { label: 'Format', val: 'Compressed CSV, Parquet & JSON' },
            { label: 'Security', val: 'AWS IAM Role Delegation' }
          ]
        },
        2: {
          step: 'Stage 2 of 5',
          title: 'Fabric Data Pipelines Cross-Cloud Movement',
          badge: 'Dynamic Copy Tasks • Parameterized Orchestration',
          desc: 'Automated Fabric Data Pipelines extracting incremental files from AWS S3 and ingesting directly into Microsoft Fabric OneLake with dynamic parameter handling.',
          specs: [
            { label: 'Copy Activity', val: 'Dynamic Multi-Source Parameters' },
            { label: 'Throughput', val: 'High-Speed Parallel Egress/Ingress' },
            { label: 'Resilience', val: 'Automated Failure Alerting' }
          ]
        },
        3: {
          step: 'Stage 3 of 5',
          title: 'Open Exchange Rates (OXR) API Integration',
          badge: 'Scheduled PySpark Notebook • Multi-Currency',
          desc: 'Daily scheduled PySpark notebook fetching live foreign exchange rates from the OXR API, standardizing multi-currency hosting revenues accurately.',
          specs: [
            { label: 'API Client', val: 'Modular Python Request Handler' },
            { label: 'Rate Updates', val: 'Daily Timestamped Currency Matrix' },
            { label: 'Accuracy', val: 'Financial Multi-Currency Standardization' }
          ]
        },
        4: {
          step: 'Stage 4 of 5',
          title: 'Unified OneLake Lakehouse & Modernization',
          badge: 'Dataflows Gen2 • SSIS Deprecation',
          desc: 'Migrated legacy on-premise SSIS packages into modern Fabric Dataflows Gen2 and PySpark notebooks, consolidating data into Delta Lake storage.',
          specs: [
            { label: 'Storage', val: 'OneLake Delta Parquet Store' },
            { label: 'Migration', val: 'Legacy SSIS to Dataflows Gen2' },
            { label: 'Governance', val: 'Workspace RBAC & Direct Lake Models' }
          ]
        },
        5: {
          step: 'Stage 5 of 5',
          title: '90% Manual Effort Reduction Verified',
          badge: 'Automated Operational Dashboards • Fast Turnaround',
          desc: 'Full end-to-end automation slashed manual intervention time by 90%, enabling the hosting leadership team to access reliable daily reports.',
          specs: [
            { label: 'Time Saved', val: '90% Manual Effort Eliminated' },
            { label: 'SLA Improvement', val: 'Daily Reports Ready by 08:00 AM' },
            { label: 'Business Value', val: 'Audit-Ready Multi-Region Financials' }
          ]
        }
      }
    }
  };

  let currentFlow = 'fabric';

  function renderSteps(flowKey) {
    const flow = architectures[flowKey];
    if (!flow) return;

    stepsNav.innerHTML = flow.steps
      .map((stepText, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === 1 ? 'active' : '';
        return `
          <button class="step-node ${isActive}" data-step="${stepNum}" title="${stepText}">
            ${stepNum}
          </button>
        `;
      })
      .join('');

    const nodes = stepsNav.querySelectorAll('.step-node');
    nodes.forEach((node) => {
      node.addEventListener('click', () => {
        nodes.forEach((n) => n.classList.remove('active'));
        node.classList.add('active');
        const step = node.getAttribute('data-step');
        renderStageDetail(flowKey, step);
      });
    });

    renderStageDetail(flowKey, 1);
  }

  function renderStageDetail(flowKey, stepNum) {
    const flow = architectures[flowKey];
    if (!flow) return;
    const stage = flow.data[stepNum];
    if (!stage) return;

    detailDisplay.innerHTML = `
      <span class="p-step-badge">${stage.step} • ${stage.badge}</span>
      <h3 class="p-step-title">${stage.title}</h3>
      <p class="p-step-desc">${stage.desc}</p>
      <div class="p-step-specs">
        ${stage.specs
          .map(
            (spec) => `
          <div class="spec-item">
            <strong>${spec.label}</strong>
            <span>${spec.val}</span>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }

  flowButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      flowButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFlow = btn.getAttribute('data-flow');
      renderSteps(currentFlow);
    });
  });

  renderSteps('fabric');
}

/* ==========================================================================
   8. Practical Production Projects Deep-Dive Modals
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-detail-modal');
  const closeBtn = document.getElementById('p-modal-close-btn');
  const triggers = document.querySelectorAll('.project-modal-trigger');
  const modalTitle = document.getElementById('p-modal-title');
  const modalSub = document.getElementById('p-modal-subtitle');
  const modalBody = document.getElementById('p-modal-body');

  if (!modal || !triggers.length) return;

  const projectDetails = {
    1: {
      title: 'End-to-End Fabric Lakehouse Billing Platform',
      sub: 'Financial Systems Engineering • Microsoft Fabric, Fivetran & PySpark',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="background: var(--accent-emerald-light); border: 1px solid var(--accent-emerald-border); padding: 0.85rem 1.25rem; border-radius: 10px; color: var(--accent-emerald); font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-trophy"></i>
            <span>Verified Outcome: 99.2% billing accuracy achieved across millions in recurring monthly fund management invoices.</span>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">The Business Challenge</h4>
            <p style="color: var(--text-muted); line-height: 1.65;">
              A major UK-based investment fund management enterprise struggled with fragmented billing data spanning over 20 separate source systems, SaaS platforms, and custom spreadsheets. Monthly fee calculations were plagued by manual errors, delayed reconciliation by up to 10 days, and created audit compliance risks.
            </p>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">My Architectural Solution</h4>
            <ul style="padding-left: 1.25rem; color: var(--text-muted); line-height: 1.65; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>Consolidated Ingestion:</strong> Deployed Fivetran automated sync alongside Fabric Data Pipelines to ingest disparate data sources into a centralized Microsoft Fabric OneLake repository.</li>
              <li><strong>PySpark Transformation Framework:</strong> Led a team of 3 data engineers to write modular PySpark notebooks that cleansed, standardized currencies, and aggregated complex management fees with complete idempotent traceability.</li>
              <li><strong>Strict Enterprise Security:</strong> Implemented comprehensive Role-Based Access Controls (RBAC), Object-Level (OLS), and Row-Level Security (RLS) to ensure only authorized fund managers could view confidential client billing ledgers.</li>
              <li><strong>Direct Lake Performance:</strong> Enabled Direct Lake mode into Power BI dashboards for sub-second executive review without waiting on traditional dataset refreshes.</li>
            </ul>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">Key Metrics &amp; Impact</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 0.75rem;">
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-emerald);">99.2%</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Billing Accuracy Delivered</div>
              </div>
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-blue);">20+</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Data Sources Unified</div>
              </div>
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-purple);">Zero</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Audit Discrepancies</div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    2: {
      title: 'Databricks Delta Lake CDC & SCD Type 2 Engine',
      sub: 'Distributed Lakehouse • PySpark, Auto Loader & Unity Catalog',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="background: var(--accent-amber-light); border: 1px solid var(--accent-amber-border); padding: 0.85rem 1.25rem; border-radius: 10px; color: var(--accent-amber); font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-fire"></i>
            <span>Production Highlights: Scalable streaming ingestion via Auto Loader, Delta Lake MERGE for SCD Type 2, and Unity Catalog governance.</span>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">The Architectural Challenge</h4>
            <p style="color: var(--text-muted); line-height: 1.65;">
              High-volume operational events were arriving continuously from cloud object stores. The system required automated schema evolution, idempotent CDC processing, slowly changing dimension (SCD Type 2) tracking for historical changes, and enterprise data governance without incurring runaway cluster compute costs.
            </p>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">My Architectural Solution</h4>
            <ul style="padding-left: 1.25rem; color: var(--text-muted); line-height: 1.65; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>Auto Loader Streaming:</strong> Implemented Databricks Auto Loader (cloudFiles) for scalable incremental ingestion with automatic schema inference and rescued data tracking.</li>
              <li><strong>SCD Type 2 &amp; Delta MERGE:</strong> Engineered modular PySpark workflows executing Delta Lake MERGE statements to maintain historical records with active flags, start timestamps, and end timestamps.</li>
              <li><strong>Spark Performance Tuning:</strong> Optimized shuffle partitions, eliminated data skew via salting, configured broadcast joins on dimension lookups, and compacted files with OPTIMIZE Z-Ordering.</li>
              <li><strong>Unity Catalog &amp; DAB CI/CD:</strong> Structured assets into Catalog.Schema.Table 3-tier namespaces, implemented column masking, and automated deployments with Databricks Asset Bundles (DAB).</li>
            </ul>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">Key Metrics &amp; Impact</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 0.75rem;">
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-amber);">100%</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Historical Auditability</div>
              </div>
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-blue);">35%</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Cluster Runtime Cut</div>
              </div>
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-emerald);">Automated</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">DAB GitHub Actions CI/CD</div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    3: {
      title: 'Snowflake Warehouse & Declarative Pipelines',
      sub: 'Cloud Warehousing • Snowpipe, Dynamic Tables & FinOps',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="background: var(--accent-cyan-light); border: 1px solid var(--accent-cyan-border); padding: 0.85rem 1.25rem; border-radius: 10px; color: var(--accent-cyan); font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-regular fa-snowflake"></i>
            <span>Production Highlights: Serverless Snowpipe ingestion, declarative Dynamic Tables with target lag, and 28% warehouse cost reduction.</span>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">The Architectural Challenge</h4>
            <p style="color: var(--text-muted); line-height: 1.65;">
              Upstream transactional records were loaded via costly always-on virtual warehouses with brittle, hard-coded scheduled tasks. High query concurrency led to queueing, while compute costs grew exponentially without clear FinOps governance.
            </p>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">My Architectural Solution</h4>
            <ul style="padding-left: 1.25rem; color: var(--text-muted); line-height: 1.65; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>Serverless Continuous Snowpipe:</strong> Configured cloud stage integrations with AWS S3 and automated message queues to ingest data the moment files arrived.</li>
              <li><strong>Declarative Dynamic Tables:</strong> Replaced rigid sequential procedural tasks with declarative Dynamic Tables specifying target lag SLAs, eliminating custom dependency orchestrators.</li>
              <li><strong>FinOps Cost Governance:</strong> Enforced auto-suspend policies (60 seconds idle timeout), set up resource monitors with automated quota alerts, and eliminated full table scans via Query Profile inspection.</li>
            </ul>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">Key Metrics &amp; Impact</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 0.75rem;">
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-cyan);">28%</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Warehouse Credits Saved</div>
              </div>
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-emerald);">&lt; 10 min</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Target Lag Guaranteed</div>
              </div>
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-blue);">Zero</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Idle Warehouse Overhang</div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    4: {
      title: 'Mass Hosting Multi-Cloud Data Modernization',
      sub: 'Cross-Cloud Ingestion • AWS S3, Fabric OneLake & Live OXR Feeds',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="background: var(--accent-blue-light); border: 1px solid var(--accent-blue-border); padding: 0.85rem 1.25rem; border-radius: 10px; color: var(--accent-blue); font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <span>Verified Outcome: 90% reduction in manual intervention time and complete modernization of legacy SSIS pipelines.</span>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">The Business Challenge</h4>
            <p style="color: var(--text-muted); line-height: 1.65;">
              A global mass hosting enterprise relied on fragile on-premise SSIS packages and manual spreadsheet uploads to aggregate daily revenues across multiple countries. Generating currency-adjusted reporting required hours of manual effort daily and was prone to reconciliation errors.
            </p>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">My Architectural Solution</h4>
            <ul style="padding-left: 1.25rem; color: var(--text-muted); line-height: 1.65; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>Cross-Cloud Automated Ingestion:</strong> Built parameterized copy activities within Fabric Data Pipelines to automatically move files from AWS S3 buckets into OneLake storage.</li>
              <li><strong>Live Currency Rates Feeds:</strong> Engineered automated PySpark notebook jobs querying the Open Exchange Rates (OXR) API daily, ensuring currency conversions were consistently accurate.</li>
              <li><strong>Modernization from SSIS:</strong> Deprecated legacy SSIS servers, migrating business logic into maintainable Fabric Dataflows Gen2 and PySpark transformations.</li>
            </ul>
          </div>

          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">Key Metrics &amp; Impact</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 0.75rem;">
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-emerald);">90%</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Manual Time Cut</div>
              </div>
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-blue);">Daily</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Live OXR Currency Sync</div>
              </div>
              <div style="background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-purple);">100%</div>
                <div style="font-size: 0.8rem; color: var(--text-light);">Cloud Lakehouse Transition</div>
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

  function openProjectModal(pId) {
    const data = projectDetails[pId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSub.textContent = data.sub;
    modalBody.innerHTML = data.content;
    modal.classList.add('open', 'active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modal.classList.remove('open', 'active');
    document.body.style.overflow = '';
  }

  triggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project');
      openProjectModal(pId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });
}

/* ==========================================================================
   9. Professional Cover Letter Engine (Customizable & Isolated Print)
   ========================================================================== */
function initCoverLetterEngine() {
  const roleSelect = document.getElementById('cover-role-select');
  const companyInput = document.getElementById('recipient-company');
  const displayCompany = document.getElementById('display-recipient-company');
  const displaySubject = document.getElementById('display-letter-subject');
  const letterBody = document.getElementById('letter-content-text');
  const dateDisplay = document.getElementById('letter-current-date');
  const copyBtn = document.getElementById('btn-copy-coverletter');
  const printBtn = document.getElementById('btn-print-coverletter');
  const downloadTxtBtn = document.getElementById('btn-download-coverletter-txt');

  if (!letterBody) return;

  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  if (dateDisplay) {
    dateDisplay.textContent = now.toLocaleDateString('en-US', options);
  }

  const coverLetterTemplates = {
    'senior-multi': {
      subject: 'Application for Senior Data Engineer / Technical Lead (Fabric, Databricks & Snowflake)',
      getContent: (company) => `
        <p>Dear Hiring Team at ${company},</p>
        
        <p>I am writing to express my enthusiastic interest in the <strong>Senior Data Engineer</strong> role at ${company}. Having architected modern data platforms across <strong>Microsoft Fabric, Databricks, and Snowflake</strong>, I combine deep platform mastery with advanced SQL, PySpark distributed computing, dimensional modeling, and technical team leadership. Having delivered mission-critical architectures that cut manual intervention by 90% and achieved 99.2% billing accuracy for major UK funds, I am confident in my ability to drive high-impact data engineering for your organization.</p>
        
        <p>Currently as a Senior Data Engineer at JMAN Group, I lead a team of 3 data engineers responsible for architecting end-to-end lakehouse architectures. Key accomplishments I bring to ${company}:</p>
        <ul style="padding-left: 1.25rem; margin: 0.75rem 0 1rem 0; display: flex; flex-direction: column; gap: 0.4rem;">
          <li><strong>Multi-Platform Architectural Depth:</strong> Designed production lakehouse solutions on Microsoft Fabric (OneLake shortcuts, Delta Lake, Direct Lake), high-throughput Databricks clusters (Auto Loader, Spark memory tuning, Unity Catalog), and Snowflake warehouses (Snowpipe, Streams &amp; Tasks, Dynamic Tables).</li>
          <li><strong>Financial-Grade Accuracy (99.2%):</strong> Architected an enterprise billing data platform for a top UK fund management client using Fabric, Fivetran, and PySpark, eliminating reconciliation errors across millions in fee transactions.</li>
          <li><strong>Advanced SQL &amp; Data Modeling:</strong> Expert in window functions, CTEs, execution plan pruning, Change Data Capture (CDC), and SCD Type 1 &amp; Type 2 modeling for audit-proof ledgers.</li>
          <li><strong>Governance &amp; FinOps:</strong> Implemented comprehensive Role-Based Access Controls (RBAC), Row-Level Security (RLS), and warehouse auto-suspend / Spark pool optimization to minimize cloud infrastructure costs.</li>
          <li><strong>Technical Leadership &amp; Mentorship:</strong> Leading sprint reviews, establishing dbt and CI/CD testing standards, writing architectural runbooks, and aligning data engineering directly with executive business goals.</li>
        </ul>

        <p>My academic foundation in Electronics &amp; Communication Engineering, coupled with production-grade data platform delivery across multi-cloud environments (Azure &amp; AWS), enables me to solve ambiguous, complex data engineering challenges with speed and rigor.</p>

        <p>I welcome the opportunity to discuss how my multi-platform expertise, team mentorship, and focus on data integrity can accelerate ${company}'s data engineering milestones.</p>

        <p>Thank you for your time and consideration.</p>
      `
    },
    'fabric-lead': {
      subject: 'Application for Microsoft Fabric & OneLake Architect',
      getContent: (company) => `
        <p>Dear Hiring Team at ${company},</p>
        
        <p>I am reaching out to submit my application for the <strong>Microsoft Fabric &amp; OneLake Architect</strong> opportunity at ${company}. Having specialized intensively in the Microsoft Fabric ecosystem since its launch—alongside PySpark, OneLake shortcuts, and Direct Lake semantic modeling—I offer deep architectural expertise in building unified Medallion platforms that eliminate data silos and deliver sub-second analytical concurrency.</p>

        <p>In my current role as Senior Data Engineer at JMAN Group, I have architected production-grade Fabric lakehouse-warehouse solutions for multinational enterprises:</p>
        <ul style="padding-left: 1.25rem; margin: 0.75rem 0 1rem 0; display: flex; flex-direction: column; gap: 0.4rem;">
          <li><strong>OneLake Unified Storage:</strong> Architected centralized Bronze/Silver/Gold storage patterns using Delta Parquet, linking AWS S3 buckets via OneLake shortcuts with zero network egress overhead.</li>
          <li><strong>Direct Lake Mode Optimization:</strong> Engineered semantic models that connect Power BI directly to OneLake Delta tables, eradicating traditional scheduled import refreshes and delivering sub-second reporting cycles.</li>
          <li><strong>Enterprise Security Architecture:</strong> Enforced comprehensive governance encompassing Role-Based Access Controls (RBAC), Row-Level Security (RLS), and Object-Level Security (OLS) without Spark compute degradation.</li>
          <li><strong>Legacy-to-Fabric Modernization:</strong> Migrated complex on-premise SSIS and stored procedure pipelines into modern Fabric Dataflows Gen2 and PySpark orchestration, reducing manual intervention by 90%.</li>
        </ul>

        <p>I am eager to bring this proven Fabric architecture blueprint and team leadership to ${company} to accelerate your lakehouse adoption.</p>

        <p>Thank you for your consideration, and I look forward to speaking with you soon.</p>
      `
    },
    'databricks-lead': {
      subject: 'Application for Databricks, PySpark & Delta Lake Specialist',
      getContent: (company) => `
        <p>Dear Hiring Team at ${company},</p>

        <p>I am writing to express my strong interest in the <strong>Databricks, PySpark &amp; Delta Lake Specialist</strong> position at ${company}. As a senior data engineer with extensive experience across distributed computing, Spark engine internals, and Delta Lake ACID transaction logs, I specialize in engineering resilient pipelines capable of ingesting and transforming high-volume enterprise datasets with 99%+ integrity guarantees.</p>

        <p>Key highlights of my Databricks and PySpark production work include:</p>
        <ul style="padding-left: 1.25rem; margin: 0.75rem 0 1rem 0; display: flex; flex-direction: column; gap: 0.4rem;">
          <li><strong>PySpark Compute Optimization:</strong> Built custom transformation routines, tuning executor memory, eliminating data skew via salting, and implementing broadcast joins to slash pipeline runtimes and cloud infrastructure costs by up to 35%.</li>
          <li><strong>Auto Loader &amp; SCD Type 2:</strong> Deployed Databricks Auto Loader for streaming file ingestion with automatic schema evolution, combined with Delta Lake MERGE for historical change tracking.</li>
          <li><strong>Unity Catalog Governance:</strong> Organized data assets across 3-tier namespaces (Catalog.Schema.Table) with automated column masking and end-to-end lineage tracking.</li>
          <li><strong>CI/CD with Databricks Asset Bundles:</strong> Established automated Git-based multi-environment deployments using DAB and GitHub Actions runners.</li>
        </ul>

        <p>I would love to contribute my distributed compute fluency, PySpark rigor, and Delta Lake expertise to ${company}'s engineering initiatives.</p>

        <p>Thank you for considering my application.</p>
      `
    },
    'snowflake-lead': {
      subject: 'Application for Snowflake Cloud Data Warehouse Engineer',
      getContent: (company) => `
        <p>Dear Hiring Team at ${company},</p>

        <p>I am submitting my application for the <strong>Snowflake Cloud Data Warehouse Engineer</strong> role at ${company}. Having architected modern data warehousing pipelines leveraging Snowflake's decoupled compute-storage architecture, I specialize in building reliable ingestion workflows, declarative transformations, and proactive FinOps cost management.</p>

        <p>My Snowflake engineering experience encompasses:</p>
        <ul style="padding-left: 1.25rem; margin: 0.75rem 0 1rem 0; display: flex; flex-direction: column; gap: 0.4rem;">
          <li><strong>Continuous &amp; Serverless Ingestion:</strong> Automated data loading from multi-cloud storage stages using Snowpipe, Snowpipe Streaming, and external stage integrations.</li>
          <li><strong>Modern Declarative Pipelines:</strong> Designed Dynamic Tables with target lag SLA management to streamline complex multi-step transformations, reserving Streams &amp; Tasks for custom procedural event handling.</li>
          <li><strong>Snowpark Python Development:</strong> Built procedural transformations and custom UDFs leveraging Snowpark DataFrames.</li>
          <li><strong>FinOps &amp; Query Optimization:</strong> Analyzed Query Profiles to eliminate micro-partition pruning bottlenecks, implemented warehouse auto-suspend policies, and established resource monitors.</li>
        </ul>

        <p>I look forward to discussing how my Snowflake expertise and data engineering background can add immediate value to ${company}.</p>

        <p>Thank you for your time and review.</p>
      `
    }
  };

  function updateCoverLetter() {
    const roleKey = roleSelect ? roleSelect.value : 'senior-multi';
    const company = companyInput && companyInput.value.trim() ? companyInput.value.trim() : 'The Hiring Team';
    const template = coverLetterTemplates[roleKey] || coverLetterTemplates['senior-multi'];

    if (displayCompany) displayCompany.textContent = company;
    if (displaySubject) displaySubject.textContent = template.subject;
    letterBody.innerHTML = template.getContent(company);
  }

  if (roleSelect) roleSelect.addEventListener('change', updateCoverLetter);
  if (companyInput) companyInput.addEventListener('input', updateCoverLetter);

  updateCoverLetter();

  // Copy Cover Letter
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = letterBody.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Cover letter copied to clipboard!');
      }).catch(() => {
        showToast('Could not copy automatically. Please copy manually.');
      });
    });
  }

  // Download Cover Letter as .TXT
  if (downloadTxtBtn) {
    downloadTxtBtn.addEventListener('click', () => {
      const subject = displaySubject ? displaySubject.innerText : 'Cover Letter';
      const company = displayCompany ? displayCompany.innerText : 'Company';
      const date = dateDisplay ? dateDisplay.innerText : '';
      const textContent = `NARENDRA GODARA - COVER LETTER\nDate: ${date}\nTo: ${company}\nSubject: ${subject}\n\n${letterBody.innerText}\n\nSincerely,\nNarendra Godara\nSenior Data Engineer\nEmail: narendrago999@gmail.com | Phone: +91 9352641216`;
      
      downloadFile(`Narendra_Godara_Cover_Letter_${company.replace(/\s+/g, '_')}.txt`, textContent);
      showToast('Cover letter downloaded as text file.');
    });
  }

  // Print Cover Letter ONLY (Strictly isolated from Resume)
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      document.body.classList.remove('print-mode-resume');
      document.body.classList.add('print-mode-coverletter');
      showToast('Preparing Cover Letter for print/PDF...');
      setTimeout(() => {
        window.print();
        setTimeout(() => {
          document.body.classList.remove('print-mode-coverletter');
        }, 1500);
      }, 100);
    });
  }
}

/* ==========================================================================
   10. Official Printable Resume Modal (Isolated from Cover Letter)
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtn = document.getElementById('btn-open-resume-modal');
  const overviewOpenBtn = document.getElementById('overview-btn-resume');
  const closeBtn = document.getElementById('modal-close-btn');
  const printBtn = document.getElementById('btn-print-resume');
  const downloadTxtBtn = document.getElementById('btn-download-resume-txt');

  if (!modal) return;

  function openResume() {
    modal.classList.add('open', 'active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    modal.classList.remove('open', 'active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openResume);
  if (overviewOpenBtn) overviewOpenBtn.addEventListener('click', openResume);
  if (closeBtn) closeBtn.addEventListener('click', closeResume);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeResume();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeResume();
    }
  });

  // Print Resume ONLY (Strictly isolated from Cover Letter)
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      document.body.classList.remove('print-mode-coverletter');
      document.body.classList.add('print-mode-resume');
      showToast('Preparing Resume for print/PDF...');
      setTimeout(() => {
        window.print();
        setTimeout(() => {
          document.body.classList.remove('print-mode-resume');
        }, 1500);
      }, 100);
    });
  }

  // Download ATS Resume as .TXT
  if (downloadTxtBtn) {
    downloadTxtBtn.addEventListener('click', () => {
      const resumeArea = document.getElementById('printable-resume-area');
      const text = resumeArea ? resumeArea.innerText : 'Narendra Godara Resume';
      downloadFile('Narendra_Godara_Senior_Data_Engineer_Resume.txt', text);
      showToast('Resume downloaded as text file.');
    });
  }
}

// Global print listener ensuring strict isolation
window.addEventListener('beforeprint', () => {
  const resumeModal = document.getElementById('resume-modal');
  if (!document.body.classList.contains('print-mode-resume') && !document.body.classList.contains('print-mode-coverletter')) {
    if (resumeModal && resumeModal.classList.contains('open')) {
      document.body.classList.add('print-mode-resume');
    } else {
      document.body.classList.add('print-mode-coverletter');
    }
  }
});

window.addEventListener('afterprint', () => {
  document.body.classList.remove('print-mode-resume', 'print-mode-coverletter');
});

// Helper for file downloading
function downloadFile(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/* ==========================================================================
   11. Contact Form & Click-to-Copy Actions
   ========================================================================== */
function initContactFormAndCopy() {
  const form = document.getElementById('contact-form');
  const copyButtons = document.querySelectorAll('[data-copy]');

  // Copy buttons
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text}`);
      }).catch(() => {
        showToast('Unable to copy to clipboard.');
      });
    });
  });

  // Contact form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const company = document.getElementById('contact-company')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Generate mailto link
      const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - ${name} (${company || 'Individual'})`);
      const emailBody = encodeURIComponent(
        `Hi Narendra,\n\n${message}\n\nFrom:\n${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}`
      );

      const mailtoLink = `mailto:narendrago999@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      
      showToast('Opening your default email client...');
      window.location.href = mailtoLink;
      
      form.reset();
    });
  }
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast-notify');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
