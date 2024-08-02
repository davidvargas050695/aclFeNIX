import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey} from '@fortawesome/free-solid-svg-icons';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "user" && password === "password") {
            onLogin();
            navigate("/Home");  
            console.log("Redirigiendo a Home"); 
        } else {
            alert("Credenciales inválidas");
        }
    };

    const handleForgotPassword = () => {
        alert('Redirigiendo a la página de recuperación de contraseña...');
    };

    return (
        <div className="login">
            <div className="login__info-container">
              <div className="login__info">
                <h1 className="login__info-title">ACL</h1>
                <h2 className="login__info-wellcome">Bienvenido</h2>
                <p className="login__info-text">Gestiona tus Usarios</p>
                <p className="login__info-text">Integra con Terceros</p>
                <p className="login__info-text">Historial de Accesos y mas</p>
              </div>
            
                <form onSubmit={handleSubmit} className="login__access-container">
                    <div className="login__access_info-container">
                        <label className="login__access_info-user">
                            <FontAwesomeIcon icon={faUser} className='icono'/>
                            <input className="text-box" type="text" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="Usuario"/>
                        </label>
                        <div className="separator"></div>
                        <label className="login__access_info-password">
                            <FontAwesomeIcon icon={faKey} className='icono'/>
                            <input className="text-box" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Contraseña"/>
                        </label>
                    </div>
                    <div className="login__access_buttons-container">
                        <a href="#" onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</a>
                        <button className="access_button"type="submit">INGRESAR</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
