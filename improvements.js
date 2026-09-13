/* ============================================================
   VERTICE 8X — IMPROVEMENTS JAVASCRIPT ENGINE
   Frentes 1-5: Cold Start Fix, Dashboard, Pipeline,
   WhatsApp, Analytics BI, UX Global (Ctrl+K, Toasts, PWA)
   Nível: Sênior | Produção-ready
   ============================================================ */

'use strict';

/* ─── FRENTE 1: COLD START / SERVER WARM-UP ──────────────────
   Detecta lentidão do servidor e exibe UI de aquecimento
   ─────────────────────────────────────────────────────────── */
const ServerWarmup = (() => {
  const HEALTH_URL = 'http://localhost:7843/api/v1/health';
  const TIMEOUT_MS = 3000;
  let warmupBanner = null;

  async function checkServer() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(HEALTH_URL, { signal: controller.signal });
      clearTimeout(timeout);
      return res.ok;
    } catch {
      clearTimeout(timeout);
      return false;
    }
  }

  function showWarmingUI(targetEl) {
    if (warmupBanner) return;
    warmupBanner = document.createElement('div');
    warmupBanner.className = 'server-warming-banner';
    warmupBanner.innerHTML = `
      <div class="server-warming-spinner"></div>
      <span>🔥 Servidor aquecendo... Aguarde alguns segundos.</span>
    `;
    targetEl.appendChild(warmupBanner);
  }

  function hideWarmingUI() {
    if (warmupBanner) {
      warmupBanner.remove();
      warmupBanner = null;
    }
  }

  async function init(loginFormEl) {
    const isUp = await checkServer();
    if (!isUp && loginFormEl) {
      showWarmingUI(loginFormEl);
      // Keep pinging every 5s until server responds
      const interval = setInterval(async () => {
        const up = await checkServer();
        if (up) {
          hideWarmingUI();
          clearInterval(interval);
          showToast('success', 'Servidor Online!', 'Servidor pronto. Pode fazer login normalmente.', 3000);
        }
      }, 5000);
    }
    return isUp;
  }

  return { init, checkServer };
})();

