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
const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1';
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
  // get post req information
  //app.get(req.body);
  console.log(req.body);
  const collection = await db.collection('testDevs').findOne(req.body);
  console.log (collection);
  if (collection === null){
    res.status(404);
    res.send('error msg');}

  else{
    res.sendFile(__dirname + '/home.html');
  }
  });
  
  //check if this matches with a user in the users collection of our database

  //if it does, then route the client to home.html

  //otherwise, send a 404 status


// Exc. 3.2: Render the username
app.get('/user', (req, res) => {
  // TODO
});

// Runs the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
