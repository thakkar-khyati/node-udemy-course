const path = require("path");
const express = require("express");
const hbs = require("hbs");
const utills = require("./utills.js");

const app = express();

//define paths for Express Config
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templetes/views");
const partialsPath = path.join(__dirname, "../templetes/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Khyati Thakkar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Khyati Thakkar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Khyati Thakkar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide an address.",
    });
  }

  utills.geocode(req.query.address,(error,{lattitute, longitude, location}={})=>{
    if(error){
      return res.send({error})
    }
    utills.forecast(longitude,lattitute,(error,forcastData)=>{
      if(error){
        return res.send({error})
      }

      res.send({
        forcastData,
        location,
        address: req.query.address
      })
    })
  })
  // res.send([
  //   {
  //     address:req.query.address,
  //     location: "new york",
  //     forecast: "It is snowing",
  //   }
  // ]);
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Khyati Thakkar",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Khyati Thakkar",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("server started on 3000");
});
