const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const { MongoClient } = require('mongodb');
const port = 3000;

const sess = {
  secret: 'this should be secret and random',
  resave: true,
  saveUninitialized: true,
};

let user = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sess));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  user = req.body.username;
  req.session.user = user;
  res.sendFile(__dirname + '/home.html');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
