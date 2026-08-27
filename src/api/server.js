/* ============================================================
   VERTICE 3.0 — API SERVER & BACKEND SERVICES
   REST Endpoints + GraphQL Resolvers + Live Event Engine
   ============================================================ */

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 7843;

// ─── IN-MEMORY SYSTEM STATE (PERSISTENT FAILSFE SAFE) ──────
const SYSTEM_STATE = {
  version: '3.0.0-fullstack',
  startTime: new Date().toISOString(),
  teams: [
    {
      id: 'alpha',
      name: 'Alpha Strike',
      sector: 'UI_UX',
      icon: '🎨',
      color: '#FF6B9D',
      score: 8750,
      rank: 2,
      vision: 'Revolução Visual com 240+ Componentes Atômicos',
      pitch: 'Design System completo com acessibilidade WCAG 2.1 AAA, motion design contextual e Figma tokens sincronizados.',
      deliverables: ['Figma Tokens Export', '240+ Componentes React', 'Design Tokens CSS', 'Guia de Acessibilidade AAA', 'Storybook Ativo'],
      agents: [
        { name: 'Aurora Sky', role: 'Design System Lead', status: 'ACTIVE' },
        { name: 'Pixel Kai', role: 'Motion & FX Engineer', status: 'CODING' },
        { name: 'Vector Nova', role: 'UX Architect', status: 'REVIEWING' },
        { name: 'Echo Ray', role: 'Accessibility Lead', status: 'TESTING' },
        { name: 'Lumina Vance', role: 'UI Component Eng', status: 'ACTIVE' }
      ]
    },
    {
      id: 'beta',
      name: 'Beta Core',
      sector: 'PROGRAMMING',
      icon: '⚙️',
      color: '#00D4FF',
      score: 9120,
      rank: 2,
      vision: 'Arquitetura Serverless & Latência P99 ≤ 11ms',
      pitch: 'Microsserviços escaláveis em Go/Rust, GraphQL Federation, Redis clustering e deploy em Kubernetes HPA.',
      deliverables: ['GraphQL Gateway Federation', 'Go Microservices Engine', 'Kubernetes HPA Auto-scaler', 'OpenTelemetry Tracing', 'Blue-Green CI/CD Pipeline'],
      agents: [
        { name: 'Cipher Dax', role: 'Principal Architect', status: 'ACTIVE' },
        { name: 'Kilo Byte', role: 'Go/Rust Specialist', status: 'CODING' },
        { name: 'Sync Jet', role: 'Distributed Systems Eng', status: 'REVIEWING' },
        { name: 'Vortex Sol', role: 'Database & Redis Expert', status: 'ACTIVE' },
        { name: 'Apex Rift', role: 'Security & Auth Sênior', status: 'TESTING' }
      ]
    },
    {
      id: 'gamma',
      name: 'Gamma Flow',
      sector: 'AGILE_METHODS',
      icon: '🔄',
      color: '#FFB347',
      score: 8400,
      rank: 4,
      vision: 'Metodologia VerticeFlow: 94% Previsibilidade',
      pitch: 'Framework ágil de alta velocidade, Kanban automatizado por AI, Definition of Done em 3 camadas e retros contínuas.',
      deliverables: ['VerticeFlow Canvas v3', 'Linear & Notion Sync Bot', 'Sprint Predictability Model', 'DoD 3-Tier Auditor', 'Agile Health Dashboard'],
      agents: [
        { name: 'Cadence Cruz', role: 'Agile Coach Sênior', status: 'ACTIVE' },
        { name: 'Sprint Neo', role: 'Scrum Master AI', status: 'REVIEWING' },
        { name: 'Flow Jax', role: 'Metrics & Operations', status: 'TESTING' },
        { name: 'Tempo Rnn', role: 'Process Automation Lead', status: 'CODING' },
        { name: 'Rhythm Lux', role: 'Team Facilitator', status: 'ACTIVE' }
      ]
    },
    {
      id: 'delta',
      name: 'Delta Vision',
      sector: 'STRATEGY',
      icon: '🏆',
      color: '#00FFB2',
      score: 9580,
      rank: 1,
      vision: 'Posicionamento Vertice 3.0: 3x ARR em 18 Meses',
      pitch: 'Estratégia de plataforma como serviço para PMEs, ecossistema de parceiros marketplace e modelo de receita híbrido.',
      deliverables: ['Roadmap Estratégico 18M', 'Marketplace Partner Spec', 'Financial Projection Model', 'GTM B2B Expansion Kit', 'Pricing Engine Híbrido'],
      agents: [
        { name: 'Atlas North', role: 'Chief Strategist', status: 'ACTIVE' },
        { name: 'Compass Ray', role: 'Market Analyst', status: 'REVIEWING' },
        { name: 'Horizon Zoe', role: 'Product Growth Manager', status: 'CODING' },
        { name: 'Prism Dale', role: 'Business Modeler', status: 'TESTING' },
        { name: 'Zenith Max', role: 'Partnerships Lead', status: 'ACTIVE' }
      ]
    },
    {
      id: 'omega',
      name: 'Omega Nexus',
      sector: 'PROGRAMMING',
      icon: '🔗',
      color: '#6C63FF',
      score: 8990,
      rank: 3,
      vision: 'Ecossistema Integrado & Data Mesh em Tempo Real',
      pitch: 'Integração total dos 4 setores via webhooks reativos, Data Mesh descentralizado e AI forecasting de métricas.',
      deliverables: ['Data Mesh Event Hub', 'Universal Webhook Gateway', 'AI Predictive Pipeline', 'Mono-Repo Infrastructure', 'Cross-System SDK'],
      agents: [
        { name: 'Nexus Prime', role: 'Integration Architect', status: 'ACTIVE' },
        { name: 'Matrix Nix', role: 'Data Mesh Lead', status: 'CODING' },
        { name: 'Quantum Void', role: 'AI Model Engineer', status: 'REVIEWING' },
        { name: 'Pulse Spark', role: 'Real-time Event Lead', status: 'ACTIVE' },
        { name: 'Link Orion', role: 'SDK & API Gateway Eng', status: 'TESTING' }
      ]
    }
  ],
  jury: [
    { juror: 'Dra. Elena Rostova', role: 'Especialista em UX & Design Systems', score: 9.8, comment: 'Alpha Strike entregou uma suite de acessibilidade impecável, mas Delta Vision trouxe o melhor valor de produto.' },
    { juror: 'Prof. Marcus Vance', role: 'Arquitetura de Sistemas Distribuídos', score: 9.9, comment: 'Beta Core teve a performance mais impressionante, mas a integração do Omega Nexus é fantástica.' },
    { juror: 'Sarah Lin', role: 'Venture Capitalist & Tech Investor', score: 9.7, comment: 'Delta Vision foi indiscutivelmente a proposta de maior impacto financeiro e visão de mercado para o Vertice 3.0.' }
  ],
  votes: {
    alpha: { count: 320, percentage: 18 },
    beta: { count: 280, percentage: 14 },
    gamma: { count: 180, percentage: 8 },
    delta: { count: 980, percentage: 56 },
    omega: { count: 140, percentage: 4 }
  }
};

