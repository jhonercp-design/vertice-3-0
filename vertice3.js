/* ============================================================
   VERTICE 3.0 UNIFIED APPLICATION — JS CONTROLLER
   ============================================================ */

let currentTab = 'dashboard';

document.addEventListener('DOMContentLoaded', () => {
  // Check hash in URL or default to dashboard
  const hash = window.location.hash.replace('#', '');
  if (['dashboard', 'demoday', 'synthesis', 'sprint'].includes(hash)) {
    currentTab = hash;
  }

  switchTab(currentTab);
  initUnifiedDashboard();
  initUnifiedDemoDay();
  initUnifiedSynthesis();
  initUnifiedSprint();
});

// ─── TAB SWITCHING ───────────────────────────────────────────
function switchTab(tabId) {
  currentTab = tabId;
  window.location.hash = tabId;

  // Toggle nav buttons
  document.querySelectorAll('.utab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`tabbtn-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Toggle panes
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  const activePane = document.getElementById(`pane-${tabId}`);
  if (activePane) activePane.classList.add('active');

  // Trigger tab specific triggers
  if (tabId === 'synthesis' && typeof startSynthesis === 'function' && !synthRunning) {
    setTimeout(() => {
      skipToProposal(); // Show proposal immediately on tab click
    }, 100);
  }
}

// ─── INIT DASHBOARD ──────────────────────────────────────────
function initUnifiedDashboard() {
  const container = document.getElementById('dashboard-sectors-grid');
  if (!container) return;

  const sectors = [
    { name: 'UI/UX Design', color: '#FF6B9D', progress: 98, team: 'Alpha Strike', icon: '🎨' },
    { name: 'Programação', color: '#00D4FF', progress: 94, team: 'Beta Core & Omega', icon: '⚙️' },
    { name: 'Métodos Ágeis', color: '#FFB347', progress: 91, team: 'Gamma Flow', icon: '🔄' },
    { name: 'Estratégia', color: '#00FFB2', progress: 99, team: 'Delta Vision (Vencedor)', icon: '🏆' },
  ];

  container.innerHTML = sectors.map(s => `
    <div class="sector-card">
      <div class="sector-card-header">
        <span class="sector-icon">${s.icon}</span>
        <div>
          <h3>${s.name}</h3>
          <span style="font-size:0.72rem; color:var(--text-muted);">${s.team}</span>
        </div>
      </div>
      <div class="sector-progress-wrap">
        <div class="sector-progress-bar" style="width: ${s.progress}%; background: ${s.color};"></div>
      </div>
      <div class="sector-meta">
        <span>Concluído</span>
        <strong style="color:${s.color};">${s.progress}%</strong>
      </div>
    </div>
  `).join('');

  renderDashboardLeaderboard();
}

function renderDashboardLeaderboard() {
  const container = document.getElementById('dashboard-leaderboard');
  if (!container) return;

  const teams = [
    { rank: 1, name: 'Delta Vision', sector: 'Estratégia', score: 9580, color: '#00FFB2', icon: '🏆', winner: true },
    { rank: 2, name: 'Alpha Strike', sector: 'UI/UX Design', score: 9240, color: '#FF6B9D', icon: '🎨' },
    { rank: 3, name: 'Beta Core', sector: 'Programação', score: 9120, color: '#00D4FF', icon: '⚙️' },
    { rank: 4, name: 'Omega Nexus', sector: 'Full-Stack', score: 8990, color: '#6C63FF', icon: '🔗' },
    { rank: 5, name: 'Gamma Flow', sector: 'Métodos Ágeis', score: 8550, color: '#FFB347', icon: '🔄' },
  ];

  container.innerHTML = teams.map(t => `
    <div class="leaderboard-item ${t.winner ? 'winner-border' : ''}">
      <div class="lb-rank" style="color:${t.color}; font-weight:800; font-size:1.2rem;">#${t.rank}</div>
      <div class="lb-team-info">
        <span style="font-size:1.2rem; margin-right:8px;">${t.icon}</span>
        <strong style="font-size:1.05rem;">${t.name}</strong>
        ${t.winner ? '<span style="background:rgba(0,255,178,0.15); color:var(--accent-green); border:1px solid rgba(0,255,178,0.3); padding:2px 8px; border-radius:99px; font-size:0.65rem; font-weight:700; margin-left:8px;">🏆 VENCEDOR</span>' : ''}
      </div>
      <div class="lb-score" style="color:${t.color}; font-family:var(--font-display); font-weight:800; font-size:1.2rem;">
        ${t.score.toLocaleString('pt-BR')} pts
      </div>
    </div>
  `).join('');
}

// ─── INIT DEMO DAY ───────────────────────────────────────────
function initUnifiedDemoDay() {
  renderPresentationsToGrid('demoday-presentations-grid');
  renderVotingToGrid('demoday-voting-area');
  renderJuryScoresToContainer('demoday-jury-scores');
  startUnifiedFeed();
  startUnifiedJuryChat();
}

function renderPresentationsToGrid(targetId) {
  const container = document.getElementById(targetId);
  if (!container || typeof PRESENTATIONS === 'undefined') return;

  container.innerHTML = PRESENTATIONS.map(p => `
    <div class="pres-card" onclick="openUniModal('${p.teamId}')">
      <div class="pres-card-header">
        <div class="pres-team-icon" style="background: ${p.color}18; border: 1px solid ${p.color}30;">${p.icon}</div>
        <div class="pres-team-meta">
          <h3>${p.teamName}</h3>
          <span>${p.sector}</span>
        </div>
      </div>
      <div class="pres-card-body">
        <div class="pres-headline">${p.headline}</div>
        <div class="pres-summary">${p.summary}</div>
      </div>
      <div class="pres-card-footer">
        <span style="color: ${p.color}; font-weight:700;">${p.score.toLocaleString('pt-BR')} pts</span>
        <span class="pres-expand-btn">Ver detalhes →</span>
      </div>
    </div>
  `).join('');
}

function renderVotingToGrid(targetId) {
  const container = document.getElementById(targetId);
  if (!container || typeof PRESENTATIONS === 'undefined') return;

  container.innerHTML = PRESENTATIONS.map(p => `
    <div class="vote-option" id="uvote-${p.teamId}" onclick="selectUniVote('${p.teamId}')">
      <span class="vo-icon">${p.icon}</span>
      <div class="vo-team">${p.teamName}</div>
      <div class="vo-sector">${p.sector}</div>
      <div class="vo-pct" style="color: ${p.color};" id="uvpct-${p.teamId}">0%</div>
    </div>
  `).join('');
}

let uniSelectedVote = null;
let uniVoteSubmitted = false;

function selectUniVote(teamId) {
  if (uniVoteSubmitted) return;
  uniSelectedVote = teamId;
  document.querySelectorAll('#demoday-voting-area .vote-option').forEach(el => el.classList.remove('selected'));
  const target = document.getElementById(`uvote-${teamId}`);
  if (target) target.classList.add('selected');
}

function submitDemoDayVote() {
  if (!uniSelectedVote) {
    const feedback = document.getElementById('demoday-vote-feedback');
    feedback.textContent = '⚠️ Selecione um time para registrar seu voto.';
    feedback.style.color = '#FFB347';
    return;
  }
  if (uniVoteSubmitted) return;

  uniVoteSubmitted = true;
  const feedback = document.getElementById('demoday-vote-feedback');
  feedback.textContent = `🎉 Voto computado com sucesso no backend para ${uniSelectedVote.toUpperCase()}!`;
  feedback.style.color = 'var(--accent-green)';

  // REST API call
  try {
    fetch('http://localhost:7843/api/v1/demoday/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamId: uniSelectedVote })
    });
  } catch (e) {}

  document.querySelectorAll('#demoday-voting-area .vo-pct').forEach(el => el.style.display = 'block');
  updateUniVotePcts();
  revealUniWinnerStage();
}

