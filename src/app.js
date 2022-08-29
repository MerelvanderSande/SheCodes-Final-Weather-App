// date
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

// input change city and temperature

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let apiKey = "1a854b43f712ccce729aa504c061af4a";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCityTemperature);
}

function displayCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let showCityTemperature = document.querySelector("#temp");
  showCityTemperature.innerHTML = `${temperature} ºC`;
  let input = document.querySelector("#city-input");
  let showNewCity = document.querySelector("h1");
  showNewCity.innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

// current location button

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

let currentLocationbutton = document.querySelector("#location");
currentLocationbutton.addEventListener("click", getCurrentLocation);

// change to farenheit/celcius

function temperatureDefinitionFarenheit(event) {
  event.preventDefault();
  let linkfarenheit = document.querySelector("#temp");
  linkfarenheit.innerHTML = `90ºF ☀️`;
}

let changeTemperatureDefinitionFarenheit =
  document.querySelector("#farenheit-link");
changeTemperatureDefinitionFarenheit.addEventListener(
  "click",
  temperatureDefinitionFarenheit
);

function temperatureDefinitionCelsius(event) {
  event.preventDefault();
  let linkcelcius = document.querySelector("#temp");
  linkcelcius.innerHTML = `32ºC ☀️`;
}

let changeTemperatureDefinitionCelsius =
  document.querySelector("#celsius-link");
changeTemperatureDefinitionCelsius.addEventListener(
  "click",
  temperatureDefinitionCelsius
);
