/* ============================================================
   DEMO DAY — JavaScript Engine
   ============================================================ */

// ─── DADOS DAS APRESENTAÇÕES ────────────────────────────────
const PRESENTATIONS = [
  {
    teamId: 'alpha',
    teamName: 'Alpha Strike',
    sector: 'UI/UX Design',
    sectorKey: 'ui',
    color: '#FF6B9D',
    icon: '🎨',
    headline: 'Vertice 3.0: Interface que pensa junto com o usuário',
    summary: 'Redesign completo da plataforma com design system responsivo, dark-mode nativo, micro-animações contextuais e acessibilidade AAA. Redução de 60% no tempo de onboarding.',
    score: 9240,
    votes: 0,
    metrics: [
      { val: '97', label: 'NPS Score' },
      { val: '2.1s', label: 'Load Time' },
      { val: '60%', label: 'Menos Atrito' },
      { val: 'AAA', label: 'Acessibilidade' },
    ],
    presentation: {
      vision: 'Criar a interface mais intuitiva do mercado B2B enterprise. O Vertice 3.0 deve sentir-se como uma extensão do pensamento do usuário — não uma ferramenta.',
      features: [
        'Design system com 240+ componentes atômicos documentados',
        'Motion design system com 18 animações contextuais',
        'Dark/light mode com detecção de preferência do sistema',
        'Figma tokens sincronizados com o código via Style Dictionary',
        'Testes de usabilidade com 50+ usuários em 3 perfis distintos',
        'Guia de voz e tom para toda a microcopy do sistema',
      ],
      stack: ['Figma', 'Storybook', 'CSS Variables', 'Framer Motion', 'WCAG 2.1', 'Style Dictionary'],
      quote: '"Cada pixel tem uma razão de existir. Cada animação tem uma intenção. O Vertice 3.0 é design com propósito." — Aria Fonts, Design Lead'
    }
  },
  {
    teamId: 'beta',
    teamName: 'Beta Core',
    sector: 'Programação',
    sectorKey: 'dev',
    color: '#00D4FF',
    icon: '⚙️',
    headline: 'Arquitetura de microsserviços escalável para 10M usuários',
    summary: 'Stack moderna com Node.js, GraphQL Federation, Redis caching e Kubernetes. Redução de 70% na latência, zero downtime deployments e 99.99% SLA garantido.',
    score: 8870,
    votes: 0,
    metrics: [
      { val: '12ms', label: 'P99 Latência' },
      { val: '99.99%', label: 'Uptime SLA' },
      { val: '10M', label: 'Usuários Suportados' },
      { val: '70%', label: 'Menos Custo Infra' },
    ],
    presentation: {
      vision: 'Construir a espinha dorsal técnica que vai sustentar o crescimento do Vertice pelos próximos 5 anos. Performance, segurança e escalabilidade sem compromissos.',
      features: [
        'API Gateway com rate limiting, circuit breaking e autenticação JWT',
        'GraphQL Federation unificando 8 microsserviços independentes',
        'Redis Cluster para cache distribuído com TTL inteligente',
        'Kubernetes HPA com auto-scaling baseado em métricas customizadas',
        'CI/CD com Blue-Green deployment e rollback automático em < 30s',
        'Observabilidade completa: OpenTelemetry, Grafana e alertas Slack',
      ],
      stack: ['Node.js', 'GraphQL', 'Redis', 'Kubernetes', 'PostgreSQL', 'OpenTelemetry', 'Terraform'],
      quote: '"Escalabilidade não é um add-on. É o fundamento. O Vertice 3.0 nasce preparado para o próximo nível." — Apex Runtime, Backend Lead'
    }
  },
  {
    teamId: 'gamma',
    teamName: 'Gamma Flow',
    sector: 'Métodos Ágeis',
    sectorKey: 'agile',
    color: '#FFB347',
    icon: '🔄',
    headline: 'VerticeFlow: O framework ágil feito para times de alto impacto',
    summary: 'Framework híbrido Scrum + Kanban adaptado à realidade do Vertice: sprints de 2 semanas, Definition of Done em 3 camadas, OKRs trimestrais e rituais de alta energia.',
    score: 8550,
    votes: 0,
    metrics: [
      { val: '94%', label: 'Predictability' },
      { val: '2x', label: 'Velocity Gain' },
      { val: '0', label: 'Sprints Falhados' },
      { val: '4h', label: 'Cerimônias/Sprint' },
    ],
    presentation: {
      vision: 'Criar um sistema de trabalho que torne o time invencível — previsível em entrega, ágil em resposta e energizado em cultura.',
      features: [
        'VerticeFlow Canvas: quadro único de visibilidade para todos os níveis',
        'Definition of Done em 3 camadas: Dev, QA e Stakeholder',
        'Sprint Health Score automático com alertas de bloqueios',
        'Retrospectivas mensais com Energia, Aprendizado e Confiança',
        'OKRs trimestrais linkados a épicos e histórias no backlog',
        'War Room semanal de 15 min para desimpedimentos executivos',
      ],
      stack: ['Jira', 'Confluence', 'Miro', 'Notion', 'Slack Bots', 'Google Data Studio'],
      quote: '"A melhor metodologia é a que o time abraça. O VerticeFlow foi co-criado com quem vai usá-lo." — Sprint Kai, Scrum Master'
    }
  },
  {
    teamId: 'delta',
    teamName: 'Delta Vision',
    sector: 'Estratégia',
    sectorKey: 'strategy',
    color: '#00FFB2',
    icon: '🏆',
    headline: 'Vertice 3.0: Da plataforma ao ecossistema. Crescimento de 3x em 18 meses.',
    summary: 'Posicionamento como plataforma central de operações para PMEs do eixo Sul-Sudeste. Roadmap de produto focado em retenção, expansão de ARR e lançamento de marketplace em Q3.',
    score: 9580,
    votes: 0,
    metrics: [
      { val: '3x', label: 'ARR Target' },
      { val: '18', label: 'Meses Roadmap' },
      { val: 'R$8M', label: 'TAM Endereçado' },
      { val: 'Q3', label: 'Marketplace Launch' },
    ],
    presentation: {
      vision: 'O Vertice 3.0 não é um upgrade — é uma mudança de categoria. Migramos de software para ecossistema, de usuários para parceiros, de MRR para ARR expansionista.',
      features: [
        'Go-to-market com foco em CAC:LTV > 3:1 nos primeiros 6 meses',
        'Vertical expansion: Logística, RH e Financeiro como próximos módulos',
        'Partner marketplace com revenue share de 30% para ISVs',
        'Modelo de precificação Usage-Based + Seat-Based híbrido',
        'NRR (Net Revenue Retention) target de 120% no ano 1',
        'Programa de beta customers com 10 PMEs anchor em Q1',
      ],
      stack: ['Miro', 'Notion', 'Tableau', 'Salesforce', 'HubSpot', 'Metabase'],
      quote: '"A versão 3.0 é a primeira versão que jogamos para ganhar mercado, não só para satisfazer usuários." — Atlas North, Chief Strategist'
    }
  },
  {
    teamId: 'omega',
    teamName: 'Omega Nexus',
    sector: 'Full-Stack',
    sectorKey: 'full',
    color: '#6C63FF',
    icon: '🔗',
    headline: 'Vertice 3.0 Unificado: Uma solução. Quatro setores. Zero compromissos.',
    summary: 'Proposta integrada que une design system, arquitetura técnica, framework ágil e estratégia em um único roadmap coeso. Entrega do MVP em 6 semanas.',
    score: 8120,
    votes: 0,
    metrics: [
      { val: '6w', label: 'MVP Delivery' },
      { val: '100%', label: 'Integração' },
      { val: '4', label: 'Setores Unificados' },
      { val: '0', label: 'Silos de Equipe' },
    ],
    presentation: {
      vision: 'Os outros times resolvem partes do problema. Nós resolvemos o problema inteiro. O Vertice 3.0 não pode ter excelência técnica sem UX excelente, nem estratégia sem execução.',
      features: [
        'Integration layer conectando design tokens ao código ao backlog ao OKR',
        'Mono-repo com Design System + API + Frontend + Docs compartilhados',
        'Agile Operating Model alinhado ao roadmap estratégico trimestral',
        'FinOps framework garantindo custo por feature entregue',
        'Data mesh: cada squad dono de seus dados e métricas',
        'Chaos engineering desde o Sprint 1 para antecipação de falhas',
      ],
      stack: ['Turborepo', 'Next.js', 'tRPC', 'Prisma', 'Vercel', 'Linear', 'Segment'],
      quote: '"A versão 3.0 que o mercado vai conhecer é aquela onde design, código, processo e estratégia respiram juntos." — Nexus Prime, Tech Lead'
    }
  }
];