function updateUniVotePcts() {
  const pcts = { alpha: '18%', beta: '14%', gamma: '8%', delta: '56%', omega: '4%' };
  Object.keys(pcts).forEach(id => {
    const el = document.getElementById(`uvpct-${id}`);
    if (el) el.textContent = pcts[id];
  });
}

function revealUniWinnerStage() {
  const stage = document.getElementById('demoday-winner-stage');
  if (!stage) return;
  stage.style.display = 'block';
  stage.innerHTML = `
    <div class="winner-stage-card" style="background: linear-gradient(135deg, rgba(0,255,178,0.08), rgba(108,99,255,0.08)); border: 1px solid rgba(0,255,178,0.3); border-radius: var(--radius-xl); padding: 40px; text-align: center;">
      <div style="font-size:2.5rem; margin-bottom:8px;">👑</div>
      <span style="font-size:0.75rem; font-weight:700; color:var(--accent-green); text-transform:uppercase; letter-spacing:0.12em;">Vencedor Confirmado</span>
      <h2 style="font-family:var(--font-display); font-size:2.4rem; font-weight:900; margin:8px 0 16px;">Delta Vision — Estratégia</h2>
      <p style="color:var(--text-secondary); max-width:600px; margin: 0 auto 24px;">"Do software ao ecossistema. 3x ARR em 18 meses. Proposta aprovada por unanimidade."</p>
      <button class="btn-launch" onclick="switchTab('synthesis')" style="padding:12px 32px;">✦ Ver Proposta Unificada na Síntese →</button>
    </div>
  `;
}