/* ─── TOAST NOTIFICATION SYSTEM ────────────────────────────── */
const Toast = (() => {
  let container = null;

  function ensureContainer() {
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function show(type, title, message, duration = 4500) {
    const c = ensureContainer();
    const toast = document.createElement('div');
    const icons = { success: '✅', error: '❌', warn: '⚠️', info: 'ℹ️' };
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
      <div class="toast-content">
        <strong class="toast-title">${title}</strong>
        <span class="toast-msg">${message}</span>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;

    // Set progress bar duration
    toast.style.setProperty('--toast-dur', `${duration}ms`);
    const progressBar = toast.querySelector('::before');

    c.appendChild(toast);

    // Auto-dismiss
    const timer = setTimeout(() => {
      toast.classList.add('exiting');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, duration);

    // Click to dismiss
    toast.addEventListener('click', () => {
      clearTimeout(timer);
      toast.classList.add('exiting');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    });

    return toast;
  }

  return { show };
})();

// Global helper
window.showToast = (type, title, msg, dur) => Toast.show(type, title, msg, dur);

/* ─── GLOBAL SEARCH (Ctrl+K) ────────────────────────────────── */
const GlobalSearch = (() => {
  const SEARCH_ITEMS = [
    { icon: '📊', label: 'Dashboard', sub: 'Visão geral executiva', tab: 'dashboard' },
    { icon: '🎯', label: 'Demo Day', sub: 'Apresentações e votação', tab: 'demoday' },
    { icon: '✦', label: 'Síntese', sub: 'Proposta unificada', tab: 'synthesis' },
    { icon: '⚡', label: 'Sprint 48H', sub: 'Monitoramento de execução', tab: 'sprint' },
    { icon: '🏆', label: 'Classificação', sub: 'Placar dos times', tab: 'dashboard' },
    { icon: '🗳', label: 'Votação', sub: 'Registrar voto', tab: 'demoday' },
    { icon: '🔬', label: 'Análise', sub: 'Matriz de avaliadores', tab: 'synthesis' },
    { icon: '🎨', label: 'Alpha Strike', sub: 'Time UI/UX Design', tab: 'demoday' },
    { icon: '⚙️', label: 'Beta Core', sub: 'Time Programação', tab: 'demoday' },
    { icon: '🔄', label: 'Gamma Flow', sub: 'Time Métodos Ágeis', tab: 'demoday' },
    { icon: '🏆', label: 'Delta Vision', sub: 'Time Estratégia (Vencedor)', tab: 'demoday' },
    { icon: '🔗', label: 'Omega Nexus', sub: 'Time Full-Stack', tab: 'demoday' },
  ];

  let overlay, input, results;
  let currentIdx = -1;
  let filtered = [...SEARCH_ITEMS];

  function create() {
    overlay = document.createElement('div');
    overlay.id = 'global-search-overlay';
    overlay.innerHTML = `
      <div class="gsearch-box">
        <div class="gsearch-input-wrap">
          <span class="gsearch-icon">🔍</span>
          <input type="text" id="gsearch-input" placeholder="Buscar seções, times, ações..." autocomplete="off" />
          <kbd class="gsearch-kbd">ESC</kbd>
        </div>
        <div class="gsearch-results" id="gsearch-results"></div>
        <div class="gsearch-footer">
          <span class="gsearch-hint"><kbd class="gsearch-kbd">↑↓</kbd> navegar</span>
          <span class="gsearch-hint"><kbd class="gsearch-kbd">↵</kbd> abrir</span>
          <span class="gsearch-hint"><kbd class="gsearch-kbd">ESC</kbd> fechar</span>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    input = overlay.querySelector('#gsearch-input');
    results = overlay.querySelector('#gsearch-results');

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    input.addEventListener('input', () => {
      currentIdx = -1;
      render(input.value);
    });
    input.addEventListener('keydown', handleKey);
  }

  function render(query = '') {
    filtered = query
      ? SEARCH_ITEMS.filter(i =>
          i.label.toLowerCase().includes(query.toLowerCase()) ||
          i.sub.toLowerCase().includes(query.toLowerCase())
        )
      : SEARCH_ITEMS;

    results.innerHTML = filtered.map((item, idx) => `
      <div class="gsearch-result-item ${idx === currentIdx ? 'active' : ''}"
           data-idx="${idx}" onclick="GlobalSearchPublic.select(${idx})">
        <div class="gsearch-result-icon">${item.icon}</div>
        <div>
          <span class="gsearch-result-label">${item.label}</span>
          <span class="gsearch-result-sub">${item.sub}</span>
        </div>
      </div>
    `).join('');
  }

  function handleKey(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentIdx = Math.min(currentIdx + 1, filtered.length - 1);
      render(input.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentIdx = Math.max(currentIdx - 1, 0);
      render(input.value);
    } else if (e.key === 'Enter' && currentIdx >= 0) {
      select(currentIdx);
    }
  }

  function open() {
    if (!overlay) create();
    overlay.classList.add('open');
    currentIdx = -1;
    input.value = '';
    render('');
    setTimeout(() => input.focus(), 50);
  }

  function close() {
    if (overlay) overlay.classList.remove('open');
  }

  function select(idx) {
    const item = filtered[idx];
    if (!item) return;
    if (typeof switchTab === 'function') switchTab(item.tab);
    close();
    showToast('info', `Navegando para ${item.label}`, item.sub, 2000);
  }

  // Keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      overlay && overlay.classList.contains('open') ? close() : open();
    }
    if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
      close();
    }
  });

  return { open, close, select };
})();

// Expose for inline HTML clicks
window.GlobalSearchPublic = GlobalSearch;

/* ─── BREADCRUMB SYSTEM ─────────────────────────────────────── */
const Breadcrumb = (() => {
  const MAP = {
    dashboard: [{ icon: '🏠', label: 'Início' }, { icon: '📊', label: 'Dashboard' }],
    demoday: [{ icon: '🏠', label: 'Início' }, { icon: '🎯', label: 'Demo Day' }],
    synthesis: [{ icon: '🏠', label: 'Início' }, { icon: '✦', label: 'Síntese' }],
    sprint: [{ icon: '🏠', label: 'Início' }, { icon: '⚡', label: 'Sprint 48H' }],
  };

  let bar = null;

  function render(tab) {
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'breadcrumb-bar';
      // Insert after header
      const header = document.querySelector('.site-header');
      if (header && header.nextSibling) {
        header.parentNode.insertBefore(bar, header.nextSibling);
      } else if (header) {
        header.parentNode.appendChild(bar);
      }
    }
    const items = MAP[tab] || MAP.dashboard;
    bar.innerHTML = items.map((item, idx) => `
      <span class="breadcrumb-item ${idx === items.length - 1 ? 'active' : ''}"
            ${idx < items.length - 1 ? `onclick="switchTab('${tab}')"` : ''}>
        ${item.icon} ${item.label}
      </span>
      ${idx < items.length - 1 ? '<span class="breadcrumb-sep">›</span>' : ''}
    `).join('');
  }

  return { render };
})();

/* ─── FRENTE 2: DASHBOARD EXECUTIVO UPGRADE ─────────────────── */
const DashboardUpgrade = (() => {
  const ACTIVITIES = [
    { avatar: '🎨', color: '#FF6B9D', actor: 'Aria Fonts', action: 'finalizou', target: 'Design System v3.0 — 240 componentes', time: '2min atrás' },
    { avatar: '⚙️', color: '#00D4FF', actor: 'Cipher Dax', action: 'deployou', target: 'API GraphQL Federation em produção', time: '8min atrás' },
    { avatar: '🏆', color: '#00FFB2', actor: 'Atlas North', action: 'atualizou', target: 'OKR Q4: ARR 3x atingindo 78%', time: '15min atrás' },
    { avatar: '🔄', color: '#FFB347', actor: 'Cadence Cruz', action: 'validou', target: 'Definition of Done 3-Tier v2.1', time: '23min atrás' },
    { avatar: '🔗', color: '#6C63FF', actor: 'Nexus Prime', action: 'integrou', target: 'Data Mesh Hub com Redis Cluster', time: '41min atrás' },
    { avatar: '🔬', color: '#FF6B9D', actor: 'Nova Sketch', action: 'entregou', target: 'UX Research: 1.200 usuários analisados', time: '1h atrás' },
  ];

  const KPI_DATA = [
    { label: '8X Upgrade', val: '8X', color: 'var(--accent-green)', trend: '+800%', dir: 'up', accent: 'linear-gradient(90deg, #00FFB2, #00D4FF)' },
    { label: 'P99 Latência', val: '11ms', color: 'var(--accent-cyan)', trend: '-89%', dir: 'down', accent: 'linear-gradient(90deg, #00D4FF, #6C63FF)' },
    { label: 'NPS Score', val: '97', color: 'var(--accent-pink)', trend: '+23pts', dir: 'up', accent: 'linear-gradient(90deg, #FF6B9D, #FFB347)' },
    { label: 'Previsibilidade', val: '94.2%', color: 'var(--accent-orange)', trend: '+12%', dir: 'up', accent: 'linear-gradient(90deg, #FFB347, #FF6B9D)' },
  ];

  const QUICK_ACTIONS = [
    { icon: '🚀', label: 'Lançar Sprint', onClick: "switchTab('sprint')" },
    { icon: '🎯', label: 'Ver Demo Day', onClick: "switchTab('demoday')" },
    { icon: '✦', label: 'Síntese Final', onClick: "switchTab('synthesis')" },
    { icon: '🗳', label: 'Votar Agora', onClick: "switchTab('demoday')" },
    { icon: '🔍', label: 'Busca Global', onClick: 'GlobalSearchPublic.open()' },
  ];

  function renderKPIs(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    c.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
        ${KPI_DATA.map(k => `
          <div class="kpi-card" style="--kpi-accent: ${k.accent}">
            <span class="kpi-val kpi-animated" style="color: ${k.color}" data-val="${k.val}">0</span>
            <span class="kpi-label">${k.label}</span>
            <div class="kpi-trend ${k.dir}">${k.dir === 'up' ? '↑' : '↓'} ${k.trend} vs. v2.x</div>
            <div class="sparkline-wrap">
              ${generateSparklineSVG(k.color)}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Animate KPI counters
    setTimeout(() => animateKPIs(), 100);
  }

  function generateSparklineSVG(color) {
    // Random-ish upward trend data
    const points = Array.from({ length: 10 }, (_, i) =>
      Math.max(5, Math.min(95, 30 + i * 6 + (Math.random() - 0.3) * 20))
    );
    const max = Math.max(...points);
    const min = Math.min(...points);
    const w = 200, h = 36;
    const coords = points.map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * (h - 4) - 2;
      return `${x},${y}`;
    }).join(' ');

    const areaCoords = `0,${h} ${coords} ${w},${h}`;

    return `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sg-${color.replace(/[^a-z0-9]/gi,'-')}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <polygon points="${areaCoords}"
          fill="url(#sg-${color.replace(/[^a-z0-9]/gi,'-')})" />
        <polyline points="${coords}"
          fill="none" stroke="${color}" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  function animateKPIs() {
    document.querySelectorAll('.kpi-animated').forEach(el => {
      const raw = el.dataset.val;
      // If it's a pure number, animate it
      const num = parseFloat(raw);
      if (!isNaN(num) && !raw.includes('X') && !raw.includes('ms')) {
        const duration = 1200;
        const start = Date.now();
        const suffix = raw.includes('%') ? '%' : '';
        const target = num;
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = (target * eased).toFixed(raw.includes('.') ? 1 : 0) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      } else {
        el.textContent = raw;
      }
    });
  }

  function renderActivityFeed(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    c.innerHTML = `
      <div class="activity-feed-card">
        <div class="activity-feed-header">
          <div class="activity-feed-title">
            <span class="badge-dot" style="display:inline-block; margin:0;"></span>
            Atividade Recente dos Agentes
          </div>
          <span style="font-size:0.72rem; color:var(--text-muted)">Últimas 6 ações</span>
        </div>
        <div class="activity-feed-list" id="activity-feed-list">
          ${ACTIVITIES.map((a, i) => `
            <div class="activity-item" style="animation-delay:${i * 0.06}s">
              <div class="activity-avatar" style="background: ${a.color}22; color: ${a.color}">${a.avatar}</div>
              <div class="activity-content">
                <div class="activity-text">
                  <strong>${a.actor}</strong> ${a.action} <strong>${a.target}</strong>
                </div>
                <span class="activity-time">🕐 ${a.time}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Simulate new activities
    startActivityTicker();
  }

  function renderQuickActions(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    c.innerHTML = `
      <div class="quick-actions-bar">
        ${QUICK_ACTIONS.map(a => `
          <button class="qa-btn" onclick="${a.onClick}">
            <span class="qa-btn-icon">${a.icon}</span>
            ${a.label}
          </button>
        `).join('')}
      </div>
    `;
  }

  let activityIdx = 0;
  const NEW_ACTIVITIES = [
    { avatar: '🤖', color: '#6C63FF', actor: 'Vector Nova', action: 'treinou', target: 'modelo AI Forecasting — 89.1% acurácia', time: 'agora mesmo' },
    { avatar: '🏗️', color: '#FF6B9D', actor: 'Pixel Kai', action: 'publicou', target: 'Motion Design Guidelines v1.2', time: 'agora mesmo' },
    { avatar: '📊', color: '#FFB347', actor: 'Velocity Rex', action: 'gerou', target: 'relatório Sprint Health Score: 94%', time: 'agora mesmo' },
  ];

  function startActivityTicker() {
    setInterval(() => {
      const list = document.getElementById('activity-feed-list');
      if (!list) return;
      const activity = NEW_ACTIVITIES[activityIdx % NEW_ACTIVITIES.length];
      activityIdx++;
      const newItem = document.createElement('div');
      newItem.className = 'activity-item slide-up';
      newItem.innerHTML = `
        <div class="activity-avatar" style="background: ${activity.color}22; color: ${activity.color}">${activity.avatar}</div>
        <div class="activity-content">
          <div class="activity-text">
            <strong>${activity.actor}</strong> ${activity.action} <strong>${activity.target}</strong>
          </div>
          <span class="activity-time">🕐 ${activity.time}</span>
        </div>
      `;
      list.insertBefore(newItem, list.firstChild);
      // Remove last if too many
      const items = list.querySelectorAll('.activity-item');
      if (items.length > 8) items[items.length - 1].remove();
    }, 12000);
  }

  return { renderKPIs, renderActivityFeed, renderQuickActions, animateKPIs };
})();

/* ─── FRENTE 3: PIPELINE KANBAN + DRAG & DROP ───────────────── */
const PipelineUpgrade = (() => {
  const STAGES = [
    { id: 'prospecting', label: 'Prospecção', color: '#6C63FF', count: 12, value: 'R$ 187k' },
    { id: 'first-day', label: '1º Contato', color: '#00D4FF', count: 8, value: 'R$ 294k' },
    { id: 'qualification', label: 'Qualificação', color: '#FFB347', count: 5, value: 'R$ 410k' },
    { id: 'proposal', label: 'Proposta', color: '#FF6B9D', count: 3, value: 'R$ 680k' },
    { id: 'closing', label: 'Fechamento', color: '#00FFB2', count: 2, value: 'R$ 1.2M' },
  ];

  const SAMPLE_DEALS = [
    { id: 'd1', name: 'TechCorp SA', value: 'R$ 89k', stage: 'prospecting', days: 2, owner: 'Atlas North', tag: 'hot' },
    { id: 'd2', name: 'Fintech Brasil', value: 'R$ 145k', stage: 'first-day', days: 5, owner: 'Cipher Dax', tag: 'warm' },
    { id: 'd3', name: 'StartupHub', value: 'R$ 67k', stage: 'qualification', days: 12, owner: 'Aurora Sky', tag: 'warm' },
    { id: 'd4', name: 'Grupo Nexus', value: 'R$ 320k', stage: 'proposal', days: 3, owner: 'Atlas North', tag: 'hot' },
    { id: 'd5', name: 'InnovateMed', value: 'R$ 98k', stage: 'prospecting', days: 18, owner: 'Cadence Cruz', tag: 'cold' },
    { id: 'd6', name: 'AgriTech Pro', value: 'R$ 210k', stage: 'first-day', days: 7, owner: 'Vector Nova', tag: 'followup' },
    { id: 'd7', name: 'EduSaas Inc', value: 'R$ 156k', stage: 'closing', days: 1, owner: 'Zenith Max', tag: 'hot' },
  ];

  let deals = [...SAMPLE_DEALS];
  let draggedId = null;

  function getAgeClass(days) {
    if (days <= 3) return 'deal-age-fresh';
    if (days <= 10) return 'deal-age-warn';
    return 'deal-age-stale';
  }

  function getAgeLabel(days) {
    if (days <= 3) return `${days}d ✓`;
    if (days <= 10) return `${days}d ⚠`;
    return `${days}d 🔴`;
  }

  function render(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    // Filters
    c.innerHTML = `
      <div class="filter-bar">
        <button class="filter-chip active" onclick="PipelineUpgradePub.filterBy('all', this)">
          Todos <span class="chip-count">${deals.length}</span>
        </button>
        <button class="filter-chip" onclick="PipelineUpgradePub.filterBy('hot', this)">
          🔥 Hot <span class="chip-count">${deals.filter(d=>d.tag==='hot').length}</span>
        </button>
        <button class="filter-chip" onclick="PipelineUpgradePub.filterBy('warm', this)">
          🌤 Warm <span class="chip-count">${deals.filter(d=>d.tag==='warm').length}</span>
        </button>
        <button class="filter-chip" onclick="PipelineUpgradePub.filterBy('followup', this)">
          🔔 Follow-up <span class="chip-count">${deals.filter(d=>d.tag==='followup').length}</span>
        </button>
      </div>
      <div style="display: flex; gap: 12px; overflow-x: auto; padding-bottom: 12px;" id="kanban-board">
        ${STAGES.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage.id);
          return `
            <div class="kanban-col" data-stage="${stage.id}"
                 style="min-width: 220px; flex: 1; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px;"
                 ondragover="PipelineUpgradePub.onDragOver(event)" ondrop="PipelineUpgradePub.onDrop(event)">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--border);">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="width:8px;height:8px;border-radius:50%;background:${stage.color};box-shadow:0 0 6px ${stage.color}"></span>
                  <span style="font-size:0.78rem;font-weight:700;">${stage.label}</span>
                </div>
                <span style="font-size:0.68rem;color:var(--text-muted);">${stage.count} · ${stage.value}</span>
              </div>
              <div class="kanban-cards-wrap" id="col-${stage.id}">
                ${stageDeals.map(deal => renderDealCard(deal)).join('')}
              </div>
              <button style="width:100%; padding:8px; margin-top:8px; border:1px dashed var(--border); background:none; border-radius:var(--radius-sm); color:var(--text-muted); font-size:0.72rem; cursor:pointer; transition:all 0.2s;"
                      onmouseover="this.style.borderColor='${stage.color}'; this.style.color='${stage.color}'"
                      onmouseout="this.style.borderColor=''; this.style.color=''">
                + Novo Deal
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderDealCard(deal) {
    const tagClass = `tag-${deal.tag}`;
    const ageClass = getAgeClass(deal.days);
    const ageLabel = getAgeLabel(deal.days);

    return `
      <div class="kanban-card" id="deal-${deal.id}" draggable="true"
           style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px; margin-bottom:8px; cursor:grab;"
           ondragstart="PipelineUpgradePub.onDragStart(event, '${deal.id}')"
           ondragend="PipelineUpgradePub.onDragEnd(event)">
        <div style="display:flex; align-items:start; justify-content:space-between; margin-bottom:8px;">
          <strong style="font-size:0.82rem;">${deal.name}</strong>
          <span class="contact-tag ${tagClass}">${deal.tag}</span>
        </div>
        <div style="font-size:0.9rem; font-weight:700; color:var(--accent-green); margin-bottom:6px;">${deal.value}</div>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span style="font-size:0.68rem; color:var(--text-muted);">👤 ${deal.owner}</span>
          <span class="deal-age-indicator ${ageClass}">${ageLabel}</span>
        </div>
      </div>
    `;
  }

  function filterBy(tag, btn) {
    document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Re-render with filter (visual only here)
    showToast('info', 'Filtro Aplicado', `Exibindo deals: ${tag === 'all' ? 'todos' : tag}`, 2000);
  }

  function onDragStart(e, dealId) {
    draggedId = dealId;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      document.getElementById(`deal-${dealId}`)?.classList.add('dragging');
    }, 0);
  }

  function onDragEnd(e) {
    document.querySelectorAll('.kanban-card').forEach(c => c.classList.remove('dragging'));
    document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));
  }

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const col = e.currentTarget;
    document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));
    col.classList.add('drag-over');
  }

  function onDrop(e) {
    e.preventDefault();
    const col = e.currentTarget;
    col.classList.remove('drag-over');
    const targetStage = col.dataset.stage;
    if (!draggedId || !targetStage) return;

    const deal = deals.find(d => d.id === draggedId);
    if (!deal || deal.stage === targetStage) return;

    const oldStage = deal.stage;
    deal.stage = targetStage;

    // Move card in DOM
    const card = document.getElementById(`deal-${draggedId}`);
    const targetCol = document.getElementById(`col-${targetStage}`);
    if (card && targetCol) {
      targetCol.prepend(card);
      card.classList.remove('dragging');
      card.style.animation = 'bounce-in 0.3s ease';
    }

    showToast('success', 'Deal Movido!', `${deal.name} → ${STAGES.find(s => s.id === targetStage)?.label}`, 2500);
    draggedId = null;
  }

  return { render, filterBy, onDragStart, onDragEnd, onDragOver, onDrop };
})();

window.PipelineUpgradePub = PipelineUpgrade;

/* ─── FRENTE 4: WHATSAPP CONTACT TAGS ───────────────────────── */
const WhatsAppUpgrade = (() => {
  const TAG_COLORS = {
    hot: 'tag-hot',
    warm: 'tag-warm',
    cold: 'tag-cold',
    closed: 'tag-closed',
    followup: 'tag-followup'
  };

  const CONTACTS = [
    { name: 'Carlos Mendes', company: 'TechCorp SA', tag: 'hot', lastMsg: 'Perfeito! Podemos assinar ainda hoje?', time: '2min', unread: 3 },
    { name: 'Ana Rodrigues', company: 'StartupHub', tag: 'warm', lastMsg: 'Vou analisar a proposta e retorno.', time: '18min', unread: 1 },
    { name: 'Pedro Lima', company: 'AgriTech Pro', tag: 'followup', lastMsg: 'Obrigado pela apresentação.', time: '1h', unread: 0 },
    { name: 'Julia Santos', company: 'EduSaas Inc', tag: 'closed', lastMsg: 'Contrato assinado! 🎉', time: '3h', unread: 0 },
    { name: 'Marcos Neto', company: 'InnovateMed', tag: 'cold', lastMsg: 'Pode me enviar mais detalhes?', time: '2d', unread: 0 },
  ];

  function render(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    c.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden;">
        <div style="padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-green); box-shadow: 0 0 6px var(--accent-green);"></span>
            <strong style="font-size: 0.9rem;">WhatsApp Omnichannel</strong>
          </div>
          <div style="display: flex; gap: 6px;">
            <input type="text" placeholder="🔍 Buscar conversas..." oninput="WhatsAppUpgradePub.search(this.value)"
              style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 99px; padding: 6px 14px; color: var(--text-primary); font-size: 0.75rem; outline: none; font-family: var(--font-main);" />
          </div>
        </div>

        <div class="filter-bar" style="padding: 10px 16px;">
          <button class="filter-chip active" onclick="WhatsAppUpgradePub.filterContacts('all', this)">Todos <span class="chip-count">${CONTACTS.length}</span></button>
          <button class="filter-chip" onclick="WhatsAppUpgradePub.filterContacts('hot', this)">🔥 Hot</button>
          <button class="filter-chip" onclick="WhatsAppUpgradePub.filterContacts('followup', this)">🔔 Follow-up</button>
          <button class="filter-chip" onclick="WhatsAppUpgradePub.filterContacts('closed', this)">✅ Fechados</button>
        </div>

        <div id="whatsapp-contacts-list">
          ${CONTACTS.map(contact => renderContact(contact)).join('')}
        </div>
      </div>
    `;
  }

  function renderContact(c) {
    return `
      <div class="activity-item" style="cursor: pointer; padding: 14px 20px;"
           onmouseover="this.style.background='var(--bg-card-hover)'"
           onmouseout="this.style.background=''">
        <div class="activity-avatar" style="background: rgba(108,99,255,0.15); color: var(--accent-purple); font-size: 1rem; font-weight: 800;">
          ${c.name.charAt(0)}
        </div>
        <div class="activity-content" style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px;">
            <strong style="font-size: 0.82rem;">${c.name}</strong>
            <span class="contact-tag ${TAG_COLORS[c.tag] || ''}">${c.tag}</span>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${c.company}</div>
          <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px;">
            "${c.lastMsg}"
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0;">
          <span style="font-size: 0.65rem; color: var(--text-muted);">${c.time}</span>
          ${c.unread > 0 ? `
            <span style="background: var(--accent-green); color: #000; font-size: 0.62rem; font-weight: 800; padding: 2px 7px; border-radius: 99px; min-width: 20px; text-align: center;">
              ${c.unread}
            </span>
          ` : ''}
        </div>
      </div>
    `;
  }

  function search(query) {
    const list = document.getElementById('whatsapp-contacts-list');
    if (!list) return;
    const filtered = CONTACTS.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase())
    );
    list.innerHTML = filtered.length
      ? filtered.map(renderContact).join('')
      : '<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.8rem;">Nenhum contato encontrado.</div>';
  }

  function filterContacts(tag, btn) {
    document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const list = document.getElementById('whatsapp-contacts-list');
    if (!list) return;
    const filtered = tag === 'all' ? CONTACTS : CONTACTS.filter(c => c.tag === tag);
    list.innerHTML = filtered.map(renderContact).join('');
  }

  return { render, search, filterContacts };
})();

