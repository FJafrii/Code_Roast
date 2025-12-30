const express = require('express');
const axios = require('axios');
const router = express.Router();

// ✅ IMPROVEMENT: Try to load from .env, but fallback to localhost if it fails.
// This prevents the "undefined" URL crash you had earlier.
const PYTHON_API_BASE = process.env.AI_SERVICE_URL || 'http://127.0.0.1:5000';

// Helper function to validate input
const validateInput = (req, res, next) => {
  if (!req.body.code || req.body.code.trim() === "") {
    return res.status(400).json({ error: "Please provide some code." });
  }
  next();
};

// 1. ROAST ROUTE
router.post('/', validateInput, async (req, res) => {
  const { code, mode } = req.body;
  
  try {
    const aiResponse = await axios.post(`${PYTHON_API_BASE}/analyze`, {
      code,
      mode: mode || "savage"
    });
    res.json({ roast: aiResponse.data.roast });
  } catch (error) {
    console.error("❌ Roast Error:", error.message);
    res.status(500).json({ error: "AI Service Offline" });
  }
});

// 2. FIX ROUTE
router.post('/fix', validateInput, async (req, res) => {
  const { code, context } = req.body; 

  try {
    // Keep this debug log, it's very useful
    console.log(`🔥 Sending request to ${PYTHON_API_BASE}/fix`);

    const aiResponse = await axios.post(`${PYTHON_API_BASE}/fix`, {
      code,
      context: context || "Fix this code"
    });
    res.json({ fix: aiResponse.data.fix });

  } catch (error) {
    console.error("❌ Fix Error:", error.message);
    res.status(500).json({ error: "Failed to fix code" });
  }
});

module.exports = router;