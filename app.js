/* ============================================================
   VERTICE HACKATHON 3.0 — JavaScript Engine
   ============================================================ */

// ─── DATA ──────────────────────────────────────────────────
const TEAMS = [
  {
    id: 'alpha',
    name: 'Alpha Strike',
    sector: 'UI/UX Design',
    sectorKey: 'ui',
    desc: 'Especialistas em transformar complexidade em experiências memoráveis',
    score: 9240,
    color: '#FF6B9D',
    agents: [
      { name: 'Aria Fonts', role: 'Design Lead', emoji: '🎨' },
      { name: 'Luca Visuals', role: 'Motion Designer', emoji: '✨' },
      { name: 'Nova Sketch', role: 'UX Researcher', emoji: '🔬' },
      { name: 'Pixel Chen', role: 'UI Architect', emoji: '🏗️' },
      { name: 'Sage Wireframe', role: 'Prototyper', emoji: '⚡' },
    ]
  },
  {
    id: 'beta',
    name: 'Beta Core',
    sector: 'Programação',
    sectorKey: 'dev',
    desc: 'Arquitetos de sistemas críticos com foco em performance extrema',
    score: 8870,
    color: '#00D4FF',
    agents: [
      { name: 'Apex Runtime', role: 'Backend Lead', emoji: '⚙️' },
      { name: 'Cipher Stack', role: 'Security Specialist', emoji: '🔐' },
      { name: 'Delta Query', role: 'Database Architect', emoji: '🗄️' },
      { name: 'Echo API', role: 'API Designer', emoji: '🔌' },
      { name: 'Flux Dev', role: 'Frontend Lead', emoji: '💻' },
    ]
  },
  {
    id: 'gamma',
    name: 'Gamma Flow',
    sector: 'Métodos Ágeis',
    sectorKey: 'agile',
    desc: 'Mestres em cadência de entregas e otimização de processos ágeis',
    score: 8550,
    color: '#FFB347',
    agents: [
      { name: 'Sprint Kai', role: 'Scrum Master', emoji: '🔄' },
      { name: 'Retro Lane', role: 'Agile Coach', emoji: '🏆' },
      { name: 'Kanban Jo', role: 'Flow Manager', emoji: '📋' },
      { name: 'Velocity Rex', role: 'Metrics Analyst', emoji: '📊' },
      { name: 'Epic Sage', role: 'Product Owner', emoji: '🎯' },
    ]
  },
  {
    id: 'delta',
    name: 'Delta Vision',
    sector: 'Estratégia',
    sectorKey: 'strategy',
    desc: 'Pensadores sistêmicos que conectam visão de negócio ao produto',
    score: 9580,
    color: '#00FFB2',
    agents: [
      { name: 'Atlas North', role: 'Chief Strategist', emoji: '🌐' },
      { name: 'Compass Ray', role: 'Market Analyst', emoji: '📈' },
      { name: 'Horizon Zoe', role: 'Product Visionary', emoji: '🔭' },
      { name: 'Prism Dale', role: 'OKR Specialist', emoji: '🎖️' },
      { name: 'Zenith Max', role: 'Growth Lead', emoji: '🚀' },
    ]
  },
  {
    id: 'omega',
    name: 'Omega Nexus',
    sector: 'Full-Stack',
    sectorKey: 'full',
    desc: 'Time multidisciplinar integrando todas as especialidades no Vertice 3.0',
    score: 8120,
    color: '#6C63FF',
    agents: [
      { name: 'Nexus Prime', role: 'Tech Lead', emoji: '👑' },
      { name: 'Matrix Eve', role: 'System Integrator', emoji: '🔗' },
      { name: 'Helix Jin', role: 'DevOps Engineer', emoji: '🛠️' },
      { name: 'Quartz Sam', role: 'QA Automation', emoji: '🧪' },
      { name: 'Vector Nova', role: 'AI Specialist', emoji: '🤖' },
    ]
  }
];

