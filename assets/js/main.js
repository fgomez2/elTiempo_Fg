const API_KEY = '';
const searchBtn = document.getElementById('search-button');
const cityName = document.getElementById('city-name');

searchBtn.addEventListener('click', function() {
    const cityInput = document.getElementById('search-input').value;
    
    if (cityInput != '') {
        console.log(`City: ${cityInput}`);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric&lang=es`)
            .then(response => response.json())
            .then(data => {
                const weatherData = {
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    icon: data.weather[0].icon,
                };

                console.log(weatherData);
                
                // Update the UI with the fetched weather data
                cityName.textContent = `${cityInput.toUpperCase()}`;

                // Image update
                const weatherIcon = document.getElementById('weather-icon');
                const weatherImage = document.createElement('img'); // Create a new image element
                weatherImage.src = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
                weatherIcon.innerHTML = ''; // Clear previous content
                weatherIcon.appendChild(weatherImage);

                // Description update
                const weatherDescription = document.createElement('p');
                weatherDescription.innerHTML = ''; // Clear previous content
                weatherDescription.textContent = `${weatherData.description.toUpperCase()}`;
                weatherIcon.appendChild(weatherDescription);

                // Temperature update
                const temperatureContainer = document.getElementById('temperature');
                const temperatureCelsius = document.createElement('p');
                temperatureContainer.innerHTML = ''; // Clear previous content
                temperatureCelsius.textContent = `${weatherData.temperature.toFixed(1)} °C`;
                temperatureContainer.appendChild(temperatureCelsius);

                // Humidity update
                const humidityContainer = document.getElementById('humidity');
                const humidity = document.createElement('p');
                humidityContainer.innerHTML = ''; // Clear previous content
                humidity.textContent = `${weatherData.humidity} % DE HUMEDAD`;
                humidityContainer.appendChild(humidity);
                
                // Input field reset
                document.getElementById('search-input').value = ''; // Clear input field

                
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('City not found! Please try again.');
            });
    } else {
        alert('Please enter a city name!');
    }
});