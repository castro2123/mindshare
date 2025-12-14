import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../components/Home";
import "../styles/home.css";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MindShare - Home";
  }, []);

  const goToLogin = () => navigate("/login");

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-logo">
          <img src="/logo1-sem-texto.svg" alt="MindShare Logo" />
          <span>MindShare</span>
        </div>

        <button className="home-login-btn" onClick={goToLogin}>
          Login
        </button>
      </header>

      <Home />
    </div>
  );
}

export default HomePage;
