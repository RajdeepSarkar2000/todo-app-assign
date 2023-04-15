const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo', {
  useNewUrlParser: true,
 
})


app.use('/', routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/todo";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Connected to MongoDB");

  const db = client.db('todo');
  const tasks = db.collection('tasks');

  // Rest of the server code goes here
});

