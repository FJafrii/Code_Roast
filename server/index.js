const express = require('express');
const cors = require('cors');
const axios = require('axios'); // We use this to talk to Python

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🔥 Node Server is Running');
});

// The Real Roasting Route
app.post('/roast', async (req, res) => {
  const { code } = req.body;
  console.log("Received code. Sending to AI Brain...");

  try {
    // 1. Send code to Python AI (Port 5000)
    const aiResponse = await axios.post('http://127.0.0.1:5000/analyze', {
      code: code
    });
    
    // 2. Send the AI's answer back to React
    res.json({ roast: aiResponse.data.roast });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ roast: "My brain is disconnected. Check if Python is running!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});