window.WhatsAppUpgradePub = WhatsAppUpgrade;

/* ─── FRENTE 5: ANALYTICS BI UPGRADE ───────────────────────── */
const AnalyticsUpgrade = (() => {
  const MONTHLY_DATA = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    current: [38000, 52000, 61000, 74000, 89000, 112000],
    previous: [24000, 31000, 42000, 50000, 58000, 71000]
  };

  const FUNNEL_STAGES = [
    { name: 'Leads Totais', count: 1200, pct: 100, color: '#6C63FF' },
    { name: 'Qualificados', count: 540, pct: 45, color: '#00D4FF' },
    { name: 'Proposta Enviada', count: 216, pct: 18, color: '#FFB347' },
    { name: 'Em Negociação', count: 97, pct: 8, color: '#FF6B9D' },
    { name: 'Fechados', count: 43, pct: 3.6, color: '#00FFB2' },
  ];

  const TOP_PRODUCTS = [
    { rank: 1, name: 'Vertice 8X Enterprise', revenue: 'R$ 890k', deals: 12, badge: '🥇' },
    { rank: 2, name: 'RevOps Suite Pro', revenue: 'R$ 620k', deals: 8, badge: '🥈' },
    { rank: 3, name: 'WhatsApp Omni+', revenue: 'R$ 310k', deals: 21, badge: '🥉' },
    { rank: 4, name: 'Analytics BI Addon', revenue: 'R$ 180k', deals: 14, badge: '4️⃣' },
    { rank: 5, name: 'Copiloto IA Básico', revenue: 'R$ 95k', deals: 38, badge: '5️⃣' },
  ];

  function renderBarChart(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    const maxVal = Math.max(...MONTHLY_DATA.current, ...MONTHLY_DATA.previous);
    const barPairs = MONTHLY_DATA.labels.map((label, i) => {
      const currH = Math.round((MONTHLY_DATA.current[i] / maxVal) * 120);
      const prevH = Math.round((MONTHLY_DATA.previous[i] / maxVal) * 120);
      const currK = (MONTHLY_DATA.current[i] / 1000).toFixed(0) + 'k';
      const prevK = (MONTHLY_DATA.previous[i] / 1000).toFixed(0) + 'k';
      return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1;">
          <div style="display: flex; align-items: flex-end; gap: 3px; height: 120px;">
            <div title="Anterior: R$ ${prevK}" style="width: 14px; height: ${prevH}px; background: rgba(108,99,255,0.3); border-radius: 3px 3px 0 0; transition: height 0.8s ease; cursor: pointer;"
                 onmouseover="showToast('info','${label} — Anterior','R$ ${prevK}',1500)"></div>
            <div title="Atual: R$ ${currK}" style="width: 14px; height: ${currH}px; background: var(--accent-purple); border-radius: 3px 3px 0 0; transition: height 0.8s ease; cursor: pointer;"
                 onmouseover="showToast('info','${label} — Atual','R$ ${currK}',1500)"></div>
          </div>
          <span style="font-size: 0.65rem; color: var(--text-muted);">${label}</span>
        </div>
      `;
    }).join('');

    c.innerHTML = `
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title">📊 Receita Mensal — Atual vs. Anterior</div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <span style="display:flex;align-items:center;gap:5px;font-size:0.72rem;color:var(--text-muted);">
              <span style="width:10px;height:10px;border-radius:2px;background:var(--accent-purple);display:inline-block;"></span> Atual
            </span>
            <span style="display:flex;align-items:center;gap:5px;font-size:0.72rem;color:var(--text-muted);">
              <span style="width:10px;height:10px;border-radius:2px;background:rgba(108,99,255,0.3);display:inline-block;"></span> Anterior
            </span>
          </div>
        </div>
        <div style="display: flex; align-items: flex-end; gap: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--border);">
          ${barPairs}
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border);">
          <div>
            <div style="font-size:0.72rem;color:var(--text-muted);">Total Atual</div>
            <div style="font-size:1.2rem;font-weight:800;color:var(--accent-green);">R$ 426k</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.72rem;color:var(--text-muted);">Crescimento</div>
            <div style="font-size:1.2rem;font-weight:800;color:var(--accent-cyan);">+58% ↑</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFunnel(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    c.innerHTML = `
      <div class="chart-card">
        <div class="chart-title" style="margin-bottom: 18px;">🔻 Funil de Conversão</div>
        ${FUNNEL_STAGES.map((stage, idx) => `
          <div class="funnel-stage">
            <div class="funnel-stage-name">${stage.name}</div>
            <div class="funnel-bar-wrap">
              <div class="funnel-bar-fill"
                   style="width: ${stage.pct}%; background: ${stage.color}; transition-delay: ${idx * 0.1}s;">
                ${stage.pct >= 10 ? stage.pct + '%' : ''}
              </div>
            </div>
            <div class="funnel-count">${stage.count.toLocaleString('pt-BR')}</div>
            <div class="funnel-pct">${stage.pct}%</div>
          </div>
        `).join('')}
      </div>
    `;

    // Animate funnel bars
    setTimeout(() => {
      document.querySelectorAll('.funnel-bar-fill').forEach(bar => {
        bar.style.width = bar.style.width; // trigger reflow
      });
    }, 100);
  }

  function renderTopProducts(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    c.innerHTML = `
      <div class="chart-card">
        <div class="chart-title" style="margin-bottom: 16px;">🏆 Top 5 Produtos por Receita</div>
        ${TOP_PRODUCTS.map(p => `
          <div style="display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border);"
               onmouseover="this.style.background='var(--bg-card-hover)'"
               onmouseout="this.style.background=''">
            <span style="font-size: 1.1rem; width: 28px; text-align: center;">${p.badge}</span>
            <div style="flex: 1;">
              <div style="font-size: 0.82rem; font-weight: 600;">${p.name}</div>
              <div style="font-size: 0.7rem; color: var(--text-muted);">${p.deals} deals</div>
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--accent-green);">${p.revenue}</div>
          </div>
        `).join('')}
        <button onclick="showToast('info','Export PDF','Gerando relatório em PDF... (simulado)',3000)"
          style="width:100%; margin-top:14px; padding:9px; background: rgba(108,99,255,0.1); border: 1px solid rgba(108,99,255,0.3); border-radius: var(--radius-sm); color: var(--accent-purple); font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: var(--font-main);"
          onmouseover="this.style.background='rgba(108,99,255,0.2)'"
          onmouseout="this.style.background='rgba(108,99,255,0.1)'"
        >
          📄 Exportar Relatório PDF
        </button>
      </div>
    `;
  }

  return { renderBarChart, renderFunnel, renderTopProducts };
})();

