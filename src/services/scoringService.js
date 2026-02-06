// src/services/scoringService.js

// Mapping of Categories to their Capabilities
const CATEGORY_MAP = {
  "Limits Risk": [
    "Establishes Governance",
    "Manages Risk",
    "Reasons Critically and Solves Problems",
    "Scans for Politicals and Internal Impacts"
  ],
  "Embraces Agility": [
    "Empowers Team Effectiveness",
    "Leads and Embraces Change",
    "Navigates Policies and People",
    "Plans for the Future",
    "Thrives in Chaos"
  ],
  "Achieves Excellence": [
    "Develops Talent",
    "Drives Performance and Productivity",
    "Evolves With Technology",
    "Exercises Sound Judgement/Consulting",
    "Takes Ownership"
  ],
  "Develops Relationships": [
    "Creates Alliances",
    "Demonstrates Empathy",
    "Focuses on Customers",
    "Influences Responsibly",
    "Resolves Conflicts"
  ],
  "Sets Purpose": [
    "Communicates Clarity",
    "Embraces Diversity",
    "Inspires Others",
    "Moves Data to Action"
  ]
};

// Helper: Calculate Average
const calculateAverage = (arr) => {
  if (!arr || arr.length === 0) return 0;
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
};

export const calculateAssessmentScores = (responses) => {
  // responses: [{ category: "Limits Risk", capability: "Manages Risk", value: 4 }, ...]

  const capabilityScores = {};
  const categoryScores = {};
  const rawGrouped = {};

  // 1. Group raw scores by Capability
  responses.forEach((res) => {
    const key = res.capability;
    if (!rawGrouped[key]) rawGrouped[key] = [];
    
    // Logic: Convert 1-5 scale to Percentage (0.2 - 1.0)
    const normalizedScore = res.value / 5;
    rawGrouped[key].push(normalizedScore);
  });

  // 2. Calculate Average for each Capability
  for (const [capName, scores] of Object.entries(rawGrouped)) {
    capabilityScores[capName] = parseFloat(calculateAverage(scores).toFixed(2));
  }

  // 3. Calculate Average for each Category
  for (const [catName, capabilities] of Object.entries(CATEGORY_MAP)) {
    const capScoresInCategory = [];
    capabilities.forEach(cap => {
      if (capabilityScores[cap] !== undefined) {
        capScoresInCategory.push(capabilityScores[cap]);
      }
    });

    if (capScoresInCategory.length > 0) {
      categoryScores[catName] = parseFloat(calculateAverage(capScoresInCategory).toFixed(2));
    } else {
      categoryScores[catName] = 0;
    }
  }

  // 4. Calculate Overall Score
  const allCatScores = Object.values(categoryScores);
  const overallScore = parseFloat(calculateAverage(allCatScores).toFixed(2));

  return {
    overall_score: overallScore,
    category_scores: categoryScores,
    capability_scores: capabilityScores
  };
};