import React from 'react';
import './SlideModal.css';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideModal = ({ isOpen, onClose, children, title }) => {
  return (
    <>
      <div className={`side-modal ${isOpen ? 'open' : ''}`}>
        <div className="side-modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>
        <div className="side-modal-content">
          {children}
        </div>
      </div>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
    </>
  );
};

export default SideModal;