// ─── FEED DATA ───────────────────────────────────────────────
const FEED_MESSAGES = [
  { agent: 'Aria Fonts', team: 'Alpha Strike', color: '#FF6B9D', emoji: '🎨', msg: 'Finalizando a última revisão do Motion Design Guidelines. Adicionamos 4 novas animações de estado vazio.', attachment: 'motion-guidelines-v3.figma' },
  { agent: 'Apex Runtime', team: 'Beta Core', color: '#00D4FF', emoji: '⚙️', msg: 'Latência P99 agora em 11ms nos testes de carga com 50k req/s. Superamos a meta de 12ms! 🔥', attachment: null },
  { agent: 'Atlas North', team: 'Delta Vision', color: '#00FFB2', emoji: '🌐', msg: 'Business case validado com os 3 clientes ancora. ARR projetado de R$2.4M no ano 1.', attachment: 'business-case-final.pdf' },
  { agent: 'Sprint Kai', team: 'Gamma Flow', color: '#FFB347', emoji: '🔄', msg: 'VerticeFlow Canvas finalizado. Incluímos a camada de "Energia do Time" como métrica qualitativa semanal.', attachment: null },
  { agent: 'Nexus Prime', team: 'Omega Nexus', color: '#6C63FF', emoji: '👑', msg: 'Integration layer testada end-to-end. Design token mudado no Figma propagando até o CI/CD em 4 segundos.', attachment: 'integration-demo.mp4' },
  { agent: 'Nova Sketch', team: 'Alpha Strike', color: '#FF6B9D', emoji: '🔬', msg: 'Resultados dos testes de usabilidade: 94% de task completion rate no novo onboarding. Melhor que esperávamos!', attachment: 'ux-research-report.pdf' },
  { agent: 'Cipher Stack', team: 'Beta Core', color: '#00D4FF', emoji: '🔐', msg: 'Pen test concluído sem vulnerabilidades críticas. JWT rotation implementada com revogação em < 1s.', attachment: null },
  { agent: 'Horizon Zoe', team: 'Delta Vision', color: '#00FFB2', emoji: '🔭', msg: 'Mapeamos 3 novos verticais para expansão: Saúde, Educação e Agro. TAM total revisado para R$14M.', attachment: 'vertical-expansion.pptx' },
  { agent: 'Kanban Jo', team: 'Gamma Flow', color: '#FFB347', emoji: '📋', msg: 'Playbook de sprints formatado e enviado para revisão do PO. 47 páginas de cerimônias, checklists e templates.', attachment: 'sprint-playbook-v1.pdf' },
  { agent: 'Vector Nova', team: 'Omega Nexus', color: '#6C63FF', emoji: '🤖', msg: 'Implementamos AI-powered sprint forecasting usando histórico dos últimos 6 sprints. Acurácia de 89%.', attachment: null },
  { agent: 'Luca Visuals', team: 'Alpha Strike', color: '#FF6B9D', emoji: '✨', msg: 'Preview do Dark Mode finalizado. Todos os 240 componentes testados nos 4 temas do design system.', attachment: 'dark-mode-preview.figma' },
  { agent: 'Echo API', team: 'Beta Core', color: '#00D4FF', emoji: '🔌', msg: 'Documentação OpenAPI 3.1 gerada automaticamente para todos os 87 endpoints. Swagger UI disponível em staging.', attachment: null },
  { agent: 'Prism Dale', team: 'Delta Vision', color: '#00FFB2', emoji: '🎖️', msg: 'OKRs do Q1 definidos: 3 objetivos, 9 KRs mensuráveis, todos linkados ao backlog via Notion integration.', attachment: 'okrs-q1.notion' },
  { agent: 'Velocity Rex', team: 'Gamma Flow', color: '#FFB347', emoji: '📊', msg: 'Sprint Health Score dashboard ao vivo. Time pode ver a "saúde" do sprint em tempo real no Slack.', attachment: 'health-score-demo.gif' },
  { agent: 'Helix Jin', team: 'Omega Nexus', color: '#6C63FF', emoji: '🛠️', msg: 'Infrastructure as Code finalizado. Todo o ambiente reproduzível com um único terraform apply em < 8 minutos.', attachment: null },
];

