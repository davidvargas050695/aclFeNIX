import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './logout.css';

const ModalProfile = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <FontAwesomeIcon icon={faUser} className="profile-image"/> 
          <p className="profile-role">Admin</p>
        </div>
        <div className="modal-buttons">
          <button className="modal-button profile-button">
            <FontAwesomeIcon icon={faUser} className="fa-icon" /> Perfil
          </button>
          <button 
            className="modal-button logout-button"
            onClick={handleLogoutClick}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" /> Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;
