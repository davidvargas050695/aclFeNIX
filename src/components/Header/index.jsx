import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import Logout from './logout'; // Asegúrate de que Logout está bien importado
import ShortcutsModal from './shortcutsModal'; // Importa el nuevo componente de modal
import './Header.css'; // Asegúrate de tener el archivo de estilos

const Header = ({ onLogout, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false); // Estado para controlar el modal de atajos

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleShortcutsModal = () => {
    setIsShortcutsOpen(!isShortcutsOpen);
  };

  return (
    <div className="header">
      <div className="breadcrumbs">
        <FontAwesomeIcon icon={faBars} className="icons" />
        <span className="breadcrumb-item">{title}</span>
      </div>
      <div className="header-content">
        <div className="header-actions">
        <button className="shortcut-button" onClick={toggleShortcutsModal}>
          <FontAwesomeIcon icon={faPlus} className="shortcut-icon" />
          Atajos
        </button>
          <FontAwesomeIcon icon={faUser} className="icons" onClick={toggleModal} />
        </div>
        <Logout isOpen={isModalOpen} onClose={toggleModal} onLogout={onLogout} />
        <ShortcutsModal isOpen={isShortcutsOpen} onClose={toggleShortcutsModal} />
      </div>
    </div>
  );
};

export default Header;
