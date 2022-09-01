let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}

h2.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="forecastTemperature">
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )} ºC </span>
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )} ºC </span>
            </div>
          </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "1a854b43f712ccce729aa504c061af4a";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCityTemperature);
}

function handleSumbit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let showCityTemperature = document.querySelector("#temp");
  showCityTemperature.innerHTML = `${temperature} ºC`;
  let input = document.querySelector("#city-input");
  let showNewCity = document.querySelector("h1");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  showNewCity.innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#current").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);
  getForecast(response.data.coord);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "1a854b43f712ccce729aa504c061af4a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCityTemperature);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = `${Math.round(fahrenheitTemperature)} ºF`;
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(celsiusTemperature)} ºC`;
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSumbit);

let currentLocationbutton = document.querySelector("#location");
currentLocationbutton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Amsterdam");
