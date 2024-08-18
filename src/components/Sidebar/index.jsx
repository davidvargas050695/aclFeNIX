import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imgFenix from '../../../src/static/fenix.png';
import { faThLarge, faUser, faFileAlt, faClipboard, faHome } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos
import './sidebar.css'; // Importa los estilos

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMouseEnter = (menuName) => {
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  return (
    <div className="sidebar">
      <div className="logo">
         <img src={imgFenix} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li 
            className="menu-item"
            onMouseEnter={() => handleMouseEnter('dashboard')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="menu-item">
              <div 
                className="icon-container" 
              >
                <FontAwesomeIcon icon={faHome} className="icon" />
              </div>
              <div className="menu-text-arrow">
                <span className="menu-text">Administrador</span>
              </div>
            </div>
            {openMenu === 'dashboard' && (
              <ul className="submenu">
                <li>
                  <Link to="/Home" className="submenu-item">Inicio</Link>
                </li>
                <li>
                  <Link to="/Contract" className="submenu-item">Contratos</Link>
                </li>
                <li>
                  <Link to="/dashboard3" className="submenu-item">Dashboard 3</Link>
                </li>
              </ul>
            )}
          </li>
          <li 
            className="menu-item"
            onMouseEnter={() => handleMouseEnter('Módulos')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="menu-item">
              <div 
                className="icon-container" 
              >
                <FontAwesomeIcon icon={faThLarge} className="icon" />
              </div>
              <div className="menu-text-arrow">
                <span className="menu-text">Módulos</span>
              </div>
            </div>
            {openMenu === 'Módulos' && (
              <ul className="submenu">
                <li>
                  <Link to="/Module" className="submenu-item">Lista de Módulos</Link>
                </li>
                <li>
                  <Link to="/dashboard2" className="submenu-item">Dashboard 2</Link>
                </li>
                <li>
                  <Link to="/dashboard3" className="submenu-item">Dashboard 3</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/Customers" className="menu-item">
              <div 
                className="icon-container"
              >
                <FontAwesomeIcon icon={faUser} className="icon" />
              </div>
              <div className="menu-text-arrow">
                <span className="menu-text">Clientes</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/pages" className="menu-item">
              <div 
                className="icon-container"
              >
                <FontAwesomeIcon icon={faFileAlt} className="icon" />
              </div>
              <div className="menu-text-arrow">
                <span className="menu-text">Pages</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/forms" className="menu-item">
              <div 
                className="icon-container"
              >
                <FontAwesomeIcon icon={faClipboard} className="icon" />
              </div>
              <div className="menu-text-arrow">
                <span className="menu-text">Forms</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
