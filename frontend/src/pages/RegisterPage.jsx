import React from 'react';
import Register from '../components/register';
import { Link } from 'react-router-dom';
import '../styles/register.css';

function RegisterPage() {
  return (
    <div className="register-page">

      {/* Lado Esquerdo */}
      <div className="register-left">
        <img src="/logo1.png" className="register-logo" />

        <h1 className="register-description">
          Bem-vindo à <span className="italic">MindShare</span>! <br />
          Cria já a tua conta e começa a trocar serviços,
          formar grupos de estudo e partilhar conhecimento
          com a comunidade académica!
        </h1>
      </div>

      {/* Lado Direito */}
      <div className="register-right">
        <div className="register-box">
          <Register />

          <p className="register-login-link">
            Já tem uma conta?{' '}
            <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
