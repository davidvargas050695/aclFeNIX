import React from 'react';
import './ClientProcess.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';

const ClientProcess = ({ cliente, onCancel, onConfirm }) => {
    return (
        <div className="info-notification-info-overlay">
            <div className="info-notification-info">
                <div className="icon-container-noti-info">
                    <FontAwesomeIcon icon={faUserCheck} className="icon-noti3" />
                </div>
                <div className="message-container-info">
                    <h4>Cliente Seleccionado</h4>
                    <p>{cliente}</p>
                </div>
                <div className="button-container-info">
                    <button className="cancel-btn-info" onClick={onCancel}>Cancelar</button>
                    <button className="ok-ok-btn-info" onClick={onConfirm}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default ClientProcess;