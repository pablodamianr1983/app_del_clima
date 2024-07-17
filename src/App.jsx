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
          <Route path="/register" element={<Register setUser={updateUser} />} />
          <Route path="/login" element={<Login setUser={updateUser} />} />
          <Route path="/profile" element={<Profile user={user} updateUser={updateUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
