let output = document.getElementById("out");

getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    output.innerHTML = "Geo-Location not supported";
  }
};

showPosition = (data) => {
  console.log(data);
  let lat = data.coords.latitude;
  let lon = data.coords.longitude;
  output.innerHTML =
    output.innerHTML + `Latitude is ${lat} & Longitude is ${lon}` + "<br>";

  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
  const p = fetch(url);
  //returns promise
  p.then((response) => response.json()).then((data) => {
    console.log(data);
    let cityName = data.city.name;
    let cityPopulation = data.city.population;
    let cityDayTemp = data.list[0].temp.day;
    let cityNightTemp = data.list[0].temp.night;
    let cityDayTempFeelsLike = data.list[0].feels_like.day;
    let cityNightTempFeelsLike = data.list[0].feels_like.night;
    let cityWeatherMain = data.list[0].weather[0].main;
    let cityWeatherDescrition = data.list[0].weather[0].description;

    output.innerHTML =
      output.innerHTML +
      `Weather of ${cityName} is "${cityWeatherMain}" (${cityWeatherDescrition})` +
      "<br>";
    output.innerHTML =
      output.innerHTML +
      `Population of ${cityName}:-- ${cityPopulation}` +
      "<br>";
    output.innerHTML =
      output.innerHTML +
      `Day Temperature of ${cityName}:-- ${cityDayTemp} °C but it feels_like ${cityDayTempFeelsLike} °C` +
      "<br>";
    output.innerHTML =
      output.innerHTML +
      `Night Temperature of ${cityName}:-- ${cityNightTemp} °C but it feels_like ${cityNightTempFeelsLike} °C` +
      "<br>";
  });
};
