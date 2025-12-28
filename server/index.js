require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import the new route file
const roastRoutes = require('./routes/roastRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Tell the app: "If anyone goes to /roast, let the roastRoutes handle it"
app.use('/roast', roastRoutes);

// Basic Health Check (Optional but good for deployment)
app.get('/', (req, res) => {
  res.send('🔥 Code Roaster API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});