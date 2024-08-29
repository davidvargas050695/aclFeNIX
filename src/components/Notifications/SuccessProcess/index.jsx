import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './SuccessProcess.css';

const SuccessProcess = ({ message, isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="info-notification-info-overlay">
                <div className="info-notification-info">
                    <div className="icon-container-noti-info">
                        <FontAwesomeIcon icon={faCircleCheck} className="icon-noti3" />
                    </div>
                    <div className="message-container-info">
                        <h4>Guardado Correctamente</h4>
                        <p>{message}</p>
                    </div>
                    <div className="button-container-info">
                        <button className="ok-btn-info" onClick={onClose}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default SuccessProcess;
