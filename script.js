async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "a8e5e496c2c195fac18d2ea7478198d3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    document.getElementById("weatherInfo").innerHTML = "❌ City not found!";
    return;
  }

  const data = await response.json();
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const weatherMain = data.weather[0].main;

  // Change background based on weather
  changeBackground(weatherMain);

  document.getElementById("weatherInfo").innerHTML = `
    <div class="temp">${temp}°C</div>
    <div>${desc.charAt(0).toUpperCase() + desc.slice(1)}</div>
    <div class="icon"><i class="wi wi-owm-${data.weather[0].id}"></i></div>
  `;
}

function changeBackground(weather) {
  let gradient;
  switch (weather.toLowerCase()) {
    case 'clear':
      gradient = 'linear-gradient(135deg, #f6d365, #fda085)';
      break;
    case 'clouds':
      gradient = 'linear-gradient(135deg, #bdc3c7, #2c3e50)';
      break;
    case 'rain':
      gradient = 'linear-gradient(135deg, #667db6, #0082c8, #0082c8, #667db6)';
      break;
    case 'thunderstorm':
      gradient = 'linear-gradient(135deg, #373b44, #4286f4)';
      break;
    case 'snow':
      gradient = 'linear-gradient(135deg, #e0eafc, #cfdef3)';
      break;
    default:
      gradient = 'linear-gradient(135deg, #4facfe, #00f2fe)';
  }
  document.body.style.background = gradient;
}
