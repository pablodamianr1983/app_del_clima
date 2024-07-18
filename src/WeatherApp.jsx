import React, { useState } from 'react';
import { getWeatherByCity } from './api';

const WeatherApp = ({ user, addFavoriteCity }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="weather-app">
      <h1>Aplicación del Clima</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Ingrese el nombre de la ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperatura: {weather.main.temp} °C</p>
          <p>Clima: {weather.weather[0].description}</p>
          <p>Humedad: {weather.main.humidity}%</p>
          <p>Velocidad del Viento: {weather.wind.speed} m/s</p>
          {user && (
            <button onClick={() => addFavoriteCity(weather.name)}>Agregar a Favoritos</button>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;