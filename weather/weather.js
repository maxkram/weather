const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/c7da441585e29ab3a0b2139dd6184d75/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('что-то не так с Forecast.io серверами');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather');
    } else if (response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};
module.exports.getWeather = getWeather;
