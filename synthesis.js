/* ============================================================
   SYNTHESIS ENGINE — JavaScript
   ============================================================ */

// ─── AVALIADORES ─────────────────────────────────────────────
const EVALUATORS = [
  {
    id: 'marina',
    name: 'Dra. Marina Costa',
    role: 'Chief Technology Officer',
    emoji: '👩‍💼',
    color: '#6C63FF',
    specialty: 'Avalia arquitetura técnica, escalabilidade e débito tecnológico. Foco em decisões de longo prazo.',
    dimension: 'Arquitetura Técnica',
    status: 'idle',
    findings: [
      'Beta Core: latência P99 de 11ms é benchmark de mercado',
      'Omega Nexus: mono-repo com turborepo resolve integração',
      'Beta Core: Kubernetes HPA + observabilidade é mandatório',
    ]
  },
  {
    id: 'rafael',
    name: 'Rafael Monteiro',
    role: 'Chief Product Officer',
    emoji: '👨‍💻',
    color: '#00D4FF',
    specialty: 'Avalia product-market fit, jornada do usuário e diferenciação competitiva do produto.',
    dimension: 'Produto & UX',
    status: 'idle',
    findings: [
      'Alpha Strike: NPS 97 é resultado de UX research com dados reais',
      'Alpha Strike: Design system com 240 componentes é a base certa',
      'Delta Vision: expansão vertical resolve o problema de TAM',
    ]
  },
  {
    id: 'ana',
    name: 'Ana Figueiredo',
    role: 'Chief Executive Officer',
    emoji: '👩‍🏫',
    color: '#FF6B9D',
    specialty: 'Avalia viabilidade estratégica, retorno financeiro e alinhamento ao roadmap de negócio.',
    dimension: 'Estratégia & Negócio',
    status: 'idle',
    findings: [
      'Delta Vision: CAC:LTV 3:1 com ARR 3x é o mais sólido financeiramente',
      'Delta Vision: Marketplace em Q3 cria novo vetor de receita',
      'Gamma Flow: previsibilidade 94% reduz risco de entrega',
    ]
  },
  {
    id: 'pedro',
    name: 'Pedro Alves',
    role: 'Head of Engineering',
    emoji: '🧑‍🔬',
    color: '#FFB347',
    specialty: 'Avalia qualidade de código, DevOps, automação e práticas de engenharia de software.',
    dimension: 'Engenharia & DevOps',
    status: 'idle',
    findings: [
      'Beta Core: Blue-green deployment com rollback < 30s é produção-ready',
      'Omega Nexus: IaC com Terraform é reprodutível e auditável',
      'Beta Core: OpenTelemetry + Grafana resolve observabilidade completa',
    ]
  },
  {
    id: 'julia',
    name: 'Julia Ramos',
    role: 'Head of Design',
    emoji: '🎨',
    color: '#C084FC',
    specialty: 'Avalia consistência visual, acessibilidade, design tokens e experiência do usuário.',
    dimension: 'Design & Experiência',
    status: 'idle',
    findings: [
      'Alpha Strike: Figma tokens + Style Dictionary é padrão de mercado',
      'Alpha Strike: WCAG AAA com 240 componentes documentados é raro',
      'Alpha Strike: Motion design system contextual diferencia o produto',
    ]
  },
  {
    id: 'carlos',
    name: 'Carlos Mendes',
    role: 'Agile Coach Sênior',
    emoji: '🔄',
    color: '#34D399',
    specialty: 'Avalia frameworks de entrega, cadência de sprints, cultura de equipe e governança ágil.',
    dimension: 'Processos & Agilidade',
    status: 'idle',
    findings: [
      'Gamma Flow: VerticeFlow Canvas criado com o time — adoção garantida',
      'Gamma Flow: Definition of Done em 3 camadas elimina retrabalho',
      'Omega Nexus: AI sprint forecasting com 89% acurácia é game-changer',
    ]
  },
  {
    id: 'camila',
    name: 'Camila Torres',
    role: 'Head of Data & AI',
    emoji: '🤖',
    color: '#F472B6',
    specialty: 'Avalia uso de dados, inteligência artificial, métricas de produto e decisões data-driven.',
    dimension: 'Dados & Inteligência',
    status: 'idle',
    findings: [
      'Omega Nexus: Data mesh com squads donos dos dados é escalável',
      'Delta Vision: NRR 120% requer product analytics maduro',
      'Gamma Flow: Sprint Health Score + métricas qualitativas = holístico',
    ]
  }
];

// ─── ANÁLISE POR PROPOSTA ────────────────────────────────────
const PROPOSALS_ANALYSIS = [
  {
    teamId: 'alpha', teamName: 'Alpha Strike', icon: '🎨', color: '#FF6B9D',
    scores: { marina: 72, rafael: 96, ana: 75, pedro: 68, julia: 99, carlos: 70, camila: 74 },
    extracted: 'Design system completo, NPS 97, acessibilidade WCAG AAA, Figma tokens → código',
    rankLabel: '🥇 Design'
  },
  {
    teamId: 'beta', teamName: 'Beta Core', icon: '⚙️', color: '#00D4FF',
    scores: { marina: 98, rafael: 78, ana: 76, pedro: 99, julia: 65, carlos: 72, camila: 80 },
    extracted: 'P99 11ms, Kubernetes HPA, Blue-green deploy, OpenTelemetry, segurança enterprise',
    rankLabel: '🥇 Técnico'
  },
  {
    teamId: 'gamma', teamName: 'Gamma Flow', icon: '🔄', color: '#FFB347',
    scores: { marina: 65, rafael: 80, ana: 82, pedro: 74, julia: 68, carlos: 97, camila: 86 },
    extracted: 'VerticeFlow Canvas, DoD 3 camadas, Sprint Health Score, 94% predictability',
    rankLabel: '🥇 Processo'
  },
  {
    teamId: 'delta', teamName: 'Delta Vision', icon: '🏆', color: '#00FFB2',
    scores: { marina: 76, rafael: 90, ana: 98, pedro: 72, julia: 74, carlos: 75, camila: 88 },
    extracted: 'ARR 3x, marketplace Q3, NRR 120%, expansion vertical, CAC:LTV 3:1',
    rankLabel: '🥇 Estratégia'
  },
  {
    teamId: 'omega', teamName: 'Omega Nexus', icon: '🔗', color: '#6C63FF',
    scores: { marina: 85, rafael: 82, ana: 78, pedro: 88, julia: 76, carlos: 84, camila: 93 },
    extracted: 'Mono-repo turborepo, IaC Terraform, AI forecasting, data mesh, integração total',
    rankLabel: '🥇 Integração'
  }
];

