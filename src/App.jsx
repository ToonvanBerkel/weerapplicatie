import React, { useState } from 'react';
import WeatherInfo from './components/WeatherInfo';
import ForecastInfo from './components/ForecastInfo';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const apiKey = '3a9a40218c9a743deffbd701b3bb9db7';

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (error) {
      console.error("Error fetching the weather data: ", error);
      setError('City not found or API key is invalid');
      setWeather(null);
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      const dailyForecast = data.list.filter((_, index) => index % 8 === 0).slice(0, 4);
      setForecast(dailyForecast);
      setError('');
    } catch (error) {
      console.error("Error fetching the forecast data: ", error);
      setError('City not found or API key is invalid');
      setForecast([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
    fetchForecast();
  };

  const getBackgroundClass = () => {
    if (!weather) {
      return 'bg-default';
    }
    const mainWeather = weather.weather[0].main.toLowerCase();
    if (mainWeather.includes('cloud')) {
      return 'bg-cloudy';
    } else if (mainWeather.includes('rain')) {
      return 'bg-rainy';
    } else if (mainWeather.includes('clear')) {
      return 'bg-sunny';
    }
    return 'bg-default';
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <div className="background"></div>
      <div className="content">
        <form onSubmit={handleSubmit} className="search-form">
          <input 
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {weather && <WeatherInfo weather={weather} />}
        {forecast.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">4-Day Forecast</h2>
            {forecast.map((forecastItem, index) => (
              <ForecastInfo key={index} forecast={forecastItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;