// ─── JURY COMMENTS ───────────────────────────────────────────
const JURY = [
  { name: 'Dr. Marina Costa', emoji: '👩‍💼', role: 'CTO' },
  { name: 'Rafael Monteiro', emoji: '👨‍💻', role: 'CPO' },
  { name: 'Ana Figueiredo', emoji: '👩‍🏫', role: 'CEO' },
];

const JURY_COMMENTS = [
  { jury: 0, msg: 'O NPS de 97 do Alpha Strike é impressionante. Raramente vejo esse número em testes de usabilidade internos.' },
  { jury: 1, msg: 'A arquitetura do Beta Core está enterprise-ready. 12ms de P99 é melhor que qualquer concorrente que eu conheço.' },
  { jury: 2, msg: 'Delta Vision me surpreendeu com o business case. R$8M de TAM com CAC:LTV de 3:1 é muito sólido.' },
  { jury: 0, msg: 'Aprecio que o Gamma Flow criou algo co-criado com o time. Metodologia que ninguém vai seguir não serve.' },
  { jury: 1, msg: 'A proposta do Omega Nexus é ambiciosa e integradora. A questão é: conseguimos executar isso em 6 semanas?' },
  { jury: 2, msg: 'Estou inclinada para o Delta Vision. A visão de ecossistema resolve o problema de longo prazo que temos.' },
  { jury: 0, msg: 'O Alpha Strike tem os melhores dados de usuário. Mas implementação sem a visão estratégica do Delta é incompleta.' },
  { jury: 1, msg: 'Concordo com a Marina. E o Beta Core resolve exatamente o que travou a versão 2.0: performance e escala.' },
  { jury: 2, msg: 'Vou aguardar a votação. Mas já tenho minha escolha. Alguém mais quer votar antes de eu revelar?' },
];

