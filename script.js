document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const location = document.querySelector('input[name="location"]').value;
        fetchWeatherData(location);
    });
});

async function fetchWeatherData(location) {
    const config = '2d6edec5fa74eee4828f548a33d03398';
    try {
        // Fetch geo coordinates
        let geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${config}`);
        let geoData = await geoResponse.json();
        const { lat, lon } = geoData[0];

        // Fetch weather data
        let weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${config}`);
        let weatherData = await weatherResponse.json();

        // Update HTML
        document.getElementById('location').textContent = geoData[0].name;
        document.getElementById('temperature').textContent = weatherData.main.temp.toFixed(1);
        document.getElementById('weatherWord').textContent = weatherData.weather[0].description;
        document.getElementById('humidity').textContent = weatherData.main.humidity;
        document.getElementById('windSpeed').textContent = weatherData.wind.speed;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    } catch (error) {
        console.error(error.message);
    }
}
