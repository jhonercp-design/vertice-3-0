/* ============================================================
   SPRINT 48H EXECUTION — JAVASCRIPT ENGINE
   ============================================================ */

const SPRINT_BLOCKS = [
  { block: 'H00–H06', title: 'Ignição & Ambiente', checkpoint: 'Mono-repo Turborepo rodando localmente para todos os 20 agentes' },
  { block: 'H06–H12', title: 'Core Components & Auth', checkpoint: 'Login JWT funcional + 20 componentes UI no Storybook' },
  { block: 'H12–H18', title: 'Módulos de Dados & Dashboard', checkpoint: 'Dashboard com dados reais do PostgreSQL e Grafana ao vivo' },
  { block: 'H18–H24', title: 'Funcionalidades Estratégicas', checkpoint: 'CRUD completo + notificações em tempo real (WebSockets)' },
  { block: 'H24–H32', title: 'Multi-tenant & Permissões', checkpoint: 'Isolamento de dados por organização + RBAC (Row-Level Security)' },
  { block: 'H32–H40', title: 'Integrações & Analytics', checkpoint: 'Product analytics ao vivo (Segment) + Webhooks + BullMQ' },
  { block: 'H40–H44', title: 'Performance & Hardening', checkpoint: 'Latência P99 < 120ms + Kubernetes HPA + Chaos testing' },
  { block: 'H44–H48', title: 'Deploy Final & Entrega', checkpoint: 'Vertice 3.0 em Produção (Vercel + Railway) + Docs OpenAPI' }
];

const TRACKS = [
  { id: 'design', name: 'Design & UX', color: '#FF6B9D', progress: 15, tasks: ['Style Dictionary export', 'Tokens Figma → CSS', 'WCAG AAA Audit'] },
  { id: 'frontend', name: 'Frontend React', color: '#C084FC', progress: 20, tasks: ['Turborepo Next.js 14', 'Layout base responsivo', 'Recharts Dashboard'] },
  { id: 'backend', name: 'Backend GraphQL', color: '#00D4FF', progress: 18, tasks: ['API Gateway REST/GraphQL', 'Prisma Schema PostgreSQL', 'JWT Auth Session'] },
  { id: 'devops', name: 'DevOps & Infra', color: '#34D399', progress: 25, tasks: ['Docker Compose Stack', 'GitHub Actions CI', 'Grafana Monitoring'] },
  { id: 'process', name: 'Processo & QA', color: '#FFB347', progress: 22, tasks: ['VerticeFlow Canvas', 'DoD 3-Tier Auditor', 'Playwright E2E Tests'] }
];

let isRunning = false;
let currentBlockIdx = 0;
let hoursPassed = 0;
let minutesPassed = 0;
let secondsPassed = 0;
let timerInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderTracks();
  renderCheckpoints();
});

function renderTracks() {
  const container = document.getElementById('sprint-tracks-grid');
  container.innerHTML = '';

  TRACKS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'strack-card';
    card.style.setProperty('--track-color', t.color);

    const taskItems = t.tasks.map((task, i) => `
      <div class="strack-task-item ${i === 0 ? 'done' : ''}">
        <span>${i === 0 ? '✓' : '•'}</span>
        <span>${task}</span>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="strack-header">
        <span class="strack-name" style="color: ${t.color};">${t.name}</span>
        <span class="strack-pct" id="tpct-${t.id}" style="color: ${t.color};">${t.progress}%</span>
      </div>
      <div class="strack-bar-bg">
        <div class="strack-bar-fill" id="tbar-${t.id}" style="width: ${t.progress}%; background: ${t.color};"></div>
      </div>
      <div class="strack-task-list">${taskItems}</div>
    `;
    container.appendChild(card);
  });
}

function renderCheckpoints() {
  const container = document.getElementById('checkpoints-list');
  container.innerHTML = '';

  SPRINT_BLOCKS.forEach((b, i) => {
    const item = document.createElement('div');
    const isPassed = i < currentBlockIdx;
    const isActive = i === currentBlockIdx;

    item.className = `cp-item ${isPassed ? 'passed' : isActive ? 'active' : ''}`;
    item.innerHTML = `
      <div>
        <strong style="color: ${isPassed ? 'var(--accent-green)' : isActive ? 'var(--accent-orange)' : 'var(--text-muted)'};">
          ${b.block} — ${b.title}
        </strong>
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-top:2px;">${b.checkpoint}</div>
      </div>
      <span style="font-size:0.85rem; font-weight:700;">
        ${isPassed ? '✅ Passed' : isActive ? '⚙️ Running' : '⏳ Pending'}
      </span>
    `;
    container.appendChild(item);
  });
}