// ─── STATE ───────────────────────────────────────────────────
let selectedVote = null;
let voteSubmitted = false;
let voteCounts = { alpha: 0, beta: 0, gamma: 0, delta: 12, omega: 0 }; // Delta liderando
let totalVotes = 12;
let feedIndex = 0;
let juryCommentIndex = 0;

// ─── JURY SCORES ─────────────────────────────────────────────
const juryScores = {
  alpha: { tech: 72, innovation: 95, delivery: 88, impact: 80 },
  beta:  { tech: 98, innovation: 78, delivery: 91, impact: 82 },
  gamma: { tech: 65, innovation: 88, delivery: 94, impact: 79 },
  delta: { tech: 76, innovation: 96, delivery: 89, impact: 98 },
  omega: { tech: 85, innovation: 90, delivery: 72, impact: 85 },
};

function getOverallJuryScore(id) {
  const s = juryScores[id];
  return Math.round((s.tech + s.innovation + s.delivery + s.impact) / 4);
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderPresentations();
  renderVotingArea();
  renderJuryScores();
  startFeedTicker();
  startJuryComments();
  updateStatusBar();
  startStatusTicker();

  // Show reveal button after 20 seconds
  setTimeout(() => {
    document.getElementById('btn-reveal-winner').style.display = 'flex';
  }, 20000);
});

// ─── STATUS BAR ──────────────────────────────────────────────
function updateStatusBar() {
  document.getElementById('votes-cast').textContent = totalVotes;
  // Find leader by votes
  const entries = Object.entries(voteCounts);
  const leader = entries.sort((a,b) => b[1]-a[1])[0];
  const leaderTeam = PRESENTATIONS.find(p => p.teamId === leader[0]);
  document.getElementById('jury-score').textContent = leaderTeam ? leaderTeam.teamName : '—';
}

function startStatusTicker() {
  setInterval(() => {
    // Random vote bump
    const teams = ['alpha', 'beta', 'gamma', 'delta', 'omega'];
    const weights = [15, 12, 10, 40, 8]; // Delta is winning
    const r = Math.random() * 85;
    let cum = 0;
    for (let i = 0; i < teams.length; i++) {
      cum += weights[i];
      if (r < cum) {
        voteCounts[teams[i]]++;
        totalVotes++;
        break;
      }
    }
    updateStatusBar();
    if (voteSubmitted) updateVotePcts();
  }, 3500);
}

