const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const users = require('./users');

const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d',
  });
};

app.post('/api/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.status(200).json({
      username: user.username,
      email: user.email,
      token: generateToken(user.email),
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
