const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');

const url = "mongodb://localhost:27017";

router.post('/', function (req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db('mongo-mob');
    const auth = req.body
    const user = {
      ...req.body,
    }
    dbo.collection('users').find({}, {projection: {_id: 0, id:1 , history:1}}).toArray( function (err, result) {
      if (err) throw err;
      const userData = result.find(user => user.id === auth.id)
      // console.log(userData.history[0].co2.data.carbonIntensity)
      if (userData) {
        const history = userData.history.map(e => ({
          location: e.location.city, 
          timeStamp: moment(e.timeStamp).format("MMM Do HH:mm"), 
          aqi:e.aq.aqius,
          temp: Math.round(e.weather.currently.temperature),
          precip: Math.round(e.weather.currently.precipProbability*100),
          pressure: Math.round(e.weather.currently.pressure),
          humidity: Math.round(e.weather.currently.humidity*100),
          windspeed: Math.round(e.weather.currently.windSpeed),
          visibility: Math.round(e.weather.currently.visibility),
          co2: (e.co2 && e.co2.data) ? Math.round(e.co2.data.carbonIntensity) : null
        }));
        res.send({history})
        db.close();
      }
      db.close();
    });  
  });
});


module.exports = router;