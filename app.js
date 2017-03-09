// const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
      a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
      }
    })
    .help()
    .alias('help', 'h')
    .argv;
//lat, lng, callback


  geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage){
      console.log(errorMessage);
    } else {
      console.log(results.address);
      weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
        if (errorMessage){
          console.log(errorMessage);
        } else {
          console.log(`iT's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
        }
      });
    }
  });
//
//
// //c7da441585e29ab3a0b2139dd6184d75

// const request = require('request');
//
// request({
//   url: 'https://api.darksky.net/forecast/c7da441585e29ab3a0b2139dd6184d75/55.8953062,37.4754252',
//   json: true
// }, (error, response, body) => {
//   if (!error && response.statusCode === 200){
//     console.log(body.currently.temperature);
//   } else {
//     console.log('Unable to connect t Forecast.io servers');
//   }
// });
