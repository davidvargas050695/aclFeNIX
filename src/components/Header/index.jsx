import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Asegúrate de tener el archivo de estilos

const Header = () => {
  return (
    <div className="header">
      <div className="breadcrumbs">
      <FontAwesomeIcon icon={faBars} className="icons" />
        <span className="breadcrumb-item">Dashboards</span> /
        <span className="breadcrumb-item">Sales</span>
      </div>
      <div className="header-content">
        <h2>Sales</h2>
        <div className="header-actions">
          <input type="text" placeholder="Buscar" className="search-input" />
          <FontAwesomeIcon icon={faUser} className="icons" />
        </div>
      </div>
    </div>
  );
};

export default Header;
