// frontend/js/dashboard.js
document.addEventListener("DOMContentLoaded", async () => {
  const API_BASE = "http://localhost:8080/api";

  // 1. Get token and user from sessionStorage
  const token = sessionStorage.getItem("orgpath_token");
  const user = JSON.parse(sessionStorage.getItem("orgpath_user") || "null");

  // 2. Redirect if not logged in
  if (!token || !user) {
    alert("Session expired. Please log in again.");
    sessionStorage.clear();
    location.href = "index.html";
    return;
  }

  // 3. Populate dashboard placeholders
  const nameEl = document.getElementById("emp-name");
  const referralEl = document.getElementById("emp-referral");
  if (nameEl) nameEl.textContent = user.first_name;
  if (referralEl) referralEl.textContent = user.referral_code;

  // 4. Function to fetch and display real assessments
  const assessmentGrid = document.querySelector('.session-grid');
  const createTile = document.getElementById('btn-new-session');
  
  async function loadAssessments() {
    try {
      const res = await fetch(`${API_BASE}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load dashboard");

      // Clear any old assessment tiles
      document.querySelectorAll('.card-session').forEach(tile => tile.remove());

      if (data.assessments && data.assessments.length > 0) {
        data.assessments.forEach((a) => {
          // Format score as percentage (e.g., 0.6 -> 60%)
          const pctScore = a.score ? (parseFloat(a.score) * 100).toFixed(0) + "%" : "In Progress";
          
          addSessionTile(
            a.id, // Pass ID
            `Assessment #${a.id}`,
            pctScore,
            new Date(a.created_at).toLocaleDateString()
          );
        });
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  }

  // 5. Helper function to add assessment tiles to the page
  function addSessionTile(id, title, score, date) {
    if (!assessmentGrid || !createTile) return;
    
    const tile = document.createElement('div');
    tile.className = 'card-session'; 
  
    // Notice we changed the "Continue" button to a "Download" button!
    tile.innerHTML = `
      <div class="card-session-inner">
        <div class="card-title">${title}</div>
        <div style="text-align: center; margin: 10px 0;">
          <div style="font-size: 28px; font-weight: 800; color: #0f8f2f;">${score}</div>
          <div style="font-size: 14px; color: #666;">Completed: ${date}</div>
        </div>
        <div class="card-actions">
          <button class="btn-start" onclick="downloadEmployeeReport(${id})" style="width:100%; border-color: #1e88e5; color: #1e88e5;">
            📄 Download PDF
          </button>
        </div>
      </div>
    `;
    // Insert new tile *before* the "Create" button
    assessmentGrid.insertBefore(tile, createTile);
  }

  // 6. Global Download Function (Attached to window so the button can see it)
  window.downloadEmployeeReport = async function(id) {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "Downloading...";
    btn.disabled = true;

    try {
        const res = await fetch(`${API_BASE}/assessment/${id}/report`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to download PDF");

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `My-OrgPath-Report-${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (err) {
        alert(err.message);
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
  };

  // 7. Logout Button
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    sessionStorage.clear();
    location.href = "index.html";
  });

  // 8. Modal Open/Close Logic
  const modal = document.getElementById('pricing-modal');
  const openBtn = document.getElementById('btn-new-session');
  function openModal() { modal?.classList.remove('hidden'); }
  function closeModal() { modal?.classList.add('hidden'); }
  openBtn?.addEventListener('click', openModal);
  modal?.addEventListener('click', (e) => {
    if (e.target.matches('[data-close="pricing-modal"], .modal-backdrop')) {
      closeModal();
    }
  });

  // 9. --- FIXED "PAY NOW" API LOGIC ---
  modal?.addEventListener('click', async (e) => {
    const btn = e.target.closest('.pc-cta');
    if (!btn) return;

    btn.textContent = "Processing...";

    // We send REAL structured data to test the actual Math Engine
    const realResponses = [
        { category: "Limits Risk", capability: "Manages Risk", value: 5 },
        { category: "Embraces Agility", capability: "Thrives in Chaos", value: 4 },
        { category: "Achieves Excellence", capability: "Develops Talent", value: 3 },
        { category: "Develops Relationships", capability: "Resolves Conflicts", value: 2 },
        { category: "Sets Purpose", capability: "Inspires Others", value: 1 }
    ];

    try {
      const res = await fetch(`${API_BASE}/assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          assessment_type: "self",
          responses: realResponses
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create assessment");

      // It worked! Close the modal, fix the button, and reload the tiles
      btn.textContent = "PAY NOW";
      closeModal();
      await loadAssessments(); 

    } catch (err) {
      alert(`Error: ${err.message}`);
      btn.textContent = "PAY NOW";
    }
  });

  // Finally, load the assessments when the page first opens
  await loadAssessments();
});