const API_KEY = '21d8a80b3d6b444998a80b3d6b1449d3';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid=${API_KEY}`;

function fetchWeather(city) {
    fetch(API_URL.replace('{city}', city))
        .then(response => response.json())
        .then(data => {
            // Display weather information in a visually appealing way
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <div class="weather-icon">
          <img src="icons/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
        </div>
        <div class="weather-details">
          <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
          <p>Description: ${data.weather[0].description}</p>
          </div>
      `;
        })
        .catch(error => console.error(error));
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const city = `${lat},${lon}`; // Use coordinates for API call
            fetchWeather(city);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
