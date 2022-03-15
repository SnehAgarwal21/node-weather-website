//load core node module
const path = require("path");

//npm module express
//here function is received
const express = require("express");

const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// //__dirname and __filename are provided by node
// //we can manipulate the string to get actual path
// console.log(__dirname);

// //by using core module path
// console.log(path.join(__dirname, "../public"));

//call express() to call express function
const app = express();

//define path
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//npm hbs is installed
//belwo line sets up handle bars
//setup handle bars engine
app.set("view engine", "hbs");

//if below is not set the default path is views folder
//setup views path
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);
//app.com  - ''
//setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  //this renders index.hbs inside views folder
  res.render("index", {
    title: "Weather",
    name: "Sneh",
  });
});

app.get("/about", (req, res) => {
  //this renders about.hbs inside views folder
  res.render("about", {
    title: "About Me",
    name: "Sneh",
  });
});

app.get("/help", (req, res) => {
  //this renders help.hbs inside views folder
  res.render("help", {
    helpText: "Help",
    title: "Help",
    name: "Sneh",
  });
});

// //app.com  - ''
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// //app.com/help - 'help'
// app.get("/help", (req, res) => {
//   res.send({
//     name: "Sneh",
//     age: 10,
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  const inputLocation = req.query.address;
  geocode(inputLocation, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: "forecast",
        location,
        temperature: forecastData.currentTemperature,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search query",
    });
  }
  // /products?searchKey=searchValue
  //req.query.searchKey returns searchValue
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    errorText: "Help article not found",
    title: "Error",
  });
});

//match anything that has not been matched with existing
//this ha sto be last
app.get("*", (req, res) => {
  res.render("error", {
    errorText: "Page not found",
    title: "Error",
  });
});

//port - 3000
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
