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

      // Clear any old/fake assessment tiles
      document.querySelectorAll('.card-session').forEach(tile => tile.remove());

      // This is our code from src/routes/dashboard.js!
      if (data.assessments && data.assessments.length > 0) {
        data.assessments.forEach((a) => {
          // Add a tile for each *real* assessment
          addSessionTile(
            `Assessment #${a.id}`, // Label
            `Score: ${a.score || 'In Progress'}`, // Score
            new Date(a.created_at).toLocaleDateString() // Date
          );
        });
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      alert("Could not load dashboard data. Please log in again.");
      sessionStorage.clear();
      location.href = "index.html";
    }
  }

  // 5. Helper function to add assessment tiles to the page
  function addSessionTile(title, score, date) {
    if (!assessmentGrid || !createTile) return;
    
    const tile = document.createElement('div');
    tile.className = 'card-session'; // Use class from styles.css
  
    tile.innerHTML = `
      <div class="card-session-inner">
        <div class="card-title">${title}</div>
        <div style="text-align: center; margin: 10px 0;">
          <div><strong>${score}</strong></div>
          <div style="font-size: 14px; color: #666;">${date}</div>
        </div>
        <div class="card-actions">
          <button class="btn-start" disabled>Continue</button>
        </div>
      </div>
    `;
    // Insert new tile *before* the "Create" button
    assessmentGrid.insertBefore(tile, createTile);
  }

  // 6. Logout Button
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    sessionStorage.clear();
    location.href = 'index.html';
  });

  // 7. Modal Open/Close Logic (from app.js)
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

  // 8. --- NEW --- Hook up the "PAY NOW" button to the API
  modal?.addEventListener('click', async (e) => {
    const btn = e.target.closest('.pc-cta');
    if (!btn) return;

    // We'll just create a fake assessment with a random score for now
    const fakeResponses = { q1: "answer", q2: 4 };
    const fakeScore = Math.floor(Math.random() * (95 - 75 + 1)) + 75; // Score between 75-95

    try {
      const res = await fetch(`${API_BASE}/assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          responses: fakeResponses,
          score: fakeScore
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create assessment");

      // It worked! Close the modal and reload the dashboard
      closeModal();
      await loadAssessments(); // Re-fetch to show the new assessment

    } catch (err) {
      alert(`Error creating assessment: ${err.message}`);
    }
  });

  // ---
  // Finally, load the assessments when the page first opens
  await loadAssessments();
});