const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
// const getCollection = require('mongodb').getCollection;

router.post('/', function (req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db('mongo-mob');
    const auth = req.body
    const user = {
      ...req.body,
      history : []
    }
    dbo.collection('users').find({}, {projection: {_id: 0, id:1}}).toArray( function (err, result) {
      if (err) throw err;
      if (!result.find(user => user.id === auth.id)) {
        dbo.collection('users').insertOne(user, function (err, result) {
          if (err) throw err;
          res.send("Object added to database");
          db.close();
        });
      }
      db.close();
    });  
  });
});


module.exports = router;
