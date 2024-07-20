import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeatherApp from './WeatherApp';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import NotFound from './NotFound';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map(u => u.email === updatedUser.email ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const addFavoriteCity = (city) => {
    if (user) {
      const updatedUser = {
        ...user,
        favoriteCities: user.favoriteCities ? [...user.favoriteCities, city] : [city],
      };
      updateUser(updatedUser);
    }
  };

  return (
    <Router>
      <div className="App">
        <video autoPlay muted loop id="background-video">
          <source src="/clear-sky.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <header className="App-header">
          <nav className="menu-bar">
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
        </header>
        <Routes>
          <Route path="/" element={<WeatherApp user={user} addFavoriteCity={addFavoriteCity} />} />
          <Route path="/register" element={<Register setUser={updateUser} />} />
          <Route path="/login" element={<Login setUser={updateUser} />} />
          <Route path="/profile" element={<Profile user={user} updateUser={updateUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
