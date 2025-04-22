import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const apiKey = ''; // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  // Function to get image URL based on weather condition
  const getImageUrl = () => {
    if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
      return ''; // Return empty string if weather data is not available
    }

    const weatherDescription = weatherData.weather[0].description.toLowerCase();
    switch (weatherDescription) {
      case 'clear sky':
        return process.env.PUBLIC_URL + '/clear.jpg';
      case 'haze':
        return process.env.PUBLIC_URL + '/haze.jpg';
      case 'broken clouds':
        return process.env.PUBLIC_URL + '/broken.jpg';
      case 'light rain':
        return process.env.PUBLIC_URL + '/lightrain.jpg';
      case 'moderate rain':
        return process.env.PUBLIC_URL + '/rain.jpg';
      case 'overcast clouds':
        return process.env.PUBLIC_URL + '/overcast.jpg';
      case 'few clouds':
        return process.env.PUBLIC_URL + '/fewclouds.jpg';
    case 'mist':
        return process.env.PUBLIC_URL + '/mist.jpg';
      case 'storm':
        return process.env.PUBLIC_URL + '/storm.jpg';
      case 'smoke':
        return process.env.PUBLIC_URL + '/smoke.jpg';
      default:
        return ''; // Default image or handle accordingly
    }
  };

  const weatherBackground = getImageUrl() ? `url(${getImageUrl()})` : ''; // Get the background image URL

  return (
    <div className="weather-app" style={{ backgroundImage: weatherBackground, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={getWeather}>Get Weather</button>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
      {weatherData && (
        <div className="weather-wind">
          <div className="wind-info">
            <h2>Wind Speed</h2>
            <p>{weatherData.wind.speed} m/s</p>
          </div>
          <div className="wind-info">
            <h2>Wind Direction</h2>
            <p>{weatherData.wind.deg}°</p>
          </div>
        </div>
      )}
      {weatherData && (
        <div className="weather-extra">
          <div className="extra-info">
            <h2>Pressure</h2>
            <p>{weatherData.main.pressure} hPa</p>
          </div>
          <div className="extra-info">
            <h2>Visibility</h2>
            <p>{weatherData.visibility} meters</p>
          </div>
        </div>
      )}
      {weatherData && (
        <div className="weather-extra">
          <div className="extra-info">
            <h2>Sunrise Time</h2>
            <p>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          </div>
          <div className="extra-info">
            <h2>Sunset Time</h2>
            <p>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      )}
      {weatherData && (
        <div className="weather-extra">
          <div className="extra-info">
            <h2>Max Temperature</h2>
            <p>{weatherData.main.temp_max} °C</p>
          </div>
          <div className="extra-info">
            <h2>Min Temperature</h2>
            <p>{weatherData.main.temp_min} °C</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;