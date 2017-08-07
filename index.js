const express = require('express');
const MongoClient = require('mongodb').MongoClient;

let app = express();

let url = 'mongodb://localhost:27017/newdb';

// my DB connection
let db;

app.get('/', (req, res) => {
  let cats = db.collection('cats');

  cats.findOne({ name: req.query.name }, function(err, cat) {
    if (!cat) {
      res.send('no such cat');
    } else {
      res.send(`${cat.name} is ${cat.age}`);
    }
  });
});

// start the app
MongoClient.connect(url, (err, connection) => {
  db = connection;
  if (!err) console.log('connected to mongo');

  app.listen(3000, () => console.log('up and running'));
});
