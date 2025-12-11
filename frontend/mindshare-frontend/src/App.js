// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Profile from './components/profile';
import Loading from './components/loading';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          credentials: 'include'
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Loading />;

  return (
    <Router>
      <Routes>

        {user ? (
          // Se autenticado → qualquer rota leva ao Profile
          <Route path="*" element={<Profile setUser={setUser} />} />
        ) : (
          <>
            {/* Força sempre para o login ao abrir a app */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Qualquer rota desconhecida → login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

      </Routes>
    </Router>
  );
}

export default App;
