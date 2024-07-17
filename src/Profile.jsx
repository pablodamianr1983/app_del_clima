import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getWeatherByCity } from './api';

const Profile = ({ user, setUser }) => {
  const [username, setUsername] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [age, setAge] = useState(user ? user.age || '' : '');
  const [address, setAddress] = useState(user ? user.address || '' : '');
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, username, email, age, address };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleRemoveFavorite = (city) => {
    const updatedUser = {
      ...user,
      favoriteCities: user.favoriteCities.filter((favCity) => favCity !== city),
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleCheckWeather = async (city) => {
    try {
      const data = await getWeatherByCity(city);
      setWeatherData((prevData) => ({ ...prevData, [city]: data }));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="profile">
      <Link to="/" className="home-button">Inicio</Link>
      <h2>¡Bienvenido a tu perfil!</h2>
      <form onSubmit={handleSave} className="profile-form">
        <div className="profile-card">
          <h3>Información Personal</h3>
          <div className="profile-item">
            <label>Nombre de usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="profile-item">
            <label>Edad:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="profile-item">
            <label>Dirección:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit">Guardar</button>
        </div>
      </form>
      {user && (
        <div className="profile-card">
          <h3>Ciudades Favoritas</h3>
          <div className="favorite-cities-grid">
            {user.favoriteCities && user.favoriteCities.map((city) => (
              <div className="favorite-city-card" key={city}>
                <span>{city}</span>
                {weatherData[city] && (
                  <div className="weather-info-small">
                    <p>Temp: {weatherData[city].main.temp} °C</p>
                    <p>{weatherData[city].weather[0].description}</p>
                    <p>Humedad: {weatherData[city].main.humidity}%</p>
                  </div>
                )}
                <button onClick={() => handleCheckWeather(city)}>Consultar Clima</button>
                <button onClick={() => handleRemoveFavorite(city)}>Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Profile;