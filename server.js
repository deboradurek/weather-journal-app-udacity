/* Setup Project Environment */

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Require Path to join internal paths
const path = require('path');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Here we are configuring Express to use Cors as middleware, for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static(path.join(__dirname, 'website')));

// Setup Server
const port = 8080;

const server = app.listen(port, () =>
  console.log(`Running on localhost ${port}.`)
);

// GET Route
app.get('/all', getData);

function getData(req, res) {
  res.send(projectData);
}

// POST Route
app.post('/add', postData);

function postData(req, res) {
  let weatherData = req.body;

  projectData = {
    cityName: weatherData.name,
    country: weatherData.sys.country,
    date: weatherData.newDate,
    weatherIcon: weatherData.weather[0].icon,
    temperature: weatherData.main.temp,
    descriptionWeather: weatherData.weather[0].description,
    tempMin: weatherData.main.temp_min,
    tempMax: weatherData.main.temp_max,
    humidity: weatherData.main.humidity,
    userFeelings: weatherData.userFeelings,
  };

  res.send({ status: 'Success' });
}
