import React from 'react';

const ForecastInfo = ({ forecast }) => {
  if (!forecast || !forecast.weather || !forecast.weather[0]) {
    return <p>No forecast data available.</p>;
  }

  const formattedDate = new Date(forecast.dt_txt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="forecast-info bg-blue-100 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">
        {formattedDate} - {forecast.weather[0].description}
        <img 
          src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
          alt="weather icon" 
          className="inline-block" 
        />
      </h2>
      <p className="text-lg">Temperature: {forecast.main.temp} °C</p>
      <p className="text-lg">Feels Like: {forecast.main.feels_like} °C</p>
      <p className="text-lg">Humidity: {forecast.main.humidity} %</p>
      <p className="text-lg">Wind Speed: {forecast.wind.speed} m/s</p>
    </div>
  );
};

export default ForecastInfo;
