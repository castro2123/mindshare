import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [schoolName, setSchoolName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  // --- Funções de API incorporadas ---
  const getSchools = async () => {
    const res = await fetch('http://localhost:5000/api/schools', {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Erro ao buscar escolas');
    return res.json();
  };

  const createSchool = async (name) => {
    const res = await fetch('http://localhost:5000/api/schools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Erro ao criar escola');
    }
    return res.json();
  };

  const createCourse = async (name, schoolId) => {
    const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, school: schoolId }), // enviar também o ID da escola
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao criar curso');
    }

    return res.json();
    };

  // --- Fim das funções de API ---

  const fetchSchools = async () => {
    try {
      const data = await getSchools();
      setSchools(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleCreateSchool = async (e) => {
    e.preventDefault();
    try {
      await createSchool(schoolName);
      setSchoolName('');
      fetchSchools();
      alert('Escola criada com sucesso!');
    } catch (err) {
      alert('Erro ao criar escola: ' + err.message);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!selectedSchool) return alert('Selecione uma escola');
    try {
      await createCourse(courseName, selectedSchool);
      setCourseName('');
      fetchSchools();
      alert('Curso criado com sucesso!');
    } catch (err) {
      alert('Erro ao criar curso: ' + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Criar Escola */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Criar Escola</h2>
        <form onSubmit={handleCreateSchool}>
          <input
            type="text"
            placeholder="Nome da escola"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="border p-2 mr-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Criar Escola
          </button>
        </form>
      </div>

      {/* Criar Curso */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Criar Curso</h2>
        <form onSubmit={handleCreateCourse}>
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="border p-2 mr-2"
            required
          >
            <option value="">Selecione uma escola</option>
            {schools.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nome do curso"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="border p-2 mr-2"
            required
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Criar Curso
          </button>
        </form>
      </div>

      {/* Lista de Escolas e Cursos */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Escolas e Cursos</h2>
        <ul>
          {schools.map((school) => (
            <li key={school._id}>
              <strong>{school.name}</strong>
              <ul>
                {school.courses?.map((course) => (
                  <li key={course._id}>{course.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
