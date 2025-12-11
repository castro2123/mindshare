import React, { useState } from 'react';
import '../styles/register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    course: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage('Erro ao registrar usuário');
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Criar uma conta</h2>

      {message && (
        <p className="register-message">{message}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="register-field">
          <label className="register-label">Nome</label>
          <input
            type="text"
            name="name"
            placeholder="Inserir o seu primeiro e último nome"
            value={formData.name}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <div className="register-field">
          <label className="register-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Inserir o seu email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <div className="register-field">
          <label className="register-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Inserir a password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <div className="register-field">
          <label className="register-label">Curso</label>
          <input
            type="text"
            name="course"
            placeholder="Curso"
            value={formData.course}
            onChange={handleChange}
            className="register-input"
          />
        </div>

        <button type="submit" className="register-button">
          Criar conta
        </button>
      </form>
    </div>
  );
}

export default Register;