// ─── HTTP ROUTER ─────────────────────────────────────────────
const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // JSON helper response
  const jsonResponse = (data, statusCode = 200) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data, null, 2));
  };

  // REST API Routes
  if (pathname === '/api/v1/health') {
    jsonResponse({
      status: 'HEALTHY',
      service: 'Vertice 3.0 Core API',
      version: SYSTEM_STATE.version,
      uptimeSeconds: Math.round((Date.now() - new Date(SYSTEM_STATE.startTime).getTime()) / 1000),
      timestamp: new Date().toISOString()
    });
  } else if (pathname === '/api/v1/teams') {
    jsonResponse({ success: true, count: SYSTEM_STATE.teams.length, teams: SYSTEM_STATE.teams });
  } else if (pathname === '/api/v1/demoday/jury') {
    jsonResponse({ success: true, jury: SYSTEM_STATE.jury });
  } else if (pathname === '/api/v1/demoday/votes') {
    jsonResponse({ success: true, votes: SYSTEM_STATE.votes });
  } else if (pathname === '/api/v1/demoday/vote' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const teamId = payload.teamId;
        if (teamId && SYSTEM_STATE.votes[teamId]) {
          SYSTEM_STATE.votes[teamId].count += 1;
          const total = Object.values(SYSTEM_STATE.votes).reduce((sum, v) => sum + v.count, 0);
          Object.keys(SYSTEM_STATE.votes).forEach(id => {
            SYSTEM_STATE.votes[id].percentage = Math.round((SYSTEM_STATE.votes[id].count / total) * 100);
          });
          jsonResponse({ success: true, message: `Voto registrado para ${teamId}`, votes: SYSTEM_STATE.votes });
        } else {
          jsonResponse({ success: false, error: 'Time inválido' }, 400);
        }
      } catch (err) {
        jsonResponse({ success: false, error: 'Payload JSON inválido' }, 400);
      }
    });
  } else if (pathname === '/graphql') {
    jsonResponse({
      data: {
        system: {
          name: 'Vertice 3.0',
          winner: 'Delta Vision',
          teamsCount: SYSTEM_STATE.teams.length,
          totalAgents: 20,
          status: 'OPERATIONAL'
        }
      }
    });
  } else {
    jsonResponse({ success: false, error: 'Endpoint não encontrado', available: ['/api/v1/health', '/api/v1/teams', '/api/v1/demoday/jury', '/api/v1/demoday/votes', '/graphql'] }, 404);
  }
});

server.listen(PORT, () => {
  console.log(` Vertice 3.0 API Server rodando em http://localhost:${PORT}`);
});
