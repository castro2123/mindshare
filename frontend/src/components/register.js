import React, { useState, useEffect } from 'react';
import '../styles/register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    school: '',
    course: ''
  });
  const [message, setMessage] = useState('');
  const [schools, setSchools] = useState([]);
  const [courses, setCourses] = useState([]);

  // Handle form input changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Buscar escolas ao carregar página
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/schools', { credentials: 'include' });
        if (!res.ok) throw new Error('Erro ao carregar escolas');
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error(err);
        setSchools([]);
      }
    };
    fetchSchools();
  }, []);

  // Quando o usuário seleciona uma escola, buscar os cursos
  const handleSchoolChange = async e => {
    const schoolId = e.target.value;
    setFormData({ ...formData, school: schoolId, course: '' }); // reset curso

    if (!schoolId) {
      setCourses([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/courses/byschool/${schoolId}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Erro ao carregar cursos');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
      setCourses([]);
    }
  };

  // Submeter formulário
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Conta criada com sucesso!');
        setFormData({ name: '', email: '', password: '', school: '', course: '' });
        setCourses([]);
      } else {
        setMessage(data.message || 'Erro ao registrar usuário');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erro ao registrar usuário');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Criar uma conta</h2>

      {message && <p className="register-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="register-field">
          <label className="register-label">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        {/* Email */}
        <div className="register-field">
          <label className="register-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        {/* Password */}
        <div className="register-field">
          <label className="register-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        {/* Escola */}
        <div className="register-field">
          <label className="register-label">Escola</label>
          <select
            name="school"
            value={formData.school}
            onChange={handleSchoolChange}
            className="register-input"
            required
          >
            <option value="">Selecione uma escola</option>
            {schools.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Curso */}
        <div className="register-field">
          <label className="register-label">Curso</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="register-input"
            required
            disabled={!formData.school}
          >
            <option value="">Selecione um curso</option>
            {courses.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="register-button">
          Criar conta
        </button>
      </form>
      <div className="text-center text-gray-400 text-sm my-4">Ou</div>

      {/* Google */}
      <button type="button" className="login-google">
        <span className="font-bold text-lg">G</span>
        Google
      </button>

    </div>
  );
}

export default Register;
