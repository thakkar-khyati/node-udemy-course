const request = require("request");

const forecast = (lon, lat, callback) => {
  url =
    "http://api.weatherstack.com/current?access_key=08677223326a2218a21a1822d2aea7d8&query=" +
    lat +
    "," +
    lon;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(error, undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]}. it is ${response.body.current.temperature} but it feels like ${response.body.current.feelslike}`
      );
    }
  });
};

const geocode = (address, callback) => {
  url =
    "http://api.weatherstack.com/current?access_key=08677223326a2218a21a1822d2aea7d8&query=" +
    address;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(error, undefined);
    } else {
      const data = {
        longitude: response.body.location.lon,
        lattitute: response.body.location.lat,
        location:`${response.body.location.name} , ${response.body.location.country}`,
      };
      console.log(data)
      callback(undefined, data);
    }
  });
};

module.exports ={
    geocode:geocode,
    forecast:forecast,
}