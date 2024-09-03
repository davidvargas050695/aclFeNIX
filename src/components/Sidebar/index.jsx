import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imgFenix from '../../../src/static/fenix.png';
import { faUser, faClipboard, faHome , faCubes, faFileContract} from '@fortawesome/free-solid-svg-icons'; // Importa los iconos
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
        <li>
            <Link to="/Home" className="menu-item">
              <div 
                className="icon-container"
              >
                <FontAwesomeIcon icon={faHome} className="icon" />
              </div>
              <div className="menu-text-arrow">
                <span className="menu-text">Administrador</span>
              </div>
            </Link>
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
                <FontAwesomeIcon icon={faCubes} className="icon" />
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
            <Link to="/ContractAll" className="menu-item">
              <div 
                className="icon-container"
              >
                <FontAwesomeIcon icon={faFileContract} className="icon" />
              </div>
              <div className="menu-text-arrow">
                <span className="menu-text">Contratos</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