const SECTOR_DETAILS = {
  ui: {
    icon: '🎨',
    name: 'UI / UX Design',
    desc: 'Criar a interface do Vertice 3.0 que defina o padrão de experiência para os próximos 3 anos. O time deve entregar um design system completo, protótipos interativos e documentação de UX.',
    deliverables: [
      { name: 'Design System v3.0', status: 'done' },
      { name: 'Prototipação interativa', status: 'done' },
      { name: 'UX Research Report', status: 'done' },
      { name: 'Motion Design Guidelines', status: 'wip' },
      { name: 'Acessibilidade WCAG 2.1 AAA', status: 'wip' },
      { name: 'Mobile-first components', status: 'pending' },
    ]
  },
  dev: {
    icon: '⚙️',
    name: 'Programação',
    desc: 'Arquitetura técnica de alta performance para o Vertice 3.0. Stack moderno, APIs RESTful e GraphQL, microsserviços e segurança de nível enterprise.',
    deliverables: [
      { name: 'Arquitetura de microsserviços', status: 'done' },
      { name: 'API Gateway v3', status: 'done' },
      { name: 'Sistema de autenticação OAuth2', status: 'wip' },
      { name: 'CI/CD Pipeline completo', status: 'wip' },
      { name: 'Testes E2E automatizados', status: 'pending' },
      { name: 'Documentação técnica', status: 'pending' },
    ]
  },
  agile: {
    icon: '🔄',
    name: 'Métodos Ágeis',
    desc: 'Modelar o framework de desenvolvimento que guiará o Vertice 3.0 do lançamento à escala. Incluindo cerimônias, métricas de saúde e cultura de entrega contínua.',
    deliverables: [
      { name: 'Framework ágil customizado', status: 'done' },
      { name: 'Definition of Done v3', status: 'done' },
      { name: 'OKRs e KPIs mapeados', status: 'wip' },
      { name: 'Playbook de sprints', status: 'pending' },
      { name: 'Métricas de performance', status: 'pending' },
      { name: 'Guia de retrospectivas', status: 'pending' },
    ]
  },
  strategy: {
    icon: '🏆',
    name: 'Estratégia',
    desc: 'Definir o posicionamento, roadmap e visão de 18 meses para o Vertice 3.0. Análise competitiva, proposta de valor e plano de go-to-market.',
    deliverables: [
      { name: 'Análise competitiva', status: 'done' },
      { name: 'Roadmap 18 meses', status: 'done' },
      { name: 'Proposta de valor v3', status: 'done' },
      { name: 'Plano de go-to-market', status: 'done' },
      { name: 'Business case financeiro', status: 'wip' },
      { name: 'Risk assessment', status: 'wip' },
    ]
  }
};

// ─── PARTICLES ──────────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COLORS = ['#6C63FF', '#00D4FF', '#FF6B9D', '#FFB347', '#00FFB2'];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    // Draw connections
    ctx.globalAlpha = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = (1 - dist / 120) * 0.08;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ─── COUNTER ANIMATION ──────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const suffix = target === 1 ? '.0' : '';
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
        el.textContent = target + suffix;
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  });
}

// ─── COUNTDOWN ──────────────────────────────────────────────
function initCountdown() {
  const end = new Date();
  end.setHours(end.getHours() + 47);
  end.setMinutes(end.getMinutes() + 59);

  function update() {
    const now = new Date();
    const diff = Math.max(0, end - now);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(s).padStart(2, '0');
  }
  setInterval(update, 1000);
  update();
}

// ─── RENDER TEAMS ───────────────────────────────────────────
function renderTeams() {
  const container = document.getElementById('teams-list');
  container.innerHTML = '';

  TEAMS.forEach((team, idx) => {
    const row = document.createElement('div');
    row.className = 'team-row';
    row.style.animationDelay = `${idx * 0.1}s`;

    const agentsHTML = team.agents.map(a => `
      <div class="agent-card">
        <div class="agent-avatar" style="background: ${team.color}22; border: 1px solid ${team.color}44;">
          ${a.emoji}
        </div>
        <div class="agent-info">
          <span class="agent-name">${a.name}</span>
          <span class="agent-role">${a.role}</span>
        </div>
        <div class="agent-status"></div>
      </div>
    `).join('');

    row.innerHTML = `
      <div class="team-header">
        <div class="team-rank">#${idx + 1}</div>
        <div class="team-info">
          <h3>${team.name}</h3>
          <span>${team.desc}</span>
        </div>
        <span class="team-sector-badge ${team.sectorKey}">${team.sector}</span>
      </div>
      <div class="agents-grid">${agentsHTML}</div>
    `;
    container.appendChild(row);
  });
}

