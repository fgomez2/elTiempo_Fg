const searchBtn = document.getElementById('search-button');
const cityName = document.getElementById('city-name');

searchBtn.addEventListener('click', function() {
    const cityInput = document.getElementById('search-input').value.trim();
    
    if (cityInput) {
        console.log(`City: ${cityInput}`);
        
        // Llama a la función de Netlify
        fetch(`/.netlify/functions/fetchWeather?city=${encodeURIComponent(cityInput)}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) { // Verifica si la respuesta es exitosa
                    const weatherData = {
                        temperature: data.main.temp,
                        description: data.weather[0].description,
                        humidity: data.main.humidity,
                        icon: data.weather[0].icon,
                    };

                    console.log(weatherData);
                    updateUI(cityInput, weatherData);
                } else {
                    throw new Error(data.message || "City not found");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message || "Error fetching weather data");
            });
    } else {
        alert('Please enter a city name!');
    }
});

// Función para actualizar la UI
function updateUI(city, weatherData) {
    cityName.textContent = city.toUpperCase();
    
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${weatherData.icon}@2x.png">
        <p>${weatherData.description.toUpperCase()}</p>
    `;
    
    const temperatureContainer = document.getElementById('temperature');
    temperatureContainer.innerHTML = `<p>${weatherData.temperature.toFixed(1)} °C</p>`;
    
    const humidityContainer = document.getElementById('humidity');
    humidityContainer.innerHTML = `<p>${weatherData.humidity} % DE HUMEDAD</p>`;
    
    document.getElementById('search-input').value = '';
}