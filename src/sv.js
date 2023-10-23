const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

let state = {
  day: 1,
  countdowns: []
};

if (fs.existsSync('state.json')) {
  const rawData = fs.readFileSync('state.json');
  state = JSON.parse(rawData);
}

app.get('/getState', (req, res) => {
  res.send(state);
});

app.post('/saveState', (req, res) => {
  state = req.body;
  fs.writeFileSync('state.json', JSON.stringify(state));  // Save to file for persistence.
  res.send({ status: 'OK' });
});

// Serve the HTML file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

