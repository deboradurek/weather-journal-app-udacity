/* Global Variables */

// Base URL for API call
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
// Personal API Key for OpenWeatherMap API
const apiKey = 'eb3e0c855e59cab3f36e41ccbf62d4f5';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

// Event listener to add function to Generate button
document.getElementById('app').addEventListener('submit', performAction);

function performAction(e) {
  e.preventDefault();
  const zipCode = document.getElementById('zip').value;
  const userFeelings = document.getElementById('feelings').value;

  clearInput();
  getWeather(baseURL, zipCode, apiKey).then(function (data) {
    if (data.cod === 200) {
      postWeatherUser('/add', { ...data, userFeelings, newDate }).then(
        function () {
          updateUI('/all');
        }
      );
    } else {
      document.getElementById('error-message').innerHTML = data.message;
    }
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
const updateUI = async (url = '') => {
  const response = await fetch(url);

  try {
    const appInfo = await response.json();

    // Show Entry Holder
    document.querySelector('.entry').classList.add('entry-show');

    // Get City
    document.getElementById(
      'city'
    ).innerHTML = `<h2>${appInfo.cityName}, ${appInfo.country}</h2`;
    // Get Date
    document.getElementById('date').innerHTML = `Today is ${appInfo.date}`;
    // Get Icon
    const src = `http://openweathermap.org/img/wn/${appInfo.weatherIcon}@4x.png`;
    document.getElementById('weather-icon').setAttribute('src', src);
    // Get Temperature
    document.getElementById('temp').innerHTML = `<h1>${Math.round(
      appInfo.temperature
    )}</h1><span>°C</span>`;
    // Get Weather Description
    document.getElementById(
      'description-weather'
    ).innerHTML = `&#9729 ${appInfo.descriptionWeather}`;
    // Get Temp Max
    document.getElementById('temp-max').innerHTML = `&#8593; ${Math.round(
      appInfo.tempMax
    )}<span>°</span>`;
    // Get Temp Min
    document.getElementById('temp-min').innerHTML = `&#8595; ${Math.round(
      appInfo.tempMin
    )}<span>°</span>`;
    // Get Humidity
    document.getElementById('humidity').innerHTML = `${appInfo.humidity}%`;
    // Get User Info
    document.getElementById(
      'content'
    ).innerHTML = `I am feeling ${appInfo.userFeelings}.`;
  } catch (error) {
    console.log('error', error);
  }
};

// Function to clear input
function clearInput() {
  document.getElementById('error-message').innerHTML = '';
  document.querySelector('.entry').classList.remove('entry-show');
}
