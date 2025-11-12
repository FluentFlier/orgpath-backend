// frontend/js/dashboard.js
document.addEventListener("DOMContentLoaded", async () => {
  const API_BASE = "http://localhost:8080/api";

  // Retrieve stored login info
  const token = sessionStorage.getItem("orgpath_token");
  const user = JSON.parse(sessionStorage.getItem("orgpath_user") || "null");

  // Redirect if not logged in
  if (!token || !user) {
    alert("Session expired. Please log in again.");
    location.href = "index.html";
    return;
  }

  // Populate dashboard placeholders (basic)
  const nameEl = document.getElementById("emp-name");
  const referralEl = document.getElementById("emp-referral");
  if (nameEl) nameEl.textContent = user.first_name;
  if (referralEl) referralEl.textContent = user.referral_code;

  // 🔄 Fetch live dashboard data from backend
  try {
    const res = await fetch(`${API_BASE}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load dashboard data");

    // Update UI with backend info
    if (data.name && nameEl) nameEl.textContent = data.name;
    if (data.referral_code && referralEl) referralEl.textContent = data.referral_code;

    // If you later have “assessments” or “sessions”
    const list = document.getElementById("assessment-list");
    if (list) {
      list.innerHTML = "";
      if (data.assessments && data.assessments.length > 0) {
        data.assessments.forEach((a) => {
          const li = document.createElement("li");
          li.textContent = `Score: ${a.score} (on ${new Date(a.created_at).toLocaleDateString()})`;
          list.appendChild(li);
        });
      } else {
        list.innerHTML = "<li>No assessments yet.</li>";
      }
    }
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    alert("Could not load dashboard data. Please log in again.");
    sessionStorage.clear();
    location.href = "index.html";
  }

  // 🚪 Logout button
  const logoutBtn = document.getElementById("btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.clear();
      location.href = "index.html";
    });
  }
});
