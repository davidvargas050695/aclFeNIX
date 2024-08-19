import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './SuccessNotification.css';

const SuccessNotification = ({ message, isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="success-notification">
                <div className="icon-container-noti">
                    <FontAwesomeIcon icon={faCircleCheck} className="icon-noti" />
                </div>
                <div className="message-container">
                    <h4>Éxito</h4>
                    <p>{message}</p>
                </div>
                <div className="close-container" onClick={onClose}>
                    X
                </div>
            </div>
        )
    );
};

export default SuccessNotification;