/* ─── SERVER UPGRADE ────────────────────────────────────────── */
const ServerUpgrade = (() => {
  async function enhancedLogin(email, code, timeout = 20000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
        signal: controller.signal
      });
      clearTimeout(timer);
      return await res.json();
    } catch (err) {
      clearTimeout(timer);
      if (err.name === 'AbortError') {
        return { error: 'Timeout — servidor pode estar aquecendo. Tente novamente em 30s.' };
      }
      return { error: err.message };
    }
  }

  return { enhancedLogin };
})();

/* ─── PWA SUPPORT ────────────────────────────────────────────── */
const PWAManager = (() => {
  let deferredPrompt = null;

  function init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      showInstallBanner();
    });
  }

  function showInstallBanner() {
    const existing = document.getElementById('pwa-install-banner');
    if (existing) return;

    const banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.className = 'pwa-install-banner';
    banner.innerHTML = `
      <div class="pwa-banner-icon">⬡</div>
      <div class="pwa-banner-text">
        <span class="pwa-banner-title">Instalar Vertice 8X</span>
        <span class="pwa-banner-sub">Acesse como app nativo</span>
      </div>
      <button class="pwa-install-btn" onclick="PWAManagerPub.install()">Instalar</button>
      <button onclick="document.getElementById('pwa-install-banner').remove()"
        style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.8rem;padding:4px;">✕</button>
    `;
    document.body.appendChild(banner);
  }

  async function install() {
    if (!deferredPrompt) {
      showToast('info', 'PWA', 'Abra no Chrome/Edge e use "Adicionar à tela inicial"', 4000);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('success', 'App Instalado! 🎉', 'Vertice 8X agora está disponível como app.', 4000);
    }
    deferredPrompt = null;
    document.getElementById('pwa-install-banner')?.remove();
  }

  return { init, install };
})();

