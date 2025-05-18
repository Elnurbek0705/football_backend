require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// Ruxsat berilgan frontend domenlari ro'yxati
const allowedOrigins = [
  "https://football-frontend-wheat.vercel.app",
  "https://football-frontend-ilmnur-ea.vercel.app"
];

// CORS middleware sozlamasi
app.use(cors({
  origin: function(origin, callback) {
    // Postman yoki backenddan keladigan so'rovlar origin bo'lmasligi mumkin
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: origin ${origin} not allowed`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,  // cookie va auth kerak bo'lsa true
}));

// API kalit va baza URL
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

// Yo‘nalishlar (routes)

app.get("/api/matches", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/matches`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/competitions/:code/matches", async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${BASE_URL}/competitions/${code}/matches`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/teams/:id/matches", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/teams/${id}/matches?status=SCHEDULED`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/competitions", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/competitions`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/competitions/:id/standings", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/competitions/${id}/standings`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/competitions/:code/scorers", async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${BASE_URL}/competitions/${code}/scorers`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server ishga tushishi
app.listen(PORT, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`);
});
