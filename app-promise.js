// const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

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

var encodedAdress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error('не могу найти этот адрес');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;;
  var weatherUrl = `https://api.darksky.net/forecast/c7da441585e29ab3a0b2139dd6184d75/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) =>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`Сейчас ${temperature}, хотя по ощущениям как ${apparentTemperature}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND'){
    console.log('что-то не так с API серверами');
  } else {
    console.log(e.message);
  }
});