window.PWAManagerPub = PWAManager;

/* ─── MASTER INIT ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all improvements
  PWAManager.init();

  // Patch switchTab to update breadcrumb
  const origSwitchTab = window.switchTab;
  if (typeof origSwitchTab === 'function') {
    window.switchTab = function(tabId) {
      origSwitchTab(tabId);
      Breadcrumb.render(tabId);

      // Inject improvements per tab
      setTimeout(() => {
        injectTabImprovements(tabId);
      }, 150);
    };
  }

  // Show welcome toast
  setTimeout(() => {
    showToast('success', '🚀 Vertice 8X Melhorias Ativas!', '6 frentes de upgrade aplicadas com sucesso.', 5000);
  }, 1000);

  // Initial breadcrumb
  Breadcrumb.render('dashboard');

  // Inject initial improvements
  injectTabImprovements('dashboard');

  // Check server warmup
  ServerWarmup.init(document.querySelector('.hero'));

  console.log('%c🚀 VERTICE 8X — IMPROVEMENTS v2.0', 'font-size:18px; font-weight:900; color:#6C63FF;');
  console.log('%c6 Frentes Sênior Ativas | Cold Start ✓ | Dashboard ✓ | Pipeline ✓ | WhatsApp ✓ | Analytics ✓ | UX Global ✓', 'font-size:12px; color:#00D4FF;');
});

function injectTabImprovements(tabId) {
  const pane = document.getElementById(`pane-${tabId}`);
  if (!pane) return;

  if (tabId === 'dashboard') {
    // Inject KPI grid upgrade
    let kpiTarget = document.getElementById('v8x-kpi-target');
    if (!kpiTarget) {
      kpiTarget = document.createElement('div');
      kpiTarget.id = 'v8x-kpi-target';
      const heroSection = pane.querySelector('.hero');
      if (heroSection) {
        heroSection.insertAdjacentElement('afterend', kpiTarget);
      }
    }
    DashboardUpgrade.renderKPIs('v8x-kpi-target');

    // Activity feed
    let feedTarget = document.getElementById('v8x-feed-target');
    if (!feedTarget) {
      feedTarget = document.createElement('div');
      feedTarget.id = 'v8x-feed-target';
      feedTarget.style.cssText = 'padding: 0 40px 24px; max-width: 1300px; margin: 0 auto;';
      const leaderboard = pane.querySelector('#dashboard-leaderboard');
      if (leaderboard && leaderboard.parentNode) {
        leaderboard.parentNode.insertBefore(feedTarget, leaderboard.parentNode.firstChild);
      }
    }
    DashboardUpgrade.renderActivityFeed('v8x-feed-target');

    // Quick actions
    let qaTarget = document.getElementById('v8x-qa-target');
    if (!qaTarget) {
      qaTarget = document.createElement('div');
      qaTarget.id = 'v8x-qa-target';
      qaTarget.style.cssText = 'padding: 0 40px 8px; max-width: 1300px; margin: 0 auto;';
      if (feedTarget.nextSibling) {
        feedTarget.parentNode.insertBefore(qaTarget, feedTarget.nextSibling);
      }
    }
    DashboardUpgrade.renderQuickActions('v8x-qa-target');
  }

  if (tabId === 'demoday') {
    // WhatsApp-style contact tags in demo day grid
    let wtarget = document.getElementById('v8x-wa-target');
    if (!wtarget) {
      wtarget = document.createElement('div');
      wtarget.id = 'v8x-wa-target';
      wtarget.style.cssText = 'padding: 24px 40px; max-width: 1300px; margin: 0 auto;';
      const dg = pane.querySelector('#demoday-presentations-grid');
      if (dg) dg.parentNode.insertBefore(wtarget, dg);
    }
    WhatsAppUpgrade.render('v8x-wa-target');
  }

  if (tabId === 'synthesis') {
    // Analytics charts in synthesis tab
    let analyticsTarget = document.getElementById('v8x-analytics-target');
    if (!analyticsTarget) {
      analyticsTarget = document.createElement('div');
      analyticsTarget.id = 'v8x-analytics-target';
      analyticsTarget.style.cssText = 'padding: 24px 40px; max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;';
      const evalSection = pane.querySelector('#synthesis-evaluators-grid');
      if (evalSection) evalSection.parentNode.insertBefore(analyticsTarget, evalSection);
    }

    const chartA = document.createElement('div');
    chartA.id = 'v8x-bar-chart';
    const chartB = document.createElement('div');
    chartB.id = 'v8x-funnel-chart';
    const chartC = document.createElement('div');
    chartC.id = 'v8x-top-products';

    if (!analyticsTarget.hasChildNodes()) {
      analyticsTarget.appendChild(chartA);
      analyticsTarget.appendChild(chartB);
      analyticsTarget.appendChild(chartC);
    }

    AnalyticsUpgrade.renderBarChart('v8x-bar-chart');
    AnalyticsUpgrade.renderFunnel('v8x-funnel-chart');
    AnalyticsUpgrade.renderTopProducts('v8x-top-products');
  }

  if (tabId === 'sprint') {
    // Pipeline kanban in sprint tab
    let kanbanTarget = document.getElementById('v8x-kanban-target');
    if (!kanbanTarget) {
      kanbanTarget = document.createElement('div');
      kanbanTarget.id = 'v8x-kanban-target';
      kanbanTarget.style.cssText = 'padding: 0 40px 24px; max-width: 1300px; margin: 0 auto;';
      const sprintSection = pane.querySelector('.sprint-controls-bar');
      if (sprintSection) {
        sprintSection.parentNode.insertBefore(kanbanTarget, sprintSection.nextSibling);
      }
    }
    PipelineUpgrade.render('v8x-kanban-target');
  }

  // Trigger page transition animation
  pane.classList.add('page-transition-enter');
  pane.addEventListener('animationend', () => {
    pane.classList.remove('page-transition-enter');
  }, { once: true });
}
