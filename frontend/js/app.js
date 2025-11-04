

// ========== LOGIN / REGISTER PAGE ==========
document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = "http://localhost:8080/api";
  // one and only one of each panel
  const panels = {
    login: document.getElementById('panel-login'),
    create: document.getElementById('panel-create'),
  };
  const tabs = document.querySelectorAll('.tab');
  const titleEl = document.getElementById('pageTitle') || document.querySelector('.page-title');

  function show(mode) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === mode));
    Object.entries(panels).forEach(([k, el]) => el.classList.toggle('hidden', k !== mode));
    titleEl.textContent = (mode === 'login') ? 'Login' : 'Register';
  }

  tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.tab)));

  const hash = (location.hash || '').toLowerCase();
  show(hash.includes('create') ? 'create' : 'login');

  // ===== reCAPTCHA =====
  const fakeCaptcha  = document.getElementById('fake-captcha');
  const createBtn    = document.querySelector('#panel-create .btn.btn-green');
  const captchaError = document.getElementById('captcha-error');

  function updateCreateEnabled() {
    if (!createBtn) return;
    const ok = !!fakeCaptcha?.checked;
    createBtn.disabled = !ok;
    if (captchaError) captchaError.classList.toggle('show', !ok);
  }

  updateCreateEnabled();
  fakeCaptcha?.addEventListener('change', updateCreateEnabled);

  // ===== REGISTER ROUTING =====
  const createForm =
    document.getElementById('create-form') ||
    document.querySelector('#panel-create form');

  const nameInput =
    document.getElementById('name') ||
    document.querySelector('#panel-create input[name="name"]');

  const referralInput =
    document.getElementById('referral-code') ||
    document.querySelector('#panel-create input[name="referral"]');

  function roleFromReferral(code) {
    if (!code) return null;
    const ch = String(code).trim().charAt(0).toUpperCase();
    if (ch === 'A') return 'employee';
    if (ch === 'B') return 'lead';
    if (ch === 'C') return 'company';
    return null;
  }

  if (createForm && referralInput) {
    createForm.addEventListener('submit', (e) => {
      if (!fakeCaptcha?.checked) {
        e.preventDefault();
        if (captchaError) {
          captchaError.classList.add('show');
          captchaError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          alert('Please verify that you are not a robot.');
        }
        return;
      }

      e.preventDefault();

      const name = (nameInput?.value || 'User').trim();
      const referral = (referralInput.value || '').trim();
      const role = roleFromReferral(referral);

      if (!role) {
        alert('Referral should start with A / B / C');
        return;
      }

      sessionStorage.setItem(
        'orgi_session',
        JSON.stringify({ name, referral, role })
      );

      if (role === 'employee') {
        window.location.href = 'employee-dashboard.html';
      } else if (role === 'lead') {
        window.location.href = 'teamlead-dashboard.html';
      } else {
        window.location.href = 'company-dashboard.html';
      }
    });
  }
});



// ========== EMPLOYEE DASHBOARD ==========
if (location.pathname.endsWith('employee-dashboard.html')) {
  const data = JSON.parse(sessionStorage.getItem('orgi_session') || 'null');

  if (!data || data.role !== 'employee') {
    location.href = 'index.html';
  } else {
    const nameEl = document.getElementById('emp-name');
    const refEl  = document.getElementById('emp-referral');
    if (nameEl) nameEl.textContent = data.name;
    if (refEl)  refEl.textContent  = data.referral;
  }

  // Logout
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    sessionStorage.clear();
    location.href = 'index.html';
  });

  // ===== PRICING MODAL =====
  const modal   = document.getElementById('pricing-modal');
  const openBtn = document.getElementById('btn-new-session');

  function openModal(){ modal?.classList.remove('hidden'); modal?.setAttribute('aria-hidden','false'); }
  function closeModal(){ modal?.classList.add('hidden'); modal?.setAttribute('aria-hidden','true'); }

  openBtn?.addEventListener('click', openModal);

  // close on [×] or backdrop
  modal?.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.matches('[data-close="pricing-modal"], .modal-backdrop')) {
      closeModal();
    }
  });

  // close on Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // ===== NEW SESSION TILE (clone create tile; insert LEFT of it) =====
  const planLabel = {
    org:   'OrgInsights Assessment',
    '360': '360 Assessment',
    combo: 'OrgInsights + 360'
  };

  function addSessionTile(label, planKey) {
    const grid = document.querySelector('.session-grid');
    const createTile = document.getElementById('btn-new-session');
    if (!grid || !createTile) return;
  
    // clone the create tile so size/spacing match perfectly
    const tile = createTile.cloneNode(false); // shallow clone—we’ll set our own content
    tile.id = '';                             // no duplicate id
    tile.classList.add('card-session');       // styling hook
    tile.type = 'button';                     // keep as button for identical look
  
    // content: centered title + rounded "start" button at the bottom
    tile.innerHTML = `
      <div class="card-session-inner">
        <div class="card-title">${label}</div>
        <div class="card-actions">
          <button class="btn-start" data-start="${planKey}">start</button>
        </div>
      </div>
    `;
  
    // insert BEFORE the create tile → appears to the LEFT
    grid.insertBefore(tile, createTile);
  }
  
  // handle clicks on any PAY NOW in the modal
  modal?.addEventListener('click', (e) => {
    const btn = e.target.closest('.pc-cta');
    if (!btn) return;
  
    const plan = btn.dataset.plan;              // "org" | "360" | "combo"
    const label = planLabel[plan];
    if (!label) return;
  
    addSessionTile(label, plan);
    closeModal();
  });
  
  // (optional) hook for the "start" button – wire your real route later
  document.querySelector('.session-grid')?.addEventListener('click', (e) => {
    const startBtn = e.target.closest('.btn-start');
    if (!startBtn) return;
  
    const plan = startBtn.dataset.start;        // "org" | "360" | "combo"
    // TODO: replace with your real start route
    // window.location.href = `assessment-${plan}.html`;
    console.log('Start clicked for plan:', plan);
  });
}
