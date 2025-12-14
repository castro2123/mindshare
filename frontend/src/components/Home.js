import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <main className="home-content">
      <h1>Colabora hoje, conquista amanhã</h1>
      <p>
        A MindShare reúne troca de serviços e grupos de estudo numa só
        plataforma dedicada a estudantes.
      </p>

      <div className="home-buttons">
        <button className="home-cta-btn" onClick={goToRegister}>
          Experimente já
        </button>
      </div>
    </main>
  );
}

export default Home;