// ─── PROPOSTA UNIFICADA ──────────────────────────────────────
const UNIFIED_PROPOSAL = {
  title: 'Vertice 3.0 — A Proposta Definitiva',
  tagline: 'A plataforma operacional mais inteligente para PMEs. Construída sobre os melhores fundamentos de design, engenharia, processo e estratégia.',
  pillars: [
    {
      icon: '🎨',
      title: 'Interface que Pensa com o Usuário',
      source: { name: 'Alpha Strike', color: '#FF6B9D' },
      color: '#FF6B9D',
      desc: 'Design system completo de 240+ componentes com acessibilidade WCAG AAA, motion design contextual e Figma tokens sincronizados ao código.',
      items: [
        '240+ componentes atômicos com dark/light mode nativo',
        'Motion design com 18 animações contextuais',
        'Figma → Style Dictionary → CI/CD em tempo real',
        'WCAG 2.1 AAA certificado — inclusão como padrão',
        'NPS 97 validado em testes com 50+ usuários reais',
      ],
      credit: 'Base: Alpha Strike | Complementado por: Omega Nexus (Storybook integration)'
    },
    {
      icon: '⚙️',
      title: 'Arquitetura de Alta Performance',
      source: { name: 'Beta Core + Omega Nexus', color: '#00D4FF' },
      color: '#00D4FF',
      desc: 'Microsserviços escaláveis com GraphQL Federation, Redis clustering, Kubernetes HPA e observabilidade end-to-end. Mono-repo unificado para máxima coerência.',
      items: [
        'P99 latência ≤ 12ms sob 50k req/s',
        'Kubernetes HPA com auto-scaling customizado',
        'GraphQL Federation unificando 8 serviços',
        'Mono-repo Turborepo: design + API + frontend integrados',
        'Blue-green deploy com rollback automático em < 30s',
        'OpenTelemetry + Grafana + alertas Slack em tempo real',
      ],
      credit: 'Base: Beta Core | Estrutura: Omega Nexus (Turborepo + IaC Terraform)'
    },
    {
      icon: '🔄',
      title: 'VerticeFlow — Processo de Alta Velocidade',
      source: { name: 'Gamma Flow + Omega Nexus', color: '#FFB347' },
      color: '#FFB347',
      desc: 'Framework ágil co-criado com os times: VerticeFlow Canvas, Definition of Done em 3 camadas, Sprint Health Score e AI forecasting com 89% de acurácia.',
      items: [
        'VerticeFlow Canvas: visibilidade única para todos os níveis',
        'DoD em 3 camadas: Dev → QA → Stakeholder',
        'Sprint Health Score automático no Slack',
        'AI sprint forecasting com 89% de acurácia histórica',
        'OKRs trimestrais linkados ao backlog via Notion',
        'Retrospectivas com Energia, Aprendizado e Confiança',
      ],
      credit: 'Base: Gamma Flow | AI Forecasting: Omega Nexus (Vector Nova)'
    },
    {
      icon: '🏆',
      title: 'Estratégia de Ecossistema',
      source: { name: 'Delta Vision', color: '#00FFB2' },
      color: '#00FFB2',
      desc: 'Posicionamento como plataforma central para PMEs. ARR 3x em 18 meses com marketplace de parceiros, expansão vertical e modelo de precificação híbrido.',
      items: [
        'Go-to-market: 10 PMEs anchor em Q1 com CAC:LTV ≥ 3:1',
        'Marketplace de parceiros ISV com revenue share 30% em Q3',
        'Expansão: Logística → RH → Financeiro → Saúde em sequência',
        'NRR 120% target no Ano 1 via upsell de módulos',
        'TAM R$8M (revisado R$14M com novos verticais)',
        'Usage-Based + Seat-Based: modelo híbrido flexível',
      ],
      credit: 'Base: Delta Vision | Dados: Camila Torres (product analytics) + Omega Nexus (data mesh)'
    },
    {
      icon: '🤖',
      title: 'Inteligência & Dados como Vantagem',
      source: { name: 'Omega Nexus + Delta Vision', color: '#6C63FF' },
      color: '#6C63FF',
      desc: 'Data mesh com squads donos de seus dados, product analytics integrado, AI forecasting de sprint e métricas de produto conectadas aos OKRs estratégicos.',
      items: [
        'Data mesh: cada squad produz e consome seus próprios dados',
        'Product analytics: Segment → Metabase → OKR em tempo real',
        'AI sprint forecasting com alertas preditivos de bloqueio',
        'NRR tracker automático com alertas de churn risk',
        'Chaos engineering desde Sprint 1 para antecipação de falhas',
        'Observabilidade holística: técnica + processo + negócio',
      ],
      credit: 'Base: Omega Nexus (Vector Nova, Data Mesh) | Métricas: Delta Vision (OKR system)'
    }
  ],
  roadmap: [
    {
      block: 'H00–H06',
      title: 'Ignição & Ambiente',
      label: 'Bloco 1',
      color: '#6C63FF',
      icon: '🚀',
      checkpoint: 'Mono-repo rodando localmente para todos os agentes',
      tracks: [
        { name: 'Design', color: '#FF6B9D', tasks: ['Tokens do design system exportados via Style Dictionary', 'Dark mode configurado no Figma'] },
        { name: 'Frontend', color: '#C084FC', tasks: ['Turborepo inicializado com Next.js 14', 'Storybook configurado com tema base'] },
        { name: 'Backend', color: '#00D4FF', tasks: ['API Gateway Node.js + GraphQL schema base', 'PostgreSQL + Prisma migrations iniciais'] },
        { name: 'DevOps', color: '#34D399', tasks: ['Docker Compose local: DB + Redis + API', 'GitHub Actions: lint + type-check pipeline'] },
        { name: 'Processo', color: '#FFB347', tasks: ['VerticeFlow Canvas criado no Linear', 'Definition of Done publicado no Notion'] },
      ]
    },
    {
      block: 'H06–H12',
      title: 'Core Components & Auth',
      label: 'Bloco 2',
      color: '#00D4FF',
      icon: '🛠',
      checkpoint: 'Login funcional ponta-a-ponta + 20 componentes UI no Storybook',
      tracks: [
        { name: 'Design', color: '#FF6B9D', tasks: ['60 componentes atômicos: botões, inputs, cards, badges', 'Motion design: hover states + micro-animações'] },
        { name: 'Frontend', color: '#C084FC', tasks: ['Design tokens → CSS Variables automáticos', 'Layout base: Sidebar + Header + MainArea responsivos'] },
        { name: 'Backend', color: '#00D4FF', tasks: ['JWT Auth: signup/login/refresh/logout', 'Redis session store + rate limiting por usuário'] },
        { name: 'DevOps', color: '#34D399', tasks: ['CI pipeline: testes automáticos em PR', 'Staging environment provisionado no Railway'] },
        { name: 'QA', color: '#F472B6', tasks: ['Testes E2E base com Playwright: fluxo de auth', 'Smoke tests dos endpoints da API'] },
      ]
    },
    {
      block: 'H12–H18',
      title: 'Módulos de Dados & Dashboard',
      label: 'Bloco 3',
      color: '#FFB347',
      icon: '📊',
      checkpoint: 'Dashboard principal com dados reais do banco renderizando',
      tracks: [
        { name: 'Design', color: '#FF6B9D', tasks: ['Dashboard layout: KPI cards + charts + tabelas', 'Estados vazios, loading skeletons e error states'] },
        { name: 'Frontend', color: '#C084FC', tasks: ['Recharts integrado: line, bar, donut charts', 'Data table com sort, filter e pagination'] },
        { name: 'Backend', color: '#00D4FF', tasks: ['GraphQL resolvers: queries de métricas agregadas', 'Seed de dados reais para demonstração'] },
        { name: 'DevOps', color: '#34D399', tasks: ['OpenTelemetry: tracing nas queries GraphQL', 'Grafana dashboard: latência + erro rate ao vivo'] },
        { name: 'QA', color: '#F472B6', tasks: ['Testes de integração: API → banco → frontend', 'Validação de dados nas queries de KPIs'] },
      ]
    },
    {
      block: 'H18–H24',
      title: 'Funcionalidades Estratégicas',
      label: 'Bloco 4',
      color: '#FF6B9D',
      icon: '🎯',
      checkpoint: 'CRUD completo do módulo principal + notificações em tempo real',
      tracks: [
        { name: 'Design', color: '#FF6B9D', tasks: ['Modais de criação/edição com validação visual', 'Sistema de notificações: toasts + bell icon'] },
        { name: 'Frontend', color: '#C084FC', tasks: ['CRUD forms com React Hook Form + Zod', 'WebSocket: notificações push em tempo real'] },
        { name: 'Backend', color: '#00D4FF', tasks: ['Mutations GraphQL: create/update/delete/archive', 'WebSocket server com Socket.io + rooms por usuário'] },
        { name: 'DevOps', color: '#34D399', tasks: ['Health check endpoints: /health + /ready', 'Alert rules no Grafana: erros > 1% aciona Slack'] },
        { name: 'QA', color: '#F472B6', tasks: ['Testes de mutação: cenários de edge case', 'Load test básico: 100 usuários simultâneos'] },
      ]
    },
    {
      block: 'H24–H32',
      title: 'Multi-tenant & Permissões',
      label: 'Bloco 5',
      color: '#00FFB2',
      icon: '🔐',
      checkpoint: 'Isolamento de dados por organização + RBAC funcionando',
      tracks: [
        { name: 'Design', color: '#FF6B9D', tasks: ['Onboarding flow: 3 telas com progress indicator', 'Perfis de usuário: Admin, Member, Viewer diferenciados'] },
        { name: 'Frontend', color: '#C084FC', tasks: ['Multi-tenant context: troca de organização sem reload', 'Guards de permissão: componentes ocultos por role'] },
        { name: 'Backend', color: '#00D4FF', tasks: ['Row-Level Security no PostgreSQL por org_id', 'RBAC middleware: Admin / Member / Viewer scopes'] },
        { name: 'DevOps', color: '#34D399', tasks: ['Blue-Green deploy configurado: zero downtime', 'Backup automático do banco a cada 6h'] },
        { name: 'QA', color: '#F472B6', tasks: ['Testes de isolamento: dados de org A não vazam para org B', 'Auditoria de permissões por role em cada endpoint'] },
      ]
    },
    {
      block: 'H32–H40',
      title: 'Integrações & Analytics',
      label: 'Bloco 6',
      color: '#C084FC',
      icon: '🤖',
      checkpoint: 'Product analytics ao vivo + integração com serviço externo funcional',
      tracks: [
        { name: 'Design', color: '#FF6B9D', tasks: ['Analytics dashboard: funil, retenção e uso de features', 'Configurações de integração: UI do settings panel'] },
        { name: 'Frontend', color: '#C084FC', tasks: ['Segment SDK integrado: track de eventos chave', 'Webhook configurator: UI para conectar serviços externos'] },
        { name: 'Backend', color: '#00D4FF', tasks: ['Webhook engine: envia eventos para URLs externas', 'Queue de jobs com BullMQ para tarefas assíncronas'] },
        { name: 'DevOps', color: '#34D399', tasks: ['Rate limiting na API: 1000 req/min por organização', 'Cache Redis: TTL inteligente por tipo de query'] },
        { name: 'QA', color: '#F472B6', tasks: ['Testes de webhook: retry logic + dead letter queue', 'Validação do Segment: eventos chegando no Metabase'] },
      ]
    },
    {
      block: 'H40–H44',
      title: 'Performance & Hardening',
      label: 'Bloco 7',
      color: '#F472B6',
      icon: '⚡',
      checkpoint: 'P99 latência < 120ms no ambiente de staging + 0 vulnerabilidades críticas',
      tracks: [
        { name: 'Design', color: '#FF6B9D', tasks: ['Acessibilidade: ARIA labels + keyboard navigation', 'Responsividade: revisão mobile em breakpoints 320/768/1280'] },
        { name: 'Frontend', color: '#C084FC', tasks: ['Code splitting por rota: bundle < 150kb inicial', 'Image optimization + lazy loading em todos os assets'] },
        { name: 'Backend', color: '#00D4FF', tasks: ['Query optimization: EXPLAIN ANALYZE nas queries lentas', 'Índices de banco revisados para as queries mais frequentes'] },
        { name: 'DevOps', color: '#34D399', tasks: ['Pen test automatizado com OWASP ZAP', 'Kubernetes HPA: auto-scale baseado em CPU > 70%'] },
        { name: 'QA', color: '#F472B6', tasks: ['Load test final: 500 usuários simultâneos por 5 min', 'Chaos test: kill de um pod sem downtime perceptível'] },
      ]
    },
    {
      block: 'H44–H48',
      title: 'Deploy Final & Entrega',
      label: 'Bloco 8',
      color: '#FFD700',
      icon: '🏆',
      checkpoint: 'Vertice 3.0 em produção. URL pública funcionando. Documentação entregue.',
      tracks: [
        { name: 'Design', color: '#FF6B9D', tasks: ['Handoff final: Figma com todos os componentes anotados', 'Gravação do design walkthrough em vídeo (5 min)'] },
        { name: 'Frontend', color: '#C084FC', tasks: ['Build de produção: next build + otimizações finais', 'Deploy na Vercel com domínio customizado'] },
        { name: 'Backend', color: '#00D4FF', tasks: ['Migrations de produção rodadas e validadas', 'Documentação OpenAPI 3.1 publicada em /docs'] },
        { name: 'DevOps', color: '#34D399', tasks: ['Rollout canary: 10% → 50% → 100% do tráfego', 'Runbook de incidentes publicado no Confluence'] },
        { name: 'Processo', color: '#FFB347', tasks: ['Retrospectiva do hackathon: 48h, 3 aprendizados chave', 'Sprint 1 planejado: backlog priorizado para as próximas 2 semanas'] },
      ]
    },
  ],
  stack: [
    { layer: 'Design', tags: ['Figma', 'Storybook', 'Style Dictionary', 'Framer Motion', 'WCAG 2.1'], color: '#FF6B9D' },
    { layer: 'Frontend', tags: ['Next.js', 'React', 'tRPC', 'Turborepo', 'TypeScript'], color: '#C084FC' },
    { layer: 'Backend', tags: ['Node.js', 'GraphQL Federation', 'Prisma', 'Redis', 'PostgreSQL'], color: '#00D4FF' },
    { layer: 'Infra', tags: ['Kubernetes', 'Terraform', 'Vercel', 'CI/CD Blue-Green', 'OpenTelemetry'], color: '#6C63FF' },
    { layer: 'Dados & AI', tags: ['Segment', 'Metabase', 'Data Mesh', 'AI Forecasting', 'Grafana'], color: '#34D399' },
    { layer: 'Processo', tags: ['VerticeFlow', 'Linear', 'Notion', 'Slack Bots', 'OKR System'], color: '#FFB347' },
  ],
  evaluatorVerdicts: [
    { evaluator: EVALUATORS[0], verdict: '"A combinação Beta Core + Omega Nexus cria a base técnica mais sólida que já aprovei. Escalável para 10M usuários desde o dia 1."' },
    { evaluator: EVALUATORS[1], verdict: '"Alpha Strike entrega a melhor UX. Integrada à estratégia do Delta Vision, temos o produto certo para o mercado certo."' },
    { evaluator: EVALUATORS[2], verdict: '"Delta Vision com o rigor do Gamma Flow: não é só estratégia bonita — é estratégia executável. Aprovo a proposta unificada."' },
    { evaluator: EVALUATORS[3], verdict: '"IaC do Omega + DevOps do Beta Core = pipeline de engenharia de nível enterprise. Isso vai a produção sem dívida técnica."' },
    { evaluator: EVALUATORS[4], verdict: '"240 componentes WCAG AAA com tokens sincronizados é o design system que o mercado ainda não tem. Alpha Strike definiu o padrão."' },
    { evaluator: EVALUATORS[5], verdict: '"VerticeFlow com AI forecasting é o framework ágil mais completo que já avaliei. O time vai abraçar porque ajudou a construir."' },
    { evaluator: EVALUATORS[6], verdict: '"Data mesh + AI forecasting + NRR tracker: essa proposta é a primeira que trata dados como vantagem competitiva real."' }
  ]
};

