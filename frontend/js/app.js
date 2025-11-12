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

  
  // --- REGISTER LOGIC (No changes) ---
  const createForm = document.getElementById('create-form');
  
  if (createForm) {
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault(); 
      if (!fakeCaptcha?.checked) {
        if (captchaError) {
          captchaError.classList.add('show');
          captchaError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          alert('Please verify that you are not a robot.');
        }
        return;
      }
      const formData = new FormData(createForm);
      const firstName = formData.get('name');
      const lastName = formData.get('lastName'); 
      const email = formData.get('email');
      const password = formData.get('password');
      const referralCode = formData.get('referral');

      createBtn.disabled = true;
      createBtn.textContent = "Creating Account...";

      try {
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
        if (!res.ok) throw new Error(data.error || "Failed to create account");

        sessionStorage.setItem("orgpath_token", data.token);
        sessionStorage.setItem("orgpath_user", JSON.stringify(data.user));

        if (data.user.role === 'employee') {
          window.location.href = 'employee-dashboard.html';
        } else {
          window.location.href = 'employee-dashboard.html';
        }
        
      } catch (err) {
        alert(`Registration Error: ${err.message}`);
        createBtn.disabled = false;
        createBtn.textContent = "Create Account";
      }
    });
  }


  // --- START: MODIFIED LOGIN LOGIC ---
  const loginForm = document.getElementById('login-form');
  const loginBtn = loginForm?.querySelector('button[type="submit"]');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // 1. Get form data
      const formData = new FormData(loginForm);
      const identifier = formData.get('identifier'); // This is 'Username or Email'
      const password = formData.get('password');

      if (!identifier || !password) {
        alert("Please enter your email/username and password.");
        return;
      }

      // 2. Disable button, show loading
      if(loginBtn) loginBtn.disabled = true;
      if(loginBtn) loginBtn.textContent = "Logging in...";

      try {
        // 3. Make REAL API call to the login endpoint
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          // Show error from backend (e.g., "Invalid credentials")
          throw new Error(data.error || "Failed to log in");
        }

        // 4. SUCCESS! Save token and user
        sessionStorage.setItem("orgpath_token", data.token);
        sessionStorage.setItem("orgpath_user", JSON.stringify(data.user));

        // 5. Redirect to dashboard
        if (data.user.role === 'employee') {
          window.location.href = 'employee-dashboard.html';
        } else {
          // Handle other roles later
          window.location.href = 'employee-dashboard.html';
        }

      } catch (err) {
        alert(`Login Error: ${err.message}`);
        if(loginBtn) loginBtn.disabled = false;
        if(loginBtn) loginBtn.textContent = "Login";
      }
    });
  }
  // --- END: MODIFIED LOGIN LOGIC ---
});


// ========== EMPLOYEE DASHBOARD (No changes) ==========
// This logic is in frontend/js/dashboard.js, but we'll leave this
// simple version in app.js for any dashboards that haven't been split.
if (location.pathname.endsWith('employee-dashboard.html')) {
  
  const token = sessionStorage.getItem('orgpath_token');
  const user = JSON.parse(sessionStorage.getItem('orgpath_user') || 'null');

  if (!token || !user || user.role !== 'employee') {
    sessionStorage.clear();
    location.href = 'index.html';
  } else {
    const nameEl = document.getElementById('emp-name');
    const refEl  = document.getElementById('emp-referral');
    if (nameEl) nameEl.textContent = user.first_name;
    if (refEl)  refEl.textContent  = user.referral_code;
  }

  document.getElementById('btn-logout')?.addEventListener('click', () => {
    sessionStorage.clear();
    location.href = 'index.html';
  });

  // ===== PRICING MODAL (No changes) =====
  const modal   = document.getElementById('pricing-modal');
  const openBtn = document.getElementById('btn-new-session');
  function openModal(){ modal?.classList.remove('hidden'); }
  function closeModal(){ modal?.classList.add('hidden'); }
  openBtn?.addEventListener('click', openModal);
  modal?.addEventListener('click', (e) => {
    if (e.target.matches('[data-close="pricing-modal"], .modal-backdrop')) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  
  // ===== NEW SESSION TILE (No changes) =====
  const planLabel = { org: 'OrgInsights Assessment', '360': '360 Assessment', combo: 'OrgInsights + 360' };
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
  modal?.addEventListener('click', (e) => {
    const btn = e.target.closest('.pc-cta');
    if (!btn) return;
    const plan = btn.dataset.plan;
    const label = planLabel[plan];
    if (!label) return;
    addSessionTile(label, plan);
    closeModal();
  });
  document.querySelector('.session-grid')?.addEventListener('click', (e) => {
    const startBtn = e.target.closest('.btn-start');
    if (!startBtn) return;
    const plan = startBtn.dataset.start;
    console.log('Start clicked for plan:', plan);
  });
}