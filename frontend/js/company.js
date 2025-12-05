// js/company.js
(async function () {
  const API_BASE = "http://localhost:8080/api";

  // 1. Auth & Session Check
  const token = sessionStorage.getItem('orgpath_token');
  const userJson = sessionStorage.getItem('orgpath_user');

  if (!token || !userJson) {
    location.href = 'index.html';
    return;
  }

  let user;
  try {
    user = JSON.parse(userJson);
  } catch {
    location.href = 'index.html';
    return;
  }

  if (user.role !== 'company') {
    location.href = 'index.html'; // Redirect if not company
    return;
  }

  // 2. Sidebar & Logout Logic
  const COLLAPSE_KEY = 'orgi_side_collapsed';
  function applyCollapsedState() {
    const collapsed = sessionStorage.getItem(COLLAPSE_KEY) === '1';
    document.body.classList.toggle('side-collapsed', collapsed);
  }
  applyCollapsedState();

  document.getElementById('btn-collapse')?.addEventListener('click', () => {
    const now = !(sessionStorage.getItem(COLLAPSE_KEY) === '1');
    sessionStorage.setItem(COLLAPSE_KEY, now ? '1' : '0');
    applyCollapsedState();
  });

  document.getElementById('btn-logout')?.addEventListener('click', () => {
    sessionStorage.clear();
    location.href = 'index.html';
  });

  // 3. Fetch & Populate Data
  async function loadCompanyDashboard() {
    try {
      console.log("Fetching company data...");
      const res = await fetch(`${API_BASE}/company/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to load dashboard");
      const data = await res.json();

      // --- Update UI Elements ---

      // Completion
      setText('valTotalCompletion', data.completion.total);
      setText('valMale', data.completion.male + '%');
      setText('valFemale', data.completion.female + '%');
      setBar('barMale', data.completion.male);
      setBar('barFemale', data.completion.female);

      // Roles
      setText('valGrad', data.roles.graduate);
      setText('valJun', data.roles.junior);
      setText('valCons', data.roles.consultant);
      setText('valSen', data.roles.senior);
      setText('valMgr', data.roles.manager);
      setText('valExec', data.roles.executive);

      // Health
      setText('valOrgHealth', data.health.org + '%');
      setText('valCollab', data.health.collab + '%');
      setText('valAdapt', data.health.adaptability + '%');

      // High Pot & Capability
      setText('valHiPotPct', data.highPotential.percent + '%');
      setText('valHiPotCnt', `(${data.highPotential.count})`);

      setText('valCapable', data.capability.capable + '%');
      setText('valNotReady', data.capability.notReady + '%');

      // Update the width of the split bar
      const barNo = document.getElementById('barNotReady');
      const barYes = document.getElementById('barCapable');
      if (barNo && barYes) {
        barNo.style.width = data.capability.notReady + '%';
        barYes.style.width = data.capability.capable + '%';
      }

      // Retention
      setText('valRetention', data.retention + '%');

    } catch (err) {
      console.error(err);
    }
  }

  // Helper
  function setText(id, txt) {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  }
  function setBar(id, pct) {
    const el = document.getElementById(id);
    if (el) el.style.setProperty('--p', pct + '%');
  }

  await loadCompanyDashboard();

  // 4. File Upload Logic
  const btnUpload = document.getElementById('btnUpload');
  const fileInput = document.getElementById('fileInput');
  const uploadStatus = document.getElementById('uploadStatus');

  if (btnUpload && fileInput) {
    btnUpload.addEventListener('click', async () => {
      const file = fileInput.files[0];
      if (!file) {
        uploadStatus.textContent = "Please select a file.";
        uploadStatus.style.color = "red";
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      uploadStatus.textContent = "Uploading...";
      uploadStatus.style.color = "#666";
      btnUpload.disabled = true;

      try {
        const res = await fetch(`${API_BASE}/ingestion/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });

        const data = await res.json();

        if (res.ok) {
          uploadStatus.textContent = `Success! Job ID: ${data.jobId}`;
          uploadStatus.style.color = "green";
          fileInput.value = ""; // Clear input
        } else {
          throw new Error(data.error || "Upload failed");
        }
      } catch (err) {
        console.error(err);
        uploadStatus.textContent = "Error: " + err.message;
        uploadStatus.style.color = "red";
      } finally {
        btnUpload.disabled = false;
      }
    });
  }
})();