// ─── RENDER LEADERBOARD ─────────────────────────────────────
function renderLeaderboard() {
  const sorted = [...TEAMS].sort((a, b) => b.score - a.score);
  const maxScore = sorted[0].score;
  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

  const container = document.getElementById('leaderboard');
  container.innerHTML = '';

  sorted.forEach((team, idx) => {
    const pct = Math.round((team.score / maxScore) * 100);
    const row = document.createElement('div');
    row.className = 'lb-row';
    row.innerHTML = `
      <div class="lb-medal">${medals[idx]}</div>
      <div class="lb-team-name">${team.name}</div>
      <div class="lb-sector">${team.sector}</div>
      <div class="lb-bar-wrap">
        <div class="lb-bar" style="width: 0%; background: ${team.color}; --prog: ${pct}%;"></div>
      </div>
      <div class="lb-score">${team.score.toLocaleString('pt-BR')}</div>
    `;
    container.appendChild(row);

    // Animate bar after render
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const bar = row.querySelector('.lb-bar');
        bar.style.width = pct + '%';
        bar.style.transition = 'width 1.2s ease';
      });
    });
  });
}

// ─── SECTOR MODAL ───────────────────────────────────────────
function openSectorModal(key) {
  const data = SECTOR_DETAILS[key];
  if (!data) return;

  const delHTML = data.deliverables.map(d => {
    const icons = { done: '✅', wip: '🔧', pending: '⏳' };
    const labels = { done: 'Entregue', wip: 'Em progresso', pending: 'Pendente' };
    return `
      <div class="deliverable-item">
        <span class="del-check">${icons[d.status]}</span>
        <span class="del-name">${d.name}</span>
        <span class="del-status ${d.status}">${labels[d.status]}</span>
      </div>
    `;
  }).join('');

  document.getElementById('modal-content').innerHTML = `
    <span class="modal-sector-icon">${data.icon}</span>
    <h2 class="modal-sector-title">${data.name}</h2>
    <p class="modal-sector-desc">${data.desc}</p>
    <div class="modal-deliverables">
      <h4>📦 Entregáveis do Setor</h4>
      ${delHTML}
    </div>
  `;

  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ─── LAUNCH MODAL ───────────────────────────────────────────
let launched = false;
document.getElementById('btn-launch-main').addEventListener('click', () => {
  if (launched) return;
  launched = true;
  const overlay = document.getElementById('launch-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Animate score updates after launch
  setTimeout(() => {
    TEAMS.forEach(t => {
      t.score += Math.floor(Math.random() * 500 + 100);
    });
    renderLeaderboard();
  }, 3000);
});

function closeLaunch() {
  document.getElementById('launch-overlay').classList.remove('active');
  document.body.style.overflow = '';
  // Smooth scroll to teams
  document.getElementById('times').scrollIntoView({ behavior: 'smooth' });
}

// ─── SCORE LIVE TICKER ──────────────────────────────────────
function startLiveTicker() {
  setInterval(() => {
    TEAMS.forEach(t => {
      const delta = Math.floor(Math.random() * 50) - 10;
      t.score = Math.max(0, t.score + delta);
    });
    renderLeaderboard();
  }, 8000);
}

// ─── INTERSECTION OBSERVER ──────────────────────────────────
function initObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-40px' });

  document.querySelectorAll('.sector-card, .team-row, .lb-row, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ─── KEYBOARD ───────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeLaunch();
  }
});

// ─── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCountdown();
  renderTeams();
  renderLeaderboard();
  startLiveTicker();

  // Delay observer to allow renders
  setTimeout(initObserver, 100);

  // Trigger counters when hero is visible
  const heroObserver = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  }, { threshold: 0.2 });
  heroObserver.observe(document.querySelector('.hero-stats'));

  console.log('%c🚀 VERTICE HACKATHON 3.0', 'font-size: 24px; font-weight: 900; color: #6C63FF;');
  console.log('%c20 Agentes. 4 Setores. 1 Missão.', 'font-size: 14px; color: #00D4FF;');
});
