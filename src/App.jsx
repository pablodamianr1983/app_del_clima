import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeatherApp from './WeatherApp';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addFavoriteCity = (city) => {
    if (user) {
      const updatedUser = {
        ...user,
        favoriteCities: user.favoriteCities ? [...user.favoriteCities, city] : [city],
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/register">Registro</Link>
          <Link to="/login">Iniciar Sesión</Link>
          {user && <Link to="/profile">Perfil</Link>}
        </nav>
        {user && (
          <div className="user-info">
            <span>Bienvenido, {user.username}</span>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
        <Routes>
          <Route path="/" element={<WeatherApp user={user} addFavoriteCity={addFavoriteCity} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
