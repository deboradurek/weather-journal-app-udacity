/* Global Variables */

// Base URL for API call
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
// Personal API Key for OpenWeatherMap API
const apiKey = 'eb3e0c855e59cab3f36e41ccbf62d4f5';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to Generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const zipCode = document.getElementById('zip').value;
  const userFeelings = document.getElementById('feelings').value;

  getWeather(baseURL, zipCode, apiKey).then(function (data) {
    postWeatherUser('/add', { ...data, userFeelings, newDate }).then(
      function () {
        getAppInfo('/all');
      }
    );
  });
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipCode, apiKey) => {
  const response = await fetch(
    `${baseURL}?zip=${zipCode}&units=metric&appid=${apiKey}`
  );

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to POST data */
const postWeatherUser = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const status = await response.json();
    return status;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to GET Project Data */
const getAppInfo = async (url = '') => {
  const response = await fetch(url);

  try {
    const appInfo = await response.json();
    document.getElementById('date').innerHTML = appInfo.date;
    document.getElementById('temp').innerHTML = appInfo.temperature;
    document.getElementById('content').innerHTML = appInfo.userFeelings;
  } catch (error) {
    console.log('error', error);
  }
};
