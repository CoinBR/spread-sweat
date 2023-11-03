require('dotenv').config();
const env = process.env;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = env.VITE_API_PORT;

const UI_URL = `http://${env.VITE_UI_HOST}:${env.VITE_UI_PORT}`

const STATE_FILE = './db/state.json';

// Middleware to parse JSON requests
app.use(bodyParser.json());



app.use(cors({
  origin: UI_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


function emptyState() {
  return {
    day: null,
    countdowns: [],
  };
}

function readJsonFile(filePath) {
  const rawData = fs.readFileSync(STATE_FILE);
  return JSON.parse(rawData);
}

let state = fs.existsSync(STATE_FILE)
  ? readJsonFile(STATE_FILE)
  : emptyState()

if (fs.existsSync(STATE_FILE)) {
} else { }

app.get('/state', (req, res) => {
  res.send(state);
});

app.put('/state', (req, res) => {
  state = req.body;
  fs.writeFileSync(STATE_FILE, JSON.stringify(state));
  res.send({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Spread Sweat API started on port ${PORT}`);
});

