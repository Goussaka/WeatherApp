window.onload = function() {
  var ipURL = "http://ipinfo.io/json",
    appId = "appid=fcbe7d6ba6d370059fde41c1a4dffca6",
    location = document.getElementById("location"),
    dateTime = document.getElementById("dateTime"),
    date = new Date(),
    dday = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric"
    });

  dateTime.innerHTML = dday;

  axios.get(ipURL).then(function(response) {
    dataLocation = response.data;

    location.innerHTML = response.data.city + " | " + response.data.country;

    var locs = response.data.loc;
    var lat = locs.split(",")[0];
    var lon = locs.split(",")[1];

    var getWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&${appId}`;

    getWeatherData(getWeatherUrl);
  });
};

function getWeatherData(url) {
  axios.get(url).then(function(response) {
    console.log(response.data);

    var description = response.data.weather[0].description,
      id = response.data.weather[0].id,
      temperature = response.data.main.temp,
      temp = Math.round(1.8 * (temperature - 273) + 32),
      humidity = response.data.main.humidity,
      wind = response.data.wind.speed,
      visibility = response.data.visibility,
      desc = document.getElementById("description");

    desc.innerHTML = `<span id="desc">${description}</span>&nbsp;<i id="icon-thermometer" class="wi wi-owm-${id}"></i>`;
    document.getElementById("temp").innerHTML = temp;
    document.getElementById("humidity").innerHTML = `${humidity} %`;
    document.getElementById("wind").innerHTML = `${wind} mph`;
    document.getElementById("visibility").innerHTML = `${visibility} °`;
  });
}
