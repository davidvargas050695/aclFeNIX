import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEye, faEyeSlash, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../axios";
import "./Login.css";

function Login({ onLogin }) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
        navigate("/HomePage");
        localStorage.setItem("code", code);
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
                    className="text-box-login"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Usuario"
                  />
                </label>
                <div className="login__access_info-password">
                  <FontAwesomeIcon icon={faKey} className="icono" />
                  <div className="password-input-container">
                    <input
                      className="text-box-login"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="password-toggle-icon"
                      onClick={toggleShowPassword}
                    />
                  </div>
                </div>
              </div>
              <div className="login__access_buttons-container">
                <button onClick={handleForgotPassword} className="link-button">
                  ¿Olvidaste tu contraseña?
                </button>
                <button className="access_button" type="submit">
                <FontAwesomeIcon icon={faRightToBracket} className="shortcut-icon" />INGRESAR
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