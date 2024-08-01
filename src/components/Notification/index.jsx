import React from 'react';
import './Notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="notification-modal">
      <div className="notification-modal__content">
        <span className="notification-modal__close-button" onClick={onClose}>&times;</span>
        <p className="notification-modal__message">Notificación de transacción de pago</p>
        <div className="notification-modal__check-icon">
          <FontAwesomeIcon icon={faCheckCircle} className="notification-modal__icon-check" />
        </div>
        <p className="notification-modal__message">Revise su correo electrónico para obtener una confirmación de pago. Te veremos pronto.</p>
        <button className="notification-modal__close-modal" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Notification;
