// ========== LOGIN / REGISTER PAGE ==========
document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = "http://localhost:8080/api";

  // --- Panel/Tab switching (no changes) ---
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

  // --- reCAPTCHA (no changes) ---
  const fakeCaptcha = document.getElementById('fake-captcha');
  const createBtn = document.querySelector('#panel-create .btn.btn-green');
  const captchaError = document.getElementById('captcha-error');
  function updateCreateEnabled() {
    if (!createBtn) return;
    const ok = !!fakeCaptcha?.checked;
    createBtn.disabled = !ok;
    if (captchaError) captchaError.classList.toggle('show', !ok);
  }
  updateCreateEnabled();
  fakeCaptcha?.addEventListener('change', updateCreateEnabled);

  
  // --- START: MODIFIED REGISTER LOGIC ---
  const createForm = document.getElementById('create-form');
  
  if (createForm) {
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Stop default form submission

      // 1. Check Captcha
      if (!fakeCaptcha?.checked) {
        if (captchaError) {
          captchaError.classList.add('show');
          captchaError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          alert('Please verify that you are not a robot.');
        }
        return;
      }

      // 2. Get form data
      const formData = new FormData(createForm);
      const firstName = formData.get('name');
      // We will add name="lastName" to the HTML
      const lastName = formData.get('lastName'); 
      const email = formData.get('email');
      const password = formData.get('password');
      const referralCode = formData.get('referral');

      // 3. Disable button, show loading
      createBtn.disabled = true;
      createBtn.textContent = "Creating Account...";

      try {
        // 4. Make REAL API call
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            referralCode
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          // Show error from backend (e.g., "User already exists")
          throw new Error(data.error || "Failed to create account");
        }

        // 5. SUCCESS! Save token and user, then redirect
        sessionStorage.setItem("orgpath_token", data.token);
        sessionStorage.setItem("orgpath_user", JSON.stringify(data.user));

        // Redirect based on role
        if (data.user.role === 'employee') {
          window.location.href = 'employee-dashboard.html';
        } else {
          // Handle lead/company roles later
          window.location.href = 'employee-dashboard.html';
        }
        
      } catch (err) {
        alert(`Registration Error: ${err.message}`);
        // Re-enable button on failure
        createBtn.disabled = false;
        createBtn.textContent = "Create Account";
      }
    });
  }
  // --- END: MODIFIED REGISTER LOGIC ---


  // --- START: LOGIN LOGIC (Not implemented, but listener is here) ---
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // TODO: Implement login fetch call to POST /api/auth/login
      // 1. Get identifier (username/email) and password from form
      // 2. Fetch POST /api/auth/login
      // 3. On success, save token/user to sessionStorage
      // 4. Redirect to dashboard
      alert("Login is not implemented yet. Please use 'Create Account'.");
    });
  }

});


// ========== EMPLOYEE DASHBOARD ==========
// This logic is now in frontend/js/dashboard.js, but we'll update
// this one to use the new keys just in case.
if (location.pathname.endsWith('employee-dashboard.html')) {
  
  // Use the NEW session keys
  const token = sessionStorage.getItem('orgpath_token');
  const user = JSON.parse(sessionStorage.getItem('orgpath_user') || 'null');

  // Redirect if not logged in
  if (!token || !user || user.role !== 'employee') {
    sessionStorage.clear(); // Clear bad data
    location.href = 'index.html';
  } else {
    // Populate from the REAL user object
    const nameEl = document.getElementById('emp-name');
    const refEl  = document.getElementById('emp-referral');
    if (nameEl) nameEl.textContent = user.first_name;
    if (refEl)  refEl.textContent  = user.referral_code;
  }

  // Logout
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    sessionStorage.clear();
    location.href = 'index.html';
  });

  // ===== PRICING MODAL (No changes) =====
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

  // ===== NEW SESSION TILE (No changes) =====
  const planLabel = {
    org:   'OrgInsights Assessment',
    '360': '360 Assessment',
    combo: 'OrgInsights + 360'
  };

  function addSessionTile(label, planKey) {
    const grid = document.querySelector('.session-grid');
    const createTile = document.getElementById('btn-new-session');
    if (!grid || !createTile) return;
  
    const tile = createTile.cloneNode(false);
    tile.id = '';
    tile.classList.add('card-session');
    tile.type = 'button';
  
    tile.innerHTML = `
      <div class="card-session-inner">
        <div class="card-title">${label}</div>
        <div class.card-actions">
          <button class="btn-start" data-start="${planKey}">start</button>
        </div>
      </div>
    `;
  
    grid.insertBefore(tile, createTile);
  }
  
  // handle clicks on any PAY NOW in the modal
  modal?.addEventListener('click', (e) => {
    const btn = e.target.closest('.pc-cta');
    if (!btn) return;
  
    const plan = btn.dataset.plan;
    const label = planLabel[plan];
    if (!label) return;
  
    addSessionTile(label, plan);
    closeModal();
  });
  
  // (optional) hook for the "start" button
  document.querySelector('.session-grid')?.addEventListener('click', (e) => {
    const startBtn = e.target.closest('.btn-start');
    if (!startBtn) return;
  
    const plan = startBtn.dataset.start;
    console.log('Start clicked for plan:', plan);
  });
}