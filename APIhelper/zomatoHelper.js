const request = require('request');

let key;

if (!process.env.ZOMATO) {
  config = require('../config.js');
  key = config.zomatoKey;
} else {
  key = process.env.ZOMATO;
}

let searchForFoods = ( cityId, searchFood, cb ) => {
  
  let params = {
    url: `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&q=${searchFood}&count=25`,
    headers: {
      'user-key': key
    }
  }
  
  callback = (err, res, body) => {
    if(!err && res.statusCode === 200) {
      var temp = JSON.parse(body);
      cb(null, temp.restaurants);
    } else {
      cb(err, null);
      console.log('errrrrrrrr, ', err)
    }
  }

  request(params, callback)

}

let searchForCityId = (city, cb) => {

  let params = {
    url: `https://developers.zomato.com/api/v2.1/cities?q=${city}`,
    headers: {
      'user-key': key
    }
  }

  callback = (err, res, body) => {
    if(!err && res.statusCode === 200) {
      let temp = JSON.parse(body);
      cb(null, temp.location_suggestions[0].id);
    } else {
      cb(err, null);
      console.log('errrrrrr, ', err)
    }
  }
  request(params, callback)
}

module.exports.searchForCityId = searchForCityId;
module.exports.searchForFoods = searchForFoods;
