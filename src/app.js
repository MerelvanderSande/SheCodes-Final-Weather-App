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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt=""
              width="42"
            />
            <div class="forecastTemperature">
              <span class="weather-forecast-temperature-min"> 25ºC -</span>
              <span class="weather-forecast-temperature-max"> 32ºC </span>
            </div>
          </div>
`;
  });
  forecastHTML =
    forecastHTML +
    `
          <div class="col-2">
            <div class="weather-forecast-date">Sat</div>
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt=""
              width="42"
            />
            <div class="forecastTemperature">
              <span class="weather-forecast-temperature-min"> 25ºC -</span>
              <span class="weather-forecast-temperature-max"> 32ºC </span>
            </div>
          </div>
`;
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
