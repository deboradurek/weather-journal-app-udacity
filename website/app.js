/* Global Variables */

// Base URL for API call
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = 'eb3e0c855e59cab3f36e41ccbf62d4f5';
// Select element that contains zip code value
const zipCode = document.getElementById('zip').value;

// Event listener to add function to Generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  console.log('Hello');
  getWeather(baseURL, zipCode, apiKey);
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipCode, apiKey) => {
  const response = await fetch(baseURL + zipCode + apiKey);

  try {
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to POST data */

/* Function to GET Project Data */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
