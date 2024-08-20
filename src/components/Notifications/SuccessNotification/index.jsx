import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './SuccessNotification.css';

const SuccessNotification = ({ message, isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="success-notification-success">
                <div className="icon-container-noti-success">
                    <FontAwesomeIcon icon={faCircleCheck} className="icon-noti" />
                </div>
                <div className="message-container-success">
                    <h4>Éxito</h4>
                    <p>{message}</p>
                </div>
                <div className="close-container-success" onClick={onClose}>
                    X
                </div>
            </div>
        )
    );
};

export default SuccessNotification;
