const express = require('express'); // <--- Missing
const axios = require('axios');     // <--- Missing
const router = express.Router();    // <--- This defines 'router'

// NOW you can use router.post
router.post('/', async (req, res) => {
  // 1. Get 'mode' from the request body (along with code)
  const { code, mode } = req.body; 
  // 👇 ADD THIS SPY LOG 👇
  console.log("--------------------------------");
  console.log("📨 INCOMING REQUEST:");
  console.log("Mode:", mode); // This should say 'gentle', 'strict', or 'savage'
  console.log("--------------------------------");

  try {
    const aiUrl = process.env.AI_SERVICE_URL;

    if (!aiUrl) {
      throw new Error("SERVER ERROR: AI_SERVICE_URL is missing in .env file");
    }

    // 2. Pass 'mode' along to the Python AI
    const aiResponse = await axios.post(aiUrl, {
      code: code,
      mode: mode || "savage" // Default to savage if missing
    });

    const roast = aiResponse.data.roast;
    res.json({ roast });

  } catch (error) {
    console.error("Error roasting code:", error.message);
    res.status(500).json({ error: "Something went wrong processing your roast." });
  }
});

module.exports = router;