function renderJuryScoresToContainer(targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;
  container.innerHTML = `
    <div style="font-size:0.72rem; font-weight:700; color:var(--accent-purple); text-transform:uppercase; margin-bottom:8px;">Scores do Júri</div>
    <div style="font-size:0.8rem; color:var(--text-secondary);">1. Delta Vision: 96/100</div>
    <div style="font-size:0.8rem; color:var(--text-secondary);">2. Alpha Strike: 92/100</div>
    <div style="font-size:0.8rem; color:var(--text-secondary);">3. Beta Core: 91/100</div>
  `;
}

function startUnifiedFeed() {
  const feed = document.getElementById('demoday-live-feed');
  if (!feed || typeof FEED_MESSAGES === 'undefined') return;

  feed.innerHTML = FEED_MESSAGES.slice(0, 4).map(m => `
    <div class="feed-item">
      <div class="feed-avatar">${m.emoji}</div>
      <div class="feed-body">
        <div class="feed-meta">
          <span style="color:${m.color}; font-weight:700;">${m.agent}</span>
          <span class="feed-team-tag">${m.team}</span>
        </div>
        <div class="feed-message">${m.msg}</div>
      </div>
    </div>
  `).join('');
}

function startUnifiedJuryChat() {
  const chat = document.getElementById('demoday-jury-chat');
  if (!chat || typeof JURY_COMMENTS === 'undefined') return;

  chat.innerHTML = JURY_COMMENTS.slice(0, 3).map(c => `
    <div class="jc-msg" style="margin-bottom:10px;">
      <div class="jc-bubble" style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
        <span class="jc-text" style="font-size:0.8rem; color:var(--text-secondary);">${c.msg}</span>
      </div>
    </div>
  `).join('');
}

// ─── INIT SYNTHESIS ──────────────────────────────────────────
function initUnifiedSynthesis() {
  if (typeof renderEvaluators === 'function') renderEvaluators();
  if (typeof renderMatrix === 'function') renderMatrix();

  const matrixBox = document.getElementById('synthesis-matrix-container');
  if (matrixBox && typeof PROPOSALS_ANALYSIS !== 'undefined') {
    revealEvaluatorScores('marina', 0);
    revealAverages();
    revealExtracted();
  }

  renderUnifiedProposalToContainer('synthesis-unified-container');
}

function renderUnifiedProposalToContainer(targetId) {
  const container = document.getElementById(targetId);
  if (!container || typeof UNIFIED_PROPOSAL === 'undefined') return;

  const pillarsHTML = UNIFIED_PROPOSAL.pillars.map(pl => `
    <div class="pillar-card" style="--pillar-color: ${pl.color}; margin-bottom:16px;">
      <div class="pillar-source" style="background: ${pl.source.color}12; color: ${pl.source.color}; border-color: ${pl.source.color}30;">
        ✦ ${pl.source.name}
      </div>
      <span class="pillar-icon">${pl.icon}</span>
      <div class="pillar-title">${pl.title}</div>
      <div class="pillar-desc">${pl.desc}</div>
      <ul class="pillar-items">${pl.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>
  `).join('');

  container.innerHTML = `<div class="pillars-grid">${pillarsHTML}</div>`;
}

// ─── INIT SPRINT ─────────────────────────────────────────────
function initUnifiedSprint() {
  if (typeof renderTracks === 'function') renderTracks();
  if (typeof renderCheckpoints === 'function') renderCheckpoints();
}

function toggleUniSprint() {
  if (typeof toggleSprintExecution === 'function') {
    toggleSprintExecution();
  }
}

function fastForwardUniSprint() {
  if (typeof fastForwardSprint === 'function') {
    fastForwardSprint();
  }
}

// ─── UNIFIED MODAL ───────────────────────────────────────────
function openUniModal(teamId) {
  if (typeof openPresentation === 'function') {
    openPresentation(teamId);
  }
}

function closeUniModal() {
  const overlay = document.getElementById('uni-modal-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}