// ─── STATE & ANIMATION ───────────────────────────────────────
let synthProgress = 0;
let synthRunning = false;
const PHASES = [
  'Iniciando painel de avaliadores...',
  'Dra. Marina Costa analisando propostas técnicas...',
  'Rafael Monteiro avaliando product-market fit...',
  'Ana Figueiredo calculando viabilidade estratégica...',
  'Pedro Alves revisando práticas de engenharia...',
  'Julia Ramos auditando design e acessibilidade...',
  'Carlos Mendes avaliando frameworks ágeis...',
  'Camila Torres analisando dados e inteligência...',
  'Cruzando resultados dos 7 avaliadores...',
  'Extraindo elementos superiores por dimensão...',
  'Sintetizando proposta unificada...',
  'Submetendo para aprovação do painel...',
  '✅ Proposta unificada aprovada por unanimidade!'
];

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderEvaluators();
  renderMatrix();
});

// ─── RENDER EVALUATORS ───────────────────────────────────────
function renderEvaluators() {
  const grid = document.getElementById('evaluators-grid');
  grid.innerHTML = '';
  EVALUATORS.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'evaluator-card';
    card.id = `ev-${ev.id}`;
    card.style.setProperty('--ev-color', ev.color);

    const findingsHTML = ev.findings.map(f => `<div class="ev-finding-item">${f}</div>`).join('');

    card.innerHTML = `
      <div class="ev-avatar" style="background: ${ev.color}18; border-color: ${ev.color}40;">${ev.emoji}</div>
      <div class="ev-name">${ev.name}</div>
      <div class="ev-role">${ev.role}</div>
      <div class="ev-specialty">${ev.specialty}</div>
      <div class="ev-status idle" id="ev-status-${ev.id}">
        <div class="ev-status-dot"></div>
        <span>Aguardando</span>
      </div>
      <div class="ev-findings" id="ev-findings-${ev.id}">${findingsHTML}</div>
    `;
    grid.appendChild(card);
  });
}