function toggleSprintExecution() {
  const btn = document.getElementById('btn-toggle-sprint');
  if (!isRunning) {
    isRunning = true;
    btn.textContent = '⏸ Pausar Execução';
    btn.style.background = 'linear-gradient(135deg, #FFB347, #FF6B9D)';
    logTerminal('info', `[START] Sprint 48H Fullstack iniciado. Bloco ${currentBlockIdx + 1} ativo.`);
    startTimer();
  } else {
    isRunning = false;
    btn.textContent = '▶ Continuar Execução';
    btn.style.background = 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))';
    logTerminal('warn', `[PAUSE] Sprint pausado pelo operador.`);
    clearInterval(timerInterval);
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    secondsPassed += 5;
    if (secondsPassed >= 60) {
      secondsPassed = 0;
      minutesPassed += 1;
    }
    if (minutesPassed >= 60) {
      minutesPassed = 0;
      hoursPassed += 1;
    }

    updateClockDisplay();
    simulateSprintProgress();
  }, 1000);
}

function updateClockDisplay() {
  const h = String(hoursPassed).padStart(2, '0');
  const m = String(minutesPassed).padStart(2, '0');
  const s = String(secondsPassed).padStart(2, '0');
  document.getElementById('sprint-clock').textContent = `H${h}:${m}:${s}`;
}

function simulateSprintProgress() {
  // Update track progresses
  TRACKS.forEach(t => {
    if (t.progress < 100) {
      t.progress = Math.min(100, t.progress + Math.floor(Math.random() * 3) + 1);
      document.getElementById(`tpct-${t.id}`).textContent = t.progress + '%';
      document.getElementById(`tbar-${t.id}`).style.width = t.progress + '%';
    }
  });

  // Random terminal log
  const agentLogs = [
    '[Aurora Sky] commit "feat(ui): componentes atômicos exportados para tokens.css"',
    '[Cipher Dax] API GraphQL Federation respondendo em http://localhost:7843/graphql',
    '[Atlas North] OKRs trimestrais alinhados ao backlog do Linear com 100% de cobertura',
    '[Cadence Cruz] Definition of Done 3-Tier validada para a Sprint 1',
    '[Matrix Nix] Data mesh event hub conectado ao Redis Cluster'
  ];
  if (Math.random() > 0.4) {
    const randomLog = agentLogs[Math.floor(Math.random() * agentLogs.length)];
    logTerminal('agent', randomLog);
  }
}

function fastForwardSprint() {
  if (currentBlockIdx < SPRINT_BLOCKS.length - 1) {
    currentBlockIdx++;
    hoursPassed += 6;
    const b = SPRINT_BLOCKS[currentBlockIdx];
    document.getElementById('sprint-current-block').textContent = `BLOCO ${currentBlockIdx + 1} — ${b.block}`;
    logTerminal('success', `[CHECKPOINT PASSED] ${SPRINT_BLOCKS[currentBlockIdx - 1].title} concluído com sucesso!`);
    logTerminal('info', `[BLOCK ${currentBlockIdx + 1}] Iniciando ${b.title}...`);

    TRACKS.forEach(t => {
      t.progress = Math.min(100, t.progress + 15);
    });

    renderTracks();
    renderCheckpoints();
    updateClockDisplay();
  } else {
    logTerminal('success', '🏆 [COMPLETED] Sprint 48H Fullstack 100% executado! Vertice 3.0 em Produção!');
    alert('🎉 Parabéns! Todos os 8 blocos da Sprint de 48 Horas foram executados com sucesso!');
  }
}

function logTerminal(type, text) {
  const terminal = document.getElementById('terminal-logs');
  const line = document.createElement('div');
  line.className = `log-line ${type}`;
  const time = new Date().toLocaleTimeString('pt-BR');
  line.textContent = `[${time}] ${text}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}
