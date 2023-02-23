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

// Set this equal to your MongoDB URI
const uri = '';
const client = new MongoClient(uri);

// Change this if you're using a different name
const dbName = 'testDevs'; 

// This global variable is our database connection and is accessible everywhere
let db;
async function connect() {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected successfully to MongoDB server");
}
connect();

// Sets up the Express server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sess));
app.use(express.static(__dirname));

// Server's base route
app.get('/', (req, res) => {
  // Displays our login.html file at the root route
  res.sendFile(__dirname + '/login.html');
});

// Exc. 3.1: Handle POST request to /login route
app.post('/login', async (req, res) => {
  // TODO
});

// Exc. 3.2: Render the username
app.get('/user', (req, res) => {
  // TODO
});

// Runs the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