// ─── RENDER MATRIX ───────────────────────────────────────────
function renderMatrix() {
  const container = document.getElementById('analysis-matrix');
  const evIds = EVALUATORS.map(e => e.id);
  const evNames = EVALUATORS.map(e => e.name.split(' ')[1] || e.name.split(' ')[0]);

  let html = `
    <table class="matrix-table">
      <thead>
        <tr>
          <th>Time / Proposta</th>
          ${evNames.map((n, i) => `<th style="color: ${EVALUATORS[i].color};">${n}</th>`).join('')}
          <th>Média</th>
          <th>Destaque</th>
          <th>Melhor Elemento</th>
        </tr>
      </thead>
      <tbody>
  `;

  PROPOSALS_ANALYSIS.forEach(p => {
    const avg = Math.round(Object.values(p.scores).reduce((a, b) => a + b, 0) / 7);
    const maxEv = Object.entries(p.scores).sort((a,b) => b[1]-a[1])[0];
    const maxEvData = EVALUATORS.find(e => e.id === maxEv[0]);

    html += `<tr id="mrow-${p.teamId}">`;
    html += `
      <td>
        <div class="mt-team-cell">
          <div class="mt-team-icon" style="background: ${p.color}18; border: 1px solid ${p.color}30;">${p.icon}</div>
          <span class="mt-team-name" style="color: ${p.color};">${p.teamName}</span>
        </div>
      </td>
    `;

    evIds.forEach(evId => {
      const score = p.scores[evId];
      const ev = EVALUATORS.find(e => e.id === evId);
      html += `
        <td>
          <div class="score-cell hidden" id="score-${p.teamId}-${evId}" style="color: ${ev.color};">${score}</div>
          <div class="score-bar-cell">
            <div class="mini-bar">
              <div class="mini-bar-fill" id="bar-${p.teamId}-${evId}" style="background: ${ev.color};"></div>
            </div>
          </div>
        </td>
      `;
    });

    html += `
      <td class="score-cell hidden" id="avg-${p.teamId}" style="color: ${p.color}; font-size: 1.1rem;">${avg}</td>
      <td><span class="best-tag gold" id="rank-${p.teamId}" style="display:none;">${p.rankLabel}</span></td>
      <td class="extracted-cell" id="ext-${p.teamId}" style="display:none;"><strong>✦ Extraído</strong>${p.extracted}</td>
    `;
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

// ─── START SYNTHESIS ─────────────────────────────────────────
function startSynthesis() {
  if (synthRunning) return;
  synthRunning = true;
  document.getElementById('btn-start-synth').disabled = true;
  document.getElementById('btn-start-synth').textContent = '⚙️ Análise em andamento...';

  // Show skip button after 3s
  setTimeout(() => {
    const skipBtn = document.getElementById('btn-skip-synth');
    if (skipBtn) skipBtn.style.display = 'inline-block';
  }, 3000);

  runPhase(0);
}

function skipToProposal() {
  synthRunning = true;
  // Complete all evaluators
  EVALUATORS.forEach(ev => completeEvaluator(ev.id));
  EVALUATORS.forEach((ev, idx) => revealEvaluatorScores(ev.id, idx));
  revealAverages();
  revealExtracted();
  updateRing(100);
  document.getElementById('ring-pct').textContent = '100%';
  document.getElementById('synth-phase').textContent = '✅ Proposta unificada aprovada por unanimidade!';
  document.getElementById('synth-phase').style.color = 'var(--accent-green)';
  const startBtn = document.getElementById('btn-start-synth');
  if (startBtn) { startBtn.disabled = true; startBtn.textContent = '✓ Síntese concluída'; }
  const skipBtn = document.getElementById('btn-skip-synth');
  if (skipBtn) skipBtn.style.display = 'none';
  finalizeSynthesis();
}

function runPhase(phaseIdx) {
  if (phaseIdx >= PHASES.length) {
    finalizeSynthesis();
    return;
  }

  document.getElementById('synth-phase').textContent = PHASES[phaseIdx];
  synthProgress = Math.round((phaseIdx / (PHASES.length - 1)) * 100);
  updateRing(synthProgress);

  // Evaluate each evaluator phase (phases 1-7)
  if (phaseIdx >= 1 && phaseIdx <= 7) {
    const ev = EVALUATORS[phaseIdx - 1];
    activateEvaluator(ev.id);

    // After evaluator finishes, reveal scores for that evaluator
    setTimeout(() => {
      completeEvaluator(ev.id);
      revealEvaluatorScores(ev.id, phaseIdx - 1);
      setTimeout(() => runPhase(phaseIdx + 1), 300);
    }, 1200);
  } else if (phaseIdx === 8) {
    // Cross-reference phase: show averages
    setTimeout(() => {
      revealAverages();
      setTimeout(() => runPhase(phaseIdx + 1), 600);
    }, 600);
  } else if (phaseIdx === 9) {
    // Extraction phase
    setTimeout(() => {
      revealExtracted();
      setTimeout(() => runPhase(phaseIdx + 1), 800);
    }, 400);
  } else {
    setTimeout(() => runPhase(phaseIdx + 1), phaseIdx >= 10 ? 1200 : 600);
  }
}

function updateRing(pct) {
  const circle = document.getElementById('ring-circle');
  const pctEl = document.getElementById('ring-pct');
  const offset = 327 - (327 * pct / 100);
  circle.style.strokeDashoffset = offset;
  pctEl.textContent = pct + '%';
}

function activateEvaluator(evId) {
  const card = document.getElementById(`ev-${evId}`);
  const status = document.getElementById(`ev-status-${evId}`);
  card.classList.add('active');
  status.className = 'ev-status analyzing';
  status.innerHTML = '<div class="ev-status-dot"></div><span>Analisando propostas...</span>';
}

function completeEvaluator(evId) {
  const card = document.getElementById(`ev-${evId}`);
  const status = document.getElementById(`ev-status-${evId}`);
  const findings = document.getElementById(`ev-findings-${evId}`);
  card.classList.remove('active');
  card.classList.add('done');
  status.className = 'ev-status done';
  status.innerHTML = '<div class="ev-status-dot"></div><span>Análise concluída ✓</span>';
  findings.style.display = 'block';
}

function revealEvaluatorScores(evId, evIdx) {
  PROPOSALS_ANALYSIS.forEach(p => {
    const scoreEl = document.getElementById(`score-${p.teamId}-${evId}`);
    const barEl = document.getElementById(`bar-${p.teamId}-${evId}`);
    if (scoreEl) {
      scoreEl.classList.remove('hidden');
      scoreEl.classList.add('visible');
    }
    if (barEl) {
      setTimeout(() => {
        barEl.style.width = p.scores[evId] + '%';
      }, 100);
    }
  });
}

function revealAverages() {
  PROPOSALS_ANALYSIS.forEach(p => {
    const avgEl = document.getElementById(`avg-${p.teamId}`);
    if (avgEl) {
      avgEl.classList.remove('hidden');
      avgEl.classList.add('visible');
    }
  });
}

function revealExtracted() {
  PROPOSALS_ANALYSIS.forEach(p => {
    const rankEl = document.getElementById(`rank-${p.teamId}`);
    const extEl = document.getElementById(`ext-${p.teamId}`);
    if (rankEl) rankEl.style.display = 'inline-flex';
    if (extEl) extEl.style.display = 'block';
  });
}

function finalizeSynthesis() {
  synthProgress = 100;
  updateRing(100);
  document.getElementById('synth-phase').textContent = '✅ Proposta unificada aprovada por unanimidade!';
  document.getElementById('synth-phase').style.color = 'var(--accent-green)';
  document.getElementById('btn-start-synth').textContent = '✓ Síntese concluída';

  setTimeout(() => {
    renderUnifiedProposal();
    const propSection = document.getElementById('proposta');
    propSection.style.display = 'block';
    setTimeout(() => propSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
  }, 1500);
}

// ─── RENDER UNIFIED PROPOSAL ─────────────────────────────────
function renderUnifiedProposal() {
  const container = document.getElementById('unified-proposal');
  const p = UNIFIED_PROPOSAL;

  // Pillars
  const pillarsHTML = p.pillars.map(pl => `
    <div class="pillar-card" style="--pillar-color: ${pl.color};">
      <div class="pillar-source" style="background: ${pl.source.color}12; color: ${pl.source.color}; border-color: ${pl.source.color}30;">
        ✦ ${pl.source.name}
      </div>
      <span class="pillar-icon">${pl.icon}</span>
      <div class="pillar-title">${pl.title}</div>
      <div class="pillar-desc">${pl.desc}</div>
      <ul class="pillar-items">
        ${pl.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
      <div class="pillar-credit"><strong>Fonte:</strong> ${pl.credit}</div>
    </div>
  `).join('');


  // Stack
  const stackHTML = p.stack.map(s => `
    <div class="stack-layer">
      <span class="stack-layer-name" style="color: ${s.color};">${s.layer}</span>
      <div class="stack-tags">
        ${s.tags.map(t => `<span class="stack-tag" style="background: ${s.color}10; color: ${s.color}; border-color: ${s.color}30;">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // Verdicts
  const verdictsHTML = p.evaluatorVerdicts.map(v => `
    <div class="cv-row">
      <div class="cv-avatar">${v.evaluator.emoji}</div>
      <div class="cv-name" style="color: ${v.evaluator.color};">${v.evaluator.name}</div>
      <div class="cv-verdict">${v.verdict}</div>
      <div class="cv-approve">✅</div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="unified-proposal-wrap">

      <!-- HEADER -->
      <div class="up-header">
        <div class="up-version-badge">Vertice 3.0 — Proposta Unificada ✦ Aprovada por 7/7 Avaliadores</div>
        <h2 class="up-main-title">${p.title}</h2>
        <p class="up-tagline">${p.tagline}</p>
        <div class="up-consensus-row">
          <span class="up-consensus-item"><span class="check">✓</span> Design Alpha Strike</span>
          <span class="up-consensus-item"><span class="check">✓</span> Arquitetura Beta Core</span>
          <span class="up-consensus-item"><span class="check">✓</span> Processo Gamma Flow</span>
          <span class="up-consensus-item"><span class="check">✓</span> Estratégia Delta Vision</span>
          <span class="up-consensus-item"><span class="check">✓</span> Integração Omega Nexus</span>
        </div>
      </div>

      <!-- PILLAR TITLE -->
      <div class="section-header" style="text-align:left; margin-bottom: 0;">
        <span class="section-tag">Os 5 Pilares</span>
        <h3 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; letter-spacing:-0.03em; margin-top:8px;">
          O Que Cada Time Contribui
        </h3>
      </div>

      <!-- PILLARS -->
      <div class="pillars-grid">${pillarsHTML}</div>

      <!-- ROADMAP 48H -->
      <div class="roadmap-section" id="roadmap-48h">
        <h3>⏱ Roadmap de Execução — 48 Horas Fullstack</h3>
        <p style="color: var(--text-secondary); font-size:0.88rem; margin-bottom:28px; line-height:1.65;">
          Plano de sprint intensivo dividido em 8 blocos de execução. Cada bloco tem checkpoint obrigatório,
          tarefas por disciplina e times responsáveis. Todos os 20 agentes operam em paralelo.
        </p>
        <div id="roadmap-48h-content"></div>
      </div>

      <!-- STACK -->
      <div class="stack-section">
        <h3>🛠 Stack Tecnológico Consolidado</h3>
        <div class="stack-layers">${stackHTML}</div>
      </div>

      <!-- CONSENSUS -->
      <div class="consensus-section">
        <h3>✅ Aprovação Unânime do Painel</h3>
        <div class="consensus-votes">${verdictsHTML}</div>
        <div class="consensus-cta">
          <button class="btn-download" onclick="window.location.href='sprint.html'" style="background: linear-gradient(135deg, var(--accent-green), var(--accent-cyan)); color:#06060f;">⚡ Iniciar Sprint 48H Ao Vivo →</button>
          <button class="btn-new-sprint" onclick="exportProposal()">📄 Exportar Proposta PDF</button>
          <button class="btn-new-sprint" onclick="window.location.href='index.html'">↩ Dashboard</button>
        </div>
      </div>

    </div>
  `;

  // Trigger entrance animations
  setTimeout(() => {
    document.querySelectorAll('.pillar-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `all 0.5s ease ${i * 0.08}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 80);
    });
    renderRoadmap48h();
  }, 300);
}

// ─── RENDER ROADMAP 48H ────────────────────────────────────────────
function renderRoadmap48h() {
  const container = document.getElementById('roadmap-48h-content');
  if (!container) return;
  const roadmap = UNIFIED_PROPOSAL.roadmap;

  // Progress bar header
  const progressBars = roadmap.map((b, i) => `
    <div style="flex:1; text-align:center;">
      <div style="height:6px; background: ${b.color}; border-radius:3px; margin-bottom:4px;"></div>
      <span style="font-size:0.6rem; color: ${b.color}; font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">${b.block}</span>
    </div>
  `).join('');

  let html = `
    <div style="display:flex; gap:4px; margin-bottom:32px; align-items:flex-end;">
      ${progressBars}
    </div>
  `;

  roadmap.forEach((block, blockIdx) => {
    const trackRows = block.tracks.map(t => `
      <div class="rmap-track-row">
        <div class="rmap-track-label" style="color: ${t.color};">${t.name}</div>
        <div class="rmap-track-tasks">
          ${t.tasks.map(task => `
            <div class="rmap-task">
              <span class="rmap-task-dot" style="background: ${t.color};"></span>
              <span>${task}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    html += `
      <div class="rmap-block" style="--block-color: ${block.color};" id="rblock-${blockIdx}">
        <div class="rmap-block-header">
          <div class="rmap-block-left">
            <span class="rmap-block-icon">${block.icon}</span>
            <div>
              <div class="rmap-block-label" style="color: ${block.color};">${block.label} — ${block.block}</div>
              <div class="rmap-block-title">${block.title}</div>
            </div>
          </div>
          <div class="rmap-checkpoint">
            <span class="rmap-checkpoint-label">✓ Checkpoint</span>
            <span class="rmap-checkpoint-text">${block.checkpoint}</span>
          </div>
        </div>
        <div class="rmap-tracks">${trackRows}</div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Staggered entrance
  document.querySelectorAll('.rmap-block').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-16px)';
    el.style.transition = `all 0.45s ease ${i * 0.12}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    }, 200 + i * 120);
  });
}

// ─── EXPORT ──────────────────────────────────────────────────
function exportProposal() {
  const win = window.open('', '_blank');
  const p = UNIFIED_PROPOSAL;
  const pillarsText = p.pillars.map(pl =>
    `### ${pl.icon} ${pl.title}\nFonte: ${pl.source.name}\n${pl.desc}\n${pl.items.map(i => '- ' + i).join('\n')}`
  ).join('\n\n');
  const stackText = p.stack.map(s => `**${s.layer}:** ${s.tags.join(', ')}`).join('\n');
  const roadmapText = p.roadmap.map(r => `**${r.phase} — ${r.title}** (${r.period})\n${r.items.map(i => '- ' + i).join('\n')}`).join('\n\n');

  win.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Vertice 3.0 — Proposta Unificada</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
      <style>
        body { font-family: Inter, sans-serif; max-width: 900px; margin: 0 auto; padding: 60px 40px; background: #fff; color: #111; line-height: 1.65; }
        h1 { font-family: 'Space Grotesk', sans-serif; font-size: 2.5rem; font-weight: 900; letter-spacing: -0.04em; margin-bottom: 8px; color: #111; }
        h2 { font-family: 'Space Grotesk', sans-serif; font-weight: 800; font-size: 1.4rem; margin: 40px 0 8px; border-left: 4px solid #6C63FF; padding-left: 12px; }
        h3 { font-weight: 700; margin: 24px 0 8px; color: #222; }
        p { color: #444; }
        .tagline { font-size: 1.1rem; color: #555; margin-bottom: 40px; }
        .badge { display: inline-block; background: #f0f0ff; border: 1px solid #6C63FF; color: #6C63FF; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 12px; border-radius: 99px; margin-bottom: 12px; }
        ul { padding-left: 20px; } li { margin-bottom: 4px; color: #444; }
        .section { margin-bottom: 40px; padding-bottom: 32px; border-bottom: 1px solid #eee; }
        .footer { text-align: center; margin-top: 60px; color: #999; font-size: 0.8rem; }
        .stamp { background: #f0fff4; border: 2px solid #34D399; border-radius: 12px; padding: 20px 28px; margin-top: 40px; display: flex; align-items: center; gap: 16px; }
        .stamp-title { font-weight: 800; color: #059669; font-size: 1rem; }
        .stamp-sub { color: #555; font-size: 0.85rem; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div class="badge">Vertice Hackathon 3.0 — Proposta Unificada</div>
      <h1>Vertice 3.0</h1>
      <p class="tagline">${p.tagline}</p>

      <div class="section">
        <h2>🔷 Os 5 Pilares da Proposta</h2>
        ${p.pillars.map(pl => `
          <div style="margin-bottom:24px; padding:20px; background:#f9f9ff; border-radius:10px; border-left: 4px solid ${pl.color};">
            <h3 style="color:${pl.color}; margin-top:0;">${pl.icon} ${pl.title}</h3>
            <p style="font-size:0.8rem; color:#888;">Fonte: ${pl.source.name}</p>
            <p>${pl.desc}</p>
            <ul>${pl.items.map(i => `<li>${i}</li>`).join('')}</ul>
            <p style="font-size:0.78rem; color:#888; font-style:italic;">${pl.credit}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>⏱ Roadmap 48H Fullstack</h2>
        ${p.roadmap.map(r => `
          <div style="margin-bottom:20px; padding:16px; background:#f9f9ff; border-radius:10px; border-left: 4px solid ${r.color};">
            <strong style="color:${r.color}">${r.label} ${r.block} — ${r.title}</strong>
            <div style="font-size:0.78rem; color:#059669; margin:6px 0;">✓ Checkpoint: ${r.checkpoint}</div>
            ${r.tracks.map(t => `
              <div style="margin-top:8px;">
                <strong style="color:${t.color}; font-size:0.75rem;">${t.name}:</strong>
                <ul style="margin:4px 0;">${t.tasks.map(task => `<li style="font-size:0.78rem; color:#444;">${task}</li>`).join('')}</ul>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>🛠 Stack Consolidado</h2>
        ${p.stack.map(s => `<p><strong style="color:${s.color}">${s.layer}:</strong> ${s.tags.join(' · ')}</p>`).join('')}
      </div>

      <div class="stamp">
        <div style="font-size:2rem">✅</div>
        <div>
          <div class="stamp-title">Aprovado por unanimidade — 7/7 Avaliadores</div>
          <div class="stamp-sub">Dra. Marina Costa · Rafael Monteiro · Ana Figueiredo · Pedro Alves · Julia Ramos · Carlos Mendes · Camila Torres</div>
        </div>
      </div>

      <div class="footer">
        <p>Vertice Hackathon 3.0 · Gerado em ${new Date().toLocaleDateString('pt-BR')} · Proposta Unificada</p>
      </div>
      <script>window.onload = () => window.print();</script>
    </body>
    </html>
  `);
  win.document.close();
}

// Link from Demo Day
// Add synthesis link to demoday nav if needed
