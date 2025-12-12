// src/pages/LoginPage.js
import React from 'react';
import Login from '../components/login';
import '../styles/login.css';

function LoginPage({ setUser }) {
  return (
    <div className="login-page">

      <div className="login-logo">
        <img src="/logo1.png" alt="MindShare Logo" />
        <span className="font-semibold text-lg">MindShare</span>
      </div>

      <Login setUser={setUser} />
    </div>
  );
}


export default LoginPage;
