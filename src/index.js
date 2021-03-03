function formatDate(time) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#currentDate");
let now = new Date();
dateElement.innerHTML = formatDate(now);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temp}°C`;
  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}`;
  let wind = response.data.wind.speed;
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `${wind}`;
  let sky = response.data.weather[0].main;
  let showSky = document.querySelector("#sky");
  showSky.innerHTML = `${sky}`;
}
function newSearch(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-text-input");
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${citySearch.value}`;
  searchCity(citySearch.value);
}

function searchCity(city) {
  let apiKey = "9fdfde34a67a648a41ee1aa53553e730";
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "metric";
  axios
    .get(`${apiURL}${city}&appid=${apiKey}&units=${units}`)
    .then(showTemperature);
}
let newForm = document.querySelector("#search-form");
newForm.addEventListener("submit", newSearch);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9fdfde34a67a648a41ee1aa53553e730&units=metric`;
  axios.get(apiURL).then(showCurrentTemperature);
}

function showCurrentTemperature(temperature) {
  let temp = Math.round(temperature.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temp}°C`;
  let humidity = temperature.data.main.humidity;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}`;
  let wind = temperature.data.wind.speed;
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `${wind}`;
  let sky = temperature.data.weather[0].main;
  let showSky = document.querySelector("#sky");
  showSky.innerHTML = `${sky}`;
  let location = document.querySelector("h1");
  location.innerHTML = `The weather for your current location`;
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);
