import React, { useState } from 'react';

const WeatherInfo = ({ weather }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!weather || !weather.weather || !weather.weather[0]) {
    return <p>No weather data available.</p>;
  }

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
      <h2 
        className="text-2xl font-bold mb-2 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {weather.name} 
        <img 
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
          alt="weather icon" 
          className="inline-block" 
        />
      </h2>
      {isExpanded && (
        <div>
          <p className="text-lg">Temperature: {weather.main.temp} °C</p>
          <p className="text-lg">Feels Like: {weather.main.feels_like} °C</p>
          <p className="text-lg">Humidity: {weather.main.humidity} %</p>
          <p className="text-lg mb-4">Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;