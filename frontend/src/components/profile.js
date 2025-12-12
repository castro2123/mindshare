import React, { useEffect, useState } from 'react';

function Profile({ setUser }) {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'GET',
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <p>Carregando perfil...</p>;

  return (
    <div>
      <h2>Perfil</h2>
      <p>Nome: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Curso: {profile.course?.name}</p>
      <p>Função: {profile.role?.name || profile.role}</p>
      <button onClick={handleLogout}>Logout</button>

      {/* Debug */}
      {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
    </div>
  );

}

export default Profile;
