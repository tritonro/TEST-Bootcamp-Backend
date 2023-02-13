const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const { MongoClient } = require('mongodb');
const port = 3000;
const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.0';
const client = new MongoClient(uri);

let db;

async function connect() {
  // Connect the client to the server (optional starting in v4.7)
  await client.connect();
  // Establish and verify connection
  db = client.db('test-devs');
  console.log("Connected successfully to server");
}
connect().catch(console.dir);

const sess = {
  secret: 'this should be secret and random',
  resave: true,
  saveUninitialized: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sess));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;
  const query = {username: user, password: pass};
  const result = await db.collection('users').findOne(query);
  if (result != null) {
    req.session.user = user;
    res.sendFile(__dirname + '/home.html');
  } else {
    console.log('No such user!');
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
