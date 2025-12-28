const express = require('express');
const axios = require('axios');
const router = express.Router();

// This handles the POST request to '/' (which will be mounted at /roast)
router.post('/', async (req, res) => {
  const { code } = req.body;

  try {
    // 1. Get the URL from the .env file
    const aiUrl = process.env.AI_SERVICE_URL;

    // Safety Check
    if (!aiUrl) {
      throw new Error("SERVER ERROR: AI_SERVICE_URL is missing in .env file");
    }

    // 2. Call the AI Service
    const aiResponse = await axios.post(aiUrl, {
      code: code
    });

    const roast = aiResponse.data.roast;
    res.json({ roast });

  } catch (error) {
    console.error("Error roasting code:", error.message);
    res.status(500).json({ error: "Something went wrong processing your roast." });
  }
});

module.exports = router;