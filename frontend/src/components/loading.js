import React from 'react';
import '../styles/loading.css'; // importe o arquivo CSS

const Loading = () => {
  return (
    <div className="loading-container">
      <img src="/logo.png" alt="MindShare Logo" className="loading-logo" />
      <p className="loading-text">Carregando...</p>
    </div>
  );
};

export default Loading;
