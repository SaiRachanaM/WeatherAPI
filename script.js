const apiKey = "a8e5e496c2c195fac18d2ea7478198d3";

const input = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const info = document.getElementById('weatherInfo');

async function getWeather() {
  const city = input.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  info.innerHTML = "Loading...";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    info.innerHTML = `
      <div class="temp">${data.main.temp}°C</div>
      <div class="description">${data.weather[0].description}</div>
      <div>Humidity: ${data.main.humidity}%</div>
      <div>Wind: ${data.wind.speed} m/s</div>
    `;
  } catch (error) {
    info.innerHTML = `<p>${error.message}</p>`;
  }
}

// Click handler
searchBtn.addEventListener('click', getWeather);

// Enter key handler
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getWeather();
  }
});
