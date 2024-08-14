import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../axios";
import "./Login.css";

function Login({ onLogin }) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hacer la solicitud POST al endpoint /login
      const response = await apiClient.post("/login", {
        code,
        password,
      });
      if (response.status === 200) {
        // Si la autenticación es exitosa
        onLogin();
        navigate("/Home");
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      alert("Hubo un problema al iniciar sesión");
    }
  };

  const handleForgotPassword = () => {
    alert("Redirigiendo a la página de recuperación de contraseña...");
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login">
          <div className="login__info-container">
            <div className="login__info">
              <h1 className="login__info-title">ACL</h1>
              <h2 className="login__info-wellcome">Bienvenido</h2>
              <p className="login__info-text">Gestiona tus Usuarios</p>
              <p className="login__info-text">Integra con Terceros</p>
              <p className="login__info-text">Historial de Accesos y mas</p>
            </div>

            <form onSubmit={handleSubmit} className="login__access-container">
              <div className="login__access_info-container">
                <label className="login__access_info-user">
                  <FontAwesomeIcon icon={faUser} className="icono" />
                  <input
                    className="text-box"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Usuario"
                  />
                </label>
                <div className="separator"></div>
                <label className="login__access_info-password">
                  <FontAwesomeIcon icon={faKey} className="icono" />
                  <input
                    className="text-box"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                  />
                </label>
              </div>
              <div className="login__access_buttons-container">
                <button onClick={handleForgotPassword} className="link-button">
                  ¿Olvidaste tu contraseña?
                </button>
                <button className="access_button" type="submit">
                  INGRESAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
