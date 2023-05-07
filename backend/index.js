const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const users = require('./users');

const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d',
  });
};

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.status(200).json({
      username: user.username,
      token: generateToken(user.username),
    });
  } else {
    res.status(400).send('Invalid Credentials');
  }
});

app.get('/', (req, res) => {
  res.send('To-Do application');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
