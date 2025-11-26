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

    // Update user info
    if (data.user) {
      if (data.user.name && nameEl) {
        nameEl.textContent = data.user.name.split(' ')[0]; // First name only
      }
      if (data.user.referral_code && referralEl) {
        referralEl.textContent = data.user.referral_code;
      }
    }

    // Update statistics cards
    if (data.stats) {
      const totalEl = document.getElementById("total-assessments");
      const avgEl = document.getElementById("avg-score");
      const latestEl = document.getElementById("latest-score");
      const trendEl = document.getElementById("trend-indicator");

      if (totalEl) totalEl.textContent = data.stats.total || 0;
      if (avgEl) avgEl.textContent = data.stats.average ? data.stats.average.toFixed(1) : "0";
      if (latestEl) latestEl.textContent = data.stats.latest ? data.stats.latest.toFixed(1) : "N/A";
      if (trendEl) trendEl.textContent = data.stats.trend || "—";
    }

    // Render charts
    if (data.assessments && data.assessments.length > 0) {
      renderCharts(data.assessments);
    } else {
      // Show placeholder message if no data
      const lineChartCanvas = document.getElementById("scoreLineChart");
      const barChartCanvas = document.getElementById("scoreBarChart");

      if (lineChartCanvas) {
        const ctx = lineChartCanvas.getContext("2d");
        ctx.font = "16px Arial";
        ctx.fillStyle = "#999";
        ctx.textAlign = "center";
        ctx.fillText("No assessment data yet", lineChartCanvas.width / 2, lineChartCanvas.height / 2);
      }

      if (barChartCanvas) {
        const ctx = barChartCanvas.getContext("2d");
        ctx.font = "16px Arial";
        ctx.fillStyle = "#999";
        ctx.textAlign = "center";
        ctx.fillText("No assessment data yet", barChartCanvas.width / 2, barChartCanvas.height / 2);
      }
    }

  } catch (err) {
    console.error("Dashboard fetch error:", err);
    alert("Could not load dashboard data. Please try again.");
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

/**
 * Renders Chart.js visualizations
 * @param {Array} assessments - Array of assessment objects with score and created_at
 */
function renderCharts(assessments) {
  // Sort by date (oldest first for chronological display)
  const sortedData = [...assessments].reverse();

  // Prepare data for line chart (score over time)
  const labels = sortedData.map((a, idx) => {
    const date = new Date(a.created_at);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  const scores = sortedData.map(a => a.score);

  // 📈 Line Chart - Score Trend
  const lineCtx = document.getElementById("scoreLineChart");
  if (lineCtx) {
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Assessment Score',
          data: scores,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Score'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    });
  }

  // 📊 Bar Chart - Score Distribution
  const barCtx = document.getElementById("scoreBarChart");
  if (barCtx) {
    // Create score ranges (0-20, 21-40, 41-60, 61-80, 81-100)
    const ranges = ['0-20', '21-40', '41-60', '61-80', '81-100'];
    const rangeCounts = [0, 0, 0, 0, 0];

    scores.forEach(score => {
      if (score >= 0 && score <= 20) rangeCounts[0]++;
      else if (score >= 21 && score <= 40) rangeCounts[1]++;
      else if (score >= 41 && score <= 60) rangeCounts[2]++;
      else if (score >= 61 && score <= 80) rangeCounts[3]++;
      else if (score >= 81 && score <= 100) rangeCounts[4]++;
    });

    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ranges,
        datasets: [{
          label: 'Number of Assessments',
          data: rangeCounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 205, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Assessments: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
            title: {
              display: true,
              text: 'Count'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Score Range'
            }
          }
        }
      }
    });
  }
}
