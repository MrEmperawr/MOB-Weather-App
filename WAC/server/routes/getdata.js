var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;
const  { airVisKey, darkSkyKey, openCageKey, co2key} = require('./APIkeys')
const url = "mongodb://localhost:27017";


router.post('/', function (req, res, next) {
  Promise.all([
    fetch(`https://api.darksky.net/forecast/${darkSkyKey}/${req.body.lat},${req.body.long}?units=si`)
      .then(data => data.json())
      .then(result => ({currently: result.currently, summary:result.hourly.summary , daily: result.daily}))
     ,
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${req.body.lat}+${req.body.long}&key=${openCageKey}&pretty=1}`)
      .then(response => response.json())
      .then(data => ({county: data.results[0].components.county, city: data.results[0].components.city, suburb: data.results[0].components.suburb}))
    ,
    fetch(`https://api.airvisual.com/v2/nearest_city?lat=${req.body.lat}&lon=${req.body.long}&key=${airVisKey}`)
      .then(response => response.json())
      .then(data => data.data.current.pollution),
    fetch(`https://api.co2signal.com/v1/latest?lon=${req.body.long}&lat=${req.body.lat}`, {headers : {'auth-token': co2key} })
      .then(data => data.json())
      .then((data) => {
        if (data.message) {
          return { data: {} }
        }
        return data;
      })

  ]).then(([weather, location, aq, co2]) =>  ({timeStamp: Date.now(), weather, location, aq, co2}))
    .then(data => transferToDb(data, req, res))
    .catch(err => console.log(err))
});


function transferToDb(data, req, res) {
  MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    const dbo = db.db('mongo-mob');
    dbo.collection('users').updateOne({ id: req.body.id}, {'$push': {'history': data }}, function (err, result) {
      if (err) throw err;
      res.send(data);
      db.close();
    });
  });
}

module.exports = router;