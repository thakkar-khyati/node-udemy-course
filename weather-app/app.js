const request = require("postman-request");

const city = process.argv[2];

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
        city: response.body.location.name,
        country: response.body.location.country,
      };
      callback(undefined, data);
    }
  });
};
if (!city) {
  console.log("please provide a location");
} else {
  geocode(city, (error, data) => {
    if (error) {
      return error;
    }

    forecast(data.longitude, data.lattitute, (e, forecastData) => {
      if (e) {
        return e;
      }

      console.log(data.city);
      console.log(data.country);
      console.log(forecastData);
    });
  });
}