// ─── PRESENTATIONS ───────────────────────────────────────────
function renderPresentations() {
  const grid = document.getElementById('presentations-grid');
  grid.innerHTML = '';

  PRESENTATIONS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pres-card';
    card.onclick = () => openPresentation(p.teamId);

    const metricsHTML = p.metrics.map(m => `
      <div class="pres-metric">
        <span class="pres-metric-val" style="color: ${p.color};">${m.val}</span>
        <span class="pres-metric-label">${m.label}</span>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="pres-card-header">
        <div class="pres-team-icon" style="background: ${p.color}18; border: 1px solid ${p.color}30;">
          ${p.icon}
        </div>
        <div class="pres-team-meta">
          <h3>${p.teamName}</h3>
          <span>${p.sector}</span>
        </div>
      </div>
      <div class="pres-card-body">
        <div class="pres-headline">${p.headline}</div>
        <div class="pres-summary">${p.summary}</div>
        <div class="pres-metrics">${metricsHTML}</div>
      </div>
      <div class="pres-card-footer">
        <div class="pres-score-badge">
          <span class="score-dot" style="background: ${p.color}; box-shadow: 0 0 6px ${p.color};"></span>
          <span style="color: ${p.color};">${p.score.toLocaleString('pt-BR')} pts</span>
        </div>
        <span class="pres-expand-btn">Ver completo →</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ─── OPEN PRESENTATION MODAL ─────────────────────────────────
function openPresentation(teamId) {
  const p = PRESENTATIONS.find(t => t.teamId === teamId);
  if (!p) return;

  const featsHTML = p.presentation.features.map(f => `<li>${f}</li>`).join('');
  const techHTML = p.presentation.stack.map(t => `<span class="pm-tech-tag">${t}</span>`).join('');

  document.getElementById('presentation-modal-content').innerHTML = `
    <div class="pm-header">
      <div class="pm-icon" style="background: ${p.color}18; border: 1px solid ${p.color}30;">${p.icon}</div>
      <div>
        <div class="pm-title">${p.teamName}</div>
        <div class="pm-sector">${p.sector} • ${p.score.toLocaleString('pt-BR')} pontos</div>
      </div>
    </div>
    <div class="pm-section">
      <div class="pm-section-title">🎯 Visão</div>
      <div class="pm-content">${p.presentation.vision}</div>
    </div>
    <div class="pm-section">
      <div class="pm-section-title">🚀 Funcionalidades entregues</div>
      <ul class="pm-feature-list">${featsHTML}</ul>
    </div>
    <div class="pm-section">
      <div class="pm-section-title">🛠 Stack tecnológico / Ferramentas</div>
      <div class="pm-tech-stack">${techHTML}</div>
    </div>
    <div class="pm-section">
      <div class="pm-section-title">💬 Quote do Time</div>
      <div class="pm-content" style="font-style:italic; border-left: 3px solid ${p.color}; padding-left:16px;">${p.presentation.quote}</div>
    </div>
  `;

  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePresentationModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ─── VOTING ──────────────────────────────────────────────────
function renderVotingArea() {
  const area = document.getElementById('voting-area');
  area.innerHTML = '';

  PRESENTATIONS.forEach(p => {
    const opt = document.createElement('div');
    opt.className = 'vote-option';
    opt.id = `vote-${p.teamId}`;
    opt.onclick = () => selectVote(p.teamId);
    opt.innerHTML = `
      <span class="vo-icon">${p.icon}</span>
      <div class="vo-team">${p.teamName}</div>
      <div class="vo-sector">${p.sector}</div>
      <div class="vo-pct" style="color: ${p.color};" id="vpct-${p.teamId}">0%</div>
    `;
    area.appendChild(opt);
  });
}

function selectVote(teamId) {
  if (voteSubmitted) return;
  selectedVote = teamId;
  document.querySelectorAll('.vote-option').forEach(el => el.classList.remove('selected'));
  document.getElementById(`vote-${teamId}`).classList.add('selected');
  document.getElementById('vote-feedback').textContent = '';
}

function submitVote() {
  if (!selectedVote) {
    document.getElementById('vote-feedback').textContent = '⚠️ Selecione um time antes de votar.';
    document.getElementById('vote-feedback').style.color = '#FFB347';
    return;
  }
  if (voteSubmitted) return;

  voteSubmitted = true;
  voteCounts[selectedVote] += 10; // Peso do voto do usuário
  totalVotes += 10;

  // Send vote to API server (async, fallback if offline)
  try {
    fetch('http://localhost:7843/api/v1/demoday/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamId: selectedVote })
    }).catch(err => console.log('API Vote offline fallback'));
  } catch (e) {}

  const btn = document.getElementById('btn-vote-submit');
  btn.disabled = true;
  btn.textContent = '✓ Voto registrado!';

  document.getElementById('vote-feedback').textContent = `🎉 Obrigado! Seu voto foi registrado para ${PRESENTATIONS.find(p => p.teamId === selectedVote).teamName}.`;
  document.getElementById('vote-feedback').style.color = 'var(--accent-green)';

  // Show percentages
  document.querySelectorAll('.vo-pct').forEach(el => el.style.display = 'block');
  updateVotePcts();

  // Show reveal button immediately
  document.getElementById('btn-reveal-winner').style.display = 'flex';
  updateStatusBar();
}

function updateVotePcts() {
  const total = Object.values(voteCounts).reduce((a,b) => a+b, 0);
  PRESENTATIONS.forEach(p => {
    const pct = total > 0 ? Math.round((voteCounts[p.teamId] / total) * 100) : 0;
    const el = document.getElementById(`vpct-${p.teamId}`);
    if (el) el.textContent = pct + '%';
  });
}

// ─── JURY SCORES ─────────────────────────────────────────────
function renderJuryScores() {
  const container = document.getElementById('jury-scores');
  container.innerHTML = '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--accent-purple);margin-bottom:8px;">Pontuação do Júri</div>';

  const sorted = [...PRESENTATIONS].sort((a,b) => getOverallJuryScore(b.teamId) - getOverallJuryScore(a.teamId));

  sorted.forEach(p => {
    const score = getOverallJuryScore(p.teamId);
    const row = document.createElement('div');
    row.className = 'jury-score-row';
    row.innerHTML = `
      <span class="jsr-name" style="color: ${p.color};">${p.teamName}</span>
      <div class="jsr-bar-wrap">
        <div class="jsr-bar" style="width: 0%; background: ${p.color};" id="jbar-${p.teamId}"></div>
      </div>
      <span class="jsr-val" style="color: ${p.color};">${score}</span>
    `;
    container.appendChild(row);

    setTimeout(() => {
      const bar = document.getElementById(`jbar-${p.teamId}`);
      if (bar) bar.style.width = score + '%';
    }, 300);
  });
}

// ─── LIVE FEED ───────────────────────────────────────────────
function startFeedTicker() {
  // Add first 4 items immediately
  for (let i = 0; i < 4; i++) addFeedItem(i);
  feedIndex = 4;

  setInterval(() => {
    if (feedIndex < FEED_MESSAGES.length) {
      addFeedItem(feedIndex);
      feedIndex++;
    } else {
      // Loop with varied messages
      const randomIdx = Math.floor(Math.random() * FEED_MESSAGES.length);
      addFeedItemVariant(randomIdx);
    }
  }, 5000);
}

function addFeedItem(idx) {
  const feed = document.getElementById('live-feed');
  const m = FEED_MESSAGES[idx];
  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const item = document.createElement('div');
  item.className = 'feed-item';
  item.innerHTML = `
    <div class="feed-avatar" style="background: ${m.color}18; border-color: ${m.color}40;">
      ${m.emoji}
    </div>
    <div class="feed-body">
      <div class="feed-meta">
        <span class="feed-agent-name" style="color: ${m.color};">${m.agent}</span>
        <span class="feed-team-tag">${m.team}</span>
        <span class="feed-time">${timeStr}</span>
      </div>
      <div class="feed-message">${m.msg}</div>
      ${m.attachment ? `<div class="feed-attachment">${m.attachment}</div>` : ''}
    </div>
  `;

  feed.insertBefore(item, feed.firstChild);

  // Keep max 12 items
  while (feed.children.length > 12) {
    feed.removeChild(feed.lastChild);
  }

  // Auto-scroll to top
  feed.scrollTop = 0;
}

function addFeedItemVariant(idx) {
  const variantMsgs = [
    'Atualizando documentação do módulo principal...',
    'Revisão de código concluída. 0 issues críticos encontrados.',
    'Commit feito: "feat: implementa validação final"',
    'Testando integração com o ambiente de staging...',
    'Métricas de performance validadas e documentadas.',
  ];
  const m = { ...FEED_MESSAGES[idx], msg: variantMsgs[Math.floor(Math.random() * variantMsgs.length)], attachment: null };
  const feed = document.getElementById('live-feed');
  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const item = document.createElement('div');
  item.className = 'feed-item';
  item.innerHTML = `
    <div class="feed-avatar" style="background: ${m.color}18; border-color: ${m.color}40;">${m.emoji}</div>
    <div class="feed-body">
      <div class="feed-meta">
        <span class="feed-agent-name" style="color: ${m.color};">${m.agent}</span>
        <span class="feed-team-tag">${m.team}</span>
        <span class="feed-time">${timeStr}</span>
      </div>
      <div class="feed-message">${m.msg}</div>
    </div>
  `;
  feed.insertBefore(item, feed.firstChild);
  while (feed.children.length > 12) feed.removeChild(feed.lastChild);
}

// ─── JURY COMMENTS ───────────────────────────────────────────
function startJuryComments() {
  addJuryComment(0);
  juryCommentIndex = 1;

  setInterval(() => {
    if (juryCommentIndex < JURY_COMMENTS.length) {
      addJuryComment(juryCommentIndex);
      juryCommentIndex++;
    }
  }, 7000);
}

function addJuryComment(idx) {
  const chat = document.getElementById('jury-chat');
  const c = JURY_COMMENTS[idx];
  const juror = JURY[c.jury];

  const msg = document.createElement('div');
  msg.className = 'jc-msg';
  msg.innerHTML = `
    <div class="jc-avatar">${juror.emoji}</div>
    <div class="jc-bubble">
      <span class="jc-name">${juror.name} · ${juror.role}</span>
      <span class="jc-text">${c.msg}</span>
    </div>
  `;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// ─── WINNER REVEAL ───────────────────────────────────────────
function revealWinner() {
  // Delta Vision wins (highest jury + community votes combined)
  const winner = PRESENTATIONS.find(p => p.teamId === 'delta');

  const section = document.getElementById('resultado');
  section.style.display = 'block';

  const agentsHTML = TEAMS.find(t => t.id === 'delta').agents.map(a => `
    <div class="wa-chip">
      <span>${a.emoji}</span>
      <span>${a.name}</span>
      <span style="color:var(--text-muted); font-size:0.68rem;">${a.role}</span>
    </div>
  `).join('');

  document.getElementById('winner-stage').innerHTML = `
    <div class="winner-crown">👑</div>
    <div class="winner-subtitle">🏆 Vencedor do Vertice Hackathon 3.0</div>
    <h2 class="winner-name"><span class="gradient-text" style="background: linear-gradient(135deg, #FFB347, #FF6B9D); -webkit-background-clip: text; background-clip: text;">${winner.teamName}</span></h2>
    <p class="winner-desc">${winner.presentation.vision}</p>
    <div class="winner-metrics">
      <div class="wm-card"><span class="wm-val">9.580</span><span class="wm-label">Pontuação Final</span></div>
      <div class="wm-card"><span class="wm-val">96</span><span class="wm-label">Júri: Inovação</span></div>
      <div class="wm-card"><span class="wm-val">98</span><span class="wm-label">Júri: Impacto</span></div>
      <div class="wm-card"><span class="wm-val">3x</span><span class="wm-label">ARR Target</span></div>
    </div>
    <div class="winner-agents-row">${agentsHTML}</div>
    <div class="winner-cta">
      <button class="btn-integrate" onclick="launchIntegration()">🚀 Integrar ao Vertice 3.0</button>
      <button class="btn-new-round" onclick="window.location.href='index.html'">↩ Voltar ao Dashboard</button>
    </div>
  `;

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  shootConfetti();
}

function launchIntegration() {
  window.location.href = 'synthesis.html';
}

// ─── CONFETTI ────────────────────────────────────────────────
function shootConfetti() {
  const colors = ['#6C63FF', '#00D4FF', '#FF6B9D', '#FFB347', '#00FFB2', '#ffffff'];
  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-20px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.transform = `rotateZ(${Math.random() * 360}deg)`;
      el.style.animationDuration = (Math.random() * 3 + 2) + 's';
      el.style.width = (Math.random() * 10 + 6) + 'px';
      el.style.height = (Math.random() * 14 + 8) + 'px';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }, i * 30);
  }
}

// ─── KEYBOARD ────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePresentationModal();
});
