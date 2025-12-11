// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setMessage('');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Erro ao fazer login');
      console.error(err);
    }
  };

  return (
    <div className="login-card">
      <h2 className="login-title">Login na conta</h2>

      {/* Google */}
      <button type="button" className="login-google">
        <span className="font-bold text-lg">G</span>
        Google
      </button>

      <div className="text-center text-gray-400 text-sm my-4">Ou</div>

      <form onSubmit={handleSubmit} className="login-form space-y-4">

        {message && (
        <p className="text-red-600 text-center mb-4">{message}</p>
        )}

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Insira seu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600">Password</label>
            <button type="button" className="text-sm text-blue-600 hover:underline">
              Esqueceu?
            </button>
          </div>

          <input
            type="password"
            name="password"
            placeholder="Insira sua password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <p className="login-footer">
        Ainda Não Tem Uma Conta?{' '}
        <Link to="/register">Registro</Link>
      </p>
    </div>
  );
}

export default Login;
