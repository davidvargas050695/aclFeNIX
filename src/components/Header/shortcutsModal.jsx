import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Asegúrate de importar FontAwesomeIcon
import { faThLarge,faUsers,faFileContract } from '@fortawesome/free-solid-svg-icons'; // Puedes cambiar el ícono según sea necesario
import './shortcutsModal.css'; // Crea un archivo de estilos para este modal

const ShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="shortcuts-modal-overlay" onClick={onClose}>
      <div className="shortcuts-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-modal-header">
          <h3>Atajos</h3>
        </div>
        <div className="shortcuts-list">
          <div className="shortcut-item">
            <FontAwesomeIcon icon={faUsers} className="shortcut-icon" />
            <span className="shortcut-key">Lista de Clientes</span>
          </div>
          <div className="shortcut-item">
            <FontAwesomeIcon icon={faFileContract} className="shortcut-icon" />
            <span className="shortcut-key">Lista de Contratos</span>
          </div>
          {/* Agrega más atajos según sea necesario */}
        </div>
      </div>
    </div>
  );
};

export default ShortcutsModal;
